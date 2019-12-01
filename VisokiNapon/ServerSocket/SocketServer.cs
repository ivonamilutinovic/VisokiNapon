using System;
using System.Threading;
using System.Net.Sockets;
using System.Text;
using System.Collections.Generic;
using System.Net;
using ServerApplication;
using System.Data;
using System.Data.SqlClient;
class SocketServer
{
    static readonly object _lock = new object();
    static readonly Dictionary<int, TcpClient> list_clients = new Dictionary<int, TcpClient>();

    static void Main(string[] args)
    {
        int count = 1;
        
        TcpListener ServerSocket = new TcpListener(IPAddress.Any, 5000);
        ServerSocket.Start();

        while (true)
        {

            /* ovde cemo da pravimo cetvorke, i za svaku cetvorku ide thread */

            TcpClient client = ServerSocket.AcceptTcpClient();
            lock (_lock) list_clients.Add(count, client);
            Console.WriteLine("Someone connected!!");

            Thread t = new Thread(handle_clients);
            t.Start(count);
            count++;
        }
    }

    public static void handle_clients(object o)
    {
        int id = (int)o;
        TcpClient client;
        int indicator = 1;
        int numOfQuest = 0;
        int q10 = 0;
        int q50 = 0;
        int q100 = 0;
        int positionOfQuest = 0;
        int earning = 0;
        int numberOfInsertedQues = 0;
        string selectedQues;
        string selectedAnsw;
        int selectedVal;
        Question[] questions = new Question[15];
        
        
        using (SqlConnection connection = new SqlConnection("Data Source=DESKTOP-DSSAV0H\\RS2SERVER;Initial Catalog=VisokiNapon;Integrated Security=True;"))
        using (SqlCommand cmd = new SqlCommand("SELECT * " +
                                                   "FROM(SELECT TOP 5 * " +
                                                        "FROM dbo.Pitanja " +
                                                        "Where Cena = 10000 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                        "UNION ALL " +
                                                        "SELECT TOP 5 * " +
                                                        "FROM dbo.Pitanja " +
                                                        "Where Cena = 50000 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                        "UNION ALL " +
                                                        "SELECT TOP 5 * " +
                                                        "FROM dbo.Pitanja " +
                                                        "Where Cena = 100000 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND())) T " +
                                                    "ORDER BY 4; ", connection))
        
        {
            connection.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        selectedQues = reader[1].ToString();
                        selectedAnsw = reader[2].ToString().TrimEnd();
                        selectedVal = Convert.ToInt32(reader[3]);
                        
                        questions[numberOfInsertedQues++] = new Question(selectedQues, selectedAnsw, selectedVal);
                    }
                }
            }
            connection.Close();
        }

        lock (_lock) client = list_clients[id];

        while (indicator > 0)
        {

            NetworkStream stream = client.GetStream();
            byte[] buffer = new byte[1024];

            /* #################### primam zahtev za pitanje i saljem ga ############################# */
            int byte_count = stream.Read(buffer, 0, buffer.Length);
            string data = Encoding.ASCII.GetString(buffer, 0, byte_count);
            
            /* pitanja od 10000 */
            if (data.Equals("10000", StringComparison.OrdinalIgnoreCase)) {
                positionOfQuest = q10;
                broadcast(questions[positionOfQuest].getQuestion());
                Console.WriteLine("I sent question: " + questions[positionOfQuest].getQuestion());
                q10++;
                numOfQuest++;
            }

            /* pitanja od 50000 */
            if (data.Equals("50000", StringComparison.OrdinalIgnoreCase))
            {
                positionOfQuest = 5 + q50;
                broadcast(questions[positionOfQuest].getQuestion());
                Console.WriteLine("I sent question: " + questions[positionOfQuest].getQuestion());
                q50++;
                numOfQuest++;
            }

            /*pitanje od 100000 */
            if (data.Equals("100000", StringComparison.OrdinalIgnoreCase))
            {
                positionOfQuest = 10 + q100;
                broadcast(questions[positionOfQuest].getQuestion());
                Console.WriteLine("I sent question: " + questions[positionOfQuest].getQuestion());
                q100++;
                numOfQuest++;
            }

            /* ######################################################################################## */

            /* ###################### odgovor klijenta  ##################################*/

            byte_count = stream.Read(buffer, 0, buffer.Length);

            if (byte_count == 0)
            {
                break;
            }


            data = Encoding.ASCII.GetString(buffer, 0, byte_count);
            if (data.Equals(questions[positionOfQuest].getAnswer(), StringComparison.OrdinalIgnoreCase))
            {

                earning += questions[positionOfQuest].getValue(); 
                /* provera da li je pitanje ujedno i poslednje pitanje */
                if (numOfQuest >= 15)
                {
                    string gameOver = "You won! " + earning.ToString() ;
                    broadcast(gameOver);
                    Console.WriteLine("I sent the message about winning! Earning won: " + earning);
                    break;
                }
                /* #################################################### */

                Console.WriteLine("I got correct answer: " + data + " Move on!");
                string winner = "Move on!";
                broadcast(winner);
                Console.WriteLine("I sent indicator to continue the game: " + winner);
            }
            else
            {
                indicator = 0;
                Console.WriteLine("I got incorrect answer: " + data + " Break connection with this client.");
            }

            /* ########################################################################## */
        }

        if (indicator == 0)
        {
            /* nazalost je napravio gresku */
            string loser = "end";
            broadcast(loser);
            Console.WriteLine("I sent breacking connection string: " + loser);
        }

        lock (_lock) list_clients.Remove(id);
        client.Client.Shutdown(SocketShutdown.Both);
        client.Close();
    }

    /* funkcija za slanje podataka */

    public static void broadcast(string data)
    {
        byte[] buffer = Encoding.ASCII.GetBytes(data + Environment.NewLine);

        lock (_lock)
        {
            foreach (TcpClient c in list_clients.Values)
            {
                NetworkStream stream = c.GetStream();

                stream.Write(buffer, 0, buffer.Length);
            }
        }
    }
}

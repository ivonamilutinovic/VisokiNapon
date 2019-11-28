using System;
using System.Threading;
using System.Net.Sockets;
using System.Text;
using System.Collections.Generic;
using System.Net;
using ServerApplication;

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

        lock (_lock) client = list_clients[id];

        while (indicator > 0 && numOfQuest < 3)
        {

            NetworkStream stream = client.GetStream();
            byte[] buffer = new byte[1024];

            /* pitanje servera */

            Question[] questions = {
                                    new Question("Gde je rodjen Vuk Karadzic?", "Trsic"),
                                    new Question("Ime kursa koji polazemo?", "Razvoj softvera 2"),
                                    new Question("Glavni grad Nemacke je?", "Berlin"),
                                    };


            broadcast(questions[numOfQuest].getQuestion());
            Console.WriteLine("I sent question: " + questions[numOfQuest].getQuestion());

            /* odgovor klijenta */

            int byte_count = stream.Read(buffer, 0, buffer.Length);

            if (byte_count == 0)
            {
                break;
            }


            string data = Encoding.ASCII.GetString(buffer, 0, byte_count);
            if (data.Equals(questions[numOfQuest].getAnswer(), StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("I got correct answer: " + data + " Move on!");
                numOfQuest++;
            }
            else
            {
                indicator = 0;
                Console.WriteLine("I got incorrect answer: " + data + " Break connection with this client.");
            }
        }

        if (numOfQuest >= 3)
        {
            /* odgovorio je na sva pitanja koja su njemu postavljena */
            ;
            broadcast("You won!");
            Console.WriteLine("I sent the message about winning! ");
        }
        else
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

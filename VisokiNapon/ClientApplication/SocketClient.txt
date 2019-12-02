using System;
using System.Threading;
using System.Net.Sockets;
using System.Text;
using System.Collections;
using System.Net;

class SocketClient
{

    static void Main(string[] args)
    {
        IPAddress ip = IPAddress.Parse("127.0.0.1");
        int port = 5000;
        TcpClient client = new TcpClient();
        client.Connect(ip, port);
        Console.WriteLine("client connected!!");
        NetworkStream ns = client.GetStream();
        byte[] receivedBytes = new byte[1024];
        int byte_count;

        int q50 = 0;
        int q10 = 0;
        int q100 = 0;
        
        string s;

        /* ################## izbor prvog pitanja ################################ */
        while (true)
        {
            Console.WriteLine("Choose the question, 10000/50000/100000!");
            string.IsNullOrEmpty((s = Console.ReadLine()));
            if (string.Equals(s.Trim(), "10000"))
            {
                q10++;
                byte[] buffer = Encoding.ASCII.GetBytes(s);
                ns.Write(buffer, 0, buffer.Length);
                break;
            }
            if (string.Equals(s.Trim(), "50000"))
            {
                q50++;
                byte[] buffer = Encoding.ASCII.GetBytes(s);
                ns.Write(buffer, 0, buffer.Length);
                break;
            }
            if (string.Equals(s.Trim(), "100000"))
            {
                q100++;
                byte[] buffer = Encoding.ASCII.GetBytes(s);
                ns.Write(buffer, 0, buffer.Length);
                break;
            }
            

        }
        /* ######################################################################### */

        while (true) {

            /* ############## SERVER SALJE PITANJE, KLIJENT ODGOVARA ########################### */

            byte_count = ns.Read(receivedBytes, 0, receivedBytes.Length);
            string message = Encoding.ASCII.GetString(receivedBytes, 0, byte_count);

            Console.WriteLine("Received question from server:");
            Console.WriteLine(message.Trim());
            string.IsNullOrEmpty((s = Console.ReadLine()));
            byte[] buffer = Encoding.ASCII.GetBytes(s);
            ns.Write(buffer, 0, buffer.Length);

            /* ################################################################################ */

            /* ########################## PRIMAMO INDIKATOR OD SERVERA ######################## */
            byte_count = ns.Read(receivedBytes, 0, receivedBytes.Length);
            message = Encoding.ASCII.GetString(receivedBytes, 0, byte_count);

            if (string.Equals(message.Trim(), "end"))
            {
                Console.WriteLine("You gave wrong answer!");
                break;
            }

            if (message.Trim().Contains( "You won!"))
            {
                Console.WriteLine("You won! Earning won:" + System.Text.RegularExpressions.Regex.Match(message, @"\d+").Value);
                break;
            }

            /* ############################################################################ */

            /* ################# IZBOR NOVOG PITANJA ###################################### */
            if (string.Equals(message.Trim(), "Move on!"))
            {
                while (true)
                {
                    Console.WriteLine("Choose the question, 10000/50000/100000!");
                    string.IsNullOrEmpty((s = Console.ReadLine()));
                    if (string.Equals(s.Trim(), "10000") && q10 < 5)
                    {
                        q10++;
                        buffer = Encoding.ASCII.GetBytes(s);
                        ns.Write(buffer, 0, buffer.Length);
                        break;
                    }

                    if (string.Equals(s.Trim(), "50000") && q50 < 5)
                    {
                        q50++;
                        buffer = Encoding.ASCII.GetBytes(s);
                        ns.Write(buffer, 0, buffer.Length);
                        break;
                    }
                    

                    if (string.Equals(s.Trim(), "100000") && q100 < 5)
                    {
                        q100++;
                        buffer = Encoding.ASCII.GetBytes(s);
                        ns.Write(buffer, 0, buffer.Length);
                        break;
                    }

                    if (q10 == 5)
                        Console.WriteLine("You have answered on all questions for 10000!");
                    if (q50 == 5)
                        Console.WriteLine("You have answered on all questions for 50000!");
                    if (q100 == 5)
                        Console.WriteLine("You have answered on all questions for 100000!");

                }
                /* ############################################################################ */
            }



        }

        client.Client.Shutdown(SocketShutdown.Send);
        ns.Close();
        client.Close();
        Console.WriteLine("disconnect from server!!");
        Console.ReadKey();



    }
}




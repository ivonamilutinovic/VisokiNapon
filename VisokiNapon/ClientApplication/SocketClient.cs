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


        while ((byte_count = ns.Read(receivedBytes, 0, receivedBytes.Length)) > 0)
        {
            string message = Encoding.ASCII.GetString(receivedBytes, 0, byte_count);

            if (string.Equals(message.Trim(), "end"))
            {
                Console.WriteLine("You gave wrong answer!");
                break;
            }

            else if (string.Equals(message.Trim(), "You won!"))
            {
                Console.WriteLine("You won!");
                break;
            }
            else
            {
                Console.WriteLine("Received question from server:");
                Console.WriteLine(message.Trim());
                string s;
                string.IsNullOrEmpty((s = Console.ReadLine()));
                byte[] buffer = Encoding.ASCII.GetBytes(s);
                ns.Write(buffer, 0, buffer.Length);
                Console.WriteLine("Poslao sam odgovor!");
            }

        }

        client.Client.Shutdown(SocketShutdown.Send);
        ns.Close();
        client.Close();
        Console.WriteLine("disconnect from server!!");
        Console.ReadKey();



    }
}




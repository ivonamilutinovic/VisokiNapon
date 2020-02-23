using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace VISOKI_NAPON.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageTender2VN(string tenderPlayerUsername, string vnPlayerUsername, string answerMessage, string requestedAmount)
        {
            await Clients.All.SendAsync("ReceiveMessageTender2VN", tenderPlayerUsername, vnPlayerUsername, answerMessage, requestedAmount);
        }

        public async Task SendMessageVN2Tender(string user, string questionMessage, string questionValueMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageVN2Tender", user, questionMessage, questionValueMessage);
        }

    }
}
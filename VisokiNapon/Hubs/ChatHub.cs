using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace VISOKI_NAPON.Hubs
{
    public class ChatHub : Hub
    {
        
        public async Task SendMessageTender2VN(string tenderPlayerUsername, string vnPlayerUsername, string answerMessage, string requestedAmountMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageTender2VN", tenderPlayerUsername, vnPlayerUsername, answerMessage, requestedAmountMessage);
        }

        public async Task SendMessageVN2Tender(string user, string questionMessage, string questionValueMessage)

        {
            await Clients.All.SendAsync("ReceiveMessageVN2Tender", user, questionMessage, questionValueMessage);
        }

        public async Task SendMessageChangeTenderSum(string user, string TenderAmountMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageChangeTenderSum", user, TenderAmountMessage);
        }
    }
}
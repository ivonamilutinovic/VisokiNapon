using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace VISOKI_NAPON.Hubs
{
	/// ChatHub class - manages tender-help-related requests
    public class ChatHub : Hub
    {
		
        /** ### Desctiption
        * Function that sends message from tender player to player that has requested tender help 
        * ### Arguments
        * string tenderPlayerUsername - username of tender player <br>
		* string vnPlayerUsername - username of classic Visoki napon player <br>
		* string answerMessage - tender player's answer on question <br>
		* string requestedAmountMessage - amount of money that tender player requested for his answer */
        public async Task SendMessageTender2VN(string tenderPlayerUsername, string vnPlayerUsername, string answerMessage, string requestedAmountMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageTender2VN", tenderPlayerUsername, vnPlayerUsername, answerMessage, requestedAmountMessage);
        }

		/** ### Desctiption
        * Function that sends message from classic Visoki napon player to all tender players 
        * ### Arguments
        * string user - username of player that requests tender help <br>
		* string questionMessage - text of the question <br>
		* string questionValueMessage - value of question */
        public async Task SendMessageVN2Tender(string user, string questionMessage, string questionValueMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageVN2Tender", user, questionMessage, questionValueMessage);
        }

		/** ### Desctiption
        * Function that informs tender player that he gave correct answer, i.e. informs him that he won requested amount of money
        * ### Arguments
        * string user - username of tender player <br>
		* string TenderAmountMessage - amount of money tender player has won */
        public async Task SendMessageChangeTenderSum(string user, string TenderAmountMessage)
        {
            await Clients.All.SendAsync("ReceiveMessageChangeTenderSum", user, TenderAmountMessage);
        }
    }
}
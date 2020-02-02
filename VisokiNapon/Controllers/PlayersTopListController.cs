using System.Security.AccessControl;
using System.Net;
using System.ComponentModel.Design.Serialization;
using System.Data.Common;
using System;
using System.Linq;
using System.IO.MemoryMappedFiles;
using System.Globalization;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VISOKI_NAPON.PlayersTopList;
using VISOKI_NAPON.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using VISOKI_NAPON.Controllers.Resources;
using AutoMapper;
using System.Data.SqlClient;

namespace VISOKI_NAPON.Controllers
{   
    
    public class PlayersTopListController : Controller
    {   
        private readonly IMapper mapper;
        private readonly VisokiNaponDbContext context;
        
        public PlayersTopListController(VisokiNaponDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        
        public class topListObj {
            public string username { get; set; }
            public int maxAmount { get; set; }
        }
        
        [HttpGet("/api/v3/toplist")]
        public async Task<IEnumerable<TopListResource>> getTopList(){
            var toplist = await context.PlayersTopList
                                       .FromSqlRaw("SELECT Id, Username, MaxAmount " +
                                                   "FROM dbo.PlayersTopList " +
                                                   "ORDER BY MaxAmount DESC").ToListAsync();           


            return mapper.Map<List<TopList>, List<TopListResource>>(toplist);
        }
        
        [HttpPost("/api/v3/updateTopList")]
        public async Task<IActionResult> updateTopList([FromBody]topListObj obj){
            
            // if the player with username obj.username is already in the table, get his won sum
            // otherwise, state that it is in not in the table
            var player = await Task.FromResult(context.PlayersTopList.AsEnumerable()
            .Where(que => que.Username == obj.username).FirstOrDefault());
            
            // checking whether the user is already in the top list
			if(player != null){
                // checking whether the new sum is smaller then privious
                if(player.MaxAmount >= obj.maxAmount)
                   return Json(false);
                else{
                    player.MaxAmount = obj.maxAmount;
                    context.PlayersTopList.Update(player);
                    context.SaveChanges();
                    return Json(true);
                }
            }else{ // the player is not in the top list

                // finding the minimum sum from the top list
                var minAmount = await Task.FromResult(context.PlayersTopList.AsEnumerable()
                .Min(q => q.MaxAmount));
            
                if(obj.maxAmount >= minAmount){
                    var playerWithMinSum = await Task.FromResult(context.PlayersTopList.AsEnumerable()
                    .Where(que => que.MaxAmount == minAmount).FirstOrDefault());

                    playerWithMinSum.Username = obj.username;
                    playerWithMinSum.MaxAmount = obj.maxAmount;
                    context.PlayersTopList.Update(playerWithMinSum);
                    context.SaveChanges();
                    return Json(true);
                }else{
                    return Json(false);
                }
            }


        }
    }
}
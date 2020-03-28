using System;
using Xunit;
using VISOKI_NAPON.Controllers;
using VISOKI_NAPON.Handlers;
using VISOKI_NAPON.Persistence;
using VISOKI_NAPON.PlayersTopList;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Newtonsoft.Json;
using VISOKI_NAPON.Mapping;

namespace VIsokiNaponTest
{
    public class TopListTest
    {

        [Fact]
        public void CRUDTopListTest()
        {
            var options = new DbContextOptionsBuilder<VisokiNaponDbContext>()
            .UseInMemoryDatabase(databaseName: "FakeDataBase")
            .Options;
            var context = new VisokiNaponDbContext(options);


            context.PlayersTopList.Add(new TopList() { Id = 1, Username = "user1", MaxAmount = 150000 });
            context.PlayersTopList.Add(new TopList() { Id = 2, Username = "user2", MaxAmount = 100000 });
            context.PlayersTopList.Add(new TopList() { Id = 3, Username = "user3", MaxAmount = 75000 });
            context.PlayersTopList.Add(new TopList() { Id = 4, Username = "user4", MaxAmount = 50000 });
            context.PlayersTopList.Add(new TopList() { Id = 5, Username = "user5", MaxAmount = 25000 });
            context.SaveChanges();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            var mapper = mockMapper.CreateMapper();

            var controller = new PlayersTopListController(context, mapper);

            // MaxAmount of user2 shoud be updated 
            var a = new PlayersTopListController.topListObj();
            a.username = "user2";
            a.maxAmount = 120000;
            var result = controller.updateTopList(a);
            string requestJson = JsonConvert.SerializeObject(result.Result);
            Assert.True(requestJson.Contains("true") == true);
            var player = context.PlayersTopList.Find(2);
            Assert.True(player.MaxAmount == 120000);

            // User2 is already in top list table, but wont be updated because its sum is less than one in table 
            a.username = "user2";
            a.maxAmount = 65000;
            result = controller.updateTopList(a);
            requestJson = JsonConvert.SerializeObject(result.Result);
            Assert.True(requestJson.Contains("false") == true);
            player = context.PlayersTopList.Find(2);
            Assert.True(player.MaxAmount == 120000);


            // PLAYER WONT BE INSERTED IN TOP LIST TABLE 
            var b = new PlayersTopListController.topListObj();
            b.username = "user6";
            b.maxAmount = 15000;
            result = controller.updateTopList(b);
            requestJson = JsonConvert.SerializeObject(result.Result);
            Assert.True(requestJson.Contains("false") == true);

            // PLAYER WILL BE INSERTED IN TOP LIST TABLE
            b.username = "user6";
            b.maxAmount = 200000;
            result = controller.updateTopList(b);
            requestJson = JsonConvert.SerializeObject(result.Result);
            Assert.True(requestJson.Contains("true") == true);



        }




    }
}

using System;
using Xunit;
using VISOKI_NAPON.Controllers;
using VISOKI_NAPON.Handlers;
using VISOKI_NAPON.Persistence;
using VISOKI_NAPON.Players;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace VIsokiNaponTest
{
    public class PlayerTest
    {


        [Fact]
        public void CreatePlayerTest()
        {
            var options = new DbContextOptionsBuilder<VisokiNaponDbContext>()
            .UseInMemoryDatabase(databaseName: "FakeDataBase")
            .Options;

            using (var context = new VisokiNaponDbContext(options))
            {
                context.Players.Add(new Player()
                {
                    Email = "mika.mikic@gmail.com",
                    Name = "Mika",
                    Surname = "Mikic",
                    UsernameId = "mikica",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Verified = "1234",
                    DateAndTime = new DateTime(2020, 2, 19)
                });
                context.Players.Add(new Player()
                {
                    Email = "zika.zikic@gmail.com",
                    Name = "Zika",
                    Surname = "Zikic",
                    UsernameId = "zikica",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Verified = "1234",
                    DateAndTime = new DateTime(2020, 2, 19)
                });
                context.SaveChanges();

                var service = new PlayerHandler(context);

                //REGISTER UNCONFIRMED PLAYER 3 MINUTES AFTHER HIS REGISTRATION TRAIL
                Assert.True(service.Create("mika.mikic@gmail.com", "mikica123", "Mika", "Mikic", "Mika1234", "Mika1234").Result);
                Assert.True(service.Create("mika.zikic@gmail.com", "zikica", "Mika", "Zikic", "Mika1234", "Mika1234").Result);


                // EMAIL ALREADY TAKEN
                Assert.False(service.Create("mika.zikic@gmail.com", "ZMiJa", "Mika", "Zikic", "Sifra123", "Sifra123").Result);

                // USERNAME ALREADY TAKEN
                Assert.False(service.Create("zikica.gojkovic@gmail.com", "zikica", "Zikica", "Gojkovic", "Sifra123", "Sifra123").Result);

                // NOT VALID EMAIL
                Assert.False(service.Create("gorge", "george", "George", "Brant", "Sifra123", "Sifra123").Result);

                // NOT VALID USERNAME
                Assert.False(service.Create("gorge@hotmail.com", "gb", "George", "Brant", "Sifra123", "Sifra123").Result);

                // NOT VALID PASSWORD
                Assert.False(service.Create("gorge@hotmailcom", "george", "George", "Brant", "sifra123", "sifra123").Result);

                // PASSWORDS NOT MATCHING
                Assert.False(service.Create("gorge@hotmailcom", "george", "George", "Brant", "Sifra123", "Sifra143").Result);

                // UNEXPECTED NULL 
                Assert.False(service.Create(null, "george", "George", "Brant", "Sifra123", "Sifra143").Result);
                Assert.False(service.Create("gorge@hotmailcom", null, "George", "Brant", "Sifra123", "Sifra143").Result);
                Assert.False(service.Create("gorge@hotmailcom", "george", "George", "Brant", null, "Sifra143").Result);
                Assert.False(service.Create("gorge@hotmailcom", "george", "George", "Brant", "Sifra123", null).Result);


                // EVERYTHING IS OK
                Assert.True(service.Create("jova.jovic@gmail.com", "jovica", "Jova", "Jovic", "Jova1234", "Jova1234").Result);
                var player = context.Players.Find("jovica");
                Assert.True(player.Email == "jova.jovic@gmail.com");

            }
        }


        [Fact]
        public void ConfirmPlayerTest()
        {
            var options = new DbContextOptionsBuilder<VisokiNaponDbContext>()
            .UseInMemoryDatabase(databaseName: "FakeDataBase")
            .Options;
            
            using (var context = new VisokiNaponDbContext(options))
            {
                var service = new PlayerHandler(context);

                // UNEXPECTED NULL
                Assert.False(service.Confirm(null, "1234").Result);
                Assert.False(service.Confirm("username", null).Result);

                // UNREGISTRATED USERNAME
                Assert.False(service.Confirm("username", "1234").Result);

                /*                   SENDING WRONG CONFIRMATION EMAIL
                 * ############################### NOTE ##################################
                 * CONFIRMING EARLIER REGISTRATED PLAYER WITH EMAIL mara.maric@gmail.com,
                 * THAT MAIL IS NOT VALID, AND SENDGRID WON'T SEND CONFIRMATION EMAIL, 
                 * BUT FOR THIS TEST WE ASSUME THAT EMAIL WAS SENT 
                 * ######################################################################*/

                var q = service.Create("mara.maric@gmail.com", "maraM", "Mara", "Maric", "Mara1234", "Mara1234").Result;
                var player = context.Players.Find("maraM");
                Assert.False(service.Confirm(player.UsernameId, "0" ).Result);
                player = context.Players.Find("maraM");
                Assert.True(player==null);

                // CHECK COMPLETELY VALID CONFIRMATION  
                /* email: "petar.petrovic@gmail.com", username : "petrovic" */

                Assert.True(service.Create("petar.petrovic@gmail.com", "pjero", "Pera", "Petrovic", "Pera1234", "Pera1234").Result);
                player = context.Players.Find("pjero");
                Assert.True(player.Verified != null);
                Assert.True(service.Confirm(player.UsernameId, player.Verified).Result);
                player = context.Players.Find("pjero");
                Assert.True(player.Verified == "1");

            }
        }


        [Fact]
        public void AuthenticatePlayerTest()
        {
            var options = new DbContextOptionsBuilder<VisokiNaponDbContext>()
            .UseInMemoryDatabase(databaseName: "FakeDataBase")
            .Options;


            using (var context = new VisokiNaponDbContext(options))
            {
                var service = new PlayerHandler(context);

                // UNEXPECTED NULL
                Assert.False(service.Authenticate(null, "Password123").Result);
                Assert.False(service.Authenticate("username", null).Result);

                // UNREGISTRATED USERNAME
                Assert.False(service.Confirm("username", "Password1234").Result);

                context.Players.Add(new Player()
                {
                    Email = "jovana.jovanovic@gmail.com",
                    Name = "Jovana",
                    Surname = "Jovanovic",
                    UsernameId = "jovana",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Verified = "1234",
                    DateAndTime = new DateTime(2020, 2, 19)
                });
                context.Players.Add(new Player()
                {
                    Email = "ana.anic@gmail.com",
                    Name = "Ana",
                    Surname = "Anic",
                    UsernameId = "anica",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Verified = "1234",
                    DateAndTime = DateTime.Now
                });

                context.SaveChanges();


                // UNCONFIRMED PLAYER  Email : "jovana.jovanovic@gmail.com", username : "jovana"
                var player = context.Players.Find("jovana");
                Assert.False(service.Authenticate(player.UsernameId, "Password").Result);
                player = context.Players.Find("jovana");
                Assert.True(player == null);

                // UNCONFIRMED PLAYER, BUT YET HAVE TIME TO CONFIM IT Email : "ana.anic@gmail.com", username : "anica"
                player = context.Players.Find("anica");
                Assert.False(service.Authenticate(player.UsernameId, "Password").Result);

                // CHECK COMPLETELY VALID CONFIRMATION  
                //email: "petar.petrovic@gmail.com", username : "petrovic" password : "Pera1234"

                var q = service.Create("milos.milosevic@gmail.com", "milos", "Milos", "Milosevic", "Milos1234", "Milos1234").Result;
                player = context.Players.Find("milos");
                player.Verified = "1";
                context.Players.Update(player);
                player = context.Players.Find("milos");
                Assert.True(player.PasswordHash!= null && player.PasswordSalt!=null);
                Assert.True(player.Verified=="1");
                Assert.True(service.Authenticate(player.UsernameId, "Milos1234").Result);

                //CHECK CONFIRMED PLAYER WITH WRONG PASSWORD SUBMITTED
                Assert.False(service.Authenticate(player.UsernameId, "Milos4321").Result);

            }

        }


    }
}

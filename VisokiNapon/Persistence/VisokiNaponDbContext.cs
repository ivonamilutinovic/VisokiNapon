using Microsoft.EntityFrameworkCore;
using VISOKI_NAPON.Questions;
using VISOKI_NAPON.Players;
using VISOKI_NAPON.PlayersTopList;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace VISOKI_NAPON.Persistence
{
    /// DataBase Context Class
    public class VisokiNaponDbContext : DbContext
    {
        /// Constructor of DataBase Context Class
        public VisokiNaponDbContext(DbContextOptions<VisokiNaponDbContext> options) : base(options){

        }

        /// DbSet of Questions
        public DbSet<Question> Questions {get; set;}
        /// DbSet of registrated players
		public DbSet<Player> Players {get; set;}
        /// DbSet of TopList players
		public DbSet<TopList> PlayersTopList {get; set;}
    }
}
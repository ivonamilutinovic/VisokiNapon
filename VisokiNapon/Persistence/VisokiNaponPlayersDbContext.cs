using Microsoft.EntityFrameworkCore;
using VISOKI_NAPON.Players;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace VISOKI_NAPON.Persistence
{
    public class VisokiNaponPlayersDbContext : DbContext
    {
        public VisokiNaponPlayersDbContext(DbContextOptions<VisokiNaponPlayersDbContext> options) : base(options)
         {

         }

        public DbSet<Player> Players {get; set;}
    }
}
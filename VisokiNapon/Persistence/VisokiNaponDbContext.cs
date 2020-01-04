using Microsoft.EntityFrameworkCore;
using VISOKI_NAPON.Questions;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace VISOKI_NAPON.Persistence
{
    public class VisokiNaponDbContext : DbContext
    {
        public VisokiNaponDbContext(DbContextOptions<VisokiNaponDbContext> options) : base(options)
         {

         }
        public DbSet<Question> Questions {get; set;}
    }
}
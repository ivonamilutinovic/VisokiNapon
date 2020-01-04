using Microsoft.EntityFrameworkCore.Migrations;

namespace VISOKI_NAPON.Migrations
{
    public partial class SeedDatabase_v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (1,'jedan', '1', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (2,'dva', '2', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (3,'tri', '3', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (4,'cetiri', '4', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (5,'pet', '5', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (6,'sest', '6', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (7,'sedam', '7', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (8,'osam', '8', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (9,'devet', '9', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (10,'deset', '10', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (11,'jedanaest', '11', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (12,'dvanaest', '12', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (13,'trinaest', '13', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (14,'cetrnaest', '14', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (15,'petnaest', '15', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (16,'sesnaest', '16', 1)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (17,'sedamnaest', '17', 2)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (18,'osamnaest', '18', 3)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (19,'devetnaest', '19', 4)");
            migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (20,'dvadeset', '20', 4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

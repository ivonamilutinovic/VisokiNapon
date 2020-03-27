using Microsoft.EntityFrameworkCore.Migrations;

namespace VISOKI_NAPON.Migrations
{   ///InitialModel class - contains methods for creating and deleting Questions table
    public partial class InitialModel_v3 : Migration
    {
        ///Method that creates Questions table
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             
            migrationBuilder.CreateTable(
                name: "Questions",

                /** ### Description
                * Function that creates columns for Questions table
                * ### Columns
                * int Id - Ordinal number of question in table <br>
                * string Text - Text of question <br>
                * string Answer - Answer on question <br>
                * int Category - Category of question <br> */ 
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    Answer = table.Column<string>(nullable: true),
                    Category = table.Column<int>(nullable: false)
                },
                ///Function that sets column id for primary key in Questions table
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });
        }
        ///Method that deletes Questions table from VisokiNapon database
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}

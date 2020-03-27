using Microsoft.EntityFrameworkCore.Migrations;

namespace VISOKI_NAPON.Migrations
{   ///SeedQuestions class - contains methods for inserting and deleting questions from Questions table
    public partial class SeedQuestionsTable_v15 : Migration
    {   ///Method that inserts questions into Questions table when migration are applied
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }
        ///Method that deletes questions from Questions table when migration are deleted
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Questions ");
        }
    }
}

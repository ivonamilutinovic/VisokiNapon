using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VISOKI_NAPON.Migrations
{
    ///Class that contains methods for creating and deleting Players and PlayersTopList tables
    public partial class PlayersTable_PlayersTopListTable_v7 : Migration
    {
        ///Method that creates Players and PlayersTopList tables
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                /** ### Description
                * Function that creates columns for Players table
                * ### Columns
                * string UsernameId - Player's username <br>
                * string Email - Player's email <br>
                * string Name - Player's name  <br>
                * string Surname - Player's surname <br>
                * byte[] PasswordHash - Player's password hash generated from player's password <br>
                * byte[] PasswordSalt - Player's password salt generated from player's password <br>
                * string Verified - Contains information whether the player has been verified <br>
                * DateTime DateAndTime - Date and time of player registration <br> */ 
                columns: table => new
                {
                    UsernameId = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Verified = table.Column<string>(nullable: true),
                    DateAndTime = table.Column<DateTime>(nullable: false)
                },
                ///Function that sets column UsernameId for primary key in Players table
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.UsernameId);
                });

            migrationBuilder.CreateTable(
                name: "PlayersTopList",
                /** ### Description
                * Function that creates columns for PlayersTopList table
                * ### Columns
                * int Id - Player's ordinal number in table  <br>
                * string Username - Player's username <br>
                * int MaxAmount - Max amount that the player has won <br> */ 
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    MaxAmount = table.Column<int>(nullable: false)
                },
                ///Function that sets column Id for primary key in PlayersTopList table
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayersTopList", x => x.Id);
                });
        }
        ///Method that deletes Players and PlayersTopList table from VisokiNapon database
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "PlayersTopList");
        }
    }
}

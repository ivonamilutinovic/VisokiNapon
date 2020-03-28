using Microsoft.EntityFrameworkCore.Migrations;

namespace VISOKI_NAPON.Migrations
{   ///SeedQuestions class - contains methods for inserting and deleting questions from Questions table
    public partial class SeedQuestionsTable_v15 : Migration
    {   ///Method that inserts questions into Questions table when migration are applied
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (1,'Koliko okeana ima na svetu?', '5', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (2,'Koja je jedinica mere jačine električne struje?', 'Amper', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (3,'Ag je oznaka kog hemijskog elementa u periodnom sistemu?', 'Srebro', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (4,'Koliko decimetara ima u 0.2 kilometra?', '2000', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (5,'Koja je najduža reka na svetu?', 'Amazon', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (6,'Kako se zove zeleni pigment u listu?', 'Hloforil', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (7,'Kako se zove glavni grad Eritreje?', 'Asmara', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (8,'Kako se zove glavni grad Ugande?', 'Kampala', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (9,'Koji je internet domen Ruande?', 'rw', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (10,'Koja je nacionalna valuta Kraljevine Lesoto?', 'Loti', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (11,'Koje godine je uvedeno pravilo zlatnog gola u fudbalu?', '1996', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (12,'Koje godine je uvedeno pravilo srebrnog gola u fudbalu?', '2004', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (13,'Koliko reprezentacija je učestvovalo na Svetskom prvenstvu u fudbalu 2018. godine?', '32', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (14,'Koje godine je reprezentacija Španije prvi put osvojila Evropsko prvenstvo u fudbalu?', '1964', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (15,'Koji brazilski fudbaler je postigao najviše golova na jednom Kupu konfederacija?', 'Romario', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (16,'Koje godine je rođen Danilo Bata Stojković?', '1934', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (17,'Koji srpski film je 2007. godine predložen za nominaciju za Oskara?', 'Klopka', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (18,'Iz kog kineskog grada je potekao covid-19?', 'Vuhan', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (19,'Na kojoj nadmorskoj visini se nalazi najviša tačka Bugarske?', '2925', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (20,'Kako se zove najviši vrh Slovenije?', 'Triglav', 1)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (21,'Kako se zove ostrvo koje je dobilo ime po holandskom moreplovcu Abelu Tasmanu?', 'Tasmanija', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (22,'U kom veku je Johan Gutenberg izmislio štamparsku mašinu?', '15', 5)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (23,'U kom gradu je rođen italijanski fizičar Aleksandro Volta?', 'Komo', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (24,'Koja je zvanična valuta Litvanije?', 'Litas', 10)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (25,'3ubLYJ5sJbM#!!#Koliko zvaničnih mečeva je odigrao Nemanja Vidić za Crvenu Zvezdu?', '92', 4)");
           migrationBuilder.Sql("INSERT INTO Questions (Id,Text, Answer, Category) VALUES (26,'XdL7EDKr_rk#!!#Ko je 1997.godine dobio nagradu FIFA fudbaler godine?', 'Ronaldo', 4)");

        }
        ///Method that deletes questions from Questions table when migration are deleted
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Questions ");
        }
    }
}

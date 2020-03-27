using System.Security.AccessControl;
using System.Net;
using System.ComponentModel.Design.Serialization;
using System.Data.Common;
using System;
using System.Linq;
using System.IO.MemoryMappedFiles;
using System.Globalization;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VISOKI_NAPON.Questions;
using VISOKI_NAPON.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using VISOKI_NAPON.Controllers.Resources;
using AutoMapper;
using System.Data.SqlClient;

namespace VISOKI_NAPON.Controllers
{   
    
    /// QuestionController Class - manages question-related requests
    public class QuestionsController : Controller
    {   
        private readonly IMapper mapper;
        private readonly VisokiNaponDbContext context;
        
        /// Constructor of QuestionsController
        public QuestionsController(VisokiNaponDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        
        /// Adjunctive class containing text and answer of question
        public class obj {
            public string tex {get; set;}
            public string ans {get; set;}
        }
        
        /** ### Desctiption
        * Function that gets questions for one game and questions for replace question help
        * ### Return value
        * Task<IEnumerable<QuestionResource>> - list of questions */
        [HttpGet("/api/v3/questions")]
        public async Task<IEnumerable<QuestionResource>> GetQuestions(){
            var questions = await context.Questions
                                       .FromSqlRaw(" WITH Privremeno AS " +
                                                    "( SELECT TOP (7) [Id], [Text], [Answer], [Category] " +
                                                    "from [VisokiNapon].[dbo].[Questions] " +
                                                    "Where [Category] = 1 " +
                                                    "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                    "UNION ALL " +
                                                    "SELECT TOP (7) [Id], [Text], [Answer], [Category] " +
                                                    "from [VisokiNapon].[dbo].[Questions] " +
                                                    "Where [Category] = 5 " +
                                                    "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                    "UNION ALL " +
                                                    "SELECT TOP (7) [Id], [Text], [Answer], [Category] " +
                                                    "from [VisokiNapon].[dbo].[Questions] " + 
                                                    "Where [Category] = 10 " +
                                                    "ORDER BY RAND(CHECKSUM(*) * RAND())" +
                                                    "UNION ALL " +
                                                    "SELECT TOP (1) [Id], [Text], [Answer], [Category] " +
                                                    "from [VisokiNapon].[dbo].[Questions] " +
                                                    "Where [Category] = 4 " +
                                                    "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                    ") " +
                                                    "SELECT * " +
                                                    "FROM   (SELECT TOP (16) * " +
                                                            "FROM(  SELECT TOP (5) [Id], [Text], [Answer], [Category]" +
                                                                    "FROM Privremeno " +
                                                                    "WHERE [Category] = 1 " +
                                                                    "ORDER BY [Category] ASC " +
                                                                    "UNION " +
                                                                    "SELECT TOP (5) [Id], [Text], [Answer], [Category] " +
                                                                    "FROM Privremeno " +
                                                                    "WHERE [Category] = 5 " +
                                                                    "ORDER BY [Category] ASC " +
                                                                    "UNION " +
                                                                    "SELECT TOP (5) [Id], [Text], [Answer], [Category] " +
                                                                    "FROM Privremeno " +
                                                                    "WHERE [Category] = 10 " +
                                                                    "ORDER BY [Category] ASC " +
                                                                    "UNION " +
                                                                    "SELECT TOP (1) [Id], [Text], [Answer], [Category] " +
                                                                    "FROM Privremeno " +
                                                                    "WHERE [Category] = 4 " +
                                                                    "ORDER BY [Category] ASC) T " +
                                                                    "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                            "UNION ALL " +
                                                            "SELECT * " +
                                                            "FROM Privremeno " +
                                                            "WHERE [Category] = 1 " +
                                                            "ORDER BY [Category] ASC " +
                                                            "OFFSET 5 ROWS " +
                                                            "FETCH NEXT 2 ROWS ONLY " +
                                                            "UNION ALL " +
                                                            "SELECT * " +
                                                            "FROM Privremeno " +
                                                            "WHERE [Category] = 5 " +
                                                            "ORDER BY [Category] ASC " +
                                                            "OFFSET 5 ROWS " +
                                                            "FETCH NEXT 2 ROWS ONLY " +
                                                            "UNION ALL " +
                                                            "SELECT * " +
                                                            "FROM Privremeno " +
                                                            "WHERE [Category] = 10 " +
                                                            "ORDER BY [Category] ASC " +
                                                            "OFFSET 5 ROWS " +
                                                            "FETCH NEXT 2 ROWS ONLY ) P ;").ToListAsync();
            
            return mapper.Map<List<Question>, List<QuestionResource>>(questions);
        }
        

        /** ### Desctiption
        * Function for checking forwarded answer 
        * ### Return value
        * Task<IActionResult> - positive IActionResult for corret answer and negative otherwise */
        [HttpPost("/api/v3/answer")]
        public async Task<IActionResult> TestName([FromBody]obj obj){
            string ques = await Task.FromResult(context.Questions.AsEnumerable()
            .Where(que => que.Text == obj.tex).Select(que=>que.Answer).FirstOrDefault());

            string quesWithoutAccents = RemoveAccents(ques);
		    string obj_ansWithoutAccents = RemoveAccents(obj.ans);

            if(quesWithoutAccents.Equals( obj_ansWithoutAccents, StringComparison.CurrentCultureIgnoreCase))
                return Json(true);
            else 
                return Json(false);
        }

        static string RemoveAccents(string textWithAccents) {
		    byte[] temp;
		    temp = System.Text.Encoding.GetEncoding("ISO-8859-8").GetBytes(textWithAccents);
		    return System.Text.Encoding.UTF8.GetString(temp);
	    }
                
    }
}
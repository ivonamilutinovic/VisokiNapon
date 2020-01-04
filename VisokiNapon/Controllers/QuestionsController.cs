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
//using Microsoft.Data.SqlClient;
//using System.Data.SqlClient;
namespace VISOKI_NAPON.Controllers
{   
    
    public class QuestionsController : Controller
    {   
        
        private readonly IMapper mapper;
        private readonly VisokiNaponDbContext context;
        public QuestionsController(VisokiNaponDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public class obj {
        public string tex {get;set;}
        public string ans {get;set;}
    }
        [HttpGet("/api/v3/questions")]
        public async Task<IEnumerable<QuestionResource>> GetQuestions(){
             var questions = await context.Questions
                                       .FromSqlRaw("SELECT Id, Text,null as Answer, Category " +
                                                   "FROM(SELECT TOP 5 * " +
                                                        "FROM dbo.Questions " +
                                                        "Where Category = 1 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                        "UNION ALL " +
                                                        "SELECT TOP 5 * " +
                                                        "FROM dbo.Questions " +
                                                        "Where Category = 2 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                        "UNION ALL " +
                                                        "SELECT TOP 1 * " +
                                                        "FROM dbo.Questions " +
                                                        "Where Category = 4 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) " +
                                                        "UNION ALL " +
                                                        "SELECT TOP 5 * " +
                                                        "FROM dbo.Questions " +
                                                        "Where Category = 3 " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND())) T " +
                                                        "ORDER BY RAND(CHECKSUM(*) * RAND()) ; ").ToListAsync();           

             return mapper.Map<List<Question>, List<QuestionResource>>(questions);
        }

      /*[HttpGet("/api/crash_rep")]
        public async Task<IEnumerable<any>> GetCrR(){
             var crashMid = await "goran".ToListAsync();
             return crashMid;
        }*/

        /*[HttpGet("/api/v3/answer")]
        public string v(){
            return "initialize....";
        }*/
        [HttpPost("/api/v3/answer")]
        public async Task<IActionResult> TestName([FromBody]obj obj){
            string ques = await Task.FromResult(context.Questions.AsEnumerable()
            .Where(que => que.Text == obj.tex).Select(que=>que.Answer).FirstOrDefault());
            if(ques.Equals( obj.ans, StringComparison.CurrentCultureIgnoreCase))
                return Json(true);
            else 
                return Json(false);
        }
        //logic
        //var query = from w in context.Questions where w.Text == text select w.Answer;
        /* 
     /* [HttpPost("/api/ex/par")]
        public UsersError Post([FromBody] string par ){
        return par;
        }*/
    }
}
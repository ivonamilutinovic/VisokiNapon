using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VisokiNapon.Data;
using VisokiNapon.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private readonly ILogger<QuestionController> _logger;

        public QuestionController(ILogger<QuestionController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public String Get()
        {
            return "Upotreba host/quesition/clientId/valueOfQuestion\n" +
                   "Ovaj metod ce kasnije biti obrisan, sad je tu fore radi!";
        }

        [HttpGet("{id}/{idQ}")]
        public Question Get(int id, int idQ)
        {
            // QuestionsForClientRepo hlp = new QuestionsForClientRepo();
            // return hlp.getQuestionForClientIdAndValue(id, idQ, num);

            return QuestionsForClientRepo.getQuestionForClientIdAndValue(id, idQ);

        }

    }
}

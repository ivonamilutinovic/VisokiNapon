using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClientApplication.Models;

namespace ClientApplication.Controllers
{
    public class ClientController : Controller{

        public IActionResult Answering()
        {
            return View();
        }

        public IActionResult MatrixOfQuestions()
        {
                return View();
        }

        public IActionResult ModeChoosing()
        {
                return View();
        }

        public IActionResult Question()
        {
                return View();
        }
    }
}

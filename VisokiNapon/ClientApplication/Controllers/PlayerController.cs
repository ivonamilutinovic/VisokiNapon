using ClientApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace ClientApplication.Controllers
{
    class PlayerController : Controller
    {

        private readonly ILogger<PlayerController> _logger;

        public PlayerController(ILogger<PlayerController> logger)
        {
            _logger = logger;
        }

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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

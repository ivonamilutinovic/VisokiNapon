using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClientApplication.Models;


namespace ClientApplication.Controllers
{
    class PlayerController : Controller
    {

        public IActionResult Player()
        {
            return View();
        }

    }
}

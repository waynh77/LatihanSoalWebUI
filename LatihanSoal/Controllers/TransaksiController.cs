using Microsoft.AspNetCore.Mvc;
using LatihanSoal.Models;

namespace LatihanSoal.Controllers
{
    public class TransaksiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Details(int Id)
        {
            Transaksi detail = new Transaksi { Id = Id };
            return PartialView("Details", detail);

        }

    }
}

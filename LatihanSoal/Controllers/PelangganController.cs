using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LatihanSoal.Controllers
{
    public class PelangganController : Controller
    {
        // GET: Pelanggan
        public ActionResult Index()
        {
            return View();
        }

        // GET: Pelanggan/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Pelanggan/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Pelanggan/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Pelanggan/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Pelanggan/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Pelanggan/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Pelanggan/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}

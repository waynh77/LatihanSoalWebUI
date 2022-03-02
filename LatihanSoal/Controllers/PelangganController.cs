using LatihanSoal.Helpers;
using LatihanSoal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

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
            var Model = new Pelanggan();

            return PartialView("Create",Model);
        }

        [HttpPost]
        public async Task<IActionResult> Save(Pelanggan Model)
        {

            using (var httpClient = new HttpClient())
            {
                var endpoint = String.Format("{0}/{1}", "https://localhost:7038/", "api/Pelanggan/Create");
                StringContent content = new StringContent(JsonConvert.SerializeObject(Model), Encoding.UTF8, "application/json");
                httpClient.DefaultRequestHeaders.Add("Authorization", String.Format("bearer {0}", ""));

                var response = await APICaller<ResponseAPI<Pelanggan>>.Execute(content, "POST", endpoint, Request);
                if (response.isSucceed)
                {
                    return Json(response);
                }
                else
                {
                    return Json(response);
                }
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

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
        public ActionResult Details(int Id)
        {
            Pelanggan pelanggan = new Pelanggan { Id = Id };
            return PartialView("Detail", pelanggan);

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
                var endpoint = String.Format("{0}/{1}", "https://localhost:7038", "api/Pelanggan/save");
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
            Pelanggan pelanggan = new Pelanggan { Id = id };
            return PartialView("Edit", pelanggan);
        }


        // GET: Pelanggan/Delete/5
        public ActionResult Delete(int id)
        {
            Pelanggan pelanggan = new Pelanggan { Id = id };
            return PartialView("Delete", pelanggan);
        }
         
        [HttpPost]
        public async Task<IActionResult> Hapus(Pelanggan Model)
        {
            using (var httpClient = new HttpClient())
            {
                var endpoint = String.Format("{0}/{1}", "https://localhost:7038", "api/Pelanggan/Delete");
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
    }
}

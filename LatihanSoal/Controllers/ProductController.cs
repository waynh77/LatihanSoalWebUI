using LatihanSoal.Helpers;
using LatihanSoal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace LatihanSoal.Controllers
{
    public class ProductController : Controller
    {
        // GET: ProductController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ProductController/Details/5
        public ActionResult Details(int id)
        {
            Product produk = new Product { Id = id };
            return PartialView("Details", produk);
        }

        // GET: ProductController/Create
        public ActionResult Create()
        {
            var Model = new Product();

            return PartialView("Create", Model);
        }

        [HttpPost]
        public async Task<IActionResult> Save(Product Model)
        {

            using (var httpClient = new HttpClient())
            {
                var endpoint = String.Format("{0}/{1}", "https://localhost:7038", "api/Product/save");
                StringContent content = new StringContent(JsonConvert.SerializeObject(Model), Encoding.UTF8, "application/json");
                httpClient.DefaultRequestHeaders.Add("Authorization", String.Format("bearer {0}", ""));

                var response = await APICaller<ResponseAPI<Product>>.Execute(content, "POST", endpoint, Request);
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
        // GET: ProductController/Edit/5
        public ActionResult Edit(int id)
        {
            Product produk = new Product { Id = id };
            return PartialView("Edit", produk);
        }


        // GET: ProductController/Delete/5
        public ActionResult Delete(int id)
        {
            Product produk = new Product { Id = id };
            return PartialView("Delete", produk);
        }

        [HttpPost]
        public async Task<IActionResult> Hapus(Product Model)
        {
            using (var httpClient = new HttpClient())
            {
                var endpoint = String.Format("{0}/{1}", "https://localhost:7038", "api/Product/Delete");
                StringContent content = new StringContent(JsonConvert.SerializeObject(Model), Encoding.UTF8, "application/json");
                httpClient.DefaultRequestHeaders.Add("Authorization", String.Format("bearer {0}", ""));

                var response = await APICaller<ResponseAPI<Product>>.Execute(content, "POST", endpoint, Request);
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

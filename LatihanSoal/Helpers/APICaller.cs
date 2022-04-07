using System.Net;

namespace LatihanSoal.Helpers
{
    public class APICaller<T>
    {
        public static async Task<T> Execute(StringContent content, string httpMethod, string endPoint, HttpRequest httpRequest = null, Dictionary<string, string> headers = null, ILogger logger = null)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(150);
                if (httpRequest != null)
                {
                    var isAnyAuthorization = httpRequest.Headers.TryGetValue("Authorization", out var authorizationValue);
                    if (isAnyAuthorization)
                    {
                        client.DefaultRequestHeaders.Add("Authorization", authorizationValue.ToString());
                    }
                }
                if (headers != null)
                {
                    foreach (var header in headers)
                    {
                        client.DefaultRequestHeaders.Add(header.Key, header.Value);
                    }
                }

                using (var response = httpMethod == "POST" ?
                await client.PostAsync(endPoint, content) :
                httpMethod == "GET" ?
                    await client.GetAsync(endPoint) :
                    await client.PostAsync(endPoint, content)//default=POST
                    )
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var readTask = await response.Content.ReadAsAsync<T>();

                        return readTask;
                    }
                    else //web api sent error response 
                    {
                        //log response status here..
                        if (logger != null)
                        {
                            string contentLog = await content?.ReadAsStringAsync();
                            logger.LogError(endPoint + " | " + response.RequestMessage.ToString() + "|" + contentLog);
                        }
                        if (response.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            throw new UnauthorizedAccessException();
                        }
                        if (response.StatusCode == HttpStatusCode.BadRequest)
                        {
                            throw new UnauthorizedAccessException();
                        }
                        else
                        {
                            throw new Exception(response.Content.ToString());
                        }
                    }
                }
            }
        }


    }
}

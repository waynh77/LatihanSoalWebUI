using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LatihanSoal.Models
{
    public class GlobalVariableParamModel
    {
        public string ConnectionString { get; set; }
        public string ApplicationName { get; set; }
        public string ApplicationDomain { get; set; }
        public string EnvironmentVariable { get; set; }
        public string ContentRootPath { get; set; }
        public string DeviceResultImageFolderPath { get; set; }
        public string ExportFolderPath { get; set; }
        public string DefaultDateTimeOffset { get; set; }
        public string EmailNotificationHost { get; set; }
        public int EmailNotificationPort { get; set; }
        public string EmailNotificationUsername { get; set; }
        public string EmailNotificationPassword { get; set; }
        public string ApiBaseUrl { get; set; }
        public string Bearer { get; set; } 
        public string CurrentBuild { get; set; }
    }

    //public class ApiResultParamModel
    //{
    //    public string Message { get; set; }
    //    public string error { get; set; }
    //    public bool? isSuccess { get; set; }
    //}

    public class ResponseAPI<T> where T : class
    {
        public bool isSucceed { get; set; }
        public string message { get; set; }
        public T returnValue { get; set; }
    }

    public class OutputAPI<T>
    {
        public int ResultCode { get; set; }
        public string ErrorMessage { get; set; }
        public T ReturnValue { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Immanuel.Terraform.Model.Aws
{
    public class AwsInput
    {
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public string Region { get; set; }

        public string GenStr { get; set; }

        public Lambda Lambda { get; set; }
    }
}
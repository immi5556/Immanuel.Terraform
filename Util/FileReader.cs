using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Immanuel.Terraform.Util
{
    public class FileReader
    {
        public static string ReadLamda()
        {
            return System.IO.File.ReadAllText(System.IO.Path.Combine(System.Environment.CurrentDirectory, "Data", "aws", "lambda", "lambda_basic_v1.tf"));
        }

        public static string ReadLamdaIam()
        {
            return System.IO.File.ReadAllText(System.IO.Path.Combine(System.Environment.CurrentDirectory, "Data", "aws", "lambda", "aws_iam_role.tf"));
        }
    }
}
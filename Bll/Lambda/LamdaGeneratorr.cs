using Scriban;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Immanuel.Terraform.Bll.Lambda
{
    public class LamdaGeneratorr
    {
        public static string Process(Model.Aws.AwsInput input)
        {
            input.GenStr = "";
            if (input.Lambda.NewRole)
            {
                input.GenStr = GenerateIamRole(input);
                input.Lambda.Role = "${aws_iam_role.tf_lambda_exec_role_Immanuele_v1.arn}";
            }

            var template = Template.Parse(Util.FileReader.ReadLamda());
            try
            {
                input.Lambda.Envvariable = new Dictionary<string, string>()
                {
                    { "key1", "val1" },
                    { "key2", "val2" }
                };

                //foreach(var v in input.Lambda.Envvariable)
                //{
                    
                //}
                return template.Render(new
                {
                    str = input.GenStr,
                    lambda = input.Lambda
                });
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.ToString());
            }

            return "";
        }

        public static string GenerateIamRole(Model.Aws.AwsInput input)
        {
            var template = Template.Parse(Util.FileReader.ReadLamdaIam());
            return template.Render(input);
        }
    }
}

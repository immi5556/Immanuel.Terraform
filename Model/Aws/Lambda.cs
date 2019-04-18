using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Immanuel.Terraform.Model.Aws
{
    public class Lambda
    {
        public string Functionname { get; set; }
        public string Handler { get; set; }
        public string Runtime { get; set; }
        public string Role { get; set; }

        public string Filename { get; set; }
        public string SourceCode { get; set; }

        public bool NewRole { get; set; }

        public Dictionary<string, string> Envvariable { get; set; }
    }
}

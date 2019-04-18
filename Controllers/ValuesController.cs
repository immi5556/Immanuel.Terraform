using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Immanuel.Terraform.Controllers
{
    [Route("api/aws")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [Route("lambda")]
        [HttpPost]
        public string Post([FromBody] Model.Aws.AwsInput input)
        {
            return Bll.Lambda.LamdaGeneratorr.Process(input);
        }
    }
}

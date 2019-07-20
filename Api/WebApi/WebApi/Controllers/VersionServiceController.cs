using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebDextraApi.Controller
{
    public class VersionServiceController : ApiController
    {
        [HttpGet]
        public string Version( )
        {
            return "1.1.5";
        }
    }
}

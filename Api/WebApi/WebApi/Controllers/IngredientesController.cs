using WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApi.Controller
{
    public class IngredientesController : ApiController
    {
        [HttpGet]
        public List<Ingrediente> GetAll( )
        {
            return Repository.Repository.Ingredientes.GetAll( );
        }
    }
}

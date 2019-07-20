using WebApi.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Repository;

namespace WebApi.Models
{
    public class Lanche
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public List<EnumIngrediente> Ingredientes { get; set; }
        public double Valor { get; set; }
    }
}
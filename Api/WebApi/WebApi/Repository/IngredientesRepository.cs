using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Enum;
using WebApi.Models;

namespace WebApi.Repository
{
    public class IngredientesRepository
    {
        public List<Ingrediente> GetAll( )
        {
            List<Ingrediente> returnAll = new List<Ingrediente>( );

            returnAll.Add( new Ingrediente { Id = EnumIngrediente.Alface, Valor = 0.40 } );
            returnAll.Add( new Ingrediente { Id = EnumIngrediente.Bacon, Valor = 2.00 } );
            returnAll.Add( new Ingrediente { Id = EnumIngrediente.HamburguerCarne, Valor = 3.00 } );
            returnAll.Add( new Ingrediente { Id = EnumIngrediente.Ovo, Valor = 0.80 } );
            returnAll.Add( new Ingrediente { Id = EnumIngrediente.Queijo, Valor = 1.50 } );

            return returnAll;
        }

        public Ingrediente GetById( EnumIngrediente p_Ingrediente )
        {
            return GetAll( ).Where( w => w.Id == p_Ingrediente ).FirstOrDefault( );
        }

        public double GetValorIngredientes( List<EnumIngrediente> p_List )
        {
            double sum = 0;
            if ( null != p_List )
            {
                foreach ( EnumIngrediente ingre in p_List )
                {
                    sum += GetById( ingre ).Valor;
                }
            }

            return sum;
        }
    }
}
using WebApi.Code;
using WebApi.Enum;
using WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApi.Controller
{
    public class LanchesController : ApiController
    {
        [HttpGet]
        public List<Lanche> GetAll( )
        {
            return Repository.Repository.Lanches.GetAll( );
        }

        //http://localhost:64814/api/Lanches/GetLanche?idLanche=1
        [HttpGet]
        public string GetLanche( [FromUri] int idLanche )
        {
            string conteudoLanche = string.Empty;

            Lanche lanche = Repository.Repository.Lanches.GetAll( ).FirstOrDefault( f => f.Id == idLanche );

            if ( null != lanche )
            {
                conteudoLanche = $"{lanche.Nome} - ";
                
                for ( int i=0; i<lanche.Ingredientes.Count; i++ )
                {
                    Ingrediente ingredi = Repository.Repository.Ingredientes.GetById( lanche.Ingredientes[ i ] );

                    int qtd = lanche.Ingredientes.Count;
                    conteudoLanche += $"{lanche.Ingredientes[ i ].GetEnumDescription( )}{(i == (qtd -2) ? " e " : ( i == (qtd -1) ? "" : ", " )) }";
                }
                
                Repository.Repository.Lanches.Promocao( lanche.Id );
                conteudoLanche = $"{conteudoLanche} - R$ {lanche.Valor.ToString( "#.00" )}";
            }

            return conteudoLanche;
        }

        [ HttpGet]
        public double GetSumPromocoes( [FromUri] int idLanche, [FromUri]string idsIngredientesAdicionais )
        {
            double valorDesconto = 0;

            Lanche lanche = Repository.Repository.Lanches.GetById( idLanche );
            if ( null != lanche )
            {
                List<EnumIngrediente> auxIngredientesAdicionais = new List<EnumIngrediente>( );

                if ( !string.IsNullOrEmpty( idsIngredientesAdicionais ) )
                {
                    idsIngredientesAdicionais.Split( ',' ).ToList( ).ForEach( f =>
                    {
                        auxIngredientesAdicionais.Add( ( EnumIngrediente )Convert.ToInt32( f ) );
                    } );
                }

                valorDesconto = Repository.Repository.Lanches.Promocao( idLanche, auxIngredientesAdicionais );
            }

            return valorDesconto;
        }
    }
}
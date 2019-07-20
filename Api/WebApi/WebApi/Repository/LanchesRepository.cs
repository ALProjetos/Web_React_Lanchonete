using WebApi.Enum;
using WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Repository
{
    public class LanchesRepository
    {
        public List<Lanche> GetAll( )
        {
            List<Lanche> returnAll = new List<Lanche>( );

            returnAll.Add(
                new Lanche
                {
                    Id = 1,
                    Nome = "X-Bacon",
                    Ingredientes = new List<EnumIngrediente>( ) { EnumIngrediente.Bacon, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo },
                    Valor = GetValorLanche( new List<EnumIngrediente>( ) { EnumIngrediente.Bacon, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo } )
                } );
            returnAll.Add(
                new Lanche
                {
                    Id = 2,
                    Nome = "X-Burger",
                    Ingredientes = new List<EnumIngrediente>( ) { EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo },
                    Valor = GetValorLanche( new List<EnumIngrediente>( ) { EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo } )
                } );
            returnAll.Add(
                new Lanche
                {
                    Id = 3,
                    Nome = "X-Egg",
                    Ingredientes = new List<EnumIngrediente>( ) { EnumIngrediente.Ovo, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo },
                    Valor = GetValorLanche( new List<EnumIngrediente>( ) { EnumIngrediente.Ovo, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo } )
                } );
            returnAll.Add(
                new Lanche
                {
                    Id = 4,
                    Nome = "X-Egg Bacon",
                    Ingredientes = new List<EnumIngrediente>( ) { EnumIngrediente.Ovo, EnumIngrediente.Bacon, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo },
                    Valor = GetValorLanche( new List<EnumIngrediente>( ) { EnumIngrediente.Ovo, EnumIngrediente.Bacon, EnumIngrediente.HamburguerCarne, EnumIngrediente.Queijo } )
                } );

            return returnAll;
        }

        public Lanche GetById( int p_IdLanche )
        {
            return GetAll( ).FirstOrDefault( f => f.Id == p_IdLanche );
        }

        // O valor do lanche é de acordo com os ingredientes
        public double GetValorLanche( List<EnumIngrediente> p_Ingredientes )
        {
            double value = 0;
            if ( null != p_Ingredientes )
            {
                value = Repository.Ingredientes.GetValorIngredientes( p_Ingredientes );
            }

            return value;
        }

        /**
         * PROMOÇÃO - REGRA DE NEGÓCIO

            Light
            Se o lanche tem alface e não tem bacon, ganha 10% de desconto.

            Muita carne
            A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...

            Muito queijo
            A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...

            Inflação
            Os valores dos ingredientes são alterados com frequência e não gastaríamos que isso influenciasse nos testes automatizados.
         **/
        public double Promocao( int p_IdLanche, List<EnumIngrediente> p_IngredientesAdicionais = null )
        {
            double desconto = 0;

            Lanche lanche = GetById( p_IdLanche );
            if ( null != lanche )
            {
                List<Ingrediente> allIngredientes = Repository.Ingredientes.GetAll( );
                List<EnumIngrediente> auxListIngredientesAdicionais = new List<EnumIngrediente>( );

                if ( null == p_IngredientesAdicionais )
                {
                    p_IngredientesAdicionais = new List<EnumIngrediente>( );
                }

                // Concatena as duas listas para somar o valor do lanche
                auxListIngredientesAdicionais = p_IngredientesAdicionais.Concat( lanche.Ingredientes.ToList( ) ).ToList( );

                /**
                 * Aplicando regras
                 **/
                // Se tem alface e não tem bacon, ganha 10% de desconto
                if ( auxListIngredientesAdicionais.Exists( e => e == EnumIngrediente.Alface ) && !auxListIngredientesAdicionais.Exists( e => e == EnumIngrediente.Bacon ) )
                {
                    double valorAdicional = Repository.Ingredientes.GetValorIngredientes( p_IngredientesAdicionais );
                    desconto = ( ( lanche.Valor + valorAdicional ) * 0.1 );
                }

                // A cada 3 conjuntos de carne, só paga 2
                int qtdHamburguerCarne = auxListIngredientesAdicionais.Count( c => c == EnumIngrediente.HamburguerCarne );
                desconto += ( ( qtdHamburguerCarne / 3 ) * Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

                // A cada 3 conjuntos de queijo, só paga 2
                int qtdQueijo = auxListIngredientesAdicionais.Count( c => c == EnumIngrediente.Queijo );
                desconto += ( ( qtdQueijo / 3 ) * Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            }

            return desconto;
        } 
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Controller;
using WebApi.Enum;

namespace WebApi.Tests
{
    //Deve possuir cobertura de testes automatizados para os seguintes pontos: Valor dos lanches de cardápio, regra para cálculo de preço e promoções.
    //https://docs.microsoft.com/pt-br/aspnet/web-api/overview/testing-and-debugging/unit-testing-with-aspnet-web-api
    [TestClass]
    public class LanchesTest
    {
        [TestMethod]
        public void ValorLanchesCardapio()
        {
            // Valor de cada ingrediente
            var allIngredientes = Repository.Repository.Ingredientes.GetAll( );

            var controller = new LanchesController( );
            var result = controller.GetAll( ) as List<Models.Lanche>;

            foreach ( Models.Lanche lanche in result )
            {
                double valueIngredientes = 0;
                lanche.Ingredientes.ForEach( f => valueIngredientes += Repository.Repository.Ingredientes.GetById( f ).Valor );

                Assert.AreEqual( lanche.Valor, valueIngredientes );
            }
        }

        [TestMethod]
        public void PromocaoLight( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 2 );
            
            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.Alface,
                EnumIngrediente.Ovo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => (int)s ) ) );

            // Tem que ter 10% de desconto
            Assert.AreEqual( ( ( lanche.Valor + valorAdicionais ) * 0.1 ), result );
        }

        [TestMethod]
        public void PromocaoMuitaCarne( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes).Count( w => w == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void PromocaoMuitoQueijo( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( w => w == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void PromocaoMuitaCarneMuitoQueijo( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            desconto += ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void Promocao6ParesDeCarneMuitoQueijo( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            desconto += ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void Promocao6ParesDeQueijoMuitaCarne( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            desconto += ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void Promocao6ParesDeQueijo6ParesDeCarne( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 1 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );
            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            desconto += ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            Assert.AreEqual( ( lanche.Valor + valorAdicionais ) - desconto, ( lanche.Valor + valorAdicionais ) - result );
        }

        [TestMethod]
        public void PromocaoLightMuitaCarneMuitoQueito( )
        {
            var lanche = Repository.Repository.Lanches.GetById( 2 );

            var adicionais = new List<EnumIngrediente> {
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.HamburguerCarne,
                EnumIngrediente.Queijo,
                EnumIngrediente.Queijo,
                EnumIngrediente.Alface
            };

            var valorAdicionais = Repository.Repository.Ingredientes.GetValorIngredientes( adicionais );

            var desconto = ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.Queijo ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.Queijo ).Valor );
            desconto += ( ( adicionais.Concat( lanche.Ingredientes ).Count( c => c == EnumIngrediente.HamburguerCarne ) / 3 ) * Repository.Repository.Ingredientes.GetById( EnumIngrediente.HamburguerCarne ).Valor );

            var controller = new LanchesController( );
            var result = controller.GetSumPromocoes( lanche.Id, string.Join( ",", adicionais.Select( s => ( int )s ) ) );

            var valorLanche = ( lanche.Valor + valorAdicionais );
            valorLanche -= ( valorLanche * 0.1 );
            valorLanche -= desconto;

            Assert.AreEqual( valorLanche, ( lanche.Valor + valorAdicionais ) - result );
        }
    }
}

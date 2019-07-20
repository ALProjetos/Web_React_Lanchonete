using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Controller;

namespace WebApi.Tests
{
    [TestClass]
    public class IngredientesTest
    {
        [TestMethod]
        public void GetAllIngredientes( )
        {
            var allIngredientes = Repository.Repository.Ingredientes.GetAll( );

            var controller = new IngredientesController( );

            var result = controller.GetAll( ) as List<Models.Ingrediente>;
            Assert.AreEqual( result.Count, allIngredientes.Count );
        }
    }
}

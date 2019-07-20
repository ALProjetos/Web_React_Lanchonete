using WebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Repository
{
    public class Repository
    {
        private static LanchesRepository mLanchesRepository = null;
        public static LanchesRepository Lanches
        {
            get
            {
                if ( null == mLanchesRepository )
                    mLanchesRepository = new LanchesRepository( );

                return mLanchesRepository;
            }
        }

        private static IngredientesRepository mIngredientesRepository = null;
        public static IngredientesRepository Ingredientes
        {
            get
            {
                if ( null == mIngredientesRepository )
                    mIngredientesRepository = new IngredientesRepository( );

                return mIngredientesRepository;
            }
        }
    }
}

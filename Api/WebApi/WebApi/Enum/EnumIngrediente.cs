using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Enum
{
    public enum EnumIngrediente
    {
        [Description( "Alface" )]
        Alface = 1,
        [Description( "Bacon" )]
        Bacon = 2,
        [Description( "Hambúrguer de carne" )]
        HamburguerCarne = 3,
        [Description( "Ovo" )]
        Ovo = 4,
        [Description( "Queijo" )]
        Queijo = 5
    }
}
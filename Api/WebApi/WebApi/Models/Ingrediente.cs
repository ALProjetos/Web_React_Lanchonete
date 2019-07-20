using WebApi.Code;
using WebApi.Enum;

namespace WebApi.Models
{
    public class Ingrediente
    {
        public EnumIngrediente Id { get; set; }
        public double Valor { get; set; }
        public string Name {

            get {

                return Id.GetEnumDescription( );
            }
        }
    }
}
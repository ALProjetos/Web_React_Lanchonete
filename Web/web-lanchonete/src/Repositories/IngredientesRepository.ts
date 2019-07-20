import client from 'src/Request/Request';
import { ILanches } from './LanchesRepository';

export interface IIngredientes{
    Id: number,
    Valor: number,
    Name: string
 }

 export interface IIngredientesAdicionais{
    Id: number,
    Name: string,
    Qtd: number,
    Valor: number
 }

class IngredientesRepository{

    public async GetAll(): Promise<IIngredientes[]>{
        return client.Get( "Ingredientes" );
    }

    public GetNameIngredientes(lanche: ILanches, allIngredientes: IIngredientes[]){
        let auxIngredientes = "";

        if(null != lanche && null != allIngredientes){

            lanche.Ingredientes.forEach((value, index, array) =>{
                const ingrediente = allIngredientes.find(f => f.Id === value);

                if(null != ingrediente){
                    auxIngredientes += ingrediente.Name + (index === (array.length -2) ? " e " : (index === (array.length -1) ? "" : ", "))
                }
            });
        }

        return auxIngredientes;
    }

    public GetValueIngredientesAdicionais(lstIngredientesAdicionais: IIngredientesAdicionais[]){
        let sum = 0;

        if(null != lstIngredientesAdicionais){
            lstIngredientesAdicionais.forEach(f =>{
                sum += f.Valor * f.Qtd;
            });
        }

        return sum;
    }
}

const ingredientesRepository = new IngredientesRepository();
export default ingredientesRepository;
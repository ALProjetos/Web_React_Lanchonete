import IngredienteEntity from '../entity/ingrediente_entity';
import EnumIngrediente from '../enum/enumIngrediente';

class IngredienteRepository {
    
    public static async getAll(): Promise<any[]> {
        return await IngredienteEntity.find();
    }

    public static async getById(idIngrediente: EnumIngrediente): Promise<typeof IngredienteEntity | undefined> {
        var ingrediente: typeof IngredienteEntity | undefined;

        try {

            ingrediente = (await this.getAll()).find(f => f.id === idIngrediente);

        } catch (error) {
            console.log(`[Erro] getById ${error}`);
        }

        return ingrediente;
    }

    public static async getValorIngredientes(lstIngredientes: EnumIngrediente[]): Promise<number> {
        var sum: number = 0;

        try{

            if(lstIngredientes?.length > 0){
                var lstSum = (await this.getAll()).filter(f => lstIngredientes.indexOf(f.id) >= 0);

                lstSum.forEach(f =>{
                    sum += f.valor;
                });
            }

        } catch(error){
            console.log(`[Erro] getValorIngredientes ${error}`);
        }

        return sum;
    }
}

export default IngredienteRepository;
import client from 'src/Request/Request';

export interface ILanches{
    Id: number,
    Nome: string,
    Ingredientes: number[],
    Valor: number
 }

class LanchesRepository{

    public async GetAll(): Promise<ILanches[]>{
        return await client.Get( "Lanches" );
    }

    public async GetPromocao(idLanche: number, lstIngredientesAdicionais: number[]): Promise<number>{
        return client.Get(
            `Lanches/GetSumPromocoes?idLanche=${idLanche}&idsIngredientesAdicionais=${lstIngredientesAdicionais.join(",")}`
        );
    }
}

const lanchesRepository = new LanchesRepository();
export default lanchesRepository;
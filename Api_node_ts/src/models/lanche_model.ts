import EnumIngrediente from "../enum/enumIngrediente";

interface ILacheModel {
    Id?: string;
    Nome?: string;
    Valor?: number;
    Ingredientes?: typeof EnumIngrediente[];
}

class LacheModel implements ILacheModel {
    constructor(id: string, nome: string, valor: number, ingredientes: typeof EnumIngrediente[]){
        this.Id = id;
        this.Nome = nome;
        this.Valor = valor;
        this.Ingredientes = ingredientes;
    }

    Id?: string;
    Nome?: string;
    Valor?: number;
    Ingredientes?: (typeof EnumIngrediente)[];
}

export default LacheModel;
import enumIngrediente from "../enum/enumIngrediente";

interface IIngredienteModel {
    Id?: enumIngrediente;
    Name?: string;
    Valor?: number;
}

class IngredienteModel implements IIngredienteModel {
    constructor(id: enumIngrediente, name: string, valor: number){
        this.Id = id;
        this.Name = name;
        this.Valor = valor;
    }

    Id?: enumIngrediente;
    Name?: string;
    Valor?: number;
}

export default IngredienteModel;
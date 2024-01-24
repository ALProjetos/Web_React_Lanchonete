import mongoose, { Document, Schema } from 'mongoose';
import enumIngrediente from '../enum/enumIngrediente';

interface IIngredienteEntity extends Document {
  id: enumIngrediente;
  name: string;
  valor: number;
}

const IngredienteEntitySchema = new Schema({
  id: { type: String, require: true, enum: Object.keys(enumIngrediente) },
  name: { type: String, required: true, unique: true },
  valor: { type: Number, required: true }
});

const IngredienteEntity = mongoose.model<IIngredienteEntity>('Ingrediente', IngredienteEntitySchema);

// class IngredienteEntity implements IIngredienteEntity {
//   constructor(id: EnumIngrediente, valor: number){
//       this.id = id;
//       this.valor = valor;
//       this.name = id.toString();
//   }

//   id: EnumIngrediente;
//   name: string;
//   valor: number;
// }

export default IngredienteEntity;

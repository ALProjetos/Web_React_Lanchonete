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

export default IngredienteEntity;

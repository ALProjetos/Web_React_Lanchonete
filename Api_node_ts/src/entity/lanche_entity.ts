import mongoose, { Document, Schema } from 'mongoose';
import IngredienteEntity from './ingrediente_entity';

interface ILancheEntity extends Document {
  nome: string;
  valor: number;
  ingredientes: typeof IngredienteEntity[];
}

const LancheEntitySchema = new Schema({
    nome: { type: String, required: true, unique: true },
    valor: { type: Number, required: true },
    ingredientes: { type: Array, require: true }
});

const LancheEntity = mongoose.model<ILancheEntity>('Lanche', LancheEntitySchema);

export default LancheEntity;

import { Request, Response } from 'express';
import IngredienteRepository from '../repository/ingrediente_repository';
import IngredienteModel from '../models/ingrediente_model';

class IngredienteController {

  public static async getAllRequest(req: Request, res: Response): Promise<void> {
    try {
        const ingredientes = await IngredienteRepository.getAll();

        let ingredientesModel: IngredienteModel[] = (ingredientes ?? []).map(m =>
          new IngredienteModel(m.id, m.name, m.valor)
        );

        res.status(200).json(ingredientesModel);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default IngredienteController;

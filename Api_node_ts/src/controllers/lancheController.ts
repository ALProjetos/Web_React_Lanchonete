import { Request, Response } from 'express';
import LancheRepository from '../repository/lanche_repository';
import EnumIngrediente from '../enum/enumIngrediente';
import EnumParse from '../enum/enumParse';
import LancheModel from '../models/lanche_model';

class LancheController {

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
        const lanches = await LancheRepository.getAll();

        let lanchesModel: LancheModel[] = (lanches ?? []).map(m =>
          new LancheModel(
            m._id,
            m.nome,
            m.valor,
            (m.ingredientes ?? []).map((m: string) => EnumParse.parse<EnumIngrediente>(EnumIngrediente, m))
          )
        );

        res.status(200).json(lanchesModel);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async getLanche(req: Request, res: Response): Promise<void> {
    try {
      let conteudoLanche: string = '';

      const lanche: any = await LancheRepository.getById(req.params.idLanche);

      if(null != lanche){
        conteudoLanche = `${lanche.nome} - `;

        for(var index = 0; index < lanche.ingredientes.length; index ++){
          var enumIngrediente: any = lanche.ingredientes[index];

          var qtd: number = lanche.ingredientes.length;
          conteudoLanche += `${enumIngrediente}${index == (qtd - 2) ? " e " : (index == (qtd - 1) ? "" : ", ")}`;
        }

        conteudoLanche = `${conteudoLanche} - R$ ${lanche.valor.toString("#.00")}`;
      }

      res.status(200).json(conteudoLanche);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async getSumPromocoes(req: Request, res: Response): Promise<void> {
    try {
      let valorDesconto: number = 0;

      console.log("getSumPromocoes");

      const lanche: any = await LancheRepository.getById(req.query.idLanche as string);

      if(null != lanche){
        let lstIngredientes: EnumIngrediente[] = [];
        let ingredientesAdicionais: string = req.query.idsIngredientesAdicionais as string;

        console.log(ingredientesAdicionais);

        if(ingredientesAdicionais?.length > 0){
          
          ingredientesAdicionais.split(',').forEach(f => {
            lstIngredientes.push(EnumParse.parse(EnumIngrediente, f));
          });
        }

        valorDesconto = await LancheRepository.getPromocao(req.query.idLanche as string, lstIngredientes);
      }

      res.status(200).json(valorDesconto);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default LancheController;

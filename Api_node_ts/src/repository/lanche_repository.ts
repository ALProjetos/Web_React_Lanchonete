import LancheEntity from '../entity/lanche_entity';
import EnumIngrediente from '../enum/enumIngrediente';
import IngredienteRepository from '../repository/ingrediente_repository';
import EnumParse from '../enum/enumParse';

class LancheRepository {

    public static async getAll(): Promise<any[]> {
        return await LancheEntity.find();
    }

    public static async getById(id: string): Promise<typeof LancheEntity | null> {
        return await LancheEntity.findById(id) ?? null;
    }

    public static async getValor(lstIngredientes: EnumIngrediente[]) : Promise<number> {
        var value: number = 0;

        if(lstIngredientes?.length > 0){
            value = await IngredienteRepository.getValorIngredientes(lstIngredientes);
        }

        return value;
    }

    /**
     * PROMOÇÃO - REGRA DE NEGÓCIO

        Light
        Se o lanche tem alface e não tem bacon, ganha 10% de desconto.

        Muita carne
        A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...

        Muito queijo
        A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...

        Inflação
        Os valores dos ingredientes são alterados com frequência e não gastaríamos que isso influenciasse nos testes automatizados.
    **/

    public static async getPromocao(id: string, lstIngredientesAdicionais?: EnumIngrediente[]) : Promise<number> {
        var desconto: number = 0;

        let lanche: any = await this.getById(id);
        if( null != lanche ){

            var auxLstIngredientesAdicionais: EnumIngrediente[] = [];

            if(lstIngredientesAdicionais?.length == 0)
                lstIngredientesAdicionais = [];

            auxLstIngredientesAdicionais = lstIngredientesAdicionais
                ?.concat(lanche.ingredientes)
                ?.map(m => m = EnumParse.parse<EnumIngrediente>(EnumIngrediente, m))
                ?? [];

            /**
             * Aplicando regras
             **/
            // Se tem alface e não tem bacon, ganha 10% de desconto
            if(auxLstIngredientesAdicionais.findIndex(i => i === EnumParse.parse(EnumIngrediente, EnumIngrediente.Alface)) >= 0
                && auxLstIngredientesAdicionais.findIndex(i => i === EnumParse.parse(EnumIngrediente, EnumIngrediente.Bacon)) < 0
            ){
                var valorAdicional: number = await IngredienteRepository.getValorIngredientes(lstIngredientesAdicionais ?? []);
                desconto = (lanche.valor + valorAdicional) * 0.1;
            }

            var hamburguerCarne: any = await IngredienteRepository.getById(EnumParse.parse(EnumIngrediente, EnumIngrediente.HamburguerCarne));
            var queijo: any = await IngredienteRepository.getById(EnumParse.parse(EnumIngrediente, EnumIngrediente.Queijo));

            // A cada 3 conjuntos de carne, só paga 2
            var qtdHamburguerCarne = auxLstIngredientesAdicionais.filter(f => f === EnumParse.parse(EnumIngrediente, EnumIngrediente.HamburguerCarne)).reduce((sum) => sum += 1, 0);
            desconto += parseInt(`${(qtdHamburguerCarne / 3)}`) * hamburguerCarne.valor;

            // A cada 3 conjuntos de queijo, só paga 2
            var qtdQueijo = auxLstIngredientesAdicionais.filter(f => f === EnumParse.parse(EnumIngrediente, EnumIngrediente.Queijo)).reduce((sum) => sum += 1, 0);
            desconto += parseInt(`${(qtdQueijo / 3)}`) * queijo.valor;
        }

        return desconto;
    }
}


export default LancheRepository;
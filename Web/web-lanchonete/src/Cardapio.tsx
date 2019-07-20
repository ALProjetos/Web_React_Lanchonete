import * as React from 'react';
import { Dimmer, Header, Loader, Segment, Table } from 'semantic-ui-react';
import IndexIngredientesRedux from './Redux/Containers/IndexIngredientesRedux';
import ingredientesRepository, { IIngredientes } from './Repositories/IngredientesRepository';
import { ILanches } from "./Repositories/LanchesRepository";

export interface ILanchesProps{
    lstIngredientes?: IIngredientes[],
    lstLanches?: ILanches[]
}

export default class Cardapio extends React.Component<ILanchesProps, {}> {
    constructor(props: any){
      super(props);
    }

    public sortListLanches = (lanche1: ILanches, lanche2: ILanches): number =>{
        return((lanche1.Nome.toUpperCase() > lanche2.Nome.toUpperCase()) ? 1 : (lanche1.Nome.toUpperCase() < lanche2.Nome.toUpperCase() ? -1 : 0));
    }

    public sortListIngredientes = (ingred1: IIngredientes, ingred2: IIngredientes): number =>{
        return((ingred1.Name.toUpperCase() > ingred2.Name.toUpperCase()) ? 1 : (ingred1.Name.toUpperCase() < ingred2.Name.toUpperCase() ? -1 : 0));
    }

    public render() {
        const allIngredientes = (this.props.lstIngredientes || []).sort(this.sortListIngredientes);
        const allLanches = (this.props.lstLanches || []).sort(this.sortListLanches);
    
        return (
            <Segment>
                <Dimmer>
                    <Loader content='Loading' />
                </Dimmer>
                <IndexIngredientesRedux />         
                <Table color={allLanches.length > 0 ? "green" : undefined} celled={true}>
                    { allLanches.length > 0 ?
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Lanche</Table.HeaderCell>
                                <Table.HeaderCell>Ingredientes</Table.HeaderCell>
                                <Table.HeaderCell>Valor</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        :
                        <Table.Header>
                            <Table.Row textAlign="center" warning={true}>
                                <Header as='h3'>Sem registros</Header>
                            </Table.Row>
                        </Table.Header>
                    }
                    <Table.Body>
                        { allLanches.map( obj =>
                            <Table.Row key={obj.Id}>
                                <Table.Cell>{obj.Nome}</Table.Cell>
                                <Table.Cell>{ingredientesRepository.GetNameIngredientes(obj, allIngredientes)}</Table.Cell>
                                <Table.Cell>R$ {obj.Valor.toFixed(2)}</Table.Cell>
                            </Table.Row>
                        ) }
                    </Table.Body>
                </Table>
            </Segment>
        )
    }
}
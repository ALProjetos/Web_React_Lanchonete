import * as React from 'react';
import { Button, Header, Modal, Segment, Table } from 'semantic-ui-react';
import { IIngredientes } from "./Repositories/IngredientesRepository";

export interface IIngredientesProps{
    lstIngredientes?: IIngredientes[]
}

export interface IIngredientesState{
    show?: boolean    
}

export default class Ingredientes extends React.Component<IIngredientesProps, IIngredientesState> {
    constructor(props: any){
      super(props);

      this.state ={
          show: false
      }
    }

    public onClick = () => {
        this.setState({ show: !this.state.show });
    }

    public render() {
        const allIngredientes = (this.props.lstIngredientes || []);

        return (
            <Segment>
                <Button onClick={this.onClick}>Ingredientes Adicionais</Button>
                <Modal closeOnDimmerClick={false} size="tiny" open={this.state.show} onClose={this.onClick}>
                    <Modal.Header>Ingredientes Adicionais</Modal.Header>
                    <Modal.Content scrolling={true}>
                    <Table color={allIngredientes.length > 0 ? "green" : undefined} celled={true}>
                        { allIngredientes.length > 0 ?
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Ingrediente</Table.HeaderCell>
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
                            { allIngredientes.map( obj =>
                                <Table.Row key={obj.Id}>
                                    <Table.Cell>{obj.Name}</Table.Cell>
                                    <Table.Cell>R$ {obj.Valor.toFixed(2)}</Table.Cell>
                                </Table.Row>
                            ) }
                        </Table.Body>
                    </Table>
                    </Modal.Content>
                    <Modal.Actions>                        
                        <Button onClick={this.onClick} positive={true} icon='checkmark' labelPosition='right' content='Fechar' />
                    </Modal.Actions>
                </Modal>
            </Segment>
        )
    }
}
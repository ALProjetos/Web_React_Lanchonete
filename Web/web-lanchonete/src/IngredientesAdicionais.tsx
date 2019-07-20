import * as React from 'react';
import { Button, Label, Modal, Table } from 'semantic-ui-react';
import { IIngredientes, IIngredientesAdicionais } from "./Repositories/IngredientesRepository";

 export interface IIngredientesAdicionaisState{
     lstIngredientesAdicionais?: IIngredientesAdicionais[]
 }

export interface IIngredientesAdicionaisProps{
    lstIngredientes?: IIngredientes[],
    lstIngredientesAdicionais?: IIngredientesAdicionais[],
    show: boolean,
    showHiddenIngredientes: (show: boolean) => void,
    setIngredientesAdicionais: (lstIngredientesAdicionais: IIngredientesAdicionais[]) => void
}

export default class IngredientesAdicionais extends React.Component<IIngredientesAdicionaisProps, IIngredientesAdicionaisState> {
    constructor(props: any){
      super(props);

      this.state ={
          lstIngredientesAdicionais: this.props.lstIngredientesAdicionais
      }
    }

    public onAddItem = (ingrediente: IIngredientes) =>{
        const auxLstIngredientesAdicionais = this.state.lstIngredientesAdicionais || [];
        let auxIngrediente = auxLstIngredientesAdicionais.find(f => f.Id === ingrediente.Id);

        if(null != ingrediente){

            if(null == auxIngrediente){
                auxIngrediente = {
                    Id: ingrediente.Id,                    
                    Name: ingrediente.Name,
                    Qtd: 1,
                    Valor: ingrediente.Valor
                };

                auxLstIngredientesAdicionais.push(auxIngrediente);
            }
            else{
                auxIngrediente.Qtd += 1;
                auxLstIngredientesAdicionais[auxLstIngredientesAdicionais.indexOf(auxIngrediente)] = auxIngrediente;
            }

            this.setState({ lstIngredientesAdicionais: auxLstIngredientesAdicionais });
        }
    }

    public onRemoveItem = (ingrediente: IIngredientes) =>{
        const auxLstIngredientesAdicionais = this.state.lstIngredientesAdicionais || [];
        const auxIngrediente = auxLstIngredientesAdicionais.find(f => f.Id === ingrediente.Id);

        if(null != ingrediente && null != auxIngrediente){            
            if(auxIngrediente.Qtd -1 >= 0){
                auxIngrediente.Qtd -= 1;
            }

            if(auxIngrediente.Qtd > 0){
                auxLstIngredientesAdicionais[auxLstIngredientesAdicionais.indexOf(auxIngrediente)] = auxIngrediente;
            }
            else{
                auxLstIngredientesAdicionais.findIndex((value, index, obj) =>{
                    if(value.Id === ingrediente.Id){
                        auxLstIngredientesAdicionais.splice(index, 1);
                    }

                    return value.Id === ingrediente.Id
                });
            }

            this.setState({ lstIngredientesAdicionais: auxLstIngredientesAdicionais });
        }  
    }

    public onClickCancel = () => {
        this.props.showHiddenIngredientes(!this.props.show);
    }

    public onClickSave = () =>{
        const auxLstIngredientesAdicionais = this.state.lstIngredientesAdicionais;
        this.props.showHiddenIngredientes(!this.props.show);

        if(null != auxLstIngredientesAdicionais){
            this.props.setIngredientesAdicionais(auxLstIngredientesAdicionais);
        }

        this.setState({ lstIngredientesAdicionais: []});
    }

    public onGetQuantidade = (idIngrediente: number) =>{
        const auxLstIngredientesAdicionais = this.state.lstIngredientesAdicionais || [];
        let qtd = 0;

        auxLstIngredientesAdicionais.find((value, index, obj)=>{
            if(value.Id === idIngrediente){
                qtd = value.Qtd;
            }
            return value.Id === idIngrediente;
        });

        return qtd;
    }

    public render() {

        if(this.state.lstIngredientesAdicionais !== this.props.lstIngredientesAdicionais){
            this.setState({lstIngredientesAdicionais: this.props.lstIngredientesAdicionais});
        }
    
        return (
            <Modal closeOnDimmerClick={false} size="tiny" open={this.props.show} onClose={this.onClickCancel}>
                <Modal.Header>Ingredientes Adicionais</Modal.Header>
                <Modal.Content scrolling={true}>
                <Table color="green" celled={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ingrediente</Table.HeaderCell>
                            <Table.HeaderCell>Valor</Table.HeaderCell>
                            <Table.HeaderCell>Quantidade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { (this.props.lstIngredientes || []).map( obj =>
                            <Table.Row key={obj.Id}>
                                <Table.Cell>{obj.Name}</Table.Cell>
                                <Table.Cell>R$ {obj.Valor.toFixed(2)}</Table.Cell>
                                <Table.Cell width="5">
                                    <Button icon='minus' onClick={this.onRemoveItem.bind(this, obj)} />
                                    <Label>{this.onGetQuantidade(obj.Id)}</Label>
                                    <Button icon='plus' onClick={this.onAddItem.bind(this, obj)} />
                                </Table.Cell>
                            </Table.Row>
                        ) }
                    </Table.Body>
                </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onClickCancel} negative={true} content='Cancelar' />
                    <Button onClick={this.onClickSave} positive={true} icon='checkmark' labelPosition='right' content='Salvar' />
                </Modal.Actions>
            </Modal>
        )
    }
}
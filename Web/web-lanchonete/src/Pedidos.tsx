import * as React from 'react';
import { Button, Dropdown, Form, Header, Modal, Segment, Table } from 'semantic-ui-react';
import IndexIngredientesAdicionaisRedux from './Redux/Containers/IndexIngredientesAdicionaisRedux';
import ingredientesRepository, { IIngredientes, IIngredientesAdicionais } from "./Repositories/IngredientesRepository";
import lanchesRepository, { ILanches } from "./Repositories/LanchesRepository";

export interface IPedidos{
    lanche: ILanches,
    lstIngredientesAdicionais?: IIngredientesAdicionais[]
}

export interface IPedidosProps{
    lstIngredientes?: IIngredientes[],
    lstLanches?: ILanches[]
}

export interface IPedidosState{
    idLanche: number,
    idLancheModify: number,
    lstLanchesPedidos: IPedidos[],
    lstMsgsPedidos: string[],
    showIngredientes: boolean,
    showMsgsPedidos: boolean,
    showRemoveAllPedidos: boolean
}

export default class Pedidos extends React.Component<IPedidosProps, IPedidosState> {

    constructor(props: any){
      super(props);

      this.state={
        idLanche: -1,
        idLancheModify: -1,
        lstLanchesPedidos: [],
        lstMsgsPedidos: [],
        showIngredientes: false,
        showMsgsPedidos: false,
        showRemoveAllPedidos: false
      }
    }

    public onChangeLanche = (ev: any, element: any) =>{
        this.setState({ idLanche: element.value });
    }

    public onClick = (auxIdLancheModify: number) => {
        this.setState({
            idLancheModify: auxIdLancheModify,
            showIngredientes: !this.state.showIngredientes
        });
    }

    public onAddLanche = () => {
        const newLanche = (this.props.lstLanches || []).find(f => f.Id === this.state.idLanche);

        if(null != newLanche){
            const auxLstLanchesPedidos = this.state.lstLanchesPedidos;

            const lanche: IPedidos = { lanche: newLanche, lstIngredientesAdicionais: undefined };
            auxLstLanchesPedidos.push(lanche);

            this.setState({
                lstLanchesPedidos: auxLstLanchesPedidos
            });
        }
    }

    public onRemoveLanche = (idLanche: number) =>{
        const auxLstLanchesPedidos = this.state.lstLanchesPedidos;

        auxLstLanchesPedidos.findIndex((value, index, obj) =>{
            if(value.lanche.Id === idLanche){
                auxLstLanchesPedidos.splice(index, 1);
            }

            return value.lanche.Id === idLanche;
        });

        this.setState({ lstLanchesPedidos: auxLstLanchesPedidos });
    }

    public showHiddenIngredientes = (show: boolean) =>{
        this.setState({showIngredientes: show})
    }

    public setIngredientesAdicionais = (lstIngredientesAdicionais: IIngredientesAdicionais[]) =>{
        const auxLstLanchesPedidos = (this.state.lstLanchesPedidos || []);        

        if(null != lstIngredientesAdicionais){
            const lanchesPedidos = auxLstLanchesPedidos.find(f => f.lanche.Id === this.state.idLancheModify);

            if(null != lanchesPedidos){

                lanchesPedidos.lstIngredientesAdicionais = lstIngredientesAdicionais;
                auxLstLanchesPedidos[auxLstLanchesPedidos.indexOf(lanchesPedidos)] = lanchesPedidos;
            }

            this.setState({lstLanchesPedidos: auxLstLanchesPedidos});
        }
    }

    public getSumTotal(pedido: IPedidos){

        const sumLanche = pedido.lanche.Valor;
        const sumAdicionais = ingredientesRepository.GetValueIngredientesAdicionais(pedido.lstIngredientesAdicionais || []);

        return sumLanche + sumAdicionais;
    }

    public getListaIngredientesAdicionais(){
        let lstIngredientesAdicionais: IIngredientesAdicionais[] = [];

        if(-1 !== this.state.idLancheModify){
            
            this.state.lstLanchesPedidos.findIndex((value, index, obj) =>{
                if(value.lanche.Id === this.state.idLancheModify){
                    lstIngredientesAdicionais = (value.lstIngredientesAdicionais || []);
                }

                return value.lanche.Id === this.state.idLancheModify;
            });
        }

        return lstIngredientesAdicionais;
    }

    public getNameIngredientes(pedido: IPedidos){
        let allIngredientes: string = "";

        if(null != pedido){
            allIngredientes = ingredientesRepository.GetNameIngredientes(pedido.lanche, (this.props.lstIngredientes || []));
        }

        return allIngredientes;
    }

    public getNameIngredientesAdicionais(pedido: IPedidos){
        let allIngredientes: string = "";

        if(null != pedido && null != pedido.lstIngredientesAdicionais){

            pedido.lstIngredientesAdicionais.forEach((value, index, array) =>{
                const ingrediente = (this.props.lstIngredientes || []).find(f => f.Id === value.Id);

                if(null != ingrediente && value.Qtd > 0){
                    allIngredientes += value.Qtd + " " + ingrediente.Name + (index === (array.length -2) ? " e " : (index === (array.length -1) ? "" : ", "))
                }
            });
        }

        return allIngredientes;
    }

    public onCancelar = () =>{
        if(null != this.state.lstLanchesPedidos && this.state.lstLanchesPedidos.length > 0){
            this.setState({            
                showRemoveAllPedidos: true
            });
        }
    }

    /*public async teste(idLanche: number, lstAllIngredientes: number[]){
        let desconto: number = 0;

        desconto = await lanchesRepository.GetPromocao(idLanche, lstAllIngredientes);
    
        return desconto;
    }*/

    public onCalcular = () =>{
        this.setState({ lstMsgsPedidos: [] });

        const auxLstMsgsPedidos: string[] = JSON.parse(JSON.stringify(this.state.lstMsgsPedidos));
        const lstLanchesPedidos: IPedidos[] = JSON.parse(JSON.stringify(this.state.lstLanchesPedidos));

        if(null !== lstLanchesPedidos && lstLanchesPedidos.length > 0){

            lstLanchesPedidos.forEach( async (f) =>{
                const lstAllIngredientes: number[] = [];

                if(null != f.lstIngredientesAdicionais){

                    f.lstIngredientesAdicionais.forEach(fIng => {
                        for(let index=0; index<fIng.Qtd; index++){
                            lstAllIngredientes.push(fIng.Id);
                        }
                    });
                }

                const sumAdicionais = ingredientesRepository.GetValueIngredientesAdicionais((f.lstIngredientesAdicionais || []));
                const desconto = await lanchesRepository.GetPromocao(f.lanche.Id, lstAllIngredientes);

                auxLstMsgsPedidos.push(
                    `Lanche: ${f.lanche.Nome} - Valor: R$ ${(f.lanche.Valor + sumAdicionais).toFixed(2)} - Desconto: R$ ${desconto.toFixed(2)} - Valor Total: R$ ${((f.lanche.Valor + sumAdicionais) - desconto).toFixed(2)}`
                );

                this.setState({
                    lstMsgsPedidos: auxLstMsgsPedidos,
                    showMsgsPedidos: true
                });
            });
        }
    }

    public onCloseModalPedidos = () =>{
        this.setState({ showRemoveAllPedidos: false });
    }

    public onCancelModalPedidos = () =>{
        this.setState({
            idLanche: -1,
            idLancheModify: -1,
            lstLanchesPedidos: [],
            showRemoveAllPedidos: !this.state.showRemoveAllPedidos
        });
    }

    public onCloseModalMsgsPedidos = () =>{
        this.setState({
            lstMsgsPedidos: [],
            showMsgsPedidos: !this.state.showMsgsPedidos,
            showRemoveAllPedidos: false
        });
    }

    public render() {
        const allLanches = this.props.lstLanches || [];
        const lstLanchesPedidos = this.state.lstLanchesPedidos || [];

        return (
            <Segment>
                <Form>
                    <Form.Group>
                        <Dropdown
                            placeholder="Buscar lanche ..."
                            fluid={true}
                            search={true}
                            selection={true}
                            noResultsMessage="Sem registros"
                            options={allLanches.map(m =>({ key: m.Id, text: m.Nome, value: m.Id }))}
                            value={(this.state.idLanche > 0 ? this.state.idLanche : "")}
                            onChange={this.onChangeLanche} />
                        <Button icon='plus' positive={true} floated="right" onClick={this.onAddLanche} />
                    </Form.Group>
                </Form>
                <Segment>
                    <Table color={lstLanchesPedidos.length > 0 ? "green" : undefined} celled={true}>
                        { lstLanchesPedidos.length > 0 ?
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Lanche</Table.HeaderCell>
                                    <Table.HeaderCell>Ingredientes</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Lanche</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Adicionais</Table.HeaderCell>
                                    <Table.HeaderCell>Ingredientes Adicionais</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Total</Table.HeaderCell>
                                    <Table.HeaderCell width="1">Adicionais</Table.HeaderCell>
                                    <Table.HeaderCell width="1">Remover</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        : 
                        <Table.Header>
                            <Table.Row textAlign="center" warning={true}>
                                <Header as='h3'>Sem pedidos de lanches</Header>
                            </Table.Row>
                        </Table.Header>
                        }
                        <Table.Body>
                            { lstLanchesPedidos.map( obj =>
                                <Table.Row key={obj.lanche.Id}>
                                    <Table.Cell>{obj.lanche.Nome}</Table.Cell>
                                    <Table.Cell>{this.getNameIngredientes(obj)}</Table.Cell>
                                    <Table.Cell>R$ {obj.lanche.Valor.toFixed(2)}</Table.Cell>
                                    <Table.Cell>R$ {ingredientesRepository.GetValueIngredientesAdicionais(obj.lstIngredientesAdicionais || []).toFixed(2)}</Table.Cell>
                                    <Table.Cell>{this.getNameIngredientesAdicionais(obj)}</Table.Cell>
                                    <Table.Cell>R$ {this.getSumTotal(obj).toFixed(2)}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon='plus' onClick={this.onClick.bind(this, obj.lanche.Id)}/>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon='minus' negative={true} onClick={this.onRemoveLanche.bind(this, obj.lanche.Id)} />
                                    </Table.Cell>
                                </Table.Row>
                            ) }
                        </Table.Body>
                    </Table>
                </Segment>
                <Segment>
                    <Button.Group >
                        <Button onClick={this.onCancelar}>Cancelar</Button>
                        <Button.Or />
                        <Button onClick={this.onCalcular} positive={true}>Calcular</Button>
                    </Button.Group>
                </Segment>
                <Modal key="modalRemoveAllPedidos" size="mini" open={this.state.showRemoveAllPedidos}>
                    <Modal.Header>Cancelar pedido</Modal.Header>
                    <Modal.Content>
                        <p>Deseja remover todos os pedidos?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onCloseModalPedidos} negative={true}>Não</Button>
                        <Button onClick={this.onCancelModalPedidos} positive={true} icon='checkmark' labelPosition='right' content='Sim' />
                    </Modal.Actions>
                </Modal>

                <Modal key="modalFinalizacaoPedidos" size="small" open={this.state.showMsgsPedidos}>
                    <Modal.Header>Pedidos</Modal.Header>
                    <Modal.Content scrolling={true}>
                        <Table celled={true}>
                            <Table.Body>
                                { (this.state.lstMsgsPedidos || []).map( obj =>
                                    <Table.Row key={obj}>
                                        <Table.Cell>{obj}</Table.Cell>
                                    </Table.Row>
                                ) }
                            </Table.Body>
                        </Table>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onCloseModalMsgsPedidos} positive={true} icon='checkmark' labelPosition='right' content='Fechar' />
                    </Modal.Actions>
                </Modal>

            <IndexIngredientesAdicionaisRedux
                lstIngredientesAdicionais={this.getListaIngredientesAdicionais()}
                show={this.state.showIngredientes}
                showHiddenIngredientes={this.showHiddenIngredientes}
                setIngredientesAdicionais={this.setIngredientesAdicionais} />
            </Segment>
        )
    }
}
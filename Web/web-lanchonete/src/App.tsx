import * as React from 'react';
import { Dimmer, Loader, Menu, Segment } from 'semantic-ui-react';
import IndexCardapioRedux from './Redux/Containers/IndexCardapioRedux';
import IndexPedidosRedux from './Redux/Containers/IndexPedidosRedux';
import ingredientesRepository, { IIngredientes } from './Repositories/IngredientesRepository';
import lanchesRepository, { ILanches } from "./Repositories/LanchesRepository";

export interface IAppProps{
  activeItem?: string,
  showCardapio?: boolean,
  showPedidos?: boolean,

  lstIngredientes?: IIngredientes[],
  lstLanches?: ILanches[],  
  onSetListIngredientes?: (allIngredientes: IIngredientes[]) => void,
  onSetListLanches?: (allLanches: ILanches[]) => void,
}

export interface IAppState{
  activeItem: string,
  loading: boolean,
  showCardapio: boolean,
  showPedidos: boolean
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any){
    super(props);

    this.state = {
      activeItem: "",
      loading: false,
      showCardapio: false,
      showPedidos: false
    }
  }

  public handleItemClick = (e:any, objClick:any) =>{
    this.setState({
      activeItem: objClick.name,
      showCardapio: objClick.name === "cardapio",
      showPedidos: objClick.name === "pedidos"
    })
  }

  public async componentDidMount(){
    this.setState({ loading: true });

    try{

      const auxAllIngredientes = await ingredientesRepository.GetAll();
      const auxAllLanches = await lanchesRepository.GetAll();

      if(null != this.props.onSetListIngredientes){
        this.props.onSetListIngredientes(auxAllIngredientes);
      }

      if(null != this.props.onSetListLanches){
        this.props.onSetListLanches(auxAllLanches);
      }
    }
    catch{
      this.setState({ loading: false });
    }

    this.setState({ loading: false });
  }

  public render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted={true}>
        <Dimmer active={this.state.loading}>
          <Loader content='Loading' />
        </Dimmer>
        <Menu inverted={true} pointing={true} secondary={true}>
          <Menu.Item name='cardapio' active={activeItem === 'cardapio'} onClick={this.handleItemClick} >
            Cardápio
          </Menu.Item>
          <Menu.Item
            name='pedidos'
            active={activeItem === 'pedidos'}
            onClick={this.handleItemClick} >
            Pedidos
          </Menu.Item>
        </Menu>
        {
          this.state.showCardapio ?
          <IndexCardapioRedux />
          : null
        }
        {
          this.state.showPedidos ?
          <IndexPedidosRedux />
          : null
        }
      </Segment>
    );
  }
}

export default App;

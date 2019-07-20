import { connect } from "react-redux"
import Pedidos from "../../Pedidos"
import { IState } from "../Reducers/Index"
import {
    getListIngredientes,
    getListLanches
} from "../Selectors/Index";

const mapStateToProps = (state: IState) => ({
    lstIngredientes: getListIngredientes(state),
    lstLanches: getListLanches(state)
})

export default connect(mapStateToProps, {})(Pedidos)
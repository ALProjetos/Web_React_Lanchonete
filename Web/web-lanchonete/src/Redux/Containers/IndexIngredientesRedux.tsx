import { connect } from "react-redux"
import Ingredientes from "../../Ingredientes"
import { IState } from "../Reducers/Index"
import { getListIngredientes } from "../Selectors/Index";

const mapStateToProps = (state: IState) => ({
    lstIngredientes: getListIngredientes(state)
})

export default connect(mapStateToProps, {})(Ingredientes)
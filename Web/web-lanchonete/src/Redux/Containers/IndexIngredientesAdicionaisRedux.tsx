import { connect } from "react-redux"
import IngredientesAdicionais from "../../IngredientesAdicionais"
import { IState } from "../Reducers/Index"
import { getListIngredientes } from "../Selectors/Index";

const mapStateToProps = (state: IState) => ({
    lstIngredientes: getListIngredientes(state)
})

export default connect(mapStateToProps, {})(IngredientesAdicionais)
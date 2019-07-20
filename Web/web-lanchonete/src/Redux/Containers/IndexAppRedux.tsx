import { connect } from "react-redux"
import App from "../../App"
import {
    SetListIngredientes,
    SetListLanches
} from "../Actions/Index"
import { IState } from "../Reducers/Index"

import {
    getListIngredientes,
    getListLanches
} from "../Selectors/Index";

const mapStateToProps = (state: IState) => ({
    lstIngredientes: getListIngredientes(state),
    lstLanches: getListLanches(state)
})

const mapDispatchToProps = {
    onSetListIngredientes: SetListIngredientes,
    onSetListLanches: SetListLanches
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
import { IIngredientes } from "../../Repositories/IngredientesRepository";
import { ILanches } from "../../Repositories/LanchesRepository";
import { Action, ActionTypes } from "../Actions/Index"

// Define o State da interface do current Reducer
export interface IState {
    listIngredientes: IIngredientes[],
    listLanches: ILanches[]    
}

// Define o State inicial
export const InitialState: IState = {
    listIngredientes: [],
    listLanches: []    
}

export function Reducer(state: IState = InitialState, action: Action) {

    switch (action.type) {

        case ActionTypes.SET_LIST_LANCHES: {
            const allLanches = action.payload.allLanches;

            return {
                ...state,
                listIngredientes: (state.listIngredientes).map(m => m),
                listLanches: null != allLanches ? allLanches.map(m => m) : []
            }
        }

        case ActionTypes.SET_LIST_INGREDIENTES: {
            const allIngredientes = action.payload.allIngredientes;

            return {
                ...state,
                listIngredientes: null != allIngredientes ? allIngredientes.map(m => m) : [],
                listLanches: (state.listLanches).map(m => m)
            }
        }

        default:
            return state;
    }
}
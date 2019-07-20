import { createSelector } from "reselect"
import { IState } from "../Reducers/Index"

// Pega o State que contém todos os objetos 
 const getState = ((state: IState) => state.obj)

// Pega todas as listas que estão no State
export const getListLanches = createSelector([getState], s => s.listLanches)
export const getListIngredientes = createSelector([getState], s => s.listIngredientes)
import { IIngredientes } from "../../Repositories/IngredientesRepository";
import { ILanches } from "../../Repositories/LanchesRepository";

export enum ActionTypes {
    SET_LIST_INGREDIENTES = "SET_LIST_INGREDIENTES",
    SET_LIST_LANCHES = "SET_LIST_LANCHES"
}

// Define os tipos de retornos ou ações
export interface ISetListIngredientesAction { type: ActionTypes.SET_LIST_INGREDIENTES, payload: { allIngredientes: IIngredientes[] } }
export interface ISetListLanchesAction { type: ActionTypes.SET_LIST_LANCHES, payload: { allLanches: ILanches[] } }

// Define as ações
export function SetListIngredientes(allIngredientes: IIngredientes[]): ISetListIngredientesAction {
    return { type: ActionTypes.SET_LIST_INGREDIENTES, payload: { allIngredientes } }
}

export function SetListLanches(allLanches: ILanches[]): ISetListLanchesAction {
    return { type: ActionTypes.SET_LIST_LANCHES, payload: { allLanches } }
}

// Define os tipos de ações
export type Action = ISetListIngredientesAction | ISetListLanchesAction
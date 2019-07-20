import { combineReducers } from 'redux'
import * as FromState from "./ClickReducer"

export interface IState {
    obj: FromState.IState
}

export const InitialState: IState = {
    obj: FromState.InitialState
}

export const Reducer = combineReducers<IState>({
    obj: FromState.Reducer
})
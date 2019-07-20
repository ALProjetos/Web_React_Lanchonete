import { applyMiddleware, createStore } from 'redux'
import logger from "redux-logger"
import { Reducer } from "../Reducers/Index"

// Cria a store de acordo com o Reducer criado da estrutura dos Points
const store = createStore(Reducer, applyMiddleware(logger));

export default store;
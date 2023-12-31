import { appReducer } from './reducers/app.reducer.js'
import { contactReducer } from './reducers/contact.js'

const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    contactModule: contactReducer,
    appModule: appReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
export const store = createStore(rootReducer, middleware)

// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))) //Passing the reducer
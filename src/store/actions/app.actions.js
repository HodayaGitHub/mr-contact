import { SET_MSG } from '../reducers/app.reducer.js'
import { store } from '../store.js'



export function showSuccessMsgRedux(txt) {
    store.dispatch({ type: SET_MSG, msg: { type: 'success', txt } })
}

export function setMsg(msg) {
    store.dispatch({ type: SET_MSG, msg })
}

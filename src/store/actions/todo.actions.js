import { todoService } from '../../services/todo.service.js'
import { ADD_TODO, REMOVE_TODO, SET_FILTER_BY, SET_TODOS, UPDATE_TODO, SET_IS_LOADING } from '../reducers/todo.reducer.js'
import { store } from '../store.js'


export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().todoModule.filterBy
    console.log('filterBy', filterBy)
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({
                type: SET_TODOS,
                todos
            })
            return todos
        })
        .catch(err => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({
                type,
                todo: savedTodo
            })
            return savedTodo
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function removeTodo(todoId) {
    console.log('todoId', todoId)
    return todoService.removeTodo(todoId)
        .then(() => {
            store.dispatch({
                type: REMOVE_TODO,
                todoId
            })
        })
        .catch(err => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}



export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
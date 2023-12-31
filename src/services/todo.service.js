const TODOS_KEY = 'myTodos'
const PAGE_SIZE = 8

import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

export const todoService = {
    query,
    save,
    removeTodo,
    getTodoById,
    debounce
}


function query(filterBy = { txt: '', isDone: 'all', pageIdx: 0, sortBy: "txt" }) {
    const { sortBy } = filterBy
    return storageService.query(TODOS_KEY)
        .then(todos => {
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.txt))
            }
            if (filterBy.isDone !== 'all') {
                todos = todos.filter((todo) => (filterBy.isDone === 'done' ? todo.isDone : !todo.isDone))
            }



            return _getSortedTodos(sortBy, todos)
        })
}

function _getSortedTodos(sortBy, todos) {
    let sortedTodos
    if (sortBy === 'txt') {
        sortedTodos = todos.sort((a, b) => {
            const todoA = a.txt.toUpperCase();
            const todoB = b.txt.toUpperCase();
            if (todoA < todoB) {
                return -1;
            }
            if (todoA > todoB) {
                return 1;
            }
            return 0;
        });
    } else {
        sortedTodos = todos.sort((a, b) => a.createdAt - b.createdAt);
    }
    return sortedTodos
}

function getTodoById(id) {
    return storageService.get(TODOS_KEY, id)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODOS_KEY, todo).then((savedTodo) => {
            userService.addActivity('Updated', savedTodo._id)
            if (todo.isDone) userService.updateBalance(10)
            return savedTodo
        })
    } else {
        todo.isDone = false
        todo.createdAt = Date.now()
        return storageService.post(TODOS_KEY, todo).then((savedTodo) => {
            userService.addActivity('Added', savedTodo._id)
            return savedTodo
        })
    }
}

function removeTodo(todoId) {
    return storageService.remove(TODOS_KEY, todoId).then(() => {
        userService.addActivity('Removed', todoId)
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export function getTotalTodos() {
    const todos = localStorage.getItem(TODOS_KEY)
    if (todos.length) return todos.length

}
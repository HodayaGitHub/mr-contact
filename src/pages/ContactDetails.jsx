const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function TodoDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const [currTodo, setCurrTodo] = useState(null)

  useEffect(() => {
    const { id } = params
    todoService.getTodoById(id)
      .then(todo => {
        if (!todo) return navigate('/todo')
        setCurrTodo(todo)
      })
      .catch(() => {
        showErrorMsg('Had issues loading todo');
      })
  }, [])

  if (!currTodo) return <h4>loading</h4>
  const { _id, name, isDone } = currTodo
  return (
    <div className="todo-details flex scale-in-hor-right">
      <div className="todo-data-container">
        <h1>Id {_id}</h1>
        <h1>To Do: {name}</h1>
        <h1>is done? {isDone ? 'yes' : 'no'}</h1>
        <button className="back-btn" onClick={() => navigate('/todo')}>
          Back to todos
        </button>
      </div>
    </div>
  )
}

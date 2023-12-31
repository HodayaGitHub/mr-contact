const { useEffect, useState, useRef } = React

import { contactService } from "../services/contact.service.js"

export function ContactFilter({ onSetFilter, filterBy }) {

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedSetFilterRef = useRef(contactService.debounce(onSetFilter, 1000))

  useEffect(() => {
    console.log('changed!');
    debouncedSetFilterRef.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  return (
    <section className="todo-filter">
      <form onSubmit={onSubmit}>
        <div className="radio-sort flex justify-center align-center">
          <label htmlFor="all">
            {' '}
            All <input type="radio" name="isDone" value="all" id="all" onChange={handleChange} />{' '}
          </label>
          <label htmlFor="done">
            {' '}
            Done <input type="radio" name="isDone" value="done" id="done" onChange={handleChange} />{' '}
          </label>
          <label htmlFor="undone">
            {' '}
            Active <input type="radio" name="isDone" value="undone" id="undone" onChange={handleChange} />{' '}
          </label>
        </div>
        <div>
          <input
            className="filter-input"
            placeholder="Search contact..."
            name="txt"
            value={filterByToEdit.txt}
            onChange={handleChange}
          />
          <label htmlFor="pageIdx">Page:</label>
          <input type="number"
            id="pageIdx"
            name="pageIdx"
            placeholder="0"
            value={filterByToEdit.pageIdx}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>


        <label htmlFor="sort">Sort by:</label>
        <select onChange={handleChange} id="sort">
          <option value="createdAt">Time</option>
          <option value="txt">Text</option>
        </select>

      </form>
    </section>
  )
}

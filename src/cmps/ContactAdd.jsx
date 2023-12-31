import { useState } from 'react'

export function ContactAdd({ onAddContact }) {
  const [contact, setContact] = useState({ txt: '' })

  function onChange(ev) {
    setContact({ txt: ev.target.value })
  }

  function onSubmitContact(ev) {
    ev.preventDefault()
    onAddContact(contact)
    setContact({ txt: '' })
  }

  return (
    <form className="flex justify-center align-center" onSubmit={onSubmitContact}>
      <h3>Add contact: </h3>
      <input type="text" onChange={onChange} value={contact.txt} />
      <button>save</button>
    </form>
  )
}

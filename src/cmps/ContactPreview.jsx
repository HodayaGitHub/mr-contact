const { Link } = ReactRouterDOM

export function ContactPreview({ contact, onUpdateContact, onRemove }) {
  function onToggleDone() {
    const newContact = { ...contact, isDone: !contact.isDone }
    onUpdateContact(newContact)
  }

  return (
    <li className={`flex space-around align-center ${contact.isDone ? 'done' : ''}`}>
      <h4 onClick={() => onToggleDone()} title="Done/Undone">
        {contact.txt}
      </h4>
      <button onClick={() => { onRemove(contact._id) }}>x</button>
      <Link to={`/contact/${contact._id}`}>Details</Link>
    </li>
  )
}

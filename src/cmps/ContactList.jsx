import { ContactPreview } from './ContactPreview.jsx'

export function ContactList({ contacts, onUpdateContact, onRemove }){
  return (
    <ul className="clean-list flex column">
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} onUpdateContact={onUpdateContact} onRemove={onRemove} />
      ))}
    </ul>
  )
}

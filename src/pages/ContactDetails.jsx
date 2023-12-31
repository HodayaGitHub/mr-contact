import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams, useNavigationType } from 'react-router-dom'
import { contactService } from '../services/contact.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ContactDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const [currContact, setCurrContact] = useState(null)

  useEffect(() => {
    const { id } = params
    console.log(id)
    contactService.getContactById(id)
      .then(contact => {
        console.log('contact', contact)
        if (!contact) return navigate('/contact')
        setCurrContact(contact)
      })
      .catch(() => {
        showErrorMsg('Had issues loading contact');
      })
  }, [])

  if (!currContact) return <h4>loading</h4>
  const { _id, txt, isDone } = currContact
  return (
    <div className="contact-details flex scale-in-hor-right">
      <div className="contact-data-container">
        <h1>Id {_id}</h1>
        <h1>To Do: {name}</h1>
        <h1>is done? {isDone ? 'yes' : 'no'}</h1>
        <button className="back-btn" onClick={() => navigate('/contact')}>
          Back to contacts
        </button>
      </div>
    </div>
  )
}

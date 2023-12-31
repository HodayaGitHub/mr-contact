import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { ContactList } from '../cmps/ContactList.jsx'
import { ContactFilter } from '../cmps/ContactFilter.jsx'
import { ContactAdd } from '../cmps/ContactAdd.jsx'
import { loadContacts, removeContact, saveContact, setFilterBy } from '../store/actions/contact.actions.js'
import { showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { SET_FILTER_BY } from '../store/reducers/contact.reducer.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ContactIndex() {
  //contact mudule
  const contacts = useSelector((storeState) => storeState.contactModule.contacts)
  const isLoading = useSelector(storeState => storeState.contactModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)
 

  useEffect(() => {
    console.log('Filter by changed')
    loadContacts()
      .catch(() => {
        showErrorMsg('Cannot show contacts')
      })
  }, [filterBy])

  function onRemove(contactId) {
    removeContact(contactId)
      .then(() => {
        console.log('removed contact ' + contactId);
        showSuccessMsgRedux(`Removed contact with ${contactId} id successfuly`)
      })
      .catch(() => showErrorMsg('Had trouble removing the contact'))
  }

  function onUpdateContact(contact) {
    saveContact(contact)
      .then(() => {
        showSuccessMsgRedux(`Updated contact with ${contact.txt} id successfuly`)
      })
      .catch(() => showErrorMsg('Had trouble updating the contact'))
  }

  function onAddContact(contactToAdd) {
    saveContact(contactToAdd)
      .then((saveContact) => {
        showSuccessMsgRedux(`Added contact ${saveContact.txt} successfuly`)
      })
      .catch(() => showErrorMsg('Had trouble adding the contact'))
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }


  // if (!contacts.length) return <h1>No contacts to show...</h1>
  return (
    <section className="todo-app-container flex column justify-center" style={getStyleByUser()}>
      <ContactAdd onAddContact={onAddContact} />
      <div className="filter-sort-container">
        <ContactFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      </div>
      {!isLoading && <ContactList contacts={contacts} onUpdateContact={onUpdateContact} onRemove={onRemove} />}
      {isLoading && <div>Loading..</div>}
      {(!contacts.length && !isLoading) && <div>No contacts to show...</div>}
    </section>
  )
}

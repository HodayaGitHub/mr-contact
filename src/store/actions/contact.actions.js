import { contactService } from '../../services/contact.service.js'
import { ADD_CONTACT, REMOVE_CONTACT, SET_FILTER_BY, SET_CONTACTS, UPDATE_CONTACT, SET_IS_LOADING } from '../reducers/contact.js'
import { store } from '../store.js'


export function loadContacts() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().contactModule.filterBy
    console.log('filterBy', filterBy)
    return contactService.query(filterBy)
        .then(contacts => {
            store.dispatch({
                type: SET_CONTACTS,
                contacts
            })
            return contacts
        })
        .catch(err => {
            console.error('Cannot load contacts:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function saveContact(contact) {
    const type = (contact._id) ? UPDATE_CONTACT : ADD_CONTACT
    return contactService.save(contact)
        .then(savedContact => {
            store.dispatch({
                type,
                contact: savedContact
            })
            return savedContact
        })
        .catch(err => {
            console.error('Cannot save contact:', err)
            throw err
        })
}

export function removeContact(contactId) {
    console.log('contactId', contactId)
    return contactService.removeContact(contactId)
        .then(() => {
            store.dispatch({
                type: REMOVE_CONTACT,
                contactId
            })
        })
        .catch(err => {
            console.error('Cannot remove contact:', err)
            throw err
        })
}



export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
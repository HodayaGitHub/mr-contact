const CONTACTS_KEY = 'myContacts'
const PAGE_SIZE = 8

import { storageService } from './async-storage.service.js'

export const contactService = {
    query,
    save,
    removeContact,
    getContactById,
    debounce
}


function query(filterBy = { txt: '', isDone: 'all', pageIdx: 0, sortBy: "txt" }) {
    const { sortBy } = filterBy
    return storageService.query(CONTACTS_KEY)
        .then(contacts => {
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                contacts = contacts.slice(startIdx, PAGE_SIZE + startIdx)
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                contacts = contacts.filter(contact => regex.test(contact.txt))
            }
            if (filterBy.isDone !== 'all') {
                contacts = contacts.filter((contact) => (filterBy.isDone === 'done' ? contact.isDone : !contact.isDone))
            }



            return _getSortedContacts(sortBy, contacts)
        })
}

function _getSortedContacts(sortBy, contacts) {
    let sortedContacts
    if (sortBy === 'txt') {
        sortedContacts = contacts.sort((a, b) => {
            const contactA = a.txt.toUpperCase()
            const contactB = b.txt.toUpperCase()
            if (contactA < contactB) {
                return -1
            }
            if (contactA > contactB) {
                return 1
            }
            return 0
        });
    } else {
        sortedContacts = contacts.sort((a, b) => a.createdAt - b.createdAt)
    }
    return sortedContacts
}

function getContactById(id) {
    return storageService.get(CONTACTS_KEY, id)
}

function save(contact) {
    if (contact._id) {
        return storageService.put(CONTACTS_KEY, contact).then((savedContact) => {
            userService.addActivity('Updated', savedContact._id)
            if (contact.isDone) userService.updateBalance(10)
            return savedContact
        })
    } else {
        contact.isDone = false
        contact.createdAt = Date.now()
        return storageService.post(CONTACTS_KEY, contact).then((savedContact) => {
            userService.addActivity('Added', savedContact._id)
            return savedContact
        })
    }
}

function removeContact(contactId) {
    return storageService.remove(CONTACTS_KEY, contactId).then(() => {
        userService.addActivity('Removed', contactId)
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

export function getTotalContact() {
    const contacts = localStorage.getItem(CONTACTS_KEY)
    if (contacts.length) return contacts.length

}
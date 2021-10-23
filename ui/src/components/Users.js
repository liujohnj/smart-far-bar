// SPA substitute for user database for demo purposes

const users = {

    'Alice': {
        type: 'client',
        role: 'seller',
        contacts: ['David']
    },
    'Bob': {
        type: 'client',
        role: 'buyer',
        contacts: ['Carol']
    },
    'Carol': {
        type: 'Realtor',
        role: 'buyerAgent',
        contacts: ['Bob']
    },
    'David': {
        type: 'Realtor',
        role: 'sellerAgent',
        contacts: ['Alice']
    },
}

function returnContacts(username) {
    return users[username].contacts
}

function returnUserType(username) {
    return users[username].type
}

function returnUserRole(username) {
    return users[username].role
}
export { returnContacts, returnUserType, returnUserRole }
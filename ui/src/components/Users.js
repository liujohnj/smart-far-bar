// SPA substitute for user database for demo purposes

const users = {

    'Alice': {
        type: 'Client',
        role: 'seller',
        token: "Bearer " + process.env.REACT_APP_TOKEN_ALICE,
    },
    'Bob': {
        type: 'Client',
        role: 'buyer',
        token: "Bearer " + process.env.REACT_APP_TOKEN_BOB,
    },
    'Carol': {
        type: 'Realtor',
        role: 'buyerAgent',
        token: "Bearer " + process.env.REACT_APP_TOKEN_CAROL,
    },
    'David': {
        type: 'Realtor',
        role: 'sellerAgent',
        token: "Bearer " + process.env.REACT_APP_TOKEN_DAVID,
    },
}

function returnContacts(username) {
    return users[username].contacts
}

function returnUserType(username) {
    return users[username].type
}

function returnUserToken(username) {
    return users[username].token
}

function returnUserRole(username) {
    return users[username].role
}
export { returnContacts, returnUserType, returnUserToken, returnUserRole }


const MyContacts = (props) => {

    const user = props.user;

    // Demo substitute for DB lookup
    const contacts = {
        'Alice': ['David'],
        'Bob': ['Carol'],
        'Carol': ['Bob'],
        'David': ['Alice']
    }

    // Demo substitute for DB user lookup
    const roles = {
        'Alice' : 'seller',
        'Bob' : 'buyer',
        'Carol' : 'buyerAgent',
        'David' : 'sellerAgent',
    }

    console.log("uuu: ", user);



    
    return (
        <div>
            {contacts[user]}
        </div>
    )
}

export default MyContacts;
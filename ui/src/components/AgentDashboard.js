import { useState } from 'react';
const axios = require('axios');

const AgentDashboard = () => {

    const tokenCarol = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYW1sLXNtYXJ0LWZhci1iYXIiLCJhcHBsaWNhdGlvbklkIjoic21hcnQtZmFyLWJhciIsImFjdEFzIjpbIkNhcm9sIl19fQ.U75sKJ4NZS0avjBr9MXNm-oB2yKuw2eorespQfdsPr4"

    const tokenDavid = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYW1sLXNtYXJ0LWZhci1iYXIiLCJhcHBsaWNhdGlvbklkIjoic21hcnQtZmFyLWJhciIsImFjdEFzIjpbIkRhdmlkIl19fQ.H4z-WlJVYKoSwrGxQsGIcVV4pj707HeX4rbAUkf3Qbc"

    const carolContacts = ['Bob']
    const davidContacts = ['Alice']


    const [contacts, setContacts] = useState([]);


    
    const fetchAllKnownParties = async (party) => {
        let token;
        if (party === 'Carol') {
            token = tokenCarol;
        } else if (party === 'David') {
            token = tokenDavid;
        }
        // else throw error

        try {
            const response = await axios({
                method: "get",
                url: '/v1/parties',                
                headers:
                    {
                        "Authorization": token,
                    },
            });
            console.log("LIST OF PARTIES: ", response.data.result)

        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }

    const fetchAgentContacts = async (party) => {

        
    }

    const allKnownParties = fetchAllKnownParties('David');
    console.log("====> ", allKnownParties)

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default AgentDashboard;
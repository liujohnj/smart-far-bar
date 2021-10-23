import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { returnContacts, returnUserRole } from './Users';
const axios = require('axios');


const MyAgents = (props) => {
    const user = props.user
    const [ledgerParties, setLedgerParties] = useState([]);
    const [agencyStatus, setAgencyStatus] = useState("unsigned");
    const action = "propose agency"

    const tokenBob = "Bearer " + ProcessingInstruction.env.REACT_APP_TOKEN_CAROL;

    // REST API to fetch all known parties
    const FetchAllKnownParties = async () => {
        try {
            const response = await axios({
                method: "get",
                url: '/v1/parties',                
                headers:
                    {
                        "Authorization": tokenBob,
                    },
            });
            const obj = response.data.result;
            const names = obj.map(name => name.displayName);
            console.log("names = ", names);
            setLedgerParties(names)
        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }
    
    useEffect(() => {
        FetchAllKnownParties();
    }, [])

    // REST API to get all active contracts matching a given query
    const getMatchingContracts = async (name) => {
        try {
            console.log("getMatchingContracts running");
            const response = await axios({
                method: "post",
                url: '/v1/query',
                withCredentials: true,     
                headers:
                    {
                        "Authorization": tokenBob,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateIds": ["Main:BuyerAgencyCreated"],
                        "query":
                            {
                                "buyerAgent": "Carol",
                                "buyer": "Bob",
                            }
                    },     
            });
            const obj = response.data.result;
            console.log("response.data.result = ", obj);
            if (obj.length > 0) {
                console.log("obj.length > 0");
                setAgencyStatus("signed");
            };
        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }

    const contactsList = returnContacts(user);

    const contactsInLedger = contactsList.filter(contact => ledgerParties.includes(contact));

    let rows = [];
    for (let i = 0; i < contactsInLedger.length; i++) {
        const contactName = contactsInLedger[i];
        const contactRole = returnUserRole(contactName);

        getMatchingContracts(contactName);
    
        rows.push({contactName, contactRole, agencyStatus, action});
        console.log("rows = ", rows);
    }

    const proposeBuyerAgency = async () => {
        console.log("proposed!");
        try {
            const response = await axios({
                method: "post",
                url: '/v1/create',
                withCredentials: true,
                headers:
                    {
                        "Authorization": tokenBob,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:BuyerAgencyProposal",
                        "payload": {
                            "buyer": "Bob",
                            "buyerAgent": "Carol",
                            "templateType": "BUYER_AGENCY",
                            "isApproved": false,        
                        }
                    }
            });
            console.log("response after proposing: ", response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Typography variant="subtitle1"
                sx={{
                    m: 2,
                }}
            >
                My Contacts/Clients
            </Typography>
            <TableContainer component={Paper}
                sx={{
                    m: 2,
                }}
                >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Agency Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.contactName}
                            </TableCell>
                            <TableCell align="right">{row.contactRole}</TableCell>
                            <TableCell align="right">{row.agencyStatus}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={row.agencyStatus==="signed"}
                                    onClick={proposeBuyerAgency}
                                >
                                    {row.action}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MyAgents;
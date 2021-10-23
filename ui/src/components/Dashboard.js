import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { returnContacts, returnUserType, returnUserRole } from './Users';
const axios = require('axios');

const Dashboard = () => {
    const location = useLocation();
    const user = location.state.username
   
    const [ledgerParties, setLedgerParties] = useState([]);
    const [agencyStatus, setRelationshipStatus] = useState("unsigned");
    const action = "propose agency"

    const userType = returnUserType(user);
    const tokenCarol = "Bearer " + process.env.REACT_APP_TOKEN_CAROL;
    
    // REST API to fetch all known parties
    const FetchAllKnownParties = async () => {
        try {
            const response = await axios({
                method: "get",
                url: '/v1/parties',                
                headers:
                    {
                        "Authorization": tokenCarol,
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
                        "Authorization": tokenCarol,
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
                setRelationshipStatus("signed");
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
                        "Authorization": tokenCarol,
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
            <div>
                <Typography variant="h4">
                    Dashboard
                </Typography>

                <Typography variant="h6">
                    Welcome, {user}.
                    <br />
                    Type: {userType}
                    <br />
                    All parties in ledger: {ledgerParties}
                    <br />
                    My contactsList: {contactsList}
                    <br />
                    My contactsList in Ledger: {contactsInLedger}
                </Typography>
            </div>

            <div>
                <TableContainer component={Paper}>
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
        </div>
    )
}

export default Dashboard;
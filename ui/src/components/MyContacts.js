import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { returnContacts, returnUserRole } from './Users';
const axios = require('axios');

const MyContacts = (props) => {
    const user = props.user;
    const [ledgerParties, setLedgerParties] = useState([]);
    const [agencyStatus, setAgencyStatus] = useState("unsigned");
    const [action, setAction] = useState(user === "Carol" ? "propose" : "accept");
    const [contractId, setContractId] = useState('');

    let token = "";
    const tokenCarol = "Bearer " + process.env.REACT_APP_TOKEN_CAROL;
    const tokenBob = "Bearer " + process.env.REACT_APP_TOKEN_BOB;
    if (user === "Carol") {
        token = "Bearer " + process.env.REACT_APP_TOKEN_CAROL;
    }
    if (user === "Bob") {
        token = "Bearer " + process.env.REACT_APP_TOKEN_BOB;
    }
    
    console.log("token: ", token);

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

    // Uses REST API to get all active contracts matching a given query.
    //   Fetches all agency-related contracts.
    const getMatchingContracts = async (name, templateId) => {
        try {
            console.log("getMatchingContracts running");
            const response = await axios({
                method: "post",
                url: '/v1/query',
                withCredentials: true,     
                headers:
                    {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateIds":
                            [
                                "Main:BuyerAgencyProposal",
                                "Main:BuyerAgencyCreate"
                            ],
                        "query":
                            {
                                "buyerAgent": "Carol",
                            }
                    },     
            });
            const obj = response.data.result
            console.log("response.data.result = ", obj);

            if (obj.length > 0) {
                console.log("obj.length > 0");
                
                //const names = obj.map(name => name.displayName);
                
                
                
                const id = obj[0].contractId
                console.log("id = ", id);
                setContractId(id);
                if (templateId === "Main:BuyerAgencyProposal") {
                    if (user === "Bob") {
                        setAgencyStatus("awaiting my acceptance");
                        setAction("accept");
                    } else {
                        setAgencyStatus("pending Client acceptance");
                        setAction("propose");
                    }
                } else if (templateId === "Main:BuyerAgencyCreate") {
                        setAgencyStatus("engaged");
                }
            }
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

        getMatchingContracts(contactName, "Main:BuyerAgencyProposal");
        getMatchingContracts(contactName, "Main:BuyerAgencyCreated");
    
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
                        "Authorization": token,
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
            setAgencyStatus("engaged");
        } catch (err) {
            console.log(err);
        }
    }

    const acceptBuyerAgency = async () => {
        console.log("accepted!");
        try {
            const response = await axios({
                method: "post",
                url: '/v1/exercise',
                withCredentials: true,
                headers:
                    {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:BuyerAgencyProposal",
                        "contractId": contractId,
                        "choice": "AcceptBuyerAgency",
                        "argument": {},
                    }
            });
            console.log("response after proposing: ", response.data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>

            {/*
            <Typography variant="subtitle1"
                sx={{
                    m: 2,
                }}
            >
                My Contacts/Clients
            </Typography>
            */}
            <Box
                sx={{
                    mr: 4,
                }}
            >
                <TableContainer component={Paper}
                    sx={{
                        ml: 2,
                        mr: 5,
                    }}
                    >
                    <Table
                        sx={{
                                
                                mr: 5,
                        }} 
                        aria-label="simple table">
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
                                    {row.action === "propose" && <Button
                                        variant="outlined"
                                        size="small"
                                        disabled={row.agencyStatus!=="unsigned"}
                                        onClick={proposeBuyerAgency}
                                    >
                                        {row.action}
                                    </Button>}
                                    {row.action === "accept" && <Button
                                        variant="outlined"
                                        size="small"
                                        disabled={row.agencyStatus==="unsigned"}
                                        onClick={acceptBuyerAgency}
                                    >
                                        {row.action}
                                    </Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default MyContacts;
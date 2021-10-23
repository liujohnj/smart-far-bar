import { useState, useEffect } from 'react';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { IconButton, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//import { returnContacts, returnUserRole } from './Users';
const axios = require('axios');

const MyAgencies = (props) => {
    const user = props.user;
    //const isAgencyUpdated = props.isAgencyUpdated;
    const { isAgencyUpdated, setIsAgencyUpdated } = props.updateComponent;

    const { username, userType, userToken } = user;
    const [action, setAction] = useState(userType === "Realtor" ? "propose" : "accept");
    const [contractId, setContractId] = useState('');
    const [rows, setRows] = useState([]);


    // Uses REST API to get all active contracts matching a given query.
    //   Fetches all agency-related contracts.
    const getMatchingContracts = async () => {
        console.log("launching getMatching");
        try {
            const response = await axios({
                method: "post",
                url: '/v1/query',
                withCredentials: true,     
                headers:
                    {
                        "Authorization": userToken,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateIds":
                            [
                                "Main:BuyerAgencyProposal",
                                "Main:BuyerAgencyCreated"
                            ],
                        "query":
                            {
                                "buyerAgent": username,
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {
                const ids = obj.map(id => id.contractId);
                const matchingNames = obj.map(matchingName => matchingName.payload.buyer);
                const types = obj.map(type => type.payload.templateType);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < matchingNames.length; i++) {
                    const contractId = ids[i];
                    const contactName = matchingNames[i];
                    const contactRole = (types[i] === "BUYER_AGENCY" ? "buyer" : "seller");
                    const agencyStatus = (approvals[i] === true ? "active" : "pending");

                    tempRows.push({contractId, contactName, contactRole, agencyStatus, action});
                }
                setRows(tempRows);
            }
        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }

    useEffect(() => {
        getMatchingContracts();
        console.log("something happened");
    }, [isAgencyUpdated]);
    

    const acceptBuyerAgency = async () => {
        try {
            const response = await axios({
                method: "post",
                url: '/v1/exercise',
                withCredentials: true,
                headers:
                    {
                        "Authorization": userToken,
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
        } catch (err) {
            console.log(err);
        }
    }

    const archiveAgencyProposal = async (contractId) => {
        try {
            const response = await axios({
                method: "post",
                url: '/v1/exercise',
                withCredentials: true,
                headers:
                    {
                        "Authorization": userToken,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:BuyerAgencyProposal",
                        "contractId": contractId,
                        "choice": "WithdrawBuyerAgency",
                        "argument": {},
                    }
            });
            setRows([]);        // re-renders table
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
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
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
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
                                    {row.contractId}
                                </TableCell>
                                <TableCell align="right">{row.contactName}</TableCell>
                                <TableCell align="right">{row.contactRole}</TableCell>
                                <TableCell align="right">{row.agencyStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        disabled={row.agencyStatus === "active"}
                                        color="primary"
                                        onClick={() => archiveAgencyProposal(row.contractId)}
                                    >
                                        <DeleteIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>
                                </ButtonGroup>
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

export default MyAgencies;
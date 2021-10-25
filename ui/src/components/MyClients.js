import { useState, useEffect } from 'react';
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
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddListingDialog from './AddListingDialog';
const axios = require('axios');

const MyClients = (props) => {
    const user = props.user;
    const { isAgencyUpdated } = props.updateComponent;
    const { isListingsUpdated, setIsListingsUpdated } = props.updateListingsComponent;

    const { username, userType, userToken } = user;
    const actions = "";
    const [rows, setRows] = useState([]);
    const [isArchived, setIsArchived] = useState(false);
   

    const [open, setOpen] = useState(false);

    // Uses REST API to get all active contracts matching a given query.
    //   Fetches all agency-related contracts.
    const getMatchingContracts = async () => {
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
                                "Main:BuyerAgencyCreated",
                                "Main:SellerAgencyProposal",
                                "Main:SellerAgencyCreated"
                            ],
                        "query":
                            {
                                "agent": username,
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {
                const ids = obj.map(id => id.contractId);
                const matchingNames = obj.map(matchingName => matchingName.payload.party);
                const types = obj.map(type => type.payload.templateType);
                const addresses = obj.map(address => address.payload.propertyAddress);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < matchingNames.length; i++) {
                    const contractId = ids[i];
                    const contactName = matchingNames[i];
                    const contactRole = (types[i] === "BUYER_AGENCY" ? "buyer" : "seller");
                    const streetAddress = addresses[i];
                    const agencyStatus = (approvals[i] === true ? "active" : "pending");

                    tempRows.push({contractId, contactName, contactRole, streetAddress, agencyStatus, actions});
                }
                setRows(tempRows);
            } else {
                setRows([]);
            }
        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }

    useEffect(() => {
        getMatchingContracts();
    }, [isAgencyUpdated, isArchived]);
    

    const archiveAgencyProposal = async (templateId, contractId, choice) => {
        try {
            await axios({
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
                        "templateId": templateId,
                        "contractId": contractId,
                        "choice": choice,
                        "argument": {},
                    }
            });
            console.log("isArchived = ", isArchived);
            setIsArchived(!isArchived);
        } catch (err) {
            console.log(err);
        }
    }

    const handleArchiveAgency = (contractId, contactRole) => {
        if (contactRole === "buyer") {
            archiveAgencyProposal("Main:BuyerAgencyProposal", contractId, "WithdrawBuyerAgency");
        } else {
            archiveAgencyProposal("Main:SellerAgencyProposal", contractId,"WithdrawSellerAgency");
        }
    };

    const handleCreateListing = (contractId) => {
        setOpen(true);
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
                            <TableCell align="right">Property</TableCell>
                            <TableCell align="right">Agency Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.contractId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.contractId}
                                </TableCell>
                                <TableCell align="right">{row.contactName}</TableCell>
                                <TableCell align="right">{row.contactRole}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.agencyStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        disabled={row.contactRole === 'buyer' || row.agencyStatus === "pending"}
                                        color="primary"
                                        onClick={() => handleCreateListing(row.contractId)}
                                    >
                                        <CreateNewFolderIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>

                                    <AddListingDialog user={user} isOpen={{open, setOpen}} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} />
                                    
                                    <IconButton
                                        disabled={row.agencyStatus === "active"}
                                        color="primary"
                                        onClick={() => handleArchiveAgency(row.contractId, row.contactRole)}
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

export default MyClients;
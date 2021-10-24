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
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddListingDialog from './AddListingDialog';
import EditIcon from '@mui/icons-material/Edit';
const axios = require('axios');

const MyListings = (props) => {
    const user = props.user;
    //const { isAgencyUpdated } = props.updateComponent;

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
                                "Main:PreparedListing",
                                "Main:ApprovedListing"
                            ],
                        "query":
                            {
                                "sellerAgent": username,
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {

                const ids = obj.map(id => id.contractId);
                const thumbnails = obj.map(thumbnail => thumbnail.payload.property.thumnbail);
                const sellers = obj.map(seller => seller.payload.seller);
                const streetAddresses = obj.map(streetAddress => streetAddress.payload.property.streetAddress);
                const listPrices = obj.map(listPrice => listPrice.payload.listPrice);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const thumbnail = thumbnails[i];
                    const contractId = ids[i];
                    const seller = (sellers[i]);
                    const streetAddress = streetAddresses[i];
                    const listPrice = listPrices[i];
                    const listingStatus = (approvals[i] === true ? "active" : "in review");

                    tempRows.push({thumbnail, contractId, seller, streetAddress, listPrice, listingStatus});
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
    //}, [isAgencyUpdated, isArchived]);
    }, []);

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

    const handleEditListing = (contractId) => {
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
                            <TableCell>Listing Contract ID</TableCell>
                            <TableCell align="right">Thumbnail</TableCell>
                            <TableCell align="right">Seller</TableCell>
                            <TableCell align="right">Street Address</TableCell>
                            <TableCell align="right">List Price</TableCell>
                            <TableCell align="right">Listing Status</TableCell>
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
                                <TableCell align="right">{row.thumbnail}</TableCell>
                                <TableCell align="right">{row.seller}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.listPrice}</TableCell>
                                <TableCell align="right">{row.listingStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditListing(row.contractId)}
                                    >
                                        <EditIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>

                                    <AddListingDialog user={user} isOpen={{open, setOpen}} />
                                    
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

export default MyListings;
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
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CreateOfferDialog from './CreateOfferDialog';
const axios = require('axios');

const AllPublicListings = (props) => {
    const user = props.user;
    const { username } = user;
    const { isListingsUpdated, setIsListingsUpdated } = props.updateListingsComponent;
    const { isListingApproved } = props.updateApprovedListingsComponent;

    const adminToken = "Bearer " + process.env.REACT_APP_TOKEN_OLIVIA;

    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);
    const [contractIdProp, setContractIdProp] = useState("");

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
                        "Authorization": adminToken,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateIds":
                            [
                                "Main:ApprovedListing"
                            ],
                        "query":
                            {

                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {

                const ids = obj.map(id => id.contractId);
                const thumbnails = obj.map(thumbnail => thumbnail.payload.property.thumnbail);
                const sellerAgents = obj.map(sellerAgent => sellerAgent.payload.sellerAgent);
                const streetAddresses = obj.map(streetAddress => streetAddress.payload.property.streetAddress);
                const listPrices = obj.map(listPrice => listPrice.payload.listPrice);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const thumbnail = thumbnails[i];
                    const contractId = ids[i];
                    const sellerAgent = (sellerAgents[i]);
                    const streetAddress = streetAddresses[i];
                    const listPrice = listPrices[i];
                    const listingStatus = (approvals[i] === true ? "active" : "in review");

                    tempRows.push({thumbnail, contractId, sellerAgent, streetAddress, listPrice, listingStatus});
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
    }, [isListingsUpdated, isListingApproved]);


    const handleCreateOffer = async (contractId) => {
        setContractIdProp(contractId);
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
                            <TableCell align="right">Thumbnail</TableCell>
                            <TableCell align="right">Listing Agent</TableCell>
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
                                <TableCell align="right">{row.sellerAgent}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.listPrice}</TableCell>
                                <TableCell align="right">{row.listingStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        disabled={row.listingStatus !== "active" || row.sellerAgent === username}
                                        color="primary"
                                        onClick={() => handleCreateOffer(row.contractId)}
                                    >
                                        <LocalOfferIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>

                                    <CreateOfferDialog user={user} isOpen={{open, setOpen}} contractIdPropObj={{contractIdProp, setContractIdProp}}updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} />

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

export default AllPublicListings;
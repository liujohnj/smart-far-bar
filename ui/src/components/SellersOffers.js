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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { Tooltip } from '@mui/material';
const axios = require('axios');

const SellersOffers = (props) => {
    const user = props.user;
    const { username, userToken } = user;
    const { isListingsUpdated, setIsListingsUpdated } = props.updateListingsComponent;
    const { isListingApproved } = props.updateApprovedListingsComponent;

    const adminToken = "Bearer " + process.env.REACT_APP_TOKEN_OLIVIA;

    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);
    const [contractIdProp, setContractIdProp] = useState("");

    // Uses REST API to get all active contracts matching a given query.
    //   Fetches all agency-related contracts.
    const getSellersOffers = async () => {
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
                                "Main:PreparedOffer",
                                "Main:TenderedOffer",
                                "Main:ExecutedContract",
                                "Main:PreparedCounteroffer",
                                "Main:TenderedCounteroffer"
                            ],
                        "query":
                            {
                                "parties": {
                                    "seller": username
                                }
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {

                const ids = obj.map(id => id.contractId);
                const sellerAgents = obj.map(buyerAgent => buyerAgent.payload.buyerAgent);
                const streetAddresses = obj.map(streetAddress => streetAddress.payload.property.streetAddress);
                const offeredPrices = obj.map(offeredPrice => offeredPrice.payload.terms.purchasePrice)
                const offerers = obj.map(offerer => offerer.payload.parties.buyer);
                const types = obj.map(type => type.payload.templateType);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const contractId = ids[i];
                    const sellerAgent = sellerAgents[i];
                    const streetAddress = streetAddresses[i];
                    const offeredPrice = offeredPrices[i];
                    const offerer = offerers[i];
                    const template = types[i];
                    const listingStatus = (approvals[i] === true ? "active" : "in review");

                    tempRows.push({contractId, sellerAgent, streetAddress, offeredPrice, offerer, template, listingStatus});
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
        getSellersOffers();
    }, [isListingsUpdated, isListingApproved]);


    const handleApproveOffer = async (contractId) => {
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
                        "templateId": "Main:PreparedOffer",
                        "contractId": contractId,
                        "choice": "ApproveOffer",
                        "argument": {

                        },
                    }
            });
            //setIsListingApproved(!isListingApproved);
        } catch (err) {
            console.log(err);
        }
    }
    /*
    const handleIndicateCounteroffer = async (contractId) => {
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
                        "templateId": "Main:PreparedOffer",
                        "contractId": contractId,
                        "choice": "ApproveOffer",
                        "argument": {

                        },
                    }
            });
            //setIsListingApproved(!isListingApproved);
        } catch (err) {
            console.log(err);
        }
    }
    */
    const acceptOffer = async (contractId) => {
        console.log(contractId);
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
                        "templateId": "Main:TenderedOffer",
                        "contractId": contractId,
                        "choice": "AcceptOffer",
                        "argument": {
                            "admin": "Faythe"
                        },
                    }
            });
            console.log("result = ", response.data.result);
            //setIsListingApproved(!isListingApproved);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCounteroffer = async (contractId) => {

    };
    const handleRejectOffer = async (contractId) => {

    };

    const approvePreparedCounteroffer = async (contractId) => {

    };

    const handleApproveOrAccept = (templateType, status, contractId) => {
        if (templateType === "OFFER") {
            acceptOffer(contractId);
        }
        else if (templateType === "COUNTEROFFER" && status === "in review") {
            approvePreparedCounteroffer(contractId);
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
                            <TableCell>Listing Contract ID</TableCell>
                            <TableCell align="right">Seller Agent</TableCell>
                            <TableCell align="right">Property Address</TableCell>
                            <TableCell align="right">Offer Price</TableCell>
                            <TableCell align="right">Buyer</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Listing Status</TableCell>
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
                                <TableCell align="right">{row.sellerAgent}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.offeredPrice}</TableCell>
                                <TableCell align="right">{row.offerer}</TableCell>
                                <TableCell align="right">{row.template}</TableCell>
                                <TableCell align="right">{row.listingStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <Tooltip title="Approve/Accept">
                                        <IconButton
                                            disabled={row.listingStatus === "dunno"}
                                            color="primary"
                                            onClick={() => handleApproveOrAccept(row.template, row.listingStatus, row.contractId)}
                                        >
                                            <CheckBoxIcon
                                                sx={{
                                                fontSize: 23, 
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Counteroffer">
                                        <IconButton
                                            disabled={row.listingStatus === "dunno"}
                                            color="primary"
                                            onClick={() => handleCounteroffer(row.contractId)}
                                        >
                                            <AssignmentReturnIcon
                                                sx={{
                                                fontSize: 23, 
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    
                                    <Tooltip title="Reject">
                                        <IconButton
                                            disabled={row.listingStatus === "dunno"}
                                            color="primary"
                                            onClick={() => handleRejectOffer(row.contractId)}
                                        >
                                            <CancelIcon
                                                sx={{
                                                fontSize: 23, 
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                   
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

export default SellersOffers;
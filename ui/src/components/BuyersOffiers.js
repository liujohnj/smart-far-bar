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
const axios = require('axios');

const BuyersOffers = (props) => {
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
    const getBuyersOffers = async () => {
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
                                    "buyer": username
                                }
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {

                const ids = obj.map(id => id.contractId);
                const buyerAgents = obj.map(buyerAgent => buyerAgent.payload.buyerAgent);
                const streetAddresses = obj.map(streetAddress => streetAddress.payload.property.streetAddress);
                const offeredPrices = obj.map(offeredPrice => offeredPrice.payload.terms.purchasePrice)
                const types = obj.map(type => type.payload.templateType);
                const approvals = obj.map(type => type.payload.isApproved);
                
                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const contractId = ids[i];
                    const buyerAgent = buyerAgents[i];
                    const streetAddress = streetAddresses[i];
                    const offeredPrice = offeredPrices[i];
                    const template = types[i];
                    const listingStatus = (approvals[i] === true ? "active" : "in review");

                    tempRows.push({contractId, buyerAgent, streetAddress, offeredPrice, template, listingStatus});
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
        getBuyersOffers();
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
                            <TableCell align="right">Buyer Agent</TableCell>
                            <TableCell align="right">Property Address</TableCell>
                            <TableCell align="right">Offer Price</TableCell>
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
                                <TableCell align="right">{row.buyerAgent}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.offeredPrice}</TableCell>
                                <TableCell align="right">{row.template}</TableCell>
                                <TableCell align="right">{row.listingStatus}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        disabled={row.listingStatus === "dunno"}
                                        color="primary"
                                        onClick={() => handleApproveOffer(row.contractId)}
                                    >
                                        <CheckBoxIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        disabled={row.listingStatus === "dunno"}
                                        color="primary"
                                        onClick={() => handleApproveOffer(row.contractId)}
                                    >
                                        <AssignmentReturnIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        disabled={row.listingStatus === "dunno"}
                                        color="primary"
                                        onClick={() => handleApproveOffer(row.contractId)}
                                    >
                                        <CancelIcon
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

export default BuyersOffers;
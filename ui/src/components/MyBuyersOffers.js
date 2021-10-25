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

const MyBuyersOffers = (props) => {
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
                                "buyerAgent": username,
                            }
                    },     
            });
            const obj = response.data.result

            if (obj.length > 0) {

                const ids = obj.map(id => id.contractId);
                const clients = obj.map(client => client.payload.parties.seller);
                const streetAddresses = obj.map(streetAddress => streetAddress.payload.property.streetAddress);
                const offeredPrices = obj.map(offeredPrice => offeredPrice.payload.terms.purchasePrice)
                const offerers = obj.map(offerer => offerer.payload.parties.buyer);
                const types = obj.map(type => type.payload.templateType);
                const approvals = obj.map(approval => approval.payload.isApproved);
                const rejections = obj.map(rejection => rejection.payload.isRejected);
                const counters = obj.map(counter => counter.payload.isCountered);
                
                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const contractId = ids[i];
                    const client = clients[i];
                    const streetAddress = streetAddresses[i];
                    const offeredPrice = offeredPrices[i];
                    const offerer = offerers[i];
                    const template = types[i];
                    const approval = approvals[i];
                    const counter = counters[i];
                    const rejection = rejections[i];
                    
                    let status = "";
                    if (template === "CONTRACT") {
                        status = "executed";
                    } else if (template === "OFFER" && rejection === true) {
                        status = "rejected";
                    } else if (template === "OFFER" && counter === true) {
                        status = "counter pending";
                    } else if (template === "OFFER") {
                        status = "received";
                    }
                    
                    
                    tempRows.push({contractId, client, streetAddress, offeredPrice, offerer, template, status});
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
    
    const indicateCounteroffer = async (contractId) => {
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
                        "templateId": "Main:TenderedOffer",
                        "contractId": contractId,
                        "choice": "IndicateCounteroffer",
                        "argument": {

                        },
                    }
            });
            //setIsListingApproved(!isListingApproved);
        } catch (err) {
            console.log(err);
        }
    }
    
    const acceptOffer = async (contractId) => {
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
        indicateCounteroffer(contractId);
    };

    const rejectOffer = async (contractId) => {
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
                        "choice": "RejectOffer",
                        "argument": {
                            
                        },
                    }
            });
            console.log("result = ", response.data.result);
            //setIsListingApproved(!isListingApproved);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRejectOffer = async (contractId) => {
        rejectOffer(contractId);
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
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Seller</TableCell>
                            <TableCell align="right">Property Address</TableCell>
                            <TableCell align="right">Purchase Price</TableCell>
                            <TableCell align="right">Buyer</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Status</TableCell>
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
                                <TableCell align="right">{row.client}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.offeredPrice}</TableCell>
                                <TableCell align="right">{row.offerer}</TableCell>
                                <TableCell align="right">{row.template}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <Tooltip title="Approve/Accept">
                                        <IconButton
                                            disabled={
                                                true
                                            }
                                            color="primary"
                                            onClick={() => handleApproveOrAccept(row.template, row.status, row.contractId)}
                                        >
                                            <CheckBoxIcon
                                                sx={{
                                                fontSize: 23, 
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Prepare counteroffer">
                                        <IconButton
                                            disabled={
                                                true
                                            }
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
                                            disabled={
                                                true
                                            }
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

export default MyBuyersOffers;
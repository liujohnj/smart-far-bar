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
    const { isSellersOffersUpdated, setIsSellersOffersUpdated } = props.updateSellersOffersComponent;
    const { isBuyersOffersUpdated, setIsBuyersOffersUpdated } = props.updateBuyersOffersComponent;

    const adminToken = "Bearer " + process.env.REACT_APP_TOKEN_OLIVIA;

    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);
    const [contractIdProp, setContractIdProp] = useState("");


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    
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
                const approvals = obj.map(approval => approval.payload.isApproved);
                const rejections = obj.map(rejection => rejection.payload.isRejected);
                const counters = obj.map(counter => counter.payload.isCountered);

                let tempRows = []
                for (let i = 0; i < ids.length; i++) {
                    const contractId = ids[i];
                    const buyerAgent = buyerAgents[i];
                    const streetAddress = streetAddresses[i];
                    const offeredPrice = formatter.format(offeredPrices[i]);
                    const template = types[i];
                    const approval = approvals[i];
                    const counter = counters[i];
                    const rejection = rejections[i];
                    
                    let status = "";
                    if (template === "OFFER" && approval === false) {
                        status = "pending signoff"
                    } else if (template === "OFFER" && rejection === true) {
                        status = "rejected";
                    } else if (template === "OFFER" && counter === true) {
                        status = "counter pending";
                    } else if (template === "OFFER" && approval === true) {
                        status = "tendered"
                    } else if (template === "CONTRACT") {
                        status = "executed"
                    } else if (template === "COUNTEROFFER" && rejection === true) {
                        status = "rejected";
                    } else if (template === "COUNTEROFFER" && counter === false) {
                        status = "received";
                    } else if (template === "COUNTEROFFER" && counter === true) {
                        status = "offer pending";
                    }
                    

                    tempRows.push({contractId, buyerAgent, streetAddress, offeredPrice, template, status});
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
    }, [isListingsUpdated, isListingApproved, isBuyersOffersUpdated, isSellersOffersUpdated]);


    const approvePreparedOffer = async (contractId) => {
        const previousBuyerContractId = localStorage.getItem('previousBuyerContractId');
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
            archiveTenderedCounteroffer(previousBuyerContractId);
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const acceptCounteroffer = async (contractId) => {
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
                        "templateId": "Main:TenderedCounteroffer",
                        "contractId": contractId,
                        "choice": "AcceptCounteroffer",
                        "argument": {
                            "admin": "Olivia"
                        },
                    }
            });
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }
    const rejectCounteroffer = async (contractId) => {
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
                        "templateId": "Main:TenderedCounteroffer",
                        "contractId": contractId,
                        "choice": "RejectCounteroffer",
                        "argument": {
                            "isRejected": true,
                            "templateType": "COUNTEROFFER"
                        },
                    }
            });
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const archiveTenderedCounteroffer = async (contractId) => {
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
                        "templateId": "Main:TenderedCounteroffer",
                        "contractId": contractId,
                        "choice": "ArchiveTenderedCounteroffer",
                        "argument": {
                           
                        },
                    }
            });
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const indicateCounterToCounteroffer = async (contractId) => {
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
                        "templateId": "Main:TenderedCounteroffer",
                        "contractId": contractId,
                        "choice": "IndicateCounterToCounteroffer",
                        "argument": {
                            "isCountered": true,
                            "templateType": "COUNTEROFFER"
                        },
                    }
            });
            const obj = response.data.result;
            console.log(obj);
            const newContractId = obj.exerciseResult;
            console.log(newContractId);
            localStorage.setItem('previousBuyerContractId', newContractId);
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCounter = (contractId) => {
        indicateCounterToCounteroffer(contractId);
    }

    const handleReject = (contractId) => {
        rejectCounteroffer(contractId);
    }

    const handleApproveOrAccept = (templateType, status, contractId) => {
        if (status === "pending signoff") {
            approvePreparedOffer(contractId);
        }
        else if (templateType === "COUNTEROFFER" && status === "received") {
            acceptCounteroffer(contractId);
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
                            <TableCell align="right">Buyer Agent</TableCell>
                            <TableCell align="right">Property Address</TableCell>
                            <TableCell align="right">Offer Price</TableCell>
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
                                <TableCell align="right">{row.buyerAgent}</TableCell>
                                <TableCell align="right">{row.streetAddress}</TableCell>
                                <TableCell align="right">{row.offeredPrice}</TableCell>
                                <TableCell align="right">{row.template}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained">
                                    <IconButton
                                        disabled={
                                            row.status === "executed" ||
                                            row.status === "tendered" ||
                                            row.status === "rejected" ||
                                            row.status === "counter pending" ||
                                            row.status === "offer pending"
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
                                    <IconButton
                                        disabled={
                                            row.status === "executed" ||
                                            row.status === "pending signoff" ||
                                            row.status === "tendered" ||
                                            row.status === "rejected" ||
                                            row.status === "counter pending" ||
                                            row.status === "offer pending"
                                        }
                                        color="primary"
                                        onClick={() => handleCounter(row.contractId)}
                                    >
                                        <AssignmentReturnIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        disabled={
                                            row.status === "executed" ||
                                            row.status === "pending signoff" ||
                                            row.status === "tendered" ||
                                            row.status === "rejected" ||
                                            row.status === "counter pending" ||
                                            row.status === "offer pending"
                                        }
                                        color="primary"
                                        onClick={() => handleReject(row.contractId)}
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
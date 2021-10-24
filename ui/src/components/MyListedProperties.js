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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const axios = require('axios');

const MyListedProperties = (props) => {
    const user = props.user;
    const { isListingsUpdated, setIsListingsUpdated } = props.updateListingsComponent;

    const { username, userType, userToken } = user;
    const actions = "";
    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);
    const [isListingApproved, setIsListingApproved] = useState(false);

    const admin = "Olivia";

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
                                "seller": username,
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
    }, [isListingsUpdated, isListingApproved]);


    const approveListing = async (contractId) => {
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
                        "templateId": "Main:PreparedListing",
                        "contractId": contractId,
                        "choice": "ApproveListing",
                        "argument": {
                            "admin": admin
                        },
                    }
            });
            setIsListingApproved(!isListingApproved);
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
                                        disabled={row.listingStatus !== "in review"}
                                        color="primary"
                                        onClick={() => approveListing(row.contractId)}
                                    >
                                        <CheckBoxIcon
                                            sx={{
                                            fontSize: 23, 
                                            }}
                                        />
                                    </IconButton>

                                    {/*}
                                    <AddListingDialog user={user} isOpen={{open, setOpen}} updateComponent={{isListingsUpdated, setIsListingsUpdated}} />
                                    */}
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

export default MyListedProperties;
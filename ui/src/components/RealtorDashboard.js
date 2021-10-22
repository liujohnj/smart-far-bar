import { Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createClientData(name, role, property, status, action) {
    return { name, role, property, status, action };
}
  
const clientRows = [
    createClientData('Alice', 'seller', '123 Main St', 'contact', '-'),
    createClientData('Bob', 'buyer', '-', 'contact', '-'),
];



function createListingData(thumbnail, property, seller, listPrice, status, action) {
return { thumbnail, property, seller, listPrice, status, action };
}

const listingRows = [
    createListingData('Image', '123 Main St', 'Alice', '$100,000', 'active', '-'),
];



function createSellerOfferData(property, client, listPrice, offerPrice, buyerAgent, status, action) {
    return { property, client, listPrice, offerPrice, buyerAgent, status, action };
    }
    
const sellerOfferRows = [
    createSellerOfferData( '123 Main St', 'Alice', '$100,000', '$80,000', 'Carol', 'Received Offer', '-'),
    ];


function createBuyerOfferData(client, property, listPrice, offerPrice, status, action) {
    return { client, property, listPrice, offerPrice, status, action };
    }
    
const buyerOfferRows = [
    createBuyerOfferData( 'Bob', '123 Main St', '$100,000', '$80,000', 'Tendered', '-'),
    ];
    

const RealtorDashboard = () => {
    return (
        <div>

            <Typography variant="h6">My Clients | Contacts</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Property</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {clientRows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.role}</TableCell>
                        <TableCell align="right">{row.property}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.action}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <br/>


            <Typography variant="h6">My Sellers' Listings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Thumbnail</TableCell>
                        <TableCell align="right">Property</TableCell>
                        <TableCell align="right">Seller</TableCell>
                        <TableCell align="right">List Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listingRows.map((row) => (
                        <TableRow
                        key={row.client}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.thumbnail}
                        </TableCell>
                        <TableCell align="right">{row.property}</TableCell>
                        <TableCell align="right">{row.seller}</TableCell>
                        <TableCell align="right">{row.listPrice}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.action}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <br/>

            <Typography variant="h6">My Sellers' Incoming Offers</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align="right">List Price</TableCell>
                        <TableCell align="right">Offer Price</TableCell>
                        <TableCell align="right">Buyer Agent</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sellerOfferRows.map((row) => (
                        <TableRow
                        key={row.buyer}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.property}
                        </TableCell>
                        <TableCell align="right">{row.listPrice}</TableCell>
                        <TableCell align="right">{row.offerPrice}</TableCell>
                        <TableCell align="right">{row.buyerAgent}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.action}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <br/>

            <Typography variant="h6">My Buyers' Outgoing Offers</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Client</TableCell>
                        <TableCell align="right">Property</TableCell>
                        <TableCell align="right">List Price</TableCell>
                        <TableCell align="right">Offer Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {buyerOfferRows.map((row) => (
                        <TableRow
                        key={row.buyer}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.client}
                        </TableCell>
                        <TableCell align="right">{row.property}</TableCell>
                        <TableCell align="right">{row.listPrice}</TableCell>
                        <TableCell align="right">{row.offerPrice}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.action}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default RealtorDashboard
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
const axios = require('axios');


const AddListingDialog = (props) => {
    const user = props.user;
    const { open, setOpen } = props.isOpen;
    const { isListingsUpdated, setIsListingsUpdated } = props.updateListingsComponent;
    const { isListingApproved, setIsListingApproved } = props.updateApprovedListingsComponent;
    const { isSellersOffersUpdated, setIsSellersOffersUpdated } = props.updateSellersOffersComponent;
    const { isBuyersOffersUpdated, setIsBuyersOffersUpdated } = props.updateBuyersOffersComponent;
   

    //const { isAgencyUpdated, setIsAgencyUpdated } = useState(false);

    const { username, userToken } = user;

    const [seller, setSeller] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("FL");
    const [zipCode, setZipCode] = useState("");
    const [county, setCounty] = useState("");
    const [taxId, setTaxId] = useState("");
    const [legalDescr, setLegalDescr] = useState("");
    const [personalProperty, setPersonalProperty] = useState("");
    const [excludedItems, setExcludedItems] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [escrowAgentName, setEscrowAgentName] = useState("");
    const [escrowAgentAddress, setEscrowAgentAddress] = useState("");
    const [escrowAgentPhone, setEscrowAgentPhone] = useState("");
    const [escrowAgentEmail, setEscrowAgentEmail] = useState("");
    const [escrowAgentFax, setEscrowAgentFax] = useState("");
    const [listPrice, setListPrice] = useState(0.00);
    
    const handleCancel = () => {
        setOpen(false);
    };

    // TO-DO: Refactor to combine into an object and simplify
    const handleSellerChange = (event) => {
        setSeller(event.target.value);
    };

    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);

    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };

    const handleCountyChange = (event) => {
        setCounty(event.target.value);
    };

    const handleTaxIdChange = (event) => {
        setTaxId(event.target.value);
    };

    const handleLegalDescrChange = (event) => {
        setLegalDescr(event.target.value);
    };

    const handlePersonalPropertyChange = (event) => {
        setPersonalProperty(event.target.value);
    };

    const handleExcludedItemsChange = (event) => {
        setExcludedItems(event.target.value);
    };

    const handleThumbnailChange = (event) => {
        setThumbnail(event.target.value);
    };

    const handleEscrowAgentNameChange = (event) => {
        setEscrowAgentName(event.target.value);
    }

    const handleEscrowAgentAddressChange = (event) => {
        setEscrowAgentAddress(event.target.value);
    }

    const handleEscrowAgentPhoneChange = (event) => {
        setEscrowAgentPhone(event.target.value);
    }

    const handleEscrowAgentEmailChange = (event) => {
        setEscrowAgentEmail(event.target.value);
    }

    const handleEscrowAgentFaxChange = (event) => {
        setEscrowAgentFax(event.target.value);
    }

    const handleListPriceChange = (event) => {
        setListPrice(event.target.value);
    };

    const createNewListing = async () => {
        try {
            await axios({
                method: "post",
                url: '/v1/create',
                withCredentials: true,
                headers:
                    {
                        "Authorization": userToken,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:PreparedListing",
                        "payload": {
                            "seller": seller,
                            "property": {
                                "streetAddress": streetAddress,
                                /*
                                "city": city,
                                "state": state,
                                "zipCode": zipCode,
                                "county": county,
                                "taxId": taxId,
                                "legalDescr": legalDescr,
                                "personalProperty": personalProperty,
                                "excludedItems": excludedItems,
                                "thumbnail": thumbnail
                                */
                            },
                            /*
                            "escrowAgent": {
                                "name": escrowAgentName,
                                "address": escrowAgentAddress,
                                "phone": escrowAgentPhone,
                                "email": escrowAgentEmail,
                                "fax": escrowAgentFax
                            },
                            */
                            "listPrice": listPrice,
                            "sellerAgent": username,
                            "templateType": "LISTING",
                            "isApproved": false,        
                        }
                    }
            });
            /*
            setName("");
            setIsBuyer(true);
            setPropertyAddress("");
            */
            setIsListingsUpdated(!isListingsUpdated); // toggle to re-render parent component
            setIsSellersOffersUpdated(!isSellersOffersUpdated);
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = () => {
        createNewListing();
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleCancel}>
            <DialogTitle variant="h5">Create New Listing</DialogTitle>
            <DialogContent>

                <Typography variant="subtitle1" color="primary" >
                    Owner information
                </Typography>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Seller"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={seller}
                    onChange={handleSellerChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt:3}}>
                    Property information
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="streetAddress"
                    label="Street address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={streetAddress}
                    onChange={handleStreetAddressChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={city}
                    onChange={handleCityChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="state"
                    label="State"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state}
                    onChange={handleStateChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="zipCode"
                    label="Zip code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="county"
                    label="County"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={county}
                    onChange={handleCountyChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="taxId"
                    label="Tax ID No."
                    type="text"
                    fullWidth
                    variant="standard"
                    value={taxId}
                    onChange={handleTaxIdChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="legalDescr"
                    label="Legal description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={legalDescr}
                    onChange={handleLegalDescrChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="personalProperty"
                    label="Personal property included"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={personalProperty}
                    onChange={handlePersonalPropertyChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="excludedItems"
                    label="Excluded items"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={excludedItems}
                    onChange={handleExcludedItemsChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="thumbnail"
                    label="Image"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={thumbnail}
                    onChange={handleThumbnailChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt:3}}>
                    Escrow Agent Details
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id=""
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentName}
                    onChange={handleEscrowAgentNameChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id=""
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentAddress}
                    onChange={handleEscrowAgentAddressChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id=""
                    label="Phone"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentPhone}
                    onChange={handleEscrowAgentPhoneChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id=""
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentEmail}
                    onChange={handleEscrowAgentEmailChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id=""
                    label="Fax"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentFax}
                    onChange={handleEscrowAgentFaxChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt:3}}>
                    Listing Details
                </Typography>

                <TextField
                    autoFocus
                    margin="dense"
                    id="listPrice"
                    label="List price ($USD)"
                    type="decimal"
                    fullWidth
                    variant="standard"
                    value={listPrice}
                    onChange={handleListPriceChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddListingDialog;
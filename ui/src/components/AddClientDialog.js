import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { IconButton } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormLabel } from '@mui/material';
const axios = require('axios');


const AddClientDialog = (props) => {
    const user = props.user;
    const { isAgencyUpdated, setIsAgencyUpdated } = props.updateComponent;

    const { username, userToken } = user;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [propertyAddress, setPropertyAddress] = useState("");
    const [isBuyer, setIsBuyer] = useState(true);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        value === "seller" ? setIsBuyer(false) : setIsBuyer(true);
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleInputNameChange = (event) => {
        setName(event.target.value);
    };

    const handleInputPropertyAddressChange = (event) => {
        setPropertyAddress(event.target.value);
    };

    const proposeAgency = async (templateId, address, templateType) => {
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
                        "templateId": templateId,
                        "payload": {
                            "party": name,
                            "agent": username,
                            "propertyAddress": address,
                            "templateType": templateType,
                            "isApproved": false,        
                        }
                    }
            });
            setName("");
            setIsBuyer(true);
            setPropertyAddress("");
            setIsAgencyUpdated(!isAgencyUpdated); // toggle to re-render sibling component
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = () => {
        if (isBuyer) {
            proposeAgency("Main:BuyerAgencyProposal", "N/A", "BUYER_AGENCY");
        } else {
            proposeAgency("Main:SellerAgencyProposal", propertyAddress,"SELLER_AGENCY");
        }
        setOpen(false);
    };

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <AddCircleIcon
                    sx={{
                    fontSize: 35, 
                    }}
                />
            </IconButton>
            <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={handleInputNameChange}
                />

                <FormControl component="fieldset" sx={{ mt: 3}}>
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup row aria-label="Role" name="row-radio-buttons-group" defaultValue="buyer">
                        <FormControlLabel value="buyer" control={<Radio />} label="Buyer" onChange={handleChange} />  
                        <FormControlLabel value="seller" control={<Radio />} label="Seller" onChange={handleChange} /> 
                    </RadioGroup>
                </FormControl>

                <TextField
                    autoFocus
                    margin="dense"
                    id="propertyAddress"
                    label="Street address (if applicable)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={propertyAddress}
                    onChange={handleInputPropertyAddressChange}
                    disabled={isBuyer}
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

export default AddClientDialog;
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { IconButton } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormLabel } from '@mui/material';
const axios = require('axios');


const AddClientDialog = () => {
    const [open, setOpen] = useState(false);
    const [isBuyer, setIsBuyer] = useState(true);

    const tokenCarol = "Bearer " + process.env.REACT_APP_TOKEN_CAROL;

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

    const proposeBuyerAgency = async () => {
        console.log("proposed!");
        try {
            const response = await axios({
                method: "post",
                url: '/v1/create',
                withCredentials: true,
                headers:
                    {
                        "Authorization": tokenCarol,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:BuyerAgencyProposal",
                        "payload": {
                            "buyer": "Bob",
                            "buyerAgent": "Carol",
                            "templateType": "BUYER_AGENCY",
                            "isApproved": false,        
                        }
                    }
            });
            console.log("response after proposing: ", response.data);
            //setAgencyStatus("engaged");
        } catch (err) {
            console.log(err);
        }
    }
    const proposeSellerAgency = () => {

    }

    const handleSubmit = () => {
        if (isBuyer) {
            proposeBuyerAgency();
        } else {
            proposeSellerAgency();
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
                    id="streetAddress"
                    label="Street address (if applicable)"
                    type="text"
                    fullWidth
                    variant="standard"
                    disabled={isBuyer
        }
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
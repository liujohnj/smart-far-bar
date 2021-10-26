import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*
    Dialog pop-up that provides brief app info
*/
const AlertDialog = (props) => {

    const { open, setOpen } = props.openProp;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Welcome to Smart FAR-BAR"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This web application is my individual submission for THE 6-WEEK SMART CONTRACT HACKATHON organized at devpost.com and my first foray into smart contracts and blockchain generally. Many thanks to sponsors Digital Asset and SE2 for creating this opportunity for me to learn as much as I did about this exciting space.
                        <br /><br />
                        Leveraging the power, simplicity, and flexibility of Daml, I was able to develop an application that takes a first step towards digitally "codifying" the prevalent contract form used in the state of Florida for residential real estate sales and purchases, i.e., the FAR/BAR contract. Always with one eye towards the horizon, however, the approach taken regarding transparency and behavior prescription can be scaled to non real-estate transactions involving multiple parties that include the principal-agent relationship.
                        <br /><br />
                        For more information, please visit my project submission page for this particular hackathon at devpost.com.
                        <br /><br /><br />
                        -- John Liu
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;
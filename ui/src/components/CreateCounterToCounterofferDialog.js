import { useState, useEffect } from 'react';
import { Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const axios = require('axios');


const CreateCounterToCounterofferDialog = (props) => {
    const user = props.user;
    const { open, setOpen } = props.isOpen;
    const { contractIdProp } = props.contractIdPropObj;
    const { username, userToken } = user;
    const { isBuyersOffersUpdated, setIsBuyersOffersUpdated } = props.updateBuyersOffersComponent;

    const [seller, setSeller] = useState("");
    const [buyer, setBuyer] = useState("");
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
    const [purchasePrice, setPurchasePrice] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [initialDepositTime, setInitialDepositTime] = useState("");
    const [balanceToClose, setBalanceToClose] = useState("");
    const [timeForAcceptance, setTimeForAcceptance] = useState("");
    const [closingDate, setClosingDate] = useState("");
    const [isAssignable, setIsAssignable] = useState("");
    const [titleEvidenceDeadline, setTitleEvidenceDeadline] = useState("");
    const [whoDesignatesClosingAgent, setWhoDesignatesClosingAgent] = useState("");
    const [inspectionPeriod, setInspectionPeriod] = useState("");
    const [additionalTerms, setAdditionalTerms] = useState("");
    const [sellerAgent, setSellerAgent] = useState("");
    const [buyerAgent, setBuyerAgent] = useState("");
    const [templateType, setTemplateType] = useState("COUNTEROFFER");
    const [isApproved, setIsApproved] = useState(false);
    

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSellerChange = (event) => {
        setSeller(event.target.value);
    };

    const handleBuyerChange = (event) => {
        setBuyer(event.target.value);
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
    };

    const handleEscrowAgentAddressChange = (event) => {
        setEscrowAgentAddress(event.target.value);
    };

    const handleEscrowAgentPhoneChange = (event) => {
        setEscrowAgentPhone(event.target.value);
    };

    const handleEscrowAgentEmailChange = (event) => {
        setEscrowAgentEmail(event.target.value);
    };

    const handleEscrowAgentFaxChange = (event) => {
        setEscrowAgentFax(event.target.value);
    };

    const handlePurchasePriceChange = (event) => {
        setPurchasePrice(event.target.value);
    };

    const handleInitialDepositChange = (event) => {
        setInitialDeposit(event.target.value);
    };

    const handleInitialDepositTimeChange = (event) => {
        setInitialDepositTime(event.target.value);
    };

    const handleBalanceToCloseChange = (event) => {
        setBalanceToClose(event.target.value);
    };

    const handleTimeForAcceptanceChange = (event) => {
        setTimeForAcceptance(event.target.value);
    };

    const handleClosingDateChange = (event) => {
        setClosingDate(event.target.value);
    };

    const handleIsAssignableChange = (event) => {
        setIsAssignable(event.target.value);
    };

    const handleTitleEvidenceDeadlineChange = (event) => {
        setTitleEvidenceDeadline(event.target.value);
    };

    const handleWhoDesignatesClosingAgentChange = (event) => {
        setWhoDesignatesClosingAgent(event.target.value);
    };

    const handleInspectionPeriodChange = (event) => {
        setInspectionPeriod(event.target.value);
    };

    const handleAdditionalTermsChange = (event) => {
        setAdditionalTerms(event.target.value);
    };

    const handleSellerAgentChange = (event) => {
        setSellerAgent(event.target.value);
    };

    const handleBuyerAgentChange = (event) => {
        setBuyerAgent(event.target.value);
    }

    const fetchOfferDetails = async () => {
        try {
            const response = await axios({
                method: "post",
                url: '/v1/fetch',
                withCredentials: true,     
                headers:
                    {
                        "Authorization": userToken,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "contractId": contractIdProp
                    },
            });
            if (response.data.result) {
                const obj = response.data.result.payload;
                
                setSeller(obj.parties.seller);
                setBuyer(obj.parties.buyer);
                setPurchasePrice(obj.terms.purchasePrice);
                setStreetAddress(obj.property.streetAddress);
                setCity(obj.property.city);
                setState(obj.property.state);
                setZipCode(obj.property.zipCode);
                setCounty(obj.property.county);
                setTaxId(obj.property.taxId);
                setLegalDescr(obj.property.legalDescr);
                setPersonalProperty(obj.property.personalProperty);
                setExcludedItems(obj.property.excludedItems);
                setThumbnail(obj.property.thumbnail);
                setEscrowAgentName(obj.escrowAgent.name);
                setEscrowAgentAddress(obj.escrowAgent.address);
                setEscrowAgentPhone(obj.escrowAgent.phone);
                setEscrowAgentEmail(obj.escrowAgent.email);
                setEscrowAgentFax(obj.escrowAgent.fax);
                setPurchasePrice(obj.terms.purchasePrice);
                setInitialDeposit(obj.terms.initialDeposit);
                setInitialDepositTime(obj.terms.initialDepositTime);
                setBalanceToClose(obj.terms.balanceToClose);
                setTimeForAcceptance(obj.terms.timeForAcceptance);
                setClosingDate(obj.terms.closingDate);
                setIsAssignable(obj.terms.isAssignable);
                setTitleEvidenceDeadline(obj.terms.titleEvidenceDeadline);
                setWhoDesignatesClosingAgent(obj.terms.whoDesignatesClosingAgent);
                setInspectionPeriod(obj.terms.inspectionPeriod);
                setAdditionalTerms(obj.terms.additionalTerms);
                setBuyerAgent(obj.buyerAgent);
                setSellerAgent(obj.sellerAgent);
            }
        } catch(err) {
            console.log("error: ", err);
        }
    }

    useEffect(() => {
        fetchOfferDetails();
    }, [contractIdProp, isBuyersOffersUpdated]);


    const prepareCounterToCounteroffer = async () => {
        try {
            const response = await axios({
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
                        "templateId": "Main:PreparedOffer",
                        "payload": {
                            "parties": {
                                "seller": seller,
                                "buyer": buyer
                            },
                            "property": {
                                "streetAddress": streetAddress,
                                "city": city,
                                "state": state,
                                "zipCode": zipCode,
                                "county": county,
                                "taxId": taxId,
                                "legalDescr": legalDescr,
                                "personalProperty": personalProperty,
                                "excludedItems": excludedItems,
                                "thumbnail": thumbnail
                            },
                            "escrowAgent": {
                                "name": escrowAgentName,
                                "address": escrowAgentAddress,
                                "phone": escrowAgentPhone,
                                "email": escrowAgentEmail,
                                "fax": escrowAgentFax
                            },
                            "terms": {
                                "purchasePrice": purchasePrice,
                                "initialDeposit": initialDeposit,
                                "initialDepositTime": initialDepositTime,
                                "balanceToClose": balanceToClose,
                                "timeForAcceptance": timeForAcceptance,
                                "closingDate": closingDate,
                                "isAssignable": isAssignable,
                                "titleEvidenceDeadline": titleEvidenceDeadline,
                                "whoDesignatesClosingAgent": whoDesignatesClosingAgent,
                                "inspectionPeriod": inspectionPeriod,
                                "additionalTerms": additionalTerms
                            },
                            "sellerAgent": sellerAgent,
                            "buyerAgent": buyerAgent,
                            "templateType": "OFFER",
                            "isApproved": false,        
                        }
                    }
            });
            setIsBuyersOffersUpdated(!isBuyersOffersUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async () => {
        await prepareCounterToCounteroffer();
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Create Counter to Counteroffer</DialogTitle>
            <DialogContent>

                <Typography variant="subtitle1" color="primary">
                    Parties Info
                </Typography>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="seller"
                    label="Seller"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={seller}
                    onChange={handleSellerChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="buyer"
                    label="Buyer"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={buyer}
                    onChange={handleBuyerChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt: 3}}>
                    Property Details
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

                <Typography variant="subtitle1" color="primary" sx={{mt: 3}}>
                    Escrow Agent Details
                </Typography>

                <TextField
                    autoFocus
                    margin="dense"
                    id="escrowAgentName"
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
                    id="escrowAgentAddress"
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
                    id="escrowAgentPhone"
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
                    id="escrowAgentEmail"
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
                    id="escrowAgentFax"
                    label="Fax"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={escrowAgentFax}
                    onChange={handleEscrowAgentFaxChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt: 3}}>
                    Counter to Counteroffer Terms
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="purchasePrice"
                    label="Purchase Price ($USD)"
                    type="decimal"
                    fullWidth
                    variant="standard"
                    value={purchasePrice}
                    onChange={handlePurchasePriceChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="initialDeposit"
                    label="Initial deposit ($USD)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={initialDeposit}
                    onChange={handleInitialDepositChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="initialDepositTime"
                    label="Initial deposit to be made within (# days)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={initialDepositTime}
                    onChange={handleInitialDepositTimeChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="balanceToClose"
                    label="Balance to close ($USD)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={balanceToClose}
                    onChange={handleBalanceToCloseChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="timeForAcceptance"
                    label="Time for Acceptance"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={timeForAcceptance}
                    onChange={handleTimeForAcceptanceChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="closingDate"
                    label="Closing Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={closingDate}
                    onChange={handleClosingDateChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="isAssignable"
                    label="Is assignable?"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={isAssignable}
                    onChange={handleIsAssignableChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="titleEvidenceDeadline"
                    label="Title evidence deadline"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={titleEvidenceDeadline}
                    onChange={handleTitleEvidenceDeadlineChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="whoDesignatesClosingAgent"
                    label="Who designates Closing Agent"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={whoDesignatesClosingAgent}
                    onChange={handleWhoDesignatesClosingAgentChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="inspectionPeriod"
                    label="Inspection Period"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={inspectionPeriod}
                    onChange={handleInspectionPeriodChange}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="additionalTerms"
                    label="Additional terms"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={additionalTerms}
                    onChange={handleAdditionalTermsChange}
                />

                <Typography variant="subtitle1" color="primary" sx={{mt: 3}}>
                    Seller Agent Info
                </Typography>

                <TextField
                    autoFocus
                    margin="dense"
                    id="sellerAgent"
                    label="Seller Agent"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={sellerAgent}
                    onChange={handleSellerAgentChange}
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

export default CreateCounterToCounterofferDialog;
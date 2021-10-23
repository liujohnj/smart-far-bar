import { useState } from "react";
//import Grid from "@material-ui/core/Grid";
//import TextField from "@material-ui/core/TextField";
import TextField from '@mui/material/TextField';
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import FormControl from "@material-ui/core/FormControl";
//import FormLabel from "@material-ui/core/FormLabel";
//import RadioGroup from "@material-ui/core/RadioGroup";
//import Radio from "@material-ui/core/Radio";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import Slider from "@material-ui/core/Slider";
//import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
//import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
//import Container from '@mui/material/Container';


const ListingForm = () => {

    const defaultValues = {
        seller : "",
        propertyStreetAddress: "",
        propertyCity: "",
        propertyState: "FL",
        propertyZip: "",
        propertyCounty: "",
        propertyTaxId: "",
        propertyLegalDescr: "",
        propertyPersonalProperty: "",
        propertyExcludedItems: "",
        propertyThumbnail: "",
        sellerAgent: "",
        escrowAgentName: "",
        escrowAgentAddress: "",
        escrowAgentPhone: "",
        escrowAgentEmail: "",
        escrowAgentFax: "",
        listPrice: 0,
    }

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Value = ", name, value)
        setFormValues({
            ...formValues,
            [name] : value
        });
      };

    //'& .MuiTextField-root': { m: 1 },

    return (
        <div style={{ width: '100%'}}>
            <br />
            <br />
            <Box
                sx={{
                    bgcolor: 'lightblue',
                 }}
            >
                <Box>
                    <FormControl>
                        <Box
                            sx={{
                                m: 1,
                                p: 2,
                                bgcolor: 'lightgreen',
                            }}>
                            <FormLabel>Seller Info</FormLabel>
                            <br />
                            <TextField
                                required
                                sx={{ m: 1,}}
                                id="outlined-required"
                                name="seller"
                                label="Seller"
                                value={formValues.seller}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <Box
                            sx={{
                                m: 1,
                                p: 2,
                                bgcolor: 'lightpink',
                            }}
                        >
                            <FormLabel>Property Info</FormLabel>
                            <br />
                            <TextField
                                fullWidth
                                sx={{ m: 1, maxWidth: 750}}
                                id="outlined-basic"
                                name="propertyStreetAddress"
                                label="Street address"
                                value={formValues.propertyStreetAddress}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                sx={{ m: 1, width: 350}} 
                                id="outlined-basic"
                                name="propertyCity"
                                label="City"
                                value={formValues.propertyCity}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{ m: 1, width: 100,}}
                                id="outlined-basic"
                                name="propertyState"
                                label="State"
                                value={formValues.propertyState}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{ m: 1, width: 200,}}
                                id="outlined-basic"
                                name="propertyZip"
                                label="Zip Code"
                                value={formValues.propertyZip}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                required
                                sx={{ m: 1, width: 300}}
                                id="outlined-basic"
                                name="propertyCounty"
                                label="County"
                                value={formValues.propertyCounty}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                sx={{ m: 1, width: 400,}}
                                id="outlined-basic"
                                name="propertyTaxId"
                                label="Tax ID #"
                                value={formValues.propertyTaxId}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField 
                                multiline
                                rows={4}
                                sx={{ m: 1, width: 600}}
                                id="outlined-basic"
                                name="propertyLegalDescr"
                                label="Legal description"
                                type="text"
                                value={formValues.propertyLegalDescr}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <Box
                            sx={{
                                m: 1,
                                p: 2,
                                bgcolor: "lightsalmon",
                            }} 
                        >
                            <FormLabel>Listing Info</FormLabel>
                            <br />
                            <TextField 
                                required
                                sx={{ m: 1, width: 175}}
                                id="outlined-basic"
                                name="listPrice"
                                label="List price"
                                type="number"
                                value={formValues.listPrice}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                sx={{ m: 1, width: 350}}  
                                id="outlined-basic"
                                name="sellerAgent"
                                label="Seller agent"
                                type="text"
                                value={formValues.sellerAgent}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                multiline
                                rows={3}
                                sx={{ m: 1, width: 450}} 
                                id="outlined-basic"
                                name="propertyPersonalProperty"
                                label="Personal property included"
                                type="text"
                                value={formValues.propertyPersonalProperty}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                multiline
                                rows={3}
                                sx={{ m: 1, width: 450}} 
                                id="outlined-basic"
                                name="propertyExcludedItems"
                                label="Excluded items"
                                type="text"
                                value={formValues.propertyExcludedItems}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                sx={{ m: 1,}} 
                                id="outlined-basic"
                                name="propertyThumbnail"
                                label="Thumbnail"
                                type="text"
                                value={formValues.propertyThumbnail}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <Box
                            sx={{
                                m: 1,
                                p: 2,
                                bgcolor: "lightcyan",
                            }} 
                        >
                            <FormLabel>Escrow Agent Info</FormLabel>
                            <br />
                            <TextField 
                                sx={{ m: 1, width: 450}} 
                                id="outlined-basic"
                                name="escrowAgentName"
                                label="Name"
                                type="text"
                                value={formValues.escrowAgentName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                sx={{ m: 1, maxWidth: 750}} 
                                id="outlined-basic"
                                name="escrowAgentAddress"
                                label="Address"
                                type="text"
                                value={formValues.escrowAgentAddress}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                sx={{ m: 1,}} 
                                id="outlined-basic"
                                name="escrowAgentPhone"
                                label="Phone"
                                type="text"
                                value={formValues.escrowAgentPhone}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                sx={{ m: 1, width: 350}} 
                                id="outlined-basic"
                                name="escrowAgentEmail"
                                label="Email"
                                type="text"
                                value={formValues.escrowAgentEmail}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                sx={{ m: 1,}} 
                                id="outlined-basic"
                                name="escrowAgentFax"
                                label="Fax"
                                type="text"
                                value={formValues.escrowAgentFax}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </div>
    )
}

export default ListingForm;
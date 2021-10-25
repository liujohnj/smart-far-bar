import { useState } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MyRealtors from "./MyRealtors";
import MyListedProperties from "./MyListedProperties";
import AllPublicListings from './AllPublicListings';
import BuyersOffers from './BuyersOffers';
import SellersOffers from './SellersOffers';


const ClientDashboard = (props) => {
    const user = props.user

    // For re-rendering sibling components
    const [isAgencyUpdated, setIsAgencyUpdated] = useState(false);
    const [isListingsUpdated, setIsListingsUpdated] = useState(false);
    const [isListingApproved, setIsListingApproved] = useState(false);
    const [isSellersOffersUpdated, setIsSellersOffersUpdated] = useState(false);
    const [isBuyersOffersUpdated, setIsBuyersOffersUpdated] = useState(false);


    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    ml: 2,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Box
                    sx=
                        {{
                            flexGrow: 1,
                            alignItems: 'center',
                        }}
                >
                    <Typography variant="subtitle1">
                        My Realtors
                    </Typography>
                </Box>
            </Box>
            <MyRealtors
                user={user} updateComponent={ {isAgencyUpdated, setIsAgencyUpdated}}
                updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}}
                updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}}
            />

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Listed Properties
                </Typography>
                <MyListedProperties user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    All Public Listings
                </Typography>
                <AllPublicListings user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}} updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}} />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Offers
                </Typography>
                
                { user.userRole === "buyer" && <BuyersOffers user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}} updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}} /> }

                { user.userRole === "seller" && <SellersOffers user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}} updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}} /> }
            </Box>
        </div>
    )
}


export default ClientDashboard;
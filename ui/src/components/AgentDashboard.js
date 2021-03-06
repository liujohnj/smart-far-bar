import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddClientDialog from "./AddClientDialog";
import MyClients from "./MyClients";
import MyListings from './MyListings';
import AllPublicListings from './AllPublicListings';
import MySellersOffers from './MySellersOffers';
import MyBuyersOffers from './MyBuyersOffers';

const AgentDashboard = (props) => {
    const user = props.user;

    // For re-rendering sibling components
    const [isAgencyUpdated, setIsAgencyUpdated] = useState(false);
    const [isListingsUpdated, setIsListingsUpdated] = useState(false);
    const [isListingApproved, setIsListingApproved] = useState(false);
    const [isSellersOffersUpdated, setIsSellersOffersUpdated] = useState(false);
    const [isBuyersOffersUpdated, setIsBuyersOffersUpdated] = useState(false);


    useEffect(() => {

    }, [isAgencyUpdated, isListingsUpdated, isSellersOffersUpdated, isBuyersOffersUpdated]);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 2,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Box
                    sx=
                        {{
                            flexGrow: 1,
                            
                        }}
                >
                    <Typography variant="subtitle1">
                        My Clients
                    </Typography>
                </Box>
                <Box>
                    <AddClientDialog
                        user={user}
                        updateComponent={{isAgencyUpdated, setIsAgencyUpdated}}
                        updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}}
                        updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}}
                    />
                </Box>
            </Box>
            <Box>
                <MyClients
                    user={user}
                    updateComponent={{isAgencyUpdated, setIsAgencyUpdated}}updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}}                  updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}}
                    updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}}
                />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Listings
                </Typography>
                <MyListings user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} />
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
                    My Sellers' Offers
                </Typography>
                <MySellersOffers user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}} updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}} />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Buyers' Offers
                </Typography>
                <MyBuyersOffers user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} updateApprovedListingsComponent={{isListingApproved, setIsListingApproved}} updateSellersOffersComponent={{isSellersOffersUpdated, setIsSellersOffersUpdated}} updateBuyersOffersComponent={{isBuyersOffersUpdated, setIsBuyersOffersUpdated}} />
            </Box>
        </div>
    )
}

export default AgentDashboard;
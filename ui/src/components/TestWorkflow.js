import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const axios = require('axios');


const TestWorkflow = () => {

/* Token generation
{
  "https://daml.com/ledger-api": {
     "ledgerId": "daml-smart-far-bar",
     "applicationId": "smart-far-bar",
     "actAs": ["Bob"]
   }
}
*/

    const tokenBob = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYW1sLXNtYXJ0LWZhci1iYXIiLCJhcHBsaWNhdGlvbklkIjoic21hcnQtZmFyLWJhciIsImFjdEFzIjpbIkJvYiJdfX0.RrDfEGvJmcdjHGGr3zpqK27kdaO8FKQwu9R_U64WzOw";

    const tokenAlice = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYW1sLXNtYXJ0LWZhci1iYXIiLCJhcHBsaWNhdGlvbklkIjoic21hcnQtZmFyLWJhciIsImFjdEFzIjpbIkFsaWNlIl19fQ.o7iojVClVjdm9sDpVQzTCPaMlMJ-m3GC-ZQ7MVsMkxU";

    const [contractsList, setContractsList] = useState("None");
    const [activeContract, setActiveContract] = useState('');

    const queryContracts = async (party) => {
        let token;
        if (party === "Bob") {
            token = tokenBob;
        } else {
            token = tokenAlice;
        }

        try {
            const response = await axios({
                method: "get",
                url: '/v1/query',                
                headers:
                    {
                        "Authorization": token,
                    },
                
            });
            console.log("LIST OF CONTRACTS: ", response.data.result)
            const numContracts = response.data.result.length;
            if (numContracts > 0) {
                //const data = JSON.stringify(response.data.result)
                console.log("Number of contracts = ", numContracts)
                setContractsList(response.data.result);
                setActiveContract(response.data.result[0].contractId)
            } else {
                console.log("setting list to None");
                setContractsList("None");
            }
            
        } catch(err) {
            console.log("ERROR---> ", err);
        }
    }

    const bobMakesOffer = async (party) => {
        let token = tokenBob;
        try {
            const response = await axios({
                method: "post",
                url: '/v1/create',
                withCredentials: true,
                headers:
                    {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                data:
                    {
                        "templateId": "Main:AsIsOffer",
                        "payload": {
                            "seller": "Alice",
                            "buyerInOffer": "Bob",
                            "property": "123 Main St",
                            "purchasePriceInOffer": 15000.00,
                            "otherTermsInOffer":        
                                {
                                    "closingDate":"2021-10-31",
                                    "inspectionPeriod":10
                                },
                        "sellerRejectsOfferCheckbox": false,
                        "sellerCountersOfferCheckbox": false
                        }
                    }
            });
            console.log("MakeOffer response: ", response);
        } catch (err) {
            console.log(err);
        }
    }

    const aliceCountersOffer = async (party) => {
        let token = tokenAlice;
        console.log("Contract being countered: ", activeContract);
        try {
            const response = await axios({
                method: "post",
                url: '/v1/exercise',
                withCredentials: true,
                headers:
                    {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                data:
                {
                    "templateId": "Main:AsIsOffer",
                    "contractId": activeContract,
                    "choice": "CounterBuyersOffer",
                    "argument": {
                        "sellersCounterPurchasePrice": 18000.00,
                        "seller": "Alice",
                        "buyerInCounteroffer": "Bob",
                        "property": "123 Main St",
                        "sellerRejectsOfferCheckbox": false,
                        "sellerCountersOfferCheckbox": true,
                        "purchasePriceInCounteroffer": "sellersCounterPurchasePrice",
                        "otherTermsInCounteroffer": {"closingDate":"2021-10-31", "inspectionPeriod":10}
                    }
                }
            });
            console.log("Counteroffer response: ", response);
            if (response.data) {
                //const data = JSON.stringify(response.data.result)
                //setActiveContract(response.data.result[0].contractId)
                console.log("New contractId: ", response.data.result.exerciseResult);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const bobAcceptsCounter = async (party) => {
        let token = tokenBob;
        console.log("Contract being countered: ", activeContract);
        try {
            const response = await axios({
                method: "post",
                url: '/v1/exercise',
                withCredentials: true,
                headers:
                    {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                data:
                {
                    "templateId": "Main:AsIsCounteroffer",
                    "contractId": activeContract,
                    "choice": "AcceptSellersCounteroffer",
                    "argument": {
                        "seller": "Alice",
                        "buyer": "Bob",
                        "property": "123 Main St",
                        "purchasePrice": 18000.00,
                        "otherTerms": {"closingDate":"2021-10-31", "inspectionPeriod":10}
                    }
                }
            });
            console.log("Acceptance: ", response);
            if (response.data) {
                //const data = JSON.stringify(response.data.result)
                //setActiveContract(response.data.result[0].contractId)
                console.log("New contractId: ", response.data.result.exerciseResult);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div>
            <div>
                <Typography variant="h3">
                    Workflow Testing Page
                </Typography> 
                <br />
                
                <Button variant="contained" onClick={() => {
                    queryContracts("Bob")
                }}>Bob gets list of contracts</Button>
                <br />
                <br />
                
                <Button variant="contained" onClick={() => {
                    bobMakesOffer("Bob")
                }}>Bob makes initial offer</Button>
                <br />
                <br />

                <Button variant="contained" onClick={() => {
                    aliceCountersOffer("Alice")
                }}>Alice counters Bob's offer</Button>
                <br />
                <br />

                <Button variant="contained" onClick={() => {
                    bobAcceptsCounter("Bob")
                }}>Bob accepts Alice's counter</Button>
                <br />
                <br />

            </div>
            
            <div>
                <Typography variant="h6">
                    List of contracts:
                </Typography>
                
                {(contractsList && contractsList === "None") && <p>None</p>}

                {(contractsList && contractsList !== "None") && contractsList.map((contract, key) => {
                    return <p key={key}>{contract.contractId}</p>
                })}
                
            </div>
        </div>
    );
}
 
export default TestWorkflow;
const axios = require('axios');



async function FetchAllKnownParties (party) {
    const tokenCarol = "Bearer " + process.env.REACT_APP_TOKEN_CAROL;
    try {
        const response = await axios({
            method: "get",
            url: '/v1/parties',                
            headers:
                {
                    "Authorization": tokenCarol,
                },
        });
        const data = response.data.result;
        console.log("LIST OF PARTIES: ", data)
        //console.log(typeof data);
        return data
    } catch(err) {
        console.log("ERROR---> ", err);
    }
}

export { FetchAllKnownParties }
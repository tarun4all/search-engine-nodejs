const SerpWow = require('google-search-results-serpwow');
const serpwow = new SerpWow(process.env.SURP_API_KEY || 'E5E8DCD07B864C8CBA7F728B0F53F388');
const util = require('util');
// const Bing = require('node-bing-api') ({
//     accKey: process.env.BING_API_KEY,
//     rootUri: process.env.BING_ENDPOINT,
// });

const Bing = require('node-bing-api')({ accKey: process.env.BING_API_KEY });
// const fetch = require('node-fetch');


exports = module.exports = class SearchService {
    search(keyword, engine, page) {
        console.log('inside serpwow search');
        return new Promise(async (resolve, reject) => {
            let params = {};
            if(engine==='Bing') {
                params = {
                    q1: keyword,
                    page: page || 1,
                    engine: engine,
                    country_code: 'US'
                }
            } else {
                 params = {
                    q1: keyword,
                    page: page || 1,
                    gl: 'us',
                    hl: 'en',
                    location: 'United States',
                    google_domain: 'google.com'
                }

            }
            serpwow.json(params)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                // console.log('serpwow catch');
                Bing.web("leo fender", function(error, res, body){
                        console.log(body);
                    },
                    {
                        top: 50,
                        market: 'en-US'
                    });

            });
        });
    }

    getResponseFromBingAPI = async keyword => {
        try {
            let url = process.env.BING_ENDPOINT + '?q=' + keyword + '&customconfig='+ process.env.BING_CUSTOM_CONFIG_ID + '&mkt=en-US';
            const response = await fetch(url, {headers:{
                    'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
                }});
            let json = await response.json();
            json.organic_results = json.webPages.value;
            json.webPages = {};
            return await json;
        } catch (error) {
            console.log(error);
        }
    };


    // getResponseFromBingAPI(keyword) {
    //     console.log('getting results from bing api');
    //     keyword = keyword.replace(' ', '%20');
    //
    //     let options = {
    //         url: process.env.BING_ENDPOINT + '?q=' + keyword + '&customconfig='+ process.env.BING_CUSTOM_CONFIG_ID + '&mkt=en-US',
    //         headers: {
    //             'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
    //         }
    //     };
    //
    //     request.get(options, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             let result = JSON.parse(body);
    //             result.organic_results = result.webPages.value;
    //             result.webPages = {};
    //             console.log(result);
    //             return 'adsasd';
    //         }
    //     });
    // }
};



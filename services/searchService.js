const SerpWow = require('google-search-results-serpwow');
let serpwow = new SerpWow(process.env.SURP_API_KEY || 'E5E8DCD07B864C8CBA7F728B0F53F388');
const request = require('request');

exports = module.exports = class SearchService {
    search(keyword, engine, page) {
        console.log('inside serpwow search');
        return new Promise(async (resolve, reject) => {
            let params = {};
            if(engine==='Bing') {
                params = {
                    q: keyword,
                    page: page || 1,
                    engine: engine,
                    country_code: 'US'
                }
            } else {
                 params = {
                    q: keyword,
                    page: page || 1,
                    gl: 'us',
                    hl: 'en',
                    location: 'United States',
                    google_domain: 'google.com'
                }

            }
            serpwow.json(params)
            .then(result => {
                return resolve(result.organic_results);
            })
            .catch(error => {
                console.log('serpwow catch');
                return this.getResponseFromBingAPI(keyword);
                // return reject(error);
            });
        });
    }

     getResponseFromBingAPI(keyword) {
        console.log('getting results from bing api');
        keyword = keyword.replace(' ', '%20');

        let options = {
            url: process.env.BING_ENDPOINT + '?q=' + keyword + '&customconfig='+ process.env.BING_CUSTOM_CONFIG_ID + '&mkt=en-US',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
            }
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let result = JSON.parse(body);
                console.log(result.webPages.value);
            }
        });
    }
};



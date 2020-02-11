const SerpWow = require('google-search-results-serpwow');
const serpwow = new SerpWow(process.env.SURP_API_KEY || 'E5E8DCD07B864C8CBA7F728B0F53F388');
const util = require('util');
const Bing = require('node-bing-api') ({
    accKey: process.env.BING_API_KEY,
    rootUri: process.env.BING_ENDPOINT,
});

// const Bing = require('node-bing-api')({ accKey: process.env.BING_API_KEY });
const fetch = require('node-fetch');


exports = module.exports = class SearchService {
    async search(keyword, engine, page){
        let data = {};
        let res = await this.serpwowSearch(keyword, engine, page); //working fine
        // console.log('serpwow res', res);
        if(res) data.organic_results = res.organic_results;

        else {
            // console.log('in else');
            res = await this.getResponseFromBingAPI(keyword, page);
            // console.log('bing res', res);
            if(!res) return('some error has occured');
            else {
                data.organic_results = res.webPages.value;
                data.organic_results.forEach((el)=>{
                    el.title = el.name;
                    el.link = el.url;
                })
            }
        }
        return data;
    }

    serpwowSearch(keyword, engine, page) {
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
                return resolve(result);
            })
            .catch(error => {
                // console.log('error', error);
                return {};
            })
        }

    async getResponseFromBingAPI(keyword,page) {
        // console.log('inside bing');
        try {
            let url = process.env.BING_ENDPOINT + '?q=' + keyword + '&customconfig='+ process.env.BING_CUSTOM_CONFIG_ID + '&mkt=en-US';
            const response = await fetch(url, {headers:{
                    'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
                }});
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

};



const SerpWow = require('google-search-results-serpwow');
const serpwow = new SerpWow(process.env.SURP_API_KEY || 'E5E8DCD07B864C8CBA7F728B0F53F388');
const fetch = require('node-fetch');


exports = module.exports = class SearchService {
    async search(keyword, engine, page){
        let data = {};
        let res = await this.serpwowSearch(keyword, engine, page); //not working fine
        console.log('serpwow res', res);
        // console.log('/n/n/n/n/n');
        if(res){
            data.organic_results = res.organic_results;
            data.social = {
                tweets : [],
            };
            if(res.inline_tweets) {
                res.inline_tweets.forEach((el) => {
                    data.social.tweets.push(el.link.split('/').pop());
                })
            }
        }
        else {
            console.log('in else');
            res = await this.getResponseFromBingAPI(keyword, page); //working fine
            console.log('bing res', res);
            if(!res) return('some error has occured');
            else {
                data.organic_results = res.webPages.value;
                data.organic_results.forEach((el)=>{
                    el.title = el.name;
                    el.link = el.url;
                    el.position = el.id;
                })
            }
        }
        console.log('data',res);
        data.currPage = page;
        return data;
    }

    async serpwowSearch(keyword, engine, page) {
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
                    return resolve(result);
                })
                .catch(error => {
                    console.log('serpwow catch');
                    return reject();

                });
        });
     }

    async getResponseFromBingAPI(keyword,page= 1) {
        // console.log('inside bing');

        const COUNT = 9;
        const OFFSET = (page-1)*COUNT;
        try {
            let url = process.env.BING_ENDPOINT + '?q=' + keyword + '&customconfig='+ process.env.BING_CUSTOM_CONFIG_ID + "&count=" + COUNT + "&offset=" + OFFSET + '&mkt=en-US';
            const response = await fetch(url, {headers:{
                    'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
                }});
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

};



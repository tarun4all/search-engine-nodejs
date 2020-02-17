const SerpWow = require('google-search-results-serpwow');
const serpwow = new SerpWow(process.env.SERPWOW_API_Key);
const fetch = require('node-fetch');
// const SEARCH_COUNT = 15;


exports = module.exports = class SearchService {
    async search(keyword, engine, page){
        let data = {};
        let res = await this.serpwowSearch(keyword, engine, page); //not working
        // console.log('serpwow res', res);
        if(res){
            data.organic_results = [];
            res.organic_results.forEach((el)=>{
                let temp = {};
                temp.position  = el.position;
                temp.title = el.title;
                temp.link = el.link;
                temp.snippet = el.snippet;
                data.organic_results.push(temp);
            });

            data.social = {
                tweets : [],
            };
            if(res.inline_tweets) {
                res.inline_tweets.forEach((el) => {
                    console.log('tweets',el);
                    if(el.link.match(/(\d)$/gms))
                    data.social.tweets.push(el.link.split('/').pop());
                })
            }
        }
        else {
            console.log('in else');
            res = await this.getResponseFromBingAPI(keyword, page); //working fine
            // console.log('bing res', res.webPages.value);
            if(!res) return('some error has occured');
            else {
                data.organic_results = [];
                res.webPages.value.forEach((el)=>{
                    let temp = {};
                    temp.title = el.name;
                    temp.link = el.url;
                    temp.position = el.id;
                    temp.snippet = el.snippet;
                    data.organic_results.push(temp);
                })
            }
        }
        console.log('data',data);
        // data.currPage = page;
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
                    country_code: 'US',
                    // num: SEARCH_COUNT,
                }
            } else {
                params = {
                    q: keyword,
                    page: page || 1,
                    // num: SEARCH_COUNT,
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
                    console.log('serpwow catch', error);
                    return resolve();

                });
        });
    }

    async getResponseFromBingAPI(keyword,page= 1) {
        // console.log('keyword ', keyword, ' page', page);
        const OFFSET = (page-1)*SEARCH_COUNT;
        try {
            let url = process.env.BING_ENDPOINT + '?q=' + keyword  + "&count=" + SEARCH_COUNT + "&offset=" + OFFSET + '&mkt=en-US';
            const response = await fetch(url, {headers:{
                    'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
                }});
            return await response.json();
        } catch (error) {
            console.log(error);
        }

    };

};



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
            // console.log('res',res);
            if(res.organic_results) {
                data.organic_results = [];
                res.organic_results.forEach((el) => {
                    if(el.type==="organic_results") {
                        let temp = {};
                        temp.position = el.position;
                        temp.title = el.title;
                        temp.domain = el.domain;
                        temp.link = el.link;
                        temp.snippet = el.snippet;
                        data.organic_results.push(temp);
                    }
                });
            }
            if(res.ads) {
                data.adv = [];
                res.ads.forEach((el) => {
                    let temp = {};
                    temp.position = el.position;
                    temp.title = el.title;
                    temp.domain = el.domain;
                    temp.link = el.tracking_link;
                    temp.snippet = el.description;
                    data.adv.push(temp);
                });
            }
            else if(process.env.ENVIRONMENT == "dev"){
                data.adv = [];
                let temp = {};
                temp.position = 1;
                temp.title = "Hot Promo Pizza Hut Delivery | Harga Spesial Pesan Online‎";
                temp.link="https://www.google.com/aclk?sa=l&ai=DChcSEwikioTlqPHnAhXHFI8KHXVyC7YYABAAGgJzYg&ae=1&sig=AOD64_0qaaPE-v3TF1-eRlYKcqtCTptxaQ&q=&ved=2ahUKEwjKk_7kqPHnAhWHT30KHdbxCW4Q0Qx6BAgQEAE&adurl=https://www.phd.co.id/en/pizza%3Fgclid%3DEAIaIQobChMIpIqE5ajx5wIVxxSPCh11cgu2EAAYASAAEgJ6P_D_BwE"
                temp.snippet = "demo description lorem ipsum";
                temp.domain = "www.phd.co.id";
                data.adv.push(temp);
            }

            if(res.related_searches) {
                // console.log('realted Search');
                data.related_searches = [];
                res.related_searches.forEach((el) => {
                    let temp = {};
                    temp.query = el.query;
                    data.related_searches.push(temp);
                });
            }
            data.social = {
                tweets : [],
            };
            if(process.env.ENVIRONMENT == "dev")
                data.social.tweets.push('1230220512896270336');

            else{
                if(res.inline_tweets) {
                    res.inline_tweets.forEach((el) => {
                        console.log('tweets',el);
                        if(el.link.match(/(\d)$/gms))
                        data.social.tweets.push(el.link.split('/').pop());
                    })
                }
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
        console.log('related Search',data.related_searches);
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
                    gl: 'us',
                    flatten_results: 'true',
                    device: 'desktop',
                    hl: 'en',
                    google_domain: 'google.com',
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



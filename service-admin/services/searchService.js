const SerpWow = require('google-search-results-serpwow');
const serpwow = new SerpWow(process.env.SERPWOW_API_Key);
const fetch = require('node-fetch');
const SEARCH_COUNT = 9;


exports = module.exports = class SearchService {
    async search(keyword, engine, page){
        let data = {};
        // let res1 = await this.serpwowSearch(keyword, engine, page); //not working
        // let res2 = await this.serpwowSearch(keyword, engine, page); //not working
        let response = await Promise.all([this.serpwowSearch(keyword, 'google', page),this.serpwowSearch(keyword, 'Bing')]).catch((err)=>{
            console.error(err);
        });
        // console.log('serpwow res', response[1]);
        if(response[0]){
            // console.log('res',res);
            if(response[0].organic_results) {
                data.organic_results = [];
                response[0].organic_results.forEach((el) => {
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
            if(response[1].ads) {
                data.adv = [];
                // console.log('ads', response[1].ads);
                response[1].ads.forEach((el) => {
                    let temp = {};
                    if(el.block_position==='bottom') {
                        temp.position = el.position;
                        temp.title = el.title;
                        temp.domain = el.displayed_link;
                        temp.link = el.tracking_link;
                        temp.snippet = el.description;
                        data.adv.push(temp);
                    }
                });
            }

            if(response[0].related_searches) {
                // console.log('realted Search');
                data.related_searches = [];
                response[0].related_searches.forEach((el) => {
                    let temp = {};
                    temp.query = el.query;
                    data.related_searches.push(temp);
                });
            }
            data.social = {
                tweets : [],
            };

            if(response[0].inline_tweets) {
                response[0].inline_tweets.forEach((el) => {
                    console.log('tweets',el.status_link.split('/').pop());
                    if(el.status_link.match(/(\d)$/gms))
                    data.social.tweets.push(el.status_link.split('/').pop());
                })
            }
        }
        else {
            console.log('in else');
            let res = await this.getResponseFromBingAPI(keyword, page); //working fine
            // console.log('bing res', res.webPages);
            if(!res) return('some error has occured');
            else {
                data.organic_results = [];
                res.webPages.value.forEach((el)=>{
                    // console.log('here');
                    // console.log(el);
                    let temp = {};
                    temp.title = el.name;
                    temp.link = el.url;
                    temp.domain = el.displayUrl;
                    temp.position = el.id;
                    temp.snippet = el.snippet;
                    data.organic_results.push(temp);
                })
            }
        }
        // console.log('related Search',data.social);
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
                    engine: 'bing',
                    country_code: 'US'
                }
            } else {
                params = {
                    q: keyword,
                    page: page || 1,
                    gl: 'us',
                    hl: 'en',
                    google_domain: 'google.com',
                    flatten_results: 'true',
                    device: 'desktop',
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



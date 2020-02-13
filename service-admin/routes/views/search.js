module.exports = async (req, res) => {
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1));
    else res.redirect('/');
};

async function getSearchResult(keyword, engine, page){
    // console.log('hi');
    // console.log('ser',services.searchService);
    let data = await services.searchService.search(keyword,engine,page).catch((err) => {console.log("error occures")});
    // let data = [];
    // let adv = await services.advCampaignService.getAdvCampaign('test').catch((err)=> {console.log(err);});
    // if(adv) data.push(adv);
    // let data = [];
    // data.unshift({keyword:keyword});
    // console.log('data sent',data);
    return data;
}

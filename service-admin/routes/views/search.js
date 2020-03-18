module.exports = async (req, res) => {
    // res.setCookie('abc','abc')
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1, req.isAllowed));
    else res.redirect('/');
};

async function getSearchResult(keyword, engine, page, isAllowed){
    // console.log('hi');
    // console.log('ser',services.searchService);
    let data = await services.searchService.search(keyword,engine,page).catch((err) => {
        console.log('error', err);
        return new Error('error occured')});
    // let data = {};
    if(isAllowed) {
        console.log('is allowed', isAllowed);
        data.phoneNumber           = await services.customSearchService.getResults('Adv', keyword).catch((err) => {console.log(err)});
        data.custom_search_results = await services.customSearchService.getResults('CustomSearchResult', keyword).catch((err) => {console.log(err)});
    }

    // console.log(data);
    return data;
}

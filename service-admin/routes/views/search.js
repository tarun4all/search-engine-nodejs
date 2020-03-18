module.exports = async (req, res) => {
    // res.setCookie('abc','abc')
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1, req.isAllowed));
    else res.redirect('/');
};

async function getSearchResult(keyword, engine, page, isAllowed){
    // console.log('is allowed', isAllowed);
    let result = await Promise.all([services.searchService.search(keyword,engine,page), services.customSearchService.getResults('Adv', keyword, isAllowed), services.customSearchService.getResults('CustomSearchResult', keyword, isAllowed)])
        .catch((err) => {
        console.log('error', err);
        return new Error('error occured')});

    result[0].phoneNumber           = result[1];
    result[0].custom_search_results = result[2];


    // console.log(data);
    return result[0];
}

const keystone = require('keystone');

module.exports = async (req, res) => {
    // res.setCookie('abc','abc')
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1, req.isAllowed));
    else res.redirect('/');

    if(req.query.isNew!=='false'){
        addIPAddressToDB(req.clientIp);
    }
};

async function getSearchResult(keyword, engine, page, isAllowed){
    // console.log('is allowed', isAllowed);

    let result = await Promise.all([services.searchService.search(keyword, engine, page), services.customSearchService.getResults('Adv', keyword, isAllowed, page), services.customSearchService.getResults('CustomSearchResult', keyword, isAllowed, page)])
        .catch((err) => {
        console.log('error', err);
        return new Error('error occurred')});

    result[0].phoneNumber           = result[1];
    result[0].custom_search_results = result[2];

    // console.log(data);
    return result[0];
}

async function addIPAddressToDB(IP) {
    let Incoming_IP = keystone.list('Incoming_IP').model;
    console.log('new ip',IP);

    let incomingIp = new Incoming_IP({
        IP: IP,
    });
    await incomingIp.save();
}

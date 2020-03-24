const keystone = require('keystone');
const Incoming_IP = keystone.list('Incoming_IP').model;

module.exports = async (req, res) => {
    // res.setCookie('abc','abc')
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1, req.isAllowed, req.clientIp));
    else res.redirect('/');

    if(req.query.isNew!=='false'){
        addIPAddressToDB(req.clientIp);
    }
};

async function getSearchResult(keyword, engine, page, isAllowed, ip){
    console.log('is allowed', isAllowed);
    let result   = {};
    let isCached = await checkIfCached(keyword);

    if(isCached) {
        result = isCached;
        return result[0];
    }

    else {
        result = await Promise.all([services.searchService.search(keyword, engine, page), services.customSearchService.getResults('Adv', keyword, isAllowed, page), services.customSearchService.getResults('CustomSearchResult', keyword, isAllowed, page)])
            .catch((err) => {
                console.log('error', err);
                return new Error('error occurred')
            });


        let alreadyVisited = false;
        alreadyVisited = await Incoming_IP.findOne({IP: ip}).catch(err => {
            console.log(err)
        });

        if (!alreadyVisited)
            result[0].phoneNumber = result[1];
        result[0].custom_search_results = result[2];

        return result[0];
    }
}

async function addIPAddressToDB(IP) {
    incomingIp = await Incoming_IP.findOne({IP: IP}).catch(err => {console.log(err)});

    if(!incomingIp){

        let incomingIp = new Incoming_IP({
            IP: IP,
            TotalSessions: 1,
        });
        await incomingIp.save();
    }
    console.log('inc ip', IP);
    Incoming_IP.findOne({ IP:IP },function (err, doc) {
        if(err) throw err;

        doc.TotalSessions += 1;
        doc.save((err) => console.log('err',err))
    });

}

async function checkIfCached(keyword){
    // console.log('check if cached', keyword);
    let result = await services.customSearchService.getResults('CachedResult', keyword, true, '1');

    if(result) {
        return JSON.parse(result);
    }
    else return false;
}

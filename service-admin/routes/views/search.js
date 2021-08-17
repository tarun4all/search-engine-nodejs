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

    if(isCached && isCached.length>page) {
        console.log('page', page-1);
        console.log('isCached ',isCached[page-1]);
        data = await Promise.all([services.customSearchService.getResults('Adv', keyword, isAllowed, page), services.customSearchService.getResults('CustomSearchResult', keyword, isAllowed, page)])
        result = {};
        result[0]=isCached[page-1];
        result[1]=data[0];
        result[2]=data[1];
    }

    else {
        result = await Promise.all([services.searchService.search(keyword, engine, page), services.customSearchService.getResults('Adv', keyword, isAllowed, page), services.customSearchService.getResults('CustomSearchResult', keyword, isAllowed, page)])
            .catch((err) => {
                console.log('error', err);
                return new Error('error occurred')
            });

        }
    let alreadyVisited = false;
    alreadyVisited = await Incoming_IP.findOne({IP: ip}).catch(err => {
        console.log(err)
    });

    if (!alreadyVisited || alreadyVisited.TotalSessions<=1)
        result[0].phoneNumber = result[1];
    result[0].custom_search_results = result[2];
    
    // console.log('result', result[0]);
    return result[0];
    
}

async function addIPAddressToDB(IP) {
    incomingIp = await Incoming_IP.findOne({IP: IP}).catch(err => {console.log(err)});

    Incoming_IP.findOne({ IP:IP },function (err, doc) {
        if(err) throw err;

        doc.TotalSessions += 1;
        doc.save((err) => {
            if(err) console.log('err',err)
        })
    });

    if(!incomingIp){

        let incomingIp = new Incoming_IP({
            IP: IP,
            TotalSessions: 1,
        });
        await incomingIp.save();
    }
    console.log('inc ip', IP);
    

}

async function checkIfCached(keyword){
    // console.log('check if cached', keyword);
    let result = await services.customSearchService.getResults('CachedResult', keyword, true, '1');

    if(result) {
        return JSON.parse(result);
    }
    else return false;
}

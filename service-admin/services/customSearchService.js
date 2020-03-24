const keystone = require('keystone');
// const Adv = keystone.list('Adv').model;


exports = module.exports = class CustomResults {
    async getResults(colName, keyword, isAllowed, page) {
        if(!isAllowed || page!=='1') return;
        const Model = keystone.list(colName).model;

        console.log(colName, keyword);
        keyword = keyword.split(' ');
        let arr = [];
        let temp = {};
        for (let el in keyword) {
            let results = await Model.find({tags: {$regex: new RegExp("^" + keyword[el], "i")}}).catch((err)=>{console.log(err)});
            // console.log('results', results);
            if (results) {
                if(colName === 'CachedResult')
                {
                    return results[0].Result;
                }
                for (let res in results)
                {
                    if(colName === 'Adv') {
                        temp.id       = results[res]._id;
                        temp.title    = results[res].title;
                        temp.subTitle = results[res].subTitle;
                        temp.number   = results[res].phoneNumber;
                    } else {
                        temp.position = results[res]._id;
                        temp.title    = results[res].title;
                        temp.domain   = results[res].domain ? results[res].domain : results[res].link;
                        temp.link     = results[res].link;
                        temp.snippet  = results[res].description;
                        arr.push(temp);
                        temp = {};
                    }
                }

            }
        }
        if(colName === 'Adv') {
            if(Object.keys(temp).length === 0 && temp.constructor === Object) return;
            return temp;
        }

        if(arr.length<1) return;
        return arr;

    }
};

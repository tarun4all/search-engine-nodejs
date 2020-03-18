const keystone = require('keystone');
// const Adv = keystone.list('Adv').model;


exports = module.exports = class CustomResults {
    async getResults(colName,keyword) {
        const Model = keystone.list(colName).model;

        console.log(colName, keyword);
        keyword = keyword.split(' ');
        let arr = [];
        for (let el in keyword) {
            console.log('keyword', keyword[el]);
            let results = await Model.find({tags: {$regex: new RegExp("^" + keyword[el], "i")}}).catch((err)=>{console.log(err)});
            if (results) {
                for (let res in results)
                {
                    let temp = {};

                    if(colName === 'Adv') {
                        let temp      = {};
                        temp.id       = results[res]._id;
                        temp.title    = results[res].title;
                        temp.subTitle = results[res].subTitle;
                        temp.number   = results[res].phoneNumber;
                        return temp;
                    } else {
                        temp.position = results[res]._id;
                        temp.title    = results[res].title;
                        temp.domain   = results[res].domain ? results[res].domain : results[res].link;
                        temp.link     = results[res].link;
                        temp.snippet  = results[res].description;
                        arr.push(temp);
                    }
                }
                console.log('arr', arr);
                if(arr.length<1) return;
                return arr;
            }
        }

    }
};

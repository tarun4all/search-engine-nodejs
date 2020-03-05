const keystone = require('keystone');
const Adv = keystone.list('Adv').model;


exports = module.exports = class AdvCampaignService {
    async getAdvCampaign(keyword) {
        console.log('phone number', keyword);
        keyword = keyword.split(' ');
        let arr = [];
        for (let el in keyword) {
            console.log('el ',keyword[el]);
            let searchResults = await Adv.find({tags: {$regex: keyword[el]}});
            console.log('phone number search', searchResults);
            if (searchResults) {
                console.log('found the result');
                for (let res in searchResults)
                {
                    console.log(searchResults[res]);
                    let temp = {};
                    temp.id = searchResults[res]._id;
                    temp.title = searchResults[res].title;
                    temp.subTitle = searchResults[res].subTitle;
                    temp.number = searchResults[res].phoneNumber;

                    return temp;
                }
            }
        }

    }
};

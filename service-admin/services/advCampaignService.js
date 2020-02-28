const keystone = require('keystone');
const Adv = keystone.list('Adv').model;


exports = module.exports = class AdvCampaignService {
    async getAdvCampaign(keyword) {
        keyword = new RegExp("^" + keyword , "i");
        // console.log('function called with ', keyword);
        this.advCampaign = await Adv.findOne({tags: { $regex: keyword }});

        if (this.advCampaign) {
            console.log('found the adv');
            let adv = {
                id: this.advCampaign._id,
                title: this.advCampaign.title,
                number: this.advCampaign.phoneNumber,
            };
            return adv;
        } else return null;
    }
};

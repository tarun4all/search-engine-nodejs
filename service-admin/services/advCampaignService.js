const keystone = require('keystone');
const Adv = keystone.list('Adv').model;


exports = module.exports = class AdvCampaignService {
    async getAdvCampaign(keyword) {
        this.advCampaign = await Adv.findOne({Tags: keyword});

        if (this.advCampaign) {
            let adv = {

                id: this.advCampaign._id,
                number: this.advCampaign.Number,
            };
            return adv;
        } else return null;
    }
};

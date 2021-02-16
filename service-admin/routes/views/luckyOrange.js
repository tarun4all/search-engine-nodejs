const keystone = require('keystone');
const Config = keystone.list('Config').model;


module.exports = async (req, res) => {
    let config = await Config.findOne().catch(err => {console.log(err)});
    console.log('config',config._doc)
    if(config) res.status(200).json({id:config._doc.LUKCY_ORANGE_ID});
    else res.send(400)
};
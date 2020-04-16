const keystone = require('keystone');
const Types = keystone.Field.Types;

const Config = new keystone.List('Config',{
    track:true,
    nocreate:true,
});

Config.add({
    GEO_LOCATION_API_Key : {type: String, required: true, index: true, initial: true},
    SERPWOW_API_Key      : {type: String, required: true, index: true, initial: true},
    EMAIL_ID             : {type: String, required: true, index: true, initial: true},
    BING_ENDPOINT        : {type: String, required: true, index: true, initial: true},
    BING_API_KEY         : {type: String, required: true, index: true, initial: true},
});

Config.defaultColumns = 'GEO_LOCATION_API_Key, SERPWOW_API_Key, EMAIL_ID, BING_ENDPOINT, BING_API_KEY';
Config.register();

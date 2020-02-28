const keystone = require('keystone');


const Adv = new keystone.List('Adv');

Adv.add({
    phoneNumber : { type:String, required: true, initial: true },
    title: {type:String, required:true, initial:true },
    tags: { type:String, required: false, initial: true, index: true },

});

Adv.defaultColumns = 'phoneNumber, tags';
Adv.register();

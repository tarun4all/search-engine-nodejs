const keystone = require('keystone');
const Types = keystone.Field.Types;


const Adv = new keystone.List('Adv');

Adv.add({
    phoneNumber : { type:String, required: true, initial: true },
    title: {type:String, required:true, initial:true },
    tags: { type:Types.TextArray, required: false, initial: true, index: true },
});

Adv.defaultColumns = 'phoneNumber, tags';
Adv.register();

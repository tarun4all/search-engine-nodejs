const keystone = require('keystone');
const Types = keystone.Field.Types;

const Adv = new keystone.List('Adv');

Adv.add({
    Number : { type:String, required: true, index: true, initial: true },
    Tags: { type:Types.TextArray, required: false, initial: false, index: true },

});

Adv.defaultColumns = 'Number';
Adv.register();

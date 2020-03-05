const keystone = require('keystone');
const Types = keystone.Field.Types;

const CustomSearchResult = new keystone.List('CustomSearchResult');

CustomSearchResult.add({
    title: {type:String, required:true, initial:true },
    description:{type :Types.Textarea, required:true, initial:true},
    link: {type:Types.Url, required:true, initial:true},
    domain: {type:Types.Url},
    tags: { type:Types.TextArray, required:true, initial: true, index: true },

});

CustomSearchResult.defaultColumns = 'title,description,link,tags';
CustomSearchResult.register();

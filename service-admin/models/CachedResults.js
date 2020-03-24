const keystone = require('keystone');
const Types = keystone.Field.Types;

const CachedResult = new keystone.List('CachedResult',{
    track:true,
});

CachedResult.add({
    Title:  { type: String, index:true, required:true, initial:true,},
    tags:   { type: Types.TextArray, index:true, required:true, initial:true,},
    Result: { type: String, required: false, initial:false },
});

CachedResult.defaultColumns = 'Title, tags';
CachedResult.register();

CachedResult.model.schema.pre('save', async function (next) {
    console.log('inside', this.Title);
    let result = await Promise.all([services.searchService.search(this.Title, 'google', "1"), services.customSearchService.getResults('Adv', this.Title, true, "1"), services.customSearchService.getResults('CustomSearchResult', this.Title, true, "1")])
    this.Result = JSON.stringify(result);
    next();
});


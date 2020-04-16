const keystone = require('keystone');
const Types = keystone.Field.Types;
const TOTALPAGE = 5;

const CachedResult = new keystone.List('CachedResult',{
    track:true,
});

CachedResult.add({
    Title:     { type: String, index:true, required:true, initial:true,},
    tags:      { type: Types.TextArray, index:true, required:true, initial:true,},
    Result:    { type: String, required: false, initial:false },
    TotalPage: {type:Number, required:false, initial:false }
});

CachedResult.defaultColumns = 'Title, tags';
CachedResult.register();



CachedResult.model.schema.pre('save', async function (next) {
    this.Result =  "";
    if(!this.TotalPage) this.TotalPage  = TOTALPAGE;
    // console.log('inside', this.Title);
    let search_result = [];
    for(let i=1;i<=this.TotalPage;i++)
    {
        let result = await services.searchService.search(this.Title, 'google', i);
        search_result.push(result);
    }
    this.Result = JSON.stringify(search_result);
    next();
});


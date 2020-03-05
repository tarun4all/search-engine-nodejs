const keystone = require('keystone');
const customResult = keystone.list('CustomSearchResult').model;

exports = module.exports = class customSearchService{
    async getCustomSearchResult(keyword) {
        console.log('custom', keyword);
        keyword = keyword.split(' ');
        let arr = [];
        for (let el in keyword) {
            console.log('el ',keyword[el]);
            let searchResults = await customResult.find({tags: {$regex: keyword[el]}});

            if (searchResults) {
                console.log('found the result');
                for (let res in searchResults)
                {
                    let temp = {};
                    // console.log('search Result ',searchResults[res]);
                    temp.title = searchResults[res].title;
                    temp.snippet = searchResults[res].description;
                    temp.link = searchResults[res].link;
                    if(searchResults[res].domain)
                        temp.domain = searchResults[res].domain;
                    else
                        temp.domain = searchResults[res].link;

                    arr.push(temp);
                    if(res>=3) break;
                }
            }
        }
        return arr;
    }
};

const SerpWow = require('google-search-results-serpwow');
let serpwow = new SerpWow(process.env.SURP_API_KEY || 'E5E8DCD07B864C8CBA7F728B0F53F388');

exports = module.exports = class SearchService {
    search(keyword, engine, page) {
        return new Promise(async (resolve, reject) => {
            let params = {
                q: keyword,
                page: page || 1,
            }
    
            if(engine) params.engine = engine;
          
            serpwow.json(params)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
        });
    }
};

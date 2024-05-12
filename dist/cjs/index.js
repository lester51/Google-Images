var axios = require('axios');
var cheerio = require('cheerio');
var flatten = require('lodash.flatten');
module.exports.searchImage = function (query) {
    query = query.replace(/\s+/g, '+');
    return new Promise(function (res, rej) {
        axios.get("https://google.com/search?tbm=isch&q=".concat(query), {
            headers: {
                'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
            }
        }).then(function (a) {
            var $ = cheerio.load(a.data);
            var scripts = $('script');
            var contents = [];
            for (i = 0; i < scripts.length; ++i) {
                if (scripts[i].children.length > 0) {
                    var content = scripts[i].children[0].data;
                    contents.push(content);
                }
            }
            var results = function (content) {
                var refs = [];
                var re = /\["(http.+?)",(\d+),(\d+)\]/g;
                var result;
                while ((result = re.exec(content)) !== null) {
                    if (result.length > 3) {
                        var ref = {
                            url: result[1]
                        };
                        if (!ref.url.includes('gstatic')) {
                            refs.push(ref);
                        }
                    }
                }
                return refs;
            };
            return res(flatten(contents.map(results)));
        }).catch(function (e) {
            rej();
        });
    });
};
//# sourceMappingURL=index.js.map
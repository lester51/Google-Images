const axios = require('axios');
const cheerio = require('cheerio');
const flatten = require('lodash.flatten');

module.exports.searchImage = (query) => {
    query = query.replace(/\s+/g,'+');
	return new Promise((res, rej) => {
		axios.get(`https://google.com/search?tbm=isch&q=${query}`, {
			headers: {
				'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
			}
		}).then(a => {
			let $ = cheerio.load(a.data)
			let scripts = $('script')
			let contents = []
			for (i = 0; i < scripts.length; ++i) {
				if (scripts[i].children.length > 0) {
					let content = scripts[i].children[0].data
					contents.push(content)
				}
			}
			let results = (content) => {
				let refs = []
				let re = /\["(http.+?)",(\d+),(\d+)\]/g
				let result
				while ((result = re.exec(content)) !== null) {
					if (result.length > 3) {
						let ref = {
							url: result[1]
						}
						if (!ref.url.includes('gstatic')) {
							refs.push(ref)
						}
					}
				}
				return refs
			};
			return res(flatten(contents.map(results)));
		}).catch((e) => {
		    rej()
		});
	});
}

//export default searchImage;
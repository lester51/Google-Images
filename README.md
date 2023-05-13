# GOOGLE IMAGE SCRAPER

A simple google images scraper without using google cse. For downloading images you can use http/https api or other npm libs. like request etc.

# HOW TO INSTALL?
```
npm i google-imgs
```

# Require to export function
```js
//CommonJS
const google = require("google-imgs");
```

## SIMPLE USAGE
### gives us a limit of 100 image links (un-filtered) maybe some are bad image links like need auth or broken links.
```js
const google = require("google-imgs");

//searchImage param. is string
let result = await google.searchImage(<String>)

console.log(result)
```

### filtering the result image links only get the working ones
## METHOD 1: Promise.all()
```js
const google = require("google-imgs");

//searchImage param. is string
let result = await google.searchImage(<String>)

//first method using promise all
let workingUrls = [], i = 0;
await Promise.all(result.map(async url =>{
	await axios.get(url).then(r=>{
	    if (r.status === 200){
	        workingUrls.push({imgUrl: url})
	    }
	}).catch(e=>{})
	i++
}))

//filtered, all urls are surely working
console.log(workingUrls)
```

## METHOD 2: limiting working urls (faster)
```js
const google = require("google-imgs");

//searchImage param. is string
let result = await google.searchImage(<String>)

//2nd method limiting the working urls - in this example if workingUrls length reach 6 it will stop loop and logs the 6 working urls
let workingUrls = [], i = 0;
while (workingUrls.length < 6) {
    await axios.get(urls).then(r=>{
	    if (r.status === 200){
	        workingUrls.push({imgUrl: urls})
	    }
	}).catch(e=>{})
    i++
}

//filtered, all urls are surely working
console.log(workingUrls)
```
const rp = require("request-promise");
const $ = require("cheerio");
const recipeParse = require("./recipeParse");
const url = "https://www.skinnytaste.com/recipes/vegetarian/";

rp(url)
    .then(function(html) {
        const recipeUrls = [];
        for (let i = 0; i < 17; i++) {
            recipeUrls.push($(".archive-post > a", html)[i].attribs.href);
        }
        return Promise.all(
            recipeUrls.map(function(url) {
                return recipeParse(url);
            })
        );
    })
    .then(function(recipes) {
        console.log(recipes);
    })
    .catch(function(err) {
        //handle error
        console.log(err);
    });

//reference: https://medium.freecodecamp.org/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3
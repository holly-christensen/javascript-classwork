const rp = require("request-promise");
const $ = require("cheerio");

const recipeParse = function(url) {
    return rp(url)
        .then(function(html) {
            return {
                name: $("div[class=post-title] > h1", html).text(),
                list: parse($("li[class=ingredient]", html).text()),
                link: url
            };
        })
        .catch(function(err) {
            //handle error
        });
};

module.exports = recipeParse;

function stringToList(str) {
    var list = str.split(",,");
    return list;
}

function parse(str) {
    var newList = [];
    var marker = 0;
    for (let i = 0; i < str.length; i++) {
        if (
            str[i] === "1" ||
            str[i] === "2" ||
            str[i] === "3" ||
            str[i] === "4" ||
            str[i] === "5" ||
            str[i] === "6" ||
            str[i] === "7" ||
            str[i] === "8" ||
            str[i] === "9" ||
            str[i] === "0"
        ) {
            newList.push(str.substring(marker, i));
            marker = i;
        }
    }
    newList = cleanUpList(newList);
    return newList;
}

function cleanUpList(list) {
    var newList = [];
    for (let i = 0; i < list.length; i++) {
        if (
            list[i].length > 4 &&
            list[i].lastIndexOf(" ") != list[i].length - 1 &&
            list[i].lastIndexOf("(") != list[i].length - 1 &&
            list[i].lastIndexOf(")") != list[i].length - 1
        ) {
            newList.push(list[i]);
        }

        return newList.toLowerCase();
    }
}

function leftovers(str) {
    return (
        str.includes("1/") ||
        str.includes("2/") ||
        str.includes("3/") ||
        lstr.includes("4/") ||
        str.includes("5/") ||
        str.includes("6/") ||
        str.includes("7/") ||
        str.includes("8/") ||
        str.includes("9/")
    );
}
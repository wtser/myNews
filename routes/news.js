var express = require('express');
var router = express.Router();
var fetchUrl = require("fetch").fetchUrl;

var $ = require("jquery")(require("jsdom").jsdom().defaultView);

function parseHtml2ArticleList(feed, articleNodes) {


    callback = {
        compatible: function () {
            var article, baseUrl, i, item, parsedData = [];
            if (articleNodes.length > 0) {
                i = 0;
                while (i < articleNodes.length) {
                    item = articleNodes[i];
                    article = {
                        title: item.textContent.replace(/^\<img[\s\S]+\>/, "").trim(),
                        href: item.attributes.href.nodeValue
                    };
                    if (article.href.indexOf('http') === -1) {
                        baseUrl = feed.url.match(/http[s]?:\/\/+[\s\S]+?\//)[0].slice(0, -1);
                        if (article.href[0] !== '/') {
                            baseUrl += '/';
                        }
                        article.href = baseUrl + article.href;
                    }
                    parsedData.push(article);
                    i++;
                }
                return parsedData;
            }
        },
        html: function () {
            var article, baseUrl, i, item, parsedData = [];

            var getText = function (node, selector) {
                var dom = node.querySelector(selector)
                if (dom && (dom = dom.textContent.trim())) {
                    return dom
                } else {
                    return ''
                }

            }
            var getHref = function (node, selector) {
                var dom = node.querySelector(selector)
                if (dom && (dom = dom.getAttribute('href'))) {
                    if (dom.indexOf('http') === -1) {
                        if (dom[0] != '/') {
                            var linkArr = feed.url.split('/')
                            linkArr.pop();
                            linkArr.push(dom)
                            dom = linkArr.join('/')
                        } else if (dom[1] != '/') {
                            dom = feed.domain + dom
                        } else {
                            dom = 'http:' + dom
                        }

                    }
                    return dom
                } else {
                    return ''
                }

            }

            if (articleNodes.length > 0) {
                i = 0;
                while (i < articleNodes.length) {
                    item = articleNodes[i];
                    article = {
                        title: getText(item,feed.selector.title),
                        href: getHref(item,feed.selector.href)
                    };
                    parsedData.push(article);
                    i++;
                }
                return parsedData;
            }
        },
        ajax: function () {
            var data = JSON.parse(articleNodes);
            var parsedData = data[feed.selector.item].map(function (a) {
                var baseUrl;
                if (a[feed.selector.href].indexOf('http') === -1) {
                    baseUrl = feed.url.match(/http[s]?:\/\/+[\s\S]+/)[0].slice(0, -1);
                    if (a[feed.selector.href][0] !== '/') {
                        baseUrl += '/';
                    }
                    if (a[feed.selector.href][1] === "/") {
                        baseUrl = 'http:';
                    }
                    a[feed.selector.href] = baseUrl + a[feed.selector.href];
                }
                return {
                    title: a[feed.selector.title].trim(),
                    href: a[feed.selector.href]
                };
            });
            return parsedData;
        }
    };
    return callback[feed.type]()

}
function parseNextPage(feed, nextUrl) {
    if (feed.type == "html") {
        if (nextUrl.indexOf('http') === -1) {
            var baseUrl = feed.url.match(/http[s]?:\/\/+[\s\S]+?\//)[0].slice(0, -1);
            if (nextUrl[0] !== '/') {
                baseUrl += '/';
            }
            nextUrl = baseUrl + nextUrl;
        }
    }
    return nextUrl

}

/* GET news . */
router.post('/', function (req, res, next) {
    var obj = req.body.feed;
    var feed = JSON.parse(obj);

    feed.domain = feed.url.split('/');
    feed.domain = feed.domain[0] + '//' + feed.domain[2];

    var url = feed.nextUrl || feed.url;

    fetchUrl(url, function (error, meta, body) {
        body = body || '';
        var html = body.toString();
        var articleList = $(html).find(feed.selector.item || feed.selector);
        if (feed.type == 'ajax') {
            articleList = html
        }

        // 获得下一页链接
        if (feed.selector.hasOwnProperty('next')) {
            var nextPage = $(html).find(feed.selector.next);
            if (nextPage.length) {
                nextPage = nextPage.attr("href")
                nextPage = parseNextPage(feed, nextPage)
                feed.nextUrl = nextPage
                if (feed.url == nextPage) {
                    delete feed.nextUrl
                }
            }
        }


        res.send({
            feed: feed,
            article: parseHtml2ArticleList(feed, articleList)
        });

    });

});

module.exports = router;

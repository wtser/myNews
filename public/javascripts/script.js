window.feed = {};
window.articles = [];
window.articleLoading = false;
function _parseNextPage(feed, nextUrl) {
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
function _parseArticles(feed, articleNodes) {


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
            if (articleNodes.length > 0) {
                i = 0;
                while (i < articleNodes.length) {
                    item = articleNodes[i];
                    article = {
                        title: item.querySelector(feed.selector.title).textContent.trim(),
                        href: item.querySelector(feed.selector.href).attributes.href.nodeValue
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
        ajax: function () {
            var data = JSON.parse(articleNodes);
            var parsedData = data[feed.selector.item].map(function (a) {
                var baseUrl;
                if (a[feed.selector.href].indexOf('http') === -1) {
                    baseUrl = feed.url.match(/http[s]?:\/\/+[\s\S]+?\//)[0].slice(0, -1);
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

function renderArticles() {
    articleLoading = true;
    if (feed.hasOwnProperty("nextUrl")) {
        feed.url = feed.nextUrl
    }

    $.post("/news", {url: feed.url}, function (data) {
        var articleList = $(data).find(feed.selector.item || feed.selector);
        if (feed.selector.hasOwnProperty('next')){
            nextPage =  $(data).find(feed.selector.next) ;
            if (nextPage.length) {
                nextPage = nextPage.attr("href")
                nextPage = _parseNextPage(feed, nextPage)
                feed.nextUrl = nextPage
                if (feed.url == nextPage) {
                    return;
                }
            }
        }


        if (feed.type == 'ajax') {
            articleList = data
        }
        if (articleList.length > 0) {
            currentArticles = _parseArticles(feed, articleList);
            articles = articles.concat(currentArticles);
            var listHtml = _.template(newsItemTpl)({data: articles});
            $(".reader__list").html(listHtml);
            articleLoading = false;

            if (articles.length<20 && feed.selector.hasOwnProperty('next')){
                renderArticles()
            }
        }
    })
}
var newsItemTpl = '<% _.each(data,function(d){ %><li class="reader__list-item"><a target="_blank" href="<%- d.href %>" class="reader__list-item-link"><span class="reader__list-item-title ellipsis"><%- d.title %></span><span class="reader__list-item-below ellipsis"><%- d.href %></span></a></li><% }) %>';
$(".reader__site-item--sites").on("click", ".reader__site-item", function () {
    $(".reader__site-item--active").removeClass("reader__site-item--active");
    $(this).addClass("reader__site-item--active");
    $(".reader__list").html('<p>Loading</p>');

    window.feed = {};
    window.articles = [];

    feed = sites[$(this).data("index")];

    if (typeof feed.selector === "string") {
        feed.type = "compatible";
    } else if ((feed.selector.item === feed.selector.title || feed.selector.item === feed.selector.href) && !feed.selector.hasOwnProperty("next")) {
        feed.type = "compatible";
        feed.selector = feed.selector.item;
    }

    renderArticles()


})


$(window).scroll(function () {
    var scrollHeight = document.body.scrollHeight;
    var height = $(window).scrollTop();
    if (scrollHeight - height -1000 < document.body.clientHeight/2 && !articleLoading && feed.selector.hasOwnProperty('next')) {
        renderArticles()
    }
});
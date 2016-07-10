window.feed = {};
window.articleLoading = false;

function renderArticles() {
    articleLoading = true;
    $.post("/news", {feed: JSON.stringify(feed)}, function (data) {
        articleLoading = false;
        feed = data.feed;
        var listHtml = _.template(newsItemTpl)({data: data.article});
        $(".reader__list").append(listHtml);
        $(".loading").remove()
    })
}
var newsItemTpl = '<% _.each(data,function(d){ %><li class="reader__list-item"><a target="_blank" href="<%- d.href %>" class="reader__list-item-link"><span class="reader__list-item-title ellipsis"><%- d.title %></span><span class="reader__list-item-below ellipsis"><%- d.href %></span></a></li><% }) %>';
$(".reader__site-item--sites").on("click", ".reader__site-item", function () {
    $(".reader__site-item--active").removeClass("reader__site-item--active");
    $(this).addClass("reader__site-item--active");
    $(".reader__list").html('<p class="loading">Loading</p>');


    feed = sites[$(this).data("index")];

    if (typeof feed.selector === "string") {
        feed.type = "compatible";
    } else if ((feed.selector.item === feed.selector.title || feed.selector.item === feed.selector.href) && !feed.selector.hasOwnProperty("next")) {
        feed.type = "compatible";
        feed.selector = feed.selector.item;
    }

    renderArticles()


})

$(".reader__site-item--all").on("click",function(){
    $(".reader__site-items").toggle()
})

$(window).scroll(function () {
    var scrollHeight = document.body.scrollHeight;
    var height = $(window).scrollTop();
    if (scrollHeight - height - 1000 < document.body.clientHeight / 2 && !articleLoading && feed.hasOwnProperty('nextUrl')) {
        renderArticles()
    }
});
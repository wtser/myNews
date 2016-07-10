var sites =
    [
        {
            "name": "网易新闻",
            "url": "http://news.163.com/jnews/",
            "icon": "http://static.xgres.com/lianbo/avatar/1000463/120/1316745536",
            "selector": ".name>a",
            "desc": "媒体热门推荐"
        },
        // {
        //     "icon": "http://y1.ifengimg.com/index/72x72_2520ifeng.png",
        //     "url": "http://news.ifeng.com/hotnews/",
        //     "name": "凤凰网 热点新闻",
        //     "type": "html",
        //     "selector": {
        //         "item": ".tab_01 tr h3",
        //         "title": "a",
        //         "href": "a"
        //     },
        //     "desc": "中国领先的综合门户网站"
        // },
        // {
        //     "icon": "",
        //     "url": "http://www.vccoo.com/a/ukc23",
        //     "name": "大象工会",
        //     "type": "html",
        //     "selector": {
        //         "item": ".classify-list>.classify-list-con",
        //         "title": "h3>a",
        //         "href": "h3>a",
        //         "next": ".next-page"
        //     },
        //     "desc": 18
        // },
        {
            "name": "startup news",
            "url": "http://news.dbanotes.net/",
            "icon": "http://news.dbanotes.net/logo.png",
            "selector": {
                "item": "tr .title:not([valign=top])",
                "title": "a",
                "href": "a",
                "next": "tr:last-child .title>a"
            },
            "type": "html",
            "desc": "中文版的 Hacker News"
        },
        {
            "icon": "http://www.solidot.org/favicon.ico",
            "title": "solidot",
            "url": "http://www.solidot.org/",
            "selector": {
                "item": ".block_m",
                "title": "h2>a",
                "href": "h2>a"
            },
            "name": "solidot",
            "type": "html",
            "desc": "奇客的资讯，重要的东西"
        },
        {
            "icon": "https://news.ycombinator.com/favicon.ico",
            "name": "hacker news",
            "url": "https://news.ycombinator.com/",
            "selector": {
                "item": ".athing",
                "title": ".title>a",
                "href": ".title>a",
                "next": "tr:last-child .title>a"
            },
            "type": "html",
            "desc": "HN"
        },
        {
            "icon": "http://toutiao.io/apple-icon-180x180.png",
            "url": "http://toutiao.io",
            "name": "开发者头条",
            "type": "html",
            "selector": {
                "item": ".post",
                "title": ".title>a",
                "href": ".title>a"
            },
            "desc": "技术极客的头条新闻"
        },
        {
            "icon": "http://www.v2ex.com/static/img/icon_rayps_64.png",
            "name": "v2ex",
            "url": "http://www.v2ex.com/?tab=hot",
            "selector": {
                "item": "span.item_title > a",
                "title": "span.item_title > a",
                "href": "span.item_title > a"
            },
            "type": "html",
            "desc": "创意工作者们的社区"
        },
        {
            "name": "简书",
            "url": "http://www.jianshu.com/trending/now",
            "icon": "http://static.jianshu.io/assets/icon114-fcef1133c955e46bf55e2a60368f687b.png",
            "selector": "h4>a",
            "desc": "一个基于内容分享的社区"
        },
        {
            "icon": "https://static.zhihu.com/static/revved/img/ios/touch-icon-152.87c020b9.png",
            "url": "http://www.zhihu.com/explore/recommendations",
            "name": "知乎编辑推荐",
            "selector": {
                "item": "a.question_link",
                "title": "a.question_link",
                "href": "a.question_link"
            },
            "type": "html",
            "desc": "与世界分享你的知识、经验和见解"
        },
        {
            "icon": "http://cdn.marketplaceimages.windowsphone.com/v8/images/26738605-6e38-4991-9cdf-20ba1451d635?imageType=ws_icon_large",
            "name": "抽屉新热榜",
            "url": "http://dig.chouti.com/all/hot/recent/1",
            "selector": {
                "item": ".content-list>.item",
                "title": ".part1>a.show-content",
                "href": ".part1>a.show-content",
                "next": "#dig_lcpage>ul>li:last-child>a"
            },
            "type": "html",
            "desc": "聚合每日热门、搞笑、有趣资讯"
        },
        {
            "icon": "http://www.redditstatic.com/favicon.ico",
            "name": "reddit",
            "url": "http://www.reddit.com/r/all/",
            "selector": {
                "item": ".linklisting .thing",
                "title": ".entry .may-blank",
                "href": ".entry .may-blank",
                "next": ".nextprev a"
            },
            "type": "html",
            "desc": "the front page of the internet"
        },
        {
            "icon": "http://s.jandan.com/static/img/appicon.png",
            "name": "煎蛋",
            "url": "http://jandan.net/",
            "selector": {
                "item": ".post:not(#adsense)",
                "title": "h2>a",
                "href": "h2>a",
                "next": ".wp-pagenavi a:last-child"
            },
            "type": "html",
            "desc": "地球上没有新鲜事"
        },
        {
            "icon": "http://rs-assets.b0.upaiyun.com/assets/apple-touch-icon-180x180-precomposed-763d5ea2ad5193d98490fa9b7c362cfc.png",
            "name": "NEXT",
            "url": "http://next.36kr.com/posts",
            "selector": {
                "item": ".product-url>a",
                "title": ".product-url>a",
                "href": ".product-url>a"
            },
            "type": "html",
            "desc": "不错过任何一个新产品"
        },
        {
            "icon": "http://mindstore.io/static/images/lime/favicon.ico",
            "name": "mindstore",
            "url": "http://mindstore.io/",
            "selector": {
                "item": ".mind-item",
                "title": ".mind-title",
                "href": ".mind-content"
            },
            "type": "html",
            "desc": "在这里找到最好的产品与想法"
        },
        {
            "icon": "http://wanqu.co/static/images/wanqu/favicons/apple-touch-icon-180x180.png",
            "url": "http://wanqu.co/hot/",
            "name": "湾区日报",
            "type": "html",
            "desc": "关注互联网、创业、技术",
            "selector": {
                "item": ".list-group>.list-group-item .list-title",
                "title": "a",
                "href": "a"
            }
        },
        {
            "icon": "http://sfault-avatar.b0.upaiyun.com/235/056/2350560982-56796cae3be72_huge256",
            "url": "http://faxian.smzdm.com/hot_2hours",
            "name": "什么值得买热门2小时",
            "selector": {
                "item": ".list",
                "title": ".itemName>a",
                "href": ".itemName>a",
                "next": ".pagedown>a"
            },
            "type": "html",
            "desc": "汇集2小时里最热门的网友优惠商品爆料"
        },
        {
            "icon": "http://www.kiees.com/favicon.ico",
            "url": "http://www.kiees.com/",
            "name": "发现值得买",
            "selector": {
                "item": ".postbox",
                "title": "h2 a",
                "href": "h2 a",
                "next": ".wp-pagenavi>a:last-child"
            },
            "type": "html",
            "desc": "高性价比网购推荐"
        },
        {
            "icon": "http://sfault-image.b0.upaiyun.com/204/600/2046007660-5689ff9be1751_articlex",
            "url": "http://www.meidebi.com/index_q/",
            "name": "没的比最受关注",
            "selector": {
                "item": ".item .tit:not(.clearfix)",
                "title": "a",
                "href": "a",
                "next": ".next"
            },
            "type": "html",
            "desc": "没得比最受关注商品推荐"
        },
        // {
        //     "type": "ajax",
        //     "api": "https://hstar-hi.alicdn.com/dream/ajax/getProjectList.htm?page=1&pageSize=30&projectType=&type=6&status=1&sort=1",
        //     "icon": "https://img.alicdn.com/tps/TB19yVcJFXXXXaNXFXXXXXXXXXX-384-119.png",
        //     "url": "https://hi.taobao.com/market/hi/list.php",
        //     "selector": {
        //         "item": "data",
        //         "title": "name",
        //         "href": "link"
        //     },
        //     "name": "淘宝众筹",
        //     "desc": "认真对待每一个梦想"
        // },
        {
            "icon": "http://static.360buyimg.com/finance/base/1.2.0/images/logo-slogan.png",
            "url": "http://z.jd.com/bigger/search.html?status=2&sort=zhtj&categoryId=&parentCategoryId=&sceneEnd=&productEnd=&keyword=&page=1&pageSize=30",
            "name": "京东众筹",
            "type": "html",
            "selector": {
                "item": ".query-result-list",
                "title": ".link-tit",
                "href": ".i-tits>a"
            },
            "desc": "京东金融综合互联网理财服务"
        },
        {
            "name": "草榴技术区",
            "url": "http://t66y.com/thread0806.php?fid=7",
            "icon": "http://static.xgres.com/lianbo/avatar/1000463/120/1316745536",
            "selector": {
                "item": "#ajaxtable .t_one",
                "title": "h3>a",
                "href": "h3>a",
                "next": ".pages>a:nth-last-child(2)"
            },
            "type": "html",
            "desc": "1024"
        },
        // {
        //     "name": "草榴亚洲无码区",
        //     "url": "http://t66y.com/thread0806.php?fid=2",
        //     "icon": "http://static.xgres.com/lianbo/avatar/1000463/120/1316745536",
        //     "selector": {
        //         "item": "#ajaxtable .t_one",
        //         "title": "h3>a",
        //         "href": "h3>a",
        //         "next": ".pages>a:nth-last-child(2)"
        //     },
        //     "type": "html",
        //     "desc": "1024"
        // },
        // {
        //     "name": "草榴 達蓋爾的旗幟",
        //     "url": "http://t66y.com/thread0806.php?fid=16",
        //     "icon": "http://static.xgres.com/lianbo/avatar/1000463/120/1316745536",
        //     "selector": {
        //         "item": "#ajaxtable .t_one",
        //         "title": "h3>a",
        //         "href": "h3>a",
        //         "next": ".pages>a:nth-last-child(2)"
        //     },
        //     "type": "html",
        //     "desc": "1024"
        // }
    ];
module.exports = sites;

var express = require('express');
var router = express.Router();
var fetchUrl = require("fetch").fetchUrl;

/* GET news . */
router.post('/', function (req, res, next) {
    var obj = req.body;
    var url = obj.url;

    fetchUrl(url, function (error, meta, body) {
        var html = body.toString();
        res.send(html);
    });

});

module.exports = router;

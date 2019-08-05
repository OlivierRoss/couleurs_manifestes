var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couleurs Manifestes' });
});

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  const OeuvresManager = require("../lib/data_fetcher.js");
  manager = new OeuvresManager;
  manager.get_list().then((oeuvres) => {
    res.send(oeuvres);
  });
});

module.exports = router;

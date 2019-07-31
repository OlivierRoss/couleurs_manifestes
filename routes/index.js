var express = require('express');
var router = express.Router();

const donnees = require("../lib/data_fetcher.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couleurs Manifestes' });
});

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  donnees.get_all(res);
});

module.exports = router;

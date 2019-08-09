var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/p/:parcours', function(req, res, next) {
  // TODO Decrypter le parcours
  var donnees_parcours = {donnees: req.params.parcours};

  res.render('partager', { parcours: JSON.stringify(donnees_parcours)});
});
//////////// API ///////////////

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  const OeuvresManager = require("../lib/data_fetcher.js");
  manager = new OeuvresManager;
  manager.get_list().then((oeuvres) => {
    res.send(oeuvres);
  });
});

module.exports = router;

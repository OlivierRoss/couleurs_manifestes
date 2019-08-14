var express = require('express');
var router = express.Router();

const oeuvres = require("../backend/oeuvres.js");
const parcours = require("../backend/parcours.js");
const statistiques = require("../backend/statistiques.js");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get(/\/p\/\w{32}/, function(req, res) {
  parcours.load(req.url.split('/')[2]).then((parcours_charge) => {
    res.render('parcours', {
      parcours: "var parcours = " + JSON.stringify(parcours_charge)
    });
  });
});

//////////// API ///////////////

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  oeuvres.get_list().then((oeuvres) => {
    res.send(oeuvres);
  });
});

/* POST Sauvegarder parcours */
router.post('/parcours', (request, response) => {
  parcours.save(request.body).then((clef) => {
    response.send(clef);
  })
});

module.exports = router;

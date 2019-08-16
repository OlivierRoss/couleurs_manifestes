var express = require('express');
var router = express.Router();

const oeuvres = require("../backend/oeuvres.js");
const parcours = require("../backend/parcours.js");
const statistiques = require("../backend/statistiques.js");

/* GET home page. */
router.get('/', function(req, res) {
  if(req.cookies.hash_parcours){
    parcours.load(req.cookies.hash_parcours).then((parcours_charge) => {
      res.render('index', {
        parcours: "window['parcours']= " + JSON.stringify(parcours_charge)
      });
    });
  }
  else {
    res.render('index');
  }
});

router.get(/\/p\/\w{32}/, function(req, res) {
  let hash = req.url.split('/')[2];

  parcours.load(hash).then((parcours_charge) => {

    // Au cas ou l'utilisateur reviendrait a l'application
    res.cookie('hash_parcours', hash, { maxAge: process.env.COOKIE_MAX_AGE || 360000 }); 

    res.render('parcours', {
      parcours: "window.parcours = " + JSON.stringify(parcours_charge)
    });
  });
});

//////////// API ///////////////

/* GET oeuvres. */
router.get('/oeuvres.json', (req, res) => {
  oeuvres.get().then((oeuvres) => {
    res.send(oeuvres);
  });
});

router.get('/update_oeuvres', (req, res) => {
  oeuvres.fetch_oeuvres().then(() => {
    res.send('ok');
  });
});

/* POST Sauvegarder parcours */
router.post('/parcours', (request, response) => {
  parcours.save(request.body).then((clef) => {
    response.send(clef);
  })
});

module.exports = router;

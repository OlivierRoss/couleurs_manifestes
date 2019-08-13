// TODO
// Refact pour sortir toute la logique d'ici

const mongo = require('mongodb').MongoClient;
const crypto = require('crypto');
const OeuvresManager = require("../backend/data_fetcher.js");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get(/\/p\/\w{32}/, function(req, res, next) {

  mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
    var parcours = client.db(process.env.MONGO_DB).collection('parcours').findOne({id: req.url.split('/')[2]}, (err, parcours) => {
      res.render('partager', {
        parcours: "var parcours = " + JSON.stringify(parcours)
      });
    });
  });

});

//////////// API ///////////////

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  manager = new OeuvresManager;
  manager.get_list().then((oeuvres) => {
    res.send(oeuvres);
  });
});

/* POST Sauvegarder parcours */
router.post('/parcours', (request, response) => {

  // S'assurer qu'il n'y a pas de code malicieux
  if(!is_sane(request.body)) {
    return console.err("Parcours mal formate");
  };

  // Connexion
  mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
    if(err) { console.err(err); }

    // Enregistrement du parcours
    else {
      var clef = hash(request.body);
      var parcours = {
        id: clef,
        parcours: request.body,
        timestamp: + new Date()
      };
      
      client.db(process.env.MONGO_DB).collection("parcours").insertOne(parcours, (err, res) => {
        if(err) { console.err(err); }
        else {
          response.send({page_parcours: clef});
        }
      });
    }
  });
});

function hash (obj) {
  return crypto.createHash(process.env.HASH_ALGO).update(JSON.stringify(obj)).digest('hex');
}

function is_sane (obj) {
  return true; // TODO structure voulue
  return JSON.stringify(obj).match(/\{/)
}

module.exports = router;

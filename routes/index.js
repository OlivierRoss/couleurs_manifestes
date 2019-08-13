const mongo = require('mongodb').MongoClient;
const crypto = require('crypto');
const OeuvresManager = require("../lib/data_fetcher.js");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get(/\/p\/\w{32}/, function(req, res, next) {

  mongo.connect('mongodb://' + process.env.MONGO_INSTANCE, (err, client) => {
    var parcours = client.db(process.env.MONGO_DB).collection('parcours').findOne({}, (err, parcours) => {
      console.log(parcours);
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
  mongo.connect('mongodb://' + process.env.MONGO_INSTANCE, (err, client) => {
    if(err) { console.err(err); }

    // Enregistrement du parcours
    else {
      var clef = hash(request.body);
      var parcours = {
        id: clef,
        parcours: request.body
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

module.exports = router;

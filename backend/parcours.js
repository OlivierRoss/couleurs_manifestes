const mongo = require('mongodb').MongoClient;
const crypto = require('crypto');

exports.save = (obj) => {
  // S'assurer qu'il n'y a pas de code malicieux
  return new Promise ((resolve, reject) => {

    if(!is_sane(obj)) {
      let err = 'Parcours mal formate'; // TODO Creer une liste des erreurs
      console.error(err);
      reject(err)
    };

    // Connexion
    mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
      if(err) { 
        console.error(err);
        reject(err);
      }

      // Enregistrement du parcours
      else {
        var clef = hash(obj);
        var parcours = {
          _id: clef,
          parcours: obj,
          timestamp: + new Date()
        };

        client.db(process.env.MONGO_DB).collection("parcours").save(parcours, (err, res) => {
          if(err) { 
            console.error(err);
            reject(err);
          }
          else {
            resolve({page_parcours: clef});
          }
        });
      }
    });

  });

}

exports.load = (hash) => {

  return new Promise ((resolve, reject) => {
    mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {

      if(err) {
        console.error(err);
        reject(err);
      }
      else {
        client.db(process.env.MONGO_DB).collection('parcours').findOne({_id: hash}, (err, parcours) => {
          if(err) {
            console.error(err);
            reject(err);
          }
          else {
            resolve(parcours);
          }
        });
      }
    });
  })
}

function hash (obj) {
  return crypto.createHash(process.env.HASH_ALGO).update(JSON.stringify(obj)).digest('hex');
}

function is_sane (arr) {
  return arr.every((a) => { return a.match(/^\w+#\w+$/); });
}


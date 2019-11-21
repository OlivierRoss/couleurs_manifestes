const crypto = require('crypto');

const mongoose = require('mongoose');
require('../models/parcours');
const Parcours = mongoose.model('Parcours');

exports.save = (obj) => {

  return new Promise ((resolve, reject) => {

    // S'assurer qu'il n'y a pas de code malicieux
    if(!is_sane(obj)) {
      let err = 'Parcours mal formate'; // TODO Creer une liste des erreurs
      console.error(err);
      reject(err);
    };

    // Creation parcours
    const clef = hash(obj);
    const parcours = new Parcours({id: clef, parcours: JSON.stringify(obj), timestamp: + new Date()});
    return parcours.save((err, parcours) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve({page_parcours: clef});
    });
  });
}

exports.load = (hash) => {

  return new Promise ((resolve, reject) => {
    return Parcours.findOne({id: hash}, (err, parcours) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(parcours.unserialize());
    });
  });
}

function hash (obj) {
  return crypto.createHash(process.env.HASH_ALGO).update(JSON.stringify(obj)).digest('hex');
}

function is_sane (arr) {
  return arr.every((a) => { return a.match(/^[\w-]+#\w+$/); });
}


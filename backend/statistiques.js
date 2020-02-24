const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

require('../models/interaction');
const Interaction = mongoose.model('Interaction');

exports.log_interaction = (donnees) => {
  
  // TODO S'assurer qu'il n'y a pas de code malicieux
  return new Promise ((resolve, reject) => {
    const interaction = new Interaction({
      session_id: donnees.session_id,
      oeuvre: donnees.oeuvre,
      dimension: donnees.dimension,
      timestamp: donnees.timestamp
    })

    return interaction.save((err, interaction) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(true);
    });
  });
}

function get_interactions () {
  return new Promise ((resolve, reject) => {
    Interaction.find((err, interactions) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      resolve(interactions);
    });
  });
}

exports.get_statistiques = function () {

  return new Promise ((resolve, reject) => {
    get_interactions().then((interactions) => {

      var stats = {
        sessions_quotidiennes: calculer_sessions_quotidiennes(interactions)
      };

      resolve(stats);
    });
  });
}

///////// STATISTIQUES /////////////
function calculer_sessions_quotidiennes (interactions) {

  var statistique = { nom: "Interactions quotidiennes", dates: [], valeurs: [] };

  // Regroupement
  var hash_jour_sessions = _.countBy(interactions, (interaction) => {
    return moment(interaction.timestamp).startOf('day').format();
  });

  // Mise en forme des donnees
  for(var jour in hash_jour_sessions) {
    statistique.dates.push(jour);
    statistique.valeurs.push(hash_jour_sessions[jour]);
  }
  
  return statistique;
}


const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

require('../models/interaction');
const Interaction = mongoose.model('Interaction');

exports.log_interaction = (donnees) => {
  
  // TODO S'assurer qu'il n'y a pas de code malicieux
  console.log(donnees);
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

      // Extraire information pertienente
      interactions = _.map(interactions, (i) => {
        var date_interaction = moment(i.timestamp);
        return {
          session_id: i.session_id,
          oeuvre: i.oeuvre,
          dimension: i.dimension,
          heure: date_interaction.hour(),
          day_of_week: date_interaction.day(),
          day_of_year: date_interaction.dayOfYear()
        }
      });

      resolve(interactions);
    });
  });
}

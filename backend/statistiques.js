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
        sessions_quotidiennes: calculer_sessions_quotidiennes(interactions),
        vues_oeuvres: calculer_pct_vues_oeuvre(interactions)
      };

      resolve(stats);
    });
  });
}

///////// STATISTIQUES /////////////
function calculer_sessions_quotidiennes (interactions) {

  var statistique = { nom: "Interactions quotidiennes", etiquettes: [], valeurs: [], type: 'line' };

  // Regroupement
  var hash_jour_sessions = _.countBy(interactions, (interaction) => {
    return moment(interaction.timestamp).startOf('day').format();
  });

  // Mise en forme des donnees
  for(var jour in hash_jour_sessions) {
    statistique.etiquettes.push(jour);
    statistique.valeurs.push(hash_jour_sessions[jour]);
  }
  
  return statistique;
}

function calculer_pct_vues_oeuvre (interactions) {

  var statistique = { nom: "% de vue des oeuvres", etiquettes: [], valeurs: [], type: 'pie' };

  // Regroupement
  interactions = _.filter(interactions, (interaction) => {
    return moment(interaction.timestamp) > moment().subtract(1, 'months') 
      && interaction.oeuvre
      && interaction.oeuvre.match(/\w{1,2}-\d{2}/) ;
  });

  var vues_oeuvres = _.countBy(interactions, (interaction) => {
    return interaction.oeuvre;
  });

  var nombre_vues = _.reduce(vues_oeuvres, (resultat, valeur) => {
    return resultat += valeur;
  }, 0);

  // Mise en forme des donnees
  for(var oeuvre in vues_oeuvres) {
    statistique.etiquettes.push(oeuvre);
    statistique.valeurs.push(vues_oeuvres[oeuvre] / nombre_vues);
  }
  
  return statistique;
}


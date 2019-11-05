const mongoose = require('mongoose');
require('../models/interaction');
const Interaction = mongoose.model('Interaction');

exports.log_interaction = (donnees) => {
  // S'assurer qu'il n'y a pas de code malicieux
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

const mongoose = require('mongoose');
const { Schema  } = mongoose;

const ParcoursSchema = new Schema({
  id: String,
  parcours: String,
  temps_initial: Number
});

ParcoursSchema.methods.unserialize = function () {
  return {
    id: this.id,
    parcours: JSON.parse(this.parcours),
    temps_initial: this.temps_initial
  };
}

mongoose.model('Parcours', ParcoursSchema);

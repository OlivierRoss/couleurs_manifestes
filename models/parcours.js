const mongoose = require('mongoose');
const { Schema  } = mongoose;

const ParcoursSchema = new Schema({
  id: String,
  parcours: String,
  timestamp: Date
});

ParcoursSchema.methods.unserialize = function () {
  return {
    id: this.id,
    parcours: JSON.parse(this.parcours),
    timestamp: this.timestamp
  };
}

mongoose.model('Parcours', ParcoursSchema);

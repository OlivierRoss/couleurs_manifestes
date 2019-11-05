const mongoose = require('mongoose');
const { Schema  } = mongoose;

const InteractionSchema = new Schema({
  session_id: String,
  oeuvre: String,
  dimension: String,
  timestamp: Date
});

InteractionSchema.methods.unserialize = function () {
  return {
    session_id: this.session_id,
    oeuvre: this.oeuvre,
    dimension: this.dimension,
    timestamp: this.timestamp
  };
}

mongoose.model('Interaction', InteractionSchema);

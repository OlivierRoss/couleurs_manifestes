import Interactions from "./interactions.js";

var VueTouch = require('vue-touch');
Vue.use(VueTouch, {name: 'v-touch'}); //https://github.com/vuejs/vue-touch/tree/next

require("../../sass/oeuvre.scss");
require("../../sass/interactions.scss");

export default {
  props: ['infos'],

  components: {
    'interactions': Interactions
  },

  template: `
    <v-touch class="oeuvre" v-on:swipeleft="dimension_precedente" v-on:swiperight="dimension_suivante">
    <header>
    <div class="dimension-precedente" v-on:click="dimension_precedente">{{ infos.nom_dimension_precedente }} </div>
    <div class="informations-oeuvre">
      <h2>{{ infos.nom }}</h2>
      <h3>{{ infos.artiste }}</h3>
    </div>
    <div class="dimension-suivante" v-on:click="dimension_suivante">{{ infos.nom_dimension_suivante }}</div>
    </header>
    <div class="contenu-dimension">{{ infos.valeur_dimension_active }}</div>
    <interactions />
    </v-touch>
  `,

  methods: {
    dimension_precedente: function () {
      this.$emit('update-dimension', 0);
    },
    dimension_suivante: function () {
      this.$emit('update-dimension', 1);
    }
  }

};


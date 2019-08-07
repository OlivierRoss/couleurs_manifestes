import Interactions from "./interactions.js";

require("../../sass/oeuvre.scss");
require("../../sass/interactions.scss");

export default {
  props: ['infos'],

  components: {
    'interactions': Interactions
  },

  template: `
    <section class="oeuvre">
    <header>
    <div class="dimension-precedente" v-on:click="dimension_precedente">{{ infos.nom_dimension_precedente }} </div>
    <div class="nom-oeuvre">{{ infos.nom }}</div>
    <div class="dimension-suivante" v-on:click="dimension_suivante">{{ infos.nom_dimension_suivante }}</div>
    </header>
    <div class="contenu-dimension">{{ infos.valeur_dimension_active }}</div>
    <interactions />
    </section>
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


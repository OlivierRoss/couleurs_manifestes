"use strict";

Vue.component('oeuvre', {
  props: ['infos'],
  template: "\n    <section class=\"oeuvre\">\n    <header>\n    <div class=\"dimension-precedente\">{{ dimension_prev }} </div>\n    <div class=\"nom-oeuvre\">{{ infos.dimensions[0].valeur }}</div>\n    <div class=\"dimension-suivante\">{{ dimension_suiv }}</div>\n    </header>\n    <div class=\"contenu-dimension\"></div>\n    </section>",
  computed: {
    get_nom: function get_nom() {
      return this.infos.dimensions[0].valeur;
    },
    dimension_prev: function dimension_prev() {
      return this.infos.dimensions[1].nom;
    },
    dimension_suiv: function dimension_suiv() {
      return this.infos.dimensions[2].nom;
    }
  }
});
import Interactions from "./interactions.js";

export default {
  props: ['infos'],
  components: {
    'interactions': Interactions
  },
  data: function () {
    return {

    };
  },
  template: `
    <section class="oeuvre">
    <header>
    <div class="dimension-precedente">{{ dimension_suiv }} </div>
    <div class="nom-oeuvre">{{ nom }}</div>
    <div class="dimension-suivante">{{ dimension_suiv }}</div>
    </header>
    <div class="contenu-dimension">{{ infos.dimensions[7].valeur }}</div>
    <interactions />
    </section>
  `,
  created: function () {
    console.log(this.infos);
    this.nom = this.infos.dimensions[0].valeur; 
  },

  computed: {
    get_nom: function () {
      return this.infos.dimensions[0].valeur;
    },
    dimension_prev: function () {
      return this.infos.dimensions[1].nom;
    },
    dimension_suiv: function () {
      return this.infos.dimensions[2].nom;
    }
  }
};


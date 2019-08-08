require("../../sass/oeuvre.scss");

export default {
  props: ['infos'],

  template: `
    <section class="oeuvre">
    <header>
    <div class="dimension-precedente" v-on:click="dimension_precedente">{{ infos.nom_dimension_precedente }} </div>
    <div class="informations-oeuvre">
      <h2>{{ infos.nom }}</h2>
      <h3>{{ infos.artiste }}</h3>
    </div>
    <div class="dimension-suivante" v-on:click="dimension_suivante">{{ infos.nom_dimension_suivante }}</div>
    </header>
    <div class="contenu-dimension" v-touch:swipe="swipe">{{ infos.valeur_dimension_active }}</div>
    </section>
  `,

  methods: {
    swipe: function (direction){
      if(direction == 'left'){
        this.dimension_precedente();
      } else if (direction == 'right') {
        this.dimension_suivante();
      }
    },
    dimension_precedente: function () {
      this.$emit('update-dimension', 0);
    },
    dimension_suivante: function () {
      this.$emit('update-dimension', 1);
    }
  }

};


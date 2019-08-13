require("../../sass/oeuvre.scss");

export default {
  props: ['infos'],

  template: `
    <section class="oeuvre">
      <header>
        <div class="dimension-precedente" v-on:click="dimension_precedente">{{ infos.nom_dimension_precedente }} </div>
        <transition name="fade">
          <div class="informations-oeuvre">
            <h2>{{ infos.nom }}</h2>
            <h3>{{ infos.artiste }}</h3>
          </div>
        </transition>
        <div class="dimension-suivante" v-on:click="dimension_suivante">{{ infos.nom_dimension_suivante }}</div>
      </header>
      <div class="liens flex">
        <div v-for="lien in infos.liens" v-on:click="selectionner_lien" :data-lien="lien.id">
          {{ lien.titre }}
        </div>
      </div>
      <div class="contenu-dimension" v-touch:swipe="swipe">{{ infos.valeur_dimension_active }}</div>
    </section>
  `,

  methods: {
    selectionner_lien: function (event) {
      this.$emit('update-oeuvre', event.target.getAttribute("data-lien"));
    },
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


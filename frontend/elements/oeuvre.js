require("../../sass/oeuvre.scss");

export default {
  props: ['infos'],

  template: `
    <section class="oeuvre">
      <header>
        <div class="dimension-precedente" v-on:click="update_dimension" :data-id-dimension='infos.dimension_precedente.id'>{{ infos.dimension_precedente.nom }}</div>
        <transition name="fade">
          <div class="informations-oeuvre">
            <h2>{{ infos.oeuvre.dimensions.titre.valeur || 'Nom' }}</h2>
            <h3>{{ infos.oeuvre.dimensions.artiste.valeur || 'Artiste' }}</h3>
          </div>
        </transition>
        <div class="dimension-suivante" v-on:click="update_dimension" :data-id-dimension='infos.dimension_suivante.id'>{{ infos.dimension_suivante.nom }}</div>
      </header>
      <div class="contenu-dimension" v-touch:swipe="swipe">{{ infos.dimension_active.valeur }}</div>
      <div class="affichage-liens"><div class="texte">Deux oeuvres similaires à découvrir :</div></div>
      <div class="liens flex">
        <div v-for="lien in infos.dimension_active.liens" v-on:click="update_oeuvre" :data-id-oeuvre="lien.id" class="lien"> {{ lien.titre }} </div>
      </div>
    </section>
  `,
  methods: {
    update_oeuvre: function (event) {
      this.$emit('set-actif', { 
        id_oeuvre: parseInt(event.target.getAttribute('data-id-oeuvre')),
        id_dimension: this.infos.dimension_active.id
      });
    },
    update_dimension: function (event) {
      this.$emit('set-actif', { id_dimension: event.target.getAttribute('data-id-dimension') });
    },
    swipe: function (direction){
      // Attention qu'il n'y ait pas plusieurs oeuvres dans le DOM
      if(direction == 'left'){
        this.$emit('set-actif', { id_dimension: this.infos.dimension_precedente.id });
      } else if (direction == 'right') {
        this.$emit('set-actif', { id_dimension: this.infos.dimension_suivante.id });
      }
    }
  }
};


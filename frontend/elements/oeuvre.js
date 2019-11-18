require("../../sass/oeuvre.scss");

export default {
  props: ['infos', 'src_logo', 'couleur'],

  template: `
    <section class="oeuvre">
      <header>
        <div id="entete">
          <div class="logo">
            <img :src="src_logo">
            <span :class="couleur">{{ infos.oeuvre.id }}</span>
          </div>
          <div class="informations">
            <span class="nom-oeuvre">{{ infos.oeuvre.dimensions.titre.valeur || 'Nom' }}</span><br>
            <span class="nom-artiste">{{ infos.oeuvre.dimensions.artiste.valeur || 'Artiste' }}</span>
          </div>
        </div>
        <div id="dimensions">
          <div v-for="dimension in infos.oeuvre.dimensions" v-on:click="update_dimension" class="dimension inactif" :data-id-dimension="dimension.id">{{ dimension.nom }}</div>
        </div>
      </header>
      <div class="contenu-dimension" v-touch:swipe="swipe">
        <h2 class="nom-dimension">{{ infos.dimension_active.nom }}</h2>
        <p class="valeur-dimension">{{ infos.dimension_active.valeur }}</p>
      </div>
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

      // Reset styles
      [].forEach.call(document.getElementById("dimensions").children, (child) => {
        child.className = "dimension inactif";
      });

      // Rendre actif
      event.target.classList.remove("inactif");
      event.target.classList.add("actif");
      event.target.classList.add("bleu");
    },
    swipe: function (direction){
      if(direction == 'left'){
        this.$emit('set-actif', { id_dimension: this.infos.dimension_precedente.id });
      } else if (direction == 'right') {
        this.$emit('set-actif', { id_dimension: this.infos.dimension_suivante.id });
      }
    }
  }
};


require("../../sass/oeuvre.scss");

export default {
  props: ['infos', 'src_logo', 'couleur', 'oeuvres'],

  template: `
    <section class="oeuvre">
      <div id="entete">
        <div class="logo">
          <img :src="src_logo">
          <span :class="couleur">{{ infos.oeuvre.id }}</span>
        </div>
        <div class="informations">
          <span class="nom-oeuvre">{{ infos.oeuvre.titre || 'Nom' }}</span><br>
          <span class="nom-artiste">{{ infos.oeuvre.artiste || 'Artiste' }}</span>
        </div>
      </div>
      <div id="dimensions">
        <div v-for="dimension in infos.oeuvre.dimensions" 
            v-on:click="update_dimension" 
            :class="[infos.dimension_active.id == dimension.id ? actif : inactif, couleur]" 
            :data-id-dimension="dimension.id">
              {{ dimension.nom }}
        </div>
      </div>
      <div id="contenu-dimension" v-touch:swipe="swipe">
        <h2 class="nom-dimension" ref="nom_dimension">{{ infos.dimension_active.nom }}</h2>
        <p class="valeur-dimension">{{ infos.dimension_active.valeur }}</p>
      </div>
      <div id="decouverte">
        <div v-if="infos.dimension_active.collisions.length > 0" class="affichage-liens"><div class="texte">Deux oeuvres similaires à découvrir :</div></div>
        <div v-if="infos.dimension_active.collisions.length > 0" class="liens">
          <div v-for="(oeuvre, index) in meilleurs_liens_dimension_active" v-if="(index < 2)" v-on:click="update_oeuvre(oeuvre)" class="lien"> {{ oeuvre.titre }} </div>
        </div>
      </div>
    </section>
  `,
  data: function () {
    return {
      inactif: "dimension inactif",
      actif: "dimension actif"
    }
  },
  mounted: function () {
    this.resize_contenu();
  },
  updated: function () {
    this.resize_contenu();
    
    // Scroll
    this.$refs.nom_dimension.scrollIntoView(true);
  },
  methods: {
    update_oeuvre: function (oeuvre) {
      this.$emit('set-actif', { 
        oeuvre: oeuvre,
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
      event.target.classList.add(this.couleur);
    },
    swipe: function (direction){
      if(direction == 'left'){
        this.$emit('set-actif', { id_dimension: this.infos.dimension_precedente.id });
      } else if (direction == 'right') {
        this.$emit('set-actif', { id_dimension: this.infos.dimension_suivante.id });
      }
    },
    resize_contenu: function () {
      var contenu = document.getElementById('contenu-dimension');
      var decouverte = document.getElementById('decouverte');
      var footer = document.getElementById('footer');

      var debut = contenu.offsetTop;
      var fin = decouverte ? decouverte.offsetTop : footer.offsetTop;

      var padding = 0.06;

      contenu.style.height = (fin - debut) * (1 - padding) + "px"; 
    }
  },
  computed: {
    meilleurs_liens_dimension_active: function () {

      function comparer_vues_et_collisions (o1, o2) {

        // Le minimum de vues
        if(o1.vues < o2.vues) return -1;
        else if(o1.vues > o2.vues) return 1;

        // Le maximum de collisions
        else {
          if(o1.collisions < o2.collisions) return 1;
          else if (o1.collisions > o2.collisions) return -1;
          else return 0;
        }
      }

      // Ponderation
      var collisions_ponderees = this.infos.dimension_active.collisions.map((collision) => {

        // Trouver l'oeuvre associee
        var oeuvre = this.oeuvres.find((oeuvre) => { return oeuvre.id == collision[0]; });

        return { oeuvre: oeuvre, collisions: collision[1], vues: oeuvre.vues || 0 };
      });

      // Ordonnancement
      var collisions_ordonnees = collisions_ponderees.sort(comparer_vues_et_collisions);

      // Selection des deux meilleures
      return collisions_ordonnees.slice(0, 2).map((collision) => {
        return collision.oeuvre;
      });
    }
  }
};


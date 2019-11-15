import NumeroOeuvre from "./numero_oeuvre.js";

require("../../sass/interactions.scss");

export default {
  props: ['infos', 'parcours', 'temps_debut'],
  components: {
    numero_oeuvre: NumeroOeuvre
  },
  template: `
    <footer class="footer-oeuvre">
      <div class="menu-principal">
        <div v-on:click="toggle('loupe')" class="icone" ref="container_icone_loupe">
          <img src="/images/Visuels/Autre/coma_loupe-footer.svg" />
        </div>
        <div v-on:click="toggle('aleatoire')" class="icone" ref="container_icone_aleatoire">
          <img src="/images/Visuels/Autre/coma_des-footer.svg" />
        </div>
        <div v-on:click="toggle('partage')"class="icone" ref="container_icone_partage">
          <img src="/images/Visuels/Autre/coma_partage-footer.svg" />
        </div>
        <div v-on:click="toggle('info')" class="icone" ref="container_icone_info">
          <img src="/images/Visuels/Autre/coma_info-footer.svg" />
        </div>
      </div>
      <div id="flou"></div>
      <div id="panneau-loupe" ref="panneau_loupe" class="panneau-interaction">
        <div id="info-loupe">Entrer le # de l'oeuvre</div>
        <div class="numero">
          <numero_oeuvre />
        </div>
      </div>
      <div id="panneau-aleatoire" ref="panneau_aleatoire" class="panneau-interaction">
        <numero_oeuvre />
      </div>
      <div id="panneau-partage" ref="panneau_partage" class="panneau-interaction">
        <img src="/images/Visuels/Accueil/coma_logo-accueil.svg">
        <p>
          Lors de ma visite<br>
          j'ai vu {{ this.nombre_oeuvres }} oeuvres
          par 8 artistes.<br>
          j'ai étudié 5 courants<br>
          artistiques se déclinant<br> 
          en 4 couleurs.<br>
          Le tout en {{ this.temps_parcours }} minutes
        </p>
      </div>
      <div id="panneau-info" ref="panneau_info" class="panneau-interaction">
        <div id="logos-expo">
          <img src="/images/Visuels/Autre/coma_logo-info.svg">
          <img src="/images/Visuels/Autre/coma_logo-mbas.svg">
        </div>
          <p id="texte-sommaire">
            Une exposition thématique dynamique et accessible à tous qui met en valeur un corpus varié de plus de 60 œuvres de notre collection.
          </p>
          <p id="texte-descriptif">
    La couleur n’est pas seulement une donnée perceptive, elle peut aussi être porteuse de sens et d’une symbolique. On retrouve dans la collection du Musée des œuvres dont les couleurs ont parfois une résonnance historique, politique, sociale, ou une signification personnelle propre à l’artiste ou à ceux et celles qui les observent.
          </p>
      </div>
    </footer>
  `,

  data: function () {
    return {
      loupe: {
        actif: false
      },
      aleatoire: {
        actif: false
      },
      partage: {
        actif: false
      },
      info: {
        actif: false
      }
    }
  },

  methods: {
    toggle: function(nom) {
      console.log(this.parcours)
      if(!this[nom].actif) {
        // Reset tous
        for(var icone in this._data) {
          this.$refs['panneau_' + icone].style.display = "none";
          this.$refs["container_icone_" + icone].style.opacity = 0.35;
          this[icone].actif = false;
        }

        // Rendre actif
        this.$refs['panneau_' + nom].style.display = "block";
        this.$refs["container_icone_" + nom].style.opacity = 1;
        this[nom].actif = true;
      }
      // Rendre inactif
      else {
        this.$refs['panneau_' + nom].style.display = "none";
        this.$refs["container_icone_" + nom].style.opacity = 0.35;
        this[nom].actif = false;
      }
    },
    oeuvre_aleatoire: function () {
      let liens = this.infos.dimension_active.liens;
      this.$emit('set-actif', { 
        id_oeuvre: liens[Math.floor(Math.random() * liens.length)].id,
        id_dimension: this.infos.dimension_active.id 
      });
    },
    selectionner: function (event) {
      this.$emit('set-actif', { 
        id_oeuvre: parseInt(event.target.value)
      });
    },
    partager: function () {
      this.$emit('partager');
    }
  },

  computed: {
    nombre_oeuvres: function () {
      return this.parcours.length;
    },
    temps_parcours: function () {
      return Date.now() - this.temps_debut; 
    }
  }
};

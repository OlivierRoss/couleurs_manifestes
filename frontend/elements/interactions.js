require("../../sass/interactions.scss");

export default {
  props: ['infos'],
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
      <div id="panneau-loupe" ref="panneau_loupe" class="panneau-interaction"> </div>
      <div id="panneau-aleatoire" ref="panneau_aleatoire" class="panneau-interaction"> </div>
      <div id="panneau-partage" ref="panneau_partage" class="panneau-interaction"> </div>
      <div id="panneau-info" ref="panneau_info" class="panneau-interaction"> </div>
    </footer>
  `,

  data: function () {
    return {
      mode_selection: false,
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
      if(!this[nom].actif) {
        this.$refs['panneau_' + nom].style.display = "block";
        this.$refs["container_icone_" + nom].style.opacity = 1;
      }
      else {
        this.$refs['panneau_' + nom].style.display = "none";
        this.$refs["container_icone_" + nom].style.opacity = 0.35;
      }
      this[nom].actif = !this[nom].actif;
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
  }
};

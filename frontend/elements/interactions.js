require("../../sass/interactions.scss");

export default {
  props: ['infos'],
  //https://jqueryui.com/autocomplete/#combobox
  template: `
    <footer class="footer-oeuvre">
      <div class="menu-principal">
        <div class="icone">
          <img src="/images/Visuels/Autre/coma_loupe-footer.svg" />
        </div>
        <div class="icone">
          <img src="/images/Visuels/Autre/coma_des-footer.svg" />
        </div>
        <div class="icone">
          <img src="/images/Visuels/Autre/coma_partage-footer.svg" />
        </div>
        <div class="icone">
          <img src="/images/Visuels/Autre/coma_info-footer.svg" />
        </div>
      </div>
      </div>
    </footer>
  `,

  data: function () {
    return {
      mode_selection: false
    }
  },

  methods: {
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

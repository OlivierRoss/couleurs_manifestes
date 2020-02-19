const config = require('../../config/parametres');

require('../../sass/numero_oeuvre.scss');

export default {
  props: ['oeuvres'],
  template: `
    <div class="numero_oeuvre">
      <form>
        <label for="couleur">#</label>
        <input v-on:keyup="test_couleur" ref="couleur" type="text" id="couleur" maxlength="2">
        <label for="numero">-</label>
        <input v-on:keyup="test_numero" ref="numero" type="number" id="numero" maxlength="2">
      </form>
      <div v-on:click="test_oeuvre" class="bouton-numero-oeuvre">
        <div class="container-fleche">
          <img src="/images/Visuels/Accueil/coma_fleche.svg">
        </div>
      </div>
    </div>
  `,
  methods: {
    nouvelle_oeuvre: function (oeuvre) {
      this.$emit('nouvelle-oeuvre', oeuvre);
      this.clear();
      this.$refs.numero.blur();
    },
    focus_couleur: function () {
      this.$refs.couleur.focus();
    },
    focus_numero: function () {
      this.$refs.numero.focus();
    },
    clear: function () {
      this.$refs.numero.value = null;
      this.$refs.couleur.value = null;
    },
    test_couleur: function (event) {
      var val = event.target.value.toUpperCase();

      // Si couleur valide
      if(config.couleurs.includes(val)) {
        this.focus_numero();
      }

      // Deplacements
      if(event.keyCode == config.touches.LEFT || event.keyCode == config.touches.RIGHT) return;

      // Couleur valide ou debut
      if(val.length == 2) {
        if(config.couleurs.includes(val)) {
          this.focus_numero();
        }
        else {
          event.target.value = "";
        }
      }
    },
    test_numero: function (event) {
      var val = event.target.value;

      if(event.keyCode == config.touches.BACKSPACE) {
        if(val.length == 0) {
          var couleur = this.$refs.couleur;
          couleur.value = couleur.value.substring(0, couleur.value.length - 1);
          this.focus_couleur();
        }
      }

      // Charger l'application
      if(event.keyCode == config.touches.ENTER) {
        this.test_oeuvre();
      }
    },
    test_oeuvre: function () {
      let id_oeuvre = this.$refs.couleur.value.toUpperCase() + '-' + this.$refs.numero.value;
      let oeuvre = this.find_oeuvre_by_id_or_alias(id_oeuvre);

      if(oeuvre) {
        this.nouvelle_oeuvre(oeuvre);
      }
      else {
        this.reset();
      }
    },
    find_oeuvre_by_id_or_alias: function (id) {
      return this.oeuvres.find((oeuvre) => { 
        return oeuvre.alias.includes(id);
      });
    },
    reset: function () {
      this.$refs.couleur.value = "";
      this.$refs.numero.value = "";
      this.focus_couleur();
    }
  }
};

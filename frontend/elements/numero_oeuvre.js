const config = require('../../config/parametres');

require('../../sass/numero_oeuvre.scss');

export default {
  template: `
    <div class="numero_oeuvre">
      <form>
        <label for="couleur">#</label>
        <input v-on:keyup="test_couleur" ref="couleur" type="text" id="couleur" maxlength="2">
        <label for="numero">-</label>
        <input v-on:keyup="test_numero" ref="numero" type="text" id="numero" maxlength="2">
      </form>
      <div v-on:click="nouvelle_oeuvre" class="bouton-numero-oeuvre">
        <div class="container-fleche">
        </div>
      </div>
    </div>
  `,
  methods: {
    nouvelle_oeuvre: function () {
      this.$emit('nouvelle-oeuvre', this.$refs.couleur.value + '-' + this.$refs.numero.value);
    },
    focus_couleur: function () {
      this.$refs.couleur.focus();
    },
    test_couleur: function (event) {
      var val = event.target.value;
      if(val.length == 1) {
        this.$refs.numero.focus();
      }
    },
    test_numero: function (event) {
      var val = event.target.value;
    },
    est_couleur_ok: function (couleur) {
      return config.couleurs.includes(couleur);
    }
  }
};

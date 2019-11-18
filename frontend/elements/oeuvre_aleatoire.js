require('../../sass/oeuvre_aleatoire.scss');

export default {
  template: `
    <div class="oeuvre_aleatoire">
      <div id="texte-explicatif">
        Oeuvre<br>Aleatoire
      </div>
      <div v-on:click="nouvelle_oeuvre" class="bouton-oeuvre-aleatoire">
        <div class="container-fleche">
          <img src="/images/Visuels/Accueil/coma_fleche.svg">
        </div>
      </div>
    </div>
  `,
  methods: {
    nouvelle_oeuvre: function () {
      this.$emit('nouvelle-oeuvre-aleatoire');
    }
  }
};

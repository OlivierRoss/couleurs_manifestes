import NumeroOeuvre from "./numero_oeuvre.js";

require('../../sass/accueil.scss');

export default {
  props: ["passer_valeur_initiale"],
  components: {
    numero_oeuvre: NumeroOeuvre
  },
  template: `
    <section class="accueil" v-on:click="selection_initiale">
      <h1><img id="logo-accueil" src="/images/Visuels/Accueil/coma_logo-accueil.svg" alt="Logo de l'application Couleurs Manifestes"></h1>
      <h2>POUR DÉBUTER</h2>
      <div id="icones-accueil">
        <div class="option-nav" v-on:click="selection_numero">
          <img src="/images/Visuels/Accueil/coma_loupe-accueil.svg">
          <p class="texte-nav">Entrer<br> le # d'une<br> oeuvre</p>
        </div>
        <div class="option-nav" v-on:click="selection_aleatoire">
          <img src="/images/Visuels/Accueil/coma_des-accueil.svg">
          <p class="texte-nav">Choisir une oeuvre aléatoire</p>
        </div>
        <div class="option-nav">
          <img src="/images/Visuels/Accueil/coma_info-accueil.svg">
          <p class="texte-nav">En savoir plus sur cet outil</p>
        </div>
      </div>
      <div id="input-debut" ref="input_debut"><numero_oeuvre /></div>
    </section>
  `,
  methods: {
    selection_initiale: function (event) {
      return;
      this.$emit('charger-application', 10); // TODO retourner la valeur qui lancera l'application
    },
    selection_numero: function () {
      this.toggleInputNumero();
    },
    selection_aleatoire: function () {
      this.toggleInputNumero();
    },
    toggleInputNumero: function () {
      var val = this.$refs.input_debut.style.display;
      this.$refs.input_debut.style.display = val == 'none' ? 'block' : 'none';
    }
  }
};

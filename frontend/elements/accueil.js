import NumeroOeuvre from "./numero_oeuvre.js";

require('../../sass/accueil.scss');

export default {
  props: ["passer_valeur_initiale"],
  components: {
    numero_oeuvre: NumeroOeuvre
  },
  template: `
    <section class="accueil">
      <video id="video-background" autoplay loop>
        <source src="/videos/intro.mp4" type="video/mp4">
      </video>
      <h1><img id="logo-accueil" src="/images/Visuels/Accueil/coma_logo-accueil.svg" alt="Logo de l'application Couleurs Manifestes"></h1>
      <h2>POUR DÉBUTER</h2>
      <div id="icones-accueil">
        <div class="option-nav" v-on:click.stop="selection_numero">
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
      <div id="input-debut" ref="input_debut" style="display: none;"><numero_oeuvre v-on:nouvelle-oeuvre="selection_initiale" /></div>
    </section>
  `,
  methods: {
    selection_initiale: function (oeuvre) {
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
      if(val == "none") {
        this.$refs.input_debut.style.display = 'block';
        this.$children[0].focus_couleur();
      }
      else {
        this.$refs.input_debut.style.display = 'none';
      }
    }
  }
};

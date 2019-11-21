import NumeroOeuvre from "./numero_oeuvre.js";
import OeuvreAleatoire from "./oeuvre_aleatoire.js";

require('../../sass/accueil.scss');

export default {
  props: ["oeuvres"],
  components: {
    numero_oeuvre: NumeroOeuvre,
    oeuvre_aleatoire: OeuvreAleatoire
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
        <div class="option-nav" v-on:click.stop="selection_aleatoire">
          <img src="/images/Visuels/Accueil/coma_des-accueil.svg">
          <p class="texte-nav">Choisir une oeuvre aléatoire</p>
        </div>
        <div class="option-nav">
          <img src="/images/Visuels/Accueil/coma_info-accueil.svg">
          <p class="texte-nav">En savoir plus sur cet outil</p>
        </div>
      </div>
      <div class="input-debut" ref="input_debut" style="display: none;"><numero_oeuvre v-on:nouvelle-oeuvre="selection_initiale" :oeuvres="oeuvres" /></div>
      <div class="input-debut" ref="input_debut_aleatoire" style="display: none;"><oeuvre_aleatoire v-on:nouvelle-oeuvre-aleatoire="selection_initiale" text="Oeuvre aleatoire"/></div>
    </section>
  `,
  data: () => {
    return {
      display_input_numero: 'none',
      display_input_aleatoire: 'none'
    }
  },
  methods: {
    selection_initiale: function (oeuvre) {
      this.$emit('charger-application', oeuvre);
    },
    selection_numero: function () {
      if(this.display_input_aleatoire == 'block') this.toggleInputAleatoire();
      this.toggleInputNumero();
    },
    selection_aleatoire: function () {
      if(this.display_input_numero == 'block') this.toggleInputNumero();
      this.toggleInputAleatoire();
    },
    toggleInputNumero: function () {
      var val = this.$refs.input_debut.style.display;
      if(val == "none") {
        this.$refs.input_debut.style.display = 'block';
        this.$children[0].focus_couleur();
        this.display_input_numero = 'block';
      }
      else {
        this.$refs.input_debut.style.display = 'none';
        this.display_input_numero = 'none';
      }
    },
    toggleInputAleatoire: function () {
      var val = this.$refs.input_debut_aleatoire.style.display;
      if(val == "none") {
        this.$refs.input_debut_aleatoire.style.display = 'block';
        this.display_input_aleatoire = 'block';
      }
      else {
        this.$refs.input_debut_aleatoire.style.display = 'none';
        this.display_input_aleatoire = 'none';
      }
    }
  }
};

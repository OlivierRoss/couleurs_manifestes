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
      <video id="video-background" autoplay loop muted>
        <source src="/videos/intro1.m4v" type="video/mp4">
        <source src="/videos/intro_web.webm" type="video/webm">
      </video>
      <h1><img id="logo-accueil" src="/images/Visuels/Accueil/coma_logo-accueil.svg" alt="Logo de l'application Couleurs Manifestes"></h1>
      <h2>POUR DÉBUTER</h2>
      <div id="icones-accueil">
        <div class="option-nav" v-on:click.stop="selection_numero">
          <img src="/images/Visuels/Accueil/coma_loupe-accueil.svg">
          <p class="texte-nav">Entrer<br>le # d'une<br>oeuvre</p>
        </div>
        <div class="option-nav" v-on:click.stop="selection_aleatoire">
          <img src="/images/Visuels/Accueil/coma_des-accueil.svg">
          <p class="texte-nav">Choisir<br>une oeuvre<br>aléatoire</p>
        </div>
        <div class="option-nav" @click.stop="afficher_texte_intro">
          <img src="/images/Visuels/Accueil/coma_info-accueil.svg">
          <p class="texte-nav">En savoir<br>plus sur<br>cet outil</p>
        </div>
      </div>
      <div class="input-debut" ref="input_debut" style="display: none;"><numero_oeuvre v-on:nouvelle-oeuvre="selection_initiale" :oeuvres="oeuvres" /></div>
      <div class="input-debut" ref="input_debut_aleatoire" style="display: none;"><oeuvre_aleatoire v-on:nouvelle-oeuvre-aleatoire="selection_initiale" text="Oeuvre aleatoire"/></div>
      <div id="texte-introduction" ref="texte_intro">
        <img id="quitter" @click.stop="cacher_texte_intro" src="/images/quitter.jpg" alt="X">
        <h1><img src="/images/Visuels/Accueil/coma_logo-accueil.svg"></h1>
        <p>
  L’application Couleurs Manifestes permet de créer un parcours personnalisé en entrant le numéro de l’oeuvre de votre choix (icône loupe), ou encore de faire une visite spontanée en utilisant le parcours généré aléatoirement (icône dés). Pour vous repérer dans l’espace trouvez les pastilles colorées numérotées situées dans le haut gauche de l’écran et correspondant à l’oeuvre en salle. Chaque oeuvre est identifiée à l’aide de la lettre de son champ coloré et d’un numéro. La salle d’exposition est divisée en 6 zones colorées: Jaune (J), Vert (V), Bleu (B), Rouge (R), Noir & Blanc(NB), en plus de l’espace central dédié à l’artiste Serge Lemoyne (L).
          </p>
      </div>
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
        document.getElementById("container-application").style.display = "block";
        document.getElementById("erreur-orientation").style.display = "none";

        this.$refs.input_debut.style.display = 'block';
        this.$children[0].focus_couleur();
        this.display_input_numero = 'block';
      }
      else {
        document.getElementById("container-application").style.display = "";
        document.getElementById("erreur-orientation").style.display = "";

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
    },
    afficher_texte_intro: function () {
      this.$refs.texte_intro.style.display = "block";
    },
    cacher_texte_intro: function () {
      this.$refs.texte_intro.style.display = "none";
    }
  }
};

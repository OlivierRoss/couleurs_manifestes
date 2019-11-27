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
        <img id="quitter" @click.stop="cacher_texte_intro" src="/images/quitter.jpg" alt="image quitter texte">
        <h1><img src="/images/Visuels/Accueil/coma_logo-accueil.svg"></h1>
        <p>
            L’intensité de Couleurs Manifestes se révèle dans le pouvoir d’interpellation, de transmission de sens et de symboliques de la couleur, vu à travers une cinquantaine d’oeuvres de la collection du Musée des beaux-arts de Sherbrooke.
          </p>
          <p>
            Que ce soient les «partisans» bleus, blancs et rouges de Serge Lemoyne, le poignant rouge carmin d’André Fournelle, les chauds ciels orangés de Peter Krausz ou la personnalité colorée d’Armand Vaillancourt, des oeuvres aux couleurs, techniques, matériaux et époques variés s’y trouvent en relation, sans contrainte chronologique. 
            <br><br>
            Jeu de correspondance de sens entre le contexte de production des oeuvres et leur contexte actuel de réception, Couleurs Manifestes vous convie dans un rapport dynamisé entre vous et le Musée.
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

require('../../sass/accueil.scss');

export default {
  props: ["passer_valeur_initiale"],
  template: `
    <section class="accueil" v-on:click="selection_initiale">
      <h1><img id="logo-accueil" src="/images/Visuels/Accueil/coma_logo-accueil.svg" alt="Logo de l'application Couleurs Manifestes"></h1>
      <h2>POUR DÉBUTER</p>
      <div id="icones-accueil">
        <div class="option-nav">
          <img src="/images/Visuels/Accueil/coma_loupe-accueil.svg">
          <p class="texte-nav">Entrer<br> le # d'une<br> oeuvre</p>
        </div>
        <div class="option-nav">
          <img src="/images/Visuels/Accueil/coma_des-accueil.svg">
          <p class="texte-nav">Choisir une oeuvre aléatoire</p>
        </div>
        <div class="option-nav">
          <img src="/images/Visuels/Accueil/coma_info-accueil.svg">
          <p class="texte-nav">En savoir plus sur cet outil</p>
        </div>
      </div>
    </section>
  `,

  methods: {
    selection_initiale: function (event) {
      this.$emit('charger-application', 10); // TODO retourner la valeur qui lancera l'application
    }
  }

};

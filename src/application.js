/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 */
Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes () {
  new Vue({
    el: '#container-application',
    template: `<div id="container-application">
      <accueil v-if="ecran == 'accueil'" :passer_valeur_initiale="this.determiner_valeur_initiale" :class="{affiche: etat == 'affiche'}" />
      <oeuvre v-if="ecran == 'oeuvre'" :infos="oeuvre_active" :class="{affiche: etat == 'affiche'}" />
      <interactions v-if="ecran == 'oeuvre'" />
      <erreur v-if="ecran == 'erreur'" message="Donnees indisponibles" />
    </div>`,
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      valeur_initiale: null
    },
    // Charger les oeuvres
    created: function () {
      var me = this;
      fetch("/oeuvres")
        .then((data) => {return data.json();} ) // passage des parametres
        .then((res) => { 
          me.oeuvres = res;
          me.oeuvre_active= me.oeuvres[1];
        });
    },
    methods: {

      // Chargement
      charger_application: function (event) {
        this.cacher_accueil();

        // Attendre la fin de l'animation
        setTimeout(() => {

          // Afficher l'application
          if( this.oeuvres_presentes() ) {
            this.afficher_oeuvre();
          }
          else {
            // Attendre quelques secondes encore
            setTimeout(() => {
              // Afficher l'application
              if( this._oeuvres_presentes() ) {
                this.afficher_oeuvre();
              }
              // Afficher erreur
              else {
                this.afficher_erreur();
              }
            }, 2500);
          }
        }, 1000);
      },

      // Affichage
      cacher_accueil: function () {
        this.etat = 'cache';
      },
      afficher_application: function () {
        return true;
      },
      afficher_oeuvre: function () {
        this.ecran = "oeuvre";
        setTimeout(() => {
          this.etat = 'affiche';
        }, 10);
      },
      afficher_erreur: function () {
        this.ecran = "erreur";
        this.etat = 'affiche';
      },

      // Comportement
      determiner_valeur_initiale: function (valeur) {
        this.valeur_initiale = valeur;
        this.charger_application();
      },

      // Utils
      oeuvres_presentes: function () {
        return this.oeuvres.length > 0;
      }
    },
    computed: {

    }
  });
}

window.onload = lancer_couleurs_manifestes;


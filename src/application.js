/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 * Creer une interface d'affichage des erreurs - ne fonctionne pas
 */
Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes () {
  cm = new Vue({
    el: '#container-application',
    template: `<div id="container-application">
      <accueil v-if="ecran == 'accueil'" v-on:element_depart_selectionne="charger_application" :class="{affiche: etat == 'affiche'}" />
      <oeuvre v-if="ecran == 'oeuvre'" v-bind:infos="oeuvre_active" :class="{affiche: etat == 'affiche'}" />
      <interactions v-if="ecran == 'oeuvre'" />
      <erreur v-if="ecran == 'erreur'" />
    </div>`,
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null
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
      cacher_accueil: function () {
        this.etat = 'cache';
      },
      oeuvres_presentes: function () {
        return this.oeuvres.length > 0;
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
      }
    },
    computed: { }
  });
}

window.onload = lancer_couleurs_manifestes;


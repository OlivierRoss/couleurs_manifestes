Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes() {
  cm = new Vue({
    el: '#container-application',
    template: `<div id="container-application">
      <accueil v-if="ecran == 'accueil'" v-on:element_depart_selectionne="charger_application" :class="{affiche: etat == 'affiche'}" />
      <oeuvre v-if="ecran == 'oeuvre'" />
      <interactions v-if="ecran == 'oeuvre'" />
    </div>`,
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: []
    },
    // Charger les oeuvres
    created: function () {
      var me = this;
      fetch("/oeuvres").then(data => {
        return data.json();
      }) // passage des parametres
      .then(res => {
        me.oeuvres = res;
      });
    },
    methods: {
      charger_application: function (event) {
        this.cacher_accueil();

        // Attendre la fin de l'animation
        setTimeout(() => {

          // Afficher l'application
          if (this.confirmer_oeuvres_presentes()) {
            this.afficher_oeuvre();
          } else {
            // Attendre quelques secondes encore
            setTimeout(() => {
              // Afficher l'application
              if (this.confirmer_oeuvres_presentes()) {
                this.afficher_oeuvre();
              }
              // Afficher erreur
              else {
                  this.afficher_erreur(); // TODO creer interface erreur;
                }
            }, 2500);
          }
        }, 1000);
      },
      cacher_accueil: function () {
        this.etat = 'cache';
      },
      confirmer_oeuvres_presentes: function () {
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
    computed: {}
  });
}

window.onload = lancer_couleurs_manifestes;
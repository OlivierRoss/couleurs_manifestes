Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes() {
  cm = new Vue({
    el: '#container-application',
    template: '<div id="container-application"><component v-bind:is="ecran" v-on:element_depart_selectionne="charger_application" :class="{affiche: etat == \'affiche\'}"/><interactions /></div>',
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: []
    },
    // Charger les oeuvres
    created: function created() {
      var me = this;
      fetch("/oeuvres").then(function (data) {
        return data.json();
      }) // parametres
      .then(function (res) {
        me.oeuvres = res;
      });
    },
    methods: {
      charger_application: function charger_application(event) {
        var _this = this;

        this.cacher_accueil();

        // Attendre la fin de l'animation
        setTimeout(function () {

          // Afficher l'application
          if (_this.confirmer_oeuvres_presentes()) {
            _this.afficher_oeuvre();
          } else {
            // Attendre quelques secondes encore
            setTimeout(function () {
              // Afficher l'application
              if (_this.confirmer_oeuvres_presentes()) {
                _this.afficher_oeuvre();
              }
              // Afficher erreur
              else {
                  _this.afficher_erreur(); // TODO creer interface erreur;
                }
            }, 2500);
          }
        }, 1000);
      },
      cacher_accueil: function cacher_accueil() {
        this.etat = 'cache';
      },
      confirmer_oeuvres_presentes: function confirmer_oeuvres_presentes() {
        return this.oeuvres.length > 0;
      },
      afficher_application: function afficher_application() {
        return true;
      },
      afficher_oeuvre: function afficher_oeuvre() {
        var _this2 = this;

        this.ecran = "oeuvre";
        setTimeout(function () {
          _this2.etat = 'affiche';
        }, 10);
      },
      afficher_erreur: function afficher_erreur() {
        this.ecran = "erreur";
        this.etat = 'affiche';
      }
    },
    computed: {}
  });
}

window.onload = lancer_couleurs_manifestes;
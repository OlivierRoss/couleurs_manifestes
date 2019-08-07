"use strict";

/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 */
Vue.config.productionTip = false; // Creation de l'application

function lancer_couleurs_manifestes() {
  new Vue({
    el: '#container-application',
    template: "<div id=\"container-application\">\n      <accueil v-if=\"ecran == 'accueil'\" :passer_valeur_initiale=\"this.determiner_valeur_initiale\" :class=\"{affiche: etat == 'affiche'}\" />\n      <oeuvre v-if=\"ecran == 'oeuvre'\" :infos=\"oeuvre_active\" :class=\"{affiche: etat == 'affiche'}\" />\n      <interactions v-if=\"ecran == 'oeuvre'\" />\n      <erreur v-if=\"ecran == 'erreur'\" message=\"Donnees indisponibles\" />\n    </div>",
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      valeur_initiale: null
    },
    // Charger les oeuvres
    created: function created() {
      var me = this;
      fetch("/oeuvres").then(function (data) {
        return data.json();
      }) // passage des parametres
      .then(function (res) {
        me.oeuvres = res;
        me.oeuvre_active = me.oeuvres[1];
      });
    },
    methods: {
      // Chargement
      charger_application: function charger_application(event) {
        var _this = this;

        this.cacher_accueil(); // Attendre la fin de l'animation

        setTimeout(function () {
          // Afficher l'application
          if (_this.oeuvres_presentes()) {
            _this.afficher_oeuvre();
          } else {
            // Attendre quelques secondes encore
            setTimeout(function () {
              // Afficher l'application
              if (_this._oeuvres_presentes()) {
                _this.afficher_oeuvre();
              } // Afficher erreur
              else {
                  _this.afficher_erreur();
                }
            }, 2500);
          }
        }, 1000);
      },
      // Affichage
      cacher_accueil: function cacher_accueil() {
        this.etat = 'cache';
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
      },
      // Comportement
      determiner_valeur_initiale: function determiner_valeur_initiale(valeur) {
        this.valeur_initiale = valeur;
        this.charger_application();
      },
      // Utils
      oeuvres_presentes: function oeuvres_presentes() {
        return this.oeuvres.length > 0;
      }
    },
    computed: {}
  });
}

window.onload = lancer_couleurs_manifestes;
"use strict";

/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 * Creer une interface d'affichage des erreurs - ne fonctionne pas
 */
Vue.config.productionTip = false; // Creation de l'application

function lancer_couleurs_manifestes() {
  cm = new Vue({
    el: '#container-application',
    template: "<div id=\"container-application\">\n      <accueil v-if=\"ecran == 'accueil'\" v-on:element_depart_selectionne=\"charger_application\" :class=\"{affiche: etat == 'affiche'}\" />\n      <oeuvre v-if=\"ecran == 'oeuvre'\" v-bind:infos=\"oeuvre_active\" :class=\"{affiche: etat == 'affiche'}\" />\n      <interactions v-if=\"ecran == 'oeuvre'\" />\n      <erreur v-if=\"ecran == 'erreur'\" message=\"Donnees indisponibles\" />\n    </div>",
    data: {
      etat: 'affiche',
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null
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
      cacher_accueil: function cacher_accueil() {
        this.etat = 'cache';
      },
      oeuvres_presentes: function oeuvres_presentes() {
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
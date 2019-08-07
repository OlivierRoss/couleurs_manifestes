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
    template: "<div id=\"container-application\">\n      <transition appear name=\"fade\" mode=\"out-in\">\n        <accueil v-if=\"ecran == 'accueil'\" :passer_valeur_initiale=\"this.determiner_valeur_initiale\" />\n        <oeuvre v-else-if=\"ecran == 'oeuvre'\" :infos=\"oeuvre_active\" />\n        <erreur v-else :message=\"message_erreur\" />\n      </transition>\n    </div>",
    data: {
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      valeur_initiale: null,
      message_erreur: "Donnees indisponibles"
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

        // Afficher l'application
        if (this.oeuvres_presentes()) {
          this.afficher_oeuvre();
        } // Attendre quelques secondes encore
        else {
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
      },
      // Affichage
      afficher_oeuvre: function afficher_oeuvre() {
        this.ecran = "oeuvre";
      },
      afficher_erreur: function afficher_erreur(message) {
        if (message) {
          this.message_erreur = message;
        }

        this.ecran = "erreur";
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
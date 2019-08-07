/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 */

import { Spinner } from 'spin.js';

Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes () {
  new Vue({
    el: '#container-application',
    template: `<div id="container-application">
      <transition appear name="fade" mode="out-in">
        <accueil v-if="ecran == 'accueil'" :passer_valeur_initiale="this.determiner_valeur_initiale" />
        <oeuvre v-else-if="ecran == 'oeuvre'" :infos="oeuvre_active" />
        <erreur v-else :message="message_erreur" />
      </transition>
    </div>`,
    data: {
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      valeur_initiale: null,
      message_erreur: "Donnees indisponibles"
    },
    // Charger les oeuvres
    created: function () {
      var me = this;
      fetch("/oeuvres").then((data) => {return data.json();} ) // passage des parametres
        .then((res) => { 
          me.oeuvres = res;
          me.oeuvre_active= me.oeuvres[1];
        });
    },
    methods: {

      // Chargement
      charger_application: function (event) {

        // Afficher l'application
        if( this.oeuvres_presentes() ) { this.afficher_oeuvre(); }

        // Attendre quelques secondes encore
        else {
          setTimeout(() => {

            // Afficher l'application
            if( this._oeuvres_presentes() ) { this.afficher_oeuvre(); }

            // Afficher erreur
            else { this.afficher_erreur(); }
          }, 2500);
        }
      },

      // Affichage
      afficher_oeuvre: function () {
        this.ecran = "oeuvre";
      },
      afficher_erreur: function (message) {
        if(message) {
          this.message_erreur = message;
        }
        this.ecran = "erreur";
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


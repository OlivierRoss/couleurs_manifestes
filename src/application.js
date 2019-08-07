/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 */

import Oeuvre from "./elements/oeuvre.js";
import Accueil from "./elements/accueil.js";
import Erreur from "./elements/erreur.js";

require('../sass/mobile.scss');
require('../sass/accueil.scss');

var VueTouch = require('vue-touch');
Vue.use(VueTouch, {name: 'v-touch'}); //https://github.com/vuejs/vue-touch/tree/next

Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes () {
  new Vue({
    el: '#container-application',
    components: {
      'oeuvre': Oeuvre,
      'accueil': Accueil,
      'erreur': Erreur,
    },
    template: `<v-touch id="container-application" v-on:tap="">
      <transition appear name="fade" mode="out-in">
        <accueil v-if="ecran == 'accueil'" :passer_valeur_initiale="this.determiner_valeur_initiale" />
        <oeuvre v-else-if="ecran == 'oeuvre'" :infos="get_oeuvre_active_infos" v-on:update-dimension="update_dimension" :dimension_active="dimension_active"/>
        <erreur v-else :message="message_erreur" />
      </transition>
    </v-touch>`,
    data: {
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      dimension_active: null,
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
        this.dimension_active = 0;
        this.charger_application();
      },
      update_dimension: function (dimension) { 
        if(dimension > 0 ) {
          this.dimension_active = this.dimension_suiv;
        }
        else {
          this.dimension_active = this.dimension_prev;
        }
      },
      get_dimension: function (index) {
        return this.oeuvre_active.dimensions[index];
      },
      set_dimension_active: function (index) {
        this.dimension_active = index;
      },

      // Utils
      oeuvres_presentes: function () {
        return this.oeuvres.length > 0;
      }
    },

    computed: {
      get_oeuvre_active_infos: function () {
        return {
          nom: this.oeuvre_active.dimensions[0].valeur,
          nom_dimension_precedente: this.get_dimension(this.dimension_prev).nom,
          nom_dimension_suivante: this.get_dimension(this.dimension_suiv).nom,
          nom_dimension_active: this.get_nom_dimension_active,
          valeur_dimension_active: this.get_valeur_dimension_active
        }
      },
      get_nom_dimension_active: function () {
        return this.oeuvre_active.dimensions[this.dimension_active].nom;
      },
      get_valeur_dimension_active: function () {
        return this.oeuvre_active.dimensions[this.dimension_active].valeur;
      },
      dimension_prev: function () {
        if(this.dimension_active > 0) {
          return this.dimension_active - 1;
        }
        else {
          return this.oeuvre_active.dimensions.length - 1;
        }
      },
      dimension_suiv: function () {
        if(this.dimension_active < this.oeuvre_active.dimensions.length - 1) {
          return this.dimension_active + 1;
        }
        else {
          return 0;
        }
      }
    }
  });
}

window.onload = lancer_couleurs_manifestes;


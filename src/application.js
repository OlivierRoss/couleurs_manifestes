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
    template: `<div id="container-application">
      <transition appear name="fade" mode="out-in">
        <accueil v-if="ecran == 'accueil'" :passer_valeur_initiale="this.determiner_oeuvre_initiale" />
        <oeuvre v-else-if="ecran == 'oeuvre'" :infos="get_oeuvre_active_infos" v-on:update-dimension="update_dimension" :dimension_active="dimension_active"/>
        <erreur v-else :message="message_erreur" />
      </transition>
    </div>`,
    data: {
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      dimension_active: null,
      message_erreur: "Donnees indisponibles"
    },
    // Charger les oeuvres
    created: function () {
      var me = this;
      fetch("/oeuvres").then((data) => {return data.json();} ) // passage des parametres
        .then((res) => { me.oeuvres = res; });
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
      determiner_oeuvre_initiale: function (valeur) {
        this.oeuvre_active = this.oeuvres[valeur];
        this.dimension_active = this.list_dimensions(this.oeuvre_active)[0];
        this.charger_application();
      },
      update_dimension: function (dimension) { 
        if(dimension > 0 ) {
          this.dimension_active = this.dimension_suiv;
        }
        else {
          this.dimension_active = this.dimension_prec;
        }
      },

      // Utils
      oeuvres_presentes: function () {
        return this.oeuvres.length > 0;
      },
      list_dimensions: function (oeuvre) {
        return Object.keys(oeuvre.dimensions);
      }
    },

    computed: {
      get_oeuvre_active_infos: function () {
        let dim_actives = this.oeuvre_active.dimensions;
        return {
          nom: dim_actives.titre.valeur,
          artiste: dim_actives.artiste.valeur,
          nom_dimension_precedente: this.dimension_prec,
          nom_dimension_suivante: this.dimension_suiv,
          nom_dimension_active: this.dimension_active.nom,
          valeur_dimension_active: dim_actives[this.dimension_active].valeur
        }
      },
      dimension_prec: function () {
        var dimensions = this.list_dimensions(this.oeuvre_active);
        var index_actif = dimensions.findIndex((dim) => { return dim == this.dimension_active; });

        if(index_actif > 0) {
          return dimensions[index_actif - 1];
        }
        else {
          return dimensions[dimensions.length - 1];
        }
      },
      dimension_suiv: function () {
        var dimensions = this.list_dimensions(this.oeuvre_active);
        var index_actif = dimensions.findIndex((dim) => { return dim == this.dimension_active; });

        if(index_actif < dimensions.length - 1) {
          return dimensions[index_actif + 1];
        }
        else {
          return dimensions[0];
        }
      }
    }
  });
}

window.onload = lancer_couleurs_manifestes;


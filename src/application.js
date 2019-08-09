/*
 * TODO 
 * Ajouter logique de selection de la premiere oeuvre
 * Ajouter logique de selection des nouvelles oeuvres
 * Ajouter logique de selection des nouvelles dimensions
 */

import Oeuvre from "./elements/oeuvre.js";
import Accueil from "./elements/accueil.js";
import Erreur from "./elements/erreur.js";
import Interactions from "./elements/interactions.js";

require('../sass/mobile.scss');

import Vue2TouchEvents from 'vue2-touch-events'; //https://www.npmjs.com/package/vue2-touch-events
Vue.use(Vue2TouchEvents);
Vue.config.productionTip = false;

// Creation de l'application
function lancer_couleurs_manifestes () {
  new Vue({
    el: '#container-application',
    components: {
      'oeuvre': Oeuvre,
      'accueil': Accueil,
      'erreur': Erreur,
      'interactions': Interactions
    },
    template: `<div id="container-application">
      <transition appear name="fade" mode="out-in">
        <accueil v-if="ecran == 'accueil'" :passer_valeur_initiale="this.determiner_oeuvre_initiale" />
        <section v-else-if="ecran == 'oeuvre'" class="oeuvres">
          <oeuvre :infos="get_oeuvre_active_infos" v-on:update-dimension="update_dimension" :dimension_active="dimension_active"/>
          <interactions v-on:update-oeuvre="update_oeuvre" v-on:partager="partager"/>
        </section>
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
      partager: function () {
        // TODO ouvrir page /p/HASH
        window.location.href = "/p/43tqreahtrju654e5";
      },
      afficher_erreur: function (message) {
        if(message) {
          this.message_erreur = message;
        }
        this.ecran = "erreur";
      },

      // Comportement
      determiner_oeuvre_initiale: function (valeur) {
        this.set_oeuvre_active(valeur);
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
      update_oeuvre: function (id_oeuvre) {
        id_oeuvre = id_oeuvre || Math.floor(Math.random() * this.oeuvres.length);
        this.set_oeuvre_active(id_oeuvre);
      },

      // Utils
      oeuvres_presentes: function () {
        return this.oeuvres.length > 0;
      },
      list_dimensions: function (oeuvre) {
        return Object.keys(oeuvre.dimensions);
      },
      set_oeuvre_active: function (id_oeuvre, dimension = 0) {
        this.oeuvre_active = this.oeuvres[id_oeuvre];
        this.dimension_active = this.list_dimensions(this.oeuvre_active)[dimension];
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


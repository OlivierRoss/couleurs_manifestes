import Oeuvre from "./elements/oeuvre.js";
import Accueil from "./elements/accueil.js";
import Carte from "./elements/carte.js";
import Erreur from "./elements/erreur.js";
import Interactions from "./elements/interactions.js";

require('../sass/mobile.scss');

import Vue2TouchEvents from 'vue2-touch-events'; //https://www.npmjs.com/package/vue2-touch-events
Vue.use(Vue2TouchEvents);

const RAYON_EN_METRES= 30000;// distance en metres du musee autorise

const LATITUDE_MUSÉE =  45.405102;// en radian
const LONGITUDE_MUSÉE = -71.894653;// en radian

// Creation de l'application
function lancer_couleurs_manifestes () {
  new Vue({
    el: '#container-application',
    components: {
      'oeuvre': Oeuvre,
      'accueil': Accueil,
      'carte': Carte,
      'erreur': Erreur,
      'interactions': Interactions
    },
    template: `<div id="container-application" v-if="a_la_bonne_geo">
      <transition appear name="fade" mode="out-in">
        <accueil v-if="ecran == 'accueil'" v-on:charger-application="charger_application" :oeuvres="oeuvres"/>
        <div id="application" v-if="ecran== 'oeuvre'">
          <oeuvre id="oeuvre" :infos="get_oeuvre_active_infos" :couleur="couleur_active" :src_logo="logo_app" :oeuvres="oeuvres" v-on:set-actif="set_actif" />
          <interactions :infos="get_oeuvre_active_infos" v-bind:parcours="this.parcours" v-bind:temps_debut="this.debut_parcours" v-on:set-actif="set_actif" v-on:partager="partager" :oeuvres="oeuvres" />
        </div>
        <carte v-if="ecran == 'carte'" :image_carte="this.carte_active" v-on:fermer-carte="afficher_oeuvre" />
      </transition>
    </div>
    <div class="erreur_de_geo" v-else>
        <img class="img_erreur_geolocalisation" src="/images/Visuels/Accueil/coma_logo-accueil.svg">
        <div>L'application Couleurs Manifestes doit avoir accès au données de géolocalisation</div>
        <div class="container">
            <div class="vertical-center">
                <button onClick="window.location.reload();">Rafraîchir</button>
            </div>
         </div>
    </div>`,
    data: {
      debut_parcours: null,
      parcours: [],
      ecran: 'accueil',
      oeuvres: [],
      oeuvre_active: null,
      dimension_active: null,
      temps_initial: null,
      image_carte: '/images/Visuels/Autre/coma_plan-temporaire.svg', // TODO modifier dynamiquement avec les oeuvres (au changement)
      temps_transition_carte: 2500,
      message_erreur: "Donnees indisponibles",
      a_la_bonne_geo:''
    },
    created: function () {

      // Charger les oeuvres
      this.get_oeuvres()
        .then(() => { 
          
          // Recharger le parcours
          if(window.parcours) {
            this.parcours = window.parcours.parcours;
            this.charger_application();
          }
        });

      this.temps_initial = this.temps_initial || Date.now();

      //Vérifie la possition gps
      navigator.geolocation.getCurrentPosition((position) => {

        let lati = position.coords.latitude;
        let lon = position.coords.longitude;

        var distance = this.calcul_distance(lati,lon); // Distance en metres

        if(distance <= RAYON_EN_METRES){
          this.a_la_bonne_geo = true;
        }
        else {
          this.a_la_bonne_geo = false;
        }
      });
    },
    methods: {

      calcul_distance: function (lat1,lon1) {

        lat1 = lat1 * (Math.PI/180);//conversion position en radian
        lon1 = lon1 * (Math.PI/180);//conversion position en radian
        let latitude_musée_radian = LATITUDE_MUSÉE * (Math.PI/180);
        let longitude_musée_radian = LONGITUDE_MUSÉE * (Math.PI/180);
        var R = 6371000; // radian de la terre en metres
        var dLat = latitude_musée_radian-lat1;
        var dLon = longitude_musée_radian-lon1;

        //formule de calcule de distance
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(latitude_musée_radian) * Math.cos(lat1) *
            Math.sin(dLon/2) * Math.sin(dLon/2)

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var distance = R * c; // Distance en metres

        return distance;

      },
      // Chargement
      charger_application: function (seed) {

        // Parcours actif
        if(this.parcours.length > 0) {
          let dernier_affichage = this.parcours[this.parcours.length - 1].split("#");
          this.set_actif({
            oeuvre: this.find_oeuvre_by_id_or_alias(dernier_affichage[0]),
            id_dimension: dernier_affichage[1],
            skip_update_parcours: true
          });
        }

        // Nouvelle utilisation
        else {
          this.set_actif( { oeuvre: seed ? seed : -1, skip_update_parcours: true });
          this.set_actif( { id_dimension: this.list_dimensions(this.oeuvre_active)[0] } );
        }

        this.afficher_oeuvre(); 
      },
      get_oeuvres: function () {
        return new Promise ((resolve, reject) => {
          if(this.oeuvres.length > 0) {
            resolve(this.oeuvres);
          }
          else {
            fetch("/oeuvres.json")
              .then((res) => {
                if(!res.ok){
                  console.error(response.statusText);
                  reject(response.statusText);
                }
                else {
                  return res.json();
                }
              })
              .then((oeuvres) => { 
                this.oeuvres = oeuvres;
                resolve(this.oeuvres);
              })
              .catch((err) => {
                console.error(err);
                reject(err);
              });
          }
        });
      },

      // Affichage
      afficher_oeuvre: function () {
        this.ecran = "oeuvre";
      },
      afficher_carte: function () {
        this.ecran = "carte";
      },
      // Historique
      partager: function () {

        // Sauvegarder le parcours
        var obj = {
          parcours: this.parcours,
          temps_initial: this.temps_initial
        };

        fetch("/parcours", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        }).then((data) => { return data.json(); })

        // Charger la nouvelle page
          .then((res) => { 
            window.location.href = "/p/" + res.page_parcours; 
          });
      },

      // Statistiques
      sauver_interaction: function () {
        fetch("/interaction", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({oeuvre: this.oeuvre_active.id, dimension: this.dimension_active.id, timestamp: Date.now()})
        });
      },

      // Comportement
      set_actif: function (opts) {

        // Oeuvre active
        if(opts.oeuvre) {

          // Mettre a jour l'oeuvre
          if(opts.oeuvre == -1){
            this.set_oeuvre_active(this.oeuvres[Math.floor(Math.random() * (this.oeuvres.length - 1))]);
          }
          else {
            this.set_oeuvre_active(opts.oeuvre);
          }

          // Noter le nombre de vues
          this.oeuvre_active.vues = this.oeuvre_active.vues ? this.oeuvre_active.vues + 1 : 1;

          // Mettre a jour la dimension
          let id_dim = opts.id_dimension || this.premiere_dimension(this.oeuvre_active).id;
          let index_dim = this.list_dimensions(this.oeuvre_active).findIndex((dim) => { return id_dim == dim });

          this.dimension_active = this.oeuvre_active.dimensions[index_dim >= 0 ? id_dim : this.premiere_dimension(this.oeuvre_active).id];
        }
        
        // Dimension active
        else if(opts.id_dimension) {
          this.dimension_active = this.oeuvre_active.dimensions[opts.id_dimension];

          // Si footer est charge
          if(this.$children[1]) {
            this.$children[1].cacher_panneaux();
          }
        }

        // Update parcours
        if(!opts.skip_update_parcours) {
          this.parcours.push([this.oeuvre_active.id, this.dimension_active.id].join("#"));

          // Sauver nouvel etat
          this.sauver_interaction();
        }

        // Afficher la carte de transition
        if(opts.oeuvre) this.afficher_carte();
      },

      // Utils
      set_oeuvre_active: function (oeuvre) {
        this.oeuvre_active = oeuvre;
      },
      find_oeuvre_by_id_or_alias: function (id) {
        return this.oeuvres.find((oeuvre) => { return oeuvre.alias.includes(id); });
      },
      list_dimensions: function (oeuvre) {
        return Object.keys(oeuvre.dimensions);
      },
      premiere_dimension: function (oeuvre) {
        return oeuvre.dimensions[this.list_dimensions(oeuvre)[0]];
      }
    },

    computed: {
      carte_active: function () {
        if(this.oeuvre_active.id.match(/L-/)) {
          return "/images/cartes/CoMa-L.svg";
        }
        else {
          return "/images/cartes/CoMa-" + this.oeuvre_active.id.split("-").join("") + ".svg";
        }
      },
      couleur_active: function () {
        return this.oeuvre_active.id.split("-")[0];
      },
      logo_app: function () {
        return "/images/Visuels/Autre/coma_icone-" + this.couleur_active + ".svg";
      },
      get_oeuvre_active_infos: function () {
        return {
          oeuvre: this.oeuvre_active,
          dimension_precedente: this.dimension_precedente,
          dimension_active: this.dimension_active,
          dimension_suivante: this.dimension_suivante
        }
      },
      dimension_precedente: function () {
        var noms_dimensions = this.list_dimensions(this.oeuvre_active);
        var index_actif = noms_dimensions.findIndex((dim) => { return dim == this.dimension_active.id; });

        return this.oeuvre_active.dimensions[noms_dimensions[(index_actif > 0) ? index_actif - 1 : noms_dimensions.length - 1]];
      },
      dimension_suivante: function () {
        var noms_dimensions = this.list_dimensions(this.oeuvre_active);
        var index_actif = noms_dimensions.findIndex((dim) => { return dim == this.dimension_active.id; });

        return this.oeuvre_active.dimensions[noms_dimensions[(index_actif < noms_dimensions.length - 1) ? index_actif + 1 : 0]];
      }
    }
  });
}

window.onload = lancer_couleurs_manifestes;


const _  = require('lodash');
require('../sass/partager.scss');

import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed);

// Creation de l'application
function afficher_page_partager () {
  new Vue({
    el: '#container-partager',
    template: `
      <div id="container-partager">
        <h1><img src="/images/Visuels/Accueil/coma_logo-accueil.svg"></h1>
          <p>
            Couleurs manifestes c'est:<br>
            {{ hashtags_principaux }}
          </p>
        <img class="image-bouton" src="/images/Visuels/Autre/coma_return.svg" v-on:click="window.location.href = '/'">
        <img class="image-bouton" src="/images/Visuels/Autre/coma_facebook.svg" v-on:click="afficher_feed">
      </div>
    `,
    data: {
      oeuvres: [],
      parcours: null
    },
    created: function () {
      this.parcours = window.parcours; // Defini dans window.
      this.get_oeuvres();
    },
    methods: {
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
      afficher_feed: function () {
        return FB.ui({
          method: 'share',
          quote: 'Couleurs manifestes c\'est :' + this.hashtags_principaux,
          hashtag: '#mbasherbrooke',
          href: 'http://mbas.qc.ca/couleurs-manifestes-exposition-permanente/'
        }, function(response){ 
          self.close();
        });
      }
    },
    asyncComputed: {
      hashtags_principaux: async function () {
        var oeuvres = await this.get_oeuvres();

        // Trouver les #
        var hashtags = this.parcours.map((valeur) => {
          var id_oeuvre = valeur.split('#')[0];
          return oeuvres.find((oeuvre) => { return oeuvre.id == id_oeuvre }).hashtags;
        }); 
        
        // Traitement
        hashtags = _.flatten(hashtags);
        hashtags = _.countBy(hashtags);
        hashtags = _.map(hashtags, (compte, nom) => { 
          return {
            nom: nom,
            compte: compte
          }
        });
        hashtags = _.orderBy(hashtags, [(hashtag) => { return hashtag.compte; }], ['desc']);
        hashtags =  _.take(hashtags, 10);
        hashtags =  _.map(hashtags, (hashtag) => { return hashtag.nom; });

        return hashtags.join(", ");
      }
    }
  });
}

window.onload = afficher_page_partager; 

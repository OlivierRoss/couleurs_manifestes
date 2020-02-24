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
            Pour moi, Couleurs manifestes c'était:<br>
            {{ hashtags_principaux }}
          </p>
        <button v-on:click="window.location.href = '/'">Retour</button>
        <button v-on:click="afficher_feed">Facebook</button>
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
        // https://developers.facebook.com/docs/sharing/reference/share-dialog
        return FB.ui({
          method: 'share',
          quote: 'Pour moi, Couleurs manifestes c\'était :' + '',
          hashtag: '#MBAS',
          href: window.location.toString()
        }, function(response){ 
          self.close();
        });
      }
    },
    computed: {
      nombre_oeuvres: function () {
        return this.parcours.reduce((acc, valeur) => {
          var id_oeuvre = valeur.split('#')[0];
          if(!acc.includes(id_oeuvre)) acc.push(id_oeuvre);
          return acc;
        }, []).length;
      },
      nombre_courants: function () {
        return 8;
      },
      nombre_couleurs: function () {
        return this.parcours.reduce((acc, valeur) => {
          var couleur = valeur.split('-')[0];
          if(!acc.includes(couleur)) acc.push(couleur);
          return acc;
        }, []).length;
      },
      hashtags_principaux: function () {
        return null;
      },
      temps_parcours: function () {
        return Math.ceil(((Date.now() - window.temps_initial) / 1000) / 60); // 1000 : en millisecondes, 60 : en minutes
      }
    },
    asyncComputed: {
      nombre_artistes: async function () {
        var oeuvres = await this.get_oeuvres();
        return this.parcours.map((valeur) => {
          var id_oeuvre = valeur.split('#')[0];
          return oeuvres.find((oeuvre) => { return oeuvre.id == id_oeuvre }).artiste;
        }).reduce((acc, artiste) => {
          if(!acc.includes(artiste)) acc.push(artiste);
          return acc;
        }, []).length;
      }
    }
  });
}

window.onload = afficher_page_partager; 

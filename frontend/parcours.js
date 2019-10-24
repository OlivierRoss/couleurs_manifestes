require('../sass/partager.scss');

// Creation de l'application
function afficher_page_partager () {
  new Vue({
    el: '#container-partager',
    template: `
      <div id="container-partager">
        <h1>Partager</h1>
        <ul>
          <li v-for="etape in parcours">{{ etape }}</li>
        </ul>
        <button v-on:click="window.location.href = '/'">Retour</button>
        <button v-on:click="afficher_feed">Partager</button>
      </div>
    `,
    created: function () {
      this.parcours = parcours.parcours; // Defini dans window.
    },
    methods: {
      afficher_feed: function () {
        FB.ui({
          method: 'feed',
          quote: 'test 12',
          link: 'http://mbas.qc.ca/en/home/'
        }, function(response){});
      }
    }
  });
}

window.onload = afficher_page_partager; 

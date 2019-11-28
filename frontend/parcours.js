require('../sass/partager.scss');

// Creation de l'application
function afficher_page_partager () {
  new Vue({
    el: '#container-partager',
    template: `
      <div id="container-partager">
        <h1>Partager</h1>
          <p>
            Lors de ma visite<br>
            j'ai vu {{ this.nombre_oeuvres }} oeuvres
            par 8 artistes.<br>
            j'ai étudié 5 courants<br>
            artistiques se déclinant<br> 
            en 4 couleurs.<br>
            Le tout en {{ this.temps_parcours }} minutes
          </p>
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
          quote: 'J\'ai vu ' + this.parcours.length + ' oeuvres et dimensions',
          link: 'http://mbas.qc.ca/'
        }, function(response){});
      }
    }
  });
}

window.onload = afficher_page_partager; 

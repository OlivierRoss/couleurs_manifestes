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
      </div>
    `,
    created: function () {
      this.parcours = parcours.parcours; // Defini dans window.
    }
  });
}

window.onload = afficher_page_partager; 

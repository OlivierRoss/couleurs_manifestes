require('../sass/statistiques.scss');

function afficher_stats () {
  new Vue({
    el: '#container-partager',
    template: `
    <div id="container-partager">
      <h1>Couleurs Manifestes</h1>
      <h2>Statistiques d'utilisation de l'application</h2>
      <div id="container-graphiques"></div>
    </div>`,
    mounted: function () {
      this.statistiques = window.interactions;
      var graphiques = document.getElementById("container-graphiques");

      for(var statistique in this.statistiques) {
        var wrapper = document.createElement('div');
        wrapper.classList = ["wrapper-graphique"];
        wrapper.id = statistique + "-wrapper";

        var canvas = document.createElement('canvas');
        canvas.id = statistique;
        wrapper.appendChild(canvas);

        // Ajouter au DOM
        graphiques.appendChild(wrapper);
      }
      // Une fois que les elements sont dans le DOM
      setTimeout(this.create_graphs, 0);
    },
    methods: {
      create_graphs: function () {
        for(var statistique in this.statistiques) {
          new Chart(document.getElementById(statistique), {
            type: 'line',
            data: {
              labels: this.statistiques.sessions_quotidiennes.dates,
              datasets: [{
                fill: false,
                label: this.statistiques.sessions_quotidiennes.nom,
                data: this.statistiques.sessions_quotidiennes.valeurs
              }]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'day'
                  }
                }]
              }
            }
          });
        }
      }
    }
  });
}

window.onload = afficher_stats; 

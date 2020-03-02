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

          if(this.statistiques[statistique].type == 'pie') {
            new Chart(document.getElementById(statistique), {
              type: this.statistiques[statistique].type,
              data: {
                labels: this.statistiques[statistique].etiquettes,
                datasets: [{
                  data: this.statistiques[statistique].valeurs,
                  backgroundColor: this.statistiques[statistique].etiquettes.map((v) => { 
                    if(v.match(/^R/)) return "red";
                    else if(v.match(/^J/)) return "yellow";
                    else if(v.match(/^B/)) return "blue";
                    else if(v.match(/^V/)) return "green";
                    else if(v.match(/^L/)) return "pink";
                    else return "gray";
                  })
                }]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: this.statistiques[statistique].nom
                },
                cutoutPercentage: 25
              }
            });
          }

          else {
            new Chart(document.getElementById(statistique), {
              type: this.statistiques[statistique].type,
              data: {
                labels: this.statistiques[statistique].etiquettes,
                datasets: [{
                  fill: false,
                  label: this.statistiques[statistique].nom,
                  data: this.statistiques[statistique].valeurs
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
    }
  });
}

window.onload = afficher_stats; 

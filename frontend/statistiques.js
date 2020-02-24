function afficher_stats () {
  new Vue({
    el: '#container-partager',
    template: `
    <div id="container-partager">
    <div class="chart-container" style="position: relative; height:400px; width:50%">
      <canvas id="myChart" width="100" height="100"></canvas>
    </div>
    </div>`,
    mounted: function () {
      this.interactions = window.interactions;

      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.interactions.sessions_quotidiennes.dates,
          datasets: [{
            fill: false,
            label: this.interactions.sessions_quotidiennes.nom,
            data: this.interactions.sessions_quotidiennes.valeurs
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
  });
}

window.onload = afficher_stats; 

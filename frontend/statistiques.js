function afficher_stats () {
  new Vue({
    el: '#container-partager',
    template: `
      <div id="container-partager">
        Statistiques!!!
      </div>`
  });
}

window.onload = afficher_stats; 

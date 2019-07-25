$("#cercle-accueil").click(() => {
  
  // Cacher l'accueil et afficher l'application
  $("#cercle-accueil").toggle();
  $("#container-application").toggle();
  
  // Mettre en plein écran
  $('#container-application').get(0).requestFullscreen();

})

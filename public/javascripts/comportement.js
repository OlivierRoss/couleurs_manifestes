// Cacher l'accueil et afficher l'application
$("#cercle-accueil").click(function () {

  // Afficher les nouveaux elemens
  $("#cercle-accueil").toggle();
  $("#container-application").toggle();

  // Mettre en plein écran
  $('#container-application').get(0).requestFullscreen();

  ReactDOM.render(React.createElement(Application, null), document.getElementById('container-application'));
});
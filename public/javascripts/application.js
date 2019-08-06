requirejs.config({
  baseUrl: '/javascripts'
});

// Importation des librairies externes
requirejs(["lib/jquery-3.4.1.min"], function () {

  // Importation des librairies internes
  requirejs(["app", "oeuvre", "accueil"], function () {

    // Creation de l'element principal
    ReactDOM.render(React.createElement(Application, null), document.getElementById('container-application'));
  });
});
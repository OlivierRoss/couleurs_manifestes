requirejs.config({
  baseUrl: '/javascripts',
  paths: {
    lib: 'lib'
  }
});

// Importation des librairies externes
requirejs(["lib/jquery-3.4.1.min"], function () {
  // Importation des librairies internes
  requirejs(["comportement", "oeuvre", "app"]);
});
requirejs.config({
  baseUrl: '/javascripts'
});

// Importation des librairies externes
requirejs(["lib/jquery-3.4.1.min"], () => {

  // Importation des librairies internes
  requirejs(["index"], () => {

    // Creation de l'element principal
    //ReactDOM.render( <Application />, document.getElementById('container-application') );
    //vm = new Vue ({
    //  el: '#container-application'
    //});
  });
});




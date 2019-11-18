const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4'); // https://developers.google.com/sheets/api/quickstart/nodejs
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');
const fs = require('fs');
const DONNEES = process.cwd() + process.env.DOSSIER_DONNEES + process.env.FICHIER_DONNEES;

const config = require('../config/parametres');

function get (force_api = false) {

  return new Promise((resolve, reject) => {

    // À partir d'un fichier local
    if(fs.existsSync(DONNEES) && !force_api) {
      fs.readFile(DONNEES, (err, res) => {
        if(err) {
          console.error(err);
          reject(err);
        }
        else { resolve(res); }
      });
    }

    // De l'API
    else { 
      update().then((oeuvres) => { resolve(oeuvres); }); }
  });
}

function update () {
  return extract()
    .then(transform)
    .then(filtrer)
    .then(link)
    .then(save);
}

function extract () {
  return new Promise ((resolve, reject) => {

    // Obtention des authorisations
    get_googleapi_client_auth().then((client) => {

      sheets.spreadsheets.values.get(
        {
          auth: client,
          spreadsheetId: process.env.SHEET_OEUVRES,
          range: process.env.RANGE_OEUVRES
        },
        (err, res) => {
          if (err) {
            console.error('The API returned an error.', err);
            reject(err);
          }
          else { resolve(res.data.values); }
        });
    });
  });
}

function transform (donnees) {

  // TODO Supprimer titre et artiste des dimensions
  return donnees.slice(1).map((ligne) => {
    var oeuvre = {
      dimensions: {}
    };

    // Extraction des dimensions
    ligne.forEach((val_dim, index) => {
      let nom_dim = donnees[0][index];
      let id_dim = nom_dimension_to_id(nom_dim);

      // Cas speciaux
      if(id_dim == 'titre') oeuvre.titre = val_dim;
      if(id_dim == 'artiste') oeuvre.artiste = val_dim;

      // Filtrer les dimensions a afficher
      if(!config.dimensions_a_afficher.includes(id_dim)) return;

      // Sauvegarde des dimensions
      oeuvre.dimensions[id_dim] = {
        id: id_dim,
        nom: nom_dim,
        valeur: val_dim,
        liens: []
      };
    });

    return oeuvre;
  });
}

function filtrer (oeuvres) {
  return oeuvres.filter((oeuvre) => { return !!oeuvre.dimensions.nac });
}

function link (oeuvres_filtrees) {

  // TODO lier oeuvres et non dimensions
  // TODO Associer une valeur au lien selon nombre de points de contact

  // Attribuer des ids a chaque oeuvre
  // TODO Utiliser les numeros de l'expo
  oeuvres_filtrees.forEach((oeuvre, index) => { oeuvre.id = index; });

  // Creer les liens
  oeuvres_filtrees.forEach((oeuvre, index) => {

    // TODO Inserer la logique de la creation de liens entre les oeuvres
    var index_prec_tmp = Math.max(index - 1, 0);
    var index_suiv_tmp = Math.min(index + 1, oeuvres_filtrees.length - 1);

    for(var dimension in oeuvre.dimensions) {
      oeuvre.dimensions[dimension].liens.push( { id: oeuvres_filtrees[index_prec_tmp].id } );
      oeuvre.dimensions[dimension].liens.push( { id: oeuvres_filtrees[index_suiv_tmp].id } );
    }
  });
  return oeuvres_filtrees;
}

function save (oeuvres_liees) {

  // Creer le dossier s'il n'existe pas
  if(!fs.existsSync(process.cwd() + process.env.DOSSIER_DONNEES)) {
    fs.mkdirSync(process.cwd() + process.env.DOSSIER_DONNEES);
  }

  // Ecriture des donnees
  fs.writeFile(DONNEES, JSON.stringify(oeuvres_liees), function(err) {
    if(err) { return console.log(err); }
  });

  return oeuvres_liees;
}

exports.get = get;
exports.update = update;

function get_googleapi_client_auth(response) {
  return auth.getClient({ scopes: scopes });
}

function nom_dimension_to_id (nom) {
  return nom.toLowerCase().replace(/[^a-z0-9]/g,'_');
}

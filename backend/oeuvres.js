const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4'); // https://developers.google.com/sheets/api/quickstart/nodejs
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');
const fs = require('fs');
const DONNEES = process.cwd() + process.env.DOSSIER_DONNEES + process.env.FICHIER_DONNEES;

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
    else { fetch_oeuvres().then((oeuvres) => { resolve(oeuvres); }); }
  });
}

function fetch_oeuvres () {

  // TODO Aller chercher configuration en mm temps
  return new Promise ((resolve, reject) => {

    // Obtention des authorisations
    get_googleapi_client_auth().then((client) => {

      sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: process.env.SHEET_OEUVRES,
        range: process.env.RANGE_OEUVRES
      },
        (err, res) => {
          if (err) {
            console.error('The API returned an error.', err);
            reject(err);
          }

          let oeuvres_brutes = res.data.values;
          var oeuvres_ordonnees = oeuvres_brutes.slice(1).map((informations_oeuvre, index_oeuvre) => {
            var oeuvre_ordonnee = {
              dimensions: {}
            };
            informations_oeuvre.forEach((attribut, index) => {
              let id_dimension = oeuvres_brutes[0][index].toLowerCase().replace(/[^a-z0-9]/g,'_');
              oeuvre_ordonnee.dimensions[id_dimension] = {
                id: id_dimension,
                nom: oeuvres_brutes[0][index],
                valeur: attribut,
                liens: []
              };
            });
            return oeuvre_ordonnee;
          }).filter((oeuvre) => { return oeuvre.dimensions.nac.valeur != ""; });

          var oeuvres_liees = lier(oeuvres_ordonnees);

          to_cache(oeuvres_liees);

          resolve(oeuvres_liees);
        });
    });
  });
}

exports.get = get;
exports.fetch_oeuvres = fetch_oeuvres;

function lier (oeuvres_ordonnees) {

  // Attribuer des ids a chaque oeuvre
  oeuvres_ordonnees.forEach((oeuvre, index) => {
    oeuvre.id = index;
  });

  // Creer les liens
  oeuvres_ordonnees.forEach((oeuvre, index) => {

    // TODO Inserer la logique de la creation de liens entre les oeuvres
    var index_prec_tmp = Math.max(index - 1, 0);
    var index_suiv_tmp = Math.min(index + 1, oeuvres_ordonnees.length - 1);

    for(var dimension in oeuvre.dimensions) {
      oeuvre.dimensions[dimension].liens.push( { id: oeuvres_ordonnees[index_prec_tmp].id, titre: oeuvres_ordonnees[index_prec_tmp].dimensions.titre.valeur } );
      oeuvre.dimensions[dimension].liens.push( { id: oeuvres_ordonnees[index_suiv_tmp].id, titre: oeuvres_ordonnees[index_suiv_tmp].dimensions.titre.valeur } );
    }
  });
  return oeuvres_ordonnees;
}

function to_cache (oeuvres) {

  // Creer le dossier s'il n'existe pas
  if(!fs.existsSync(process.cwd() + process.env.DOSSIER_DONNEES)) {
    fs.mkdirSync(process.cwd() + process.env.DOSSIER_DONNEES);
  }

  // Ecriture des donnees
  fs.writeFile(DONNEES, JSON.stringify(oeuvres), function(err) {
    if(err) { return console.log(err); }
  }); 
}

function get_googleapi_client_auth(response) {
  return auth.getClient({ scopes: scopes });
}

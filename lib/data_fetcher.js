const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4'); // https://developers.google.com/sheets/api/quickstart/nodejs
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');
const fs = require('fs');
const DONNEES = process.cwd() + process.env.FICHIER_DONNEES;

class OeuvresManager {

  get_list (force_api = false) {
    // À partir d'un fichier local
    if(fs.existsSync(DONNEES) && !force_api) {
      return new Promise((resolve, reject) => {
        fs.readFile(DONNEES, (err, res) => {
          if(err) {
            console.error(err);
            reject(err);
          }
          else {
            resolve(res);
          }
        });
      });
    }
    // Aller chercher oeuvres sur Google
    else {
      console.log("Oeuvres from API");
      return this.fetch_oeuvres().then((oeuvres_brutes) => {

        // Transformer lignes en objets manipulables
        var oeuvres_ordonnees = oeuvres_brutes.slice(1).map((informations_oeuvre, index_oeuvre) => {
          var oeuvre_ordonnee = {
            id: index_oeuvre,// TODO mettre a jour selon nomenclature du MBAS
            dimensions: {}
          };
          informations_oeuvre.forEach((attribut, index) => {
            let nom_dimension = oeuvres_brutes[0][index].toLowerCase().replace(/[^a-zA-Z0-9]/g,'_');
            oeuvre_ordonnee.dimensions[nom_dimension] = {
              nom: oeuvres_brutes[0][index],
              valeur: attribut,
              liens: []
            };
          });
          return oeuvre_ordonnee;
        }).filter((oeuvre) => { return oeuvre.dimensions.nac.valeur != ""; });

        // Une fois les oeuvres ordonnees, creer les liens
        var oeuvres_liees = this.lier(oeuvres_ordonnees);

        // Enregistrer les oeuvres liees dans la cache
        this.to_cache(oeuvres_liees);

        return oeuvres_liees;
      });
    }
  }

  fetch_oeuvres () {

    return new Promise ((resolve, reject) => {
      // Obtention des authorisations
      get_googleapi_client_auth().then((client) => {

        // Call a l'api
        console.log(sheets);
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
            // Retour des donnees de l'api
            resolve(res.data.values);
          });
      });
    });
  }

  lier (oeuvres_ordonnees) {
    return oeuvres_ordonnees;
  }

  to_cache (oeuvres) {
    fs.writeFile(DONNEES, JSON.stringify(oeuvres), function(err) {
      if(err) {
        return console.log(err);
      }
    }); 
  }
}

function get_googleapi_client_auth(response) {
  return auth.getClient({ scopes: scopes });
}

module.exports = OeuvresManager;

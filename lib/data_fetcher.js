const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');

// TODO 
// Gerer la cache avec Redis pour eviter des calls a l'api
// la cache devrait se mettre a jour aux heures. Pas plus
// Dnoc deux clefs : oeuvres + last_update

class OeuvresManager {

  get_list () {
    if(false) {

      // Get from redis
      return Promise((resolve, reject) => {
        from_cache().then((oeuvres) => {
          resolve(oeuvres);
        });
      })
    }
    else {

      // Aller chercher oeuvres sur Google
      return this.fetch_oeuvres().then((oeuvres_brutes) => {

        // Transformer lignes en objets manipulables
        var oeuvres_ordonnees = oeuvres_brutes.slice(1).map((informations_oeuvre, index_oeuvre) => {
          return {
            id: index_oeuvre,// TODO mettre a jour selon nomenclature du MBAS
            dimensions: informations_oeuvre.map((attribut, index) => {
              return {
                nom: oeuvres_brutes[0][index],
                valeur: attribut,
                liens: []
              }
            })
          }
        });

        // Une fois les oeuvres ordonnees, creer les liens
        var oeuvres_liees = this.lier(oeuvres_ordonnees);

        // Enregistrer les oeuvres liees dans la cache
        this.to_cache(oeuvres_liees);

        return oeuvres_liees;
      });
    }
  }

  from_cache () {
    return false;
  }

  fetch_oeuvres () {

    return new Promise ((resolve, reject) => {
      // Obtention des authorisations
      get_googleapi_client_auth().then((client) => {

        // Call a l'api
        sheets.spreadsheets.values.get(
          {
            auth: client,
            spreadsheetId: process.env.FICHIER_OEUVRES,
            range: process.env.RANGE_OEUVRES,
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
    return false;
  }
}

function get_googleapi_client_auth(response) {
  return auth.getClient({ scopes: scopes });
}

module.exports = OeuvresManager;

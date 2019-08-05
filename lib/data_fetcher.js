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

    // Get from redis
    if(false) {
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

    /*
    const path = require("path");
    const {google} = require('googleapis');
    const sheets = google.sheets('v4');
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
    const {auth} = require('google-auth-library');
    */

    console.log("fetch_oeuvres");
    return new Promise ((resolve, reject) => {
      get_googleapi_client_auth().then((client) => {
        console.log("client");
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
            console.log("ici");
            resolve(res.data.values);
          });
      });
    });
  }

  ordonner (oeuvres_brutes) {

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

function get_oeuvres () {
  // Retourner Redis

  // Si donnees absentes ou perimees, syncrhonizer
  return synchroniser_oeuvres();
  // TODO Update Redis
}

function synchroniser_oeuvres () {
  return new Promise ((resolve, reject) => {
    get_googleapi_client_auth().then((client) => {
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
          resolve(res.data.values);
        });
    });
  });
}

module.exports.get_all = function () {
  return get_oeuvres().then((tableau_oeuvres) => {

    // Traitement des donnees
    var oeuvres = tableau_oeuvres.slice(1).map((informations_oeuvre, index_oeuvre) => {
      return {
        id: index_oeuvre,// TODO mettre a jour selon nomenclature du MBAS
        dimensions: informations_oeuvre.map((attribut, index) => {
          return {
            nom: tableau_oeuvres[0][index],
            valeur: attribut
          }
        })
      }
    });

    // Creation des liens entre les oeuvres
    var oeuvres_liees = contextualiser(oeuvres);
    return oeuvres_liees;
  });
}

function contextualiser (oeuvres) {
  return oeuvres;
}

module.exports = OeuvresManager;

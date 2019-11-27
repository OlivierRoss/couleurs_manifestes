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
    .then(extract_hashtags)
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

  return donnees.slice(1).map((ligne) => {
    var oeuvre = { dimensions: {}, hashtags: [], collisions: [] };

    // Extraction des dimensions
    ligne.forEach((val_dim, index) => {
      let nom_dim = donnees[0][index];
      let id_dim = nom_dimension_to_id(nom_dim);

      // Cas speciaux
      if(id_dim == 'id') oeuvre.id = val_dim;
      if(id_dim == 'titre') oeuvre.titre = val_dim;
      if(id_dim == 'artiste') oeuvre.artiste = val_dim;

      // Filtrer les dimensions a afficher
      if(!config.dimensions_a_afficher.includes(id_dim)) return;

      // Supprimer les dimensions sans texte
      if(!val_dim || val_dim.match(/^\s*$/)) return;

      // Sauvegarde des dimensions
      oeuvre.dimensions[id_dim] = {
        id: id_dim,
        nom: nom_dim,
        valeur: val_dim,
        hashtags: [],
        collisions:[] 
      };
    });

    return oeuvre;
  });
}

function filtrer (oeuvres) {
  return oeuvres.filter((oeuvre) => { return !!oeuvre.id && Object.keys(oeuvre.dimensions).length > 0 });
}

function extract_hashtags (oeuvres) {

  function extraire_hastags (texte) {
    return texte ? texte.match(/(#[A-zÀ-ú\d]+)/g) : [];
  }

  // Extraction des hashtags
  oeuvres.forEach((oeuvre) => {
    for(var dimension in oeuvre.dimensions) {
      var hashtags = extraire_hastags(oeuvre.dimensions[dimension].valeur);
      if(hashtags && hashtags.length > 0) {
        // Par oeuvre
        oeuvre.hashtags = oeuvre.hashtags.concat(hashtags);

        // Par dimension
        oeuvre.dimensions[dimension].hashtags = hashtags;
      }

      // Supprimer les hashtags de fin
      var dim = oeuvre.dimensions[dimension];
      var index_hashtags = dim.valeur.search(/#\s*\#\s*#\s*/);
      if(index_hashtags != -1) {
        dim.valeur = dim.valeur.substring(0, index_hashtags);
      }
    }
  });

  return oeuvres;
}

function link (oeuvres) {

  // Extraire les collisions
  function nb_collisions (objet1, objet2) {
    var hashtags_communs = [];

    // Toutes les collisions
    objet1.hashtags.forEach((hashtag) => {
      if(objet2.hashtags.includes(hashtag)) hashtags_communs.push(hashtag);
    })
    objet2.hashtags.forEach((hashtag) => {
      if(objet1.hashtags.includes(hashtag)) hashtags_communs.push(hashtag);
    })

    // Supprimer les doublons
    function unique(value, index, self) { 
      return self.indexOf(value) === index;
    }

    var collisions_uniques = hashtags_communs.filter(unique);

    return collisions_uniques.length;
  }

  // Creer les liens par oeuvre
  for(var i = 0; i < oeuvres.length; i++) {
    for(var j = i+1; j < oeuvres.length; j++) {
      
      // Par oeuvres
      var collisions_oeuvres = nb_collisions(oeuvres[i], oeuvres[j]);
      if(collisions_oeuvres > 0) {
        oeuvres[i].collisions.push([oeuvres[j].id, collisions_oeuvres]);
        oeuvres[j].collisions.push([oeuvres[i].id, collisions_oeuvres]);
      }

      // Par dimensions
      for(var dimension in oeuvres[i].dimensions) {
        // Si les dimensions matchent
        if(oeuvres[j].dimensions[dimension]){
          var collisions_dimension = nb_collisions(oeuvres[i].dimensions[dimension], oeuvres[j].dimensions[dimension]);
          if(collisions_dimension > 0) {
            oeuvres[i].dimensions[dimension].collisions.push([oeuvres[j].id, collisions_dimension]);
            oeuvres[j].dimensions[dimension].collisions.push([oeuvres[i].id, collisions_dimension]);
          }
        }
      }
    }
  }

  return oeuvres;
}

function save (oeuvres) {

  // Creer le dossier s' il n'existe pas
  if(!fs.existsSync(process.cwd() + process.env.DOSSIER_DONNEES)) {
    fs.mkdirSync(process.cwd() + process.env.DOSSIER_DONNEES);
  }

  // Ecriture des donnees
  fs.writeFile(DONNEES, JSON.stringify(oeuvres), function(err) {
    if(err) { return console.log(err); }
  });

  return oeuvres;
}

exports.get = get;
exports.update = update;

function get_googleapi_client_auth(response) {
  return auth.getClient({ scopes: scopes });
}

function nom_dimension_to_id (nom) {
  return nom.toLowerCase().replace(/[^a-z0-9]/g,'_');
}

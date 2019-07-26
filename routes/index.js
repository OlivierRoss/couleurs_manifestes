var express = require('express');
var router = express.Router();

const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couleurs Manifestes' });
});

/* GET oeuvres. */
router.get('/oeuvres', (req, res, next) => {
  get_oeuvres(res);
});

module.exports = router;

async function get_googleapi_client_auth (response) {
  return await auth.getClient({ scopes: scopes });
}

async function get_oeuvres (response) {
  const client = await get_googleapi_client_auth();
  sheets.spreadsheets.values.get(
    {
      auth: client,
      spreadsheetId: process.env.FICHIER_OEUVRES,
      range: process.env.RANGE_OEUVRES,
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.', err);
        throw err;
      }
      response.send(res.data.values);
    });
}

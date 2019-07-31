const path = require("path");
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyfile = path.join(__dirname, 'env/couleurs-manifestes-7b61afc4f8a6.json');
const {auth} = require('google-auth-library');

async function get_googleapi_client_auth (response) {
  return await auth.getClient({ scopes: scopes });
}

function get_oeuvres () {
  return new Promise (async (resolve, reject) => {
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
        resolve(res.data.values);
      });
  })


}

module.exports.get_all = function (response) {
  get_oeuvres().then((result) => {
    response.send(result);
  });
}


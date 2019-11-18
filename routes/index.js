var express = require('express');
var router = express.Router();
var passport = require('passport');
var ua_parser = require('ua-parser-js');

import isLoggedIn from '../lib/authentication';

const oeuvres = require("../backend/oeuvres.js");
const parcours = require("../backend/parcours.js");
const statistiques = require("../backend/statistiques.js");

/* APPLICATION */
router.get('/', function(req, res) {
  
  // S'il y avait un cookie
  if(req.session && req.session.hash_parcours){
    parcours.load(req.session.hash_parcours).then((parcours_charge) => {
      res.render('index', {
        parcours: "window['parcours']= " + JSON.stringify(parcours_charge)
      });
    });
  }
  else {
    // TODO Sauvegarder debut session avec ua-parser;
    res.render('index');
  }
});

// Donnees
router.get('/oeuvres.json', (req, res) => {
  oeuvres.get().then((oeuvres) => {
    res.send(oeuvres);
  });
});

router.get('/update', (req, res) => {
  oeuvres.update().then(() => {
    res.send('ok');
  });
});

/* STATISTIQUES */
router.get(/\/p\/\w{32}/, function(req, res) {
  let hash = req.url.split('/')[2];

  parcours.load(hash).then((parcours_charge) => {

    // Au cas ou l'utilisateur reviendrait a l'application
    req.session.hash_parcours = hash;
    req.session.cookie.maxAge = parseInt(process.env.COOKIE_MAX_AGE) || 360000;

    res.render('parcours', {
      parcours: "window.parcours = " + JSON.stringify(parcours_charge)
    });
  });
});

router.post('/parcours', (request, response) => {
  parcours.save(request.body).then((clef) => {
    response.send(clef);
  });
});

router.post('/interaction', (request, response) => {
  statistiques.log_interaction({
    session_id: request.sessionID,
    oeuvre: request.body.oeuvre,
    dimension: request.body.dimension,
    timestamp: request.body.timestamp
  }).then(() => {
    response.status(200).end();
  }).catch((e) => {
    console.log(e);
    response.status(500).end();
  });
});

router.get('/statistiques', isLoggedIn, (req, res) => {
  res.render('statistiques');
});

/* AUTHENTIFICATION */
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/statistiques', failureRedirect: '/login' }));

module.exports = router;

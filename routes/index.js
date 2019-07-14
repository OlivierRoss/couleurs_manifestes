var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couleurs Manifestes' });
});

/* GET application. */
router.get('/application', function(req, res, next) {
  res.render('app', { title: 'Couleurs Manifestes' });
});

module.exports = router;

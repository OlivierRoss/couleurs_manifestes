var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Couleurs Manifestes' });
});

router.get('/oeuvres', (req, res, next) => {
  res.send([{nom: "test_oeuvre"}])
});

module.exports = router;

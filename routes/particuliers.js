var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('particulier/liste');
});

router.get('/edit', function(req, res, next) {
    res.render('particulier/ajoutcours');
  });


module.exports = router;

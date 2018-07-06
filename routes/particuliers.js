var express = require('express');
var router = express.Router();
var particulier = require("../controllers/particulierControllers");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('particulier/liste');
// });

// router.get('/edit', function(req, res, next) {
//     res.render('particulier/ajoutcours');
//   });

//recuperer la liste des users
router.get("/", particulier.create);

//creer un login
router.get("/liste", particulier.list);

//creer un login
router.post("/save", particulier.save);

router.post('/auth', particulier.auth);


router.get('/logout', particulier.logout);



//export du module router
module.exports = router;


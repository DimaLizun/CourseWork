var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/customers',function (req,res) {
   res.render('customers',{title: 'table'})
})

module.exports = router;

const express = require('express');
const router = express.Router();
const coingecko = require("../src/coingecko");

/* GET Coingecko ping. */
router.get('/', function(req, res, next) {
  coingecko.checkStatus(function (statusErr, statusMsg)
  {
	  res.send(statusMsg);
  });
});

module.exports = router;

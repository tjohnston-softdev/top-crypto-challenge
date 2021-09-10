const express = require('express');
const router = express.Router();
const coingecko = require("../src/coingecko");

// GET Coingecko API status.
router.get('/', function(req, res, next) {
  
  coingecko.checkStatus(function (statusMsg)
  {
	  res.send(statusMsg);
  });
  
});

module.exports = router;

const express = require('express');
const router = express.Router();
const coingecko = require("../src/coingecko");
const dataPrep = require("../src/data-prep");


// GET CoinGecko API status.
router.get('/status', function(req, res, next)
{
  coingecko.checkStatus(function (statusMsg)
  {
	  res.send(statusMsg);
  });
  
});


// GET top 100 coins by market cap.
router.get('/top', function(req, res, next)
{
	coingecko.getToplist(function (coinsErr, coinsRes)
	{
		if (coinsErr !== null)
		{
			res.send(coinsErr);
		}
		else
		{
			dataPrep.prepareMarketCap(coinsRes);
			res.send(coinsRes);
		}
	});
});


router.get('/error', function(req, res, next)
{
	var exampleErr = new Error("Something very bad happened.");
	res.send(exampleErr);
});


module.exports = router;

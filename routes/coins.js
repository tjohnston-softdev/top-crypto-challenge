const express = require('express');
const router = express.Router();
const coingecko = require("../src/coingecko");


// Retrieve coin names on startup.
coingecko.getNames(true, function(nameIntlErr, nameIntlRes)
{
	if (nameIntlRes === true)
	{
		console.log("Coin names initialized");
	}
});


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
			res.send(coinsErr.message);
		}
		else
		{
			var first = coinsRes[0];
			console.log(first);
			res.send(coinsRes);
		}
	});
});

// GET names of all coins tracked.
router.get('/names', function(req, res, next)
{
	coingecko.getNames(false, function (namesErr, namesRes)
	{
		if (namesErr !== null)
		{
			res.send(namesErr.message);
		}
		else
		{
			res.send(namesRes);
		}
	});
});


module.exports = router;

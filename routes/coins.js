const express = require('express');
const router = express.Router();
const coingecko = require("../src/coingecko");

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
			res.send(coinsRes);
		}
	});
});


module.exports = router;

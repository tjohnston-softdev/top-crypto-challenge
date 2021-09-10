# Changelog

**./routes/coins.js**
* New file - Will contain all CoinGecko related endpoints.
* Copied endpoint from 'coin-status.js'

---

**./routes/coin-status.js**
* This file is now empty.

---

**./app.js**
* Removed requirement: './routes/coin-status' (coinStatusRouter)
* Added requirement: './routes/coins' (coinsRouter)
* Changed CoinGecko status endpoint route:
	* Before: `/api/coin-status`
	* After: `/api/coins/status`

---

**./public/scripts/local-req.js**
* Corrected status request URL when calling 'requestObj.open'
	* Before: "api/coin-status"
	* After: "api/coins/status"

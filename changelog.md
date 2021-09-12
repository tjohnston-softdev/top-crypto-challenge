# Changelog

**./src/data-prep.js**
* New file - Used to prepare market cap data for transmission.

---

**./routes/index.js**
* Changed bracket style.

---

**./routes/coins.js**
* Added requirement: '../src/data-prep'
* On successful `/top` request:
	* Call 'dataPrep.prepareMarketCap' before sending.
	* Removes unnecessary data from payload.

---

**./public/scripts/market-data.js - renderCurrencyData**
* Replaced local variables with new back-end property names.
	* 'rankNumber' to 'rank'
	* 'priceValue' to 'price'
	* 'hourDiff' to 'hour'
	* 'dayVolume' to 'volume'
	* 'capValue' to 'marketCap'
* Replaced 'image' property with 'imgURL'

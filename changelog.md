# Changelog

**./public/scripts/market-data.js**
* callMarketRequest
	* 'retrievedDataArray' is now a global variable.
	* 'retrievedDataArray' is set to null before new request sent.
	* Removed argument from 'renderCurrencyData' call.
* renderCurrencyData
	* Replaced 'retData' parameter with reference to 'retrievedDataArray'
* definePercentCell
	* Re-structured how positive value text is written.
	* A little more readable.

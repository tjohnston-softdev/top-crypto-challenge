# Changelog

**./src/coingecko.js**
* Renamed 'getToplistURL' function to 'writeToplistURL'
* Declared global variable 'coinsList'
	* Array of all coins trakced on CoinGecko.
	* Kept in memory for name searching.
* Wrote new function 'getNamesList'
	* Performs API request to retrieve all coin names.
	* If initialization is enabled, return True.
	* Otherwise, return array of coins.
	* Result array is saved to memory either way.
* 'getNamesList' is called publicly as 'getNames'

---

**./routes/coins.js**
* Defined `/api/coins/names` endpoint.
	* Calls CoinGecko request to retrieve all names.
	* Refreshes in-memory array.
* Added 'coingecko.getNames' during startup to initialize names set.

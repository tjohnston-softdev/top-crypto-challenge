# Changelog

**./public/scripts/market-data.js**
* Declared global variable 'hideList'
	* Stores the IDs of rows to hide.
	* Based on search results.
	* For testing, Bitcoin and Dogecoin have been hidden.
* Changes to 'renderCurrencyData'
	* Declared variable 'hideView' - Whether current row should be hidden.
	* If 'hideView' is True, 'dataRow' display will be set to "none"

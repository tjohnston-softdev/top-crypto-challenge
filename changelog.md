# Changelog

**./public/scripts/market-data.js**
* Wrote new function 'callSearch'
	* Performs search and updates results.
	* Toggles rows as needed.
* Revised how rows are hidden in 'renderCurrencyData'
	* Now uses 'visibility' instead of 'display'
* Changes to 'initializeMarketTable'
	* Declared 'searchTextbox' variable.
	* Set 'searchTextbox' value to empty in case static HTML fails.
* Removed test values from 'hideList'

---

**./views/index.ejs**
* Added 'onkeyup' event to 'txtSearch'
	* Whenever input is changed, run the 'callSearch' function from 'market-data.js'
* Added empty value property to 'txtSearch'

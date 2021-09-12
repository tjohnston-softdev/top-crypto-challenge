# Changelog

**./public/scripts/market-data.js**
* Wrote new function 'defineSymbolCell'
	* Symbols are now in their own cell.
	* Displayed in uppercase without brackets.
* Removed from 'defineNameCell'
	* 'symbolTxt' parameter.
	* 'symbolElement' variable.
* Changes to 'renderCurrencyData'
	* Removed 'dataObject.symbol' argument for 'defineNameCell' call.
	* Added call to 'defineSymbolCell'
* Changes to 'setHeaderRow'
	* Added "Symbol" column after "Name"

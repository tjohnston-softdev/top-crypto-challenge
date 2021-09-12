# Changelog

**./public/scripts/market-data.js**
* Added 'alpha' property to 'sortObj'
	* Indicates whether column being sorted contains strings.
	* If so, case-sensitivity will be ignored when sorting.
* Changes to 'addColumn'
	* Declared 'alphaFlag' parameter.
	* Set 'data-alpha' on 'sortElement. - Corresponds to 'alphaFlag'
* Changes to 'handleDataSort'
	* Declared 'alphaStatus' variable.
	* Reads alpha value from column and sets accordingly.
* Changes to 'setHeaderRow'
	* Set 'alphaFlag' argument for 'addColumn' calls.
	* Since the 'symbol' column is uppercase, we don't need to set it as alphabet.
* Split 'sortCurrencyData' into:
	* 'performAlphaSort' - Strings (case-insensitive)
	* 'performNumSort' - Numbers

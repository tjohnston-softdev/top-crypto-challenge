# Changelog

**./public/scripts/market-data.js**
* Declared global object 'currencyFormatter' - Used to write currency strings.
* Changed how currency is displayed (defineValueCell)
	* Formats in AUD
	* Cents are optional per-column.
* When calling 'defineValueCell', the 'inclCents' argument is set accordingly.
	* The current price displays cents.
	* Volumes and market caps do not.

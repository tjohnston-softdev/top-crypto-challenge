# Changelog

**./public/scripts/market-data.js**
* When toggling table rows, the 'display' property is now used instead of 'visibility'
	* Prevents hidden rows from creating unnecessary whitespace.
	* There is a proper way to display table row elements.
	* Related to the 'callSearch' and 'renderCurrencyData' functions.

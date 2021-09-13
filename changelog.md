# Changelog

**./public/scripts/market-data.js**
* Moved table definition in the 'initializeMarketTable' function to 'index.ejs'
	* HTML is static and not dynamic.
* Removed the following from 'initializeMarketTable'
	* 'tableDispElement', 'renderedTable' variables.
	* 'setHeaderRow', 'setTableBody' calls.
	* 'searchTextbox' variable - Textbox value is set directly.
* Removed functions:
	* setHeaderRow
	* setTableBody
	* addColumn
* Changes to 'handleDataSort'
	* Removed 'clickEvent' parameter, the click event itself.
	* Added 'sortButton' parameter, the button being clicked.
	* Replaced 'clickEvent.target' with 'sortButton'

---

**./views/index.ejs**
* Data table skeleton is defined here as static HTML
* Moved from '/scripts/market-data.js'

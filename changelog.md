# Changelog

### ./public/scripts/market-data.js

**initializeMarketTable**
* New function.
	* Creates and initializes market data table.
	* Run when the page is first loaded.
	* Split from 'callMarketRequest'

\
**callMarketRequest**
* Moved variables to 'initializeMarketTable'
	* tableDispElement
	* renderedTable' variable. - It was unused up until now.
* Removed 'tableDispElement' emptying.

\
**createDataTable**
* Moved to 'initializeMarketTable'
	* 'tableContainer' variable.
	* 'tableContainer.className' assignment.
* Removed:
	* 'outpEle' parameter.
	* `tableContainer.appendChild`
	* `outpEle.appendChild`
* Renamed:
	* 'retrievedData' parameter to 'retData'
	* 'currencyObject' variable to 'dataObject'
	* 'currencyRow' variable to 'dataRow'
* Changes to 'tableBody' variable:
	* Retrieves existing `<tbody>` element rather than creating a new one.
	* Inner HTML is emptied before data loop begins.

\
**defineHeaderRow**
* Moved function to between 'initializeMarketTable' and 'callMarketRequest'

---

### ./views/index.ejs

**\<body\>**
* Changed `onload` function from 'callMarketRequest' to '

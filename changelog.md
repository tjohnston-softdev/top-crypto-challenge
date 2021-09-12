# Changelog

**./public/scripts/market-data.js**
* Declared 'sortObj' global variable.
	* Name of property to sort by.
	* Which direction (Positive = Desc)
* Wrote new function 'addColumn'
	* Defines column for table.
	* Internally stores corresponding property.
	* Adds sort button if applicable.
* Changed how 'setHeaderRow' defines columns:
	* Before: Looping through names to create static elements.
	* After: Calling 'addColumn' to create dynamic elements.
* Wrote new function 'handleDataSort'
	* Click event for sort button.
	* Makes calls to sort data and refresh table.
* Wrote new function 'sortCurrencyData'
	* Performs the actual sorting of data.
	* Based on stored column and direction.

---

**./public/stylesheets/personal.css**
* Sort buttons are:
	* Hidden by default.
	* Displayed when hovering over the corresponding column.

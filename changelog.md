# Changelog

**./public/scripts/market-data.js - callMarketRequest**
* Renamed existing variables:
	* 'loadElement' to 'loadContElement'
	* 'outputElement' to 'tableDispElement'
* Declared 'tableContElement' variable. Refers to table container element.
	* Hidden during request.
	* Displayed after rendering.

---

**./public/stylesheets/personal.css**
* Removed `#tableDisplay` selector.
* Finally got the scrollbar to work.
	* Changed maximum table height from 50% to 50vh.
* Changed table overflow property to automatic.
	* Will only display Hori or Vert scrollbars when necessary.
	* Not by default
	* Hori bar will not be displayed on full-sized screen.

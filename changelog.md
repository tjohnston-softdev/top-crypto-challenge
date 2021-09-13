
# Changelog

**./views/index.ejs**
* Search controls are now defined here instead of via script.
	* Based on the commented out code from before.
* Added 'name' attribute to search textbox, matching the ID.
* Reduced whitespace between main and sub headings.

---

**./public/scripts/market-data.js - initializeMarketTable**
* Removed variables:
	* searchLabel
	* searchTextbox

---

**./public/stylesheets/personal.css**
* Changed `#tableContainer` display from 'block' to 'none'
	* Now hidden by default.
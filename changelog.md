# Changelog

**./views/index.ejs**
* Changed the structure of table elements.
	* Originally, there was a single `<div>`
	* Now, there are parent `<div>` container, and a child `<div>` for the table itself.

---

**./public/scripts/market-data.js**
* Changed 'outputElement' to retrieve 'tableDisplay' (callMarketRequest)
* Added responsive and border styling to table (createDataTable)

---

**./public/stylesheets/personal.css**
* Styling for table container:
	* Block display
	* Border
	* Maximum height (Does not work yet)
	* Vert scrollbar (Technically works but useless without height limit)
* Styling for table display:
	* Block display
	* Automatic margin
	* Small width restriction for padding.

# Changelog

**./public/scripts/market-data.js**
* New file - Requests CoinGecko market data and displays in a table.

---

**./public/stylesheets/personal.css**
* Load container is hidden at first.
	* It is toggled using JavaScript during the API request.
* Percent differences will be coloured depending on the change:
	* Positive = Green
	* Negative = Red
	* Even = Ignore

---

**./views/index.ejs**
* Added reference to 'market-data.js' script.
* When the page is finished loading, call function to retrieve CoinGecko data.

---

**./routes/coins.js**
* On successful request to `/top`, display the first item to console.
* Used for debugging purposes.

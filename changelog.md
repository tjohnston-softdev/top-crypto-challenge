# Changelog

**./views/index.ejs**
* Changes to 'Refresh' button.
	* Added ID so it can be enabled/disabled programmatically.
	* Starts out as disabled by default.

---

**./public/scripts/market-data.js - callMarketRequest**
* Declared new variable 'refreshButton'
	* Disabled before API request sent.
	* Re-enabled after data is finished rendering.

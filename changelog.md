# Changelog

**./src/coingecko.js - checkApiStatus**
* Removed error parameter from 'requestCallback'
	* Only 'replyMsg' will be sent.
	* The contents will be different depending on if there is an error.

---

**./routes/coin-status.js**
* Removed 'statusErr' callback parameter.
* Added whitespace around the 'coingecko.checkStatus' call.
* Re-wrote header comment:
	* Before: `/* GET Coingecko ping. */`
	* After: `// GET Coingecko API status.`

---

**./routes/index.js**
* Changed global variables from `var` to `const`
* Changed header comment symbols to `/*` to `//`
* Removed 'title' parameter from `res.render`

---

**./views/index.ejs**
* Changed page title and heading to "Top Crypto Challenge"
	* It is now hard-coded instead of using a parameter.
* Changed body text to "Hello World!"

# Changelog

**./src/coingecko.js**
* Wrote new function 'writeRequestError'
	* Used to write message text for HTTP request errors.
	* Includes context description and the flagged message itself.
	* Will also be used for when the coin data itself is requested.
* Changes to 'checkApiStatus'
	* When writing an error message, 'writeRequestError' is called.
	* Restructured how successful reply message is written.

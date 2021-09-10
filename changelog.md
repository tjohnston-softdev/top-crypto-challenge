# Changelog

**./package.json**
* Installed 'async' module.
	* This is temporary for testing purposes.

---

**./src/coingecko.js**
* New file - This is where Coingecko API requests will be made.
* Does not have any complete functions at this stage.
* When you execute this file:
	* Send Ping requests in an infinite loop and display the result message.
	* Indicates if the reply was successful or not.
	* Eventually leads to HTTP 429 results.
	* Rate limit is 50 requests / minute.

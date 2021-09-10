# Changelog

**./public/scripts/local-req.js**
* New file - Sends HTTP request to localhost
	* `GET /api/coin-status`
* Sets a 'loading' message before sending the request.
* Outputs result message.

---

**./views/index.ejs**
* Added a 'Status' button.
	* Retrieves CoinGecko API status.
	* Requests Localhost which, in turn, requests CoinGecko.
	* Used to test local origin HTTP requesting.
* Added new paragraph element to display CoinGecko status.
	* Result from the status button.
	* Starts out as empty.
* Included 'local-req.js' front-end script.
* Changed CSS `href` quotes from single to double.
* Removed blank line at end.
* Added blank line between `<!DOCTYPE html>` and `<html>`

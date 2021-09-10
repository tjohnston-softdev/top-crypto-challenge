# Changelog

**./src/coingecko.js**
* Removed:
	* 'async' library requirement.
	* `asyncModule.forever` call
* Changes to 'checkApiStatus'
	* If there is a request error, the result message will simply be "PING REQUEST ERROR"
	* Removed "RETURN:" prefix from successful reply message.
	* Removed console log.
	* Returns 'replyMsg' regardless of the result.
	* Called publicly as 'checkStatus'

---

**./routes/coin-status.js**
* New file - Handles endpoint for `GET /api/coin-status/`

---

**./app.js**
* Added requirement: './routes/coin-status' (coinStatusRouter)
* Defined `GET /api/coin-status/` endpoint.

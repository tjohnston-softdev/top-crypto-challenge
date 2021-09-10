# Changelog

**./routes/coins.js**
* Corrected 'Coin**G**ecko' capitalization for 'status' comment.
* Changed outer bracket structure for `/status`
* Removed blank line before 'coingecko.checkStatus'
* Defined `/top` endpoint.
	* Retrieves top 100 coins by market value.
	* If there is an error, the message will be sent as a reply.

# Changelog

**./src/coingecko.js**
* Wrote new function 'getToplistURL'
	* Used to write request URL for top 100 coins.
	* It is simply too long to write on a single line.
	* Splitting into parameters makes it more readable.
	* Assumes AUD currency.
* Declared global variable 'topURL'
	* URL string for top 100 coins.
	* Result of 'getToplistURL'
* Wrote new function 'getCoinToplist'
	* Performs API request to retrieve top 100 coins by market cap.
	* Returns error with custom message.
	* Results delivered as JSON.
* Changes to 'writeRequestError' format
	* Before: `Error performing [reqDesc]`
	* After: `Error performing [reqDesc] request.`
* Changes to 'checkApiStatus'
	* Removed full stop from error context argument.
	* Removed dash separator from successful result message.
* 'getCoinToplist' is called publicly as 'getToplist'

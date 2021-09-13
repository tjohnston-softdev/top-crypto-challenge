// CoinGecko API requests.

const needle = require("needle");
const topURL = writeToplistURL();

// Ping status.
function checkApiStatus(requestCallback)
{
	needle.get("https://api.coingecko.com/api/v3/ping", function (pingErr, pingReply)
	{
		var replyMsg = "";
		
		if (pingErr !== null)
		{
			// Error sending request.
			replyMsg = writeRequestError("status check", pingErr.message);
		}
		else
		{
			// Status retrieved.
			replyMsg = pingReply.statusCode + " - " + pingReply.statusMessage;
		}
		
		return requestCallback(replyMsg);
	});
}


// Top 100 by market cap.
function getCoinToplist(requestCallback)
{
	var replyMsg = "";
	
	needle.get(topURL, function (listErr, listReply)
	{
		if (listErr !== null)
		{
			// Error retrieving data.
			replyMsg = writeRequestError("coin toplist", listErr.message);
			return requestCallback(new Error(replyMsg), null);
		}
		else
		{
			// Successful.
			return requestCallback(null, listReply.body);
		}
	});
}

// API error message.
function writeRequestError(reqDesc, flagMsg)
{
	var writeRes = "";
	
	writeRes += "Error performing ";
	writeRes += reqDesc;
	writeRes += " request.\r\n";
	writeRes += flagMsg;
	
	console.log(writeRes);
	
	return writeRes;
}


// Assesmble top 100 URL.
function writeToplistURL()
{
	var urlRes = "";
	
	urlRes += "https://api.coingecko.com/api/v3/coins/markets";
	urlRes += "?vs_currency=aud";
	urlRes += "&order=market_cap_desc";
	urlRes += "&per_page=100&page=1";
	urlRes += "&sparkline=false";
	urlRes += "&price_change_percentage=1h%2C24h%2C7d";
	
	return urlRes;
}


module.exports =
{
	checkStatus: checkApiStatus,
	getToplist: getCoinToplist
};
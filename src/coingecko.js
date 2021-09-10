const needle = require("needle");
const topURL = writeToplistURL();
var coinsList = [];

function checkApiStatus(requestCallback)
{
	needle.get("https://api.coingecko.com/api/v3/ping", function (pingErr, pingReply)
	{
		var replyMsg = "";
		
		if (pingErr !== null)
		{
			replyMsg = writeRequestError("status check", pingErr.message);
		}
		else
		{
			replyMsg = pingReply.statusCode + " - " + pingReply.statusMessage;
		}
		
		return requestCallback(replyMsg);
	});
}


function getCoinToplist(requestCallback)
{
	var replyMsg = "";
	
	needle.get(topURL, function (listErr, listReply)
	{
		if (listErr !== null)
		{
			replyMsg = writeRequestError("coin toplist", listErr.message);
			return requestCallback(new Error(replyMsg), null);
		}
		else
		{
			return requestCallback(null, listReply.body);
		}
	});
}


function getNamesList(intlMode, requestCallback)
{
	var replyMsg = "";
	
	needle.get("https://api.coingecko.com/api/v3/coins/list", function (listErr, listReply)
	{
		if (listErr !== null)
		{
			replyMsg = writeRequestError("coin names list", listErr.message);
			return requestCallback(new Error(replyMsg), null);
		}
		else if (intlMode === true)
		{
			coinsList = listReply.body;
			return requestCallback(null, true);
		}
		else
		{
			coinsList = listReply.body;
			return requestCallback(null, coinsList);
		}
	});
}


function writeRequestError(reqDesc, flagMsg)
{
	var writeRes = "";
	
	writeRes += "Error performing ";
	writeRes += reqDesc;
	writeRes += " request.\r\n";
	writeRes += flagMsg;
	
	return writeRes;
}


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
	getToplist: getCoinToplist,
	getNames: getNamesList
};
const needle = require("needle");

function checkApiStatus(requestCallback)
{
	needle.get("https://api.coingecko.com/api/v3/ping", function (pingErr, pingReply)
	{
		var replyMsg = "";
		
		if (pingErr !== null)
		{
			replyMsg = "PING REQUEST ERROR";
		}
		else
		{
			replyMsg = [pingReply.statusCode, pingReply.statusMessage].join(" - ");
		}
		
		return requestCallback(null, replyMsg);
	});
}


module.exports =
{
	checkStatus: checkApiStatus
};
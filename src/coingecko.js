const asyncModule = require("async");
const needle = require("needle");

asyncModule.forever(checkApiStatus, function()
{
	console.log("X");
});


function checkApiStatus(requestCallback)
{
	needle.get("https://api.coingecko.com/api/v3/ping", function (pingErr, pingReply)
	{
		var replyMsg = "";
		
		if (pingErr !== null)
		{
			replyMsg = "ERROR: " + pingErr.message;
		}
		else
		{
			replyMsg += "RETURN: ";
			replyMsg += [pingReply.statusCode, pingReply.statusMessage].join(" - ");
		}
		
		console.log(replyMsg);
		return requestCallback(null, true);
	});
}
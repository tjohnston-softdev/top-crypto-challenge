const needle = require("needle");

function checkApiStatus(requestCallback)
{
	needle.get("https://api.coingecko.com/api/v3/ping", function (pingErr, pingReply)
	{
		var replyMsg = "";
		
		if (pingErr !== null)
		{
			replyMsg = writeRequestError("status check.", pingErr.message);
		}
		else
		{
			replyMsg = pingReply.statusCode + " - " + pingReply.statusMessage;
		}
		
		return requestCallback(replyMsg);
	});
}


function writeRequestError(reqDesc, flagMsg)
{
	var writeRes = "";
	
	writeRes += "Error performing ";
	writeRes += reqDesc;
	writeRes += "\r\n";
	writeRes += flagMsg;
	
	return writeRes;
}


module.exports =
{
	checkStatus: checkApiStatus
};
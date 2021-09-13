// Performs CoinGecko API status request.

function callStatusRequest()
{
	var outputElement = document.getElementById("lblStatus");
	var requestObj = new XMLHttpRequest();
	
	// Loading message.
	outputElement.innerHTML = "Checking . . .";
	
	// Request callback.
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			// Successful.
			outputElement.innerHTML = requestObj.responseText;
		}
		else if (this.readyState === 4)
		{
			// Failure.
			outputElement.innerHTML = "???";
		}
	};
	
	// Send HTTP request.
	requestObj.open("GET", "api/coins/status");
	requestObj.send();
}
// Performs CoinGecko API status request.

function callStatusRequest()
{
	var outputElement = document.getElementById("lblStatus");
	var requestObject = new XMLHttpRequest();
	
	outputElement.innerHTML = "Checking . . .";
	
	requestObject.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			outputElement.innerHTML = requestObject.responseText;
		}
		else if (this.readyState === 4)
		{
			outputElement.innerHTML = "???";
		}
	};
	
	requestObject.open("GET", "api/coins/status");
	requestObject.send();
}
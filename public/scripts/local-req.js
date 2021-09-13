function callStatusRequest()
{
	var outputElement = document.getElementById("lblStatus");
	var requestObj = new XMLHttpRequest();
	
	outputElement.innerHTML = "Checking . . .";
	
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			outputElement.innerHTML = requestObj.responseText;
		}
		else if (this.readyState === 4)
		{
			outputElement.innerHTML = "???";
		}
	};
	
	requestObj.open("GET", "api/coins/status");
	requestObj.send();
}
function callStatusRequest()
{
	var outputElement = document.getElementById("txtStatus");
	var requestObj = new XMLHttpRequest();
	
	outputElement.innerHTML = "Checking . . .";
	
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			outputElement.innerHTML = requestObj.responseText;
		}
	};
	
	requestObj.open("GET", "api/coins/status");
	requestObj.send();
}
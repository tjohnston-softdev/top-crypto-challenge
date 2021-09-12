var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});
var retrievedDataArray = null;

function initializeMarketTable()
{
	var tableDispElement = document.getElementById("tableDisplay");
	var renderedTable = document.createElement("table");
	var bodyElement = document.createElement("tbody");
	
	renderedTable.className = "table table-responsive table-bordered";
	setHeaderRow(renderedTable);
	bodyElement.id = "marketRows";
	renderedTable.appendChild(bodyElement);
	
	tableDispElement.appendChild(renderedTable);
	callMarketRequest();
}


function setHeaderRow(tblCont)
{
	var colNames = ["No.", "", "Name", "Symbol", "Current Price", "1h", "24h", "7d", "24h Volume", "Market Cap"];
	
	var colIndex = 0;
	var currentCell = null;
	
	var headContainer = document.createElement("thead");
	var headRow = document.createElement("tr");
	
	for (colIndex = 0; colIndex < colNames.length; colIndex = colIndex + 1)
	{
		currentCell = document.createElement("th");
		currentCell.setAttribute("scope", "col");
		currentCell.innerHTML = colNames[colIndex];
		
		headRow.appendChild(currentCell);
	}
	
	headContainer.appendChild(headRow);
	tblCont.appendChild(headContainer);
}




function callMarketRequest()
{
	var loadContElement = document.getElementById("loadContainer");
	var tableContElement = document.getElementById("tableContainer");
	var refreshButton = document.getElementById("btnRefresh");
	
	var requestObj = new XMLHttpRequest();
	
	refreshButton.disabled = true;
	tableContElement.style.display = "none";
	loadContElement.style.display = "block";
	retrievedDataArray = null;
	
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			retrievedDataArray = JSON.parse(requestObj.responseText);
			
			renderCurrencyData();
			loadContElement.style.display = "none";
			tableContElement.style.display = "block";
			refreshButton.disabled = false;
		}
	};
	
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}


function renderCurrencyData()
{
	var loopIndex = 0;
	var dataObject = {};
	var dataRow = null;
	
	var tableBody = document.getElementById("marketRows");
	tableBody.innerHTML = "";
	
	for (loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex = loopIndex + 1)
	{
		dataObject = retrievedDataArray[loopIndex];
		dataRow = document.createElement("tr");
		
		defineNumberCell(dataRow, dataObject.rank);
		defineImageCell(dataRow, dataObject.imgURL, dataObject.name);
		defineNameCell(dataRow, dataObject.name, dataObject.id);
		defineSymbolCell(dataRow, dataObject.symbol);
		defineValueCell(dataRow, dataObject.price, true);
		definePercentCell(dataRow, dataObject.hour);
		definePercentCell(dataRow, dataObject.day);
		definePercentCell(dataRow, dataObject.week);
		defineValueCell(dataRow, dataObject.volume, false);
		defineValueCell(dataRow, dataObject.marketCap, false);
		
		tableBody.appendChild(dataRow);
	}
}


function defineNumberCell(rowObj, numVal)
{
	var cellObj = document.createElement("th");
	
	cellObj.setAttribute("scope", "row");
	cellObj.innerHTML = numVal;
	
	rowObj.appendChild(cellObj);
}


function defineImageCell(rowObj, imgURL, nameTxt)
{
	var cellObj = document.createElement("td");
	var imgElement = document.createElement("img");
	
	imgElement.alt = nameTxt;
	imgElement.width = "20";
	imgElement.height = "20";
	imgElement.src = imgURL;
	
	imgElement.addEventListener("error", function()
	{
		this.src = "/images/default-logo.png";
	});
	
	cellObj.appendChild(imgElement);
	rowObj.appendChild(cellObj);
}


function defineNameCell(rowObj, nameTxt, coinID)
{
	var cellObj = document.createElement("td");
	var linkElement = document.createElement("a");
	
	linkElement.href = "https://www.coingecko.com/coins/" + coinID;
	linkElement.target = "_blank";
	linkElement.innerHTML = nameTxt;
	
	cellObj.appendChild(linkElement);
	rowObj.appendChild(cellObj);
}


function defineSymbolCell(rowObj, symbolTxt)
{
	var cellObj = document.createElement("td");
	cellObj.innerHTML = symbolTxt.toUpperCase();
	rowObj.appendChild(cellObj);
}


function defineValueCell(rowObj, valueAmount, inclCents)
{
	var cellObj = document.createElement("td");
	var preparedCurrency = currencyFormatter.format(valueAmount);
	var dollarCutoff = preparedCurrency.indexOf(".");
	
	if (inclCents === true)
	{
		cellObj.innerHTML = preparedCurrency;
	}
	else
	{
		cellObj.innerHTML = preparedCurrency.substring(0, dollarCutoff);
	}
	
	rowObj.appendChild(cellObj);
}


function definePercentCell(rowObj, percentAmount)
{
	var cellObj = document.createElement("td");
	var percentElement = document.createElement("span");
	var roundVal = percentAmount.toFixed(3);
	
	if (percentAmount > 0)
	{
		percentElement.innerHTML = ["+", roundVal, "%"].join("");
		percentElement.className = "positiveChange";
	}
	else if (percentAmount < 0)
	{
		percentElement.innerHTML = roundVal + "%";
		percentElement.className = "negativeChange";
	}
	else
	{
		percentElement.innerHTML = roundVal + "%";
	}
	
	cellObj.appendChild(percentElement);
	rowObj.appendChild(cellObj);
}
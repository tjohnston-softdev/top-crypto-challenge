var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});

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
	var colNames = ["No.", "", "Name", "Current Price", "1h", "24h", "7d", "24h Volume", "Market Cap"];
	
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
	var retrievedDataArray = null;
	
	var requestObj = new XMLHttpRequest();
	
	refreshButton.disabled = true;
	tableContElement.style.display = "none";
	loadContElement.style.display = "block";
	
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			retrievedDataArray = JSON.parse(requestObj.responseText);
			
			renderCurrencyData(retrievedDataArray);
			loadContElement.style.display = "none";
			tableContElement.style.display = "block";
			refreshButton.disabled = false;
		}
	};
	
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}


function renderCurrencyData(retData)
{
	var loopIndex = 0;
	var dataObject = {};
	
	var rankNumber = null;
	var priceValue = null;
	var hourDiff = null;
	var dayDiff = null;
	var weekDiff = null;
	var dayVolume = null;
	var capValue = null;
	
	var dataRow = null;
	var tableBody = document.getElementById("marketRows");
	
	tableBody.innerHTML = "";
	
	for (loopIndex = 0; loopIndex < retData.length; loopIndex = loopIndex + 1)
	{
		dataObject = retData[loopIndex];
		
		rankNumber = dataObject["market_cap_rank"];
		priceValue = dataObject["current_price"];
		hourDiff = dataObject["price_change_percentage_1h_in_currency"];
		dayDiff = dataObject["price_change_percentage_24h_in_currency"];
		weekDiff = dataObject["price_change_percentage_7d_in_currency"];
		dayVolume = dataObject["total_volume"];
		capValue = dataObject["market_cap"];
		
		dataRow = document.createElement("tr");
		defineNumberCell(dataRow, rankNumber);
		defineImageCell(dataRow, dataObject.image, dataObject.name);
		defineNameCell(dataRow, dataObject.name, dataObject.id, dataObject.symbol);
		defineValueCell(dataRow, priceValue, true);
		definePercentCell(dataRow, hourDiff);
		definePercentCell(dataRow, dayDiff);
		definePercentCell(dataRow, weekDiff);
		defineValueCell(dataRow, dayVolume, false);
		defineValueCell(dataRow, capValue, false);
		
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


function defineNameCell(rowObj, nameTxt, coinID, symbolTxt)
{
	var cellObj = document.createElement("td");
	var linkElement = document.createElement("a");
	var symbolElement = document.createElement("span");
	
	linkElement.href = "https://www.coingecko.com/coins/" + coinID;
	linkElement.target = "_blank";
	linkElement.innerHTML = nameTxt;
	linkElement.className = "namePart";
	
	symbolElement.innerHTML = "(" + symbolTxt.toUpperCase() + ")";
	symbolElement.className = "namePart";
	
	cellObj.appendChild(linkElement);
	//cellObj.appendChild(symbolElement);
	
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
		percentElement.innerHTML = "+" + roundVal + "%";
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
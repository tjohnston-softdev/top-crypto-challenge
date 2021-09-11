var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});

function callMarketRequest()
{
	var loadElement = document.getElementById("loadContainer");
	var outputElement = document.getElementById("tblMarket");
	var retrievedDataArray = null;
	var renderedTable = null;
	var requestObj = new XMLHttpRequest();
	
	outputElement.innerHTML = "";
	loadElement.style.display = "block";
	
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			retrievedDataArray = JSON.parse(requestObj.responseText);
			
			createDataTable(retrievedDataArray, outputElement);
			loadElement.style.display = "none";
		}
	};
	
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}


function createDataTable(retrievedData, outpEle)
{
	var loopIndex = 0;
	var currencyObject = {};
	
	var rankNumber = null;
	var priceValue = null;
	var hourDiff = null;
	var dayDiff = null;
	var weekDiff = null;
	var dayVolume = null;
	var capValue = null;
	
	var currencyRow = null;
	var tableContainer = document.createElement("table");
	var tableBody = document.createElement("tbody");
	
	tableContainer.className = "table";
	defineHeaderRow(tableContainer);
	
	for (loopIndex = 0; loopIndex < retrievedData.length; loopIndex = loopIndex + 1)
	{
		currencyObject = retrievedData[loopIndex];
		
		rankNumber = currencyObject["market_cap_rank"];
		priceValue = currencyObject["current_price"];
		hourDiff = currencyObject["price_change_percentage_1h_in_currency"];
		dayDiff = currencyObject["price_change_percentage_24h_in_currency"];
		weekDiff = currencyObject["price_change_percentage_7d_in_currency"];
		dayVolume = currencyObject["total_volume"];
		capValue = currencyObject["market_cap"];
		
		currencyRow = document.createElement("tr");
		defineNumberCell(currencyRow, rankNumber);
		defineImageCell(currencyRow, currencyObject.image, currencyObject.name);
		defineNameCell(currencyRow, currencyObject.name, currencyObject.id, currencyObject.symbol);
		defineValueCell(currencyRow, priceValue, true);
		definePercentCell(currencyRow, hourDiff);
		definePercentCell(currencyRow, dayDiff);
		definePercentCell(currencyRow, weekDiff);
		defineValueCell(currencyRow, dayVolume, false);
		defineValueCell(currencyRow, capValue, false);
		
		tableBody.appendChild(currencyRow);
	}
	
	tableContainer.appendChild(tableBody);
	outpEle.appendChild(tableContainer);
}


function defineHeaderRow(tblCont)
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
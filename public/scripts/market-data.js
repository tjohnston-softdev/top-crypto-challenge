// Scripting for market data table.

var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});
var retrievedDataArray = null;
var hideList = [];
var sortOptions = {col: "rank", dir: -1, alpha: false};


function initializeMarketTable()
{
	document.getElementById("txtSearch").value = "";
	callMarketRequest();
}


function handleDataSort(sortButton)
{
	var alphaStatus = null;
	
	// Read sort column.
	sortOptions.col = sortButton.getAttribute("data-prop");
	
	// Read alphabet flag.
	sortButton.getAttribute("data-alpha");
	sortOptions.alpha = Boolean(alphaStatus);
	
	if (sortButton.className === "icon-arrow-circle-up")
	{
		// Descending
		sortButton.className = "icon-arrow-circle-down"
		sortOptions.dir = 1;
	}
	else
	{
		// Ascending
		sortButton.className = "icon-arrow-circle-up"
		sortOptions.dir = -1;
	}
	
	sortCurrencyData();
	renderCurrencyData();
}


function callSearch()
{
	var inputElement = document.getElementById("txtSearch");
	var prepKeyword = inputElement.value.trim().toUpperCase();
	hideList = [];
	
	for (var loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex++)
	{
		var dataObject = retrievedDataArray[loopIndex];
		
		var rowID = "row-" + dataObject.id;
		var rowElement = document.getElementById(rowID);
		
		var nameText = dataObject.name.toUpperCase();
		var nameMatch = nameText.indexOf(prepKeyword);
		var symbolMatch = dataObject.symbol.indexOf(prepKeyword);
		var matchFound = false;
		
		if (nameMatch >= 0 && nameMatch < nameText.length)
		{
			matchFound = true;
		}
		else if (symbolMatch >= 0 && symbolMatch < dataObject.symbol.length)
		{
			matchFound = true;
		}
		
		if (matchFound)
		{
			rowElement.style.display = "table-row";
		}
		else
		{
			hideList.push(dataObject.id);
			rowElement.style.display = "none";
		}
		
	}
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
			
			sortCurrencyData();
			renderCurrencyData();
			
			loadContElement.style.display = "none";
			tableContElement.style.display = "block";
			refreshButton.disabled = false;
		}
		else if (this.readyState === 4)
		{
			alert("Error retrieving market cap data");
		}
	};
	
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}



function sortCurrencyData()
{
	if (sortOptions.alpha)
	{
		performAlphaSort();
	}
	else
	{
		performNumSort();
	}
	
	
	if (sortOptions.dir > 0)
	{
		// Descending.
		retrievedDataArray.reverse();
	}
	
}



function performAlphaSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return Boolean(a[sortOptions.col].toLowerCase() > b[sortOptions.col].toLowerCase());
	});
}



function performNumSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return a[sortOptions.col] > b[sortOptions.col];
	});
}



function renderCurrencyData()
{
	var tableBody = document.getElementById("marketRows");
	tableBody.innerHTML = "";
	
	for (var loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex++)
	{
		var dataObject = retrievedDataArray[loopIndex];
		
		var dataRow = document.createElement("tr");
		dataRow.id = "row-" + dataObject.id;
		
		var hideView = hideList.includes(dataObject.id);
		
		// Define row cells.
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
		
		if (hideView)
		{
			dataRow.style.display = "none";
		}
		
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
	
	if (inclCents)
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
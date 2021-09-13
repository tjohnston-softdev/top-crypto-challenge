// Scripting for market data table.

var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});		// Currency string formatting.
var retrievedDataArray = null;																		// Retrieved market data.
var hideList = [];																					// Hide entries from searching.
var sortObj = {col: "rank", dir: -1, alpha: false};													// Saved sort method.


// Initialize table.
function initializeMarketTable()
{
	document.getElementById("txtSearch").value = "";		// In case HTML fails.
	callMarketRequest();									// Retrieve data for first time.
}


// Sort table by column.
function handleDataSort(sortButton)
{
	var alphaStatus = null;
	
	// Read sort column.
	sortObj.col = sortButton.getAttribute("data-prop");
	
	// Read alphabet flag.
	sortButton.getAttribute("data-alpha");
	sortObj.alpha = Boolean(alphaStatus);
	
	
	if (sortButton.className === "icon-arrow-circle-up")
	{
		// Descending
		sortButton.className = "icon-arrow-circle-down"
		sortObj.dir = 1;
	}
	else
	{
		// Ascending
		sortButton.className = "icon-arrow-circle-up"
		sortObj.dir = -1;
	}
	
	// Perform sorting per new specs and refresh table.
	sortCurrencyData();
	renderCurrencyData();
}


// Search for currencies by entered keyword.
function callSearch()
{
	var inputElement = null;
	var prepKeyword = "";
	
	var loopIndex = 0;
	var dataObject = {};
	var rowID = "";
	var rowElement = null;
	var nameText = "";
	var nameMatch = -1;
	var symbolMatch = -1;
	var matchFound = false;
	
	
	// Read search input.
	inputElement = document.getElementById("txtSearch");
	prepKeyword = inputElement.value.trim();
	prepKeyword = prepKeyword.toUpperCase();
	
	// Remove hidden status from rows.
	hideList = [];
	
	
	// Loop through current data set.
	for (loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex = loopIndex + 1)
	{
		// Read current entry.
		dataObject = retrievedDataArray[loopIndex];
		
		// Get current row element.
		rowID = "row-" + dataObject.id;
		rowElement = document.getElementById(rowID);
		
		// Check for match based on name and symbol.
		nameText = dataObject.name.toUpperCase();
		nameMatch = nameText.indexOf(prepKeyword);
		symbolMatch = dataObject.symbol.indexOf(prepKeyword);
		matchFound = false;
		
		
		if (nameMatch >= 0 && nameMatch < nameText.length)
		{
			// Name match.
			matchFound = true;
		}
		else if (symbolMatch >= 0 && symbolMatch < dataObject.symbol.length)
		{
			// Symbol match.
			matchFound = true;
		}
		
		
		if (matchFound === true)
		{
			// Display.
			rowElement.style.display = "table-row";
		}
		else
		{
			// Hide.
			hideList.push(dataObject.id);
			rowElement.style.display = "none";
		}
		
	}
}



// Request market cap data from CoinGecko.
function callMarketRequest()
{
	var loadContElement = document.getElementById("loadContainer");
	var tableContElement = document.getElementById("tableContainer");
	var refreshButton = document.getElementById("btnRefresh");
	
	var requestObj = new XMLHttpRequest();
	
	// Hide table and display load spinner.
	refreshButton.disabled = true;
	tableContElement.style.display = "none";
	loadContElement.style.display = "block";
	
	// Forget existing data.
	retrievedDataArray = null;
	
	// Request callback.
	requestObj.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			// Successful - Display data.
			retrievedDataArray = JSON.parse(requestObj.responseText);
			
			sortCurrencyData();
			renderCurrencyData();
			
			loadContElement.style.display = "none";
			tableContElement.style.display = "block";
			refreshButton.disabled = false;
		}
		else if (this.readyState === 4)
		{
			// Failure - Display message.
			alert("Error retrieving market cap data");
		}
	};
	
	// Send HTTP request.
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}


// Performs data sorting.
function sortCurrencyData()
{
	if (sortObj.alpha === true)
	{
		// Alphabet strings.
		performAlphaSort();
	}
	else
	{
		// Numbers, Other.
		performNumSort();
	}
	
	
	if (sortObj.dir > 0)
	{
		// Reverse sort order to create descending.
		retrievedDataArray.reverse();
	}
	
}


// Sort by alphabet strings.
function performAlphaSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return Boolean(a[sortObj.col].toLowerCase() > b[sortObj.col].toLowerCase());
	});
}


// Sort by other type.
function performNumSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return a[sortObj.col] > b[sortObj.col];
	});
}


// Displays market cap table rows.
function renderCurrencyData()
{
	var loopIndex = 0;
	var dataObject = {};
	var dataRow = null;
	var hideView = false;
	var tableBody = null;
	
	// Empty table rows.
	tableBody = document.getElementById("marketRows");
	tableBody.innerHTML = "";
	
	// Loop through retrieved data set.
	for (loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex = loopIndex + 1)
	{
		// Read current entry and create row.
		dataObject = retrievedDataArray[loopIndex];
		dataRow = document.createElement("tr");
		dataRow.id = "row-" + dataObject.id;
		
		// Check if row should be hidden.
		hideView = hideList.includes(dataObject.id);
		
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
		
		
		if (hideView === true)
		{
			dataRow.style.display = "none";
		}
		
		// Save row.
		tableBody.appendChild(dataRow);
	}
}


// Market cap rank number.
function defineNumberCell(rowObj, numVal)
{
	var cellObj = document.createElement("th");
	
	cellObj.setAttribute("scope", "row");
	cellObj.innerHTML = numVal;
	
	rowObj.appendChild(cellObj);
}


// Currency image.
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
		// If the currency image is missing, use this as a placeholder.
		this.src = "/images/default-logo.png";
	});
	
	cellObj.appendChild(imgElement);
	rowObj.appendChild(cellObj);
}


// Currency name.
function defineNameCell(rowObj, nameTxt, coinID)
{
	var cellObj = document.createElement("td");
	var linkElement = document.createElement("a");
	
	// URL to currency page.
	linkElement.href = "https://www.coingecko.com/coins/" + coinID;
	linkElement.target = "_blank";
	linkElement.innerHTML = nameTxt;
	
	cellObj.appendChild(linkElement);
	rowObj.appendChild(cellObj);
}

// Currency symbol
function defineSymbolCell(rowObj, symbolTxt)
{
	var cellObj = document.createElement("td");
	cellObj.innerHTML = symbolTxt.toUpperCase();
	rowObj.appendChild(cellObj);
}


// $AUD value string.
function defineValueCell(rowObj, valueAmount, inclCents)
{
	var cellObj = document.createElement("td");
	var preparedCurrency = currencyFormatter.format(valueAmount);
	var dollarCutoff = preparedCurrency.indexOf(".");
	
	if (inclCents === true)
	{
		// Write as-is.
		cellObj.innerHTML = preparedCurrency;
	}
	else
	{
		// Remove decimal point.
		cellObj.innerHTML = preparedCurrency.substring(0, dollarCutoff);
	}
	
	rowObj.appendChild(cellObj);
}


// Difference percentage, 3 decimal places.
function definePercentCell(rowObj, percentAmount)
{
	var cellObj = document.createElement("td");
	var percentElement = document.createElement("span");
	var roundVal = percentAmount.toFixed(3);
	
	if (percentAmount > 0)
	{
		// Positive
		percentElement.innerHTML = ["+", roundVal, "%"].join("");
		percentElement.className = "positiveChange";
	}
	else if (percentAmount < 0)
	{
		// Negative.
		percentElement.innerHTML = roundVal + "%";
		percentElement.className = "negativeChange";
	}
	else
	{
		// Even.
		percentElement.innerHTML = roundVal + "%";
	}
	
	cellObj.appendChild(percentElement);
	rowObj.appendChild(cellObj);
}
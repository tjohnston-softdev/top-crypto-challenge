var currencyFormatter = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'});
var retrievedDataArray = null;
var hideList = [];
var sortObj = {col: "rank", dir: -1, alpha: false};

function initializeMarketTable()
{
	document.getElementById("txtSearch").value = "";
	callMarketRequest();
}


function handleDataSort(sortButton)
{
	var alphaStatus = sortButton.getAttribute("data-alpha");
	
	sortObj.col = sortButton.getAttribute("data-prop");
	sortObj.alpha = Boolean(alphaStatus);
	
	if (sortButton.className === "icon-arrow-circle-up")
	{
		sortButton.className = "icon-arrow-circle-down"
		sortObj.dir = 1;
		//retrievedDataArray.reverse();
	}
	else
	{
		sortButton.className = "icon-arrow-circle-up"
		sortObj.dir = -1;
	}
	
	sortCurrencyData();
	renderCurrencyData();
}


function callSearch()
{
	var inputElement = document.getElementById("txtSearch");
	var prepKeyword = "";
	
	var loopIndex = 0;
	var dataObject = {};
	var rowID = "";
	var rowElement = null;
	var nameText = "";
	var nameMatch = -1;
	var symbolMatch = -1;
	var matchFound = false;
	
	prepKeyword = inputElement.value.trim();
	prepKeyword = prepKeyword.toUpperCase();
	hideList = [];
	
	for (loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex = loopIndex + 1)
	{
		dataObject = retrievedDataArray[loopIndex];
		rowID = "row-" + dataObject.id;
		rowElement = document.getElementById(rowID);
		nameText = dataObject.name.toUpperCase();
		nameMatch = nameText.indexOf(prepKeyword);
		symbolMatch = dataObject.symbol.indexOf(prepKeyword);
		matchFound = false;
		
		if (nameMatch >= 0 && nameMatch < nameText.length)
		{
			matchFound = true;
		}
		else if (symbolMatch >= 0 && symbolMatch < dataObject.symbol.length)
		{
			matchFound = true;
		}
		
		if (matchFound === true)
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
	};
	
	requestObj.open("GET", "api/coins/top");
	requestObj.send();
}


function sortCurrencyData()
{
	if (sortObj.alpha === true)
	{
		performAlphaSort();
	}
	else
	{
		performNumSort();
	}
	
	if (sortObj.dir > 0)
	{
		retrievedDataArray.reverse();
	}
	
}


function performAlphaSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return Boolean(a[sortObj.col].toLowerCase() > b[sortObj.col].toLowerCase());
	});
}


function performNumSort()
{
	retrievedDataArray.sort(function(a, b)
	{
		return a[sortObj.col] > b[sortObj.col];
	});
}


function renderCurrencyData()
{
	var loopIndex = 0;
	var dataObject = {};
	var dataRow = null;
	var hideView = false;
	
	var tableBody = document.getElementById("marketRows");
	tableBody.innerHTML = "";
	
	for (loopIndex = 0; loopIndex < retrievedDataArray.length; loopIndex = loopIndex + 1)
	{
		dataObject = retrievedDataArray[loopIndex];
		dataRow = document.createElement("tr");
		hideView = hideList.includes(dataObject.id);
		dataRow.id = "row-" + dataObject.id;
		
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
function prepareMarketCapData(marketArray)
{
	var loopIndex = 0;
	var currentOrig = {};
	var currentPrep = {};
	
	for (loopIndex = 0; loopIndex < marketArray.length; loopIndex = loopIndex + 1)
	{
		currentOrig = marketArray[loopIndex];
		currentPrep = {};
		
		currentPrep["id"] = currentOrig.id;
		currentPrep["rank"] = currentOrig["market_cap_rank"];
		currentPrep["imgURL"] = currentOrig["image"];
		currentPrep["name"] = currentOrig["name"];
		currentPrep["symbol"] = currentOrig.symbol;
		currentPrep["price"] = currentOrig["current_price"];
		currentPrep["hour"] = currentOrig["price_change_percentage_1h_in_currency"];
		currentPrep["day"] = currentOrig["price_change_percentage_24h_in_currency"];
		currentPrep["week"] = currentOrig["price_change_percentage_7d_in_currency"];
		currentPrep["volume"] = currentOrig["total_volume"];
		currentPrep["marketCap"] = currentOrig["market_cap"];
		
		marketArray[loopIndex] = currentPrep;
	}
}



module.exports =
{
	prepareMarketCap: prepareMarketCapData
};
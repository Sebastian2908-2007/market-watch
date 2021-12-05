var select = document.querySelector(".select");
// div holding indice selection
var pickIndexEL = document.querySelector("#popular-indices");
// div holding dynamically generated tickers for a given indice
var tickerSelectEl = document.querySelector("#ticker-pick");
// search button
var button = document.querySelector(".btn");

// loads based on last search
var load = function() {
 var lastTask = localStorage.getItem("last search");

 if(!lastTask) {
     return false;
 }
 lastTask = JSON.parse(lastTask);
 stockSearch(lastTask);
}

// save last value to localStorage
var save = function(searchTerm) {
    localStorage.clear();
    localStorage.setItem("last search", JSON.stringify(searchTerm))
};


var searchBtnHandler = function() {
    var input = document.querySelector(".input")
    if(input.value === "") {
        input.value = "Please enter a ticker";
        return;
    }
    stockSearch(input.value.trim().toUpperCase());
    input.value = "";
   
}

// populates search
var populateSearch = function(search) {
    var financial = search.financialData;
    var details = search.summaryDetail;

    var title = document.querySelector("#results2-title");
    title.textContent = search.symbol;

    var returnOnAssets = document.querySelector("#results2-1");
    returnOnAssets.textContent = "returnOnAssets:" + " " + financial.returnOnAssets.fmt;

    if(financial.returnOnAssets.fmt === undefined) {
        returnOnAssets.textContent = "";
    }

    var debtToEquity = document.querySelector("#results2-2");
    debtToEquity.textContent = "debtToEquity:" + " " + financial.debtToEquity.fmt;

    if( financial.debtToEquity.fmt === undefined) {
        debtToEquity.textContent = "";
    }

    var priceToSales = document.querySelector("#results2-3");
    priceToSales.textContent = "priceToSalesTrailing12Months:" + " " + details.priceToSalesTrailing12Months.fmt;

    if(details.priceToSalesTrailing12Months.fmt === undefined) {
        priceToSales.textContent = "";
    }

    var marketCap = document.querySelector("#results2-4");
    marketCap.textContent = "marketCap:" + " " + details.marketCap.fmt;

    if( details.marketCap.fmt === undefined) {
        marketCap.textContent = "";
    }

    var fiftyTwoWeekHigh = document.querySelector("#results2-5");
    fiftyTwoWeekHigh.textContent = "fiftyTwoWeekHigh:" + " " + details.fiftyTwoWeekHigh.fmt;

    if( details.fiftyTwoWeekHigh.fmt === undefined) {
        fiftyTwoWeekHigh.textContent = "";
    }

    var fiftyTwoWeekLow = document.querySelector("#results2-6");
    fiftyTwoWeekLow.textContent = "fiftyTwoWeekLow:" + " " + details.fiftyTwoWeekLow.fmt;

    if(details.fiftyTwoWeekLow.fmt === undefined) {
        fiftyTwoWeekLow.textContent = "";
    }

    var open = document.querySelector("#results2-7");
    open.textContent = "open:" + " " + details.open.fmt;

    if(details.open.fmt === undefined) {
        open.textContent = "";
    }

    var regularMarketDayHigh = document.querySelector("#results2-8");
    regularMarketDayHigh.textContent = "Day High:" + " " + details.regularMarketDayHigh.fmt;

    if( details.regularMarketDayHigh.fmt === undefined) {
        regularMarketDayHigh.textContent = "";
    }

    var regularMarketDayLow = document.querySelector("#results2-9");
    regularMarketDayLow.textContent = "Day Low:" + " " + details.regularMarketDayLow.fmt;

    if(details.regularMarketDayLow.fmt === undefined) {
        regularMarketDayLow.textContent = "";
    }

    var regularMarketPreviousClose = document.querySelector("#results2-10");
    regularMarketPreviousClose.textContent = "prev/close:" + " " + details.regularMarketPreviousClose.fmt;

    if(details.regularMarketPreviousClose.fmt === undefined) {
        regularMarketPreviousClose.textContent = "";
    }




};



// poulates popular indice section with data
var populateIndice = function(search) {
    var financialData = search.financialData;

    var title = document.querySelector("#results-title");
    title.textContent = search.symbol;

    var ebitdaMargins = document.querySelector("#results1");
    ebitdaMargins.textContent = " ebitdaMargins:" + " " + financialData.ebitdaMargins.fmt;

    if( financialData.ebitdaMargins.fmt === undefined) {
        ebitdaMargins.textContent = "";
    }

    var profitMargins = document.querySelector("#results2"); 
    profitMargins.textContent =  "profitMargins" + " " + financialData.profitMargins.fmt;
    
    if(financialData.profitMargins.fmt === undefined) {
        profitMargins.textContent = "";
    }

    var grossMargins = document.querySelector("#results3");
    grossMargins.textContent = "grossMargins:" + " " + financialData.grossMargins.fmt;

    if(financialData.grossMargins.fmt === undefined){
        grossMargins.textContent = "";
    }

    var operatingCashflow = document.querySelector("#results4");
    operatingCashflow.textContent = " operatingCashflow:" + " " + financialData.operatingCashflow.fmt;

    if(financialData.operatingCashflow.fmt === undefined) {
        operatingCashflow.textContent = "";
    }

    var revenueGrowth = document.querySelector("#results5");
    revenueGrowth.textContent = "revenueGrowth:" + " " + financialData.revenueGrowth.fmt;

    if(financialData.revenueGrowth.fmt === undefined) {
        revenueGrowth.textContent = "";
    }

    var operatingMargins = document.querySelector("#results6");
    operatingMargins.textContent = "operatingMargins:" + " " + financialData.operatingMargins.fmt;

    if( financialData.operatingMargins.fmt === undefined) {
        operatingMargins.textContent = "";
    }
    
    var grossProfits = document.querySelector("#results7");
    grossProfits.textContent = "grossProfits:" + " " + financialData.grossProfits.fmt;

    if(financialData.grossProfits.fmt === undefined) {
        grossProfits.textContent = "";
    }

    var currentPrice = document.querySelector("#results8");
    currentPrice.textContent = "currentPrice:" + " " + "$" +financialData.currentPrice.fmt

    if(financialData.currentPrice.fmt === undefined) {
        currentPrice.textContent = "";
    }

    var website = document.querySelector("#company-web");
    website.textContent = search.summaryProfile.website;
    website.setAttribute("href", search.summaryProfile.website);

    if(search.summaryProfile.website === undefined) {
        website.textContent = "";
    }
    
};





// the code below will populate the ticker select based on choice from pick index select
// populates option field in select element
var populate = function(options) {
	for(i=0; i < options.length; i++) {
		console.log(options[i]);
		var option = document.createElement("option")
        option.classList = "dropdown-item";
		option.textContent = options[i];
		option.setAttribute("value", options[i]);
		select.appendChild(option);
	}
	
	 };

    // gets value of index select and passes to populateTicker();
	var optionHandler = function(event) {

		// when using select and options use this below code for gaining values of value atrribute.
      // event handler for when a indice is picked is picked from select
      var targetChoice = event.target.value;
	       populateTicker(targetChoice);
	        //console.log(targetChoice);
	};

    // event handler for when a company ticker is picked from select
    var tickerPickHandler = function(event) {
        stockSearch(event.target.value);
    };


    // function that calls rapid api yahoo finance for stock info endpoint
    var stockSearch = function(stock) {
        save(stock);
        fetch("https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=" + stock + "&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "d39f89db11msh16973d49f51422ep1ae015jsn8b106df18ec2"
	}
})
.then(response => {
	response.json().then(function(data) {
        // call funtion that prints data
        populateIndice(data);
       populateSearch(data);
       
      
    })
})
.catch(err => {
	console.error(err);
});
    };



// poulates ticker select element and calls stock market data api from rapid api this endpoin gets componies in an index fund (indices)
var populateTicker = function (index) {
	fetch("https://stock-market-data.p.rapidapi.com/market/index/" + index +"", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "stock-market-data.p.rapidapi.com",
			"x-rapidapi-key": "d39f89db11msh16973d49f51422ep1ae015jsn8b106df18ec2"
		}
	})
	.then(response => {
		response.json().then(function(data) {
			populate(data.stocks)
		});
	})
	.catch(err => {
		console.error(err);
	});	
};



// change event for ticker functionality
pickIndexEL.addEventListener("change" ,optionHandler)
tickerSelectEl.addEventListener("change", tickerPickHandler)
// event listener for the search button
button.addEventListener("click", searchBtnHandler);
//stockSearch("ABC");
load();
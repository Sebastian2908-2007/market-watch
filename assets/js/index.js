
// div holding indice selection
var pickIndexEL = document.querySelector("#popular-indices");
// div holding dynamically generated tickers for a given indice
var tickerSelectEl = document.querySelector("#ticker-pick");



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
	
	}

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
        fetch("https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol="+stock+"&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "d39f89db11msh16973d49f51422ep1ae015jsn8b106df18ec2"
	}
})
.then(response => {
	response.json().then(function(data) {
        // call funtion that prints data
  console.log(data.financialData);
    });
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
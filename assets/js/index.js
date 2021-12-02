

var select = document.querySelector(".select");
var indexOptions = document.querySelector(".index-options")
var pagecontentEL = document.querySelector("#popular-indices");
// the code below will populate the ticker select based on choice from pick index select
// populates option field in select element
var populate = function(options) {
	for(i=0; i < options.length; i++) {
		console.log(options[i]);
		var option = document.createElement("option")
		option.textContent = options[i];
		option.setAttribute("value", options[i]);
		select.appendChild(option);
	}
	
	}

    // gets value of index select and passes to populateTicker();
	var optionHandler = function(event) {
		// when using select and options use this below code for gaining values of value atrribute
		var targetChoice = event.target.value;
	populateTicker(targetChoice);
	 console.log(targetChoice);
	};

// poulates ticker select element
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
pagecontentEL.addEventListener("change" ,optionHandler)

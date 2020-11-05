var BuyPage = function() {

  this.name = 'buy';
  this.trackingName = 'Buy Now';

  // Call superclass constructor. Assigns instance to window._page.
  Page.call(this);

  this.joyconsAnim;
  this.amiiboAnim;
}

BuyPage.prototype = Object.create(Page.prototype);
BuyPage.prototype.constructor = BuyPage;

BuyPage.prototype.docReady = function()
{

   // INIT RETAILER MODALS
	var retailersUS = new nclood.Retailers({
		platform: "switch",
		productId: "3bZRWi4rHAmW8cBw4-ynYNHKB7jxb5WL",
		country: "us",
		modalBtnId: "us-retailer"
	});
	if ($('html').attr("lang") == "fr")
	{
		// FRENCH SITE - CA BUTTON
		var retailersCA = new nclood.Retailers({
			platform: "switch",
			productId: "JFfwcHUo31PF7Tn8npgNGfmnbLseVC4v",
			country: "ca",
			hide: "ca_tu",
			modalBtnId: "ca-retailer"
		});
	}
	else
	{
		// ENGLISH SITE - CA BUTTON
		var retailersCA = new nclood.Retailers({
			platform: "switch",
			productId: "JFfwcHUo31PF7Tn8npgNGfmnbLseVC4v",
			country: "ca",
			hide: "t",
			modalBtnId: "ca-retailer"
		});
	}

	document.body.appendChild(retailersUS);
	document.body.appendChild(retailersCA);
}

BuyPage.prototype.winLoaded = function() 
{
	var self = this;
	
	this.getDigitalPrices();

  //Joycons Canvas
	this.joyconsAnim = new CanvasAnimation({
		"animClass": Joycons,
		"exportRootName": "buy_joyCons",
		"canvas": $("#joycon .canvas-wrapper canvas")[0],
		"wrapper": $("#joycon .canvas-wrapper"),
		"anim_container": $("#joycon #joycon-wrapper")[0],
		"scaleToWidth": true
	});
	$(this.joyconsAnim.wrapper)[0].addEventListener("loaded", function()
	{
    self.joyconsAnim.resizeCanvas();
    if($("#joycon-wrapper").hasClass("in-view") && !$("#joycon-wrapper").hasClass("playing"))
    {
			self.joyconsAnim.startTickerListen();
      self.joyconsAnim.exportRoot.play();
      $("#joycon-wrapper").addClass("playing");
    }
  });

  //Amiibo Canvas
	this.amiiboAnim = new CanvasAnimation({
		"animClass": Amiibo,
		"exportRootName": "buy_amiibos",
		"canvas": $("#amiibo .canvas-wrapper canvas")[0],
		"wrapper": $("#amiibo .canvas-wrapper"),
		"anim_container": $("#amiibo #amiibo-wrapper")[0],
		"scaleToWidth": true
	});
	$(this.amiiboAnim.wrapper)[0].addEventListener("loaded", function()
	{
    self.amiiboAnim.resizeCanvas();
    if($("#amiibo-wrapper").hasClass("in-view") && !$("#amiibo-wrapper").hasClass("playing"))
    {
			self.amiiboAnim.startTickerListen();
      self.amiiboAnim.exportRoot.play();
      $("#amiibo-wrapper").addClass("playing");
    }
  });
}

BuyPage.prototype.resize = function() {

  if (this.joyconsAnim)
    this.joyconsAnim.resizeCanvas();

  if (this.amiiboAnim)
    this.amiiboAnim.resizeCanvas();

}

BuyPage.prototype.scroll = function() 
{
	if (this.joyconsAnim && this.joyconsAnim.exportRoot)
	{
		if($("#joycon-wrapper").hasClass("in-view") && !$("#joycon-wrapper").hasClass("playing"))
		{
			this.joyconsAnim.startTickerListen();
			this.joyconsAnim.exportRoot.play();
			$("#joycon-wrapper").addClass("playing");
		}
	}

	if (this.amiiboAnim && this.amiiboAnim.exportRoot)
	{
		if($("#amiibo-wrapper").hasClass("in-view") && !$("#amiibo-wrapper").hasClass("playing"))
		{
			this.amiiboAnim.startTickerListen();
			this.amiiboAnim.exportRoot.play();
			$("#amiibo-wrapper").addClass("playing");
		}
	}

}
BuyPage.prototype.getDigitalPrices = function() {

	var self = this;
	var nsuid = "70010000014158";
	// var nsuid = "70010000001339"; // testing 

	nclood.Accounts.ready(function () 
	{
		// Getting the current user
		var user = nclood.Accounts.currentUser;
		if (user) 
		{
			console.log("price for user")
			//if user is logged in - display personal price
			nclood.eShop.getPrices(nsuid, function (error, prices) 
			{
				console.log(prices);

				if (error || !prices || !prices[nsuid]) return console.log(error || 'Unable to get live prices');

				if (prices[nsuid].regular)
					document.getElementById('logged-in-digital-price').innerHTML = prices[nsuid].regular.amount;

				$('#us-digital-price').css({"display":"none"});
				$('#ca-digital-price').css({"display":"none"});
				$('#logged-in-digital-price').css({"display":""});
			});
		} 
		else 
		{
			$('#logged-in-digital-price').css({"display":"none"});
			$('#us-digital-price').css({"display":""});
			$('#ca-digital-price').css({"display":""});
			console.log("no price for user")
			//if user is not logged in 
			if ($('html').attr("lang") == "en") 
			{
				// English - display US & CA pricing
				nclood.eShop.getPrices(nsuid, function (error, prices) {
					if (error || !prices || !prices[nsuid]) 
							return console.log(error || 'Unable to get live prices');
					if (prices[nsuid].regular)
					{
						document.getElementById('us-digital-price').innerHTML = "US " + prices[nsuid].regular.amount;
					}
				}, { lang: 'en', country: 'US', forceLoggedOut: true});
				nclood.eShop.getPrices(nsuid, function (error, prices) {
					if (error || !prices || !prices[nsuid]) 
							return console.log(error || 'Unable to get live prices');
					if (prices[nsuid].regular)
					{
						document.getElementById('ca-digital-price').innerHTML = "CA " + prices[nsuid].regular.amount;
					}
				}, { lang: 'en', country: 'CA', forceLoggedOut: true});
			}
			else if ($('html').attr("lang") == "fr")
			{
				// French - display CA pricing
				nclood.eShop.getPrices(nsuid, function (error, prices) 
				{
					if (error || !prices || !prices[nsuid]) 
							return console.log(error || 'Unable to get live prices');
					if (prices[nsuid].regular)
					{
						document.getElementById('ca-digital-price').innerHTML = "CA " + prices[nsuid].regular.amount;
					}
				}, { lang: 'fr', country: 'CA', forceLoggedOut: true});
			}
		}
    
		// Run code after logout
		nclood.Accounts.onLogout(function (user) {
			self.getDigitalPrices();
		});
		nclood.Accounts.onLogin(function (user) {
			self.getDigitalPrices();
		});
	});
}
new BuyPage();

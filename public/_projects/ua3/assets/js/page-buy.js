var BuyPage = function() {
    this.trackingName = "buy";
    this.navItemId = "buy";
}

BuyPage.prototype.docReady = function()
{
    var nsuid = "70010000010079";

    // INIT RETAILER MODALS
    var retailersUS = new nclood.Retailers({
        platform: "switch",
        productId: nsuid,
        country: "us",
        modalBtnId: "us-retailer"
    });
    if ($('html').attr("lang") == "fr")
    {
        // FRENCH SITE - CA BUTTON
        var retailersCA = new nclood.Retailers({
            platform: "switch",
            productId: nsuid,
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
            productId: nsuid,
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
}

BuyPage.prototype.resize = function() {


}

BuyPage.prototype.scroll = function() {


}
BuyPage.prototype.getDigitalPrices = function() {

    var self = this;
    var nsuid = "70010000010079";
    var expNsuid = "70050000012782";
    //var nsuid = "70010000014158"; // testing 

    nclood.Accounts.ready(function () 
    {
        // Getting the current user
        var user = nclood.Accounts.currentUser;
        if (user) 
        {
            //console.log("price for user")
            //if user is logged in - display personal price
            nclood.eShop.getPrices([nsuid, expNsuid], function (error, prices) 
            {
                //console.log(prices);

                if (error || !prices || !prices[nsuid]) return console.log(error || 'Unable to get live prices');

                if (prices[nsuid].regular)
                    document.getElementById('logged-in-digital-price').innerHTML = prices[nsuid].regular.amount;
                $('#us-digital-price').css({"display":"none"});
                $('#ca-digital-price').css({"display":"none"});
                $('#logged-in-digital-price').css({"display":""});

                // DLC PRICING
                if (prices[expNsuid].regular)
                    document.getElementById('dlc-logged-in-digital-price').innerHTML = prices[expNsuid].regular.amount;
                $('#dlc-us-digital-price').css({"display":"none"});
                $('#dlc-ca-digital-price').css({"display":"none"});
                $('#dlc-logged-in-digital-price').css({"display":""});
            });
        } 
        else 
        {
            $('#logged-in-digital-price').css({"display":"none"});
            $('#us-digital-price').css({"display":""});
            $('#ca-digital-price').css({"display":""});
            // DLC PRICING
            $('#dlc-logged-in-digital-price').css({"display":"none"});
            $('#dlc-us-digital-price').css({"display":""});
            $('#dlc-ca-digital-price').css({"display":""});

            //console.log("no price for user")
            //if user is not logged in 
            if ($('html').attr("lang") == "en") 
            {
                // English - display US & CA pricing
                nclood.eShop.getPrices([nsuid, expNsuid], function (error, prices) {
                    if (error || !prices || !prices[nsuid]) 
                            return console.log(error || 'Unable to get live prices');
                    if (prices[nsuid].regular)
                    {
                        document.getElementById('us-digital-price').innerHTML = prices[nsuid].regular.amount + " USD/";
                    }
                    // DLC PRICING
                    if (prices[expNsuid].regular)
                    {
                        document.getElementById('dlc-us-digital-price').innerHTML = prices[expNsuid].regular.amount + " USD/";
                    }
                }, { lang: 'en', country: 'US', forceLoggedOut: true});
                nclood.eShop.getPrices([nsuid, expNsuid], function (error, prices) {
                    if (error || !prices || !prices[nsuid]) 
                            return console.log(error || 'Unable to get live prices');
                    if (prices[nsuid].regular)
                    {
                        document.getElementById('ca-digital-price').innerHTML = prices[nsuid].regular.amount + " CAD";
                    }
                    // DLC PRICING
                    if (prices[expNsuid].regular)
                    {
                        document.getElementById('dlc-ca-digital-price').innerHTML = prices[expNsuid].regular.amount + " CAD";
                    }
                }, { lang: 'en', country: 'CA', forceLoggedOut: true});
            }
            else if ($('html').attr("lang") == "fr")
            {
                // French - display CA pricing
                nclood.eShop.getPrices([nsuid, expNsuid], function (error, prices) 
                {
                    if (error || !prices || !prices[nsuid]) 
                            return console.log(error || 'Unable to get live prices');
                    if (prices[nsuid].regular)
                    {
                        document.getElementById('ca-digital-price').innerHTML = prices[nsuid].regular.amount + " CAD";
                    }
                    // DLC PRICING
                    if (prices[expNsuid].regular)
                    {
                        document.getElementById('dlc-ca-digital-price').innerHTML = prices[expNsuid].regular.amount + " CAD";
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
_page = new BuyPage();
  
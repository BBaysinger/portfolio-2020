var DLCPage = function() {
    this.trackingName = "dlc";
    this.navItemId = "dlc";
}

DLCPage.prototype.docReady = function()
{

    // // INIT RETAILER MODALS
    // var retailersUS = new nclood.Retailers({
    //     platform: "switch",
    //     productId: "3bZRWi4rHAmW8cBw4-ynYNHKB7jxb5WL",
    //     country: "us",
    //     modalBtnId: "us-retailer"
    // });
    // if ($('html').attr("lang") == "fr")
    // {
    //     // FRENCH SITE - CA BUTTON
    //     var retailersCA = new nclood.Retailers({
    //         platform: "switch",
    //         productId: "JFfwcHUo31PF7Tn8npgNGfmnbLseVC4v",
    //         country: "ca",
    //         hide: "ca_tu",
    //         modalBtnId: "ca-retailer"
    //     });
    // }
    // else
    // {
    //     // ENGLISH SITE - CA BUTTON
    //     var retailersCA = new nclood.Retailers({
    //         platform: "switch",
    //         productId: "JFfwcHUo31PF7Tn8npgNGfmnbLseVC4v",
    //         country: "ca",
    //         hide: "t",
    //         modalBtnId: "ca-retailer"
    //     });
    // }

    // document.body.appendChild(retailersUS);
    // document.body.appendChild(retailersCA);
}

DLCPage.prototype.winLoaded = function() 
{
    var self = this;
    
    // this.getDigitalPrices();
}

DLCPage.prototype.resize = function() {


}

DLCPage.prototype.scroll = function() {


}

DLCPage.prototype.getDigitalPrices = function() {

    // var self = this;
    // var nsuid = "70010000014158";
    // // var nsuid = "70010000001339"; // testing 

    // nclood.Accounts.ready(function () 
    // {
    //     // Getting the current user
    //     var user = nclood.Accounts.currentUser;
    //     if (user) 
    //     {
    //         console.log("price for user")
    //         //if user is logged in - display personal price
    //         nclood.eShop.getPrices(nsuid, function (error, prices) 
    //         {
    //             console.log(prices);

    //             if (error || !prices || !prices[nsuid]) return console.log(error || 'Unable to get live prices');

    //             if (prices[nsuid].regular)
    //                 document.getElementById('logged-in-digital-price').innerHTML = prices[nsuid].regular.amount;

    //             $('#us-digital-price').css({"display":"none"});
    //             $('#ca-digital-price').css({"display":"none"});
    //             $('#logged-in-digital-price').css({"display":""});
    //         });
    //     } 
    //     else 
    //     {
    //         $('#logged-in-digital-price').css({"display":"none"});
    //         $('#us-digital-price').css({"display":""});
    //         $('#ca-digital-price').css({"display":""});
    //         console.log("no price for user")
    //         //if user is not logged in 
    //         if ($('html').attr("lang") == "en") 
    //         {
    //             // English - display US & CA pricing
    //             nclood.eShop.getPrices(nsuid, function (error, prices) {
    //                 if (error || !prices || !prices[nsuid]) 
    //                         return console.log(error || 'Unable to get live prices');
    //                 if (prices[nsuid].regular)
    //                 {
    //                     document.getElementById('us-digital-price').innerHTML = "US " + prices[nsuid].regular.amount;
    //                 }
    //             }, { lang: 'en', country: 'US', forceLoggedOut: true});
    //             nclood.eShop.getPrices(nsuid, function (error, prices) {
    //                 if (error || !prices || !prices[nsuid]) 
    //                         return console.log(error || 'Unable to get live prices');
    //                 if (prices[nsuid].regular)
    //                 {
    //                     document.getElementById('ca-digital-price').innerHTML = "CA " + prices[nsuid].regular.amount;
    //                 }
    //             }, { lang: 'en', country: 'CA', forceLoggedOut: true});
    //         }
    //         else if ($('html').attr("lang") == "fr")
    //         {
    //             // French - display CA pricing
    //             nclood.eShop.getPrices(nsuid, function (error, prices) 
    //             {
    //                 if (error || !prices || !prices[nsuid]) 
    //                         return console.log(error || 'Unable to get live prices');
    //                 if (prices[nsuid].regular)
    //                 {
    //                     document.getElementById('ca-digital-price').innerHTML = "CA " + prices[nsuid].regular.amount;
    //                 }
    //             }, { lang: 'fr', country: 'CA', forceLoggedOut: true});
    //         }
    //     }
    
    //     // Run code after logout
    //     nclood.Accounts.onLogout(function (user) {
    //         self.getDigitalPrices();
    //     });
    //     nclood.Accounts.onLogin(function (user) {
    //         self.getDigitalPrices();
    //     });
    // });
}
_page = new DLCPage();
  
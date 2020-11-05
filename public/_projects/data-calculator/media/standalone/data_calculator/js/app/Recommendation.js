define([

"../lib/utils/trace"
,
"app/DeviceTypes"

],

function(

trace
,
DeviceTypes

)
{
	var Recommendation = function()
	{
		var _this = this;
		
		this.devicePlanName = jQuery('#dcalc_recommendation_heading');
		/** An overlay with info for GoPhone devices. */
		this.gophoneOverlay = jQuery('#dcalc_recommendation_gophone_overlay');
		/** An overlay with info for the Wireless Home Phone and Internet Device. */
		this.whpidOverlay = jQuery('#dcalc_recommendation_whpid_overlay');
		/** An overlay with info for the Connected Car. */
		this.connectedCarOverlay = jQuery('#dcalc_recommendation_connected_car_overlay');
		/** Copy which displays total gb. */
		this.totalGb = jQuery('#dcalc_recommendation_total_gb');
		/** Displays the total costs which is shared data cost and line charges combined. */
		this.totalEstimate = jQuery('#dcalc_recommendation_total_estimate');
		
		this.element = document.getElementById("dcalc_recommendation_pricing");
		
		this.overlay = jQuery(".dcalc_recommendation_pricing_overlay");
		
		this.row4 = jQuery("#dcalc_recommendation_pricing_row_4");
		
		/** Cost for additional basic and qmps. */
		this.BASIC_COST = 30;
		/** Cost for standalone, laptops, notebooks, mobile hotspots. */
		this.STANDALONE_COST = 20;
		/** Additional costs for tablet and gaming devices. */
		this.TABLET_GAMING_COST = 10;
		
		var type;
		
		this.update = function($nTotalUsage, $sDeviceType)
		{			
			// console.log("Reco Update : ", $nTotalUsage, $sDeviceType);
			this.devicePlanName[0].style.fontSize = "14px";
			
			var agentStr = navigator.userAgent;
			var mode = "";
			if (navigator.appName == 'Microsoft Internet Explorer')
			{
				if (agentStr.indexOf("Trident/5.0") > -1)
				{
					if (agentStr.indexOf("MSIE 7.0") > -1)
					{
						mode = "IE9 Compatibility View";
					}
					else
					{
						mode = "IE9";
					}
				}
				else if (agentStr.indexOf("Trident/4.0") > -1)
				{
					if (agentStr.indexOf("MSIE 7.0") > -1)
					{
						mode = "IE8 Compatibility View";
					}
					else
					{
						mode = "IE8";
					}
				}
				else
				{
					mode = "IE7";
				}
			}
			
			var IELTET8 = (mode.indexOf("IE7") != -1 || mode.indexOf("IE8") != -1);
			
			// GoPhone
			if ($sDeviceType.toLowerCase().indexOf("gophone") != -1)
			{
				this.gophoneOverlay[0].style.display = "block";
				if (!IELTET8) 
				{
					this.gophoneOverlay[0].style.display = "block";
					jQuery(this.gophoneOverlay).animate({"opacity": 1});
				}

				// Hide WHP&ID & Connected Car
				if (IELTET8) {
					this.whpidOverlay[0].style.display = "none";
					this.connectedCarOverlay[0].style.display = "none";
				} else {
					jQuery(this.whpidOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
					jQuery(this.connectedCarOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
				}

				// Update the GoPhone CTA url based on the selected device.
				var ctaElement = document.getElementById("dcalc_ecommendation_gophone_cta");

				if($sDeviceType == DeviceTypes.GOPHONE_SMARTPHONE)
				{
					ctaElement.href = "http://www.att.com/shop/wireless/plans/prepaidplans.html";
				}
				else if($sDeviceType == DeviceTypes.GOPHONE_BASIC_PHONE)
				{
					ctaElement.href = "http://www.att.com/shop/wireless/plans/prepaidplans.html";
				}
				else if($sDeviceType == DeviceTypes.GOPHONE_MOBILE_HOTSPOT)
				{
					ctaElement.href = "http://www.att.com/gomobiledata";
				}
				else if($sDeviceType == DeviceTypes.GOPHONE_TABLET)
				{
					ctaElement.href = "http://www.att.com/gotablet";
				}
			}
			// WHP&I Device
			else if ($sDeviceType.toLowerCase().indexOf("wireless home phone & internet device") != -1)
			{
				// Show WHP&ID
				if (IELTET8) {
					this.whpidOverlay[0].style.display = "block";
				} else {
					this.whpidOverlay[0].style.display = "block";
					jQuery(this.whpidOverlay).animate({"opacity": 1});
				}

				// Hide GoPhone & Connected Car
				if (IELTET8) {
					this.gophoneOverlay[0].style.display = "none";
					this.connectedCarOverlay[0].style.display = "none";
				} else {
					jQuery(this.gophoneOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
					jQuery(this.connectedCarOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
				}
			}
			// Connected Car
			else if ($sDeviceType.toLowerCase().indexOf("connected car wi-fi hotspot") != -1)
			{
				// Show WHP&ID
				if (IELTET8) {
					this.connectedCarOverlay[0].style.display = "block";
				} else {
					this.connectedCarOverlay[0].style.display = "block";
					jQuery(this.connectedCarOverlay).animate({"opacity": 1});
				}

				// Hide GoPhone & WHP&ID
				if (IELTET8) {
					this.gophoneOverlay[0].style.display = "none";
					this.whpidOverlay[0].style.display = "none";
				} else {
					jQuery(this.gophoneOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
					jQuery(this.whpidOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
				}
			}
			else
			{
				// Hide overlays
				if (IELTET8) {
					this.gophoneOverlay[0].style.display = "none";
					this.whpidOverlay[0].style.display = "none";
					this.connectedCarOverlay[0].style.display = "none";
				} else {
					jQuery(this.gophoneOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
					jQuery(this.whpidOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
					jQuery(this.connectedCarOverlay).animate({"opacity": 0}, 300, function(){
						this.style.display = "none";
					});
				}
				
				if($nTotalUsage == 0)
				{
					if (IELTET8) {
						this.overlay[0].style.display = "block";
					} else {
						this.overlay[0].style.display = "block";
						jQuery(this.overlay).animate({"opacity": 1});
					}
				}
				else
				{
					if (IELTET8) {
						this.overlay[0].style.display = "none";
					} else {
						jQuery(this.overlay).animate({"opacity": 0}, 300, function(){
							this.style.display = "none";
						});
					}
				}
			}	
			
			var totalGb = Number($nTotalUsage.toFixed(2));
			var sMonthlyCost;
			var totalEstimate;
			var bStartingFrom = false;
			
			if ($sDeviceType != undefined)
				type = $sDeviceType;
			
			var sPlanAmt;
		
			if (type == DeviceTypes.SMARTPHONE)
			{
				this.devicePlanName[0].innerHTML = "Smartphone Plan";
				
				if (totalGb <= .3)
				{	
					sPlanAmt = '300MB';
					totalEstimate = '20';
				}
				else if (totalGb > .3 && totalGb <= 3)
				{
					sPlanAmt = '3GB';
					totalEstimate = '30';
				}
				else if (totalGb > 3.005 && totalGb <= 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
				else if (totalGb > 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
			}
			
			else if (type == DeviceTypes.BASIC_PHONE)
			{
				this.devicePlanName[0].innerHTML = "Basic Phone Plan";
				
				sPlanAmt = 'Unlimited';
				totalEstimate = '10';
				bStartingFrom = true;
			}
			
			else if (type == DeviceTypes.MOBILE_HOTSPOT_DEVICE)
			{
				this.devicePlanName[0].innerHTML = "Mobile Hotspot Device Plan";				
				
				if (totalGb <= 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
					bStartingFrom = true;
				}
				else if (totalGb > 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
			}
			
			else if (type == DeviceTypes.TABLET)
			{
				this.devicePlanName[0].innerHTML = "Tablet Plan";
					
				if (totalGb <= .25)
				{	
					sPlanAmt = '250MB';
					totalEstimate = '14.99';
				}
				else if (totalGb > .25 && totalGb <= 3)
				{
					sPlanAmt = '3GB';
					totalEstimate = '30';
					bStartingFrom = true;
				}
				else if (totalGb > 3 && totalGb <= 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
				else if (totalGb > 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
			}
			else if (type == DeviceTypes.GAMING_DEVICE)
			{
				this.devicePlanName[0].innerHTML = "Gaming Device Plan";
				
				if (totalGb <= .25)
				{	
					sPlanAmt = '250MB';
					totalEstimate = '14.99';
				}
				else if (totalGb > .25 && totalGb <= 3)
				{
					sPlanAmt = '3GB';
					totalEstimate = '30';
				}
				else if (totalGb > 3 && totalGb <= 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
				else if (totalGb > 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
			}			
			else if (type == DeviceTypes.LAPTOP_NETBOOK)
			{
				this.devicePlanName[0].innerHTML = "Laptop Plan";	
				
				if (totalGb <= 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
					bStartingFrom = true;
				}
				else if (totalGb > 5)
				{
					sPlanAmt = '5GB';
					totalEstimate = '50';
				}
			}
			else if (type == DeviceTypes.ATT_HOME_BASE)
			{
				this.devicePlanName[0].innerHTML = "Wireless Home Internet Plan";	
				
				if (totalGb <= 10)
				{
					sPlanAmt = '10GB';
					totalEstimate = '60';
				}
				else if (totalGb > 10 && totalGb <= 20)
				{
					sPlanAmt = '20GB';
					totalEstimate = '90';
				}
				else if (totalGb > 20 && totalGb <= 30)
				{
					sPlanAmt = '30GB';
					totalEstimate = '120';
				}
				else if (totalGb > 30)
				{
					sPlanAmt = '30GB';
					totalEstimate = '120';
				}
				
			}
			else 
			{
				this.devicePlanName[0].innerHTML = "Select a device to start";
				sPlanAmt = 0;
				totalEstimate = 0;
			}
			
			var row4text;
			
			if (type == DeviceTypes.ATT_HOME_BASE)
			{   
				// row4text = 'Learn more about <a' +
				// ' href="http://www.att.com/shop/wireless/devices/internethomephone.html"' +
				// ' target="_blank">' +
				// 'AT&amp;T Wireless Home Phone<br />and Internet service</a>.';
				row4text = '<sup>&dagger;</sup>Requires an eligible Individual or Family voice plan.';
			}
			else
			{
				row4text = '<sup>&dagger;</sup>Some devices also require an ' +
				'<a href="http://www.att.com/shop/wireless/plans/individualplans.html' + 		
				' target="_top">Individual</a> or<br />' +
				'<a href="http://www.att.com/shop/wireless/plans/familyplans.html"' +
				' target="_top">Family</a> voice plan.';
			}
			
			this.row4[0].innerHTML = row4text;
			
			var sStartingFrom = "";
			if (bStartingFrom) sStartingFrom =
				" <span class='dcalc_starting_from'>starting from</span> ";
		
			this.totalEstimate[0].innerHTML = sStartingFrom + '$' +
				totalEstimate + '/mo<sup>&dagger;</sup>';
			
			this.totalGb[0].innerHTML = sPlanAmt;
			
		}//end update
		
	}
	
	return Recommendation;
	
});

























define([

"../lib/utils/trace"
,
"../lib/utils/utils"
,
"app/GraphView"
,
"app/DeviceTypes"
,
"../lib/utils/signals"
],

function(

trace
,
utils
,
GraphView
,
DeviceTypes
,
signals

)
{
	var GraphControl = function()
	{
		var _this = this;
		
		var _aIncrements = [.2, .25, .3, .5, 1, 1.5, 2, 2.5, 3, 4, 5, 10, 15, 20, 30];//, 40, 50];
		
		var _aPlans;
		
		var _nMax;
		
		var _scale;
		
		var _barTotalHeight = 387;
		
		var _nBlockSize;
		
		var _aDevices = [];

		this.markerClicked = new signals.Signal();
		
		this.view = new GraphView(_aIncrements);
		
		for (var j = 0; j < this.view.incrementMarkers.length; j++)
		{
			jQuery(this.view.incrementMarkers[j].element).click(function(e) {
				
				e.preventDefault();
				
				if (jQuery(e.currentTarget).hasClass("dcalc_increment_marker_clickable"))
				{
					_this.markerClicked.dispatch(e.currentTarget.increment);
				}
				
			});
		
		}
		
		this.fixTo = 2;
				
		this.updateLabels = function($aDevices)
		{
			_aDevices = $aDevices;
		}
		
		this.updateLabelScaling = function($nTotalUsage)
		{   
			var labelLength;
			
			for (var i = 0; i < _aDevices.length; i++)
			{
				var nPercent = _aDevices[i].getRelativeUsage() / _nMax;
				
				labelLength = Math.round(nPercent * _barTotalHeight);
				
			}
			
		}
		
		this.updateDevice = function($sDeviceType)
		{
			this.view.deviceImage.className = "dcalc_graph_device_image " + 
				"dcalc_graph_device_image_" + utils.cleanString($sDeviceType);
				
			_aPlans = DeviceTypes.plans[$sDeviceType];
			
			var j = 0;
			
			for (var i = 0; i < _aIncrements.length; i++)
			{
				if (jQuery.inArray(_aIncrements[i], _aPlans) != -1)
				{
					j++;
					
					this.view.incrementMarkers[i].element.style.display = "";
				}
				else
				{
					this.view.incrementMarkers[i].element.style.display = "none";
				}
				
			}
			
			if ($sDeviceType.toLowerCase().indexOf("basic phone") != -1)
			{
				this.view.unlimitedMarker.style.visibility = "visible";
			}
			else
			{
				this.view.unlimitedMarker.style.visibility = "hidden";
			}
			
			for (var j = 0; j < this.view.incrementMarkers.length; j++)
			{
				var elem = this.view.incrementMarkers[j].element;
				var index = jQuery.inArray(this.view.incrementMarkers[j].increment, _aPlans);
				
				if (index != -1 && index != _aPlans.length-1)
				{
					jQuery(elem).toggleClass("dcalc_increment_marker_clickable", true);
				}
				else
				{
					jQuery(elem).toggleClass("dcalc_increment_marker_clickable", false);
				}
				
			}
			
		}
		
		this.update = function($nTotalUsage, $nFixTo)
		{   
			// Begin browser detection.
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
			// End browser detection.
			
			_nMax = (_aPlans[0]) ? Math.max(5, _aPlans[0]) : 5;
			
			for (var i = 0; i < _aPlans.length ;i++)
			{
				if (_aPlans[i] >= Number($nTotalUsage.toFixed(2)))
				{
					break;
				}
			}
			
			_nMax = (_aPlans[0]) ? Math.max(_nMax, _aPlans[Math.min(i, _aPlans.length-1)]) : 5;
			
			jQuery(this.view.barReflection).stop();
			if ($nTotalUsage <= .1)
			{
				if (IELTET8) {
					this.view.barReflection.style.visibility = "hidden";
				} else {
					jQuery(this.view.barReflection).animate({"opacity": 0}, "slow");
				}
			}
			else
			{
				if (IELTET8) {
					this.view.barReflection.style.visibility = "visible";
				} else {
					jQuery(this.view.barReflection).animate({"opacity": 1}, "slow");
				}
			}
			
			var nPercent = $nTotalUsage / _nMax;
			
			_nBarHeight = Math.min(Math.round(nPercent * _barTotalHeight), _barTotalHeight);
			
			var nFixedFix = Math.min(($nTotalUsage % 1).toString().length - 1, $nFixTo);  
			
			this.view.usageText.innerHTML = $nTotalUsage.toFixed(nFixedFix) + "GB";
			
			if ($nTotalUsage > 10)
			{
				jQuery(this.view.element).toggleClass("dcalc_usage_flag_over_10", true);
			}
			else
			{
				jQuery(this.view.element).toggleClass("dcalc_usage_flag_over_10", false);
			}
			
			for (var j = 0; j < _aIncrements.length; j++)
			{
				if (!_this.view.incrementMarkers[j])
				{
					continue;
				}
				
				var pos = _aIncrements[j] / _nMax * _barTotalHeight;
				var opacity = (_aIncrements[j] > _nMax) ? 0 : 1;
				var bVisibility = (opacity) ? "visible" : "hidden";
				
				if (_aIncrements[j] == _nMax)
				{
					pos -= 7;
				}
				
				if (j == 0)
				{
					pos = Math.max(6, pos);
				}
				
				if (j == 1)
				{
					pos = Math.max(21, pos);
				}
				
				jQuery(_this.view.incrementMarkers[j].tick).stop();
				
				if (pos > 350 || pos < 15)
				{
					if (IELTET8) {
						_this.view.incrementMarkers[j].tick.style.visibility = "hidden";
					} else {
						jQuery(_this.view.incrementMarkers[j].tick).animate({"opacity": 0}, "fast");
					}
				}
				else
				{
					if (IELTET8) {
						_this.view.incrementMarkers[j].tick.style.visibility = "visible";
					} else {
						jQuery(_this.view.incrementMarkers[j].tick).animate({"opacity": 1}, "slow");
					}
				}
				
				jQuery(_this.view.incrementMarkers[j].element).stop();
				
				if (IELTET8)
				{
					_this.view.incrementMarkers[j].element.style.visibility = bVisibility;
					
					jQuery(_this.view.incrementMarkers[j].element).animate({
					   "bottom": Math.max(4, pos - 10) + "px"
					}, "slow");
				}
				else
				{
					jQuery(_this.view.incrementMarkers[j].element).animate({
						"bottom": Math.max(4, pos - 10) + "px"
						,
						"opacity": opacity
					}, "slow");
					
				}
				
			}
			
			jQuery(this.view.bar).stop();
			jQuery(this.view.usageFlag).stop();
			
			jQuery(this.view.bar).animate({"height": _nBarHeight + "px"}, "slow");
			jQuery(this.view.usageFlag).animate({"bottom": _nBarHeight + 34 + "px"}, "slow");
			
			//this.updateLabelScaling(Number($nTotalUsage.toFixed(2)));
			this.updateLabelScaling($nTotalUsage);
			
		}

		this.view.markerClicked.add(function($sNum){
			_this.markerClicked.dispatch($sNum);
		})
		
		this.view.deviceLabelContainer.style.maxHeight = _barTotalHeight + "px";
		
	}
	
	
	
	return GraphControl;
	
});

























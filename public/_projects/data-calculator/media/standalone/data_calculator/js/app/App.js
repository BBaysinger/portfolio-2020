define([

"../lib/utils/trace"
,
"../lib/utils/utils"
,
"../lib/utils/signals"
,
"app/DeviceTypes"
,
"app/GraphControl"
,
"app/UsageTypeControl"
,
"app/Recommendation"
,
"app/MaximumDataModal"
,
"app/PlansModalControl"
,
"app/DeviceSelector"
,
"app/UsageTypes"

],

function(

trace
,
utils
,
signals
,
DeviceTypes
,
GraphControl
,
UsageTypeControl
,
Recommendation
,
MaximumDataModal
,
PlansModal
,
DeviceSelector
,
UsageTypes

)
{
	var App = function()
	{
		var _this = this;
		
		var _aUsageTypes = [];
		
		this.totalUsage = 0;
		
		//this.nMaxUsage = 5;
		
		this.deviceAdded = new signals.Signal();
		
		this.deviceRemoved = new signals.Signal();
		
		this.deviceTypeChanged = new signals.Signal();
		
		this.deviceUsageChanged = new signals.Signal();
		
		this.deviceSelector = new DeviceSelector();
		
		//var _wifiDisclaimer = jQuery(".dcalc_wifi_disclaimer");
		
		var _visitMobileShare = jQuery(".dcalc_visit_mobile_share");

		var _backToDataPlansLink = jQuery(".dcalc_header_back_to_mobile_site");
        
		var _dcalcPlansSeeModal = null;

		var _deviceColumn = document.getElementById("dcalc_slider_column");
		
		var _appWrapper = document.getElementById("dcalc_data_calc_wrapper");
		
		var _deviceContainer = document.createElement("div");

		var _recommendation = new Recommendation();
		
		var _maximumDataModal = new MaximumDataModal();
		
		var _plansModal = new PlansModal();
		
		var _sDeviceType;

		var handleDeviceUsageChanged = function ()
		{
			updateUsage(_sDeviceType);
		}
		
		var updateUsage = function()
		{   
			_dcalcPlansSeeModal = jQuery(".dcalc_plans_see_modal");
			
			_this.totalUsage = 0;
			
			for(i in _aUsageTypes)
			{
				_this.totalUsage += _aUsageTypes[i].getUsage();
			}
			
			_this.graphControl.updateLabels(_aUsageTypes);
			
			_recommendation.update(_this.totalUsage, _sDeviceType);
			
			_this.graphControl.update(_this.totalUsage, 2);
			
			var type = _sDeviceType;//.toLowerCase();
			
			function fadeIn(jQueryElem)
			{
				jQueryElem.css("visibility", "visible");
				
				if (!utils.IELTET8)
				{
					jQueryElem.animate({"opacity":1}, 300);
				}
				
			}
			
			function fadeOut(jQueryElem)
			{
				if (utils.IELTET8)
				{   
					jQueryElem.css("visibility", "hidden");
				}
				else
				{
					jQueryElem.animate({"opacity":0}, 300, function()
					{
						this.style.visibility = "hidden";
					});
				}
			}
			
			if (type.indexOf("GoPhone") == -1) 
			{   
				if (type == DeviceTypes.ATT_HOME_BASE)
				{   
					_maximumDataModal.update(_this.totalUsage, 30, 10, 30);
				}
				else
				{
					_maximumDataModal.update(_this.totalUsage, 5, 15, 5);
				}
			}
			
			if (type.indexOf("GoPhone") == -1)
			{
				_visitMobileShare.animate({"height": 16});
				
				fadeIn(_visitMobileShare);
				
				if (type != DeviceTypes.ATT_HOME_BASE)
				{
					fadeIn(_backToDataPlansLink);
				}
				else
				{
					fadeOut(_backToDataPlansLink);
				}
				//fadeIn(_dcalcPlansSeeModal);
			}
			else
			{
				fadeOut(_visitMobileShare);
				fadeOut(_backToDataPlansLink);
				
				//fadeOut(_dcalcPlansSeeModal);
				
				_visitMobileShare.animate({"height":1}, 600, function() {
					this.style.visibility = "hidden";
				});
				
			}
			
			if (type.indexOf("GoPhone") == -1 && type != DeviceTypes.ATT_HOME_BASE)
			{
				fadeIn(_dcalcPlansSeeModal);
			}
			else
			{
				fadeOut(_dcalcPlansSeeModal);
			}
			
		}
		
		var handleDeviceRemoveClicked = function($controller)
		{
			_this.removeDevice($controller.getIndex());
		}
		
		this.handleGraphMarkerClicked = function($nNum)
		{
			var nNum = $nNum;
			var nPct = 0;
			var leftoverType = null;
			var ltData = null; //lt = leftoverType
			var nLeftover = 0;
			var nTotalBaseUsage = 0;
			_this.totalUsage = 0;
			
			for(i in _aUsageTypes)
			{
				var item = _aUsageTypes[i];
				if(item.numTypes > 1) item.setType(0);
				var itemData = item.getTypeData();
				
				nTotalBaseUsage += itemData.base_unit_amount * itemData.unit_size;
			}
			
			nPct = nNum / nTotalBaseUsage;
			
			// Sort by usage types by unit_size, ascending.
			_aUsageTypes.sort(function(a, b){
				return a.getTypeData().unit_size - b.getTypeData().unit_size;
			});
			// Save the one with the lowest unit size to have as fine 
			// control as possible for the necessary adjustment.
			leftoverType = _aUsageTypes[0];
			ltData = leftoverType.getTypeData();
			leftoverType.view.slider.updateValue(0);

			// Set the value of all the usage types EXCEPT the one with the lowest unit size.
			// There will be an unknown amount leftover data which we'll fill with that one.
			for(var i = 1; i < _aUsageTypes.length; i++)
			{
				var item = _aUsageTypes[i];
				var itemData = item.getTypeData();
				var base = (itemData.base_unit_amount * itemData.unit_size) / (itemData.max_units * itemData.unit_size);

				item.view.slider.updateValue( base * nPct );
			}
			updateUsage();
			
			// NOW figure the necessary amount to meet the requested total data and set the one with lowest unit size accordingly.
			nLeftover = (nNum - _this.totalUsage) / ltData.unit_size;
			leftoverType.view.slider.updateValue(nLeftover / ltData.max_units);
			updateUsage();
		}
		
		this.removeUsageType = function ($nIndex)
		{
			_aUsageTypes[$nIndex].kill();
			
			_aUsageTypes.splice($nIndex, 1);
			
			this.updateIframeHeight();
			
		}
		
		this.updateIframeHeight = function()
		{
			function delayedUpdateIframeHeight()
			{
				var parentWindow = window.parent.document.getElementById("dcalc_app_window");
				if (parentWindow) parentWindow.style.height = document.body.scrollHeight + "px";
			}
			
			setTimeout(delayedUpdateIframeHeight, 10);
		}
		
		this.addUsageType = function ($sType, $aUsageData)
		{
			var typeControl = new UsageTypeControl(_aUsageTypes.length, $sType, $aUsageData);
			var device = _aUsageTypes[_aUsageTypes.length] = typeControl;
			
			device.usageChanged.add(handleDeviceUsageChanged);
			_deviceContainer.appendChild(device.view.element);
			
			this.deviceAdded.dispatch();
			
			this.updateIframeHeight();
			
		}
		
		_deviceContainer.className = "dcalc_device_container";
		
		this.handleDeviceTypeChange = function($sDeviceType)
		{
			_sDeviceType = $sDeviceType;
			
			jQuery("#dcalc_legend_heading")[0].innerHTML = "Data Legend for " + $sDeviceType;
			
			var aNotes = DeviceTypes.notes[$sDeviceType];
			
			for (var j = 0; j < 6; j++)
			{
				jQuery("#dcalc_graph_footnotes_" + j).css("display", "none");
			}
			
			for (var i = 0; i < aNotes.length; i++)
			{
				for (var j = 0; j < 6; j++)
				{
					if (aNotes[i].indexOf((j+1).toString()) != -1) {
						jQuery("#dcalc_graph_footnotes_" + j).css("display", "");
					}
				}
			}
			
			if(_sDeviceType == DeviceTypes.BASIC_PHONE)
			{
				jQuery(".dcalc_recommendation_pricing_overlay > p")[0].innerHTML =
				"Adjust the sliders to view your recommended data plan.";
			}
			else
			{
				jQuery(".dcalc_recommendation_pricing_overlay > p")[0].innerHTML =
				"Adjust the sliders or select a preset data amount below to view " +
				"your recommended data plan.";
			}
			
			// if (_sDeviceType == DeviceTypes.ATT_HOME_BASE)
			// {
			// 	_wifiDisclaimer[0].innerHTML = 
			// 	'Wi-Fi enabled devices connected to an AT&amp;T Wireless Home Phone and Internet device ' +
			// 	'will consume data usage from a Wireless Home Internet data plan. Coverage and services ' +
			// 	'not available everywhere. ' +
			// 	'<a href="http://www.att.com/shop/wireless/devices/internethomephone.html" target="_blank">' +
			// 	'Learn more</a>.';
			// }
			// else
			// {
			// 	_wifiDisclaimer[0].innerHTML =
			// 	'Wi-Fi does not count against data plan usage.  With Wi-Fi capable devices you ' +
			// 	'can save at home, at the office and enjoy FREE connections at over 30,000 ' +
			// 	'AT&amp;T hotspots nationwide with an eligible data plan!';
			// }
			
			var tables = jQuery(".dcalc_data_legend_table").css("display", "none");
			
			var id = "#dcalc_data_legend_" + utils.cleanString($sDeviceType);
			
			jQuery(id).css("display", "block");
			
			document.getElementById(id);
			
			_this.graphControl.updateDevice($sDeviceType);
			
			for (var i = _aUsageTypes.length-1; i >= 0; i--)
			{
				_this.removeUsageType(i);
			}
			
			var usageInstance = new DeviceTypes.usageData[$sDeviceType]();
			
			for (var i = 0; i < usageInstance.types.length; i++)
			{   
				var aTypes = usageInstance.types[i];
				var aUsageData = [];
				
				for (var j = 0; j < aTypes.length; j++)
				{
					var sType = aTypes[j];
					var oData = usageInstance[sType];
					
					aUsageData.push(oData);
				}
										
				_this.addUsageType(aTypes, aUsageData);
				
			}
						
			updateUsage();
		}
		
		this.start = function()
		{
			var self = this;

			this.graphControl = new GraphControl();

			this.graphControl.markerClicked.add(function($nNum){
				self.handleGraphMarkerClicked($nNum);
			});

			_maximumDataModal.opened.add(function(){
				jQuery(parent).scrollTop(190);
			});

			this.deviceSelector.change.add(this.handleDeviceTypeChange);

			this.deviceSelector.plansModalSelected.add(function(){
				_plansModal.show();
			});
			
			jQuery("#dcalc_reset_button").click(function()
			{
				for (var i = 0; i < _aUsageTypes.length; i++)
				{
					
					_aUsageTypes[i].view.slider.updateValue(0);
				}
				
				updateUsage();
			});
			
			_deviceColumn.appendChild(this.deviceSelector.element);
			_deviceColumn.appendChild(_deviceContainer);
			
			_appWrapper.appendChild(_plansModal.view.element);
			
			_appWrapper.appendChild(_maximumDataModal.overlay);
			_appWrapper.appendChild(_maximumDataModal.element);
			
			this.handleDeviceTypeChange(DeviceTypes.SMARTPHONE);			
		}
		
	}
	
	return App;
	
});


















































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
"app/DeviceControl"
,
"app/AddDeviceButton"
,
"app/Recommendation"
,
"app/MaximumDataModal"
,
"app/UsageCalculatorControl"
,
"app/UsageTypes"
,
"app/PlansModalControl"

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
DeviceControl
,
AddDeviceButton
,
Recommendation
,
MaximumDataModal
,
UsageCalculator
,
UsageTypes
,
PlansModalControl

)
{
	var App = function()
	{
		var _this = this;
		
		var _aDevices = [];
		
		this.totalUsage = 0;
		
		this.nMaxUsage = 50;
		
		this.usageChanged = new signals.Signal();

		this.deviceTypeChanged = new signals.Signal();
		
		this.deviceUsageChanged = new signals.Signal();
		
		var _deviceColumn = document.getElementById("msr_device_column");
		
		var _appWrapper = document.getElementById("msr_data_calc_wrapper");
		
		var _deviceContainer = document.createElement("div");
		
		var _addDeviceButton = new AddDeviceButton();
		
		var _recommendation = new Recommendation();
		
		var _maximumDataModal = new MaximumDataModal();
		
		var usageCalculator = new UsageCalculator();
		
		var plansModal = new PlansModalControl();
		
		var handleDeviceUsageChanged = function ()
		{
			updateUsage();
			
			var containsNonBlenderDevice = false;
			 
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
			
			for (var i = 0; i < _aDevices.length; i++)
			{
				var type = _aDevices[i].getType();
				
				if (type != DeviceTypes.ATT_HOME_BASE && type != DeviceTypes.NONE)
				{
					containsNonBlenderDevice = true;
				}
				
				//this.totalUsage += _aDevices[i].getUsage();
			}
			
			if (containsNonBlenderDevice)
			{
				fadeIn(jQuery(".msr_header_back_to_mobile_site"));
			}
			else
			{
				fadeOut(jQuery(".msr_header_back_to_mobile_site"));
			}
		}
		
		var updateUsage = function()
		{
			this.totalUsage = 0;
			var fixTo = 2;
			
			for (var i = 0; i < _aDevices.length; i++)
			{
				this.totalUsage += _aDevices[i].getUsage();
			}
			
			_recommendation.update(this.totalUsage, _aDevices);
			
			_this.graphControl.updateLabels(_aDevices);
			_this.graphControl.update(this.totalUsage, fixTo);
			
			_this.usageChanged.dispatch();
			
			_maximumDataModal.update(this.totalUsage, _this.nMaxUsage);
		}
		
		var handleDeviceRemoveClicked = function($controller)
		{
			_this.removeDevice($controller.getIndex());
		}
		
		this.handleUsageCalculatorClicked = function($device)
		{
			usageCalculator.update($device);
			_this.scrollParent(190);
		}
		
		this.addDevice = function ($sType)
		{
			var device = _aDevices[_aDevices.length] = new DeviceControl(_aDevices.length, $sType);
			device.usageChanged.add(handleDeviceUsageChanged);
			_deviceContainer.appendChild(device.view.element);

			device.usageCalculatorLinkClicked.add(this.handleUsageCalculatorClicked);
			
			device.removeClicked.add(handleDeviceRemoveClicked);
			
			jQuery(_addDeviceButton.element).toggleClass(
				"msr_add_device_button_hidden", _aDevices.length >= 10);
				
			updateUsage();
				
			this.updateIframeHeight();
			
		}
		
		this.removeDevice = function ($nDeviceNum)
		{
			_aDevices[$nDeviceNum].kill();
			
			_aDevices.splice($nDeviceNum, 1);
			
			for (var i = 0; i < _aDevices.length; i++)
			{
				_aDevices[i].setIndex(i);
			}
			
			jQuery(_addDeviceButton.element).toggleClass(
				"msr_add_device_button_hidden", _aDevices.length >= 10);
			
			updateUsage();
			
			this.usageChanged.dispatch();
			
			this.updateIframeHeight(true);
			
		}
		
		this.updateIframeHeight = function($bRemoved)
		{
			function delayedUpdateIframeHeight()
			{
				if (window.parent.document.getElementById("msr_app_window"))
				{
					window.parent.document.getElementById("msr_app_window").style.height =
						jQuery(document.body).outerHeight() + 16 + "px";
				}
			}
			
			setTimeout(delayedUpdateIframeHeight, ($bRemoved) ? 310 : 10);
		}
		
		this.scrollParent = function($nScrollValue)
		{
			if(window.parent.document) jQuery(window.parent.document).scrollTop($nScrollValue);
		}
		
		
		_deviceContainer.className = "msr_device_container";
		
		this.start = function()
		{
			this.graphControl = new GraphControl();
			
			//First device added here.
			this.addDevice(DeviceTypes.NONE);
			//this.addDevice(DeviceTypes.SMARTPHONE);
			
			//Initial deployment started with two devices onscreen. This has been reduced to one.
			//this.addDevice(DeviceTypes.NONE);	
			
			_deviceColumn.appendChild(_deviceContainer);
			_deviceColumn.appendChild(_addDeviceButton.element);
			
			_maximumDataModal.opened.add(function(){
				_this.scrollParent(190);
			});
			
			jQuery(_addDeviceButton.element).click(function()
			{
				_this.addDevice(DeviceTypes.NONE);
			});
			
			jQuery(".msr_terms_modal_btn").click(function(){
				parent.openTermsModal();
			});
			
			jQuery(".msr_plans_modal_btn").click(function(){
				plansModal.show();
			});
			
			_appWrapper.appendChild(_maximumDataModal.overlay);
			_appWrapper.appendChild(_maximumDataModal.element);
			_appWrapper.appendChild(plansModal.view.element);
			_appWrapper.appendChild(usageCalculator.view.element);
			
			updateUsage();
			
		}
		
	}
	
	return App;
	
});


















































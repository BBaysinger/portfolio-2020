define([

"../lib/utils/trace"
,
"../lib/utils/signals"
,
"app/DeviceView"
,
"app/DeviceTypes"
,
"app/DeviceGraphLabel"
,
"app/SliderControl"

],

function(

trace
,
signals
,
DeviceView
,
DeviceTypes
,
DeviceGraphLabel
,
SliderControl
)
{
	var DeviceControl = function(_nIndex, _sType)
	{
		var _this = this;
		
		var _nUsage = 0;
		
		var _nPctUsage = 0;
		
		var _nShimUsage = 0;
		
		this.nVideoMode = 0;
		/* Used to determine whether the data from the calculator is saved or not. */
		this.bDataSaved = false; 
		
		this.nTypeIndex = jQuery.inArray(_sType, DeviceTypes.types);
		
		this.usageChanged = new signals.Signal();
		
		this.usageSetTo = new signals.Signal();
		
		this.typeChanged = new signals.Signal();
		
		this.removeClicked = new signals.Signal();
		
		this.usageCalculatorLinkClicked = new signals.Signal();
		
		this.graphLabel = new DeviceGraphLabel(_nIndex);
		
		this.slider = new SliderControl(1, 4, 366);
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.setIndex = function($nIndex)
		{
			_nIndex = $nIndex;
			this.view.setIndex($nIndex);
			this.graphLabel.setIndex($nIndex);
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.setUsageTo = function($nValue)//in GB
		{   
			var nFixTo = Math.min(($nValue % 1).toString().length - 1, 2);
			var nVal = ($nValue * _this.usageInputMultiplier).toFixed(nFixTo);

			this.privateSetUsage(nVal / this.usageInputMultiplier);
			
			this.slider.setValue(($nValue - _nShimUsage) / _this.nMultiplier);
			
			this.updateUsageInput();
			this.determineModeChange();
			
			this.usageChanged.dispatch();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.setType = function($sType)
		{   
			_sType = $sType;
			
			if (_sType) jQuery(this.view.element).toggleClass("msr_device_active");
			else jQuery(this.view.element).toggleClass("msr_device_inactive");			
			// Get Usage
			this.nTypeIndex = (jQuery.inArray(_this.getType(), DeviceTypes.types));
			this.privateSetUsage(DeviceTypes.usage[this.nTypeIndex]);
			
			this.nTypical = DeviceTypes.usage[this.nTypeIndex];
			
			if (typeof _nUsage == "undefined")
			{
				var msg = "Type '" + _sType + "' not declared. ";
				msg += "Must be DeviceTypes constant or null.";
				throw new Error(msg);
			}
			
			this.usageChanged.dispatch();
			this.typeChanged.dispatch();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getIndex = function()
		{
			return _nIndex;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.updateUsageInput = function()
		{
			var nFixTo = Math.min((_nUsage % 1).toString().length - 1, 2);
			var nVal = (_nUsage * _this.usageInputMultiplier).toFixed(nFixTo);
			
			nFixTo = (this.getType() == DeviceTypes.BASIC_PHONE ||
				this.getType() == DeviceTypes.GO_PHONE_BASIC_PHONE) ? 0 :
				Math.min((nVal % 1).toString().length - 1, 2);
			
			this.view.usageInput.innerHTML = Number(nVal).toFixed(nFixTo);
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getType = function()
		{
			return _sType;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.handleUserRelease = function()
		{   
			_this.determineModeChange();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.determineModeChange = function()
		{
 			if ((_nUsage >= 5 && _this.nMultiplier <= 5) || (_nUsage < 5 && _this.nMultiplier > 5))
			{   
				_this.setUpSlider();
				
				_this.slider.setValue((_nUsage - _nShimUsage) / _this.nMultiplier);
			}
		
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.privateSetUsage = function($nUsage)
		{   
			_nUsage = $nUsage;
			
			var nTypeIndex = (jQuery.inArray(_this.getType(), DeviceTypes.types));
			
			if (DeviceTypes.types[nTypeIndex] == DeviceTypes.ATT_HOME_BASE)
			{
				_nUsage = Math.max(_nUsage, 10);
			} 
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.setUsage = function($nUsage)
		{   
			this.privateSetUsage($nUsage);
			this.determineModeChange();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getUsage = function()
		{
			return _nUsage;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		var handleSliderChange = function($nValue)
		{   
			_this.privateSetUsage(getTranslatedSliderVal());
			_this.bDataSaved = false;
		 	_this.updateUsageInput();
		 	_this.usageChanged.dispatch();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		var getTranslatedSliderVal = function()
		{
			return _this.slider.value * _this.nMultiplier + _nShimUsage;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.setUsageData = function()
		{
			this.usageData = new DeviceTypes.usageData[this.getType()]();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.kill = function()
		{
			this.usageChanged.removeAll();
			this.typeChanged.removeAll();
			
			if (this.view.element.parentNode)
			{
				jQuery(this.view.element).animate({height:0}, 200, function(){
					this.parentNode.removeChild(this);
				});
			}
			if (this.graphLabel.element.parentNode)
			{
				this.graphLabel.element.parentNode.removeChild(this.graphLabel.element);
			}
			
		}
		
		this.setUpSlider = function($nTypeIndex)
		{   
			var nTypeIndex = (jQuery.inArray(_this.getType(), DeviceTypes.types));
			
			function getPercentTypical()
			{
				return (_this.nTypical - _nShimUsage) / _this.nMultiplier;
			}
			
			// Special for basic_phone
			if (DeviceTypes.types[nTypeIndex] == DeviceTypes.BASIC_PHONE)
			{
				_this.slider.handle.options.nMinX = 0;
				_this.slider.nSnap = 4;
				_this.nMultiplier = .5;
				_nShimUsage = 0;
				_this.usageInputMultiplier = 1000;
				_this.view.usageInputUnit.innerHTML = _this.nUsageUnit = "MB";
				_this.slider.setIncrements(5, 0, 100, "MB", getPercentTypical(), _sType);
			}
			else if (DeviceTypes.types[nTypeIndex] == DeviceTypes.ATT_HOME_BASE)
			{
				//_this.slider.handle.options.nMinX = 122;
				_this.slider.handle.options.nMinX = 0;
				_this.slider.nSnap = 5;
				_this.nMultiplier = 20;
				_nShimUsage = 0;
				//_nShimUsage = 5;
				_this.usageInputMultiplier = 1;
				_this.view.usageInputUnit.innerHTML = _this.nUsageUnit = "GB";
				_this.slider.setIncrements(4, 0, 5, "GB", getPercentTypical(), _sType);
			}
			else
			{   
				if (_nUsage < 5)
				{   
					_this.slider.handle.options.nMinX = 0;
					_this.slider.nSnap = 4;
					_this.nMultiplier = 5;
					_nShimUsage = 0;
					_this.usageInputMultiplier = 1;
					_this.view.usageInputUnit.innerHTML = _this.nUsageUnit = "GB";
					_this.slider.setIncrements(5, 0, 1, "GB", getPercentTypical(), _sType);
				}
				else
				{
					_this.slider.handle.options.nMinX = 0;
					_this.slider.nSnap = 5;
					_this.nMultiplier = 20;
					_nShimUsage = 0;
					_this.usageInputMultiplier = 1;
					_this.view.usageInputUnit.innerHTML = _this.nUsageUnit = "GB";
					_this.slider.setIncrements(4, 0, 5, "GB", getPercentTypical(), _sType);
				}
				
			}
			
			_this.updateUsageInput();
			
		}

		/* ---------------------------------------------------------------------------------------- */
		
		this.handleTypeChange = function()
		{
			var sDisplay = (_this.getType() == DeviceTypes.NONE) ? "block" : "none";
			
			var nTypeIndex = (jQuery.inArray(_this.getType(), DeviceTypes.types));
			
			_this.bDataSaved = false;
			
			_this.view.inactiveOverlay.style.display = sDisplay;
			
			_this.setUpSlider();
			
			_this.slider.setValue((_nUsage - _nShimUsage) / _this.nMultiplier);
			
			var nBGPosition = null;
			
			// if(nTypeIndex == 0)//If a type of device is not selected.
			// {
			// 	if (_nIndex == 1)//If this is the second
			// 	{
			// 		nBGPosition = 1;
			// 	}
			// 	else if (_nIndex == 2)
			// 	{
			// 		nBGPosition = 2;
			// 	}
			// 	else
			// 	{
			// 		nBGPosition = Math.round(Math.random() * (1, DeviceTypes.types.length-2) + 1);
			// 	}
			// } 
			// else
			// {
			// 	nBGPosition = (nTypeIndex);
			// }
			
			if(nTypeIndex == 0)//If a type of device is not selected.
			{
				if (_nIndex == 0)//If this is the first
				{
					nBGPosition = 1;
				}
				else
				{
					nBGPosition = Math.round(Math.random() * (1, DeviceTypes.types.length-2) + 1);
				}
			} 
			else
			{
				nBGPosition = (nTypeIndex);
			}
			
			_this.view.deviceImage.style.backgroundPosition = "0px " + (-nBGPosition*130) + "px";
			
			_this.view.typeSelect.value = nTypeIndex;
			
			_this.view.typeP.innerHTML = DeviceTypes.types[nTypeIndex];
			
			var nPlan = (_sType == DeviceTypes.BASIC_PHONE) ? _nUsage * 1000 : _nUsage;
			
			var sNote = "* Most individual {{DEVICE}} customers<br />" +
				" <span>select the {{PLAN}}{{UNIT}} data plan today.</span>";
			sNote = sNote.replace("{{DEVICE}}", _sType.toLowerCase());
			sNote = sNote.replace("{{PLAN}}", nPlan);
			sNote = sNote.replace("{{UNIT}}", _this.nUsageUnit);
			if(!nTypeIndex) sNote = "";
			
			if (DeviceTypes.types[nTypeIndex] == DeviceTypes.ATT_HOME_BASE){
				
				var str = 
				'* Mobile Share plan of 10GB or more required.<br />' +
				'Coverage and services not available everywhere. <a' +
				' href="http://www.att.com/shop/wireless/devices/internethomephone.html"' +
				' target="_blank">Learn more</a>.';
				
				_this.view.generalUsageNote.innerHTML = str;
			}
			else if (DeviceTypes.types[nTypeIndex] != DeviceTypes.BASIC_PHONE){
				_this.view.generalUsageNote.innerHTML = sNote;
			}
			else
			{
				_this.view.generalUsageNote.innerHTML = "* Basic phone customers that use data" + 
					" typically<br /><span>consume &#126;100MB a month.</span>";
			}
			
			// Grab data to populate the Usage Calculator Modal with
			_this.setUsageData();
			
		}
		
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.view = new DeviceView(_nIndex, _sType);
		
		//Disabling this makes first device not changeable.
		//if(_nIndex == 0) jQuery(this.view.element).addClass("no_type_select");
		
		jQuery(this.view.usageCalculatorLink).bind("click", function(e){
			e.preventDefault();
			_this.usageCalculatorLinkClicked.dispatch(_this);
		});
		
		jQuery(this.view.removeButton).click(function()
		{
			_this.removeClicked.dispatch(_this);
		});
		
		this.typeChanged.add(_this.handleTypeChange);
		
		this.setType(_sType);
		
		jQuery(this.view.typeSelect).bind( "change", function(e){ 
				var sType = DeviceTypes.types[ e.target.value ];
				_this.setType(sType);
			} 
		);
		
		this.view.element.appendChild(this.slider.view.element);
		
		this.slider.valueChanged.add(handleSliderChange);
		this.slider.userRelease.add(this.handleUserRelease);
		
	}

	/* ---------------------------------------------------------------------------------------- */
	
	return DeviceControl;
	
});

























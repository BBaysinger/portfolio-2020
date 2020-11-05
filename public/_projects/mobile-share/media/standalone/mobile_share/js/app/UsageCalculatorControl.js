define([

"../lib/utils/trace"
,
"app/UsageCalculatorView"
,
"app/UsageTypeControl"
,
"app/DeviceTypes"
,
"app/UsageTypes"
,
"../lib/utils/utils"

], function(

trace
,
UsageCalculatorView
,
UsageTypeControl
,
DeviceTypes
,
UsageTypes
,
utils

){
	var _self = null;

	/* ---------------------------------------------------------------------------------------- */

	var UsageCalculatorControl = function()
	{
		_self = this;

		this.view = new UsageCalculatorView();

		this.bOpen = false;

		this.device = null;

		this.deviceUsageData = null;

		this.nInitialTotalUsage = 0;

		this.sType = null;

		this.bBasicPhone = null;

		this.bAdjusted = false;

		this.nVanityTotal = 0;

		this.aUsageTypes = [];

		this.enableEvents();
	}
	var p = UsageCalculatorControl.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.update = function($device)
	{
		// Settings

		this.device = $device;
		
		this.deviceUsageData = this.device.usageData;
		
		this.nInitialTotalUsage = this.device.getUsage();
		
		this.sType = this.device.getType();
		
		this.bBasicPhone = this.sType == DeviceTypes.BASIC_PHONE;
		
		this.aUsageTypes = [];
		
		this.bAdjusted = false;
		
		// Update the view
		
		this.updateView();
		
		// Create Usage Types
		
		this.createUsageTypes();
		
		// Set Initial slider values.
		if(!this.device.bDataSaved)
		{
			this.device.nVideoMode = 0;
			this.figureUsageBases();
		}
		else
		{
			this.loadUsageData();
		}
		
		this.updateTotalTally(this.nInitialTotalUsage);
		
		this.listenToUsageTypes();
		
		if(!this.bOpen) this.show();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.updateView = function()
	{
		this.view.title.style.fontSize = (this.device.getType() == DeviceTypes.ATT_HOME_BASE) ?
			"18px" : "";
		this.view.title.innerHTML = this.device.getType() + " Data Calculator";
		this.view.dataLegend.src = "media/standalone/mobile_share/html/" +
			utils.normalizeString(this.sType) + ".html";

		if(this.device.getType() == DeviceTypes.BASIC_PHONE)
		{
			this.view.asterisk.innerHTML = "<p>* Basic phone customers that use data typically consume" +
			" ~100MB a month.</p><p>** 75% basic email and 25% email with standard attachment.</p>";
		}
		else if(this.device.getType() == DeviceTypes.ATT_HOME_BASE)
		{   
			var str = 'Learn more about <a' +
			' href="http://www.att.com/shop/wireless/devices/internethomephone.html"' +
			' target="_blank">AT&amp;T Wireless' +
			' Home Phone and Internet service</a>.';
			
			this.view.asterisk.innerHTML = "<p>" + str + "</p>" +
			"<p>** 75% basic email and 25% email with standard attachment.</p>";
		}
		else
		{
			this.view.asterisk.innerHTML = "<p>* Most individual " + this.sType.toLowerCase() +
			" customers select the " + DeviceTypes.usage[this.device.nTypeIndex] +
			"GB data plan today.</p>" +
			"<p>** 75% basic email and 25% email with standard attachment.</p>";
		}
		
		if(this.device.getType() == DeviceTypes.ATT_HOME_BASE)
		{ 
			this.view.tallyAsterisk.innerHTML = "Estimated monthly usage<br />is approximately equal to:"
			
			this.view.description.innerHTML =
				"Use the sliders below to estimate your data usage per month.";
		}
		else
		{  
			this.view.tallyAsterisk.innerHTML = "Estimated monthly usage*<br />is approximately equal to:"
			
			this.view.description.innerHTML = "Use the sliders below to estimate your data usage per " +
			"month. <br>Wi-Fi does not count against data plan usage.";
		}
		
	}

	/* ---------------------------------------------------------------------------------------- */

	p.createUsageTypes = function()
	{
		var nUsageTypes = this.deviceUsageData.types.length;

		this.view.usageTypeWrapper.innerHTML = "";

		for(var i = 0; i < nUsageTypes; i++)
		{
			// Check if this usage types has multiple modes. This is only true for video currently.
			var aTypeModes = [];
			var aTypeModesData = [];
			for(var j = 0; j < this.deviceUsageData.types[i].length; j++)
			{
				aTypeModesData.push(this.deviceUsageData[this.deviceUsageData.types[i][j]]);
				aTypeModes.push(this.deviceUsageData.types[i][j]);
			}
			
			// Create new usage type, add it to the list and the view.
			var newUsageType = new UsageTypeControl(i, aTypeModes, aTypeModesData);
			this.aUsageTypes.push(newUsageType);
			this.view.usageTypeWrapper.appendChild(newUsageType.view.element);

			// Add the visual separator as long as it's not the last one in the list.
			if( i != nUsageTypes-1 && i != nUsageTypes-2) newUsageType.view.element.className +=
				" msr_usage_calculator_separater";

		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.listenToUsageTypes = function()
	{
		for(var i = 0; i < this.aUsageTypes.length; i++)
		{
			var usageType = this.aUsageTypes[i];
			usageType.usageChanged.add(function(){
				_self.handleUsageChanged();
			});

			usageType.modeChanged.add(function($nMode){
				_self.handleModeChanged($nMode);
			});			
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleUsageChanged = function()
	{
		this.bAdjusted = true;
		this.updateTotalTally(this.getTotalUsage());
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleModeChanged = function($nMode)
	{
		this.device.nVideoMode = $nMode;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.enableEvents = function()
	{
		jQuery(this.view.btnClose).click(function(e){
			_self.hide();
			e.preventDefault();
		});

		jQuery(this.view.btnDone).click(function(e){
			_self.hide();
			e.preventDefault();
		});

		jQuery(this.view.btnReset).click(function(e){
			_self.reset();
			e.preventDefault();
		});
	}

	/* ---------------------------------------------------------------------------------------- */

	p.reset = function()
	{
		this.nInitialTotalUsage = DeviceTypes.usage[this.device.nTypeIndex] / this.device.nMultiplier;
		this.device.nVideoMode = 0;
		this.figureUsageBases();
		this.updateTotalTally(this.nInitialTotalUsage);

		// this.bAdjusted = false;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.show = function()
	{
		this.bOpen = true;
		this.view.overlay.style.display = "block";
		this.view.element.style.display = "block";
	}

	/* ---------------------------------------------------------------------------------------- */

	p.hide = function()
	{
		this.bOpen = false;
		this.view.element.style.display = "none";
		this.view.overlay.style.display = "none";
		if(this.bAdjusted) this.saveUsageData();
	}
 
	/* ---------------------------------------------------------------------------------------- */

	p.figureUsageBases = function()
	{
		var nTotalBaseUnits = 0;
		var nTotalBaseUsage = 0;
		var npct = 0;
		var leftoverType = null;
		var ltData = null;
		var nLeftoverData = 0;
		var nTotalUsage = 0;

		// Get Base Totals 
		for(var i = 0; i < this.aUsageTypes.length; i++)
		{
			var item = this.aUsageTypes[i];

			if(item.numTypes > 1) item.setType(0);

			if(item.aTypeData.length > 1) item.setType(this.device.nVideoMode);

			nTotalBaseUnits += item.getTypeData().base_unit_amount;
			nTotalBaseUsage += item.getTypeData().base_unit_amount * item.getTypeData().unit_size;
		}

		npct = this.nInitialTotalUsage / Number(nTotalBaseUsage.toFixed(2));

		// Sort by usage types by unit_size, ascending.
		this.aUsageTypes.sort(function(a, b){
			return a.getTypeData().unit_size - b.getTypeData().unit_size;
		});
		// Save the one with the lowest unit size to have as fine 
		// control as possible for the necessary adjustment.
		leftoverType = this.aUsageTypes[0];
		ltData = leftoverType.getTypeData();

		// Set the value of all the usage types EXCEPT the one with the lowest unit size.
		// There will be an unknown amount leftover data which we'll fill with that one.
		for(var i = 1; i < this.aUsageTypes.length; i++)
		{
			var item = this.aUsageTypes[i];
			var typeData = item.getTypeData();
			var nBaseUsage = (typeData.base_unit_amount * typeData.unit_size) / (typeData.max_units * typeData.unit_size);
			item.setValue( nBaseUsage * npct );
			nTotalUsage += item.getUsage(); // track total usage as it adds up
		}

		// NOW figure the necessary amount to meet the requested total data and set the one with lowest unit size accordingly.
		nLeftoverData = (this.nInitialTotalUsage - nTotalUsage) / ltData.unit_size;
		leftoverType.setValue(nLeftoverData / ltData.max_units);
	}

	/* ---------------------------------------------------------------------------------------- */

	p.updateTotalTally = function(nUsage)
	{
		var sTallyInnerHTML = "";
		this.nVanityTotal = nUsage;

		if(this.bBasicPhone) sTallyInnerHTML = Math.round(nUsage * this.device.usageInputMultiplier);
		else sTallyInnerHTML = nUsage.toFixed(2);

		sTallyInnerHTML += "<span>" + this.device.nUsageUnit + "</span>";
		this.view.tally.innerHTML = sTallyInnerHTML;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getTotalUsage = function()
	{
		var nTotalUsage = 0;

		for(var i = 0; i < this.aUsageTypes.length; i++) nTotalUsage += this.aUsageTypes[i].getUsage();

		return nTotalUsage;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.saveUsageData = function()
	{
		this.device.setUsageTo(this.nVanityTotal);
		this.device.bDataSaved = true;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.loadUsageData = function()
	{
		// Set video mode
		for(var i = 0; i < this.aUsageTypes.length; i++)
		{
			if(this.aUsageTypes[i].aTypeData.length > 1) this.aUsageTypes[i].setType(this.device.nVideoMode);
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	return UsageCalculatorControl;

});





































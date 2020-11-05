define([

"../lib/utils/trace"
,
"../lib/utils/signals"
,
"app/UsageTypeView"
,
"app/UsageTypes"
,
"app/SliderControl"

], function(

trace
,
signals
,
UsageTypeView
,
UsageTypes
,
SliderControl

){

	var UsageTypeControl = function($nIndex, $aTypes, $aTypeData)
	{
		var self = this;
		
		this.slider = new SliderControl(1, NaN, 233);
		
		this.aTypeData = $aTypeData;
		
		this.aTypes = $aTypes;
		
		this.nMode = 0;
		
		this.oTypeData = $aTypeData[this.nMode];
		
		this.sType = this.aTypes[this.nMode];
		
		this.nIndex = $nIndex;
		
		this.nPctUsage = 0;
		
		this.view = new UsageTypeView(this.nIndex, this.aTypeData, this.sType);
		
		this.usageChanged = new signals.Signal();
		
		this.modeChanged = new signals.Signal();
		
		/** index of this usage type in "types" array of the usage_data 
		*class associated with this device type
		*/ 
		this.nIndex = $nIndex; 
		
		this.setTypeData(this.aTypeData[this.nMode]);
		
		this.updateUnitCount();
		
		jQuery(this.view.select).bind( "change", function(e){
			self.setType(parseInt(e.target.value));
			self.setValue(0);
		});
		
		this.view.element.appendChild(this.slider.view.element);
		
	}

	/* ---------------------------------------------------------------------------------------- */

	var p = UsageTypeControl.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.getIndex = function()
	{
		return this.nIndex;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.setIndex = function($nIndex)
	{
		this.nIndex = $nIndex;
		this.view.setIndex(this.nIndex);
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getTypeData = function()
	{
		return this.oTypeData;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.setType = function($nVal)
	{
		this.nMode = $nVal;

		this.view.select.value = $nVal;

		this.oTypeData = this.aTypeData[this.nMode];

		this.setTypeData(this.oTypeData);

		this.view.update(this.oTypeData);

		this.updateUnitCount();

		this.modeChanged.dispatch(this.nMode);

		this.usageChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.setTypeData = function($oTypeData)
	{
		var self = this;

		this.oTypeData = $oTypeData;
		this.nPctUsage = this.oTypeData["num_units"] / this.oTypeData["max_units"];

		this.slider.setValue(this.nPctUsage);

		this.slider.valueChanged.add(function(){
			self.handleSliderValueChange();
		});

	}

	/* ---------------------------------------------------------------------------------------- */

	p.setValue = function($nValue)
	{
		this.slider.setValue($nValue);

		this.handleSliderValueChange();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleSliderValueChange = function()
	{
		this.nPctUsage = parseFloat(this.slider.value);

		this.updateUnitCount();

		this.setNumUnits();
		
		this.usageChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.updateUnitCount = function()
	{
		this.view.usageInput.innerHTML = this.getNumUnits();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.setNumUnits = function()
	{
		this.oTypeData["num_units"] = this.oTypeData["max_units"] * this.nPctUsage;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getPctUsage = function()
	{
		return this.nPctUsage;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getRelativeUsage = function()
	{
		return this.nPctUsage * (this.oTypeData["max_units"] * this.oTypeData["unit_size"]);
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getNumUnits = function()
	{
		var nVal = this.oTypeData["max_units"] * this.nPctUsage;

		var nRoundToNearest = 1;

		if(this.sType == UsageTypes.EMAILS) nRoundToNearest = 100;
		else if(this.oTypeData.max_units > 1000) nRoundToNearest = 10;

		return Math.round(nVal / nRoundToNearest) * nRoundToNearest;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.getUsage = function()
	{
		return this.getNumUnits() * this.oTypeData["unit_size"];
	}

	/* ---------------------------------------------------------------------------------------- */

	p.kill = function()
	{
		this.usageChanged.removeAll();
		this.modeChanged.removeAll();
		
		if (this.view.element.parentNode)
		{
			this.view.element.parentNode.removeChild(this.view.element);
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	return UsageTypeControl;

});
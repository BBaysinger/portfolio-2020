define([

"../lib/utils/trace"
,
"../lib/utils/signals"
,
"app/UsageTypeView"
,
"app/DeviceTypes"
,
"app/UsageTypes"

],

function(

trace
,
signals
,
UsageTypeView
,
DeviceTypes
,
UsageTypes

)
{
	var UsageTypeControl = function(_nIndex, _aTypes, _aTypeData)
	{
		
		var _this = this;

		var _nPctUsage = 0;
		
		var _sType = _aTypes[0];
		
		var _oTypeData = _aTypeData[0];
		
		this.usageChanged = new signals.Signal();

		this.numTypes = _aTypes.length;
		
		this.view = new UsageTypeView(_nIndex, _sType, _aTypeData);

		/* ---------------------------------------------------------------------------------------- */
		
		this.getIndex = function()
		{
			return _nIndex;
		}

		/* ---------------------------------------------------------------------------------------- */

		this.getType = function()
		{
			return _sType;
		}

		/* ---------------------------------------------------------------------------------------- */

		this.setType = function($nVal)
		{
			var nVal = $nVal;

			_sType = _aTypes[nVal];
			_oTypeData = _aTypeData[nVal];

			_nPctUsage = _oTypeData["num_units"] / _oTypeData["max_units"];
			
			_this.view.slider.setValue( _nPctUsage );
			
			_this.view.updateType(_sType, nVal);

			_this.view.select.value = $nVal

			_this.updateUsageInput();
			
			_this.usageChanged.dispatch();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.updateUsageInput = function()
		{
			this.view.usageInput.innerHTML = this.getNumUnits();
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getTypeData = function()
		{
			return _oTypeData;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getPctUsage = function()
		{
			return _nPctUsage;
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.getRelativeUsage = function()
		{
			return _nPctUsage * (_oTypeData["max_units"] * _oTypeData["unit_size"]);
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.kill = function()
		{
			this.usageChanged.removeAll();
			
			if (this.view.element.parentNode)
			{
				this.view.element.parentNode.removeChild(this.view.element);
			}
			
		}

		/* ---------------------------------------------------------------------------------------- */

		this.getNumUnits = function()
		{
			var nVal = _oTypeData["max_units"] * _nPctUsage;

			var nRoundToNearest = 1;

			//if(_sType == UsageTypes.EMAILS || _sType == UsageTypes.WEB_BROWSING) nRoundToNearest = 100;
			if(_sType == UsageTypes.EMAILS) nRoundToNearest = 100;
			else if(_oTypeData.max_units > 1000) nRoundToNearest = 10;

			return Math.round(nVal / nRoundToNearest) * nRoundToNearest;
		}

		/* ---------------------------------------------------------------------------------------- */

		this.getUsage = function()
		{
			return this.getNumUnits() * _oTypeData['unit_size'];
		}

		/* ---------------------------------------------------------------------------------------- */
		
		if (_nIndex == 0) {
			jQuery(this.view.element).addClass("no_type_select");
		}
		
		this.view.slider.valueChanged.add(function() {
			_nPctUsage = parseFloat(_this.view.slider.value);
			_this.updateUsageInput();
			_this.usageChanged.dispatch();
		});
		
		this.view.slider.handlePositionChanged.add(function()
		{
			_nPctUsage = parseFloat(_this.view.slider.value);			
			_this.updateUsageInput();
		});
		
		jQuery(this.view.select).bind( "change", function(e){
			_this.setType(parseInt(e.target.value));
		});
		
		_nPctUsage = _oTypeData["num_units"] / _oTypeData["max_units"];
		
		_this.view.slider.setValue( _nPctUsage );
		
		this.updateUsageInput();	
	}
	
	return UsageTypeControl;
	
});

























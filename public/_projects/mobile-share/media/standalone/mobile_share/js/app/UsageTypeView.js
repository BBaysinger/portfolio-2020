define([

"../lib/utils/trace"
,
"app/UsageTypes"

], function(

trace
,
UsageTypes

){

	var UsageTypeView = function($nIndex, $aTypeData, $sType){
		
		this.aTypeData = $aTypeData;
		
		this.nIndex = $nIndex;
		
		this.sType = $sType;
		
		this.nIconIndex = 0;
		
		if (this.aTypeData.length > 1)
		{
			this.select = document.createElement("select");
			this.select.className = "msr_usage_type_mode_select";
			
			for (var i = 0; i < this.aTypeData.length; i++)
			{
				var option = document.createElement("option");
				option.innerHTML = this.aTypeData[i]["option_val"];
				option.value = i;
				
				this.select.appendChild(option);
			}
		}
		
		for(key in UsageTypes.titles){
			if(UsageTypes.titles[key] == this.aTypeData[0].title)
			{
				this.nIconIndex = jQuery.inArray(key, UsageTypes.types);
			}
		}
		
		this.nIconHeight = 44;
		
		this.element = document.createElement("div");
		this.element.className = "msr_usage_type";
		
		this.icon = document.createElement("div");
		this.icon.className = "msr_usage_type_icon";
		this.icon.style.backgroundPosition = "0px " + -(this.nIconIndex * this.nIconHeight) + "px";
		
		this.usageInput = document.createElement("div");
		this.usageInput.className = "msr_usage_input";
		
		this.typeLabel = document.createElement("div");
		this.typeLabel.className = "msr_usage_type_label";
		this.typeLabel.innerHTML = UsageTypes.units[this.sType];
		
		this.usageInputUnit = document.createElement("div");
		this.usageInputUnit.className = "msr_usage_input_unit";
		this.usageInputUnit.innerHTML = "GB";
		
		this.title = document.createElement("span");
		this.title.className = "msr_usage_type_title";
		this.title.innerHTML = this.aTypeData[0]["title"];
		
		this.typeSelect = document.createElement("select");
		
		this.element.appendChild(this.icon);
		this.element.appendChild(this.title);
		this.element.appendChild(this.usageInput);
		this.element.appendChild(this.typeLabel);
		
		if(this.select)	this.element.appendChild(this.select);
	}

	/* ---------------------------------------------------------------------------------------- */

	var p = UsageTypeView.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.setIndex = function($nIndex)
	{
		this.nIndex = $nIndex;
	}

	/* ---------------------------------------------------------------------------------------- */

	p.update = function($oTypeData)
	{
		var oTypeData = $oTypeData;
		
		this.title.innerHTML = oTypeData["title"];
		
		this.typeLabel.innerHTML = UsageTypes.units[this.sType];
		
		for(key in UsageTypes.titles){
			if(UsageTypes.titles[key] == oTypeData.title)
			{
				this.nIconIndex = jQuery.inArray(key, UsageTypes.types);
			}
		}
		
		this.icon.style.backgroundPosition = "0px " + -(this.nIconIndex * this.nIconHeight) + "px";
	}

	/* ---------------------------------------------------------------------------------------- */

	return UsageTypeView;


});
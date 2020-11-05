define([

"../lib/utils/trace"

],

function(

trace

)
{
	var IncrementMarker = function($sNum)
	{
		var _this = this;
				
		var _unit;
		var _label;
		
		this.element = document.createElement("div");
		this.element.className = "msr_increment_marker";
		
		_label = document.createElement("div");
		_label.className = "msr_increment_marker_label";
		
		if ($sNum >= 1)
		{ 
			_label.innerHTML = $sNum;
		}
		else
		{
			_label.innerHTML = $sNum * 1000;
		}
		
		if ($sNum <= 1)
		{
			jQuery(this.element).toggleClass("msr_increment_marker_darker");
		}
		
		_unit = document.createElement("span");
		_unit.className = "msr_increment_marker_unit";
		
		if ($sNum >= 1)
		{ 
			_unit.innerHTML = "GB";
		}
		else
		{
			_unit.innerHTML = "MB";
		}   
		
		this.tick = document.createElement("div");
		this.tick.className = "msr_increment_marker_tick";
		
		this.element.appendChild(this.tick);
		this.element.appendChild(_label);
		
		_label.appendChild(_unit);
		
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
		
		if (IELTET8)
		{
			this.element.style.visibility = "hidden";
		}
		else
		{
			jQuery(this.element).animate({"opacity": 0}, 0);
		}
			

	}
	
	return IncrementMarker;
	
});

























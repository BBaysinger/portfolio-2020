define([

"../lib/utils/trace"
,
"../lib/utils/signals"

],

function(

trace
,
signals

)
{
	var IncrementMarker = function($sIncrement)
	{	
		this.increment = $sIncrement;
		
		var _this = this;
		
		var _unit;
		
		this.element = document.createElement("div");
		this.element.href = "#";
		this.element.className = "dcalc_increment_marker";
		this.element.increment = $sIncrement;
		
		this.label = document.createElement("div");
		this.label.className = "dcalc_increment_marker_label";
		this.label.href = "#";

		//this.bClickable = true;
		//if ($bClickable) _label.className += " dcalc_increment_marker_label_clickable";

		this.clicked = new signals.Signal();
		
		var sVal
		
		if (this.increment < 1) {
			sVal = this.increment.toFixed(3).toString()
			sVal = sVal.substring(2, sVal.length);	
		}
		else
		{
			// sVal = Math.round(this.increment).toString()
			sVal = this.increment.toString();
		} 
		
		this.label.innerHTML = sVal;
		
		if (this.increment <= 1)
		{
			jQuery(this.element).toggleClass("dcalc_increment_marker_darker");
		}
		
		_unit = document.createElement("span");
		_unit.className = "dcalc_increment_marker_unit";
		
		_unit.innerHTML = this.increment < 1 ? "MB" : "GB";
		
		this.tick = document.createElement("div");
		this.tick.className = "dcalc_increment_marker_tick";
		
		this.element.appendChild(this.tick);
		this.element.appendChild(this.label);
		this.label.appendChild(_unit);
		
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
		
		// jQuery(this.element).click(function(e){
		// 	e.preventDefault();
		// 	_this.clicked.dispatch(this.increment);
		// });

	}
	
	return IncrementMarker;
	
});

























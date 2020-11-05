define([

"../lib/utils/trace"

],

function(

trace

)
{
	var DeviceGraphLabel = function(_nIndex)
	{
		this.element = document.createElement("div");
		this.element.className = "msr_device_graph_label";
		
		var _text = document.createElement("div");
		_text.className = "msr_device_graph_label_text";
		
		this.setIndex = function($nIndex)
		{
			_nIndex = $nIndex;
			_text.innerHTML = "Device " + (_nIndex + 1);
		}
		
		this.setIndex(_nIndex);
		
		this.element.appendChild(_text);
	}
	
	return DeviceGraphLabel;
});

























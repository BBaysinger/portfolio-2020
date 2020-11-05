define([

"../lib/utils/trace"
,
"app/IncrementMarker"

],

function(

trace
,
IncrementMarker

)
{
	var GraphView = function($aIncrements)
	{
		var _this = this;
		
		this.element = document.getElementById("msr_graph");
		
		this.bar = document.createElement("img");
		this.bar.src = "media/standalone/mobile_share/images/graph/bar.png";
		this.bar.className = "msr_graph_bar";
		this.bar.style.height = "0px";
		
		this.deviceLabelContainer = document.createElement("div");
		this.deviceLabelContainer.className = "msr_device_graph_label_container";
		
		this.incrementMarkerContainer = document.createElement("div");
		this.incrementMarkerContainer.className = "msr_graph_marker_container";
		
		this.barReflection = document.createElement("div");
		this.barReflection.className = "msr_graph_bar_reflection";
		
		this.incrementMarkers = [];
		
		this.heading = document.createElement("div");
		this.heading.className = "msr_graph_heading";
		this.heading.innerHTML = "Estimated Total GB for Available";
		
		this.orangeText = document.createElement("div");
		this.orangeText.className = "msr_graph_orange_text";
		this.orangeText.innerHTML = "Mobile Share Plans";
		
		this.usageFlag = document.createElement("div");
		this.usageFlag.className = "msr_usage_flag";
		
		this.usageText = document.createElement("div");
		this.usageText.className = "msr_usage_flag_text";
		
		this.zeroMarker = document.createElement("div");
		this.zeroMarker.className = "msr_graph_zero_marker";
		
		this.heading.appendChild(this.orangeText);
		
		this.element.appendChild(this.bar);
		this.element.appendChild(this.barReflection)
		this.element.appendChild(this.deviceLabelContainer);
		this.element.appendChild(this.incrementMarkerContainer);
		this.element.appendChild(this.zeroMarker);
		this.element.appendChild(this.usageFlag);
		this.element.appendChild(this.heading);
		this.usageFlag.appendChild(this.usageText);
		
		var marker;
		
		for (var j = 0; j < $aIncrements.length; j++)
		{
			marker = this.incrementMarkers[j] = new IncrementMarker(parseFloat($aIncrements[j]));
			
			this.incrementMarkerContainer.appendChild(marker.element);
			
		}
		
		
	}
	
	return GraphView;
	
});

























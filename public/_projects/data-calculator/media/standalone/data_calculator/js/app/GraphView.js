define([

"../lib/utils/trace"
,
"app/IncrementMarker"
,
"app/GraphLabel"
,
"../lib/utils/signals"

],

function(

trace
,
IncrementMarker
,
GraphLabel
,
signals

)
{
	var GraphView = function($aIncrements)
	{
		var _this = this;
		
		this.markerClicked = new signals.Signal();
		
		this.element = document.getElementById("dcalc_graph");
		
		this.bar = document.createElement("img");
		this.bar.src = "media/standalone/data_calculator/images/graph/bar.png";
		this.bar.className = "dcalc_graph_bar";
		this.bar.style.height = "0px";
		
		this.deviceLabelContainer = document.createElement("div");
		this.deviceLabelContainer.className = "dcalc_device_graph_label_container";
		
		this.incrementMarkerContainer = document.createElement("div");
		this.incrementMarkerContainer.className = "dcalc_graph_marker_container";
		
		this.deviceImage = document.createElement("div");
		this.deviceImage.className = "dcalc_graph_device_image";
		
		this.barReflection = document.createElement("div");
		this.barReflection.className = "dcalc_graph_bar_reflection";
		
		this.unlimitedMarker = document.createElement("div");
		this.unlimitedMarker.className = "dcalc_increment_marker_label";
		this.unlimitedMarker.innerHTML = "Unlimited";
		
		this.unlimitedMarkerNote = document.createElement("span");
		this.unlimitedMarkerNote.className = "dcalc_increment_marker_note";
		this.unlimitedMarkerNote.innerHTML = "4";
		
		this.unlimitedMarker.appendChild(this.unlimitedMarkerNote);
		
		this.incrementMarkers = [];
		
		this.heading = document.createElement("div");
		this.heading.className = "dcalc_graph_heading";
		
		this.orangeText = document.createElement("div");
		this.orangeText.className = "dcalc_graph_orange_text";
		this.orangeText.innerHTML = "Your Estimated Monthly Usage";
		
		this.usageFlag = document.createElement("div");
		this.usageFlag.className = "dcalc_usage_flag";
		
		this.usageText = document.createElement("div");
		this.usageText.className = "dcalc_usage_flag_text";
		
		this.zeroMarker = document.createElement("div");
		this.zeroMarker.className = "dcalc_graph_zero_marker";
		
		this.graphLabel = new GraphLabel();
		
		this.heading.appendChild(this.orangeText);
		this.deviceLabelContainer.appendChild(this.graphLabel.element);
		
		this.element.appendChild(this.bar);
		this.element.appendChild(this.barReflection)
		this.element.appendChild(this.deviceImage);
		this.element.appendChild(this.deviceLabelContainer);
		this.element.appendChild(this.incrementMarkerContainer);
		this.element.appendChild(this.zeroMarker);
		this.element.appendChild(this.usageFlag);
		this.element.appendChild(this.heading);
		
		this.usageFlag.appendChild(this.usageText);
		
		var marker;
		
		// for (var j = 0; j < $aIncrements.length; j++)
		// {
		// 	var labelNum = parseFloat($aIncrements[j]);
		// 	
		// 	var bClickableLabel = (labelNum >= 10) ? false : true;
		// 	
		// 	marker = this.incrementMarkers[j] = new IncrementMarker(
		// 		parseFloat($aIncrements[j]), bClickableLabel);
		// 		
		// 	if(bClickableLabel)
		// 	{
		// 		marker.clicked.add(function($sNum){
		// 			_this.markerClicked.dispatch($sNum);
		// 		});
		// 	}
		// 	
		// 	this.incrementMarkerContainer.appendChild(marker.element);
		// 	
		// }
		
		for (var j = 0; j < $aIncrements.length; j++)
		{
			var labelNum = parseFloat($aIncrements[j]);
			
			marker = this.incrementMarkers[j] = new IncrementMarker(
				parseFloat($aIncrements[j]));
			
			this.incrementMarkerContainer.appendChild(marker.element);
			
		}
			
		this.incrementMarkerContainer.appendChild(this.unlimitedMarker);
		
		
	}
	
	return GraphView;
	
});

























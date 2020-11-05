define([

"../lib/utils/trace"
,
"../lib/utils/utils"
],

function(

trace
,
utils

)
{
	var PlansModalView = function()
	{
		this.overlay = document.getElementById("msr_modal_overlay");

		this.element = document.createElement("div");
		this.element.className = "msr_plans_modal";

		this.frame = document.createElement("iframe");
		this.frame.id = "msr_plans_modal_frame";
		this.frame.className = "msr_plans_modal_frame";
		//this.frame.src = "media/standalone/mobile_share/html/plans_modal.html";
		this.frame.frameBorder = "0";
		this.frame.scrolling = "no";
		
		var url = "media/standalone/mobile_share/html/plans_modal.html";
		
		var includeHomeBase = utils.getParameterByName("blender");
		
		if (includeHomeBase && utils.stringToBool(includeHomeBase) == true)
		{
			url += "?blender=true";
		}
		
		this.frame.src = url;//"media/standalone/mobile_share/html/plans_modal.html";
		
		this.element.appendChild(this.frame);
	}

	/* ---------------------------------------------------------------------------------------- */

	var p = PlansModalView.prototype;

	/* ---------------------------------------------------------------------------------------- */

	return PlansModalView;

});



























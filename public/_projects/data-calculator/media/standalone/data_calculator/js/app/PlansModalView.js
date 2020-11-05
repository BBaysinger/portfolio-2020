define([], function(){

	var PlansModalView = function()
	{
		this.overlay = document.getElementById("dcalc_modal_overlay");

		this.element = document.createElement("div");
		this.element.className = "dcalc_plans_modal";

		this.frame = document.createElement("iframe");
		this.frame.className = "dcalc_plans_modal_frame";
		this.frame.src = "media/standalone/data_calculator/html/plans_modal.html";
		this.frame.frameBorder = "0";
		this.frame.scrolling = "no";

		this.closeBtn = document.createElement("a");
		this.closeBtn.className = "dcalc_btn_close";
		this.closeBtn.href = "#";
		this.closeBtn.innerHTML = "Close";

		this.element.appendChild(this.closeBtn);
		this.element.appendChild(this.frame);
	}

	/* ---------------------------------------------------------------------------------------- */

	var p = PlansModalView.prototype;

	/* ---------------------------------------------------------------------------------------- */

	return PlansModalView;

});
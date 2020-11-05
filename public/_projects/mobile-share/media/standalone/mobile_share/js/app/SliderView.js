define([

"app/Follower"

], function(

Follower

){

	var SliderView = function()
	{
		this.element = document.createElement("div");
		this.element.className = "msr_slider";
		
		this.progress = document.createElement("div");
		this.progress.className = "msr_slider_progress";
		
		this.ticks = document.createElement("div");
		this.ticks.className = "msr_slider_ticks";
		
		this.labels = [];

		/* ---------------------------------------------------------------------------------------- */
		
		for (var i = 0; i < 5; i++)
		{
			this.labels[i] = document.createElement("a");
			this.labels[i].href = "javascript:";
			this.labels[i].className = "msr_slider_label msr_label_" + (i + 1);
			this.labels[i].innerHTML = (i + 1) + "GB";
			this.element.appendChild(this.labels[i]);
		}
		
		/* ---------------------------------------------------------------------------------------- */
		
		this.element.appendChild(this.progress);
		this.element.appendChild(this.ticks);
		
	}
	
	var p = SliderView.prototype;

	/* ---------------------------------------------------------------------------------------- */

	return SliderView;

});
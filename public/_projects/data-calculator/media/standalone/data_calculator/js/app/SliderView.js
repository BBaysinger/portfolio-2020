define([

"app/Follower"

], function(

Follower

){

	var SliderView = function()
	{
		this.element = document.createElement("div");
		this.element.className = "dcalc_slider";

		this.progress = document.createElement("div");
		this.progress.className = "dcalc_progress";

		/* ---------------------------------------------------------------------------------------- */

		// this.labelOne = document.createElement("a");
		// this.labelOne.href = "#";
		// this.labelOne.className = "dcalc_slider_label dcalc_label_one";
		// this.labelOne.innerHTML = "1GB";
		// 
		// this.labelTwo = document.createElement("a");
		// this.labelTwo.href = "#";
		// this.labelTwo.className = "dcalc_slider_label dcalc_label_two";
		// this.labelTwo.innerHTML = "2GB";
		// 
		// this.labelThree = document.createElement("a");
		// this.labelThree.href = "#";
		// this.labelThree.className = "dcalc_slider_label dcalc_label_three";
		// this.labelThree.innerHTML = "3GB";
		// 
		// this.labelFour = document.createElement("a");
		// this.labelFour.href = "#";
		// this.labelFour.className = "dcalc_slider_label dcalc_label_four";
		// this.labelFour.innerHTML = "4GB";
		// 
		// this.labelFive = document.createElement("a");
		// this.labelFive.href = "#";
		// this.labelFive.className = "dcalc_slider_label dcalc_label_five";
		// this.labelFive.innerHTML = "5GB";
		// 
		// /* ---------------------------------------------------------------------------------------- */
		// 
		// this.element.appendChild(this.labelOne);
		// this.element.appendChild(this.labelTwo);
		// this.element.appendChild(this.labelThree);
		// this.element.appendChild(this.labelFour);
		// this.element.appendChild(this.labelFive);
		
		this.element.appendChild(this.progress);


	}
	var p = SliderView.prototype;


	/* ---------------------------------------------------------------------------------------- */

	return SliderView;



});
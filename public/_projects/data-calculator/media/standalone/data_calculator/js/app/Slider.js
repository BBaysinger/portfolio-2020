define([

"../lib/utils/trace"
,
"app/Follower"
,
"../lib/utils/signals"
,
"app/MaximumDataModal"
,
"app/SliderView"
],

function(

trace
,
Follower
,
signals
,
maximumDataModal
,
SliderView

)
{
	//Singleton
	var Slider = function($nValue, $nMultiplier, $bSnap)
	{

		var self = this;

		this.bSnap = $bSnap;

		this.view = new SliderView();		

		// Has to do with the visual width of the slider
		this.nMinTranslation = 0;
		this.nMaxTranslation = 327;


		// Handle
		this.handle = new Follower(document.createElement("div"), {
			minX: this.nMinTranslation,
			maxX: this.nMaxTranslation,
			followY:false
		});
		this.handle.element.className = "dcalc_slider_handle";
		this.view.element.appendChild(this.handle.element);
		this.handle.changed.add(function($nValue){
			self.onHandlePositionChanged($nValue);
		});

		// Passed in to deal with certain sliders having fraction values
		this.nMultiplier = $nMultiplier || 1;

		this.valueChanged = new signals.Signal();
		this.handlePositionChanged = new signals.Signal();
		this.trackClicked = new signals.Signal();

		this.enableEvents();

		this.setValue($nValue);
		this.valueChanged.dispatch();


	}
	var p = Slider.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.enableEvents = function()
	{
		var self = this;


		jQuery(this.handle.element).bind(
			"mousedown", function(e)
			{
				e.preventDefault();
				self.onSliderDown(e);
			}
		);

		jQuery(this.handle.element).bind(
			"touchstart", function(e)
			{
				e.preventDefault();
				self.onSliderDown(e);
			}
		);

		jQuery(this.handle.element).bind(
			"mouseup", function(e)
			{
				self.onSliderUp(e);
			}
		);

		jQuery(this.handle.element).bind(
			"touchend", function(e)
			{
				self.onSliderUp(e);
			}
		);

		jQuery(this.view.element).click(function(e){
			self.handleTrackClicked(e);
		});

		this.aIncrementLinks = jQuery(this.view.element).find(".dcalc_slider_label");
		this.aIncrementLinks.click(function(e){
			e.preventDefault();
			self.handleIncrementClicked(e);
		});

	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleTrackClicked = function(e)
	{
		if(e.target == this.view.element || e.target == this.view.progress){
			var nClientX = (e.pageX || e.originalEvent.touches[0].pageX);
			var nLeftValue = nClientX - jQuery(this.view.element).offset().left;

			var nValue = ((nLeftValue-20)/this.nMaxTranslation).toFixed(1);
			nValue = ((nLeftValue-20)/this.nMaxTranslation).toFixed(2);

			if(nLeftValue > 20){
				this.setValue(nValue);
				this.valueChanged.dispatch();
			}
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleIncrementClicked = function(e)
	{
		var nIndex = jQuery.inArray(e.target, this.aIncrementLinks);
		this.setValue(((nIndex+1)/5));
		this.valueChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onSliderDown = function(e)
	{
		var self = this;
		this.handle.follow(e);
		jQuery(document).bind("touchend", function(){ self.onSliderUp();});
		jQuery(document).bind("mouseup", function(){ self.onSliderUp();});
		jQuery(window.parent.document).bind("touchend", function(){ self.onSliderUp();});
		jQuery(window.parent.document).bind("mouseup", function(){ self.onSliderUp();});
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onSliderUp = function()
	{
		this.handle.stop();
		jQuery(document).unbind("mouseup");
		jQuery(document).unbind("touchend");
		jQuery(document).unbind("mouseup");
		jQuery(document).unbind("touchend");
		this.setValue(this.value * this.nMultiplier);
		this.valueChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onHandlePositionChanged = function($nLeft)
	{
		var nValue = $nLeft / this.nMaxTranslation;
		this.setValue(nValue);
		this.handlePositionChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.setValue = function($nValue)
	{
		var prevValue = this.value;
		
		this.nLeftValue = $nValue * this.nMaxTranslation;
		
		this.view.progress.style.width = this.nLeftValue + 10 + "px";

		this.value = $nValue / this.nMultiplier;

		this.handle.snapTo( this.nLeftValue, 0);
	}

	/* ---------------------------------------------------------------------------------------- */

	p.updateValue = function($nValue)
	{
		this.setValue($nValue);
		this.handlePositionChanged.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */
	
	return Slider;
	
});

























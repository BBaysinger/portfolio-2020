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
,
"app/DeviceTypes"
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
,
DeviceTypes

)
{
	var SliderControl = function($nValue, $nSnap, $nWidth)//, $nMultiplier)
	{   
		var _this = this;
		
		this.nSnap = $nSnap;
				
		this.view = new SliderView();
		
		this.nNumMarkers = 5;
		// Has to do with the visual width of the slider
		this.nMinTranslation = 0;
		this.nMaxTranslation = $nWidth;
		
		this.bMaxed = false;
		
		// Handle
		this.handle = new Follower(document.createElement("div"), {
			minX: this.nMinTranslation,
			maxX: this.nMaxTranslation,
			followY:false
		});
		this.handle.element.className = "msr_slider_handle";
		this.view.element.appendChild(this.handle.element);
		this.handle.changed.add(function($nValue){
			_this.onHandleChange($nValue);
		});
		
		// Passed in to deal with certain sliders having fraction values
		
		this.valueChanged = new signals.Signal();
		
		this.userRelease = new signals.Signal();
		
		this.enableEvents();
		
		this.privateSetValue($nValue);
		 
	}
	
	var p = SliderControl.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.enableEvents = function()
	{
		var _this = this;
		
		jQuery(this.handle.element).bind(
			"mousedown", function(e)
			{
				e.preventDefault();
				_this.onSliderDown(e);
			}
		);
		
		jQuery(this.handle.element).bind(
			"touchstart", function(e)
			{
				e.preventDefault();
				_this.onSliderDown(e);
			}
		);
		
		jQuery(this.handle.element).bind(
			"mouseup", function(e)
			{
				_this.onSliderUp(e);
			}
		);
		
		jQuery(this.handle.element).bind(
			"touchend", function(e)
			{
				_this.onSliderUp(e);
			}
		);
		
		jQuery(this.view.element).click(function(e){
			_this.handleTrackClicked(e);
		});
		
		this.aIncrementLinks = jQuery(this.view.element).find(".msr_slider_label");
		
		this.aIncrementLinks.click(function(e){
			e.preventDefault();
			_this.handleIncrementClicked(e);
		});
		
	}
	
	p.setIncrements = function(nTotal, nIncrementShim, nIncrement, sUnit, nTypical, $nType)
	{   
		this.nNumMarkers = nTotal;
		
		for (var i = 0; i < 5; i++)
		{
			this.view.labels[i].style.left = Math.round((i+1) * (this.nMaxTranslation/nTotal)) + "px";
			this.view.labels[i].innerHTML = (i+1) * nIncrement + nIncrementShim + sUnit;
			
			if ((i+1)/nTotal == nTypical)// && $nType != DeviceTypes.ATT_HOME_BASE)
			{
				this.view.labels[i].innerHTML += "*";	
			}
			
			this.view.labels[i].style.display = (i < nTotal) ? "block" : 'none';
		}
		
		jQuery(this.view.element).toggleClass("msr_slider_4tick", nTotal == 3);
		jQuery(this.view.element).toggleClass("msr_slider_5tick", nTotal == 4);
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleTrackClicked = function(e)
	{
		if(e.target == this.view.ticks || e.target == this.view.element  || e.target == this.view.progress){
			var nClientX = (e.pageX || e.originalEvent.touches[0].pageX);
			var nLeftValue = nClientX - jQuery(this.view.element).offset().left;
			
			var nXOffset = 20;//To center of handle (40px width)
			var nOffsetLeft = nLeftValue - 20;
			var nPct = nOffsetLeft/this.nMaxTranslation;
			var nMinPct = this.handle.options.nMinX/this.nMaxTranslation;
			
			var nValue = Math.max(nPct, nMinPct).toFixed(2);
			
			if(nOffsetLeft > 0)
			{
				this.privateSetValue(this.figureIncrement(nValue), true);
			}
			
			this.userRelease.dispatch();
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.handleIncrementClicked = function(e)
	{
		var nIndex = jQuery.inArray(e.target, this.aIncrementLinks);
		this.privateSetValue((nIndex+1)/this.nNumMarkers);
		this.userRelease.dispatch();
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onSliderDown = function(e)
	{
		var _this = this;
		
		_this.handle.follow(e);
		
		jQuery(document).bind("touchend", function(){ _this.onSliderUp();});
		jQuery(document).bind("mouseup", function(){ _this.onSliderUp();});
		
		if (window.self !== window.top)
		{
			jQuery(window.parent.document).bind("touchend", function(){ _this.onSliderUp();});
			jQuery(window.parent.document).bind("mouseup", function(){ _this.onSliderUp();});
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onSliderUp = function()
	{
		this.handle.stop();
		jQuery(document).unbind("mouseup");
		jQuery(document).unbind("touchend");
		jQuery(window.parent.document).unbind("mouseup");
		jQuery(window.parent.document).unbind("touchend"); 
		this.privateSetValue(this.value, true);
		
		this.userRelease.dispatch();
		
	}

	/* ---------------------------------------------------------------------------------------- */

	p.onHandleChange = function($nLeft)
	{  
		var nValue = $nLeft / this.nMaxTranslation;
		this.privateSetValue(nValue);
	}

	/* ---------------------------------------------------------------------------------------- */
    
	p.privateSetValue = function($nValue, bSnapIncrement)
	{   
		this.setValue($nValue, bSnapIncrement);
		this.valueChanged.dispatch();
	}
	
	/* ---------------------------------------------------------------------------------------- */

	p.setValue = function($nValue, bSnapIncrement)
	{   
		if($nValue > 1.001)
		{
			if(!this.bMaxed)
			{
				this.nLeftValue = this.nMaxTranslation;
				this.view.labels[this.nNumMarkers - 1].innerHTML = 
					this.view.labels[this.nNumMarkers - 1].innerHTML.replace("B", "B+");
				this.bMaxed = true;
			}
		}
		else
		{
			this.nLeftValue = $nValue * this.nMaxTranslation;
			this.bMaxed = false;
			this.view.labels[this.nNumMarkers - 1].innerHTML =
				this.view.labels[this.nNumMarkers - 1].innerHTML.replace("+", "");
		}
		
		this.view.progress.style.width =
			Math.max(this.handle.options.nMinX, this.nLeftValue) + 10 + "px";
		
		this.value = this.figureIncrement($nValue);
		
		if(bSnapIncrement)
		{   
			this.handle.snapTo( this.figureIncrement(this.nLeftValue), 0);	
		} 
		else {
			this.handle.snapTo(this.nLeftValue, 0);
		}

	}

	/* ---------------------------------------------------------------------------------------- */

	//this is being called more than expected.
	p.figureIncrement = function($nValue)
	{   
		// Math for snapping to different fractionsal positions between markers.
		
		if (isNaN(this.nSnap)) 
		{
			return $nValue;
		}
		else
		{
			var base = Math.floor(this.nNumMarkers*$nValue);
			var remainder = this.nNumMarkers*$nValue - base;
			var roundedRemainder = Math.round(remainder*this.nSnap)/this.nSnap;
			
			return (base + roundedRemainder) / this.nNumMarkers;
			
		}
		
		//return (!isNaN(this.nSnap)) ? (Math.round($nValue*this.nSnap*4)/4)/this.nSnap : $nValue;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	return SliderControl;
	
});

























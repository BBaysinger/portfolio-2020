define([

"../lib/utils/trace"
,
"../lib/utils/signals"

], function(

trace
,
signals

){

	var Follower = function($element, $options)
	{
		this.element = $element;
		var options = $options;

		this.options = {

			bFollowX: (options.followX == false) ? false : true,

			bFollowY: (options.followY == false) ? false : true,

			nMaxX: options.maxX || null,

			nMinX: (options.minX == undefined) ? null : options.minX,

			nMaxY: options.maxY || null,

			nMinY: options.minY || null

		}

		this.parentOffsetX = null;
		this.parentOffsetY = null;
		this.changed = new signals.Signal();

	}
	var p = Follower.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.follow = function(e)
	{
		var self = this;
		
		if(!this.options.bFollowY && !this.options.bFollowX) return;
		
		if(this.options.bFollowX)
		{
			var el = jQuery(this.element);
			var nStartX = el.offset().left;
			var nMouseStartX = (e.pageX || e.originalEvent.touches[0].pageX) - nStartX;
			
			if(!this.parentOffsetX) this.parentOffsetX = jQuery(el.parent()).offset().left;// First time only
			
			function posX(e){
				e.preventDefault();
				var nXDest = (e.pageX || e.originalEvent.touches[0].pageX) -
					nMouseStartX - self.parentOffsetX;
				
				if( nXDest >= self.options.nMaxX) nXDest = self.options.nMaxX;
				else if( nXDest <= self.options.nMinX) nXDest = self.options.nMinX;
				
				// self.element.style.left = nXDest + "px"; // Follow mouse if it's true.
				self.snapTo(nXDest);
				self._onFollow();
			}
			
			jQuery(document).bind("mousemove", posX);
			jQuery(document).bind("touchmove", posX);
		}
		
		if(this.options.bFollowY)
		{
			var el = jQuery(this.element);
			var nStartY = el.offset().top;
			var nMouseStartY = e.pageY - nStartY;
			
			if (!this.parentOffsetY) this.parentOffsetY = jQuery(el.parent()).offset().top; // First time only
			
			function posY(e) {
				e.preventDefault();
				var nYDest = e.pageY - nMouseStartY - self.parentOffsetY;
				
				if( nYDest >= self.options.nMaxY) nYDest = self.options.nMaxY;
				else if( nYDest <= self.options.nMinY) nYDest = self.options.nMinY;
				
				self.element.style.left = nYDest + "px"; // Follow mouse if it's true.
			}
			
			jQuery(document).bind("mousemove", posY);
			jQuery(document).bind("touchmove", posY);
			
		}
		
	}

	/* ---------------------------------------------------------------------------------------- */

	p.snapTo = function($nX, $nY)
	{
		this.element.style.left = Math.max(Math.round($nX), this.options.nMinX) + "px";
		if($nY) this.element.style.top = $nY + "px";
	}

	/* ---------------------------------------------------------------------------------------- */

	p._onFollow = function()
	{
		this.changed.dispatch(parseInt(this.element.style.left));
	}

	/* ---------------------------------------------------------------------------------------- */

	p.stop = function()
	{
		jQuery(document).unbind("touchmove");
		jQuery(document).unbind("mousemove");
	}

	/* ---------------------------------------------------------------------------------------- */

	return Follower;

});
var Parallax = function(){}

Parallax.prototype.elementsArray = [];

Parallax.prototype.init = function()
{	
	var parallaxElements;
	// if (window.matchMedia("(min-width: 769px)").matches)
		parallaxElements = document.getElementsByClassName("parallax");
	// else
		// parallaxElements = document.getElementsByClassName("mobile-parallax");

	for (var i = 0; i < parallaxElements.length; i++)
	{
		this.elementsArray.push(new ParallaxElement(parallaxElements[i]));
	}

	this.setElementPositions();
}

Parallax.prototype.scroll = function()
{
	this.setElementPositions();
};

Parallax.prototype.resize = function()
{
	this.setElementPositions();
};

Parallax.prototype.setElementPositions = function()
{
	for (var i = 0; i < this.elementsArray.length; i++)
	{
		this.elementsArray[i].setPosition();
	}
}

function ParallaxElement(elem)
{
	var self = this;
	this.winH = window.innerHeight;
	this.elem = elem;
	this.elem.style.transform = "translate3d(0, 0px, 0)";

	// var curTransform = String(getComputedStyle(this.elem).getPropertyValue("transform"));
	// console.log(this.elem);
	// console.log(curTransform);

	// var newTransform;
	// if (curTransform.indexOf("translateY") < 0)
	// 	newTransform = curTransform += " translateY(0px)";
	// this.elem.style.transform = newTransform;

	/*
	* The y position of the (element minus any height added to its relative top) compared
	* to the y position of the user's window.
	*/
	this.currenPositionWorld = function() {
		// return (this.elem.getBoundingClientRect().top + this.elem.getBoundingClientRect().height * this.elem.dataset.offset) - parseFloat(this.elem.style.top);
		return (this.elem.getBoundingClientRect().top + this.elem.getBoundingClientRect().height * this.elem.dataset.offset) - this.getComputedTranslateY(this.elem); //parseFloat(this.elem.style.transform.replace(/[^0-9.]/g, ''));
	}

	/*
	* The distance from the user
	*/
	this.zDistance = function() {
		return 1/this.elem.dataset.distance;
	}

	/*
	* Horizon point where the element is at top: 0
	*/
	this.horizon = function() {
		return this.elem.dataset.horizon;
	}

	this.getComputedTranslateY = function(obj)
	{
	    if(!window.getComputedStyle) return;
	    var style = getComputedStyle(obj),
	        transform = style.transform || style.webkitTransform || style.mozTransform;
	    var mat = transform.match(/^matrix3d\((.+)\)$/);
	    if(mat) return parseFloat(mat[1].split(', ')[13]);
	    mat = transform.match(/^matrix\((.+)\)$/);
	    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
	}

	/*
	* Sets element to new position.
	*/
	this.setPosition = function() {

		// if (window.matchMedia("(max-width: 768px)").matches && !$(this.elem).hasClass("mobile-parallax"))
		// {
			// $(this.elem).css({"transform": "translate3d(0, 0, 0)"});
		// }
		// else
		// {		
			var curDistance = this.currenPositionWorld() - this.winH*this.horizon();
			// this.elem.style.top = (curDistance * this.zDistance()) + "px";
			this.elem.style.transform = "translate3d(0, " + (curDistance * this.zDistance()) + "px, 0)";
		// }

		// var curTransform = String(self.elem.style.transform);
		// var newTransform = curTransform.replace(/translateY\(-?\d+px\)/, "translateY(" + curDistance * this.zDistance() + "px)");
		// this.elem.style.transform = newTransform;
	}
}
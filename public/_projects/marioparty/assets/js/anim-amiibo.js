var Amiibo = function(lib, img, cjs, ss, an) 
{
	this.lib = lib;
	this.img = img;
	this.cjs = cjs;
	this.ss = ss;
	this.an = an;

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 840,
	height: 385,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:_assetPath + "img/buy/anim-amiibo1.png", id:"amiibo1"},
		{src:_assetPath + "img/buy/anim-amiibo2_2.png", id:"amiibo2_2"},
		{src:_assetPath + "img/buy/anim-amiibo3_2.png", id:"amiibo3_2"},
		{src:_assetPath + "img/buy/anim-n1.png", id:"n1"},
		{src:_assetPath + "img/buy/anim-n2.png", id:"n2"},
		{src:_assetPath + "img/buy/anim-n3.png", id:"n3"},
		{src:_assetPath + "img/buy/anim-n4.png", id:"n4"},
		{src:_assetPath + "img/buy/anim-s1.png", id:"s1"},
		{src:_assetPath + "img/buy/anim-s2.png", id:"s2"},
		{src:_assetPath + "img/buy/anim-s3.png", id:"s3"},
		{src:_assetPath + "img/buy/anim-s4.png", id:"s4"},
		{src:_assetPath + "img/buy/anim-shadow.png", id:"shadow"}
	]
};


lib.ssMetadata = [];


// symbols:
(lib.amiibo1 = function() {
	this.initialize(img.amiibo1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,254);


(lib.amiibo2_2 = function() {
	this.initialize(img.amiibo2_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,227,277);


(lib.amiibo3_2 = function() {
	this.initialize(img.amiibo3_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,149,288);


(lib.n1 = function() {
	this.initialize(img.n1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,25,42);


(lib.n2 = function() {
	this.initialize(img.n2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,45,53);


(lib.n3 = function() {
	this.initialize(img.n3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,38,53);


(lib.n4 = function() {
	this.initialize(img.n4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,80);


(lib.s1 = function() {
	this.initialize(img.s1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,38,41);


(lib.s2 = function() {
	this.initialize(img.s2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,48,53);


(lib.s3 = function() {
	this.initialize(img.s3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,42,46);


(lib.s4 = function() {
	this.initialize(img.s4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,31,33);


(lib.shadow = function() {
	this.initialize(img.shadow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,247,24);


(lib.Symbol15copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.n4();
	this.instance.parent = this;
	this.instance.setTransform(32.9,-28.9,1,1,41.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-28.9,75.5,79.8);


(lib.Symbol15copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.n3();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38,53);


(lib.Symbol15copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.n1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25,42);


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.n2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45,53);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.s4();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,31,33);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.s1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38,41);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.s3();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42,46);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.s2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48,53);


(lib.Symbol1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.amiibo3_2();
	this.instance.parent = this;
	this.instance.setTransform(-151,-288);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151,-288,149,288);


(lib.Symbol1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.amiibo2_2();
	this.instance.parent = this;
	this.instance.setTransform(-205,-277);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-205,-277,227,277);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.amiibo1();
	this.instance.parent = this;
	this.instance.setTransform(-152,-254);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-152,-254,153,254);


(lib.shadow_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shadow();
	this.instance.parent = this;
	this.instance.setTransform(-123,-12);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123,-12,247,24);


(lib.Symbol10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol15copy();
	this.instance.parent = this;
	this.instance.setTransform(22.5,26.5,1,1,0,0,0,22.5,26.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(28).to({regY:26.4,scaleX:1.04,scaleY:0.91,x:22.6,y:28.9},8,cjs.Ease.get(-1)).to({regX:22.4,regY:26.6,scaleX:0.95,scaleY:0.96,skewX:-6.8,x:21.3,y:22.2},5,cjs.Ease.get(1)).to({regX:22.5,regY:26.4,scaleX:1.04,scaleY:0.92,skewX:-7.4,x:20.7,y:28.9},5,cjs.Ease.get(-1)).to({regY:26.5,scaleX:1,scaleY:1,skewX:0,x:22.5,y:26.5},5).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25,42);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol15();
	this.instance.parent = this;
	this.instance.setTransform(22.5,26.5,1,1,0,0,0,22.5,26.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({regY:26.4,scaleX:1.04,scaleY:0.91,x:22.6,y:28.9},8,cjs.Ease.get(-1)).to({regX:22.6,regY:26.6,scaleX:0.95,scaleY:0.95,x:23.2,y:22.2},5,cjs.Ease.get(1)).to({regX:22.5,regY:26.4,scaleX:1.04,scaleY:0.91,x:22.6,y:28.9},5,cjs.Ease.get(-1)).to({regY:26.5,scaleX:1,scaleY:1,x:22.5,y:26.5},5).wait(23));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45,53);


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol15copy2();
	this.instance.parent = this;
	this.instance.setTransform(22.5,26.5,1,1,0,0,0,22.5,26.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({regX:21.3,regY:28.3,scaleX:1.11,scaleY:0.81,skewX:2.6,skewY:15,x:22.2,y:33.8},8,cjs.Ease.get(-1)).to({regX:22.4,regY:26.4,scaleX:0.95,scaleY:0.96,skewX:2,skewY:5,x:23.1,y:20.9},5,cjs.Ease.get(1)).to({regX:22.3,regY:26.7,scaleX:1.11,scaleY:0.85,skewX:-24,skewY:-3.5,x:16.5,y:31.6},5,cjs.Ease.get(-1)).to({regX:22.5,regY:26.5,scaleX:1,scaleY:1,skewX:0,skewY:0,x:22.5,y:26.5},10).wait(18));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38,53);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol15copy3();
	this.instance.parent = this;
	this.instance.setTransform(28.8,48.4,1,1,-38.7,0,0,22.6,26.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(28).to({regX:22.4,scaleX:1.04,scaleY:0.91,x:30.2,y:50.4},8,cjs.Ease.get(-1)).to({regY:26.6,scaleX:0.95,scaleY:0.96,rotation:0,skewX:-45.5,skewY:-38.7,x:25,y:45.8},5,cjs.Ease.get(1)).to({regX:22.5,regY:26.5,scaleX:1.04,scaleY:0.92,skewX:-46.1,x:28.8,y:51.5},5,cjs.Ease.get(-1)).to({regX:22.6,scaleX:1,scaleY:1,rotation:-38.7,skewX:0,skewY:0,y:48.4},5).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.2,-15.3,108.8,109.5);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1 copy
	this.instance = new lib.Symbol13();
	this.instance.parent = this;
	this.instance.setTransform(19,20.5,1,1,0,0,0,19,20.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.82,scaleY:0.82},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({regX:19.1,scaleX:0.77,scaleY:0.77,x:19.1},0).wait(1).to({regX:19,scaleX:0.8,scaleY:0.8,x:19},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.82,scaleY:0.82},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:18.9},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:19},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:18.9},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:19},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:18.9},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:19},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:18.9},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:19},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:18.9},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:19},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:18.9},0).wait(1).to({scaleX:1,scaleY:1,x:19},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38,41);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol11();
	this.instance.parent = this;
	this.instance.setTransform(24,26.5,1,1,0,0,0,24,26.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.82,scaleY:0.82},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({scaleX:0.79,scaleY:0.79},0).wait(1).to({scaleX:0.79,scaleY:0.79},0).wait(1).to({scaleX:0.78,scaleY:0.78},0).wait(1).to({scaleX:0.78,scaleY:0.78},0).wait(1).to({scaleX:0.77,scaleY:0.77},0).wait(1).to({scaleX:0.77,scaleY:0.77},0).wait(1).to({scaleX:0.77,scaleY:0.77},0).wait(1).to({regX:24.1,regY:26.6,y:26.6},0).wait(1).to({regX:24,regY:26.5,x:23.9,y:26.4},0).wait(1).to({scaleX:0.77,scaleY:0.77,y:26.5},0).wait(1).to({scaleX:0.77,scaleY:0.77,y:26.4},0).wait(1).to({scaleX:0.78,scaleY:0.78,y:26.5},0).wait(1).to({scaleX:0.78,scaleY:0.78},0).wait(1).to({scaleX:0.79,scaleY:0.79,y:26.4},0).wait(1).to({scaleX:0.79,scaleY:0.79,y:26.5},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:26.4},0).wait(1).to({scaleX:0.8,scaleY:0.8,y:26.5},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.82,scaleY:0.82,y:26.4},0).wait(1).to({scaleX:0.83,scaleY:0.83,y:26.5},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.86,scaleY:0.86,y:26.4},0).wait(1).to({scaleX:0.87,scaleY:0.87,y:26.5},0).wait(1).to({scaleX:0.88,scaleY:0.88,y:26.4},0).wait(1).to({scaleX:0.89,scaleY:0.89,y:26.5},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:26.4},0).wait(1).to({scaleX:0.91,scaleY:0.91,y:26.5},0).wait(1).to({scaleX:0.92,scaleY:0.92,y:26.4},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.96,scaleY:0.96,y:26.5},0).wait(1).to({scaleX:0.96,scaleY:0.96,y:26.4},0).wait(1).to({scaleX:0.97,scaleY:0.97,y:26.5},0).wait(1).to({scaleX:0.98,scaleY:0.98,y:26.4},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:26.5},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:26.4},0).wait(1).to({scaleX:1,scaleY:1,y:26.5},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1,x:24},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48,53);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1 copy
	this.instance = new lib.Symbol12();
	this.instance.parent = this;
	this.instance.setTransform(21,23,1,1,0,0,0,21,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.82,scaleY:0.82},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.8,scaleY:0.8},0).wait(1).to({regX:20.9,scaleX:0.77,scaleY:0.77},0).wait(1).to({regX:21,scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.82,scaleY:0.82},0).wait(1).to({scaleX:0.83,scaleY:0.83},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87,x:21.1},0).wait(1).to({scaleX:0.87,scaleY:0.87,x:21},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:21.1},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:21},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:21.1},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:21},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:21.1},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:21},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:21.1},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:21},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:21.1},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:21},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:21.1},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:21},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42,46);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1 copy
	this.instance = new lib.Symbol14();
	this.instance.parent = this;
	this.instance.setTransform(15.5,16.5,1,1,0,0,0,15.5,16.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(3).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.85,scaleY:0.85},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.86,scaleY:0.86},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.87,scaleY:0.87},0).wait(1).to({scaleX:0.88,scaleY:0.88},0).wait(1).to({scaleX:0.89,scaleY:0.89},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.9,scaleY:0.9},0).wait(1).to({scaleX:0.91,scaleY:0.91},0).wait(1).to({scaleX:0.92,scaleY:0.92},0).wait(1).to({scaleX:0.93,scaleY:0.93},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.94,scaleY:0.94},0).wait(1).to({scaleX:0.95,scaleY:0.95},0).wait(1).to({scaleX:0.96,scaleY:0.96},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.97,scaleY:0.97},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.98,scaleY:0.98},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,31,33);


// stage content:



(lib.buy_amiibos = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_209 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(209).call(this.frame_209).wait(4));

	// shadow1
	this.instance = new lib.shadow_1();
	this.instance.parent = this;
	this.instance.setTransform(214,371);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:0.5,scaleX:1.01,scaleY:1,x:303,alpha:0.994},0).wait(1).to({scaleX:1.02,scaleY:0.99,x:334.3,alpha:0.988},0).wait(1).to({scaleX:1.03,scaleY:0.99,x:356.2,alpha:0.983},0).wait(1).to({scaleX:1.05,scaleY:0.99,x:373.3,alpha:0.977},0).wait(1).to({scaleX:1.06,scaleY:0.99,x:387.3,alpha:0.971},0).wait(1).to({scaleX:1.07,scaleY:0.98,x:399.2,alpha:0.965},0).wait(1).to({scaleX:1.08,scaleY:0.98,x:409.4,alpha:0.96},0).wait(1).to({scaleX:1.09,scaleY:0.98,x:418.4,alpha:0.954},0).wait(1).to({scaleX:1.1,scaleY:0.97,x:426.3,alpha:0.948},0).wait(1).to({scaleX:1.12,scaleY:0.97,x:433.4,alpha:0.942},0).wait(1).to({scaleX:1.13,scaleY:0.97,x:439.7,alpha:0.936},0).wait(1).to({scaleX:1.14,scaleY:0.96,x:445.4,alpha:0.931},0).wait(1).to({scaleX:1.15,scaleY:0.96,x:450.6,alpha:0.925},0).wait(1).to({scaleX:1.16,scaleY:0.96,x:455.3,alpha:0.919},0).wait(1).to({scaleX:1.17,scaleY:0.95,x:459.6,alpha:0.913},0).wait(1).to({scaleX:1.18,scaleY:0.95,x:463.5,alpha:0.907},0).wait(1).to({scaleX:1.2,scaleY:0.95,x:467,alpha:0.902},0).wait(1).to({scaleX:1.21,scaleY:0.95,x:470.3,alpha:0.896},0).wait(1).to({scaleX:1.22,scaleY:0.94,x:473.3,alpha:0.89},0).wait(1).to({scaleX:1.23,scaleY:0.94,x:476.1,alpha:0.884},0).wait(1).to({scaleX:1.24,scaleY:0.94,x:478.6,alpha:0.879},0).wait(1).to({scaleX:1.25,scaleY:0.93,x:481,alpha:0.873},0).wait(1).to({scaleX:1.26,scaleY:0.93,x:483.1,alpha:0.867},0).wait(1).to({scaleX:1.28,scaleY:0.93,x:485.1,alpha:0.861},0).wait(1).to({scaleX:1.29,scaleY:0.92,x:486.9,alpha:0.855},0).wait(1).to({scaleX:1.3,scaleY:0.92,x:488.6,alpha:0.85},0).wait(1).to({scaleX:1.31,scaleY:0.92,x:490.1,alpha:0.844},0).wait(1).to({scaleX:1.32,scaleY:0.91,x:491.6,alpha:0.838},0).wait(1).to({scaleX:1.33,scaleY:0.91,x:492.9,alpha:0.832},0).wait(1).to({scaleX:1.35,scaleY:0.91,x:494.1,alpha:0.826},0).wait(1).to({scaleX:1.36,scaleY:0.91,x:495.3,alpha:0.821},0).wait(1).to({scaleX:1.37,scaleY:0.9,x:496.4,alpha:0.815},0).wait(1).to({scaleX:1.38,scaleY:0.9,x:497.3,alpha:0.809},0).wait(1).to({scaleX:1.39,scaleY:0.9,x:498.3,alpha:0.803},0).wait(1).to({scaleX:1.4,scaleY:0.89,x:499.1,alpha:0.798},0).wait(1).to({scaleX:1.42,scaleY:0.89,x:499.9,alpha:0.792},0).wait(1).to({scaleX:1.43,scaleY:0.89,x:500.7,alpha:0.786},0).wait(1).to({scaleX:1.44,scaleY:0.88,x:501.4,alpha:0.78},0).wait(1).to({scaleX:1.45,scaleY:0.88,x:502.1,alpha:0.774},0).wait(1).to({scaleX:1.46,scaleY:0.88,x:502.8,alpha:0.769},0).wait(1).to({scaleX:1.47,scaleY:0.87,x:503.4,alpha:0.763},0).wait(1).to({scaleX:1.48,scaleY:0.87,x:504.1,alpha:0.757},0).wait(1).to({scaleX:1.5,scaleY:0.87,x:504.7,alpha:0.751},0).wait(1).to({scaleX:1.51,scaleY:0.87,x:505.3,alpha:0.745},0).wait(1).to({scaleX:1.52,scaleY:0.86,x:505.9,alpha:0.74},0).wait(1).to({scaleX:1.53,scaleY:0.86,x:506.5,alpha:0.734},0).wait(1).to({scaleX:1.54,scaleY:0.86,x:507.1,alpha:0.728},0).wait(1).to({scaleX:1.55,scaleY:0.85,x:507.8,alpha:0.722},0).wait(1).to({scaleX:1.57,scaleY:0.85,x:508.5,alpha:0.717},0).wait(1).to({scaleX:1.58,scaleY:0.85,x:509.2,alpha:0.711},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:509.9,alpha:0.705},0).wait(1).to({regX:0.1,regY:0.1,scaleX:1.6,scaleY:0.84,x:509.8,alpha:0.699},0).wait(1).to({regX:0.5,regY:0,x:510.4,y:370.9},0).wait(1).to({x:510.5},0).wait(1).to({scaleX:1.6,x:510.6,alpha:0.7},0).wait(1).to({scaleX:1.6,scaleY:0.84,x:510.8,alpha:0.701},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:511.1,alpha:0.702},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:511.6,alpha:0.704},0).wait(1).to({scaleX:1.58,scaleY:0.84,x:512.2,alpha:0.707},0).wait(1).to({scaleX:1.58,scaleY:0.85,x:513,alpha:0.71},0).wait(1).to({scaleX:1.57,scaleY:0.85,x:514,alpha:0.714},0).wait(1).to({scaleX:1.56,scaleY:0.85,x:515.3,alpha:0.719},0).wait(1).to({scaleX:1.55,scaleY:0.85,x:516.7,alpha:0.725},0).wait(1).to({scaleX:1.53,scaleY:0.86,x:518.6,alpha:0.733},0).wait(1).to({scaleX:1.52,scaleY:0.86,x:520.8,alpha:0.742},0).wait(1).to({scaleX:1.49,scaleY:0.87,x:523.5,alpha:0.753},0).wait(1).to({scaleX:1.47,scaleY:0.88,x:526.8,alpha:0.766},0).wait(1).to({scaleX:1.43,scaleY:0.88,x:530.9,alpha:0.783},0).wait(1).to({scaleX:1.39,scaleY:0.9,x:536.1,alpha:0.804},0).wait(1).to({scaleX:1.33,scaleY:0.91,x:543.1,alpha:0.832},0).wait(1).to({scaleX:1.25,scaleY:0.93,x:553.5,alpha:0.874},0).wait(1).to({regX:0,scaleX:1,scaleY:1,x:584,y:371,alpha:1},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:1,scaleY:1},0).to({regX:0.1,regY:0.1,scaleX:1.13,x:603.5,y:371.1},8,cjs.Ease.get(1)).to({regX:0,regY:0,scaleX:1,x:584,y:371},6,cjs.Ease.get(-1)).wait(1).to({scaleX:1.02,x:570},8,cjs.Ease.get(1)).to({scaleX:1,x:584},5,cjs.Ease.get(-1)).wait(1).to({x:594},8,cjs.Ease.get(1)).to({x:584},6,cjs.Ease.get(-1)).wait(24).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({regX:0.5,x:584.4},0).wait(12).to({regX:0,x:584},0).wait(1).to({scaleX:1,scaleY:1},0).to({scaleX:1.02,x:570},8,cjs.Ease.get(1)).to({scaleX:1,x:584},5,cjs.Ease.get(-1)).wait(1).to({x:594},7,cjs.Ease.get(1)).to({x:584},5,cjs.Ease.get(-1)).to({_off:true},28).wait(3));

	// miibo1
	this.instance_1 = new lib.Symbol1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(151.3,373,1,1,-26,0,0,-152,0.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1).to({regX:-75.5,regY:-127,rotation:-26.1,x:271,y:225.2},0).wait(1).to({rotation:-26.2,x:308.4},0).wait(1).to({rotation:-26.4,x:334.3},0).wait(1).to({rotation:-26.7,x:354.2,y:225.1},0).wait(1).to({rotation:-27,x:370.2,y:225},0).wait(1).to({rotation:-27.5,x:383.4},0).wait(1).to({rotation:-27.9,x:394.5,y:224.9},0).wait(1).to({rotation:-28.5,x:403.9,y:224.8},0).wait(1).to({rotation:-29,x:412},0).wait(1).to({rotation:-29.6,x:419,y:224.7},0).wait(1).to({rotation:-30.2,x:425.1},0).wait(1).to({rotation:-30.8,x:430.4},0).wait(1).to({rotation:-31.4,x:435.2},0).wait(1).to({rotation:-31.9,x:439.5},0).wait(1).to({rotation:-32.4,x:443.3},0).wait(1).to({rotation:-32.9,x:446.7,y:224.8},0).wait(1).to({rotation:-33.4,x:449.8},0).wait(1).to({rotation:-33.8,x:452.7,y:224.9},0).wait(1).to({rotation:-34.2,x:455.2},0).wait(1).to({rotation:-34.6,x:457.6,y:225},0).wait(1).to({rotation:-34.9,x:459.8,y:225.1},0).wait(1).to({rotation:-35.2,x:461.8},0).wait(1).to({rotation:-35.5,x:463.6,y:225.2},0).wait(1).to({rotation:-35.8,x:465.3},0).wait(1).to({rotation:-36.1,x:466.9,y:225.3},0).wait(1).to({rotation:-36.3,x:468.2},0).wait(1).to({rotation:-36.5,x:469.5,y:225.4},0).wait(1).to({rotation:-36.8,x:470.7},0).wait(1).to({rotation:-37,x:471.7,y:225.5},0).wait(1).to({rotation:-37.1,x:472.7},0).wait(1).to({rotation:-37.3,x:473.6,y:225.6},0).wait(1).to({rotation:-37.5,x:474.5},0).wait(1).to({rotation:-37.7,x:475.3,y:225.7},0).wait(1).to({rotation:-37.8,x:475.9,y:225.8},0).wait(1).to({rotation:-38,x:476.6},0).wait(1).to({rotation:-38.1,x:477.2},0).wait(1).to({rotation:-38.3,x:477.8,y:225.9},0).wait(1).to({rotation:-38.4,x:478.3},0).wait(1).to({rotation:-38.5,x:478.8},0).wait(1).to({rotation:-38.6,x:479.3,y:226},0).wait(1).to({rotation:-38.7,x:479.8,y:226.1},0).wait(1).to({rotation:-38.8,x:480.3},0).wait(1).to({rotation:-38.9,x:480.8},0).wait(1).to({rotation:-39,x:481.2},0).wait(1).to({rotation:-39.1,x:481.7,y:226.2},0).wait(1).to({rotation:-39.2,x:482.2},0).wait(1).to({rotation:-39.3,x:482.8,y:226.3},0).wait(1).to({rotation:-39.4,x:483.3},0).wait(1).to({rotation:-39.5,x:483.9},0).wait(1).to({x:484.6},0).wait(1).to({rotation:-39.6,x:485.3,y:226.4},0).wait(1).to({regX:-152,regY:0.1,rotation:-39.7,x:508.2,y:373.1},0).wait(1).to({regX:-75.5,regY:-127,x:486,y:226.4},0).wait(2).to({rotation:-39.6,x:486.2},0).wait(1).to({rotation:-39.5,x:486.5,y:226.3},0).wait(1).to({rotation:-39.3,x:487,y:226.2},0).wait(1).to({rotation:-39,x:487.6},0).wait(1).to({rotation:-38.7,x:488.5,y:226},0).wait(1).to({rotation:-38.3,x:489.5,y:225.9},0).wait(1).to({rotation:-37.7,x:490.9,y:225.8},0).wait(1).to({rotation:-37.1,x:492.6,y:225.5},0).wait(1).to({rotation:-36.3,x:494.7,y:225.3},0).wait(1).to({rotation:-35.3,x:497.3,y:225.1},0).wait(1).to({rotation:-34.1,x:500.3,y:224.9},0).wait(1).to({rotation:-32.6,x:504.1,y:224.8},0).wait(1).to({rotation:-30.9,x:508.7,y:224.7},0).wait(1).to({rotation:-28.7,x:514.3,y:224.9},0).wait(1).to({rotation:-25.9,x:521.5,y:225.3},0).wait(1).to({rotation:-22.1,x:531.1,y:226.5},0).wait(1).to({rotation:-16.6,x:545.2,y:229.4},0).wait(1).to({regX:-151.9,regY:0,rotation:0,x:508.2,y:373},0).wait(1).to({y:363},0).wait(1).to({regX:0.1,regY:0.1,rotation:6,x:660.2,y:373.1},0).to({regX:0,regY:0,rotation:13,x:660.1,y:373},8,cjs.Ease.get(1)).to({regX:0.2,regY:0.1,rotation:0,x:660.2,y:373.1},6,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,rotation:-1.7,x:508.2},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:508.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:660.2},0).to({regX:0.3,rotation:1,x:660.3},8,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:660.2},6,cjs.Ease.get(-1)).wait(10).to({regX:-76,regY:-1.8,x:584,y:371.2},0).to({regY:-1.6,scaleX:1.1,scaleY:0.91,y:371.3},13,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,regY:0,scaleX:1,scaleY:1,x:508.2,y:353},0).wait(1).to({regX:-75.5,regY:-127,x:584.5,y:226},0).wait(1).to({y:226.1},0).wait(1).to({y:226.2},0).wait(1).to({y:226.3},0).wait(1).to({y:226.6},0).wait(1).to({y:227},0).wait(1).to({y:227.6},0).wait(1).to({y:228.4},0).wait(1).to({y:229.4},0).wait(1).to({y:230.8},0).wait(1).to({y:232.8},0).wait(1).to({y:236},0).wait(1).to({regX:-151.9,regY:0,x:508.2,y:373},0).wait(1).to({regY:0.1,rotation:-1.7,y:373.1},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:508.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:660.2},0).to({regX:0.3,rotation:1,x:660.3},7,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:660.2},5,cjs.Ease.get(-1)).to({_off:true},28).wait(3));

	// shadow3
	this.instance_2 = new lib.shadow_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(204,352);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({_off:false},0).wait(1).to({regX:0.5,scaleX:1.01,scaleY:1,x:341.3,alpha:0.994},0).wait(1).to({scaleX:1.02,scaleY:0.99,x:389.1,alpha:0.987},0).wait(1).to({scaleX:1.03,scaleY:0.99,x:422.4,alpha:0.981},0).wait(1).to({scaleX:1.03,scaleY:0.99,x:448.2,alpha:0.974},0).wait(1).to({scaleX:1.04,scaleY:0.98,x:469.3,alpha:0.968},0).wait(1).to({scaleX:1.05,scaleY:0.98,x:487.1,alpha:0.962},0).wait(1).to({scaleX:1.06,scaleY:0.98,x:502.3,alpha:0.955},0).wait(1).to({scaleX:1.07,scaleY:0.97,x:515.6,alpha:0.949},0).wait(1).to({scaleX:1.08,scaleY:0.97,x:527.2,alpha:0.942},0).wait(1).to({scaleX:1.09,scaleY:0.97,x:537.6,alpha:0.936},0).wait(1).to({scaleX:1.09,scaleY:0.96,x:546.8,alpha:0.93},0).wait(1).to({scaleX:1.1,scaleY:0.96,x:555.1,alpha:0.923},0).wait(1).to({scaleX:1.11,scaleY:0.96,x:562.5,alpha:0.917},0).wait(1).to({scaleX:1.12,scaleY:0.95,x:569.2,alpha:0.91},0).wait(1).to({scaleX:1.13,scaleY:0.95,x:575.3,alpha:0.904},0).wait(1).to({scaleX:1.14,scaleY:0.95,x:580.8,alpha:0.898},0).wait(1).to({scaleX:1.15,scaleY:0.94,x:585.8,alpha:0.891},0).wait(1).to({scaleX:1.15,scaleY:0.94,x:590.4,alpha:0.885},0).wait(1).to({scaleX:1.16,scaleY:0.94,x:594.5,alpha:0.878},0).wait(1).to({scaleX:1.17,scaleY:0.93,x:598.3,alpha:0.872},0).wait(1).to({scaleX:1.18,scaleY:0.93,x:601.8,alpha:0.866},0).wait(1).to({scaleX:1.19,scaleY:0.93,x:604.9,alpha:0.859},0).wait(1).to({scaleX:1.2,scaleY:0.92,x:607.8,alpha:0.853},0).wait(1).to({scaleX:1.2,scaleY:0.92,x:610.4,alpha:0.846},0).wait(1).to({scaleX:1.21,scaleY:0.92,x:612.8,alpha:0.84},0).wait(1).to({scaleX:1.22,scaleY:0.91,x:615.1,alpha:0.834},0).wait(1).to({scaleX:1.23,scaleY:0.91,x:617.1,alpha:0.827},0).wait(1).to({scaleX:1.24,scaleY:0.91,x:618.9,alpha:0.821},0).wait(1).to({scaleX:1.25,scaleY:0.9,x:620.7,alpha:0.814},0).wait(1).to({scaleX:1.25,scaleY:0.9,x:622.3,alpha:0.808},0).wait(1).to({scaleX:1.26,scaleY:0.89,x:623.8,alpha:0.802},0).wait(1).to({scaleX:1.27,scaleY:0.89,x:625.1,alpha:0.795},0).wait(1).to({scaleX:1.28,scaleY:0.89,x:626.4,alpha:0.789},0).wait(1).to({scaleX:1.29,scaleY:0.88,x:627.6,alpha:0.782},0).wait(1).to({scaleX:1.3,scaleY:0.88,x:628.8,alpha:0.776},0).wait(1).to({scaleX:1.31,scaleY:0.88,x:629.9,alpha:0.77},0).wait(1).to({scaleX:1.32,scaleY:0.87,x:630.9,alpha:0.763},0).wait(1).to({scaleX:1.32,scaleY:0.87,x:631.9,alpha:0.757},0).wait(1).to({scaleX:1.33,scaleY:0.87,x:632.9,alpha:0.75},0).wait(1).to({scaleX:1.34,scaleY:0.86,x:633.9,alpha:0.744},0).wait(1).to({scaleX:1.35,scaleY:0.86,x:634.9,alpha:0.738},0).wait(1).to({scaleX:1.36,scaleY:0.86,x:636,alpha:0.731},0).wait(1).to({scaleX:1.37,scaleY:0.85,x:637,alpha:0.725},0).wait(1).to({scaleX:1.37,scaleY:0.85,x:638.1,alpha:0.718},0).wait(1).to({scaleX:1.38,scaleY:0.85,x:639.2,alpha:0.712},0).wait(1).to({scaleX:1.39,scaleY:0.84,x:640.3,alpha:0.706},0).wait(1).to({regX:0.2,regY:0.2,scaleX:1.4,scaleY:0.84,x:640.9,alpha:0.699},0).wait(1).to({regX:0.5,regY:0,x:641.3,y:351.8},0).wait(1).to({x:641.4},0).wait(1).to({scaleX:1.4,x:641.5,alpha:0.7},0).wait(1).to({scaleX:1.4,scaleY:0.84,x:641.7,alpha:0.701},0).wait(1).to({scaleX:1.4,scaleY:0.84,x:642,alpha:0.702},0).wait(1).to({scaleX:1.39,scaleY:0.84,x:642.5,alpha:0.704},0).wait(1).to({scaleX:1.39,scaleY:0.84,x:643.1,alpha:0.707},0).wait(1).to({scaleX:1.39,scaleY:0.85,x:643.9,alpha:0.71},0).wait(1).to({scaleX:1.38,scaleY:0.85,x:644.9,alpha:0.714},0).wait(1).to({scaleX:1.37,scaleY:0.85,x:646.2,alpha:0.719},0).wait(1).to({scaleX:1.37,scaleY:0.85,x:647.7,alpha:0.725},0).wait(1).to({scaleX:1.36,scaleY:0.86,x:649.5,alpha:0.733},0).wait(1).to({scaleX:1.34,scaleY:0.86,x:651.7,alpha:0.742},0).wait(1).to({scaleX:1.33,scaleY:0.87,x:654.4,alpha:0.753},0).wait(1).to({scaleX:1.31,scaleY:0.88,x:657.7,alpha:0.766},0).wait(1).to({scaleX:1.29,scaleY:0.88,x:661.8,alpha:0.783},0).wait(1).to({scaleX:1.26,scaleY:0.9,x:667.1,alpha:0.804},0).wait(1).to({scaleX:1.22,scaleY:0.91,x:674,alpha:0.832},0).wait(1).to({scaleX:1.17,scaleY:0.93,x:684.4,alpha:0.874},0).wait(1).to({regX:0,scaleX:1,scaleY:1,x:715,y:352,alpha:1},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:1,scaleY:1},0).to({regX:0.1,regY:0.1,scaleX:1.13,x:734.5,y:352.1},8,cjs.Ease.get(1)).to({regX:0,regY:0,scaleX:1,x:715,y:352},6,cjs.Ease.get(-1)).wait(1).to({scaleX:1.02,x:701},8,cjs.Ease.get(1)).to({scaleX:1,x:715},5,cjs.Ease.get(-1)).wait(1).to({x:725},8,cjs.Ease.get(1)).to({x:715},6,cjs.Ease.get(-1)).wait(23).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({regX:0.5,x:715.4},0).wait(12).to({regX:0,x:715},0).wait(1).to({scaleX:1,scaleY:1},0).to({scaleX:1.02,x:701},8,cjs.Ease.get(1)).to({scaleX:1,x:715},5,cjs.Ease.get(-1)).wait(1).to({x:725},7,cjs.Ease.get(1)).to({x:715},5,cjs.Ease.get(-1)).to({_off:true},27).wait(3));

	// miibo3
	this.instance_3 = new lib.Symbol1_3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(141.3,354,1,1,-26,0,0,-152,0.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(8).to({_off:false},0).wait(1).to({regX:-76.5,regY:-144,rotation:-26.1,x:301.7,y:191.4},0).wait(1).to({x:356},0).wait(1).to({rotation:-26.2,x:393.7},0).wait(1).to({rotation:-26.4,x:422.7},0).wait(1).to({rotation:-26.6,x:446.2},0).wait(1).to({rotation:-26.8,x:465.8},0).wait(1).to({rotation:-27,x:482.4},0).wait(1).to({rotation:-27.3,x:496.8},0).wait(1).to({rotation:-27.6,x:509.3},0).wait(1).to({rotation:-27.9,x:520.2},0).wait(1).to({rotation:-28.2,x:529.9},0).wait(1).to({rotation:-28.4,x:538.6,y:191.5},0).wait(1).to({rotation:-28.7,x:546.3},0).wait(1).to({rotation:-28.9,x:553.2,y:191.4},0).wait(1).to({rotation:-29.2,x:559.5,y:191.5},0).wait(1).to({rotation:-29.4,x:565.2},0).wait(1).to({rotation:-29.6,x:570.4},0).wait(1).to({rotation:-29.8,x:575},0).wait(1).to({rotation:-29.9,x:579.3},0).wait(1).to({rotation:-30.1,x:583.1,y:191.6},0).wait(1).to({rotation:-30.2,x:586.7},0).wait(1).to({rotation:-30.4,x:589.9},0).wait(1).to({rotation:-30.5,x:592.8},0).wait(1).to({rotation:-30.6,x:595.5,y:191.7},0).wait(1).to({rotation:-30.7,x:598},0).wait(1).to({rotation:-30.8,x:600.2,y:191.6},0).wait(1).to({rotation:-30.9,x:602.2,y:191.7},0).wait(1).to({rotation:-31,x:604.1},0).wait(1).to({rotation:-31.1,x:605.9},0).wait(1).to({x:607.5},0).wait(1).to({rotation:-31.2,x:608.9},0).wait(1).to({rotation:-31.3,x:610.3,y:191.8},0).wait(1).to({rotation:-31.4,x:611.5},0).wait(1).to({x:612.7},0).wait(1).to({rotation:-31.5,x:613.8},0).wait(1).to({x:614.9},0).wait(1).to({rotation:-31.6,x:616},0).wait(1).to({x:617},0).wait(1).to({rotation:-31.7,x:618,y:191.9},0).wait(1).to({x:619,y:191.8},0).wait(1).to({rotation:-31.8,x:620},0).wait(1).to({x:621,y:191.9},0).wait(1).to({rotation:-31.9,x:622},0).wait(1).to({x:623.2},0).wait(1).to({x:624.3,y:191.8},0).wait(1).to({rotation:-32,x:625.6,y:191.9},0).wait(1).to({regX:-152,regY:0.1,x:639.3,y:354.1},0).wait(1).to({regX:-76.5,regY:-144,x:626.9,y:191.9},0).wait(2).to({rotation:-31.9,x:627.1,y:191.8},0).wait(1).to({rotation:-31.8,x:627.3},0).wait(1).to({rotation:-31.7,x:627.7},0).wait(1).to({rotation:-31.5,x:628.3},0).wait(1).to({rotation:-31.2,x:629.1,y:191.7},0).wait(1).to({rotation:-30.9,x:630.1,y:191.6},0).wait(1).to({rotation:-30.5,x:631.3},0).wait(1).to({rotation:-29.9,x:632.8,y:191.5},0).wait(1).to({rotation:-29.3,x:634.6},0).wait(1).to({rotation:-28.5,x:636.9,y:191.4},0).wait(1).to({rotation:-27.5,x:639.6},0).wait(1).to({rotation:-26.3,x:642.9},0).wait(1).to({rotation:-24.9,x:647,y:191.5},0).wait(1).to({rotation:-23.1,x:652,y:191.9},0).wait(1).to({rotation:-20.9,x:658.4,y:192.5},0).wait(1).to({rotation:-17.9,x:666.9,y:193.7},0).wait(1).to({rotation:-13.4,x:679.3,y:196.4},0).wait(1).to({regX:-151.9,regY:0,rotation:0,x:639.2,y:354},0).wait(1).to({y:346},0).wait(1).to({regX:0.1,regY:0.1,rotation:6,x:791.2,y:354.1},0).to({regX:0,regY:0,rotation:13,x:791.1,y:354},8,cjs.Ease.get(1)).to({regX:0.2,regY:0.1,rotation:0,x:791.2,y:354.1},6,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,rotation:-1.7,x:639.2},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:639.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:791.2},0).to({regX:0.3,rotation:1,x:791.3},8,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:791.2},6,cjs.Ease.get(-1)).wait(9).to({regX:-76,regY:-2,x:715,y:352},0).to({regY:-1.9,scaleX:1.1,scaleY:0.91,y:352.1},13,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,regY:0,scaleX:1,scaleY:1,x:639.2,y:336},0).wait(1).to({regX:-76.5,regY:-144,x:714.5,y:192},0).wait(1).to({y:192.1},0).wait(1).to({y:192.2},0).wait(1).to({y:192.3},0).wait(1).to({y:192.6},0).wait(1).to({y:193},0).wait(1).to({y:193.6},0).wait(1).to({y:194.4},0).wait(1).to({y:195.4},0).wait(1).to({y:196.8},0).wait(1).to({y:198.8},0).wait(1).to({y:202},0).wait(1).to({regX:-151.9,regY:0,x:639.2,y:356},0).wait(1).to({regY:0.1,rotation:-1.7,y:354.1},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:639.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:791.2},0).to({regX:0.3,rotation:1,x:791.3},7,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:791.2},5,cjs.Ease.get(-1)).to({_off:true},27).wait(3));

	// shadow2
	this.instance_4 = new lib.shadow_1();
	this.instance_4.parent = this;
	this.instance_4.setTransform(223,361);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(12).to({_off:false},0).wait(1).to({regX:0.5,scaleX:1.01,scaleY:1,x:273.6,alpha:0.993},0).wait(1).to({scaleX:1.03,scaleY:0.99,x:291,alpha:0.987},0).wait(1).to({scaleX:1.04,scaleY:0.99,x:303.1,alpha:0.98},0).wait(1).to({scaleX:1.05,scaleY:0.99,x:312.5,alpha:0.973},0).wait(1).to({scaleX:1.07,scaleY:0.98,x:320.1,alpha:0.967},0).wait(1).to({scaleX:1.08,scaleY:0.98,x:326.5,alpha:0.96},0).wait(1).to({scaleX:1.09,scaleY:0.98,x:332,alpha:0.953},0).wait(1).to({scaleX:1.11,scaleY:0.97,x:336.8,alpha:0.947},0).wait(1).to({scaleX:1.12,scaleY:0.97,x:341,alpha:0.94},0).wait(1).to({scaleX:1.13,scaleY:0.96,x:344.6,alpha:0.933},0).wait(1).to({scaleX:1.15,scaleY:0.96,x:347.9,alpha:0.926},0).wait(1).to({scaleX:1.16,scaleY:0.96,x:350.9,alpha:0.92},0).wait(1).to({scaleX:1.17,scaleY:0.95,x:353.5,alpha:0.913},0).wait(1).to({scaleX:1.19,scaleY:0.95,x:355.9,alpha:0.906},0).wait(1).to({scaleX:1.2,scaleY:0.95,x:358.1,alpha:0.9},0).wait(1).to({scaleX:1.21,scaleY:0.94,x:360,alpha:0.893},0).wait(1).to({scaleX:1.23,scaleY:0.94,x:361.7,alpha:0.886},0).wait(1).to({scaleX:1.24,scaleY:0.94,x:363.3,alpha:0.88},0).wait(1).to({scaleX:1.25,scaleY:0.93,x:364.8,alpha:0.873},0).wait(1).to({scaleX:1.27,scaleY:0.93,x:366.1,alpha:0.866},0).wait(1).to({scaleX:1.28,scaleY:0.93,x:367.3,alpha:0.86},0).wait(1).to({scaleX:1.29,scaleY:0.92,x:368.4,alpha:0.853},0).wait(1).to({scaleX:1.31,scaleY:0.92,x:369.4,alpha:0.846},0).wait(1).to({scaleX:1.32,scaleY:0.92,x:370.3,alpha:0.84},0).wait(1).to({scaleX:1.33,scaleY:0.91,x:371.1,alpha:0.833},0).wait(1).to({scaleX:1.35,scaleY:0.91,x:371.9,alpha:0.826},0).wait(1).to({scaleX:1.36,scaleY:0.9,x:372.6,alpha:0.82},0).wait(1).to({scaleX:1.37,scaleY:0.9,x:373.2,alpha:0.813},0).wait(1).to({scaleX:1.39,scaleY:0.9,x:373.8,alpha:0.806},0).wait(1).to({scaleX:1.4,scaleY:0.89,x:374.4,alpha:0.799},0).wait(1).to({scaleX:1.41,scaleY:0.89,x:374.9,alpha:0.793},0).wait(1).to({scaleX:1.43,scaleY:0.89,x:375.3,alpha:0.786},0).wait(1).to({scaleX:1.44,scaleY:0.88,x:375.8,alpha:0.779},0).wait(1).to({scaleX:1.45,scaleY:0.88,x:376.2,alpha:0.773},0).wait(1).to({scaleX:1.47,scaleY:0.88,x:376.6,alpha:0.766},0).wait(1).to({scaleX:1.48,scaleY:0.87,x:377,alpha:0.759},0).wait(1).to({scaleX:1.49,scaleY:0.87,x:377.4,alpha:0.753},0).wait(1).to({scaleX:1.51,scaleY:0.87,x:377.8,alpha:0.746},0).wait(1).to({scaleX:1.52,scaleY:0.86,x:378.1,alpha:0.739},0).wait(1).to({scaleX:1.53,scaleY:0.86,x:378.5,alpha:0.733},0).wait(1).to({scaleX:1.55,scaleY:0.85,x:378.9,alpha:0.726},0).wait(1).to({scaleX:1.56,scaleY:0.85,x:379.4,alpha:0.719},0).wait(1).to({scaleX:1.57,scaleY:0.85,x:379.8,alpha:0.713},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:380.2,alpha:0.706},0).wait(1).to({regX:0.2,regY:0.1,scaleX:1.6,scaleY:0.84,x:379.9,alpha:0.699},0).wait(1).to({regX:0.5,regY:0,x:380.4,y:360.9},0).wait(2).to({scaleX:1.6,x:380.5,alpha:0.7},0).wait(1).to({scaleX:1.6,scaleY:0.84,x:380.7,alpha:0.701},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:381.1,alpha:0.702},0).wait(1).to({scaleX:1.59,scaleY:0.84,x:381.5,alpha:0.704},0).wait(1).to({scaleX:1.58,scaleY:0.84,x:382.2,alpha:0.707},0).wait(1).to({scaleX:1.58,scaleY:0.85,x:383,alpha:0.71},0).wait(1).to({scaleX:1.57,scaleY:0.85,x:384,alpha:0.714},0).wait(1).to({scaleX:1.56,scaleY:0.85,x:385.2,alpha:0.719},0).wait(1).to({scaleX:1.55,scaleY:0.85,x:386.7,alpha:0.725},0).wait(1).to({scaleX:1.53,scaleY:0.86,x:388.5,alpha:0.733},0).wait(1).to({scaleX:1.52,scaleY:0.86,x:390.8,alpha:0.742},0).wait(1).to({scaleX:1.49,scaleY:0.87,x:393.5,alpha:0.753},0).wait(1).to({scaleX:1.47,scaleY:0.88,x:396.8,alpha:0.766},0).wait(1).to({scaleX:1.43,scaleY:0.88,x:400.8,alpha:0.783},0).wait(1).to({scaleX:1.39,scaleY:0.9,x:406.1,alpha:0.804},0).wait(1).to({scaleX:1.33,scaleY:0.91,x:413,alpha:0.832},0).wait(1).to({scaleX:1.25,scaleY:0.93,x:423.4,alpha:0.874},0).wait(1).to({regX:0,scaleX:1,scaleY:1,x:454,y:361,alpha:1},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:1,scaleY:1},0).to({regX:0.1,regY:0.1,scaleX:1.13,x:473.5,y:361.1},8,cjs.Ease.get(1)).to({regX:0,regY:0,scaleX:1,x:454,y:361},6,cjs.Ease.get(-1)).wait(1).to({scaleX:1.02,x:440},8,cjs.Ease.get(1)).to({scaleX:1,x:454},5,cjs.Ease.get(-1)).wait(1).to({x:464},8,cjs.Ease.get(1)).to({x:454},6,cjs.Ease.get(-1)).wait(21).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({regX:0.5,x:454.4},0).wait(12).to({regX:0,x:454},0).wait(1).to({scaleX:1,scaleY:1},0).to({scaleX:1.02,x:440},8,cjs.Ease.get(1)).to({scaleX:1,x:454},5,cjs.Ease.get(-1)).wait(1).to({x:464},7,cjs.Ease.get(1)).to({x:454},5,cjs.Ease.get(-1)).to({_off:true},27).wait(3));

	// miibo2
	this.instance_5 = new lib.Symbol1_2();
	this.instance_5.parent = this;
	this.instance_5.setTransform(160.3,363,1,1,-26,0,0,-152,0.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(12).to({_off:false},0).wait(1).to({regX:-91.6,regY:-138.5,rotation:-26.1,x:223.1,y:212},0).wait(1).to({rotation:-26.3,x:246.7},0).wait(1).to({rotation:-26.8,x:262.4,y:212.1},0).wait(1).to({rotation:-27.3,x:273.9,y:212.2},0).wait(1).to({rotation:-28,x:282.7,y:212.3},0).wait(1).to({rotation:-28.9,x:289.3,y:212.5},0).wait(1).to({rotation:-29.8,x:294.5,y:212.7},0).wait(1).to({rotation:-30.8,x:298.4,y:213.1},0).wait(1).to({rotation:-31.9,x:301.5,y:213.5},0).wait(1).to({rotation:-32.9,x:303.9,y:213.9},0).wait(1).to({rotation:-33.9,x:305.9,y:214.4},0).wait(1).to({rotation:-34.9,x:307.4,y:214.8},0).wait(1).to({rotation:-35.8,x:308.7,y:215.3},0).wait(1).to({rotation:-36.7,x:309.8,y:215.8},0).wait(1).to({rotation:-37.5,x:310.7,y:216.3},0).wait(1).to({rotation:-38.2,x:311.5,y:216.8},0).wait(1).to({rotation:-38.9,x:312.2,y:217.2},0).wait(1).to({rotation:-39.5,x:312.9,y:217.7},0).wait(1).to({rotation:-40.1,x:313.4,y:218.1},0).wait(1).to({rotation:-40.6,x:314,y:218.6},0).wait(1).to({rotation:-41.1,x:314.4,y:218.9},0).wait(1).to({rotation:-41.5,x:314.8,y:219.3},0).wait(1).to({rotation:-41.9,x:315.1,y:219.6},0).wait(1).to({rotation:-42.3,x:315.4,y:219.9},0).wait(1).to({rotation:-42.7,x:315.7,y:220.2},0).wait(1).to({rotation:-43,x:315.9,y:220.6},0).wait(1).to({rotation:-43.3,x:316,y:220.8},0).wait(1).to({rotation:-43.6,x:316.2,y:221.1},0).wait(1).to({rotation:-43.9,x:316.3,y:221.4},0).wait(1).to({rotation:-44.2,x:316.4,y:221.6},0).wait(1).to({rotation:-44.4,y:221.8},0).wait(1).to({rotation:-44.7,x:316.5,y:222},0).wait(1).to({rotation:-44.9,x:316.6,y:222.3},0).wait(1).to({rotation:-45.1,y:222.5},0).wait(1).to({rotation:-45.3,y:222.7},0).wait(1).to({rotation:-45.5,x:316.7,y:222.9},0).wait(1).to({rotation:-45.7,x:316.8,y:223.1},0).wait(1).to({rotation:-45.9,x:316.9,y:223.3},0).wait(1).to({rotation:-46,x:317,y:223.4},0).wait(1).to({rotation:-46.2,x:317.1,y:223.6},0).wait(1).to({rotation:-46.3,x:317.3,y:223.7},0).wait(1).to({rotation:-46.5,x:317.5,y:223.9},0).wait(1).to({rotation:-46.6,x:317.8,y:224},0).wait(1).to({rotation:-46.7,x:318.1,y:224.1},0).wait(1).to({regX:-152,regY:0.1,rotation:-46.9,x:378.2,y:363.1},0).wait(1).to({regX:-91.6,regY:-138.5,x:318.4,y:224.3},0).wait(1).to({rotation:-46.8,x:318.5,y:224.2},0).wait(1).to({x:318.7,y:224.1},0).wait(1).to({rotation:-46.6,x:319,y:224},0).wait(1).to({rotation:-46.4,x:319.5,y:223.8},0).wait(1).to({rotation:-46.1,x:320.2,y:223.5},0).wait(1).to({rotation:-45.7,x:321.1,y:223},0).wait(1).to({rotation:-45.2,x:322.4,y:222.6},0).wait(1).to({rotation:-44.6,x:323.9,y:222},0).wait(1).to({rotation:-43.8,x:325.9,y:221.3},0).wait(1).to({rotation:-42.8,x:328.3,y:220.4},0).wait(1).to({rotation:-41.7,x:331.1,y:219.4},0).wait(1).to({rotation:-40.3,x:334.7,y:218.3},0).wait(1).to({rotation:-38.6,x:339.1,y:217.1},0).wait(1).to({rotation:-36.5,x:344.4,y:215.7},0).wait(1).to({rotation:-33.9,x:351.1,y:214.3},0).wait(1).to({rotation:-30.6,x:359.7,y:213},0).wait(1).to({rotation:-26.1,x:371.3,y:212},0).wait(1).to({rotation:-19.6,x:388.6,y:212.2},0).wait(1).to({regX:-151.9,regY:0,rotation:0,x:378.2,y:363},0).wait(1).to({y:353},0).wait(1).to({regX:0.1,regY:0.1,rotation:6,x:530.2,y:363.1},0).to({regX:0,regY:0,rotation:13,x:530.1,y:363},8,cjs.Ease.get(1)).to({regX:0.2,regY:0.1,rotation:0,x:530.2,y:363.1},6,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,rotation:-1.7,x:378.2},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:378.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:530.2},0).to({regX:0.3,rotation:1,x:530.3},8,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:530.2},6,cjs.Ease.get(-1)).wait(7).to({regX:-75.5,regY:-0.6,x:454.5,y:362.4},0).to({regY:-0.5,scaleX:1.1,scaleY:0.91,x:454.4},13,cjs.Ease.get(-1)).wait(1).to({regX:-151.9,regY:0,scaleX:1,scaleY:1,x:378.2,y:343},0).wait(1).to({regX:-91.6,regY:-138.5,x:438.4,y:204.5},0).wait(1).to({y:204.6},0).wait(1).to({y:204.7},0).wait(1).to({y:204.8},0).wait(1).to({y:205.1},0).wait(1).to({y:205.5},0).wait(1).to({y:206.1},0).wait(1).to({y:206.9},0).wait(1).to({y:207.9},0).wait(1).to({y:209.3},0).wait(1).to({y:211.3},0).wait(1).to({y:214.5},0).wait(1).to({regX:-151.9,regY:0,x:378.2,y:363},0).wait(1).to({regY:0.1,rotation:-1.7,y:363.1},0).to({rotation:-3.4},8,cjs.Ease.get(1)).to({regX:-151.8,rotation:0,x:378.3},5,cjs.Ease.get(-1)).wait(1).to({regX:0.2,x:530.2},0).to({regX:0.3,rotation:1,x:530.3},7,cjs.Ease.get(1)).to({regX:0.2,rotation:0,x:530.2},5,cjs.Ease.get(-1)).to({_off:true},27).wait(3));

	// s4.png
	this.instance_6 = new lib.Symbol3();
	this.instance_6.parent = this;
	this.instance_6.setTransform(413.8,219.5,1,1,0,0,0,15.5,16.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(156).to({_off:false},0).wait(1).to({x:318.6,y:220.3},0).wait(1).to({x:305,y:220.4},0).wait(1).to({x:300,y:220.5},0).wait(1).to({x:298},0).wait(1).to({x:296.9},0).wait(1).to({x:296.1},0).wait(1).to({x:295.5},0).to({_off:true},47).wait(3));

	// s3.png
	this.instance_7 = new lib.Symbol4();
	this.instance_7.parent = this;
	this.instance_7.setTransform(401.5,168.3,1,1,0,0,0,21,23);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(157).to({_off:false},0).wait(1).to({x:381.8,y:94.8},0).wait(1).to({x:379,y:84.3},0).wait(1).to({x:377.9,y:80.5},0).wait(1).to({x:377.5,y:78.9},0).wait(1).to({x:377.3,y:78.1},0).wait(1).to({x:377.1,y:77.5},0).wait(1).to({x:377,y:77},0).to({_off:true},47).wait(2));

	// s2.png
	this.instance_8 = new lib.Symbol5();
	this.instance_8.parent = this;
	this.instance_8.setTransform(565.8,199.6,1,1,0,0,0,24,26.5);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(158).to({_off:false},0).wait(1).to({x:576.4,y:82.6},0).wait(1).to({x:577.9,y:66},0).wait(1).to({x:578.5,y:59.8},0).wait(1).to({x:578.7,y:57.3},0).wait(1).to({x:578.8,y:56},0).wait(1).to({x:578.9,y:55.1},0).wait(1).to({x:579,y:54.3},0).to({_off:true},47).wait(1));

	// s1.png
	this.instance_9 = new lib.Symbol6();
	this.instance_9.parent = this;
	this.instance_9.setTransform(707.2,193.6,1,1,0,0,0,19,20.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(159).to({_off:false},0).wait(1).to({x:777.7,y:157.3},0).wait(1).to({x:787.8,y:152.1},0).wait(1).to({x:791.5,y:150.2},0).wait(1).to({x:793,y:149.4},0).wait(1).to({x:793.8,y:149},0).wait(1).to({x:794.3,y:148.7},0).wait(1).to({x:794.8,y:148.5},0).wait(47));

	// n4.png
	this.instance_10 = new lib.Symbol7();
	this.instance_10.parent = this;
	this.instance_10.setTransform(386.5,168.3,1,1,0,0,0,15,40);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(159).to({_off:false},0).wait(1).to({regX:13.5,x:319.4,y:127},0).wait(1).to({x:310,y:121.1},0).wait(1).to({x:306.6,y:119},0).wait(1).to({x:305.2,y:118.1},0).wait(1).to({x:304.5,y:117.6},0).wait(1).to({x:303.9,y:117.3},0).wait(1).to({regX:15,x:305,y:117},0).wait(47));

	// n3.png
	this.instance_11 = new lib.Symbol8();
	this.instance_11.parent = this;
	this.instance_11.setTransform(457.7,164.5,1,1,0,0,0,19,26.5);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(156).to({_off:false},0).wait(1).to({regX:12.7,regY:26.3,rotation:-36.2,x:496,y:90.3},0).wait(1).to({rotation:-41.4,x:502.6,y:79.7},0).wait(1).to({rotation:-43.3,x:505,y:75.7},0).wait(1).to({rotation:-44.1,x:506,y:74.1},0).wait(1).to({rotation:-44.5,x:506.4,y:73.3},0).wait(1).to({rotation:-44.8,x:506.8,y:72.7},0).wait(1).to({regX:19,regY:26.6,rotation:-45,x:511.8,y:67.9},0).to({_off:true},47).wait(3));

	// n2.png
	this.instance_12 = new lib.Symbol9();
	this.instance_12.parent = this;
	this.instance_12.setTransform(683.6,164.5,1,1,0,0,0,22.5,26.5);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(157).to({_off:false},0).wait(1).to({regY:24.9,x:749.8,y:103.4},0).wait(1).to({x:759.2,y:94.9},0).wait(1).to({x:762.7,y:91.8},0).wait(1).to({x:764.1,y:90.5},0).wait(1).to({x:764.9,y:89.8},0).wait(1).to({x:765.4,y:89.4},0).wait(1).to({regY:26.5,x:765.9,y:90.6},0).to({_off:true},47).wait(2));

	// n1.png
	this.instance_13 = new lib.Symbol10();
	this.instance_13.parent = this;
	this.instance_13.setTransform(582.7,179,1,1,0,0,0,12.5,21);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(158).to({_off:false},0).wait(1).to({regX:9.9,regY:19.9,x:634.8,y:92.2},0).wait(1).to({x:642.6,y:80},0).wait(1).to({x:645.5,y:75.5},0).wait(1).to({x:646.7,y:73.7},0).wait(1).to({x:647.3,y:72.7},0).wait(1).to({x:647.7,y:72.1},0).wait(1).to({regX:12.5,regY:21,x:650.7,y:72.6},0).to({_off:true},47).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


}
var AnimBlorbs = function(lib, img, cjs, ss, an) 
{
	this.lib = lib;
	this.img = img;
	this.cjs = cjs;
	this.ss = ss;
	this.an = an;

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 980,
	height: 500,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:_assetPath + "img/bowser-story/blorb-anim/blorbBuild_0.png?1544043316680", id:"blorbBuild_0"},
		{src:_assetPath + "img/bowser-story/blorb-anim/blorbBuild_1.png?1544043316680", id:"blorbBuild_1"},
		{src:_assetPath + "img/bowser-story/blorb-anim/blorbBuild_2.png?1544043316680", id:"blorbBuild_2"},
		{src:_assetPath + "img/bowser-story/blorb-anim/blorbBuild_3.png?1544043316680", id:"blorbBuild_3"},
		{src:_assetPath + "img/bowser-story/blorb-anim/blorbBuild_4.png?1544043316680", id:"blorbBuild_4"}
	]
};



lib.ssMetadata = [];


// symbols:



(lib.blorbBuild_0 = function() {
	this.initialize(img.blorbBuild_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,252,261);


(lib.blorbBuild_1 = function() {
	this.initialize(img.blorbBuild_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,150);


(lib.blorbBuild_2 = function() {
	this.initialize(img.blorbBuild_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,657,489);


(lib.blorbBuild_3 = function() {
	this.initialize(img.blorbBuild_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,209,239);


(lib.blorbBuild_4 = function() {
	this.initialize(img.blorbBuild_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,219);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.blorbBuild_4();
	this.instance.parent = this;
	this.instance.setTransform(-132,-109.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132,-109.5,264,219);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.blorbBuild_3();
	this.instance.parent = this;
	this.instance.setTransform(-104.5,-119.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104.5,-119.5,209,239);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.blorbBuild_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,129,150);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.blorbBuild_0();
	this.instance.parent = this;
	this.instance.setTransform(23,16);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(23,16,252,261);


// stage content:
(lib.blorb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_104 = function() {
        _page.stopBlorbTicker();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(104).call(this.frame_104).wait(1));

	// Layer 9
	this.instance = new lib.Symbol1();
	this.instance.parent = this;
	this.instance.setTransform(616.6,448.9,1,1,-7,0,0,159.8,293.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(1).to({regX:149,regY:146.5,rotation:-3.8,x:595.9,y:303.3},0).wait(1).to({rotation:-1,x:603.1,y:302.5},0).wait(1).to({rotation:1.1,x:608.6,y:302},0).wait(1).to({rotation:2.3,x:611.7},0).wait(1).to({rotation:2.4,x:611.8,y:301.9},0).wait(1).to({rotation:1.5,x:609.5,y:302},0).wait(1).to({rotation:0.1,x:606.1,y:302.2},0).wait(1).to({rotation:-1.1,x:602.9,y:302.5},0).wait(1).to({rotation:-1.9,x:600.9,y:302.6},0).wait(1).to({rotation:-2.1,x:600.4,y:302.7},0).wait(1).to({rotation:-1.7,x:601.4,y:302.6},0).wait(1).to({rotation:-1,x:603.2,y:302.5},0).wait(1).to({rotation:-0.2,x:605.3,y:302.3},0).wait(1).to({rotation:0.4,x:606.9,y:302.2},0).wait(1).to({rotation:0.7,x:607.6,y:302.1},0).wait(1).to({rotation:0.6,x:607.4,y:302.2},0).wait(1).to({rotation:0.3,x:606.5},0).wait(1).to({rotation:-0.2,x:605.2,y:302.3},0).wait(1).to({rotation:-0.6,x:604.1,y:302.4},0).wait(1).to({rotation:-0.9,x:603.4,y:302.5},0).wait(1).to({rotation:-1,x:603.3},0).wait(1).to({rotation:-0.8,x:603.6,y:302.4},0).wait(1).to({rotation:-0.5,x:604.4},0).wait(1).to({rotation:-0.2,x:605.1,y:302.3},0).wait(1).to({rotation:0,x:605.6},0).wait(1).to({rotation:0.1,x:605.9,y:302.2},0).wait(1).to({rotation:0,x:605.8},0).wait(1).to({rotation:-0.1,x:605.5,y:302.3},0).wait(1).to({rotation:-0.3,x:605},0).wait(1).to({rotation:-0.5,x:604.6},0).wait(1).to({x:604.4,y:302.4},0).wait(1).to({rotation:-0.6,x:604.3},0).wait(1).to({rotation:-0.5,x:604.5,y:302.3},0).wait(1).to({rotation:-0.4,x:604.7},0).wait(1).to({rotation:-0.3,x:605},0).wait(1).to({rotation:-0.2,x:605.2},0).wait(1).to({x:605.3},0).wait(1).to({x:605.2},0).wait(1).to({rotation:-0.3,x:605.1},0).wait(1).to({x:604.9},0).wait(1).to({rotation:-0.4,x:604.8},0).wait(1).to({x:604.7},0).wait(2).to({x:604.8},0).wait(1).to({rotation:-0.3,x:604.9},0).wait(1).to({x:605},0).wait(5).to({x:604.9},0).wait(2).to({rotation:-0.4,x:604.8},0).wait(2).to({rotation:-0.3,x:604.9},0).wait(3).to({x:605},0).wait(3).to({x:604.9},0).wait(21));

	// Layer 1
	this.instance_1 = new lib.Symbol1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(129,300.6,0.999,0.999,62.2,0,0,144.6,148.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:144.5,regY:148.4,rotation:104.8,x:197.5,y:300.5},0).wait(1).to({regY:148.5,scaleX:1,scaleY:1,rotation:145.2,x:261.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:180.3,x:318},0).wait(1).to({scaleX:1,scaleY:1,rotation:209.3,x:364.4},0).wait(1).to({regX:144.4,scaleX:1,scaleY:1,rotation:232.4,x:401.4,y:300.6},0).wait(1).to({regX:144.5,scaleX:1,scaleY:1,rotation:250.2,x:429.9,y:300.5},0).wait(1).to({regY:148.6,scaleX:1,scaleY:1,rotation:263.7,x:451.6},0).wait(1).to({rotation:274.5,x:468.8,y:300.6},0).wait(1).to({scaleX:1,scaleY:1,rotation:284.1,x:484.4},0).wait(1).to({rotation:292.6,x:497.9,y:300.5},0).wait(1).to({rotation:299.6,x:509.1,y:300.6},0).wait(1).to({scaleX:1,scaleY:1,rotation:305.3,x:518.1},0).wait(1).to({regY:148.5,rotation:309.6,x:524.8},0).wait(1).to({rotation:312.6,x:529.7,y:300.5},0).wait(1).to({regY:148.6,rotation:314.9,x:533.4,y:300.6},0).wait(1).to({regY:148.5,rotation:316.9,x:536.3,y:300.5},0).wait(1).to({rotation:318.9,x:539.7,y:300.6},0).wait(1).to({rotation:321.4,x:543.7,y:300.5},0).wait(1).to({regY:148.6,rotation:324.7,x:549,y:300.6},0).wait(1).to({regX:144.6,scaleX:1,scaleY:1,rotation:328.7,x:555.5},0).wait(1).to({regY:148.5,rotation:333.5,x:563.1,y:300.5},0).wait(1).to({regX:144.5,regY:148.7,rotation:339.2,x:572,y:300.7},0).to({_off:true},1).wait(82));

	// Layer 4 copy
	this.instance_2 = new lib.Symbol2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(811.5,390,1,1,0,0,0,64.5,75);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({y:370},4,cjs.Ease.get(1)).wait(1).to({y:380},0).wait(73));

	// blorbBuild_4.png
	this.instance_3 = new lib.Symbol4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(716,183.5,1,1,-45);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).wait(1).to({rotation:-14.7,x:758.6},0).wait(1).to({rotation:-6.3,x:770.4},0).wait(1).to({rotation:-1.5,x:777.2},0).wait(1).to({rotation:1.5,x:781.4},0).wait(1).to({rotation:3.2,x:783.9},0).wait(1).to({rotation:4.2,x:785.3},0).wait(1).to({rotation:4.6,x:785.8},0).wait(1).to({rotation:4.7,x:786},0).to({rotation:0,x:776},8,cjs.Ease.get(-1)).wait(65));

	// blorbBuild_3.png
	this.instance_4 = new lib.Symbol3();
	this.instance_4.parent = this;
	this.instance_4.setTransform(576.9,131.4,1,1,40.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(24).to({_off:false},0).wait(1).to({rotation:10.9,x:507.1,y:130.1},0).wait(1).to({rotation:3.7,x:490.1,y:129.8},0).wait(1).to({rotation:0,x:481.4,y:129.7},0).wait(1).to({rotation:-1.9,x:476.9,y:129.6},0).wait(1).to({rotation:-2.9,x:474.4,y:129.5},0).wait(1).to({rotation:-3.7,x:472.5},0).to({rotation:0,x:481.5},7,cjs.Ease.get(-1)).wait(68));

	// Layer 3
	this.instance_5 = new lib.blorbBuild_2();
	this.instance_5.parent = this;
	this.instance_5.setTransform(370,82,0.789,0.789);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(23).to({_off:false},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:318,y:26},0).wait(1).to({scaleX:1,scaleY:1,x:303,y:10},0).wait(80));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(448.9,381.4,348,344.3);

}
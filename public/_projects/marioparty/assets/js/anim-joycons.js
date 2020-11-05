var Joycons = function(lib, img, cjs, ss, an) 
{
	this.lib = lib;
	this.img = img;
	this.cjs = cjs;
	this.ss = ss;
	this.an = an;

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 560,
	height: 490,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:_assetPath + "img/buy/anim-buy_joyCons_atlas_.png", id:"buy_joyCons_atlas_"}
	]
};




lib.ssMetadata = [
		{name:"buy_joyCons_atlas_", frames: [[0,0,346,246],[0,248,315,101],[348,127,87,84],[348,213,81,24],[317,248,128,192],[124,351,122,37],[348,0,71,125],[0,351,122,37]]}
];


// symbols:



(lib.blueCon = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.blueConShad = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.grayCon = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.grayConShad = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.redCon = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.redConShad = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.yellowCon = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.yellowConShad = function() {
	this.spriteSheet = ss["buy_joyCons_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// HD_blue.png
	this.instance = new lib.blueCon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,346,246);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.blueConShad();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,315,101);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.grayCon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,87,84);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.grayConShad();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81,24);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.redCon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,128,192);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.redConShad();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122,37);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.yellowCon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,71,125);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.yellowConShad();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122,37);


// stage content:
(lib.buy_joyCons = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_186 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(186).call(this.frame_186).wait(1));

	// blueCon.png
	this.instance = new lib.Symbol8();
	this.instance.parent = this;
	this.instance.setTransform(260.3,232.3,0.05,0.05,0,7.9,7.4,180.8,135.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({regX:173,regY:123,scaleX:1,scaleY:1,skewX:0,skewY:0,x:342,y:282},26,cjs.Ease.get(-1)).wait(1).to({scaleX:1.02,scaleY:1.02,rotation:1.2,x:343.5,y:283},0).wait(1).to({scaleX:1.03,scaleY:1.03,rotation:2.2,x:344.6,y:283.9},0).wait(1).to({scaleX:1.04,scaleY:1.04,rotation:2.8,x:345.4,y:284.4},0).wait(1).to({scaleX:1.05,scaleY:1.05,rotation:3.3,x:346,y:284.8},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:3.7,x:346.4,y:285.1},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:3.9,x:346.7,y:285.3},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:4.1,x:347,y:285.5},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:4.3,x:347.2,y:285.7},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:4.5,x:347.3,y:285.8},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:4.6,x:347.5},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:4.7,x:347.6,y:286},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:4.8,x:347.7,y:286.1},0).wait(1).to({scaleX:1.07,scaleY:1.07,x:347.8},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:4.9,x:347.9,y:286.2},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:5,x:348},0).wait(1).to({y:286.3},0).wait(1).to({scaleX:1.08,scaleY:1.08},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:5.1},0).wait(1).to({x:348.1},0).wait(2).to({scaleX:1.08,scaleY:1.08,rotation:5.2,x:348.2,y:286.4},0).wait(3).to({scaleX:1.08,scaleY:1.08},0).wait(1).to({regX:173.1,regY:123.1,x:348.3,y:286.5},0).to({regX:173,regY:123,scaleX:1,scaleY:1,rotation:0,x:342,y:282},27,cjs.Ease.get(-0.99)).wait(108));

	// blueConShad.png
	this.instance_1 = new lib.Symbol7();
	this.instance_1.parent = this;
	this.instance_1.setTransform(265.1,239.7,0.05,0.05,0,0,0,159.1,51.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({regX:157.5,regY:50.5,scaleX:1,scaleY:1,x:348.5,y:409.5},26,cjs.Ease.get(-1)).wait(1).to({scaleX:1.01,scaleY:1.01,x:350,y:411.7},0).wait(1).to({scaleX:1.01,scaleY:1.01,x:351.2,y:413.3},0).wait(1).to({scaleX:1.02,scaleY:1.02,x:352,y:414.4},0).wait(1).to({scaleX:1.02,scaleY:1.02,x:352.6,y:415.2},0).wait(1).to({scaleX:1.02,scaleY:1.02,x:353,y:415.8},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:353.4,y:416.3},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:353.6,y:416.7},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:353.8,y:417},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:354,y:417.2},0).wait(1).to({x:354.1,y:417.4},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:354.3,y:417.6},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:354.4,y:417.7},0).wait(1).to({y:417.8},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:354.5,y:418},0).wait(1).to({x:354.6,y:418.1},0).wait(1).to({x:354.7,y:418.2},0).wait(1).to({scaleX:1.03,scaleY:1.03},0).wait(1).to({x:354.8,y:418.3},0).wait(2).to({y:418.4},0).wait(1).to({x:354.9},0).wait(1).to({scaleX:1.04,scaleY:1.04,y:418.5},0).wait(3).to({regY:50.6,x:355,y:418.6},0).to({regY:50.5,scaleX:1,scaleY:1,x:348.5,y:409.5},27,cjs.Ease.get(-0.99)).wait(108));

	// redCon.png
	this.instance_2 = new lib.Symbol4();
	this.instance_2.parent = this;
	this.instance_2.setTransform(265.1,239.6,0.108,0.108,0,0,0,65.5,95.9);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).wait(1).to({regX:64,regY:96,scaleX:0.11,scaleY:0.11,rotation:44.7,x:313.2,y:203},0).wait(1).to({rotation:91.9,x:330,y:190.2},0).wait(1).to({rotation:132.1,x:341.8,y:181.5},0).wait(1).to({scaleX:0.11,scaleY:0.11,rotation:161.5,x:350.8,y:174.8},0).wait(1).to({rotation:182.9,x:358.2,y:169.2},0).wait(1).to({scaleX:0.11,scaleY:0.11,rotation:199.1,x:364.3,y:164.6},0).wait(1).to({scaleX:0.11,scaleY:0.11,rotation:212.1,x:369.6,y:160.6},0).wait(1).to({scaleX:0.11,scaleY:0.11,rotation:222.8,x:374.3,y:157.1},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:231.8,x:378.3,y:154.1},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:239.6,x:382,y:151.3},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:246.5,x:385.2,y:148.8},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:252.7,x:388.2,y:146.6},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:258.2,x:390.8,y:144.6},0).wait(1).to({scaleX:0.12,scaleY:0.12,rotation:263.2,x:393.2,y:142.8},0).wait(1).to({scaleX:0.13,scaleY:0.13,rotation:267.8,x:395.5,y:141.1},0).wait(1).to({scaleX:0.13,scaleY:0.13,rotation:272,x:397.5,y:139.5},0).wait(1).to({scaleX:0.13,scaleY:0.13,rotation:276,x:399.4,y:138.1},0).wait(1).to({scaleX:0.13,scaleY:0.13,rotation:279.6,x:401.1,y:136.8},0).wait(1).to({scaleX:0.14,scaleY:0.14,rotation:283.1,x:402.6,y:135.6},0).wait(1).to({scaleX:0.14,scaleY:0.14,rotation:286.3,x:404.1,y:134.5},0).wait(1).to({scaleX:0.14,scaleY:0.14,rotation:289.3,x:405.4,y:133.5},0).wait(1).to({scaleX:0.15,scaleY:0.15,rotation:292.2,x:406.7,y:132.6},0).wait(1).to({scaleX:0.15,scaleY:0.15,rotation:294.9,x:407.8,y:131.6},0).wait(1).to({scaleX:0.15,scaleY:0.15,rotation:297.5,x:408.9,y:130.8},0).wait(1).to({scaleX:0.16,scaleY:0.16,rotation:300,x:409.9,y:130.1},0).wait(1).to({scaleX:0.16,scaleY:0.16,rotation:302.4,x:410.8,y:129.4},0).wait(1).to({scaleX:0.17,scaleY:0.17,rotation:304.6,x:411.7,y:128.8},0).wait(1).to({scaleX:0.17,scaleY:0.17,rotation:306.8,x:412.5,y:128.1},0).wait(1).to({scaleX:0.18,scaleY:0.18,rotation:308.9,x:413.2,y:127.5},0).wait(1).to({scaleX:0.18,scaleY:0.18,rotation:310.9,x:414,y:127},0).wait(1).to({scaleX:0.19,scaleY:0.19,rotation:312.8,x:414.6,y:126.5},0).wait(1).to({scaleX:0.19,scaleY:0.19,rotation:314.7,x:415.2,y:126},0).wait(1).to({scaleX:0.2,scaleY:0.2,rotation:316.5,x:415.8,y:125.6},0).wait(1).to({scaleX:0.2,scaleY:0.2,rotation:318.3,x:416.3,y:125.2},0).wait(1).to({scaleX:0.21,scaleY:0.21,rotation:320,x:416.8,y:124.8},0).wait(1).to({scaleX:0.22,scaleY:0.22,rotation:321.6,x:417.2,y:124.4},0).wait(1).to({scaleX:0.22,scaleY:0.22,rotation:323.2,x:417.7,y:124.1},0).wait(1).to({scaleX:0.23,scaleY:0.23,rotation:324.8,x:418.1,y:123.8},0).wait(1).to({scaleX:0.24,scaleY:0.24,rotation:326.3,x:418.5,y:123.4},0).wait(1).to({scaleX:0.25,scaleY:0.25,rotation:327.7,x:418.9,y:123.1},0).wait(1).to({scaleX:0.25,scaleY:0.25,rotation:329.2,x:419.2,y:122.9},0).wait(1).to({scaleX:0.26,scaleY:0.26,rotation:330.6,x:419.6,y:122.6},0).wait(1).to({scaleX:0.27,scaleY:0.27,rotation:331.9,x:419.9,y:122.4},0).wait(1).to({scaleX:0.28,scaleY:0.28,rotation:333.3,x:420.2,y:122.1},0).wait(1).to({scaleX:0.29,scaleY:0.29,rotation:334.6,x:420.5,y:121.9},0).wait(1).to({scaleX:0.3,scaleY:0.3,rotation:335.9,x:420.7,y:121.7},0).wait(1).to({scaleX:0.31,scaleY:0.31,rotation:337.1,x:421,y:121.5},0).wait(1).to({scaleX:0.32,scaleY:0.32,rotation:338.4,x:421.3,y:121.2},0).wait(1).to({scaleX:0.33,scaleY:0.33,rotation:339.6,x:421.5,y:121.1},0).wait(1).to({scaleX:0.35,scaleY:0.35,rotation:340.7,x:421.7,y:120.9},0).wait(1).to({scaleX:0.36,scaleY:0.36,rotation:341.9,x:422,y:120.6},0).wait(1).to({scaleX:0.37,scaleY:0.37,rotation:343,x:422.2,y:120.4},0).wait(1).to({scaleX:0.39,scaleY:0.39,rotation:344.2,x:422.4,y:120.3},0).wait(1).to({scaleX:0.4,scaleY:0.4,rotation:345.3,x:422.6,y:120.1},0).wait(1).to({scaleX:0.42,scaleY:0.42,rotation:346.3,x:422.9,y:119.9},0).wait(1).to({scaleX:0.44,scaleY:0.44,rotation:347.4,x:423.1,y:119.7},0).wait(1).to({scaleX:0.45,scaleY:0.45,rotation:348.5,x:423.3,y:119.5},0).wait(1).to({scaleX:0.47,scaleY:0.47,rotation:349.5,x:423.5,y:119.3},0).wait(1).to({scaleX:0.49,scaleY:0.49,rotation:350.5,x:423.7,y:119.2},0).wait(1).to({scaleX:0.51,scaleY:0.51,rotation:351.5,x:423.9,y:119},0).wait(1).to({scaleX:0.54,scaleY:0.54,rotation:352.5,x:424.1,y:118.8},0).wait(1).to({scaleX:0.56,scaleY:0.56,rotation:353.5,x:424.3,y:118.6},0).wait(1).to({scaleX:0.59,scaleY:0.59,rotation:354.5,x:424.5,y:118.4},0).wait(1).to({scaleX:0.63,scaleY:0.63,rotation:355.4,x:424.7,y:118.2},0).wait(1).to({scaleX:0.66,scaleY:0.66,rotation:356.3,x:425,y:118},0).wait(1).to({scaleX:0.71,scaleY:0.71,rotation:357.3,x:425.1,y:117.8},0).wait(1).to({scaleX:0.76,scaleY:0.76,rotation:358.2,x:425.4,y:117.5},0).wait(1).to({scaleX:0.83,scaleY:0.83,rotation:359.1,x:425.5,y:117.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:360,x:427,y:117},0).wait(1).to({scaleX:1.04,scaleY:1.04,rotation:360.8,x:424.7,y:117.5},0).wait(1).to({scaleX:1.05,scaleY:1.05,rotation:361.1,x:424,y:117.7},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:361.3,x:423.4,y:117.8},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:361.5,x:423,y:117.9},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:361.6,x:422.7,y:118},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:361.7,x:422.4,y:118.1},0).wait(1).to({scaleX:1.09,scaleY:1.09,rotation:361.8,x:422.2},0).wait(1).to({scaleX:1.09,scaleY:1.09,rotation:361.9,x:422,y:118.2},0).wait(1).to({scaleX:1.09,scaleY:1.09,x:421.8,y:118.3},0).wait(1).to({scaleX:1.1,scaleY:1.1,rotation:362,x:421.7},0).wait(1).to({scaleX:1.1,scaleY:1.1,x:421.5,y:118.4},0).wait(1).to({scaleX:1.1,scaleY:1.1,rotation:362.1,x:421.4,y:118.3},0).wait(1).to({scaleX:1.1,scaleY:1.1,x:421.3,y:118.4},0).wait(1).to({scaleX:1.1,scaleY:1.1,x:421.2},0).wait(1).to({scaleX:1.11,scaleY:1.11,rotation:362.2,x:421.1},0).wait(1).to({scaleX:1.11,scaleY:1.11},0).wait(1).to({scaleX:1.11,scaleY:1.11,x:421},0).wait(1).to({scaleX:1.11,scaleY:1.11,y:118.5},0).wait(1).to({scaleX:1.11,scaleY:1.11},0).wait(1).to({x:420.9,y:118.4},0).wait(1).to({y:118.5},0).wait(1).to({scaleX:1.11,scaleY:1.11,rotation:362.3},0).wait(2).to({y:118.4},0).wait(1).to({y:118.5},0).wait(3).to({scaleX:1.11,scaleY:1.11,rotation:362.2},0).wait(2).to({scaleX:1.11,scaleY:1.11,x:421},0).wait(1).to({scaleX:1.11,scaleY:1.11},0).wait(1).to({scaleX:1.11,scaleY:1.11,x:421.1},0).wait(1).to({scaleX:1.11,scaleY:1.11},0).wait(1).to({scaleX:1.1,scaleY:1.1,rotation:362.1,x:421.3,y:118.4},0).wait(1).to({scaleX:1.1,scaleY:1.1,x:421.4},0).wait(1).to({scaleX:1.1,scaleY:1.1,rotation:362,x:421.5},0).wait(1).to({scaleX:1.09,scaleY:1.09,rotation:361.9,x:421.8,y:118.3},0).wait(1).to({scaleX:1.09,scaleY:1.09,rotation:361.8,x:422},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:361.7,x:422.4,y:118.1},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:361.5,x:422.9},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:361.3,x:423.5,y:117.9},0).wait(1).to({scaleX:1.05,scaleY:1.05,rotation:361,x:424.3,y:117.7},0).wait(1).to({scaleX:1.04,scaleY:1.04,rotation:360.8,x:424.9,y:117.5},0).wait(1).to({scaleX:1.03,scaleY:1.03,rotation:360.6,x:425.5,y:117.4},0).wait(1).to({scaleX:1.02,scaleY:1.02,rotation:360.4,x:425.9,y:117.3},0).wait(1).to({scaleX:1.01,scaleY:1.01,rotation:360.3,x:426.2,y:117.2},0).wait(1).to({scaleX:1.01,scaleY:1.01,rotation:360.2,x:426.5},0).wait(1).to({scaleX:1,scaleY:1,rotation:360.1,x:426.8,y:117.1},0).wait(1).to({scaleX:1,scaleY:1,rotation:360,x:427,y:117},0).wait(55));

	// redConShad.png
	this.instance_3 = new lib.Symbol3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(402.5,164.9,0.209,0.14,0,0,0,61.9,18.6);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(31).to({_off:false},0).to({regX:61.5,scaleX:0.14,x:420.3,alpha:0.5},14,cjs.Ease.get(1)).to({regX:61,regY:18.5,scaleX:1,scaleY:1,x:435,y:221.5,alpha:1},38,cjs.Ease.get(-1)).wait(1).to({scaleX:1.11,scaleY:0.98,x:432.3,y:221.8},0).wait(1).to({scaleX:1.15,scaleY:0.97,x:431.4,y:222},0).wait(1).to({scaleX:1.17,scaleY:0.97,x:430.7,y:222.1},0).wait(1).to({scaleX:1.19,scaleY:0.96,x:430.2},0).wait(1).to({scaleX:1.21,scaleY:0.96,x:429.8,y:222.2},0).wait(1).to({scaleX:1.22,scaleY:0.96,x:429.4},0).wait(1).to({scaleX:1.23,scaleY:0.95,x:429.2,y:222.3},0).wait(1).to({scaleX:1.24,scaleY:0.95,x:428.9},0).wait(1).to({scaleX:1.25,scaleY:0.95,x:428.7},0).wait(1).to({scaleX:1.26,scaleY:0.95,x:428.5},0).wait(1).to({scaleX:1.26,scaleY:0.95,x:428.4,y:222.4},0).wait(1).to({scaleX:1.27,scaleY:0.95,x:428.3},0).wait(1).to({scaleX:1.27,scaleY:0.95,x:428.1},0).wait(1).to({scaleX:1.28,scaleY:0.95,x:428},0).wait(1).to({scaleX:1.28,scaleY:0.94},0).wait(1).to({scaleX:1.29,x:427.8},0).wait(1).to({scaleX:1.29,scaleY:0.94},0).wait(1).to({scaleX:1.29,x:427.7,y:222.5},0).wait(1).to({scaleX:1.29},0).wait(1).to({scaleX:1.29,scaleY:0.94},0).wait(1).to({scaleX:1.29,x:427.6},0).wait(1).to({scaleX:1.29},0).wait(1).to({scaleX:1.3},0).wait(1).to({y:222.4},0).wait(1).to({regX:61.1,regY:18.6,x:427.7,y:222.5},0).wait(1).to({regX:61,regY:18.5,x:427.6,y:222.4},0).wait(1).to({scaleX:1.29},0).wait(2).to({scaleX:1.29},0).wait(1).to({scaleX:1.29,scaleY:0.94},0).wait(1).to({scaleX:1.29,x:427.7},0).wait(1).to({scaleX:1.29,scaleY:0.94,x:427.8},0).wait(1).to({scaleX:1.28,scaleY:0.95,x:427.9},0).wait(1).to({scaleX:1.28,scaleY:0.95,x:428},0).wait(1).to({scaleX:1.27,scaleY:0.95,x:428.2,y:222.3},0).wait(1).to({scaleX:1.26,scaleY:0.95,x:428.3},0).wait(1).to({scaleX:1.25,scaleY:0.95,x:428.6},0).wait(1).to({scaleX:1.24,scaleY:0.95,x:429},0).wait(1).to({scaleX:1.22,scaleY:0.96,x:429.4,y:222.2},0).wait(1).to({scaleX:1.2,scaleY:0.96,x:429.9,y:222.1},0).wait(1).to({scaleX:1.17,scaleY:0.97,x:430.7,y:222},0).wait(1).to({scaleX:1.13,scaleY:0.97,x:431.6,y:221.9},0).wait(1).to({scaleX:1.1,scaleY:0.98,x:432.4,y:221.8},0).wait(1).to({scaleX:1.08,scaleY:0.99,x:433.1,y:221.7},0).wait(1).to({scaleX:1.05,scaleY:0.99,x:433.6,y:221.6},0).wait(1).to({scaleX:1.04,scaleY:0.99,x:434},0).wait(1).to({scaleX:1.02,scaleY:1,x:434.4,y:221.5},0).wait(1).to({scaleX:1.01,scaleY:1,x:434.7},0).wait(1).to({scaleX:1,scaleY:1,x:435},0).wait(55));

	// yellowCon.png copy
	this.instance_4 = new lib.Symbol2();
	this.instance_4.parent = this;
	this.instance_4.setTransform(305.1,246.4,0.105,0.123,0,-112.5,-128.8,-1.6,105.7);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(8).to({_off:false},0).to({regX:3.1,regY:100.8,scaleX:0.1,scaleY:0.1,rotation:-120,skewX:0,skewY:0,x:261.1},6,cjs.Ease.get(1)).wait(1).to({regX:35.5,regY:62.5,scaleX:0.14,scaleY:0.14,rotation:-114.4,x:245.5,y:245.3},0).wait(1).to({scaleX:0.19,scaleY:0.19,rotation:-108.6,x:234.8,y:244.6},0).wait(1).to({scaleX:0.23,scaleY:0.23,rotation:-102.7,x:224,y:243.6},0).wait(1).to({scaleX:0.28,scaleY:0.28,rotation:-96.7,x:213.5,y:242.2},0).wait(1).to({scaleX:0.32,scaleY:0.32,rotation:-90.7,x:203.2,y:240.4},0).wait(1).to({scaleX:0.37,scaleY:0.37,rotation:-84.6,x:193.5,y:238.5},0).wait(1).to({scaleX:0.41,scaleY:0.41,rotation:-78.8,x:184.5,y:236.4},0).wait(1).to({scaleX:0.45,scaleY:0.45,rotation:-73.1,x:176.1,y:234.2},0).wait(1).to({scaleX:0.49,scaleY:0.49,rotation:-67.7,x:168.7,y:232.1},0).wait(1).to({scaleX:0.53,scaleY:0.53,rotation:-62.7,x:162.2,y:230.2},0).wait(1).to({scaleX:0.56,scaleY:0.56,rotation:-58,x:156.5,y:228.5},0).wait(1).to({scaleX:0.6,scaleY:0.6,rotation:-53.8,x:151.6,y:226.9},0).wait(1).to({scaleX:0.63,scaleY:0.63,rotation:-49.9,x:147.2,y:225.6},0).wait(1).to({scaleX:0.65,scaleY:0.65,rotation:-46.3,x:143.6,y:224.6},0).wait(1).to({scaleX:0.68,scaleY:0.68,rotation:-43.1,x:140.4,y:223.7},0).wait(1).to({scaleX:0.7,scaleY:0.7,rotation:-40.2,x:137.6,y:223},0).wait(1).to({scaleX:0.72,scaleY:0.72,rotation:-37.6,x:135.2,y:222.4},0).wait(1).to({scaleX:0.74,scaleY:0.74,rotation:-35.2,x:133,y:222},0).wait(1).to({scaleX:0.75,scaleY:0.75,rotation:-33,x:131.1,y:221.6},0).wait(1).to({scaleX:0.77,scaleY:0.77,rotation:-31,x:129.5,y:221.4},0).wait(1).to({scaleX:0.78,scaleY:0.78,rotation:-29.1,x:128,y:221.2},0).wait(1).to({scaleX:0.8,scaleY:0.8,rotation:-27.4,x:126.6,y:221.1},0).wait(1).to({scaleX:0.81,scaleY:0.81,rotation:-25.8,x:125.4,y:221},0).wait(1).to({scaleX:0.82,scaleY:0.82,rotation:-24.3,x:124.2,y:220.9},0).wait(1).to({scaleX:0.83,scaleY:0.83,rotation:-22.9,x:123.2},0).wait(1).to({scaleX:0.84,scaleY:0.84,rotation:-21.6,x:122.3},0).wait(1).to({scaleX:0.85,scaleY:0.85,rotation:-20.5,x:121.4,y:221},0).wait(1).to({scaleX:0.86,scaleY:0.86,rotation:-19.3,x:120.6},0).wait(1).to({scaleX:0.86,scaleY:0.86,rotation:-18.3,x:119.8,y:221.1},0).wait(1).to({scaleX:0.87,scaleY:0.87,rotation:-17.3,x:119.1,y:221.2},0).wait(1).to({scaleX:0.88,scaleY:0.88,rotation:-16.3,x:118.5,y:221.3},0).wait(1).to({scaleX:0.88,scaleY:0.88,rotation:-15.5,x:117.9,y:221.4},0).wait(1).to({scaleX:0.89,scaleY:0.89,rotation:-14.6,x:117.3,y:221.5},0).wait(1).to({scaleX:0.9,scaleY:0.9,rotation:-13.8,x:116.8,y:221.6},0).wait(1).to({scaleX:0.9,scaleY:0.9,rotation:-13.1,x:116.3,y:221.7},0).wait(1).to({scaleX:0.91,scaleY:0.91,rotation:-12.4,x:115.8,y:221.9},0).wait(1).to({scaleX:0.91,scaleY:0.91,rotation:-11.7,x:115.3,y:222},0).wait(1).to({scaleX:0.92,scaleY:0.92,rotation:-11.1,x:114.9,y:222.1},0).wait(1).to({scaleX:0.92,scaleY:0.92,rotation:-10.4,x:114.5,y:222.2},0).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-9.9,x:114.1,y:222.3},0).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-9.3,x:113.7,y:222.5},0).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-8.8,x:113.4,y:222.7},0).wait(1).to({scaleX:0.94,scaleY:0.94,rotation:-8.3,x:113.1},0).wait(1).to({scaleX:0.94,scaleY:0.94,rotation:-7.8,x:112.8,y:222.9},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:-7.3,x:112.5,y:223},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:-6.9,x:112.1,y:223.1},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:-6.5,x:111.9,y:223.3},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:-6,x:111.6,y:223.4},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:-5.7,x:111.4,y:223.5},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:-5.3,x:111.2,y:223.6},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:-4.9,x:110.9,y:223.7},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:-4.6,x:110.6,y:223.8},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:-4.2,x:110.5,y:224},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:-3.9,x:110.2,y:224.1},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:-3.6,x:110.1,y:224.2},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:-3.3,x:109.9,y:224.3},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:-3,x:109.7,y:224.4},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:-2.8,x:109.5,y:224.5},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:-2.5,x:109.4,y:224.6},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:-2.3,x:109.1,y:224.7},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-2,x:109,y:224.8},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-1.8,x:108.9,y:224.9},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-1.5,x:108.7,y:225},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-1.3,x:108.6,y:225.1},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-1.1,x:108.5},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:-0.9,x:108.3,y:225.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:-0.7,x:108.2,y:225.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-0.5,x:108.1,y:225.4},0).wait(1).to({scaleX:1,scaleY:1,rotation:-0.3,x:108,y:225.5},0).wait(1).to({scaleX:1,scaleY:1,rotation:-0.2,x:107.9},0).wait(1).to({regX:3.4,regY:100.9,scaleX:1,scaleY:1,rotation:0,x:75.4,y:263.9},0).wait(102));

	// yellowConShad.png
	this.instance_5 = new lib.Symbol1();
	this.instance_5.parent = this;
	this.instance_5.setTransform(229.1,245.6,0.108,0.108,0,0,0,61.8,18.4);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(16).to({_off:false},0).wait(1).to({regX:61,regY:18.5,scaleX:0.15,scaleY:0.15,x:221.5,y:248},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:213.8,y:250.4},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:205.9,y:252.9},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:197.9,y:255.5},0).wait(1).to({scaleX:0.33,scaleY:0.33,x:189.9,y:258},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:181.9,y:260.6},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:174,y:263},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:166.5,y:265.4},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:159.4,y:267.7},0).wait(1).to({scaleX:0.54,scaleY:0.54,x:152.7,y:269.8},0).wait(1).to({scaleX:0.57,scaleY:0.57,x:146.6,y:271.7},0).wait(1).to({scaleX:0.61,scaleY:0.61,x:140.9,y:273.5},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:135.9,y:275.1},0).wait(1).to({scaleX:0.66,scaleY:0.66,x:131.2,y:276.6},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:127,y:277.9},0).wait(1).to({scaleX:0.71,scaleY:0.71,x:123.3,y:279.1},0).wait(1).to({scaleX:0.73,scaleY:0.73,x:119.8,y:280.2},0).wait(1).to({scaleX:0.74,scaleY:0.74,x:116.6,y:281.2},0).wait(1).to({scaleX:0.76,scaleY:0.76,x:113.8,y:282.1},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:111.1,y:282.9},0).wait(1).to({scaleX:0.79,scaleY:0.79,x:108.7,y:283.7},0).wait(1).to({scaleX:0.8,scaleY:0.8,x:106.4,y:284.4},0).wait(1).to({scaleX:0.81,scaleY:0.81,x:104.4,y:285.1},0).wait(1).to({scaleX:0.82,scaleY:0.82,x:102.4,y:285.7},0).wait(1).to({scaleX:0.83,scaleY:0.83,x:100.6,y:286.3},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:99,y:286.8},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:97.4,y:287.3},0).wait(1).to({scaleX:0.86,scaleY:0.86,x:95.9,y:287.7},0).wait(1).to({scaleX:0.87,scaleY:0.87,x:94.5,y:288.2},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:93.3,y:288.6},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:92.1,y:289},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:90.9,y:289.3},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:89.8,y:289.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:88.8,y:290},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:87.8,y:290.3},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:86.9,y:290.6},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:86,y:290.9},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:85.2,y:291.1},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:84.4,y:291.4},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:83.6,y:291.6},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:82.9,y:291.9},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:82.2,y:292.1},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:81.5,y:292.3},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:80.9,y:292.5},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:80.3,y:292.7},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:79.8,y:292.9},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:79.2,y:293},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:78.6,y:293.2},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:78.1,y:293.4},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:77.7,y:293.5},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:77.2,y:293.7},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:76.7,y:293.8},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:76.3,y:293.9},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:75.9,y:294.1},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:75.5,y:294.2},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:75.1,y:294.3},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:74.7,y:294.5},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:74.4},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:74.1,y:294.7},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:73.7,y:294.8},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:73.4,y:294.9},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:73.1,y:295},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:72.8,y:295.1},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:72.5},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:72.2,y:295.2},0).wait(1).to({scaleX:1,scaleY:1,x:72,y:295.3},0).wait(1).to({scaleX:1,scaleY:1,x:71.7,y:295.4},0).wait(1).to({scaleX:1,scaleY:1,x:71.5,y:295.5},0).wait(1).to({scaleX:1,scaleY:1,x:72},0).wait(102));

	// grayCon.png
	this.instance_6 = new lib.Symbol6();
	this.instance_6.parent = this;
	this.instance_6.setTransform(265.1,239.6,0.108,0.108,90,0,0,44.7,42.4);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(78).to({_off:false},0).wait(1).to({regX:43.5,regY:42,scaleX:0.11,scaleY:0.11,rotation:89.5,x:265,y:238.8},0).wait(1).to({scaleX:0.14,scaleY:0.14,rotation:87.4,x:264.2,y:235.3},0).wait(1).to({scaleX:0.24,scaleY:0.24,rotation:76.9,x:260.7,y:219},0).wait(1).to({scaleX:0.49,scaleY:0.49,rotation:51.6,x:251.8,y:179.4},0).wait(1).to({scaleX:0.61,scaleY:0.61,rotation:39.7,x:247.6,y:160.9},0).wait(1).to({scaleX:0.69,scaleY:0.69,rotation:31.5,x:244.6,y:148.2},0).wait(1).to({scaleX:0.75,scaleY:0.75,rotation:25,x:242.3,y:138.2},0).wait(1).to({scaleX:0.8,scaleY:0.8,rotation:20.7,x:240.8,y:131.5},0).wait(1).to({scaleX:0.82,scaleY:0.82,rotation:17.8,x:239.7,y:127},0).wait(1).to({scaleX:0.85,scaleY:0.85,rotation:15.5,x:238.9,y:123.5},0).wait(1).to({scaleX:0.86,scaleY:0.86,rotation:13.7,x:238.2,y:120.7},0).wait(1).to({scaleX:0.88,scaleY:0.88,rotation:12.2,x:237.7,y:118.3},0).wait(1).to({scaleX:0.89,scaleY:0.89,rotation:10.8,x:237.2,y:116.3},0).wait(1).to({scaleX:0.9,scaleY:0.9,rotation:9.7,x:236.7,y:114.5},0).wait(1).to({scaleX:0.91,scaleY:0.91,rotation:8.7,x:236.4,y:112.9},0).wait(1).to({scaleX:0.92,scaleY:0.92,rotation:7.8,x:236.1,y:111.5},0).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:7,x:235.8,y:110.3},0).wait(1).to({scaleX:0.94,scaleY:0.94,rotation:6.2,x:235.5,y:109.2},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:5.6,x:235.3,y:108.2},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:5,x:235.1,y:107.3},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:4.5,x:234.9,y:106.5},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:4,x:234.7,y:105.8},0).wait(1).to({scaleX:0.96,scaleY:0.96,rotation:3.6,x:234.6,y:105.2},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:3.2,x:234.4,y:104.5},0).wait(1).to({scaleX:0.97,scaleY:0.97,rotation:2.9,x:234.3,y:104},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:2.6,x:234.2,y:103.5},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:2.3,x:234.1,y:103.1},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:2,x:234,y:102.7},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:1.8,x:233.9,y:102.4},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:1.6,y:102},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:1.4,x:233.8,y:101.7},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:1.2,x:233.7,y:101.5},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:1.1,y:101.3},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:1,y:101.1},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:0.8,x:233.6,y:100.9},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:0.7,y:100.7},0).wait(1).to({scaleX:0.99,scaleY:0.99,rotation:0.6,x:233.5,y:100.6},0).wait(1).to({scaleX:1,scaleY:1,y:100.4},0).wait(1).to({rotation:0.5,y:100.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:0.4,y:100.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:0.3,x:233.4,y:100.1},0).wait(1).to({scaleX:1,scaleY:1,y:100},0).wait(1).to({rotation:0.2,x:233.3,y:99.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:0.1,y:99.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:234.5,y:100},0).wait(64));

	// grayConShad.png
	this.instance_7 = new lib.Symbol5();
	this.instance_7.parent = this;
	this.instance_7.setTransform(265.1,239.7,0.108,0.108,0,0,0,41.5,12.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(78).to({_off:false},0).wait(1).to({regX:40.5,regY:12,scaleX:0.11,scaleY:0.11,x:264.9,y:239.2,alpha:0.005},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:264.5,y:236.8,alpha:0.029},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:262.3,y:225.6,alpha:0.146},0).wait(1).to({scaleX:0.49,scaleY:0.49,x:257.1,y:198.6,alpha:0.427},0).wait(1).to({scaleX:0.61,scaleY:0.61,x:254.6,y:186,alpha:0.559},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:253,y:177.2,alpha:0.65},0).wait(1).to({scaleX:0.75,scaleY:0.75,x:251.6,y:170.3,alpha:0.722},0).wait(1).to({scaleX:0.8,scaleY:0.8,x:250.8,y:165.7,alpha:0.77},0).wait(1).to({scaleX:0.82,scaleY:0.82,x:250.2,y:162.6,alpha:0.802},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:249.7,y:160.1,alpha:0.827},0).wait(1).to({scaleX:0.86,scaleY:0.86,x:249.3,y:158.2,alpha:0.848},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:249,y:156.5,alpha:0.865},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:248.7,y:155.1,alpha:0.88},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:248.5,y:153.9,alpha:0.893},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:248.3,y:152.8,alpha:0.904},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:248.1,y:151.9,alpha:0.914},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:247.9,y:151,alpha:0.923},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:247.8,y:150.2,alpha:0.931},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:247.6,y:149.5,alpha:0.938},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:247.5,y:148.9,alpha:0.944},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:247.4,y:148.3,alpha:0.95},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:247.3,y:147.8,alpha:0.955},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:247.2,y:147.4,alpha:0.96},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:247.1,y:147,alpha:0.964},0).wait(1).to({scaleX:0.97,scaleY:0.97,y:146.6,alpha:0.968},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:247,y:146.3,alpha:0.972},0).wait(1).to({scaleX:0.98,scaleY:0.98,y:146,alpha:0.975},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:246.9,y:145.7,alpha:0.978},0).wait(1).to({scaleX:0.98,scaleY:0.98,y:145.5,alpha:0.98},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:246.8,y:145.2,alpha:0.982},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:145.1,alpha:0.984},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:144.9,alpha:0.986},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:246.7,y:144.7,alpha:0.988},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:144.6,alpha:0.989},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:144.5,alpha:0.991},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:246.6,y:144.3,alpha:0.992},0).wait(1).to({scaleX:0.99,scaleY:0.99,y:144.2,alpha:0.993},0).wait(1).to({alpha:0.994},0).wait(1).to({scaleX:1,scaleY:1,y:144.1,alpha:0.995},0).wait(1).to({scaleX:1,scaleY:1,y:144,alpha:0.996},0).wait(1).to({scaleX:1,scaleY:1,x:246.5,y:143.9},0).wait(1).to({scaleX:1,scaleY:1,x:246.6,y:143.8,alpha:0.997},0).wait(1).to({alpha:0.998},0).wait(1).to({scaleX:1,scaleY:1,x:246.5,y:143.7,alpha:0.999},0).wait(1).to({scaleX:1,scaleY:1,x:247.5,y:144,alpha:1},0).wait(64));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;



}
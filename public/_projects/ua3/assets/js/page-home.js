var HomePage = function() {
	this.navItemId = "home";
	this.mqCanvases;
	this.mqCanvasesLoaded = 0;

	this.trackingName = "home";

	// The time the rest of the canvases start to load after the hero starts animating. In milliseconds.
	cjs.CJSAnimation.deferredAnimsLoadStartDelay = 0000;
};

HomePage.prototype.docReady = function() {
	// CHECK MARQUEE IN VIEW
	var mq = $("#marquee")[0];
	_ivc.isInView({ elem: mq, offsetBottom: 0, offsetTop: 0 });
	if ($("#marquee").hasClass("in-view")) {
		// PAUSE MARQUEE CANVASES
		$("#marquee .cjs-anim").on("loaded", function() {
			var anim = this.cjsAnimation.stage.getChildAt(0).getChildAt(0);
			anim.gotoAndStop("intro");
		});
		cjs.CJSAnimation.on("all-required-loaded", this.marqueeLoadComplete.bind(this));
	} else {
		$("#marquee").addClass("build-in");
		$("#marquee.build-in .build-in-bg").css({ display: "none" });
		$("section:not(#marquee)")
			.css("transition", "none")
			.addClass("build-in");

		viewCheck();
	}

	$("body").css({ opacity: "" });
};

HomePage.prototype.marqueeLoadComplete = function() {
	function addBuildIns() {
		$("#marquee").addClass("build-in");
		$("#marquee .switch-wrap .switch").on("transitionend", function() {
			console.log("adding2 build-in");

			$("section:not(#marquee)").addClass("build-in");

			$("#marquee.build-in .build-in-bg").css({ display: "none" });

			viewCheck();
		});
	}

	// To fix issue with not showing after page loaded with reduce on and then motion re-enabling,
	// guess is does the same thing either way?
	if (_reduceMotion) {
		addBuildIns();
	} else {
		addBuildIns();
	}
};

HomePage.prototype.handleMQLogoTrigger = function() {
	$("#marquee .switch-wrap, #marquee .exclusive-wrap").addClass("animate");
};

HomePage.prototype.winLoaded = function() {
	// DEEP LINKS
	if (window.location.hash === "#watch-trailer") {
		// HANDLE TRAILER DEEP LINK
		_modal.open("home-trailer");
	}
	// ADD VIDEO
	var heroesVideo = $('<video class="bg-video inline-video view-check reset-view" aria-hidden="true" loop autoplay playsinline muted poster="" />');
	var teamVideo = $('<video class="bg-video inline-video view-check reset-view" aria-hidden="true" loop autoplay playsinline muted poster="" />');

	$(heroesVideo).append("<source src='" + _assetPath + "video/Home_HeroBladeBG.mp4' type='video/mp4'>");
	$(teamVideo).append("<source src='" + _assetPath + "video/Home_UltimateTeamBladeBG.mp4' type='video/mp4'>");

	$("#heroes-blade .vid-wrap").append(heroesVideo);
	$("#ultimate-team-blade .vid-wrap").append(teamVideo);

	$("video").on("playing", function() {
		$(this).addClass("playing");
	});
};

// POTENTIAL PARA
// HomePage.prototype.scroll = function () {
// 	var mqChars = $("#marquee-chars")[0].cjsAnimation.stage.getChildAt(0).getChildAt(0);
// 	if (_scrollY < mqChars.totalFrames)
// 		mqChars.gotoAndStop(_scrollY);
// 	console.log(_scrollY, mqChars.currentFrame);
// }

// HomePage.prototype.resize = function() {
// 	if (_isMobile) {
// 		$("#marquee .max-w-container").css({ opacity: 0, width: "1px" });
// 		setTimeout(function() {
// 			$("#marquee .max-w-container").css({ opacity: "", width: "" });
// 			$("#marquee .cjs-anim").each(function(i, elem) {
// 				var anim = elem.cjsAnimation;
// 				anim.resizeCanvas();
// 			});
// 		}, 1000);
// 	}
// };
var cachedWidth = $(window).width();
HomePage.prototype.resize = function() {
	if (_isMobile) {
		var newWidth = $(window).width();
		if (newWidth !== cachedWidth) {
			//DO RESIZE HERE
			$("#marquee .max-w-container").css({ opacity: 0, width: "1px" });
			setTimeout(function() {
				$("#marquee .max-w-container").css({ opacity: "", width: "" });
				$("#marquee .cjs-anim").each(function(i, elem) {
					var anim = elem.cjsAnimation;
					anim.resizeCanvas();
				});
			}, 1000);
			cachedWidth = newWidth;
		}
	}
};
_page = new HomePage();

var HomePage = function () {
	this.trackingName = "home";

	this.heroAssets;
	this.heroAssetsLoaded = 0;
	this.heroAssetsReady = false;

	this.onResize = function (e) {

		/* Hero scaling. Necessary because IE doesn't support calc() in transform/scale */

		var winW = window.innerWidth;
		var minWinW = 320;
		var maxWinW = 1198;

		var midGroupScale = Math.min(0.5551 + (1 - 0.5551) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var midGroupTransform = 'scale(' + midGroupScale + ')';
		var $midGroup = $('#middle-group');

		$midGroup.css('transform', midGroupTransform);

		var journeyLogoGroupScale = Math.min(0.47032 + (1 - 0.47032) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var journeyLogoGroupTransform = 'scale(' + journeyLogoGroupScale + ')';
		var $journeyLogoGroup = $('.fly-container>div');

		$journeyLogoGroup.css('transform', journeyLogoGroupTransform);

		var mandlGroupScale = Math.min(0.76 + (1 - 0.76) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var mandlGroupTransform = 'scale(' + mandlGroupScale + ')';
		var $mandlGroup = $('#mandl-group');

		$mandlGroup.css('transform', mandlGroupTransform);

		var buyBurstGroupScale = Math.min(0.30 + (1 - 0.30) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var buyBurstGroupTransform = 'scale(' + buyBurstGroupScale + ')';
		var $buyBurstGroup = $('#buy-burst-group');

		if (window.innerWidth > 700) {
			$buyBurstGroup.css('transform', buyBurstGroupTransform);
		} else {
			$buyBurstGroup.css('transform', '');
		}

		var scrollBtnGroupScale = Math.min(0.50 + (1 - 0.50) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var scrollBtnGroupTransform = 'scale(' + scrollBtnGroupScale + ')';
		var $scrollBtnGroup = $('#scroll-button');

		$scrollBtnGroup.css('transform', scrollBtnGroupTransform);

		var infoGroupScale = Math.min(0.50 + (1 - 0.50) * ((winW - minWinW) / (maxWinW - minWinW)), 1);
		var infoGroupTransform = 'scale(' + infoGroupScale + ') translateX(-50%)';
		var $infoGroup = $('#info');

		$infoGroup.css('transform', infoGroupTransform);

	}

	window.addEventListener('resize', this.onResize.bind(this));

	this.onResize();

}

HomePage.prototype.docReady = function () {
	var self = this;

	// ASSETS WE WANT TO CHECK FOR LOAD
	this.heroAssets = $("#home-hero img");

	// for (var i = 0; i < this.heroAssets.length; i++) {
	// 	var asset = this.heroAssets[i];
	// 	if (asset.complete) {
	// 		this.heroAssetsLoaded++;
	// 		this.heroAssetsLoadCheck();
	// 	} else {
	// 		$(asset).on("load", function () {
	// 			self.heroAssetsLoaded++;
	// 			self.heroAssetsLoadCheck();
	// 		})
	// 	}
	// }

	$(".squishy-letters").each(function (i, hdr) {
		var squishy = new SquishyLetters({
			elem: hdr
		});
	});



}

HomePage.prototype.winLoaded = function () {

	this.heroAssetsLoadCheck();
	// DEEP LINKS
	if (window.location.hash === '#watch-trailer') {
		// HANDLE TRAILER DEEP LINK
		_modal.open("home-trailer");
	}

	function fixHeight() {
		var sectionHeight = $('#combat-blade .blade-section>div:first-child').height();
		var padding = parseInt($('#combat-blade .blade-content').css('margin-top'));
		var vidMargin = 0; //window.innerWidth * 0.015; // I guess someone removed the margin.
		var shim = 5; // Dunno why this is needed.
		$('#mobile-bg').css('height', sectionHeight + padding - vidMargin + shim + 'px');
	}

	fixHeight();

	new ResizeSensor($('#combat-blade')[0], fixHeight);

	this.scroll();

}

HomePage.prototype.resize = function() 
{
	var jrLogo1 = $("#story-blade .danger > div:first-of-type > .danger-chars #jr #logo")[0];
	var jrLogo2 = $("#story-blade .danger> div:last-of-type .center-monkey .danger-chars #jr #logo")[0];
	
	if (!jrLogo1 && !jrLogo2)
	{
		$(".journey-wobbler .wobbler-content .logo-journey").css({"opacity":"1"});
	}
}

HomePage.prototype.scroll = function() 
{
	// if ($(".journey-wobbler .wobbler-content .logo-journey").hasClass("in-view") && !$(".danger-chars #jr").hasClass("set"))
	// if ($(".danger-chars").hasClass("in-view") && $(".journey-wobbler .wobbler-content .logo-journey").hasClass("in-view") && !$(".danger-chars #jr").hasClass("set"))
	if ($(".journey-wobbler .wobbler-content .logo-journey").hasClass("in-view") && !$(".danger-chars #jr").hasClass("set"))
	{
		this.runJrAnim();
	}
}

HomePage.prototype.runJrAnim = function()
{
	console.log("run jr anim")
	// JR ENTRANCE ANIM
	var destLogo = $(".journey-wobbler .wobbler-content .logo-journey");
	var movingLogo = (window.matchMedia("(max-width: 1023px)").matches) ? $("#story-blade .danger > div:first-of-type > .danger-chars #jr #logo") : $("#story-blade .danger> div:last-of-type .center-monkey .danger-chars #jr #logo");
	var hiddenLogo = (window.matchMedia("(max-width: 1023px)").matches) ? $("#story-blade .danger> div:last-of-type .center-monkey .danger-chars #jr #logo") : $("#story-blade .danger > div:first-of-type > .danger-chars #jr #logo");
	var hiddenJr = (window.matchMedia("(max-width: 1023px)").matches) ? $("#story-blade .danger> div:last-of-type .center-monkey .danger-chars #jr") : $("#story-blade .danger > div:first-of-type > .danger-chars #jr");
	// set logo size to match blade
	var logoW = destLogo.width();
	movingLogo.css({"width": logoW});
	// get logo pos
	var logoX = destLogo.offset().left;
	var logoY = destLogo.offset().top;
	var originX = movingLogo.offset().left;
	var originY = movingLogo.offset().top;
	// set up jr after getting final pos
	$(".danger-chars #jr").addClass("set");
	// travel diffs
	var travelX = logoX - originX;
	var travelY = logoY - originY;

	// start the anim
	setTimeout(function()
	{
		$(".danger-chars #jr").addClass("transition-ready");
		$(".danger-chars #jr").addClass("entrance");
		$(".danger-chars #chars").addClass("entrance");
	}, 200);

	var logoDelay = (window.matchMedia("(max-width: 1023px)").matches) ? 910 : 1110;
	setTimeout(function()
	{
		// send the logo
		console.log("logo go")
		// movingLogo.css({"left": travelX + "px", "top": travelY + "px"});
		movingLogo.css({"transform": "translate3d(" + travelX + "px, " + travelY + "px, 0)"});
	}, logoDelay);

	movingLogo.one("transitionend", function()
	{
		destLogo.css({"opacity":"1"});
		movingLogo.remove();
		console.log("end of moving logo")

		// DON'T RE-RUN ON RESIZE
		// OTHER BREAKPOINT LOGO
		hiddenLogo.remove();
		$(".danger-chars").addClass("in-view");
		hiddenJr.css({"animation":"none"});
	});
}

HomePage.prototype.heroAssetsLoadCheck = function () {
	// var self = this;
	// if (this.heroAssetsLoaded == this.heroAssets.length) {
		$('#home-hero').addClass('loaded');

		$("#home-hero #bowser-container img").on("animationstart", function()
		{
			setTimeout(function(){
				$("#home-hero.loaded #starlow-container .scared").css({"opacity":"1"}).addClass("recoil");
				$("#home-hero.loaded #starlow-container .unscared").css({"opacity":"0"});
			}, 120);
			setTimeout(function(){
				$("#home-hero.loaded #luigi-container .scared").css({"opacity":"1"}).addClass("recoil");
				$("#home-hero.loaded #luigi-container .unscared").css({"opacity":"0"});
			}, 220);
		})

		setTimeout(function () {
			$('#home-hero').addClass('complete');
		}, 3000);
	// }
}


_page = new HomePage();
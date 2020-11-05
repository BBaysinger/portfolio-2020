var HeroesPage = function() {
	var self = this;
	if ($("body").attr("id") == "page-hero-detail")
	{
		var heroName = $("#char-wrap").attr("data-hero-pg");
		if (heroName != "spider-gwen" && heroName != "spider-man" && heroName != "star-lord")
		{
			heroName = heroName.replace(/-/g, " ");
		}
		if (heroName == "ms marvel")
			heroName = "ms. marvel";
		this.trackingName = "bio " + heroName;
	}
	else 
	{
		this.trackingName = "heroes";
	}

	this.navItemId = "heroes";

	this.loadCheckAssets;
	this.loadCheckAssetsLoaded = 0;

	cjs.CJSAnimation.deferredAnimsLoadStartDelay = 0000;
};
HeroesPage.prototype.docReady = function() {
	var self = this;

	if ($("body").attr("id") == "page-hero-detail")
	{
		var heroName = $("#char-wrap").attr("data-hero-pg");
		if (heroName != "spider-gwen" && heroName != "spider-man" && heroName != "star-lord")
		{
			//TRACKING ON ARROWS
			$(".btn._prev").attr("data-metric", $(".btn._prev").attr("data-metric").replace(/-/g, " "));
			$(".btn._next").attr("data-metric", $(".btn._next").attr("data-metric").replace(/-/g, " "));
			// TRACKING ON BACK BUTTON
			$("#back-to-heroes-link").attr("data-metric", $(".btn._next").attr("data-metric").replace(/-/g, " "));
		}
		if (heroName == "ms marvel")
			heroName = "ms. marvel";
		
		//TRACKING IN SUBNAV
		$(".subNavList a").each(function(i, elem)
		{
			var linkHeroName = $(elem).attr("id");
			if (linkHeroName != "spider-gwen" && linkHeroName != "spider-man" && linkHeroName != "star-lord")
			{
				linkHeroName = linkHeroName.replace(/-/g, " ");
			}
			if (linkHeroName == "ms marvel")
				linkHeroName = "ms. marvel";
			$(elem).attr("data-metric", "{ eVars: { 8: 'bio:" + heroName + ":" + linkHeroName + "' }, events: [11] }");
		});
	}
	else 
	{
		//TRACKING IN SUBNAV
		$(".subNavList a").each(function(i, elem)
		{
			var heroName = $(elem).attr("id");
			if (heroName != "spider-gwen" && heroName != "spider-man" && heroName != "star-lord")
			{
				heroName = heroName.replace(/-/g, " ");
			}
			if (heroName == "ms marvel")
				heroName = "ms. marvel";
			$(elem).attr("data-metric", "{ eVars: { 8: '" + self.trackingName + ":" + heroName + "' }, events: [11] }");
		});
	}

	if ($("body").attr("id") == "page-hero-detail") {
		this.pageNavigation();
		this.heroDetailAsset();

		// HACK: Need a smarter way to detect directory level. This is a quick fix.
		_assetPath = "../../assets/";
	}
	this.subNavLineBreak();

	var self = this;

	if ($("body").attr("id") == "page-hero-detail") {
		if (!window.matchMedia("(min-width: 300px) and (max-width: 767px)").matches) this.loadCheckAssets = $(".hero-graphic img");
	}
	if (this.loadCheckAssets) {
		for (var i = 0; i < this.loadCheckAssets.length; i++) {
			var asset = this.loadCheckAssets[i];
			if (asset.complete) {
				self.loadCheckAssetsLoaded++;
				self.detailPageLoadCheck();
			} else {
				$(asset).on("load", function() {
					self.loadCheckAssetsLoaded++;
					self.detailPageLoadCheck();
				});
			}
		}
	}
};

HeroesPage.prototype.heroDetailAsset = function() {
	if (window.matchMedia("(min-width: 300px) and (max-width: 767px)").matches) {
		$(".hero-graphic .hero-mobile").attr("src", $(".hero-graphic .hero-mobile").attr("data-src"));
	} else {
		$(".hero-graphic .hero-desktop").attr("src", $(".hero-graphic .hero-desktop").attr("data-src"));
	}
};

HeroesPage.prototype.detailPageLoadCheck = function() {
	if (this.loadCheckAssetsLoaded == this.loadCheckAssets.length) {
		if ($("body").attr("id") == "page-hero-detail") {
			// 		// $(".hero-desktop").addClass("in-view");
			// 		// $(".hero-mobile").addClass("in-view");
			$(".hero-wrapper").addClass("in-view");
		}
	}
};

HeroesPage.prototype.winLoaded = function() {
	// console.log("loaded")
	// setTimeout(this.detailPageLoadCheck, 500);
	if (window.matchMedia("(min-width: 300px) and (max-width: 767px)").matches) {
		$(".hero-wrapper").addClass("in-view");
	}
};

HeroesPage.prototype.resize = function() {
	this.subNavLineBreak();

	this.heroDetailAsset();
};

_page = new HeroesPage();

// subNav navigation
// ============================================
HeroesPage.prototype.pageNavigation = function() {
	// get the hero on this page
	var prevHero;
	var nextHero;
	var hero = $("#char-wrap").attr("data-hero-pg");
	// console.log(hero);
	// match hero of page to sNav
	var sNav = $("li[data-hero='" + hero + "']");
	var sNavList = $("li[data-hero]");
	// gets length of nav list, -1 to match index value
	var sNavListLength = sNavList.length - 1;
	// add active Class to sub-nav hex that matches hero page
	sNav.addClass("active");
	// get the sibling to the left and right of active hero but
	// first hero sub nav list
	if (sNav[0].previousElementSibling == null) {
		// alert("First one");
		prevHero = sNavList[sNavListLength].dataset.hero;
		nextHero = sNav[0].nextElementSibling.dataset.hero;
		// updates href link of anchor tag so user can navigate
		$(".btn._prev").attr("href", "../" + prevHero);
		$(".btn._next").attr("href", "../" + nextHero);
	}
	// last hero sub nav list
	else if (sNav[0].nextElementSibling == null) {
		// alert("Last One");
		prevHero = sNav[0].previousElementSibling.dataset.hero;
		nextHero = sNavList[0].dataset.hero;
		// updates href link of anchor tag so user can navigate
		$(".btn._prev").attr("href", "../" + prevHero);
		$(".btn._next").attr("href", "../" + nextHero);
	}
	// in between
	else {
		prevHero = sNav[0].previousElementSibling.dataset.hero;
		nextHero = sNav[0].nextElementSibling.dataset.hero;
		// updates href link of anchor tag so user can navigate
		$(".btn._prev").attr("href", "../" + prevHero);
		$(".btn._next").attr("href", "../" + nextHero);
	}
};

// shifts the vertical spacing between the hex shapes
HeroesPage.prototype.subNavLineBreak = function() {
	var polyBox = $(".thumb-container");
	var getButtons = polyBox.toArray();

	// console.log(getButtons);

	// get the top position of the first poly box
	var topOfFirstPoly = getButtons[0].offsetTop;

	var i = 0;
	getButtons.forEach(element => {
		i;
		// compares if the top of the polygon matches that of the first, if not then a fix is addef for items in second row
		if (getButtons[i].offsetTop != topOfFirstPoly) {
			// console.log(element);
			element.classList.add("push");
			element.classList.add("up");
			// console.log(element);
		} else {
			element.classList.remove("up");
		}
		i++;
	});
};

// Some element loading or not loading in time is causing the HeroesEvolveCharacters to not update
// when they need to. So hacked this solution in for now.
// window.addEventListener(
// 	"load",
// 	function() {
// 		setTimeout(function() {
// 			$("#HeroesEvolveCharacters")
// 				.data("animation")
// 				.resizeCanvas();
// 		}, 0);
// 	},
// 	false
// );

window.addEventListener(
	"load",
	function() {
		// checks and fires only on the heroes-landing page not detail pages causesing error
		if ($("body").attr("id") == "page-heroes-landing") {
			setTimeout(function() {
				$("#HeroesEvolveCharacters")
					.data("animation")
					.resizeCanvas();
			}, 0);
		}
	},
	false
);

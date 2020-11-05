var JuniorIntroPage = function () {
	this.trackingName = "bjj intro";
	this.charGallery;
	this.combatGallery;
}

JuniorIntroPage.prototype.docReady = function () {
	this.charGallery = new Gallery({
		gallery: $("#cast .gallery"),
		text: $("#cast .info-wrapper"),
		arrowLeft: $("#cast .arrow-wrapper#left"),
		arrowRight: $("#cast .arrow-wrapper#right"),
		equalSlideH: true
	});

	// this.charGallery.elem[0].addEventListener("slideChange", function() {
	// 	for (var i = 0; i < WobblerFrame.all.length; i++) {
	// 		WobblerFrame.all[i].onResize.call(WobblerFrame.all[i]);
	// 	}
	// });

	this.combatGallery = new Gallery({
		gallery: $("#combat .gallery"),
		text: $("#combat .info-wrapper"),
		"arrowLeft": $("#combat .arrow-wrapper#left"),
		"arrowRight": $("#combat .arrow-wrapper#right"),
		showNextSlides: true
	});

	// this.combatGallery.elem[0].addEventListener("slideChange", function() {
	// 	for (var i = 0; i < WobblerFrame.all.length; i++) {
	// 		WobblerFrame.all[i].onResize.call(WobblerFrame.all[i]);
	// 	}
	// });
	
	setTimeout(function () {
		$('body').addClass('wobblers-ready');
	}, 1000);

	$(".squishy-letters").each(function (i, hdr) {
		var squishy = new SquishyLetters({
			elem: hdr
		});
	});
};

JuniorIntroPage.prototype.winLoaded = function () {

	addHeroBGVideo();
};

JuniorIntroPage.prototype.resize = function () {};

_page = new JuniorIntroPage();
var BowserStoryPage = function () {
	this.trackingName = "bis story";
	this.heroVideo;
	this.charGallery;
	this.blorbAnim;
}

BowserStoryPage.prototype.docReady = function () {
	var self = this;

	this.charGallery = new Gallery({
		gallery: $("#character-section .gallery"),
		text: $("#character-section .info-wrapper"),
		arrowLeft: $("#character-section .arrow-wrapper#left"),
		arrowRight: $("#character-section .arrow-wrapper#right")
	});

	// this.charGallery.elem[0].addEventListener("slideChange", function() {
	// This may have been added before we had the resize sensor? It breaks the info wrapper.
	// for (var i = 0; i < WobblerFrame.all.length; i++) {
	// 	WobblerFrame.all[i].onResize.call(WobblerFrame.all[i]);
	// }
	// });

	$(".squishy-letters").each(function (i, hdr) {
		var squishy = new SquishyLetters({
			elem: hdr
		});
	});

	this.blorbAnim = new CanvasAnimation({
		"animClass": AnimBlorbs,
		"exportRootName": "blorb",
		"canvas": $("#blorb-canvas")[0],
		"wrapper": $("#blorbs-section .canvas-wrapper"),
		"scaleToWidth": true
	});
	// LISTEN FOR CANVAS LOADED
	$("#blorbs-section .canvas-wrapper")[0].addEventListener("loaded", function () {
		self.blorbAnim.resizeCanvas();
		if ($("#blorbs-section .canvas-wrapper").hasClass("in-view") && !$("#blorbs-section .canvas-wrapper").hasClass("playing")) {
			self.blorbAnim.startTickerListen();
			self.blorbAnim.exportRoot.play();
			$("#blorbs-section .canvas-wrapper").addClass("playing");
		}
	});
};

BowserStoryPage.prototype.winLoaded = function () {
	addHeroBGVideo();
};

BowserStoryPage.prototype.resize = function () {
	if ($("#blorbs-section .canvas-wrapper").hasClass("loaded"))
		this.blorbAnim.resizeCanvas();
}

BowserStoryPage.prototype.scroll = function () {
	var self = this;

	if ($("#blorbs-section .canvas-wrapper").hasClass("loaded") && $("#blorbs-section .canvas-wrapper").hasClass("in-view") && !$("#blorbs-section .canvas-wrapper").hasClass("playing")) {
		self.blorbAnim.startTickerListen();
		self.blorbAnim.exportRoot.play();
		$("#blorbs-section .canvas-wrapper").addClass("playing");
	}
}

BowserStoryPage.prototype.stopBlorbTicker = function () {
	console.log("blorb stop ticker")
	this.blorbAnim.stopTickerListen();
}

_page = new BowserStoryPage();
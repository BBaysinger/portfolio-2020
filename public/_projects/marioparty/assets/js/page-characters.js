var CharactersPage = function() {

  this.name = 'characters';
  this.trackingName = 'Characters';

  // Call superclass constructor. Assigns instance to window._page.
  Page.call(this);

  this.charGallery;
  this.contentID = "chars";
}

CharactersPage.prototype = Object.create(Page.prototype);
CharactersPage.prototype.constructor = CharactersPage;

CharactersPage.prototype.docReady = function()
{
  var self = this;

  this.charGallery = new Gallery({
    "gallery": $("#char-gallery"),
    "slides": $("#char-gallery .slides"), // OPTIONAL, IF NOT INSIDE GALLERY DIV FOR SOME REASON
    "arrowLeft": $("#char-gallery #left.arrow"), // OPTIONAL, IF NOT INSIDE GALLERY DIV FOR SOME REASON
    "arrowRight": $("#char-gallery #right.arrow") // OPTIONAL, IF NOT INSIDE GALLERY DIV FOR SOME REASON
  });

  $("#thumbs .thumb-wrapper").on("click", function(e){
    self.handleThumbClick(this)
  });

  $("#gallery-modal > .bg, #gallery-modal .close").on("click", this.closeGallery.bind(this));
}

CharactersPage.prototype.winLoaded = function()
{
}

CharactersPage.prototype.resize = function()
{
  // this.scrollableModalCheck();
}

CharactersPage.prototype.handleThumbClick = function(elem)
{
  _tracking.trackLink({ eVars: { 8: 'characters:' + elem.id }, events: [11] });
  
  this.charGallery.goToSlide(elem.id);
  $("#gallery-modal").addClass("show");
  // this.scrollableModalCheck();
}

CharactersPage.prototype.closeGallery = function(e) 
{
  $("#gallery-modal").removeClass("show");
  $("#gallery-modal .slide.active").removeClass("active");
  $("#gallery-modal .slide.go-center").removeClass("go-center");
}

CharactersPage.prototype.scrollableModalCheck = function()
{
	if (!$("#gallery-modal").hasClass("show"))
		return;

  // console.log("scrollableCheck ", $("#gallery-modal").find("#" + this.contentID)[0])
  
  // ADJUST FOR TALL CHARS
  var tallestChar = 0;
  $("#char-gallery .slide .char img").each(function(i, elem)
  {
    $(elem).closest(".slide").css({"display":"block"});
    if (tallestChar < $(elem).height())
      tallestChar = $(elem).height()
    $(elem).closest(".slide").css({"display":""});
  });
  var modalY = $("#gallery-modal > .content").offset().top - window.scrollY;
  var extraCharAtTop = tallestChar - modalY;
  if (window.matchMedia("(max-width: 767px)").matches && (tallestChar - modalY > 0))
  {
    var gallH = $("#gallery-modal > .content").height();
    $("#gallery-modal > .content").css({"padding-top": extraCharAtTop + "px"});
  }
  else 
  {
    $("#gallery-modal > .content").css({"padding-top": ""});
  }

	// SCROLLABLE
	// if ($("#gallery-modal").find("#" + this.contentID).hasClass("scrollable"))
	// {
	// 	var btnH = parseInt($("#gallery-modal").find("#" + this.contentID + " #btn-close").height());
	// 	var contentH = parseInt($("#gallery-modal").find("#" + this.contentID).outerHeight());
	// 	var totalH = btnH + contentH;
		
	// 	// console.log(contentH, window.innerHeight);

	// 	if (totalH > window.innerHeight)
	// 	{
	// 		console.log("scrolling modal")
	// 		$("#gallery-modal").find("#" + this.contentID).addClass("scrolling");
	// 		$("#gallery-modal").addClass("scrolling")
	// 		if (this.contentID != "quiz-modal")	
	// 			$("#gallery-modal").css("padding-top", btnH * .3);

	// 		// $("html, body").css({"height": contentH + 100 + "px"});
	// 		// $("#page-wrapper").css({"height": contentH + 100 + "px", "overflow": "hidden"});
	// 		$("#page-wrapper").addClass("scrolling-modal-open");
	// 		$("#page-wrapper").css({"transform": "translateY(-" + this.scrollY + "px)"});
	// 		// $(window).scrollTop(0); // ios nav triggers resize
	// 		// if ($(".modal").hasClass("scrolling"))
	// 		$(window).scrollTop(0);
	// 		$("html, body").removeClass("no-scroll");
	// 	}
	// 	else
	// 	{
	// 		console.log("not scrolling modal");
	// 		$("#gallery-modal").find("#" + this.contentID).removeClass("scrolling");
	// 		$("#gallery-modal").removeClass("scrolling").css("padding-top", "");

	// 		// DESKTOP - STOP BG SCROLL
	// 		$("html, body").addClass("no-scroll");

	// 		// $("html, body").css({"height": "auto"});
	// 		// $("#page-wrapper").css({"height": "auto", "overflow": "visible"});
	// 		$("#page-wrapper").removeClass("scrolling-modal-open");
	// 		$("#page-wrapper").css({"transform": ""});
	// 	}
	// }
	// else
	// {
	// 	$("html, body").addClass("no-scroll");
	// }
}

new CharactersPage();

var ToadsRecPage = function() {

  this.name = 'toads-rec';
  this.trackingName = 'Toad’s Rec Room';

  // Call superclass constructor. Assigns instance to window._page.
  Page.call(this);

  this.bananaAnim;
}

ToadsRecPage.prototype = Object.create(Page.prototype);
ToadsRecPage.prototype.constructor = ToadsRecPage;

ToadsRecPage.prototype.docReady = function() {

    // ADD TOADS VIDEO
    var video = $('<video loop autoplay playsinline muted />');
    $(video).addClass("page-video").append("<source src='" + _assetPath + "video/toad-hero.mp4' type='video/mp4' poster='" + _assetPath + "img/rec-room/vid-thumb.jpg'>");
    $("#toads-vid").append(video);
    $(video).on('playing', function() {
        $(this).addClass("playing");
    });
}

ToadsRecPage.prototype.winLoaded = function() {
  var self = this;

	this.bananaAnim = new CanvasAnimation({
		"animClass": Banana,
		"exportRootName": "nanaSplit",
		"canvas": $("#banana .canvas-wrapper canvas")[0],
		"wrapper": $("#banana .canvas-wrapper"),
		"anim_container": $("#banana #banana-wrapper")[0],
		"scaleToWidth": true
	});
	$(this.bananaAnim.wrapper)[0].addEventListener("loaded", function()
	{
    self.bananaAnim.resizeCanvas();
    if($("#banana-wrapper").hasClass("in-view") && !$("#banana .canvas-wrapper").hasClass("playing"))
    {
      self.bananaAnim.startTickerListen();
      self.bananaAnim.exportRoot.play();
      $("#banana .canvas-wrapper").addClass("playing");
    }
  });

}

ToadsRecPage.prototype.resize = function() {

  if (this.bananaAnim)
    this.bananaAnim.resizeCanvas();

}

ToadsRecPage.prototype.scroll = function() 
{
  var self = this;
  // STOP/START LOOP OF BANANA ANIMATION
  this.canvasPause();
  // if($("#banana .canvas-wrapper").hasClass("loaded"))
  // {
  //   if ($("#banana-wrapper").hasClass("in-view") && !$("#banana .canvas-wrapper").hasClass("playing"))
  //   {
  //     self.bananaAnim.startTickerListen();
  //     self.bananaAnim.exportRoot.play();
  //     $("#banana .canvas-wrapper").addClass("playing");
  //   }
  //   else if (!$("#banana-wrapper").hasClass("in-view") && $("#banana .canvas-wrapper").hasClass("playing"))
  //   {
  //     self.bananaAnim.stopTickerListen();
  //     self.bananaAnim.exportRoot.stop();
  //     $("#banana .canvas-wrapper").removeClass("playing");
  //   }
  // }
}

ToadsRecPage.prototype.canvasPause = function() 
{
  var self = this;
  if($("#banana .canvas-wrapper").hasClass("loaded"))
  {
    if ($("#banana-wrapper").hasClass("in-view") && !$("#banana .canvas-wrapper").hasClass("playing"))
    {
      self.bananaAnim.startTickerListen();
      self.bananaAnim.exportRoot.play();
      $("#banana .canvas-wrapper").addClass("playing");
    }
    else if (!$("#banana-wrapper").hasClass("in-view") && $("#banana .canvas-wrapper").hasClass("playing"))
    {
      self.bananaAnim.stopTickerListen();
      self.bananaAnim.exportRoot.stop();
      $("#banana .canvas-wrapper").removeClass("playing");
    }
  }
}

new ToadsRecPage();

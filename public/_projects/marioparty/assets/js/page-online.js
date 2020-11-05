var OnlinePage = function() {

  this.name = 'online';
  this.trackingName = 'Play Online';

  this.shuffleGamesInterval;
  this.curGameSet = 0;

  this.heroAnim;

  // Call superclass constructor. Assigns instance to window._page.
  Page.call(this);
}

OnlinePage.prototype = Object.create(Page.prototype);
OnlinePage.prototype.constructor = OnlinePage;

OnlinePage.prototype.docReady = function() 
{
    // ADD HERO VIDEO
    var video = $('<video loop autoplay playsinline muted poster="' + _assetPath + 'img/online/hero-vid-poster.jpg" />');
    $(video).addClass("page-video").append("<source src='" + _assetPath + "video/online-hero.mp4' type='video/mp4' >");
    $("#hero .video .screen").append(video);
    $(video).on('playing', function() {
        $(this).addClass("playing");
    });

  var self = this;
	this.heroAnim = new CanvasAnimation({
		"animClass": OnlineBg,
		"exportRootName": "globe",
		"canvas": $("#hero-anim-wrapper .canvas-wrapper canvas")[0],
		"wrapper": $("#hero-anim-wrapper .canvas-wrapper"),
		"anim_container": $("#hero-anim-wrapper")[0],
		"scaleToWidth": true
  });
	
  self.heroAnim.resizeCanvas();

}

OnlinePage.prototype.winLoaded = function() 
{
  var self = this;
  this.shuffleGamesInterval = setInterval(self.shuffleGames.bind(this), 3000);

  $("#hero").addClass("buildin");

  _ivc.viewCheck();


  if($("#hero-anim-wrapper").hasClass("in-view") && !$("#hero-anim-wrapper .canvas-wrapper").hasClass("playing"))
  {
    self.heroAnim.startTickerListen();
    self.heroAnim.exportRoot.play();
    $("#hero-anim-wrapper .canvas-wrapper").addClass("playing");
  }



}

OnlinePage.prototype.resize = function() 
{
  if (this.heroAnim)
    this.heroAnim.resizeCanvas();
}

OnlinePage.prototype.scroll = function()
{
  var self = this;
  // STOP/START LOOP OF HERO ANIMATION
  if($("#hero-anim-wrapper .canvas-wrapper").hasClass("loaded"))
  {
    if ($("#hero-anim-wrapper").hasClass("in-view") && !$("#hero-anim-wrapper .canvas-wrapper").hasClass("playing"))
    {
      self.heroAnim.startTickerListen();
      self.heroAnim.exportRoot.play();
      $("#hero-anim-wrapper .canvas-wrapper").addClass("playing");
    }
    else if (!$("#hero-anim-wrapper").hasClass("in-view") && $("#hero-anim-wrapper .canvas-wrapper").hasClass("playing"))
    {
      self.heroAnim.stopTickerListen();
      self.heroAnim.exportRoot.stop();
      $("#hero-anim-wrapper .canvas-wrapper").removeClass("playing");
    }
  }
}

OnlinePage.prototype.shuffleGames = function() 
{
  var self = this;

  this.curGameSet = $("#games .screen-wrapper:nth-child(1) .screen.show").index();
  var nextGameSet = (this.curGameSet < $("#games .screen-wrapper:nth-child(1) .screen").length-1) ? (this.curGameSet+1) : 0;
  
  $("#games .screen-wrapper").each(function(i, elem) 
  {
    (function(i, elem) {
      setTimeout(function(){
          $(elem).find(".screen:eq(" + self.curGameSet + ")").removeClass("show");
          $(elem).find(".screen:eq(" + nextGameSet + ")").addClass("show");
      }, i*200);
    }(i, elem));
  });

}

new OnlinePage();

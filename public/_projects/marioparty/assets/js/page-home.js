var HomePage = function() {

    this.name = 'home';
    this.trackingName = 'Home';

    // Call superclass constructor. Assigns instance to window._page.
    Page.call(this);

    this.heroAssets;
    this.heroAssetsLoaded = 0;
    this.heroAssetsReady = false;

    this.heroAnimFinished = false;

    this.heroVidReady = false;
    this.heroVidTimeout;

    this.charTimeout;
    this.charTRCount = 0;
    this.charBRCount = 0;
    this.charBLCount = 0;
    this.charTLCount = 0;
    this.charPoppingIn = false;

    this.onlineAnim;    
}

HomePage.prototype = Object.create(Page.prototype);
HomePage.prototype.constructor = HomePage;

HomePage.prototype.docReady = function()
{
    var self = this;

    $("#quotes #wrapper .accolade:gt(0)").hide();

    // ASSETS WE WANT TO CHECK FOR LOAD
	this.heroAssets = $("#hero img");

	for (var i = 0; i < this.heroAssets.length; i++)
	{
		var asset = this.heroAssets[i];
		if (asset.complete)
		{
			this.heroAssetsLoaded++;
			this.heroAssetsLoadCheck();
		}
		else
		{
			$(asset).on("load", function()
			{
				self.heroAssetsLoaded++;
				self.heroAssetsLoadCheck();
			})
		}
    }

    // ADD HERO VIDEO
    var video = $('<video id="hero-video" loop autoplay playsinline muted />');
    $(video).addClass("page-video").append("<source src='" + _assetPath + "video/home-hero-bg.mp4' type='video/mp4' poster='" + _assetPath + "img/home/hero-bg.jpg'>");
    $("#hero .vid-wrapper").append(video);
    $(video).on('playing', function() {
        $(this).addClass("playing");
    });
    $(video).on('canplay', function()
    {
        self.heroVidReady = true;
        self.heroAssetsLoadCheck();
    });

    this.heroVidTimeout = setTimeout(self.handleHeroVidTimeout.bind(this), 7000);

    //VIDEO THUMB 
    $("#vid-thumb, #overview .btn").hover( playVideo, pauseVideo );

    function playVideo(e) {  
        // $('video', this).get(0).play(); 
        $('#hero #vid-thumb video').get(0).play(); 
    }
    
    function pauseVideo(e) {
        // $('video', this).get(0).pause(); 
        $('#hero #vid-thumb video').get(0).pause(); 
    }

    // EVENTABLE DROPDOWN
    $('select').selectric({nativeOnMobile: false});

    $('#reminder-select').change(function() {

      var selectedOption = $('#reminder-select option:selected').val();

      _tracking.trackLink({ eVars: { 39: 'home:add to calender: ' + $('#reminder-select option:selected').html().toLowerCase()}, events: [53] });

      $('#selectric-calendar-reminder .label').html($('#reminder-select option[value="default"]').html());

      var links = {
        "gmail": "https://add.eventable.com/generate/5a393fcd8d3e700042476ad2/?opt_in=false&events[]=5b566df62ee2910111393e15&alias=%%emailaddr%%&cal_type=gcal&email=true",
        "googleICal": "https://add.eventable.com/generate/5a393fcd8d3e700042476ad2/?opt_in=false&events[]=5b566df62ee2910111393e15&alias=%%emailaddr%%&cal_type=gcal&email=true",
        "appleICal": "https://add.eventable.com/generate/5a393fcd8d3e700042476ad2/?opt_in=false&events[]=5b566df62ee2910111393e15&alias=%%emailaddr%%&cal_type=apple&email=true",
        "outlook": "https://add.eventable.com/generate/5a393fcd8d3e700042476ad2/?opt_in=false&events%5b%5d=5b566df62ee2910111393e15&alias=%25%25emailaddr%25%25&cal_type=msoffice&email=true",
      }

    //   console.info('Add to calendar: ', selectedOption);

      if (!links[selectedOption]) {
        throw new Error(selectedOption + ' reminder link not available.');
      }

      window.open(links[selectedOption], "_blank");

    });


}

HomePage.prototype.winLoaded = function()
{
    var self = this;


	if (window.location.hash === '#watch-trailer') 
	{
        _modal.open("trailer");
	}

    // IOS 11.4 VIDEO PAUSE ON SLEEP FIX
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(visibilityChange, function()
    {
        if ($("#hero-video")[0].paused)
        {
            $("#hero-video")[0].play();
        }
    });

    // REST OF HERO ANIMS
    $("#hero #banner-wrapper").addClass("build-in");

    // ADD ONLINE BG ANIM
	this.onlineAnim = new CanvasAnimation({
		"animClass": OnlineBg,
		"exportRootName": "globe",
		"canvas": $("#online-blade #anim-wrapper .canvas-wrapper canvas")[0],
		"wrapper": $("#online-blade #anim-wrapper .canvas-wrapper"),
		"anim_container": $("#online-blade #anim-wrapper")[0],
		"scaleToWidth": true
    });
	
    self.onlineAnim.resizeCanvas();
    if($("#online-blade #anim-wrapper").hasClass("in-view") && !$("#online-blade #anim-wrapper .canvas-wrapper").hasClass("playing"))
    {
        self.onlineAnim.startTickerListen();
        self.onlineAnim.exportRoot.play();
        $("#online-blade #anim-wrapper .canvas-wrapper").addClass("playing");
    }

    this.animPauseCheck();
}

HomePage.prototype.heroAssetsLoadCheck = function()
{
    var self = this;
	if (this.heroAssetsLoaded == this.heroAssets.length && this.heroVidReady)
	{
        $("#hero").addClass("build-in");

        clearTimeout(this.heroVidTimeout);

        $("#hero #mario, #hero #peach-luigi, #hero #raft, #hero #yellow-con, #hero #red-con, #hero #blue-con, #hero #grey-con").one("animationend", function()
        {
            $(this).addClass("idle");

            // START REST OF PAGE ANIMATIONS
            self.handleEndOfHeroAnim();
        });
	}
}

HomePage.prototype.handleHeroVidTimeout = function() 
{
    console.log("handleHeroVidTimeout");
    this.heroVidReady = true;
    this.heroAssetsLoadCheck();
}

HomePage.prototype.handleEndOfHeroAnim = function() 
{
    if (this.heroAnimFinished)
        return;

    this.heroAnimFinished = true;
        
    console.log("handleEndOfHeroAnim")
    // ADD MINIGAMES VIDEO
    var minivideo = $('<video id="bg-vid" loop autoplay playsinline muted />');
    $(minivideo).addClass("page-video").append("<source src='" + _assetPath + "video/minigames-bg.mp4' type='video/mp4'>");
    $("#minigames-blade .vid-wrapper").append(minivideo);
    $(minivideo).on('playing', function() {
        $(this).addClass("playing");
        $("#minigames-blade #bg").addClass("playing");
    });
    
    // START CHARACTERS ANIM
    this.charPopInOut();

    // BUY BLADE STARS
    $("#buy-blade .stars").addClass("animation-ready");

	// QUOTE SLIDER
	this.quoteSlider();
}

HomePage.prototype.scroll = function()
{
    if (!$("#global-modal.takeover-content").hasClass("open"))
        this.animPauseCheck();
}

HomePage.prototype.animPauseCheck = function()
{
    console.log("animpausecheck")
    var self = this;

    if ($("#hero").hasClass("in-view") && $("#hero .idle").css("animation-play-state") != "running")
        $("#hero .idle").css({"animation-play-state": "running"});
    else if (!$("#hero").hasClass("in-view") && $("#hero .idle").css("animation-play-state") == "running")
        $("#hero .idle").css({"animation-play-state": "paused"});

    if ($("#chars-blade").hasClass("in-view") && $("#chars-blade .char").css("animation-play-state") != "running")
        $("#chars-blade .char").css({"animation-play-state": "running"});
    else if (!$("#chars-blade").hasClass("in-view") && $("#chars-blade .char").css("animation-play-state") == "running")
        $("#chars-blade .char").css({"animation-play-state": "paused"});

    // STOP/START LOOP OF ONLINE ANIMATION
    if (this.onlineAnim && this.onlineAnim.wrapper.hasClass("loaded"))
    {
        if($("#online-blade #anim-wrapper .canvas-wrapper").hasClass("loaded"))
        {
            if ($("#online-blade #anim-wrapper").hasClass("in-view") && !$("#online-blade #anim-wrapper .canvas-wrapper").hasClass("playing"))
            {
                self.onlineAnim.startTickerListen();
                self.onlineAnim.exportRoot.play();
                $("#online-blade #anim-wrapper .canvas-wrapper").addClass("playing");
            }
            else if (!$("#online-blade #anim-wrapper").hasClass("in-view") && $("#online-blade #anim-wrapper .canvas-wrapper").hasClass("playing"))
            {
                self.onlineAnim.stopTickerListen();
                self.onlineAnim.exportRoot.stop();
                $("#online-blade #anim-wrapper .canvas-wrapper").removeClass("playing");
            }
        }
    }
}

HomePage.prototype.resize = function()
{
    var isIE = /*@cc_on!@*/false || !!document.documentMode, // Internet Explorer 6-11
    isEdge = !isIE && !!window.StyleMedia; // Edge 20+
    
    // Check if Internet Explorer 6-11 OR Edge 20+
    if(isIE || isEdge) 
    {
        $("#hero #mario, #hero #peach-luigi, #hero #raft, #hero #yellow-con, #hero #red-con, #hero #blue-con, #hero #grey-con").removeClass("idle");
        setTimeout(function()
        {
            $("#hero #mario, #hero #peach-luigi, #hero #raft, #hero #yellow-con, #hero #red-con, #hero #blue-con, #hero #grey-con").addClass("idle");
        }, 1000);
    }


    if (this.onlineAnim)
        this.onlineAnim.resizeCanvas();
}

HomePage.prototype.canvasPause = function(pause)
{
    console.log("canvas pause ", pause)
    var self = this;
    if (this.onlineAnim && this.onlineAnim.wrapper.hasClass("loaded"))
    {
        if (!pause)
        {
            self.onlineAnim.startTickerListen();
            self.onlineAnim.exportRoot.play();
            $("#online-blade #anim-wrapper .canvas-wrapper").addClass("playing");
        }
        else
        {
            self.onlineAnim.stopTickerListen();
            self.onlineAnim.exportRoot.stop();
            $("#online-blade #anim-wrapper .canvas-wrapper").removeClass("playing");
        }
    }
}

HomePage.prototype.charPopInOut = function()
{
    var self = this;

    this.charPoppingIn = $("#chars-blade .tr:eq(" + this.charTRCount + ")").hasClass("tr-char-pop-out");

    var randDelay = Math.random()*.2;
    $("#chars-blade .tr:eq(" + this.charTRCount + ")").css({"transition-delay":randDelay+"s"});
    $("#chars-blade .tr:eq(" + this.charTRCount + ")").toggleClass("tr-char-pop-out");
    if ($("#chars-blade .tr:eq(" + this.charTRCount + ")").hasClass("tr-char-pop-out"))
    {
        this.charTRCount++;
        if (this.charTRCount > $("#chars-blade .tr").length-1)
            this.charTRCount = 0;
    }

    randDelay = Math.random()*.2;
    $("#chars-blade .br:eq(" + this.charBRCount + ")").css({"transition-delay":randDelay+"s"});
    $("#chars-blade .br:eq(" + this.charBRCount + ")").toggleClass("br-char-pop-out");
    if ($("#chars-blade .br:eq(" + this.charBRCount + ")").hasClass("br-char-pop-out"))
    {
        this.charBRCount++;
        if (this.charBRCount > $("#chars-blade .br").length-1)
            this.charBRCount = 0;
    }

    randDelay = Math.random()*.2;
    $("#chars-blade .bl:eq(" + this.charBLCount + ")").css({"transition-delay":randDelay+"s"});
    $("#chars-blade .bl:eq(" + this.charBLCount + ")").toggleClass("bl-char-pop-out");
    if ($("#chars-blade .bl:eq(" + this.charBLCount + ")").hasClass("bl-char-pop-out"))
    {
        this.charBLCount++;
        if (this.charBLCount > $("#chars-blade .bl").length-1)
            this.charBLCount = 0;
    }

    randDelay = Math.random()*.2;
    $("#chars-blade .tl:eq(" + this.charTLCount + ")").css({"transition-delay":randDelay+"s"});
    $("#chars-blade .tl:eq(" + this.charTLCount + ")").toggleClass("tl-char-pop-out");
    if ($("#chars-blade .tl:eq(" + this.charTLCount + ")").hasClass("tl-char-pop-out"))
    {
        this.charTLCount++;
        if (this.charTLCount > $("#chars-blade .tl").length-1)
            this.charTLCount = 0;
    }

    // CHARACTERS POP/IN OUT ANIMATION
    var charDelay = 500;
    if (this.charPoppingIn)
        charDelay = 2100;

    this.charTimeout = setTimeout(
        function()
        {
            self.charPopInOut();
        }, charDelay
    )
}

HomePage.prototype.quoteSlider = function()
{
    setInterval(function() {
        $('#quotes #wrapper .accolade:first-child')
            .fadeOut()
            .next()
            .fadeIn()
            .end()
            .appendTo('#quotes #wrapper');
    }, 5000);
}

new HomePage(); // This happens in superclass now.

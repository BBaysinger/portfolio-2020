var BowserGameplayPage = function () 
{
    this.trackingName = "bis gameplay";
    this.totalAmoeba = 23;
    this.amoebasArr = [];
    this.parallax;
}

BowserGameplayPage.prototype.docReady = function () 
{
    var self = this;
    for (var i = 0; i < this.totalAmoeba; i++)
    {
       // CLONE AMOEBA CANVAS WRAPPER
       $("#amoeba-wrapper-template").clone().appendTo("#hero #amoebas").attr("id", "amoeba" + i);
       $("#amoeba-wrapper-template").clone().appendTo("#outside #amoebas2").attr("id", "amoeba" + i);

        // ADD CANVAS
        var amoebaAnimTop;
        var amoebaWrapperTop = $("#hero .amoeba-canvas-wrapper").last();
        amoebaWrapperTop.find("canvas").css({"transform": "rotate(" + Math.abs(Math.random()*360) + "deg)"});

        var amoebaAnimBottom;
        var amoebaWrapperBottom = $("#outside .amoeba-canvas-wrapper").last();
        amoebaWrapperBottom.find("canvas").css({"transform": "rotate(" + Math.abs(Math.random()*360) + "deg)"});

        // LISTEN FOR CANVAS LOADED
        $(amoebaWrapperTop)[0].addEventListener("loaded", function(e)
        {
            setTimeout(function() { 
                self.amoebaManagePlay();
            }, 100);
        });
        $(amoebaWrapperBottom)[0].addEventListener("loaded", function(e)
        {
            setTimeout(function() { 
                self.amoebaManagePlay();
            }, 100);
        });
     
        amoebaAnimTop = new CanvasAnimation({
            "animClass": Amoeba,
            "exportRootName": "amoeba",
            "canvas": amoebaWrapperTop.find("canvas")[0],
            "wrapper": amoebaWrapperTop,
            "scaleToWidth": true
        });
     
        amoebaAnimBottom = new CanvasAnimation({
            "animClass": Amoeba,
            "exportRootName": "amoeba",
            "canvas": amoebaWrapperBottom.find("canvas")[0],
            "wrapper": amoebaWrapperBottom,
            "scaleToWidth": true
        });

        this.amoebasArr.push(amoebaAnimTop);
        this.amoebasArr.push(amoebaAnimBottom);
   }

   $("#amoeba-wrapper-template").remove();

	$(".squishy-letters").each(function(i, hdr)
	{
		var squishy = new SquishyLetters({elem: hdr});
    });
    
    // PARALLAX
    // $("#hero #amoebas").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "5").attr("data-offset", ".5");
    $("#inside #under-guts #control").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "5").attr("data-offset", ".5");
    $("#inside #under-guts #action").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "3").attr("data-offset", ".5");
    // $("#inside #guts").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "5").attr("data-offset", ".5");
    // $("#outside #amoebas2").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "5").attr("data-offset", ".5");
    // $("#outside .side-shape").addClass("parallax").attr("data-horizon", ".5").attr("data-distance", "5").attr("data-offset", ".5");

    this.parallax = new Parallax();
    this.parallax.init();
}

BowserGameplayPage.prototype.winLoaded = function()
{
    var self = this;
    viewCheck();
    this.amoebaManagePlay();
    this.positionUnderGutsContent();  
    this.amoebaRandomMovement();
    this.scroll();
}

BowserGameplayPage.prototype.resize = function () 
{
    this.positionUnderGutsContent();

    this.parallax.resize();
}

BowserGameplayPage.prototype.scroll = function() 
{
    this.amoebaManagePlay();

    if (this.parallax)
        this.parallax.scroll();


    var scrollY = $(window).scrollTop();

    // $("#inside #under-guts").css({"top": 0 - scrollY*.4});


    // $("#inside #guts").css({"top": 0 - scrollY*.2});
    // $("#hero #amoebas").css({"top": 0 - scrollY*.2});
    // $("#outside #amoebas2").css({"top": 0 - scrollY*.25});
    // $("#outside .side-shape").css({"top": 0 - scrollY*.2});


}

BowserGameplayPage.prototype.amoebaManagePlay = function()
{
    for (var i = 0; i < this.amoebasArr.length; i++)
    {
        var amoebaCanvas = this.amoebasArr[i];
        amoebaCanvas.resizeCanvas();
        if (amoebaCanvas.wrapper.hasClass("loaded") && amoebaCanvas.wrapper.hasClass("in-view"))
        {
            amoebaCanvas.startTickerListen();
            if (!amoebaCanvas.wrapper.hasClass("playing"))
            {
                amoebaCanvas.exportRoot.play();
                amoebaCanvas.wrapper.addClass("playing");
            }
        }
        else if (amoebaCanvas.wrapper.hasClass("loaded") && !amoebaCanvas.wrapper.hasClass("in-view"))
        {
            amoebaCanvas.stopTickerListen();
        }
    }
}

BowserGameplayPage.prototype.amoebaRandomMovement = function() 
{
    for (var i = 0; i < this.amoebasArr.length; i++)
    {
        var amoebaMover = this.amoebasArr[i].wrapper.find(".random-move-wrapper");
        amoebaMover.css({"animation-duration": (Math.random()* (24 - 12) + 12) + "s", "animation-play-state": "running"});
    }
}

BowserGameplayPage.prototype.positionUnderGutsContent = function()
{
    var controlY = $("#guts-content #over-guts #control").position().top;
    var controlH = $("#guts-content #over-guts #control").outerHeight();
    $("#under-guts #control").css({"top": controlY, "height": controlH + "px"});

    var actionY = $("#guts-content #over-guts #action").position().top;
    var actionH = $("#guts-content #over-guts #action").outerHeight();
    $("#under-guts #action").css({"top": actionY, "height": actionH + "px"});

    var amoebasTopH = $("#hero #amoebas").outerHeight();
    var twoScreensH = $("#outside #two-screens").outerHeight();
    // $("#outside #amoebas2").css({"top": (twoScreensH*.5) + "px", "height": amoebasTopH + "px"});
    $("#outside #amoebas2").css({"height": amoebasTopH + "px"});

    $("#under-guts").addClass("show");
}

BowserGameplayPage.prototype.updateParallax = function() 
{
	_parallax.setElementPositions();
};

_page = new BowserGameplayPage();
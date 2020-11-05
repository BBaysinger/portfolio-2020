var BowserCombatPage = function () 
{
	this.trackingName = "bis combat";
}

BowserCombatPage.prototype.docReady = function() 
{
	$("#bowser .button.idle, #bros .button.idle").on("click", this.rainInit.bind(this));
}

BowserCombatPage.prototype.winLoaded = function() 
{
	addHeroBGVideo();
};

BowserCombatPage.prototype.rainInit = function(e) 
{

	$("#rain .item img").css({"display":"none"});
	$("#rain .item").css({"transition":"none", "transform":""}).removeClass("fall");

	var section = $(e.target).closest(".section").attr("id");


	$("#rain .item ." + section).css({"display":"block"});

	setTimeout(function()
	{
		$("#rain .item").each(function(i, elem)
		{
			var x = Math.random() * $("#rain").width();
			$(elem).css({"left": x, "transition":"", "transform":"translateY(" + window.innerHeight*1.2 + "px)"}).addClass("fall");
		});
	}, 100);
};

_page = new BowserCombatPage();
var JuniorCombatPage = function() {
	this.trackingName = "bjj combat";	
};

JuniorCombatPage.prototype.winLoaded = function() 
{
	addHeroBGVideo();

	$(".squishy-letters").each(function(i, hdr)
	{
		var squishy = new SquishyLetters({elem: hdr});
	});

	// quiz.winLoaded();
};

_page = new JuniorCombatPage();

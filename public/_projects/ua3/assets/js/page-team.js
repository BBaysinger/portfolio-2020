var TeamPage = function() {
	this.trackingName = "ultimate team";
	this.navItemId = "ultimate-team";
};

TeamPage.prototype.docReady = function() {

	//TRACKING IN HEROES SUBNAV
	$("#modal-choose-characters .subNavList .profile-btn").each(function(i, elem)
	{
		var linkHeroName = $(elem).attr("id");
		if (linkHeroName != "spider-gwen" && linkHeroName != "spider-man" && linkHeroName != "star-lord")
		{
			linkHeroName = linkHeroName.replace(/-/g, " ");
		}
		if (linkHeroName == "ms marvel")
		linkHeroName = "ms. marvel";
		$(elem).attr("data-metric", "{ eVars: { 8: 'selected hero - " + linkHeroName + "' }, events: [11] }");
	});

};

TeamPage.prototype.resize = function() {
	subNavLineBreak();
};

function subNavLineBreak() {

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

_page = new TeamPage();



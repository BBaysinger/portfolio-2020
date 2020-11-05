var GameplayPage = function () {
	this.navItemId = "gameplay";

	this.trackingName = "story";
}

GameplayPage.prototype.docReady = function()
{
	// ADD VIDEO
	var video = $('<video class="bg-video inline-video view-check reset-view" aria-hidden="true" loop autoplay playsinline muted poster="" />');

	$(video).append("<source src='"+ _assetPath +"video/Gameplay_Marquee.mp4' type='video/mp4'>");

	$("#hero > .vid-wrap").append(video);

	adjustBGVideoSize();

}
GameplayPage.prototype.winLoaded = function () {

}
GameplayPage.prototype.resize = function() {
	
	adjustBGVideoSize();

}

function adjustBGVideoSize() 
{
	// NOT NEEDED FOR THIS EXAMPLE, BUT MAY BE USEFUL DEPENDING ON THE SITUATION
	$(".bg-video").each(function(i, elem){
		var vidWrap = $(elem).parent();
		var vidWrapW = parseInt($(vidWrap).width());
		var vidWrapH = parseInt($(vidWrap).height());
		if (vidWrapH > vidWrapW)
			$(elem).addClass("tall").removeClass("wide");
		else 
			$(elem).addClass("wide").removeClass("tall");
	});
}
_page = new GameplayPage();
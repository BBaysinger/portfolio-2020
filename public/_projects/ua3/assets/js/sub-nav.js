var SubNav = function () {

};

SubNav.prototype.docReady = function () {

	this.$active = $('.thumb-container.active');
	this.$active.css('pointer-events', 'none')

	this.$activeButton = this.$active.find('.character-select-button');

	this.$activeButton[0].addEventListener('loaded', function (e) {
		e.srcElement.cjsAnimation.setIdleFrame('over_idle');
	});

};

var characterSubNav = new SubNav();

document.addEventListener("DOMContentLoaded", function (event) {
	characterSubNav.docReady();
});


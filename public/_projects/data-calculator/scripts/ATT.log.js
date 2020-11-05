ATT.globalVars.log = function() {
	var stack = this.stack = [];
	var debug = this.debug = false;
}
ATT.globalVars.log.debug = (ATT.util.getCookie('attdebug')) ? true : false;
ATT.namespace('log');
if (ATT.globalVars.log.debug) {
	ATT.log = function(s) {  
		if ((jQuery.browser.msie && !!window.console && !!window.console.log) || (jQuery.browser.mozilla && jQuery.browser.version >= 6) || jQuery.browser.webkit) {
			console.log(s);
		} else {
			ATT.globalVars.log.stack.push(s);
		}
	}
} else ATT.log = function(s) { return true;}
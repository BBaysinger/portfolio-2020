//$Revision: 425918 $ , $Date: 2012-05-23 14:38:46 -0700 (Wed, 23 May 2012) $ and $Author: pl8911 $
/*global jslint $ jQuery ATT window*/
/*jslint white: false, nomen: false, regexp: false, eqeqeq:false, bitwise: false*/


/**
 * Created by Pallav Laskar
 * Date: 6/15/11
 * Time: 9:42 AM
 * Title: ATT.util
 */



/**
* ATT utility helper methods
* @property util
* @type {Object}
* @namespace ATT.util
*/
ATT.namespace("util");

/**
* Utility function mixes the properties of objects
* resolving conflicts through overwrites.  The objects
* passed last have the highest priority.
* @method mixin
* @param object {Object} any number of objects
* @return {Object} the modified first object parameter
* @example ATT.util.mixin({}, {test:1}, {test:2}, {test2:2});
*/
ATT.util.mixin = ATT.mixin;

/**
* Utility function adds commas to numbers and 
* strings of numbers
* @method addCommas
* @param v {String|Number}
* @return {String} the modified string
* @example ATT.util.addCommas("999999999.99");
*/
ATT.util.addCommas = (function () {
	var rx = new RegExp('(-?[0-9]+)([0-9]{3})');
	return function (v) {
		if (typeof v === "number") {
			v = v.toString();
		}
		while (rx.test(v)) {
			v = v.replace(rx, '$1,$2');
		}
		return v;
	};
} ());
/**
* Utility function returns current day CCYY-MM-DD format
* @method today
* @return {String} today
* @example ATT.util.today();
*/
ATT.util.today = function () {
	var d = new Date(),
	curr_year = d.getFullYear(),
	curr_month = d.getMonth() + 1,
	curr_date = d.getDate();
	if (curr_month < 10) {
		curr_month = "0" + curr_month;
	}
	if (curr_date < 10) {
		curr_date = "0" + curr_date;
	}
	return curr_year + "-" + curr_month + "-" + curr_date;
};
/**
* Utility function returns new object with mapped values to concatenated property names
* @method flattenObject
* @param obj {Object}
* @param mixin {Object} an object to be mixed in with the new, flat object
* @return {Object}
* @example ATT.util.flattenObject({a:{b:5,e:{c:2,d:3}}}) will return an object like
* a_b: 5
* a_e_c: 2
* a_e_d: 3
* TODO:change it to dollar($) instead of underscore
*/
ATT.util.flattenObject = function (obj, mixin) {
	var flat = {}, o1, o2, o,
	map = function (path, o1, o2) {
		var p;
		for (p in o2) {
			if (o2.hasOwnProperty(p)) {
				if (typeof o2[p] === "object" && o2[p] !== null) {
					if (path) {
						map(path + "_" + p, o1, o2[p]);
					} else {
						map(p, o1, o2[p]);
					}
				} else {
					if (path) {
						o1[path + "_" + p] = o2[p];
					} else {
						o1[p] = o2[p];
					}
				}
			}
		}
		return o1;
	};
	if (mixin) {
		ATT.util.mixin(flat, mixin);
	}
	return map("", flat, obj);
};

/**
* Utility function returns new object with member objects flattened by flattenObject
* @method flattenArray
* @param options {Object} 
*   - data: {Array} an array of {Object}s to flatten
*   - groupSize: {Number} the number of objects to group together
*   - stub: {Object} a prototypical object used for sparce arrays and mixins
*   - fillSparce: {Boolean} fill sparce groups with a stub object
*   - mixStub: {Boolean} mixes in each flat object with the stub
* @return {Object} with one member, data with value {Array}
* @example ATT.util.flattenArray({
data: ,
groupSize: 3, 
stub: {}, 
fillSparce: true,
filter: function (val) {
}
return true;
}});
*/
ATT.util.flattenArray = function (options) {
	var i, len, flatArr = [], master = [], flen,
	arr = options.data, groupSize = options.groupSize,
	obj = options.stub, filter = options.filter;
	for (i = 0, len = arr.length; i < len; i += 1) {
		if (!filter || (filter && typeof filter === "function" && filter.apply(null, [arr[i]]))) {
			if (obj && options.mixStub) {
				flatArr.push(ATT.util.flattenObject(arr[i], obj));
			} else {
				flatArr.push(ATT.util.flattenObject(arr[i]));
			}
		}
		if (groupSize && flatArr.length === groupSize) {
			master.push(flatArr);
			flatArr = [];
		}
	}
	flen = flatArr.length;
	if (flen) {
		if (obj && options.fillSparce && groupSize && flen < groupSize) {
			for (i = flen, len = groupSize; i < len; i += 1) {
				flatArr.push(obj);
			}
		}
		master.push(flatArr);
	}
	return master;
};
/**
* Utility function returns the number of properties on an object
* similar to .length on an array
* @method objSize
* @param obj {object}
* @return {number} the number of properties on an object or length
*/
ATT.util.objSize = function (obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size += 1;
		}
	}
	return size;
};

/**
* Utility function for filtering a collection
* Looks through each value in the list returning an array of all the values
* that pass the truth iterator
* @method filter
* @param list {Array} a collection to be filtered
* @param iterator {function} a truth iterator
* @return results {array} a new collection that passed the truth iterator
*/
ATT.util.filter = function (list, iterator) {
	var results = [];
	if (list === null) {
		return results;
	}
	if (!list.length) {
		list = [list];
	}
	for (var i = 0, len = list.length; i < len; i += 1) {
		if (iterator.call(this, list[i])) {
			results.push(list[i]);
		}
	}
	return results;
};

/**
* Utility function for filtering a collection
* Looks through each value in the list returning an array of all the values
* that fail the truth iterator
* @method reject
* @param list {Array} a collection to be filtered
* @param iterator {function} a truth iterator
* @return results {array} a new collection that failed the truth iterator
*/
ATT.util.reject = function (list, iterator) {
	var results = [];
	if (list === null) {
		return results;
	}
	for (var i = 0, len = list.length; i < len; i += 1) {
		if (!iterator.call(this, list[i])) {
			results.push(list[i]);
		}
	}
	return results;
};

/**
* Utility function for fetching property values out of a list
* @method pluck
* @param list {Array}
* @param propertyName {string} the property to return
* @return {Array} a new list of the properties from the passed in list
*/
ATT.util.pluck = function (list, propertyName) {
	return jQuery.map(list || [], function (value) {
		return value[propertyName];
	});
};

/**
* Utility function for fetching property values out of a list
* @method pluckIndex
* @param list {Array}
* @param propertyName {string} the property to return
* @return {Object} a new object of the properties from the passed in list
*/
ATT.util.pluckIndex = function (list, propertyName, index) {
	var idx = index || {}, i, len, arr;
	if (list && propertyName) {
		if (list[0] && list[0].length) {
			for (i = 0, len = list.length; i < len; i += 1) {
				idx = ATT.util.pluckIndex(list, propertyName, idx);
			}
		} else {
			arr = ATT.util.pluck(list, propertyName);
			for (i = 0, len = arr.length; i < len; i += 1) {
				idx[arr[i]] = null;
			}
		}
	}
	return idx;
};


ATT.util.unique = function (arr, order) {
	var o = {}, i, len = arr.length, r = [], makeOrder = false;
	if (order && typeof order !== "object") {
		order = {};
		makeOrder = true;
	}
	for (i = 0; i < len; i += 1) {
		if (!o[arr[i]]) {
			o[arr[i]] = arr[i];
			if (makeOrder) {
				order[i] = arr[i];
			}
		}
	}
	if (order) {
		for (i in order) {
			if (order.hasOwnProperty(i) && o[order[i]]) {
				r.push(o[order[i]]);
			}
		}
	} else {
		for (i in o) {
			if (o.hasOwnProperty(i)) {
				r.push(o[i]);
			}
		}
	}
	return r;
};

/**
* Utility function for fetching unique property values out of a list
* @method pluckUnique
* @param list {Array}
* @param propertyName {string} the property to return
* @return {Array} a new list of the properties from the passed in list
*/
ATT.util.pluckUnique = function (list, propertyName, repack) {
	var i, len, arr = [], o,
		obj = ATT.util.pluckIndex(list, propertyName);
	for (o in obj) {
		if (obj.hasOwnProperty(o)) {
			arr.push(o);
		}
	}
	if (repack) {
		for (i = 0, len = arr.length; i < len; i += 1) {
			o = {};
			o[propertyName] = arr[i];
			arr[i] = o;
		}
	}
	return arr;
};

/**
* Utility function for print functionality
* @method print
* @param printOptions{object}
*/
//TODO: Need to check for correct style sheets and move print stylesheet to global stylesheet with media queries
ATT.util.print =  function (printOptions) {
	//Setting Defaults
	printOptions = jQuery.extend({}, {
		title: "ATT Print Page",
		width: 900,
		html:jQuery("#printcontent .modalcontent").html()
	}, printOptions);

		try {
			var strFrameName = ("printer-" + (new Date()).getTime());

			// Create an iFrame with the new name.
			var $oIframe = jQuery("<iframe name='" + strFrameName + "'>");
			$oIframe.appendTo("body").css("position", "absolute").css("left","-99999px");

			var oDoc = ($oIframe[0].contentWindow || $oIframe[0].contentDocument);
			if (oDoc.document) {
				oDoc = oDoc.document;
			}

			oDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
			oDoc.write("<html><head><title>" + printOptions.title + "</title>");
			jQuery("head link").each(function(index){
				oDoc.write('<link href="'+this.href+'" rel="'+this.rel+'" type="'+this.type+'" />');
			});
			oDoc.write("</head><body onload='this.focus(); this.print();' style='background:white;width:" + printOptions.width + "px;'>");
			oDoc.write(printOptions.html + "</body></html>");
			oDoc.close();
			setTimeout(function () {$oIframe.remove();},(60 * 1000));
		}
		catch (e) {
			alert('Print failed. Please try again.');
		}

};

/**
* Utility function for print preview
* @method printPreview
* @param previewOptions{object}
* TODO:removing any att.com 
*/

ATT.util.printPreview = function (previewOptions) {
	
	//if necessary overriding the dfeault params
	previewOptions = jQuery.extend({},{
		"title":"AT&amp;T Print Page",
		"selector":".print",
		"width":"50%",
		"height":"70%",
		"contentSelector":"#content"
	}, previewOptions);
	
	jQuery(previewOptions.selector).click(function(){
		var header,
		    content,
		    subHeader,
		    htmlStructure;
		
		content = jQuery(previewOptions.contentSelector).clone();
		content.find("#secondary-content").remove();
		content.find("#detailTabPrint").remove();
		content.find(".right-container").remove();
		//content.find("#device360Container div:not(#deviceview)").remove();
		content.find("script").remove();
		
		header = ['<div class="modalHeader" title="ATT_Print"><h1>', previewOptions.title, '</h1>',
				  '<a class="closeModal" href="#close" onclick="jQuery.colorbox.close();return false;">Close',
				  '</a>','</div>'].join("");

		subHeader= ['<div class="modalSubHeader" style="border-top: 6px solid #FF8409;height: 39px;padding: 16px 25px 0;"><ul>',
					'<li id="primary_ATTLogo" class="floatl">',
					'<img src="/media/att/2011/shop/common/attlogo.gif" alt="ATT_LOGO" style="width:120px; height:60px; position:relative; top:-15px; left:-50px"/>',
					'<li id="actualprint" style="float:right;"><a class="print" href="#">Print Page</a></li></ul></div>'].join("");

		htmlStructure =["<div id='printcontent'>", header , subHeader,
						"<div class='modalcontent' style='position: relative; padding:25px; font:11px Arial;text-align:left;'>"+ content.html() + "</div></div>"].join("");
		
		jQuery().colorbox({
			iframe:false,
			width: previewOptions.width,
			height: previewOptions.height,
			html:htmlStructure,
			onComplete:function(){
				jQuery(".modalContent").html(htmlStructure);
				jQuery("#printcontent").css("background","none !important");
				jQuery.colorbox.resize();
				jQuery("a,.modalcontent","#printcontent").click( function () { return false; });
				jQuery("#actualprint a.print").click(function () {
					ATT.util.print();
					return false;
				});
			}
		});
	});
};


/*
 * generic curry utility method
 * @method curry
 * @param {function}
 * 
 */
ATT.util.curry = function (fn) {
	   var slice = Array.prototype.slice,
		   stored_args = slice.call(arguments, 1);

	   return function () {
		   var new_args = slice.call(arguments),
			   args = stored_args.concat(new_args);
		   return fn.apply(null, args);
	   };
};


/**
 * AJAX waiting spinner utility method
 * @method
 * @param vis{boolean}
 * @param options{object}
 * @example ATT.util.ajaxSpinner(true) and second optional argument as an objec
 * TODO:Look into positioning it 
 */

ATT.util.ajaxSpinner = function (vis, options) {
		/*
		 * Pass true to gray out screen, false to ungray
		 * options are optional.  This is a JSON object with the following (optional) properties
		 * opacity:0-100         // Lower number = less grayout higher = more of a blackout 
		 * zindex: #             // HTML elements with a higher zindex appear on top of the gray out
		 * bgcolor: (#xxxxxx)    // Standard RGB Hex color code
		 * ATT.util.ajaxSpinner(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
		 * Because options is JSON opacity/zindex/bgcolor are all optional and can appear
		 * in any order.  Pass only the properties you need to set.
		*/
			  
		var defaults = {zindex:50, opacity:70, bgcolor:'#FFFFFF', selector:"body"},
			opaque = (options.opacity/100),
			$tbody = jQuery(options.selector), 
			tnode,
			pageWidth,
			pageHeight,
			dark=document.getElementById('darkenScreenObject');
		options = jQuery.extend({}, defaults, options);
		
	  if (!dark) {
		// The dark layer doesn't exist, it's never been created.  So we'll
		// create it here and apply some basic styles.
		
			tnode = document.createElement('div');           // Create the layer.
			tnode.style.position = "absolute";                 // Position absolutely
			//tnode.style.top='0';                             // In the top
			//tnode.style.left='0';                            // Left corner of the page
			tnode.style.overflow='hidden';                   // Try to avoid making scroll bars            
			tnode.style.display='none';                      // Start out Hidden
			tnode.id='darkenScreenObject';                   // Name it so we can find it later
		$tbody.prepend(tnode);                            // Add it to the web page
		dark = document.getElementById('darkenScreenObject');  // Get the object.
	  }
	  if (vis) {
		// Calculate the page width and height 
		if( $tbody && ( $tbody.height() || $tbody.width() ) ) {
			 pageWidth = $tbody.width()+'px';
			 pageHeight = $tbody.height()+'px';
		} /*else if( document.body.offsetWidth ) {
			pageWidth = document.body.offsetWidth+'px';
			pageHeight = document.body.offsetHeight+'px';
		}*/
		else {
			pageWidth='100%';
			pageHeight='100%';
		}   
		//set the shader to cover the entire page and make it visible.
		dark.style.opacity = opaque;                      
		dark.style.MozOpacity = opaque;                   
		dark.style.filter ='alpha(opacity='+options.opacity+')'; 
		dark.style.zIndex = options.zindex;        
		dark.style.backgroundColor = options.bgcolor;  
		dark.style.backgroundImage = "url(" + location.protocol + "//0.ecom.attccc.com/images/global/ajaxLoader.gif)";
		dark.style.backgroundRepeat= "no-repeat";
		dark.style.backgroundPosition = "center center";
		dark.style.width = pageWidth;
		dark.style.height = pageHeight;
		dark.style.display ='block';                          
	  } else {
		 dark.style.display ='none';
	  }
};

/*
 * Utility method for only allowing alpha numeric values
 * @validateAlphaNumber
 * @param field {HTMLelement or jQuery selector}
 * @example ATT.util.validateNumber(myField);
 */

ATT.util.validateAlphaNumber = function(field) {
	jQuery(field).keypress(function(e){
		var character,
		    re = /^[0-9a-zA-Z\s]+$/;
		if (!e){
			e = window.event;
		}
		if (e.which !== 0 && e.charCode !== 0) {
			character = String.fromCharCode(e.keyCode||e.charCode);
		}
		if (!re.test(character)) {
			return false;
		}
	});
};

/*
 * Utility method for only allowing numeric values
 * @validateNumber
 * @param field {object}
 * @example $(selector).keyup(function(){ATT.util.validateNumber(this)});
 */

ATT.util.validateNumber = function(field) {
	var re = /^[0-9]*$/;
		if (!re.test(field.value)) {
			//if(window.console && console.log){
			//	console.log('Value must be all numeric characters, non numerics will be removed from field!');
			//}
			field.value = field.value.replace(/[^0-9]+/g,"");
		}
};

/*
 * Utility method to check for attPersistantLocalization cookie
 * @attPLCookie
 * @param
 * @example if(!ATT.util.attPLCookie()){....}
 */

ATT.util.attPLCookie = function(){
	var plzip = document.cookie.match(/attPersistantLocalization.*zip=(\d{5})/);
	 return !!plzip;
	
};


ATT.namespace("ajaxWrapper");
ATT.ajaxWrapper = function(url, dataType, successFn){
	return jQuery.ajax({
		url:url,
		dataType:dataType,
		success:successFn,
		error:function(error){
			//if(console && console.log){
			//	console.log("error:"+ error);
			//}
		}
	});
	
};


ATT.namespace("globalVars");
//need to filter this AJAX call
if(/\/wireless\/|\/cart\/|\/orderreview/.test(location.href)){
	ATT.globalVars.cartPromise = ATT.ajaxWrapper('/shop/cart/cartsummary/jcr:content/cart.cartcontent.xhr.json', 'json', function(data){
		ATT.globalVars.cartContents = data;
		ATT.globalVars.flattenCartContents = ATT.util.flattenObject(data);
	});
}else{
	ATT.globalVars.cartPromise = ATT.ajaxWrapper('/shop/cart/cartsummary/jcr:content/cart.cartcontent.lite.xhr.json', 'json', function(data){
		ATT.globalVars.cartContents = data;
    });
}


/* Plugin ready method
 * @namespage ATT.util.pluginReady
 * @function(plugin)
 * @example function callBack(){alert('ready!')}
 *   jQuery.when(ATT.util.pluginReady("test")).then(callBack);
 *   window.setTimeout(function(){jQuery.test={}}, 5 * 1000);
 */
ATT.util.pluginReady = function(plugin){
	if(!jQuery.Deferred){
		return;
	}	
	
	// return a deffered object that will resolve when the plugin is available.
	var pluginDef = jQuery.Deferred(),
		pluginInterval = window.setInterval(function () {
			if (!!jQuery[plugin]) {
				pluginDef.resolve();
		}}, 300),
		
		// give up after 10 seconds
		pluginTimeout = window.setTimeout(function (){
			window.clearInterval(pluginInterval);
		}, 10 * 1000);
	
		jQuery.when(pluginDef).then(function () { 
			window.clearInterval(pluginInterval);
		});
		
		return pluginDef.promise();

};

/*
 * This method can be use to delete cookie too 
 * @namespace ATT
 * @method
 * @param name{string}
 * @param value{string}
 * @param days{number}
 * @example ATT.util.setCookie("o_lam", "something", 30)
 */
ATT.util.setCookie = function(name, value, days) {
		var expires, nameEQ = name + '=';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = '; expires=' + date.toGMTString();
		}
		else { 
			expires = '';
		}
		document.cookie = nameEQ + value + expires + '; path=/';
};


/*
 * @namespace ATT
 * @method
 * @param name{string}
 * @example ATT.util.setCookie("olam_c")
 */
ATT.util.getCookie = function (name) {
		var nameEQ = name + '=', i, c, 
			cookies = document.cookie.split(';');
		for(i=0; i < cookies.length; i+=1) {
			c = cookies[i];
			while (c.charAt(0)===' '){
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) === 0){
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
};

/**
 * Utility sort methods
 * @example var by = ATT.util.sortBy;
 * 			array.sort(by.property('length', +1));
 **/
ATT.util.sortBy = {
 	property: function(sortProperty, direction){
 		if (direction === undefined){
			direction = +1;
		}
 		var thisMethod = function(a,b){
 			var valueA = a[sortProperty],
 			    valueB = b[sortProperty];
 			if(typeof valueA != 'number' && typeof valueA != 'object'){
 				valueA = a[sortProperty].toLowerCase();
 				valueB = b[sortProperty].toLowerCase();
 			}
 			if(direction > 0){
 				if (valueA < valueB) {return -1;}
 				if (valueA > valueB) {return 1;}
 			}else{
 				if (valueA > valueB) {return -1;}
 				if (valueA < valueB) {return 1;}
 			}
 			return 0;
 		};
 		return thisMethod;
 	}
};

/**
 * Utility stop event propogation aka bubbling
 * @example ATT.util.stopProp(e, true);
 **/
ATT.util.stopProp = function(e, returnVal) {
	//tealeaf pass event... 
	// wt pass event?
	//e = e || event;/* get IE event ( not passed ) */
    //e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.stopPropogation ? e.stopPropogation : e.cancelBubble = true;
	if (!e){ 
		e = window.event;
        e.cancelBubble = true;
	}	
    if (e.stopPropagation){
		e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
	}
	if (typeof returnVal !== 'undefined'){ return returnVal;}
};

/**
 * Utility to prevent unwanted default dblclick behavior
 * @example $('.sngclick').bind('click dblclick', ATT.util.onSngClick);
 **/
ATT.util.onSngClick = function (e) {
	var target = e.currentTarget; 
	if (target.fired){
		return e.stopPropagation(); 
	}else{
		target.fired = setTimeout(function () {target.fired = 0;}, 900);
	}
	jQuery(target).trigger('sngclick'); 
};
jQuery(document).delegate('.sngclick', 'click dblclick', ATT.util.onSngClick);


/**
*  @description Global method to check for existance of partner/promo in query param
*  @namespace ATT
*  @method checkPromo  PROMO, partner
**/

ATT.namespace('checkPromo');

ATT.checkPromo = function () {
	var queryParam = location.search;
	if(~queryParam.indexOf('partner=') || ~queryParam.indexOf('PROMO=')){
		ATT.ajaxWrapper('/shop/cart/cartsummary/jcr:content/cart.partnerPromo.xhr.json'+queryParam, 'json', function(data){
			//if(window.console && window.console.log){
			//	console.log('partner and promo added'+ data);
			//}
		});
	}

};
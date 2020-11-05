//$Revision: 425918 $ , $Date: 2012-05-23 14:38:46 -0700 (Wed, 23 May 2012) $ and $Author: pl8911 $
/*global window $ jQuery*/
/*jslint eqeqeq: false, white: false, regexp: false, plusplus: false, nomen: false*/


/**
 * Created by Pallav Laskar
 * Date: 6/14/11
 * Time: 2:14 PM
 * Title: Namespace(ATT)
 */

/**
* @module ATT
* @requires jquery, jquery.json
*/

if (decodeURIComponent(document.cookie).match('SHOPSESSIONID') === null) {
	// session id is not set yet, ping app server with ajax to set one synchronously before any other ajax requests.
	jQuery.ajax({
		async:false,
		cache:false,
		dataType:'json',
		error:function() {
			jQuery(document).ready(function(){jQuery('head').append('<meta name="shopsessioninit" content="error">');});
			jQuery(document).trigger('shop_session_init',['error']);
			return true;
		},
		success:function(resp, status, jqXhr) {
			if (!!resp.status && resp.status == 'success') {
				jQuery(document).ready(function(){jQuery('head').append('<meta name="shopsessioninit" content="success">');});
				jQuery(document).trigger('shop_session_init',['success']);
			} else {
				jQuery(document).ready(function(){jQuery('head').append('<meta name="shopsessioninit" content="failure">');});
				jQuery(document).trigger('shop_session_init',['failure']);
			}
			return true;
		},
		timeout:3000,
		type:'GET',
		url:'/shop/cart/cartsummary/jcr:content/cart.initsession.xhr.json'
	});
} else {
	jQuery(document).ready(function(){jQuery('head').append('<meta name="shopsessioninit" content="inited">');});
	jQuery(document).trigger('shop_session_init',['inited']);
}

jQuery.ajaxSetup({beforeSend: function(xhr, s) {
	// to keep IE browser caching of application/json stale
	// setting cache:false is too late at this point.  Must append _=ts to url directly.
	if (s.url.match('\.xhr\.json')) {
		s.url += (s.url.match('\\?')) ? "&" : "?";
		s.url += "_=" +  jQuery.now();
	}
}});

var ATT = ATT || {};

ATT.empty = {};
ATT.emptyFn = function () { };

/**
* Utility function mixes the properties of objects
* resolving conflicts through overwrites.  The objects
* passed last have the highest priority.
* @method mixin
* @param object {Object} any number of objects
* @return {Object} the modified first object parameter
* @example ATT.mixin({}, {test:1}, {test:2}, {test2:2});
*/
ATT.mixin = function (/* {Object}, {Object}, ... */) {
    var args = Array.prototype.slice.apply(arguments),
    r = args.shift(), o, m;
    while (args.length) {
        m = args.shift();
        for (o in m) {
            if (m.hasOwnProperty(o)) {
                r[o] = m[o];
            }
        }
    }
    return r;
};

/**
* Resolves the name property in a given object or ATT
* @method nameProperty
* @param str {String} name/path using dot notation
* @param obj {Object} parent object, default ATT
* @param prevent {Boolean} prevent creation of missing properties, default TRUE
* @return {Array} namespace[0] (parent object), namespace[1] (property name)
* @example ATT.nameProperty("test2", {test: 1, test2: 2, test3: 3});
*/
ATT.nameProperty = function (str, obj, prevent) {
    if (typeof str !== "string") {
        str = JSON.stringify(str);
    }
    var ns = obj || ATT,
         k = str.split(".");
    while (k.length > 1) {
        if (!prevent && typeof ns[k[0]] === "undefined") {
            ns[k[0]] = {};
        }
        if (ns[k[0]]) {
            ns = ns[k.shift()];
        } else {
            return;
        }
    }
    return [ns, [k[0]]];
};

/**
* Utility function resolves namespace in ATT
* creating an empty object if the namespace is not in
* use and throwing a warning if it does exist
* @method namespace
* @param str {String} name/path using dot notation, ATT is stripped
* @return {Boolean|undefined} TRUE if the namespace was reserved
* @example ATT.namespace("testing.input");
*/
ATT.namespace = function (str, obj) {
    var ns = this.nameProperty(str),
    	k = str.split(".");

    if (k[0] === "ATT") {
        k.shift();
    }
    if (ns && ns[0][ns[1]]) {
    	//if (console && console.warn){
    	//	console.warn(["namespace ATT.", k.join("."), " already in use."].join(""));
    	//}
        return;
    }
    else {
        ns[0][ns[1]] = {};
    }
    
    if(obj && (typeof obj === "object" || typeof obj === "function")){
    	this[str] = obj;
    }
    return true;
};

/**
* ATT helper methods for enhancing classes and objects
* because helpers often use "this" you usually need to use
* apply or assign the helper as the value of a prototype method
* @property helper
* @type {Object}
* @namespace ATT.helper
*/
ATT.namespace("helper");


/**
* Creates public properties and methods from a private config object
* @method makePublic
* @param config {Object}
*/
ATT.helper.makePublic = function (config) {
    ATT.mixin(this, config.publish);
};

/**
* Create generic get function
* @method getter
* @param config {Object}
* @return get {Function}
*/
ATT.helper.getter = function (config) {
    return function (str) {
        var ns, g = config;
        if (str) {
            ns = ATT.nameProperty(str, config, "prevent");
            if (!ns) {
                return;
            }
            g = ns[0][ns[1]];
        }
        if (typeof g === "object") {
            return jQuery.toJSON(g);
        } else {
            return g;
        }
    };
};

/**
* Generic registration function
* @method register
*/
ATT.helper.register = function () {
    var i = this.get("path") || this.get("id"),
    ns = ATT.nameProperty(i, this.constructor.index);
    ns[0][ns[1]] = this;
};

/**
* Verifies the object's configuration
* @method debug
* @param config
* @example 
*/
ATT.helper.debug = function (config, force) {
    var err, warn, log, i, len, manifest = config.manifest || [];
    if (force) {
        config.debug = true;
    }
    if (typeof config.debug === "undefined" || config.debug === false) {
        return;
    }
    for (i = 0, len = manifest.length; i < len; i += 1) {
        if (typeof config[manifest[i]] === "undefined" && typeof window.console === "object") {
            jQuery.warn("An instance of ATT." + this.name + " is missing the required property: " + manifest[i]);
        }
    }
};

/**
* Internal function used during class creation by subClass
* only internal methods which take config as their only param
* can be delegated using this method
* @method delegate
* @param internal {String} name of method
* @param external {String} public name of method
*/
ATT.helper.delegate = function (internal, external) {
    this.prototype[external || internal] = function (/*config, data*/) {
        var config, data, args = Array.prototype.slice.apply(arguments);
        if (args.length < 2) {
            if (args.length === 0) {
                args.push(ATT.empty);
            }
            args.unshift(internal);
            return this.privilege.apply(this, args);
        }
        config = args[0];
        data = args[1];
        if (typeof internal === "function") {
            return internal.apply(this, arguments);
        }
        if (typeof config[internal] === "function") {
            return config[internal].apply(this, arguments);
        }
    };
};

/**
* Delegates a method to a poolClass.poolMethod using one config property as a parameter
* @method delegateToPool
* @param method {String} name of the method to create
* @param poolClass {Function} class to delegate to
* @param poolMethod {String} name of the method to delegate to
* @param prop {String} name of the config property to use as a parameter when calling the new method
*/
ATT.helper.delegateToPool = function (method, poolClass, poolMethod, prop) {
    this.prototype[method] = function () {
        var pool, i, p, result = true, args = Array.prototype.slice.apply(arguments);
        if (prop) {
            p = this.get(prop);
        }
        if (poolClass && typeof poolClass.getInstance === "function") {
            pool = poolClass.getInstance(p);
            for (i in pool) {
                if (pool.hasOwnProperty(i)) {
                    result = pool[i][poolMethod].apply(pool[i], args) && result;
                }
            }
        }
        return result;
    };
};

/**
* Delegates a method to a static method on staticClass using one config property as a parameter
* @method delegateToClass
* @param method {String} name of the method to create
* @param staticClass {Function} class to delegate to
* @param staticMethod {String} name of the method to delegate to
* @param prop {String} name of the config property to use as a parameter when calling the new method
*/
ATT.helper.delegateToClass = function (method, staticClass, staticMethod, prop) {
    this.prototype[method] = function () {
        var pool, i, p, args = Array.prototype.slice.apply(arguments);
        if (prop) {
            p = this.get(prop);
            args.unshift(p);
        }
        if (staticClass && typeof staticClass[staticMethod] === "function") {
            return staticClass[staticMethod].apply(staticClass, args);
        }
    };
};

/**
* Retrieves the instance from a singleton, multiton, or pool
* @method getInstance
* @param path {String|Number} property name in the object pool's
* index or the number of the instance in an instance array
* @return {Object} an instance of a ATT class
*/
ATT.helper.getInstance = function (path) {
    if (typeof this.instance === "object") {
        return path ? this.instance : this.instance[path];
    } else {
        var ns = typeof this.index === "object" && ATT.nameProperty(path, this.index, true);
        return ns ? ns[0][ns[1]] : ns;
    }
};

/**
* Create generic privilege function
* @method privilege
* @param config {Object}
* @return privilege {Function}
*/
ATT.helper.privilege = function (config) {
    return function (/*name, arguments list*/) {
        var args = Array.prototype.slice.apply(arguments),
        	name = args.shift();
        args.unshift(config);
        if (typeof name === "function") {
            return name.apply(this, args);
        } else {
            if (this[name]) {
                this[name].apply(this, args);
            }
        }
    };
};

/**
* @method clone
* @param config {Object} this config
* @param obj {Object} the object being cloned
* @param options {Object} overrides
* @return {Object} instance of this constructor
*/
ATT.helper.clone = function (config, options) {
    return new this.constructor(ATT.mixin({}, config, options));
};

/**
* @method set
* @private
* @param config {Object}
* @param path {String}
* @param value {Varies}
* @example ATT.Test.prototype.set = ATT.helper.set;
*/
ATT.helper.set = function (config, path, value) {
    //console.log("setting: ", config, path, value);
    if (typeof value === "undefined") {
        return this.privilege(ATT.helper.set, config, path);
    }
    var ns = ATT.nameProperty(path, config, false);
    ns[0][ns[1]] = value;
};

/**
* The core class for ATT.  This constructor can be
* called like a function with an optional options parameter
* which overrides default configuration.
* @class Class
* @param options {Object} the options parameter
* overrides default configuration
* @namespace ATT
* @for ATT
* @constructor
* @example ATT.Class({default: 1});
*/
ATT.Class = function (options, e) {
    var config = options || {};
    if (!(this instanceof ATT.Class)) {
        return new ATT.Class(options);
    }
    /**
    * The constructor's name in the ATT namespace
    * @property name
    * @type {String}
    */
    this.name = "Class";
    /**
    * Provides access to this config
    * @method privilege
    * @param name {String} method gaining privilege
    * @for Class
    */
    this.privilege = ATT.helper.privilege(config);
    /**
    * Return this object's stringified config
    * @method get
    * @param str {String} config path
    * @for Class
    * @return {String} JSON
    * Example: 
    */
    this.get = ATT.helper.getter(config);
    if (this.init) {
        this.init(e);
    }
};

/**
* Creates a new instance with the same configuration
* or a mix of this configuration and the options parameter.
* @method clone
* @param options {Object}
* @for Class
* @return {Object} instance of this constructor
*/
ATT.Class.prototype.clone = function (options) {
    return this.privilege(ATT.helper.clone, options);
};

/**
* Provides access to the parent config during inheritance transfer of capabilities
* @method _mixin
* @private
* @param parent {Object} parent's config object
* @param config {Object} this config
* @param defaults {Object} this constructor's config
* @param options {Object} this instance overrides
* @for Class
*/
ATT.Class.prototype._mixin = function (parent, config, defaults, options) {
    ATT.mixin(config, parent, defaults, options);
};

/**
* This class factory creates a subclass constructor with this instance
* as a __super__ property of the new class, inheriting this instance's
* prototype and configuration.
*
* The new class constructor can be invoked like a function and will
* accept an options parameter which can override default configuration
* as well as a pattern.
*
* Upon instantiation, objects will call their init method if one exists.
* @method subClass
* @param name {String} the reference to the new class
* @param defaults {Object} the default configuration for new
* instances of the new class
* @param pattern {String} (factory), "singleton", "multiton", or "pool"
* @param lazy {Boolean} lazy objects do not init upon instantiation
* @constructor
* @for Class
* @example ATT.base.subClass("Test", {override: 2});
*/
ATT.Class.prototype.subClass = function (name, defaults, pattern, lazy) {
    var parent = this,
    ns = ATT.nameProperty(name, ATT, false);
    ns[0][ns[1]] = function (options, e) {
        var that, config = {},
        instance = this.constructor.instance;
        if (pattern === "singleton") {
            if ((this instanceof ns[0][ns[1]]) && instance) {
                return instance;
            }
        }
        if (!(this instanceof ns[0][ns[1]])) {
            return new ns[0][ns[1]](options, e);
        }
        that = this;
        this.name = name;
        /**
        * The parent object
        * @property __super__
        * @type {Object}
        */
        this.__super__ = parent;
        this.privilege = ATT.helper.privilege(config);
        parent.privilege("_mixin", config, defaults, options);
        this.get = ATT.helper.getter(config);
        if (pattern === "singleton") {
            /**
            * The reference to a singleton
            * @property instance
            * @type {Object}
            */
            this.constructor.instance = that;
        }
        if (pattern === "multiton") {
            if (!this.constructor.instance) {
                /**
                * The instances collection
                * @property instance
                * @type {Array}
                */
                this.constructor.instance = [];
            }
            this.constructor.instance.push(that);
        }
        if (pattern === "pool") {
            if (!this.constructor.index) {
                /**
                * The reference of objects in the pool
                * @property index
                * @type {Object}
                * Example: ATT.checkout.index
                */
                this.constructor.index = {};
            }
        }
        if (!lazy && this.init) {
            this.init(e);
        }
    };
    ATT.mixin(ns[0][ns[1]].prototype, parent.constructor.prototype);
    ns[0][ns[1]].getInstance = ATT.helper.getInstance;
};

/**
* The base object for ATT inheritence
* @property base
* @type {Object}
* @namespace ATT
*/
ATT.base = ATT.Class();

ATT.namespace("dom");

ATT.dom.get$ = (function () {
    var doc = document;
    return function (id) {
        return jQuery(doc.getElementById(id));
    };
} ());

/**
* Singleton instance of jQuery
* @method $
* @param id {String|DOMElement} id of an element or the element
* @param ctx {DOMElement} context for jQuery
* @namespace dom
* @example ATT.dom.$("myDiv");
*/
ATT.dom.$ = (function (a) {
    var doc = document;
    return function (b, ctx) {
        var e;
        if (ctx && typeof ctx === "object" && typeof b === "string") {
            a[0] = ctx;
            e = a.find("[id=" + b + "]").get(0);
        }
        if (typeof b === "string" && !e) {
            e = doc.getElementById(b);
        }
        if (typeof b === "object") {
            a[0] = e = b;
        }
        if (e === null) {
            e = doc.getElementsByName(b);
            a[0] = e[0];
        } else {
            a[0] = e;
        }
        return a;
    };
} (jQuery([1])));

/**
 * Helper method to capitalized content 
 * @method capitalizeField
 * @param ctrl 
 * @namespace dom
 * @example ATT.dom.capitalizeField(ctrl) 
 */
ATT.dom.capitalizeField = function (ctrl) {
    var $ctrl = jQuery(ctrl);
    $ctrl.val(jQuery(ctrl).val().toUpperCase());
};


/**
 * Utility  method to for better type 
 * @method type
 * @param obj{object}
 * @namespace ATT.type
 * @example ATT.type([]) === "array"
 *         	ATT.type(new Array()) === "array";
 *	 		ATT.type(1) === "number"
 *	 		ATT.type(new Number(1)) === "number"
 *	 		ATT.type(NaN) === "nan"
 *	 		ATT.type(null) === "null"
 *	 		ATT.type(true) === "boolean"
 *	 		ATT.type(new Boolean(true)) === "boolean"
 *	  		ATT.type("x") === "string"
 *			ATT.type(new String("x")) === "string"
 *			ATT.type(new Date()) === "date"
 *			ATT.type(/x/) === "regexp"
 *	 		ATT.type(new RegExp('x')) === "regexp"
 *	 		ATT.type(X) === "function"
 *	 		ATT.type(new X()) === "x"
 *	 		ATT.type(document) === "htmldocument"
 */
ATT.namespace("type", function(obj){
	
   var memo = {},
	    rword = /\w+/g,
	    t, s = Object.prototype.toString,
    	ls = Object.prototype.toLocaleString,
	    memoize = function (str) {
	        if (typeof memo[str] === "undefined") {
	            memo[str] = str.match(rword)[1].toLowerCase();
	        }
	        return memo[str];
	    };
	       if (typeof obj === "undefined") {
	            return "undefined";
	        }
	        if (obj === null) {
	            return "null";
	        }
	        t = s.call(obj);
	        switch (t) {
	            case "[object Object]":
	                t = ls.call(obj);
	                break;
	            case "[object Number]":
	                if (ls.call(obj) === "NaN") {
	                    t = "[object NaN]";
	                }
	                break;
	            case "[object Arguments]":
	            	t = "[object Object]";
	            	break;     
	            default:
	        }
	        return memoize(t);
	   
	
});

/**** Webstorage availability check ***********/
if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return window.unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) { return window.unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = window.escape(sKey) + "=" + window.escape(sValue) + "; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      var sExpDate = new Date();
      sExpDate.setDate(sExpDate.getDate() - 1);
      document.cookie = window.escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) { return (new RegExp("(?:^|;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
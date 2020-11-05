(function () { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.onSuccess = function(pack) {
	Main.bootstrapPack = pack;
	if(flambe_System.get_touch().get_supported()) {
		flambe_System.get_touch().down.connect(function(e) {
			Main.bootstrapPack.getSound("empty").play().dispose();
		}).once();
		flambe_System.get_touch().up.connect(function(e1) {
			Main.bootstrapPack.getSound("empty").play().dispose();
		}).once();
	} else Main.bootstrapPack.getSound("empty").dispose();
	flambe_System.get_stage().resize.connect(Main.onResize);
	flambe_System.root.add(new com_nick_ultimatetrivia_components_GameTracker());
	s2_scene_Scenes.defaultTransition(new flambe_scene_FadeTransition(0.2));
	s2_scene_Scenes.init(new s2_scene_CustomPreloadScene(pack));
	Main.setupDebugInfo();
	Main.onResize();
};
Main.setupDebugInfo = function() {
	var url = s2_util_URLParser.fromBrowser();
	if(url.query.exists("wipedata")) {
		flambe_System.get_storage().clear();
		flambe_System.root.add(new com_nick_ultimatetrivia_components_GameTracker());
	}
	flambe_System.volume.set__(flambe_System.get_storage().get("muted",false)?0:1);
	flambe_System.volume.get_changed().connect(function(value,prev) {
		if(value != prev) {
			if(value == 0) flambe_System.get_storage().set("muted",true); else if(value == 1) flambe_System.get_storage().set("muted",false);
		}
	});
	if(url.query.exists("scene")) {
		var scenes = { 'game' : com_nick_ultimatetrivia_scenes_QuestionScene, 'title' : com_nick_ultimatetrivia_scenes_TitleScene, 'select' : com_nick_ultimatetrivia_scenes_QuizSelectScene, 'results' : com_nick_ultimatetrivia_scenes_ResultsScene, 'brain' : com_nick_ultimatetrivia_scenes_BrainHubScene};
		var path = url.query.get("scene");
		var scenePath = Reflect.getProperty(scenes,path);
		s2_scene_Scenes["goto"](scenePath);
	} else s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_TitleScene);
};
Main.main = function() {
	flambe_System.init();
	flambesdk_BaseUtils.setupBaseURL();
	s2_client_Config.init(new s2_client_NickBootstrap(),Main.localizationLoaded);
	s2_ui_TextButton.OFFSET_XY.x = 10;
};
Main.localizationLoaded = function() {
	var loader = flambe_System.loadAssetPack(s2_loading_Assets.getManifest("bootstrap"));
	loader.get(Main.onSuccess);
};
Main.onResize = function() {
	if(s2_scene_Scenes.director == null || s2_scene_Scenes.director.owner == null) return;
	if(Main.resizeScreen != null) {
		Main.resizeScreen.dispose();
		Main.resizeScreen = null;
	}
	if(flambe_System.get_stage().get_height() > flambe_System.get_stage().get_width()) {
		var sImageName;
		if(flambe_System.get_stage().get_width() > 640) sImageName = "orientation_ipad"; else sImageName = "orientation_iphone";
		flambe_System.root.add(new flambe_SpeedAdjuster(0));
		Main.resizeScreen = new flambe_Entity().add(new flambe_display_FillSprite(0,flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height())).addChild(s2_display_LayoutUtil.center(new flambe_Entity().add(new flambe_display_ImageSprite(Main.bootstrapPack.getTexture(sImageName)))));
		flambe_System.root.addChild(Main.resizeScreen);
	} else {
		var adjuster;
		var component = flambe_System.root.getComponent("SpeedAdjuster_7");
		adjuster = component;
		if(adjuster != null) adjuster.dispose();
	}
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(js_Boot.isClass(f) || js_Boot.isEnum(f));
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.isEof = function(c) {
	return c != c;
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !js_Boot.isClass(cl)) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !js_Boot.isEnum(e)) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(js_Boot.isClass(v) || js_Boot.isEnum(v)) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	xml.set_nodeName(name);
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	xml.set_nodeValue(data);
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	xml.set_nodeValue(data);
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	xml.set_nodeValue(data);
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	xml.set_nodeValue(data);
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	xml.set_nodeValue(data);
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.nodeName;
	}
	,set_nodeName: function(v) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.nodeName = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,iterator: function() {
		this.ensureElementType();
		return HxOverrides.iter(this.children);
	}
	,elements: function() {
		this.ensureElementType();
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		this.ensureElementType();
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && child.get_nodeName() == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstChild: function() {
		this.ensureElementType();
		return this.children[0];
	}
	,firstElement: function() {
		this.ensureElementType();
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		this.ensureElementType();
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		this.ensureElementType();
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,ensureElementType: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	}
	,__class__: Xml
	,__properties__: {set_nodeValue:"set_nodeValue",get_nodeValue:"get_nodeValue",set_nodeName:"set_nodeName",get_nodeName:"get_nodeName"}
};
var com_nick_ultimatetrivia_CategoryId = $hxClasses["com.nick.ultimatetrivia.CategoryId"] = { __ename__ : ["com","nick","ultimatetrivia","CategoryId"], __constructs__ : ["TEST1","FOOD","RATHER","COLOR","LOVE","FAMILY","FRIENDS","ENEMIES","EDUCATION","QUOTES","DWELLINGS","FIGHTING","JOBS","ANIMALS","CLOTHING","JOKES","GADGETS","TRANSPORTATION","MUSIC","TALENT","HAIR","GROSS","ANATOMY","NEIGHBORS","SPORTS","EVENTS","NAMES","THEME_SONGS","FEARS","BABIES","EYEBROWS","RESTAURANTS","DANCING","TECHNOLOGY","VACATIONS","SMELLS","CHRONOLOGY","SPACE","CLOSE_UPS","NUMBERS","SECRETS","LETTER_R","PLACES","FIRST_MEETINGS","BIG_THINGS","CATCHPHRASES","NUMBER_4","ROUND_STUFF","SHOWS_WITHIN_SHOWS","GREEN","IMPOSSIBLE","ARTS_CRAFTS","PERSONALITY","SPONGEBOB","TMNT","LOK_ATLA","HARVEY_BEAKS","PR_DINO_CHARGE","PR_MEGAFORCE","GAME_SHAKERS","HENRY_DANGER","BELLA_BULLDOGS","N100_THINGS","NRDD","WITS_ACADEMY","EVERY_WITCH_WAY","SAM_AND_CAT","VICTORIOUS","ICARLY"] };
com_nick_ultimatetrivia_CategoryId.TEST1 = ["TEST1",0];
com_nick_ultimatetrivia_CategoryId.TEST1.toString = $estr;
com_nick_ultimatetrivia_CategoryId.TEST1.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FOOD = ["FOOD",1];
com_nick_ultimatetrivia_CategoryId.FOOD.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FOOD.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.RATHER = ["RATHER",2];
com_nick_ultimatetrivia_CategoryId.RATHER.toString = $estr;
com_nick_ultimatetrivia_CategoryId.RATHER.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.COLOR = ["COLOR",3];
com_nick_ultimatetrivia_CategoryId.COLOR.toString = $estr;
com_nick_ultimatetrivia_CategoryId.COLOR.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.LOVE = ["LOVE",4];
com_nick_ultimatetrivia_CategoryId.LOVE.toString = $estr;
com_nick_ultimatetrivia_CategoryId.LOVE.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FAMILY = ["FAMILY",5];
com_nick_ultimatetrivia_CategoryId.FAMILY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FAMILY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FRIENDS = ["FRIENDS",6];
com_nick_ultimatetrivia_CategoryId.FRIENDS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FRIENDS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ENEMIES = ["ENEMIES",7];
com_nick_ultimatetrivia_CategoryId.ENEMIES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ENEMIES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.EDUCATION = ["EDUCATION",8];
com_nick_ultimatetrivia_CategoryId.EDUCATION.toString = $estr;
com_nick_ultimatetrivia_CategoryId.EDUCATION.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.QUOTES = ["QUOTES",9];
com_nick_ultimatetrivia_CategoryId.QUOTES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.QUOTES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.DWELLINGS = ["DWELLINGS",10];
com_nick_ultimatetrivia_CategoryId.DWELLINGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.DWELLINGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FIGHTING = ["FIGHTING",11];
com_nick_ultimatetrivia_CategoryId.FIGHTING.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FIGHTING.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.JOBS = ["JOBS",12];
com_nick_ultimatetrivia_CategoryId.JOBS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.JOBS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ANIMALS = ["ANIMALS",13];
com_nick_ultimatetrivia_CategoryId.ANIMALS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ANIMALS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.CLOTHING = ["CLOTHING",14];
com_nick_ultimatetrivia_CategoryId.CLOTHING.toString = $estr;
com_nick_ultimatetrivia_CategoryId.CLOTHING.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.JOKES = ["JOKES",15];
com_nick_ultimatetrivia_CategoryId.JOKES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.JOKES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.GADGETS = ["GADGETS",16];
com_nick_ultimatetrivia_CategoryId.GADGETS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.GADGETS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.TRANSPORTATION = ["TRANSPORTATION",17];
com_nick_ultimatetrivia_CategoryId.TRANSPORTATION.toString = $estr;
com_nick_ultimatetrivia_CategoryId.TRANSPORTATION.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.MUSIC = ["MUSIC",18];
com_nick_ultimatetrivia_CategoryId.MUSIC.toString = $estr;
com_nick_ultimatetrivia_CategoryId.MUSIC.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.TALENT = ["TALENT",19];
com_nick_ultimatetrivia_CategoryId.TALENT.toString = $estr;
com_nick_ultimatetrivia_CategoryId.TALENT.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.HAIR = ["HAIR",20];
com_nick_ultimatetrivia_CategoryId.HAIR.toString = $estr;
com_nick_ultimatetrivia_CategoryId.HAIR.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.GROSS = ["GROSS",21];
com_nick_ultimatetrivia_CategoryId.GROSS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.GROSS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ANATOMY = ["ANATOMY",22];
com_nick_ultimatetrivia_CategoryId.ANATOMY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ANATOMY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.NEIGHBORS = ["NEIGHBORS",23];
com_nick_ultimatetrivia_CategoryId.NEIGHBORS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.NEIGHBORS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SPORTS = ["SPORTS",24];
com_nick_ultimatetrivia_CategoryId.SPORTS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SPORTS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.EVENTS = ["EVENTS",25];
com_nick_ultimatetrivia_CategoryId.EVENTS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.EVENTS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.NAMES = ["NAMES",26];
com_nick_ultimatetrivia_CategoryId.NAMES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.NAMES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.THEME_SONGS = ["THEME_SONGS",27];
com_nick_ultimatetrivia_CategoryId.THEME_SONGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.THEME_SONGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FEARS = ["FEARS",28];
com_nick_ultimatetrivia_CategoryId.FEARS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FEARS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.BABIES = ["BABIES",29];
com_nick_ultimatetrivia_CategoryId.BABIES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.BABIES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.EYEBROWS = ["EYEBROWS",30];
com_nick_ultimatetrivia_CategoryId.EYEBROWS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.EYEBROWS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.RESTAURANTS = ["RESTAURANTS",31];
com_nick_ultimatetrivia_CategoryId.RESTAURANTS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.RESTAURANTS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.DANCING = ["DANCING",32];
com_nick_ultimatetrivia_CategoryId.DANCING.toString = $estr;
com_nick_ultimatetrivia_CategoryId.DANCING.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.TECHNOLOGY = ["TECHNOLOGY",33];
com_nick_ultimatetrivia_CategoryId.TECHNOLOGY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.TECHNOLOGY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.VACATIONS = ["VACATIONS",34];
com_nick_ultimatetrivia_CategoryId.VACATIONS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.VACATIONS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SMELLS = ["SMELLS",35];
com_nick_ultimatetrivia_CategoryId.SMELLS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SMELLS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.CHRONOLOGY = ["CHRONOLOGY",36];
com_nick_ultimatetrivia_CategoryId.CHRONOLOGY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.CHRONOLOGY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SPACE = ["SPACE",37];
com_nick_ultimatetrivia_CategoryId.SPACE.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SPACE.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.CLOSE_UPS = ["CLOSE_UPS",38];
com_nick_ultimatetrivia_CategoryId.CLOSE_UPS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.CLOSE_UPS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.NUMBERS = ["NUMBERS",39];
com_nick_ultimatetrivia_CategoryId.NUMBERS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.NUMBERS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SECRETS = ["SECRETS",40];
com_nick_ultimatetrivia_CategoryId.SECRETS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SECRETS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.LETTER_R = ["LETTER_R",41];
com_nick_ultimatetrivia_CategoryId.LETTER_R.toString = $estr;
com_nick_ultimatetrivia_CategoryId.LETTER_R.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.PLACES = ["PLACES",42];
com_nick_ultimatetrivia_CategoryId.PLACES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.PLACES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.FIRST_MEETINGS = ["FIRST_MEETINGS",43];
com_nick_ultimatetrivia_CategoryId.FIRST_MEETINGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.FIRST_MEETINGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.BIG_THINGS = ["BIG_THINGS",44];
com_nick_ultimatetrivia_CategoryId.BIG_THINGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.BIG_THINGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.CATCHPHRASES = ["CATCHPHRASES",45];
com_nick_ultimatetrivia_CategoryId.CATCHPHRASES.toString = $estr;
com_nick_ultimatetrivia_CategoryId.CATCHPHRASES.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.NUMBER_4 = ["NUMBER_4",46];
com_nick_ultimatetrivia_CategoryId.NUMBER_4.toString = $estr;
com_nick_ultimatetrivia_CategoryId.NUMBER_4.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ROUND_STUFF = ["ROUND_STUFF",47];
com_nick_ultimatetrivia_CategoryId.ROUND_STUFF.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ROUND_STUFF.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SHOWS_WITHIN_SHOWS = ["SHOWS_WITHIN_SHOWS",48];
com_nick_ultimatetrivia_CategoryId.SHOWS_WITHIN_SHOWS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SHOWS_WITHIN_SHOWS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.GREEN = ["GREEN",49];
com_nick_ultimatetrivia_CategoryId.GREEN.toString = $estr;
com_nick_ultimatetrivia_CategoryId.GREEN.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.IMPOSSIBLE = ["IMPOSSIBLE",50];
com_nick_ultimatetrivia_CategoryId.IMPOSSIBLE.toString = $estr;
com_nick_ultimatetrivia_CategoryId.IMPOSSIBLE.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ARTS_CRAFTS = ["ARTS_CRAFTS",51];
com_nick_ultimatetrivia_CategoryId.ARTS_CRAFTS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ARTS_CRAFTS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.PERSONALITY = ["PERSONALITY",52];
com_nick_ultimatetrivia_CategoryId.PERSONALITY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.PERSONALITY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SPONGEBOB = ["SPONGEBOB",53];
com_nick_ultimatetrivia_CategoryId.SPONGEBOB.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SPONGEBOB.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.TMNT = ["TMNT",54];
com_nick_ultimatetrivia_CategoryId.TMNT.toString = $estr;
com_nick_ultimatetrivia_CategoryId.TMNT.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.LOK_ATLA = ["LOK_ATLA",55];
com_nick_ultimatetrivia_CategoryId.LOK_ATLA.toString = $estr;
com_nick_ultimatetrivia_CategoryId.LOK_ATLA.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.HARVEY_BEAKS = ["HARVEY_BEAKS",56];
com_nick_ultimatetrivia_CategoryId.HARVEY_BEAKS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.HARVEY_BEAKS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.PR_DINO_CHARGE = ["PR_DINO_CHARGE",57];
com_nick_ultimatetrivia_CategoryId.PR_DINO_CHARGE.toString = $estr;
com_nick_ultimatetrivia_CategoryId.PR_DINO_CHARGE.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.PR_MEGAFORCE = ["PR_MEGAFORCE",58];
com_nick_ultimatetrivia_CategoryId.PR_MEGAFORCE.toString = $estr;
com_nick_ultimatetrivia_CategoryId.PR_MEGAFORCE.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.GAME_SHAKERS = ["GAME_SHAKERS",59];
com_nick_ultimatetrivia_CategoryId.GAME_SHAKERS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.GAME_SHAKERS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.HENRY_DANGER = ["HENRY_DANGER",60];
com_nick_ultimatetrivia_CategoryId.HENRY_DANGER.toString = $estr;
com_nick_ultimatetrivia_CategoryId.HENRY_DANGER.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.BELLA_BULLDOGS = ["BELLA_BULLDOGS",61];
com_nick_ultimatetrivia_CategoryId.BELLA_BULLDOGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.BELLA_BULLDOGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.N100_THINGS = ["N100_THINGS",62];
com_nick_ultimatetrivia_CategoryId.N100_THINGS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.N100_THINGS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.NRDD = ["NRDD",63];
com_nick_ultimatetrivia_CategoryId.NRDD.toString = $estr;
com_nick_ultimatetrivia_CategoryId.NRDD.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.WITS_ACADEMY = ["WITS_ACADEMY",64];
com_nick_ultimatetrivia_CategoryId.WITS_ACADEMY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.WITS_ACADEMY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.EVERY_WITCH_WAY = ["EVERY_WITCH_WAY",65];
com_nick_ultimatetrivia_CategoryId.EVERY_WITCH_WAY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.EVERY_WITCH_WAY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.SAM_AND_CAT = ["SAM_AND_CAT",66];
com_nick_ultimatetrivia_CategoryId.SAM_AND_CAT.toString = $estr;
com_nick_ultimatetrivia_CategoryId.SAM_AND_CAT.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.VICTORIOUS = ["VICTORIOUS",67];
com_nick_ultimatetrivia_CategoryId.VICTORIOUS.toString = $estr;
com_nick_ultimatetrivia_CategoryId.VICTORIOUS.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.ICARLY = ["ICARLY",68];
com_nick_ultimatetrivia_CategoryId.ICARLY.toString = $estr;
com_nick_ultimatetrivia_CategoryId.ICARLY.__enum__ = com_nick_ultimatetrivia_CategoryId;
com_nick_ultimatetrivia_CategoryId.__empty_constructs__ = [com_nick_ultimatetrivia_CategoryId.TEST1,com_nick_ultimatetrivia_CategoryId.FOOD,com_nick_ultimatetrivia_CategoryId.RATHER,com_nick_ultimatetrivia_CategoryId.COLOR,com_nick_ultimatetrivia_CategoryId.LOVE,com_nick_ultimatetrivia_CategoryId.FAMILY,com_nick_ultimatetrivia_CategoryId.FRIENDS,com_nick_ultimatetrivia_CategoryId.ENEMIES,com_nick_ultimatetrivia_CategoryId.EDUCATION,com_nick_ultimatetrivia_CategoryId.QUOTES,com_nick_ultimatetrivia_CategoryId.DWELLINGS,com_nick_ultimatetrivia_CategoryId.FIGHTING,com_nick_ultimatetrivia_CategoryId.JOBS,com_nick_ultimatetrivia_CategoryId.ANIMALS,com_nick_ultimatetrivia_CategoryId.CLOTHING,com_nick_ultimatetrivia_CategoryId.JOKES,com_nick_ultimatetrivia_CategoryId.GADGETS,com_nick_ultimatetrivia_CategoryId.TRANSPORTATION,com_nick_ultimatetrivia_CategoryId.MUSIC,com_nick_ultimatetrivia_CategoryId.TALENT,com_nick_ultimatetrivia_CategoryId.HAIR,com_nick_ultimatetrivia_CategoryId.GROSS,com_nick_ultimatetrivia_CategoryId.ANATOMY,com_nick_ultimatetrivia_CategoryId.NEIGHBORS,com_nick_ultimatetrivia_CategoryId.SPORTS,com_nick_ultimatetrivia_CategoryId.EVENTS,com_nick_ultimatetrivia_CategoryId.NAMES,com_nick_ultimatetrivia_CategoryId.THEME_SONGS,com_nick_ultimatetrivia_CategoryId.FEARS,com_nick_ultimatetrivia_CategoryId.BABIES,com_nick_ultimatetrivia_CategoryId.EYEBROWS,com_nick_ultimatetrivia_CategoryId.RESTAURANTS,com_nick_ultimatetrivia_CategoryId.DANCING,com_nick_ultimatetrivia_CategoryId.TECHNOLOGY,com_nick_ultimatetrivia_CategoryId.VACATIONS,com_nick_ultimatetrivia_CategoryId.SMELLS,com_nick_ultimatetrivia_CategoryId.CHRONOLOGY,com_nick_ultimatetrivia_CategoryId.SPACE,com_nick_ultimatetrivia_CategoryId.CLOSE_UPS,com_nick_ultimatetrivia_CategoryId.NUMBERS,com_nick_ultimatetrivia_CategoryId.SECRETS,com_nick_ultimatetrivia_CategoryId.LETTER_R,com_nick_ultimatetrivia_CategoryId.PLACES,com_nick_ultimatetrivia_CategoryId.FIRST_MEETINGS,com_nick_ultimatetrivia_CategoryId.BIG_THINGS,com_nick_ultimatetrivia_CategoryId.CATCHPHRASES,com_nick_ultimatetrivia_CategoryId.NUMBER_4,com_nick_ultimatetrivia_CategoryId.ROUND_STUFF,com_nick_ultimatetrivia_CategoryId.SHOWS_WITHIN_SHOWS,com_nick_ultimatetrivia_CategoryId.GREEN,com_nick_ultimatetrivia_CategoryId.IMPOSSIBLE,com_nick_ultimatetrivia_CategoryId.ARTS_CRAFTS,com_nick_ultimatetrivia_CategoryId.PERSONALITY,com_nick_ultimatetrivia_CategoryId.SPONGEBOB,com_nick_ultimatetrivia_CategoryId.TMNT,com_nick_ultimatetrivia_CategoryId.LOK_ATLA,com_nick_ultimatetrivia_CategoryId.HARVEY_BEAKS,com_nick_ultimatetrivia_CategoryId.PR_DINO_CHARGE,com_nick_ultimatetrivia_CategoryId.PR_MEGAFORCE,com_nick_ultimatetrivia_CategoryId.GAME_SHAKERS,com_nick_ultimatetrivia_CategoryId.HENRY_DANGER,com_nick_ultimatetrivia_CategoryId.BELLA_BULLDOGS,com_nick_ultimatetrivia_CategoryId.N100_THINGS,com_nick_ultimatetrivia_CategoryId.NRDD,com_nick_ultimatetrivia_CategoryId.WITS_ACADEMY,com_nick_ultimatetrivia_CategoryId.EVERY_WITCH_WAY,com_nick_ultimatetrivia_CategoryId.SAM_AND_CAT,com_nick_ultimatetrivia_CategoryId.VICTORIOUS,com_nick_ultimatetrivia_CategoryId.ICARLY];
var com_nick_ultimatetrivia_AnimationIds = $hxClasses["com.nick.ultimatetrivia.AnimationIds"] = { __ename__ : ["com","nick","ultimatetrivia","AnimationIds"], __constructs__ : ["Head_Idle","Atom","Broken_Hearts","Computer_Chip","Eye_Look","Eye_Projector","Earring","Flex_Arm","Head_HotDog","Head_Pizza","Head_Soda","Hearts","Mohawk","Monocle","Music_Notes","Mustache_Blue","Mustache_Brown","Mustache_Purple","Nose_Stud","Skull_Crossbones","Speech_Balloon_Exclaim","Speech_Balloon_Question","Stink_Lines"] };
com_nick_ultimatetrivia_AnimationIds.Head_Idle = ["Head_Idle",0];
com_nick_ultimatetrivia_AnimationIds.Head_Idle.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Head_Idle.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Atom = ["Atom",1];
com_nick_ultimatetrivia_AnimationIds.Atom.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Atom.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Broken_Hearts = ["Broken_Hearts",2];
com_nick_ultimatetrivia_AnimationIds.Broken_Hearts.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Broken_Hearts.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Computer_Chip = ["Computer_Chip",3];
com_nick_ultimatetrivia_AnimationIds.Computer_Chip.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Computer_Chip.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Eye_Look = ["Eye_Look",4];
com_nick_ultimatetrivia_AnimationIds.Eye_Look.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Eye_Look.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Eye_Projector = ["Eye_Projector",5];
com_nick_ultimatetrivia_AnimationIds.Eye_Projector.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Eye_Projector.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Earring = ["Earring",6];
com_nick_ultimatetrivia_AnimationIds.Earring.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Earring.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Flex_Arm = ["Flex_Arm",7];
com_nick_ultimatetrivia_AnimationIds.Flex_Arm.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Flex_Arm.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Head_HotDog = ["Head_HotDog",8];
com_nick_ultimatetrivia_AnimationIds.Head_HotDog.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Head_HotDog.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Head_Pizza = ["Head_Pizza",9];
com_nick_ultimatetrivia_AnimationIds.Head_Pizza.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Head_Pizza.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Head_Soda = ["Head_Soda",10];
com_nick_ultimatetrivia_AnimationIds.Head_Soda.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Head_Soda.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Hearts = ["Hearts",11];
com_nick_ultimatetrivia_AnimationIds.Hearts.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Hearts.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Mohawk = ["Mohawk",12];
com_nick_ultimatetrivia_AnimationIds.Mohawk.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Mohawk.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Monocle = ["Monocle",13];
com_nick_ultimatetrivia_AnimationIds.Monocle.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Monocle.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Music_Notes = ["Music_Notes",14];
com_nick_ultimatetrivia_AnimationIds.Music_Notes.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Music_Notes.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Mustache_Blue = ["Mustache_Blue",15];
com_nick_ultimatetrivia_AnimationIds.Mustache_Blue.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Mustache_Blue.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Mustache_Brown = ["Mustache_Brown",16];
com_nick_ultimatetrivia_AnimationIds.Mustache_Brown.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Mustache_Brown.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Mustache_Purple = ["Mustache_Purple",17];
com_nick_ultimatetrivia_AnimationIds.Mustache_Purple.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Mustache_Purple.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Nose_Stud = ["Nose_Stud",18];
com_nick_ultimatetrivia_AnimationIds.Nose_Stud.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Nose_Stud.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones = ["Skull_Crossbones",19];
com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim = ["Speech_Balloon_Exclaim",20];
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question = ["Speech_Balloon_Question",21];
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.Stink_Lines = ["Stink_Lines",22];
com_nick_ultimatetrivia_AnimationIds.Stink_Lines.toString = $estr;
com_nick_ultimatetrivia_AnimationIds.Stink_Lines.__enum__ = com_nick_ultimatetrivia_AnimationIds;
com_nick_ultimatetrivia_AnimationIds.__empty_constructs__ = [com_nick_ultimatetrivia_AnimationIds.Head_Idle,com_nick_ultimatetrivia_AnimationIds.Atom,com_nick_ultimatetrivia_AnimationIds.Broken_Hearts,com_nick_ultimatetrivia_AnimationIds.Computer_Chip,com_nick_ultimatetrivia_AnimationIds.Eye_Look,com_nick_ultimatetrivia_AnimationIds.Eye_Projector,com_nick_ultimatetrivia_AnimationIds.Earring,com_nick_ultimatetrivia_AnimationIds.Flex_Arm,com_nick_ultimatetrivia_AnimationIds.Head_HotDog,com_nick_ultimatetrivia_AnimationIds.Head_Pizza,com_nick_ultimatetrivia_AnimationIds.Head_Soda,com_nick_ultimatetrivia_AnimationIds.Hearts,com_nick_ultimatetrivia_AnimationIds.Mohawk,com_nick_ultimatetrivia_AnimationIds.Monocle,com_nick_ultimatetrivia_AnimationIds.Music_Notes,com_nick_ultimatetrivia_AnimationIds.Mustache_Blue,com_nick_ultimatetrivia_AnimationIds.Mustache_Brown,com_nick_ultimatetrivia_AnimationIds.Mustache_Purple,com_nick_ultimatetrivia_AnimationIds.Nose_Stud,com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones,com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim,com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question,com_nick_ultimatetrivia_AnimationIds.Stink_Lines];
var com_nick_ultimatetrivia_Data = function() { };
$hxClasses["com.nick.ultimatetrivia.Data"] = com_nick_ultimatetrivia_Data;
com_nick_ultimatetrivia_Data.__name__ = ["com","nick","ultimatetrivia","Data"];
com_nick_ultimatetrivia_Data.getHubAnimationsIds = function() {
	return [com_nick_ultimatetrivia_AnimationIds.Mohawk,com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim,com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question,com_nick_ultimatetrivia_AnimationIds.Broken_Hearts,com_nick_ultimatetrivia_AnimationIds.Computer_Chip,com_nick_ultimatetrivia_AnimationIds.Eye_Look,com_nick_ultimatetrivia_AnimationIds.Eye_Projector,com_nick_ultimatetrivia_AnimationIds.Earring,com_nick_ultimatetrivia_AnimationIds.Hearts,com_nick_ultimatetrivia_AnimationIds.Music_Notes,com_nick_ultimatetrivia_AnimationIds.Mustache_Blue,com_nick_ultimatetrivia_AnimationIds.Mustache_Brown,com_nick_ultimatetrivia_AnimationIds.Mustache_Purple,com_nick_ultimatetrivia_AnimationIds.Nose_Stud,com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones,com_nick_ultimatetrivia_AnimationIds.Stink_Lines,com_nick_ultimatetrivia_AnimationIds.Monocle,com_nick_ultimatetrivia_AnimationIds.Atom,com_nick_ultimatetrivia_AnimationIds.Flex_Arm];
};
com_nick_ultimatetrivia_Data.getAnimationId = function(catId) {
	var anim;
	switch(Type.enumIndex(catId)) {
	case 8:case 37:case 41:case 46:case 58:case 60:
		anim = com_nick_ultimatetrivia_AnimationIds.Atom;
		break;
	case 50:
		anim = com_nick_ultimatetrivia_AnimationIds.Broken_Hearts;
		break;
	case 12:case 16:case 33:case 42:case 68:case 59:
		anim = com_nick_ultimatetrivia_AnimationIds.Computer_Chip;
		break;
	case 17:case 38:case 43:
		anim = com_nick_ultimatetrivia_AnimationIds.Eye_Projector;
		break;
	case 5:case 14:case 65:
		anim = com_nick_ultimatetrivia_AnimationIds.Earring;
		break;
	case 57:case 24:case 22:case 11:case 61:
		anim = com_nick_ultimatetrivia_AnimationIds.Flex_Arm;
		break;
	case 1:case 31:case 63:
		anim = com_nick_ultimatetrivia_AnimationIds.Head_HotDog;
		break;
	case 10:case 25:case 54:
		anim = com_nick_ultimatetrivia_AnimationIds.Head_Pizza;
		break;
	case 39:case 44:case 48:
		anim = com_nick_ultimatetrivia_AnimationIds.Head_Soda;
		break;
	case 4:case 6:case 67:
		anim = com_nick_ultimatetrivia_AnimationIds.Hearts;
		break;
	case 19:case 20:case 49:case 56:
		anim = com_nick_ultimatetrivia_AnimationIds.Mohawk;
		break;
	case 26:case 64:
		anim = com_nick_ultimatetrivia_AnimationIds.Monocle;
		break;
	case 18:case 27:case 32:
		anim = com_nick_ultimatetrivia_AnimationIds.Music_Notes;
		break;
	case 13:case 40:case 55:
		anim = com_nick_ultimatetrivia_AnimationIds.Mustache_Blue;
		break;
	case 30:case 45:case 66:
		anim = com_nick_ultimatetrivia_AnimationIds.Mustache_Brown;
		break;
	case 3:
		anim = com_nick_ultimatetrivia_AnimationIds.Mustache_Purple;
		break;
	case 36:case 51:case 52:
		anim = com_nick_ultimatetrivia_AnimationIds.Nose_Stud;
		break;
	case 7:case 28:case 34:case 47:
		anim = com_nick_ultimatetrivia_AnimationIds.Skull_Crossbones;
		break;
	case 9:case 23:case 29:
		anim = com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim;
		break;
	case 2:case 62:
		anim = com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Question;
		break;
	case 15:case 21:case 35:case 53:
		anim = com_nick_ultimatetrivia_AnimationIds.Stink_Lines;
		break;
	case 0:
		anim = com_nick_ultimatetrivia_AnimationIds.Speech_Balloon_Exclaim;
		break;
	}
	return anim;
};
com_nick_ultimatetrivia_Data.getPropertyCategoryIds = function() {
	return [com_nick_ultimatetrivia_CategoryId.SPONGEBOB,com_nick_ultimatetrivia_CategoryId.TMNT,com_nick_ultimatetrivia_CategoryId.LOK_ATLA,com_nick_ultimatetrivia_CategoryId.HARVEY_BEAKS,com_nick_ultimatetrivia_CategoryId.PR_DINO_CHARGE,com_nick_ultimatetrivia_CategoryId.PR_MEGAFORCE,com_nick_ultimatetrivia_CategoryId.GAME_SHAKERS,com_nick_ultimatetrivia_CategoryId.HENRY_DANGER,com_nick_ultimatetrivia_CategoryId.BELLA_BULLDOGS,com_nick_ultimatetrivia_CategoryId.N100_THINGS,com_nick_ultimatetrivia_CategoryId.NRDD,com_nick_ultimatetrivia_CategoryId.WITS_ACADEMY,com_nick_ultimatetrivia_CategoryId.EVERY_WITCH_WAY,com_nick_ultimatetrivia_CategoryId.SAM_AND_CAT,com_nick_ultimatetrivia_CategoryId.VICTORIOUS,com_nick_ultimatetrivia_CategoryId.ICARLY];
};
com_nick_ultimatetrivia_Data.getTopicCategoryIds = function() {
	return [com_nick_ultimatetrivia_CategoryId.TEST1,com_nick_ultimatetrivia_CategoryId.FOOD,com_nick_ultimatetrivia_CategoryId.RATHER,com_nick_ultimatetrivia_CategoryId.COLOR,com_nick_ultimatetrivia_CategoryId.LOVE,com_nick_ultimatetrivia_CategoryId.FAMILY,com_nick_ultimatetrivia_CategoryId.FRIENDS,com_nick_ultimatetrivia_CategoryId.ENEMIES,com_nick_ultimatetrivia_CategoryId.EDUCATION,com_nick_ultimatetrivia_CategoryId.QUOTES,com_nick_ultimatetrivia_CategoryId.DWELLINGS,com_nick_ultimatetrivia_CategoryId.FIGHTING,com_nick_ultimatetrivia_CategoryId.JOBS,com_nick_ultimatetrivia_CategoryId.ANIMALS,com_nick_ultimatetrivia_CategoryId.CLOTHING,com_nick_ultimatetrivia_CategoryId.JOKES,com_nick_ultimatetrivia_CategoryId.GADGETS,com_nick_ultimatetrivia_CategoryId.TRANSPORTATION,com_nick_ultimatetrivia_CategoryId.MUSIC,com_nick_ultimatetrivia_CategoryId.TALENT,com_nick_ultimatetrivia_CategoryId.HAIR,com_nick_ultimatetrivia_CategoryId.GROSS,com_nick_ultimatetrivia_CategoryId.ANATOMY,com_nick_ultimatetrivia_CategoryId.NEIGHBORS,com_nick_ultimatetrivia_CategoryId.SPORTS,com_nick_ultimatetrivia_CategoryId.EVENTS,com_nick_ultimatetrivia_CategoryId.NAMES,com_nick_ultimatetrivia_CategoryId.THEME_SONGS,com_nick_ultimatetrivia_CategoryId.FEARS,com_nick_ultimatetrivia_CategoryId.BABIES,com_nick_ultimatetrivia_CategoryId.EYEBROWS,com_nick_ultimatetrivia_CategoryId.RESTAURANTS,com_nick_ultimatetrivia_CategoryId.DANCING,com_nick_ultimatetrivia_CategoryId.TECHNOLOGY,com_nick_ultimatetrivia_CategoryId.VACATIONS,com_nick_ultimatetrivia_CategoryId.SMELLS,com_nick_ultimatetrivia_CategoryId.CHRONOLOGY,com_nick_ultimatetrivia_CategoryId.SPACE,com_nick_ultimatetrivia_CategoryId.CLOSE_UPS,com_nick_ultimatetrivia_CategoryId.NUMBERS,com_nick_ultimatetrivia_CategoryId.SECRETS,com_nick_ultimatetrivia_CategoryId.LETTER_R,com_nick_ultimatetrivia_CategoryId.PLACES,com_nick_ultimatetrivia_CategoryId.FIRST_MEETINGS,com_nick_ultimatetrivia_CategoryId.BIG_THINGS,com_nick_ultimatetrivia_CategoryId.CATCHPHRASES,com_nick_ultimatetrivia_CategoryId.NUMBER_4,com_nick_ultimatetrivia_CategoryId.ROUND_STUFF,com_nick_ultimatetrivia_CategoryId.SHOWS_WITHIN_SHOWS,com_nick_ultimatetrivia_CategoryId.GREEN,com_nick_ultimatetrivia_CategoryId.IMPOSSIBLE,com_nick_ultimatetrivia_CategoryId.ARTS_CRAFTS,com_nick_ultimatetrivia_CategoryId.PERSONALITY];
};
com_nick_ultimatetrivia_Data.testCategoryNames = function() {
	var all = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
	var _g = 0;
	while(_g < all.length) {
		var cat = all[_g];
		++_g;
		if(s2_localization_Locale.getFormat("categoryNames." + Std.string(cat).toLowerCase()) == null) throw new js__$Boot_HaxeError("Missing: " + Std.string(cat));
	}
};
com_nick_ultimatetrivia_Data.getCategoryType = function(categoryId) {
	if(com_nick_ultimatetrivia_Data.getTopicCategoryIds().indexOf(categoryId) == -1) return com_nick_ultimatetrivia_components_QuizType.PROPERTY; else return com_nick_ultimatetrivia_components_QuizType.TOPIC;
};
com_nick_ultimatetrivia_Data.getCategoryIds = function(quizType) {
	if(quizType == null) return []; else if(quizType == com_nick_ultimatetrivia_components_QuizType.TOPIC) return com_nick_ultimatetrivia_Data.getTopicCategoryIds(); else return com_nick_ultimatetrivia_Data.getPropertyCategoryIds();
};
var flambe_util_Disposable = function() { };
$hxClasses["flambe.util.Disposable"] = flambe_util_Disposable;
flambe_util_Disposable.__name__ = ["flambe","util","Disposable"];
flambe_util_Disposable.prototype = {
	__class__: flambe_util_Disposable
};
var flambe_Component = function() {
	this._flags = 0;
	this.next = null;
	this.owner = null;
};
$hxClasses["flambe.Component"] = flambe_Component;
flambe_Component.__name__ = ["flambe","Component"];
flambe_Component.__interfaces__ = [flambe_util_Disposable];
flambe_Component.prototype = {
	onAdded: function() {
	}
	,onRemoved: function() {
	}
	,onStart: function() {
	}
	,onStop: function() {
	}
	,onUpdate: function(dt) {
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,get_name: function() {
		return null;
	}
	,__class__: flambe_Component
	,__properties__: {get_name:"get_name"}
};
var s2_util_IndexedItem = function(index,col,row,val) {
	if(row == null) row = -1;
	if(col == null) col = -1;
	flambe_Component.call(this);
	this.index = index;
	this.col = col;
	this.row = row;
	this.val = val;
};
$hxClasses["s2.util.IndexedItem"] = s2_util_IndexedItem;
s2_util_IndexedItem.__name__ = ["s2","util","IndexedItem"];
s2_util_IndexedItem.__super__ = flambe_Component;
s2_util_IndexedItem.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "IndexedItem_11";
	}
	,__class__: s2_util_IndexedItem
});
var com_nick_ultimatetrivia_Option = function(xNode,index) {
	s2_util_IndexedItem.call(this,index);
	var xText = xNode.firstChild();
	if(xText != null) this.text = StringTools.htmlUnescape(Std.string(xText) + ""); else this.text = null;
	if(this.text == "") this.text = null;
	this.image = xNode.get("image");
	if(this.image == "") this.image = null;
	com_nick_ultimatetrivia_Option.texts.push(this.text);
};
$hxClasses["com.nick.ultimatetrivia.Option"] = com_nick_ultimatetrivia_Option;
com_nick_ultimatetrivia_Option.__name__ = ["com","nick","ultimatetrivia","Option"];
com_nick_ultimatetrivia_Option.__super__ = s2_util_IndexedItem;
com_nick_ultimatetrivia_Option.prototype = $extend(s2_util_IndexedItem.prototype,{
	__class__: com_nick_ultimatetrivia_Option
});
var com_nick_ultimatetrivia_Query = function(xNode,solution,type,index) {
	this.optionChanged = new flambe_util_Signal0();
	s2_util_IndexedItem.call(this,index);
	this.text = Std.string(xNode.firstChild()) + "";
	if(this.text == "") this.text = null;
	this.image = xNode.get("image");
	if(this.image == "") this.image = null;
	this.type = type;
	this.solution = solution;
};
$hxClasses["com.nick.ultimatetrivia.Query"] = com_nick_ultimatetrivia_Query;
com_nick_ultimatetrivia_Query.__name__ = ["com","nick","ultimatetrivia","Query"];
com_nick_ultimatetrivia_Query.__super__ = s2_util_IndexedItem;
com_nick_ultimatetrivia_Query.prototype = $extend(s2_util_IndexedItem.prototype,{
	reset: function() {
		this.selectedOption = null;
	}
	,setSelected: function(option) {
		if(option != this.selectedOption) {
			this.selectedOption = option;
			this.optionChanged.emit();
		}
	}
	,get_isCorrect: function() {
		var retVal;
		var _g = this.type;
		switch(Type.enumIndex(_g)) {
		case 7:case 8:
			retVal = this.selectedOption != null;
			break;
		default:
			retVal = this.solution == this.selectedOption;
		}
		return retVal;
	}
	,get_hasSelectedOption: function() {
		return this.selectedOption != null;
	}
	,__class__: com_nick_ultimatetrivia_Query
	,__properties__: $extend(s2_util_IndexedItem.prototype.__properties__,{get_hasSelectedOption:"get_hasSelectedOption",get_isCorrect:"get_isCorrect"})
});
var com_nick_ultimatetrivia_QuestionType = $hxClasses["com.nick.ultimatetrivia.QuestionType"] = { __ename__ : ["com","nick","ultimatetrivia","QuestionType"], __constructs__ : ["CHOICE","BOOL","MATCH","MATCH_IMAGE","IMAGE","IMAGE_OPTION","AUDIO","RATHER","PERSONALITY_CHOICE"] };
com_nick_ultimatetrivia_QuestionType.CHOICE = ["CHOICE",0];
com_nick_ultimatetrivia_QuestionType.CHOICE.toString = $estr;
com_nick_ultimatetrivia_QuestionType.CHOICE.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.BOOL = ["BOOL",1];
com_nick_ultimatetrivia_QuestionType.BOOL.toString = $estr;
com_nick_ultimatetrivia_QuestionType.BOOL.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.MATCH = ["MATCH",2];
com_nick_ultimatetrivia_QuestionType.MATCH.toString = $estr;
com_nick_ultimatetrivia_QuestionType.MATCH.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE = ["MATCH_IMAGE",3];
com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE.toString = $estr;
com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.IMAGE = ["IMAGE",4];
com_nick_ultimatetrivia_QuestionType.IMAGE.toString = $estr;
com_nick_ultimatetrivia_QuestionType.IMAGE.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.IMAGE_OPTION = ["IMAGE_OPTION",5];
com_nick_ultimatetrivia_QuestionType.IMAGE_OPTION.toString = $estr;
com_nick_ultimatetrivia_QuestionType.IMAGE_OPTION.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.AUDIO = ["AUDIO",6];
com_nick_ultimatetrivia_QuestionType.AUDIO.toString = $estr;
com_nick_ultimatetrivia_QuestionType.AUDIO.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.RATHER = ["RATHER",7];
com_nick_ultimatetrivia_QuestionType.RATHER.toString = $estr;
com_nick_ultimatetrivia_QuestionType.RATHER.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE = ["PERSONALITY_CHOICE",8];
com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE.toString = $estr;
com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE.__enum__ = com_nick_ultimatetrivia_QuestionType;
com_nick_ultimatetrivia_QuestionType.__empty_constructs__ = [com_nick_ultimatetrivia_QuestionType.CHOICE,com_nick_ultimatetrivia_QuestionType.BOOL,com_nick_ultimatetrivia_QuestionType.MATCH,com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE,com_nick_ultimatetrivia_QuestionType.IMAGE,com_nick_ultimatetrivia_QuestionType.IMAGE_OPTION,com_nick_ultimatetrivia_QuestionType.AUDIO,com_nick_ultimatetrivia_QuestionType.RATHER,com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE];
var com_nick_ultimatetrivia_Question = function(xNode,category,index) {
	this._log = flambe_System.createLogger("");
	this.optionChanged = new flambe_util_Signal0();
	this.options = [];
	this.queries = [];
	this.index = index;
	this._xNode = xNode;
	this.category = category;
	if(this._xNode.elementsNamed("text").next() == null) throw new js__$Boot_HaxeError("Missing text node. Category: " + Std.string(category) + ", Node: \n\t" + Std.string(this._xNode));
	this.text = StringTools.htmlUnescape(Std.string(this._xNode.elementsNamed("text").next().firstChild()) + "");
	if(this._xNode.get("type") == null) throw new js__$Boot_HaxeError("Invalid type. Category: " + Std.string(category) + ", Node: \n\t" + Std.string(this._xNode));
	try {
		Type.createEnum(com_nick_ultimatetrivia_QuestionType,this._xNode.get("type").toUpperCase());
	} catch( msg ) {
		if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
		if( js_Boot.__instanceof(msg,String) ) {
			throw new js__$Boot_HaxeError("Invalid type. Category: " + Std.string(category) + ", Node: \n\t" + Std.string(this._xNode));
		} else throw(msg);
	}
	this.type = Type.createEnum(com_nick_ultimatetrivia_QuestionType,this._xNode.get("type").toUpperCase());
	this.image = this._xNode.get("image");
	this.sound = this._xNode.get("sound");
	if(this.image == "") this.image = null; else this.image = this.image;
	if(this.sound == "") this.sound = null; else this.sound = this.sound;
	com_nick_ultimatetrivia_Question.texts.push(this.text);
	var xOptions = this._xNode.elementsNamed("option");
	var xQueries = this._xNode.elementsNamed("query");
	if(!xOptions.hasNext()) {
		if(!this.permitOmittedOptions()) {
			this.logError("Omitted options.");
			var node1 = Xml.parse("<option>[MISSING OPTION] 1</option>").firstChild();
			this.options.push(new com_nick_ultimatetrivia_Option(node1,0));
			var node2 = Xml.parse("<option>[MISSING OPTION] 2</option>").firstChild();
			this.options.push(new com_nick_ultimatetrivia_Option(node2,1));
		} else {
			var nodeTrue = Xml.parse("<option>" + s2_localization_Locale.getFormat("question.true").text + "</option>").firstChild();
			this.options.push(new com_nick_ultimatetrivia_Option(nodeTrue,0));
			var nodeFalse = Xml.parse("<option>" + s2_localization_Locale.getFormat("question.false").text + "</option>").firstChild();
			this.options.push(new com_nick_ultimatetrivia_Option(nodeFalse,1));
		}
	} else {
		var i = 0;
		var option;
		while( xOptions.hasNext() ) {
			var xOption = xOptions.next();
			option = new com_nick_ultimatetrivia_Option(xOption,i);
			this.options.push(option);
			if(this.type == com_nick_ultimatetrivia_QuestionType.IMAGE_OPTION || this.type == com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE) {
				if(option.image == null) this.logError("'image' attribute required on option node: " + Std.string(xOption));
			} else if(option.text == null) this.throwError("Text required on option node: " + Std.string(xOption));
			if(i > 3) this.throwError("Too many options.");
			i++;
		}
	}
	var queriesBySolutionIndex = [];
	var index1 = 0;
	while( xQueries.hasNext() ) {
		var xQuery = xQueries.next();
		var solutionAttr = xQuery.get("solution");
		if(solutionAttr == null && !this.permitOmittedSolutionArribute()) this.throwError("Ommitted solution ID not permitted." + this.text);
		var solution;
		if(solutionAttr == null) solution = index1; else solution = Std.parseInt(solutionAttr) - 1;
		var query = new com_nick_ultimatetrivia_Query(xQuery,this.options[solution],this.type,index1);
		this.queries.push(query);
		if(this.type == com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE && query.image == null) this.logError("'image' attribute required on query node: " + Std.string(xQuery));
		if(queriesBySolutionIndex[solution] != null) this.throwError("Duplicate."); else queriesBySolutionIndex[solution] = query;
		index1++;
	}
	if(queriesBySolutionIndex.length > this.options.length) this.throwError("Solution index out of bounds (1 based).");
	if(this.queries.length == 0) this.queries.push(new com_nick_ultimatetrivia_Query(Xml.parse("<query></query>").firstChild(),this.options[0],this.type,0));
	var _g = 0;
	var _g1 = this.queries;
	while(_g < _g1.length) {
		var query1 = _g1[_g];
		++_g;
		query1.optionChanged.connect($bind(this,this.onQueryOptionChanged));
	}
	if(this.type == com_nick_ultimatetrivia_QuestionType.MATCH) {
		if(this.queries.length < 3) this.throwError("Insufficient number of queries.");
		if(this.options.length < 2) this.throwError("Insufficient number of options.");
	} else if(this.options.length < 2) this.logError("Insufficient number of options.");
	if(this.type == com_nick_ultimatetrivia_QuestionType.AUDIO && this.sound == null) this.logError("'sound' attribute missing.");
	if(this.type == com_nick_ultimatetrivia_QuestionType.IMAGE && this.image == null) this.logError("'image' attribute missing.");
};
$hxClasses["com.nick.ultimatetrivia.Question"] = com_nick_ultimatetrivia_Question;
com_nick_ultimatetrivia_Question.__name__ = ["com","nick","ultimatetrivia","Question"];
com_nick_ultimatetrivia_Question.prototype = {
	logError: function(str) {
		if(true) this._log.error(Std.string(this.category) + " ▩ " + Std.string(this.type) + " ▩ " + this.text + " ► " + str);
	}
	,throwError: function(str) {
		throw new js__$Boot_HaxeError(Std.string(this.category) + " ▩ " + Std.string(this.type) + " ▩ " + this.text + " ► " + str);
	}
	,onQueryOptionChanged: function() {
		this.optionChanged.emit();
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.queries;
		while(_g < _g1.length) {
			var query = _g1[_g];
			++_g;
			query.reset();
		}
	}
	,permitOmittedOptions: function() {
		var _g = this.type;
		switch(Type.enumIndex(_g)) {
		case 1:
			return true;
		default:
			return false;
		}
	}
	,permitOmittedSolutionArribute: function() {
		var _g = this.type;
		switch(Type.enumIndex(_g)) {
		case 0:case 4:case 6:case 7:case 2:case 3:case 5:case 8:
			return true;
		default:
			return false;
		}
	}
	,get_allAnswered: function() {
		var _g = 0;
		var _g1 = this.queries;
		while(_g < _g1.length) {
			var query = _g1[_g];
			++_g;
			if(!query.get_hasSelectedOption()) return false;
		}
		return true;
	}
	,allCorrect: function() {
		var _g = 0;
		var _g1 = this.queries;
		while(_g < _g1.length) {
			var query = _g1[_g];
			++_g;
			if(!query.get_isCorrect()) return false;
		}
		return true;
	}
	,__class__: com_nick_ultimatetrivia_Question
	,__properties__: {get_allAnswered:"get_allAnswered"}
};
var flambe_math_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe_math_Point;
flambe_math_Point.__name__ = ["flambe","math","Point"];
flambe_math_Point.prototype = {
	distanceTo: function(x,y) {
		return Math.sqrt(this.distanceToSquared(x,y));
	}
	,distanceToSquared: function(x,y) {
		var dx = this.x - x;
		var dy = this.y - y;
		return dx * dx + dy * dy;
	}
	,toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe_math_Point
};
var com_nick_ultimatetrivia_components_Brain = function(scenePack,brainPack) {
	this.message = new flambe_util_Signal2();
	this._hitAreas = new flambe_Entity();
	this._chunkContainer = new flambe_Entity();
	this._brainChunks = [];
	flambe_Component.call(this);
	this._scenePack = scenePack;
	this._brainPack = brainPack;
};
$hxClasses["com.nick.ultimatetrivia.components.Brain"] = com_nick_ultimatetrivia_components_Brain;
com_nick_ultimatetrivia_components_Brain.__name__ = ["com","nick","ultimatetrivia","components","Brain"];
com_nick_ultimatetrivia_components_Brain.generateAssetIds = function() {
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	com_nick_ultimatetrivia_components_Brain.layoutId = Math.floor(Math.random() * 3);
	var _g = new haxe_ds_StringMap();
	_g.set("empty",[]);
	_g.set("fills",[]);
	_g.set("lines",[]);
	com_nick_ultimatetrivia_components_Brain.assetIds = _g;
	var _g1 = 0;
	while(_g1 < 7) {
		var i = _g1++;
		com_nick_ultimatetrivia_components_Brain.assetIds.get("empty").push("brain/" + (com_nick_ultimatetrivia_components_Brain.layoutId + 1) + "/empty" + i);
		com_nick_ultimatetrivia_components_Brain.assetIds.get("lines").push("brain/" + (com_nick_ultimatetrivia_components_Brain.layoutId + 1) + "/lines" + i);
	}
	var traits = gt.getTopPsychTraits();
	console.log(traits);
	var catId;
	if(gt.testAssets) {
		var ids = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		var _g2 = 0;
		var _g11 = ids.length;
		while(_g2 < _g11) {
			var i1 = _g2++;
			catId = ids[i1];
			com_nick_ultimatetrivia_components_Brain.assetIds.get("fills").push("fills/" + Std.string(catId));
		}
	} else {
		var _g21 = 0;
		var _g12 = traits.length;
		while(_g21 < _g12) {
			var i2 = _g21++;
			catId = traits[i2].categoryId;
			com_nick_ultimatetrivia_components_Brain.assetIds.get("fills").push("fills/" + Std.string(catId));
		}
	}
};
com_nick_ultimatetrivia_components_Brain.getMaskedTexture = function(image,mask,destX,destY) {
	if(destY == null) destY = 0;
	if(destX == null) destX = 0;
	var texture = flambe_System.get_renderer().createTexture(image.get_width(),image.get_height());
	var graphics = texture.get_graphics();
	graphics.save();
	graphics.drawTexture(image,0,0);
	graphics.setBlendMode(flambe_display_BlendMode.Mask);
	graphics.drawTexture(mask,destX,destY);
	graphics.restore();
	return texture;
};
com_nick_ultimatetrivia_components_Brain.__super__ = flambe_Component;
com_nick_ultimatetrivia_components_Brain.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Brain_16";
	}
	,onAdded: function() {
		var _g1 = this;
		flambe_Component.prototype.onAdded.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var timeUtil;
		var component1 = this.owner.getComponent("TimeUtil_2");
		timeUtil = component1;
		if(timeUtil == null) this.owner.add(timeUtil = new s2_util_TimeUtil());
		var hubAnimationIds = com_nick_ultimatetrivia_Data.getHubAnimationsIds();
		var gt;
		var component2 = flambe_System.root.getComponent("GameTracker_8");
		gt = component2;
		var catIds = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		if(gt.testAssets) {
			var _g11 = 0;
			var _g = catIds.length;
			while(_g11 < _g) {
				var i = _g11++;
				this._brainPack.getTexture("fills/" + Std.string(catIds[i]));
			}
		}
		var _g12 = 0;
		var _g2 = catIds.length;
		while(_g12 < _g2) {
			var i1 = _g12++;
			s2_localization_Locale.getFormat("brainHub.trait_" + Std.string(catIds[i1]).toLowerCase());
		}
		var animationsIds = Type.allEnums(com_nick_ultimatetrivia_AnimationIds);
		animationsIds.splice(animationsIds.indexOf(com_nick_ultimatetrivia_AnimationIds.Head_Idle),1);
		var c_chunkContainer = new flambe_display_Sprite();
		c_chunkContainer.setXY(com_nick_ultimatetrivia_components_Brain._brainXY.x,com_nick_ultimatetrivia_components_Brain._brainXY.y);
		this._chunkContainer = new flambe_Entity().add(c_chunkContainer);
		this.owner.addChild(this._chunkContainer);
		var c_chunk;
		var posesX = [];
		var posesY = [];
		posesX[0] = [238,157,52,141,-12,74,-52];
		posesY[0] = [77,105,117,6,34,-51,-40];
		posesX[1] = [254,109,87,189,132,16,-29];
		posesY[1] = [72,98,19,-22,-60,-56,-4];
		posesX[2] = [249,168,197,-52,68,127,-19];
		posesY[2] = [77,101,-17,32,51,-83,-64];
		var c_lines;
		var _g3 = 0;
		while(_g3 < 7) {
			var i2 = _g3++;
			c_chunk = new flambe_display_ImageSprite(this._brainPack.getTexture(com_nick_ultimatetrivia_components_Brain.assetIds.get("empty")[i2]));
			c_chunk.setXY(posesX[com_nick_ultimatetrivia_components_Brain.layoutId][i2],posesY[com_nick_ultimatetrivia_components_Brain.layoutId][i2]);
			this._brainChunks[i2] = new flambe_Entity().add(c_chunk);
			this._chunkContainer.addChild(this._brainChunks[i2]);
			c_lines = new flambe_display_ImageSprite(this._brainPack.getTexture(com_nick_ultimatetrivia_components_Brain.assetIds.get("lines")[i2]));
			this._brainChunks[i2].addChild(new flambe_Entity().add(c_lines));
		}
		var traits = gt.getTopPsychTraits();
		var derp = 0.6;
		var arr = [5,3,4,1,2,0,6];
		var _g13 = 0;
		var _g4 = traits.length;
		while(_g13 < _g4) {
			var i3 = _g13++;
			if(i3 >= this._brainChunks.length) break;
			var str = Std.string(traits[i3].categoryId);
			var mask = this._brainPack.getTexture(com_nick_ultimatetrivia_components_Brain.assetIds.get("empty")[com_nick_ultimatetrivia_components_Brain._sizeOrder[com_nick_ultimatetrivia_components_Brain.layoutId].indexOf(i3)]);
			var texture = this._brainPack.getTexture("fills/" + str);
			var masked = com_nick_ultimatetrivia_components_Brain.getMaskedTexture(texture,mask,0,0);
			var c_masked = new flambe_display_ImageSprite(masked);
			c_masked.set_pixelSnapping(false);
			c_masked.setXY(posesX[com_nick_ultimatetrivia_components_Brain.layoutId][com_nick_ultimatetrivia_components_Brain._sizeOrder[com_nick_ultimatetrivia_components_Brain.layoutId].indexOf(i3)],posesY[com_nick_ultimatetrivia_components_Brain.layoutId][com_nick_ultimatetrivia_components_Brain._sizeOrder[com_nick_ultimatetrivia_components_Brain.layoutId].indexOf(i3)]);
			c_masked.x.set_behavior(new flambe_animation_Sine(c_masked.x.get__() - derp,c_masked.x.get__() + derp,Math.random() * 0.2 + 0.6));
			c_masked.y.set_behavior(new flambe_animation_Sine(c_masked.y.get__() - derp,c_masked.y.get__() + derp,Math.random() * 0.2 + 0.6));
			this._brainChunks[com_nick_ultimatetrivia_components_Brain._sizeOrder[com_nick_ultimatetrivia_components_Brain.layoutId].indexOf(i3)].add(c_masked);
		}
		var lib = new flambe_swf_Library(this._scenePack,"lib");
		var id = "HitAreas" + (com_nick_ultimatetrivia_components_Brain.layoutId + 1);
		var c_hitAreas = lib.createMovie("HitAreas" + (com_nick_ultimatetrivia_components_Brain.layoutId + 1));
		c_hitAreas.alpha.set__(0.0);
		c_hitAreas.setXY(com_nick_ultimatetrivia_components_Brain._brainXY.x,com_nick_ultimatetrivia_components_Brain._brainXY.y);
		this._hitAreas.add(c_hitAreas);
		var buttonMode;
		var _g5 = 0;
		while(_g5 < 7) {
			var i4 = [_g5++];
			((function(i4) {
				return function() {
					var index = i4[0];
					var layId = com_nick_ultimatetrivia_components_Brain.layoutId;
					buttonMode = new s2_display_ButtonMode();
					c_hitAreas.getLayer("hitArea" + i4[0]).add(buttonMode);
					disposer.connect1(buttonMode.engaged,(function() {
						return function(_) {
							_g1.onChunkClicked(com_nick_ultimatetrivia_components_Brain._sizeOrder[layId][index],index);
						};
					})());
				};
			})(i4))();
		}
		this.owner.addChild(this._hitAreas);
	}
	,onChunkClicked: function(index,order) {
		var gt;
		var component2 = flambe_System.root.getComponent("GameTracker_8");
		gt = component2;
		var traits = gt.getTopPsychTraits();
		var traitScore = traits[index];
		var categoryId = null;
		var locId;
		var hitArea = Std.instance(this._hitAreas.getComponent("Sprite_3"),flambe_swf_MovieSprite).getLayer("hitArea" + order);
		var hitBounds = flambe_display_Sprite.getBounds(hitArea);
		var pX = Math.round(hitBounds.x + hitBounds.width / 2) + ((function($this) {
			var $r;
			var component = $this._hitAreas.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x.get__();
		var pY = Math.round(hitBounds.y + hitBounds.height / 2) + ((function($this) {
			var $r;
			var component1 = $this._hitAreas.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).y.get__();
		if(traitScore != null) categoryId = traitScore.categoryId;
		if(categoryId != null) locId = "brainHub.trait_" + Std.string(categoryId).toLowerCase(); else locId = "brainHub.emptyBrainSection_" + index;
		this.message.emit(locId,new flambe_math_Point(pX,pY));
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		this._brainPack = null;
		this._scenePack = null;
	}
	,__class__: com_nick_ultimatetrivia_components_Brain
});
var s2_display_SpriteUser = function(manageSprite) {
	if(manageSprite == null) manageSprite = true;
	flambe_Component.call(this);
	this.manageSprite = manageSprite;
};
$hxClasses["s2.display.SpriteUser"] = s2_display_SpriteUser;
s2_display_SpriteUser.__name__ = ["s2","display","SpriteUser"];
s2_display_SpriteUser.__super__ = flambe_Component;
s2_display_SpriteUser.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "SpriteUser_0";
	}
	,ensureSprite: function() {
		if(this.owner != null) {
			if((function($this) {
				var $r;
				var component = $this.owner.getComponent("Sprite_3");
				$r = component;
				return $r;
			}(this)) != null) {
				if(this.manageSprite && this._sprite != null && this._sprite != (function($this) {
					var $r;
					var component1 = $this.owner.getComponent("Sprite_3");
					$r = component1;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("If sprite is managed internally, it must not be overwritten.");
				var component2 = this.owner.getComponent("Sprite_3");
				this._sprite = component2;
			}
		}
		if(this._sprite == null) {
			if(this.manageSprite) this._sprite = this.createSprite(); else throw new js__$Boot_HaxeError("If the sprite is not managed internally, it must be added to the owner already.");
		}
		if(this.owner != null) {
			if((function($this) {
				var $r;
				var component3 = $this.owner.getComponent("Sprite_3");
				$r = component3;
				return $r;
			}(this)) == null) this.owner.add(this._sprite);
		}
		return this._sprite;
	}
	,createSprite: function() {
		var sprite = new flambe_display_Sprite();
		return sprite;
	}
	,onAdded: function() {
		if(this.manageSprite && (function($this) {
			var $r;
			var component = $this.owner.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this)) != null) throw new js__$Boot_HaxeError("If the sprite is managed internally, it cannot already exist on this entity because it would be overwritten.");
		this.ensureSprite();
		flambe_Component.prototype.onAdded.call(this);
	}
	,onRemoved: function() {
		flambe_Component.prototype.onRemoved.call(this);
		if(this.manageSprite) {
			if(this._sprite != null && this._sprite.owner != null) this._sprite.owner.remove(this._sprite);
		}
	}
	,setXY: function(x,y) {
		this.ensureSprite().setXY(x,y);
		return this;
	}
	,get_x: function() {
		return this.ensureSprite().x;
	}
	,get_y: function() {
		return this.ensureSprite().y;
	}
	,get_sprite: function() {
		return this.ensureSprite();
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		this._sprite = null;
	}
	,__class__: s2_display_SpriteUser
	,__properties__: $extend(flambe_Component.prototype.__properties__,{get_sprite:"get_sprite",get_y:"get_y",get_x:"get_x"})
});
var com_nick_ultimatetrivia_components_BrainChunkCallout = function(pack) {
	this.hide = new flambe_util_Signal0();
	this._panelHolder = new flambe_Entity();
	this._message = new flambe_Entity();
	this._messageOverlay = new flambe_Entity();
	this._panelRt = new flambe_Entity();
	this._panelLt = new flambe_Entity();
	s2_display_SpriteUser.call(this);
	this._pack = pack;
};
$hxClasses["com.nick.ultimatetrivia.components.BrainChunkCallout"] = com_nick_ultimatetrivia_components_BrainChunkCallout;
com_nick_ultimatetrivia_components_BrainChunkCallout.__name__ = ["com","nick","ultimatetrivia","components","BrainChunkCallout"];
com_nick_ultimatetrivia_components_BrainChunkCallout.__super__ = s2_display_SpriteUser;
com_nick_ultimatetrivia_components_BrainChunkCallout.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var c_messageOverlay = new flambe_display_FillSprite(10027008,1366,768);
		c_messageOverlay.alpha.set__(0.0);
		this._messageOverlay.add(c_messageOverlay);
		this.owner.addChild(this._messageOverlay);
		var c_panelLt = new flambe_display_ImageSprite(this._pack.getTexture("chunk_callout"));
		c_panelLt.scaleX.set__(-1);
		c_panelLt.disablePointer();
		c_panelLt.setAnchor(40,10);
		this._panelLt.add(c_panelLt);
		this._panelHolder.addChild(this._panelLt);
		var c_panelRt = new flambe_display_ImageSprite(this._pack.getTexture("chunk_callout"));
		c_panelRt.disablePointer();
		c_panelRt.setAnchor(40,10);
		this._panelRt.add(c_panelRt);
		this._panelHolder.addChild(this._panelRt);
		var c_panelHolder = new flambe_display_Sprite();
		this._panelHolder.add(c_panelHolder);
		this.owner.addChild(this._panelHolder);
		var c_message = s2_localization_Locale.getField("brainHub.brainSectionCallout",350,flambe_display_TextAlign.Center);
		c_message.lineSpacing.set__(-1);
		this._message.add(c_message);
		c_message.disablePointer();
		this._panelHolder.addChild(this._message);
		this.get_sprite().alpha.set__(0);
		this.get_sprite().set_pointerEnabled(false);
		disposer.connect1(this.get_sprite().get_pointerDown(),$bind(this,this.onPointerDown));
	}
	,show: function(messageLoc,p) {
		this._pack.getSound("sfx/brain_pop_up").play();
		var c_message = Std.instance(this._message.getComponent("Sprite_3"),flambe_display_TextSprite);
		c_message.set_text(s2_localization_Locale.getFormat(messageLoc).text);
		var lrCuttoff = 750;
		var isLeft = p.x > lrCuttoff;
		((function($this) {
			var $r;
			var component = $this._panelLt.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.set__(isLeft?1:0);
		((function($this) {
			var $r;
			var component1 = $this._panelRt.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).alpha.set__(isLeft?0:1);
		c_message.x.set__(isLeft?-428:80);
		c_message.y.set__(112 - flambe_display_Sprite.getBounds(this._message).height / 2);
		var c_panelHolder;
		var component2 = this._panelHolder.getComponent("Sprite_3");
		c_panelHolder = component2;
		c_panelHolder.setXY(p.x,p.y);
		c_panelHolder.scaleY.set__(0.5);
		c_panelHolder.scaleX.set__(0.5);
		c_panelHolder.scaleX.animateTo(1,0.5,flambe_animation_Ease.bounceOut);
		c_panelHolder.scaleY.animateTo(1,0.5,flambe_animation_Ease.bounceOut);
		this.get_sprite().set_pointerEnabled(true);
		this.get_sprite().alpha.animateTo(1,0.0);
	}
	,onPointerDown: function(e) {
		this.get_sprite().alpha.animateTo(0,0);
		this.get_sprite().disablePointer();
		this.hide.emit();
	}
	,onRemoved: function() {
		this._panelLt = null;
		this._panelRt = null;
		this._panelHolder = null;
		this._messageOverlay = null;
		this._message = null;
		this._pack = null;
		s2_display_SpriteUser.prototype.onRemoved.call(this);
	}
	,__class__: com_nick_ultimatetrivia_components_BrainChunkCallout
});
var com_nick_ultimatetrivia_components_Confetti = function(globalPack) {
	s2_display_SpriteUser.call(this);
	this._globalPack = globalPack;
};
$hxClasses["com.nick.ultimatetrivia.components.Confetti"] = com_nick_ultimatetrivia_components_Confetti;
com_nick_ultimatetrivia_components_Confetti.__name__ = ["com","nick","ultimatetrivia","components","Confetti"];
com_nick_ultimatetrivia_components_Confetti.__super__ = s2_display_SpriteUser;
com_nick_ultimatetrivia_components_Confetti.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		s2_display_SpriteUser.prototype.onAdded.call(this);
		this.get_sprite().disablePointer();
		var disposer = new flambe_Disposer();
		this.owner.add(disposer);
		var c_confetti;
		var seq = new flambe_script_Sequence();
		this._targRot = Math.random() * 360;
		this._targX = Math.random() * 1366;
		this.get_sprite().rotation.set__(this._targRot);
		this.get_x().set__(this._targX + Math.random() * 20 - 10);
		this.get_y().set__(Math.random() * 768);
		this.get_sprite().rotation.set__(this._targRot + Math.random() * 20 + 10);
		this.owner.add(new flambe_script_Script());
		var timeUtil = new s2_util_TimeUtil();
		this.owner.add(timeUtil);
		var seq1 = new flambe_script_Sequence();
		seq1.add(new flambe_script_AnimateTo(this.get_x(),this._targX + Math.random() * 20,Math.random() * 3));
		seq1.add(new flambe_script_CallFunction($bind(this,this.ltRt)));
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(seq1);
		this.animateDown();
	}
	,ltRt: function() {
		var seq = new flambe_script_Sequence();
		seq.add(new flambe_script_AnimateTo(this.get_x(),this._targX - 20,2.0,flambe_animation_Ease.sineInOut));
		seq.add(new flambe_script_AnimateTo(this.get_x(),this._targX + 20,2.0,flambe_animation_Ease.sineInOut));
		var repeat = new flambe_script_Repeat(seq);
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(repeat);
		var seq1 = new flambe_script_Sequence();
		seq1.add(new flambe_script_AnimateTo(this.get_sprite().rotation,this._targRot - 20,2.0,flambe_animation_Ease.sineInOut));
		seq1.add(new flambe_script_AnimateTo(this.get_sprite().rotation,this._targRot + 20,2.0,flambe_animation_Ease.sineInOut));
		var repeat1 = new flambe_script_Repeat(seq1);
		((function($this) {
			var $r;
			var component1 = $this.owner.getComponent("Script_5");
			$r = component1;
			return $r;
		}(this))).run(repeat1);
	}
	,animateDown: function() {
		var _g = this;
		var reset = function() {
			_g.get_y().set__(0);
			_g.animateDown();
		};
		var seq = new flambe_script_Sequence();
		var time = (768 - this.get_y().get__()) * 0.01 * (Math.random() * 0.75 + 0.5);
		seq.add(new flambe_script_AnimateTo(this.get_y(),768,time));
		seq.add(new flambe_script_CallFunction(reset));
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(seq);
	}
	,createSprite: function() {
		var sprite = new flambe_display_ImageSprite(this._globalPack.getTexture("confetti/confetti_" + Math.floor(Math.random() * 5)));
		sprite.centerAnchor();
		return sprite;
	}
	,__class__: com_nick_ultimatetrivia_components_Confetti
});
var com_nick_ultimatetrivia_components_ConfettiLayer = function(globalPack) {
	this._confetti = [];
	flambe_Component.call(this);
	this._globalPack = globalPack;
};
$hxClasses["com.nick.ultimatetrivia.components.ConfettiLayer"] = com_nick_ultimatetrivia_components_ConfettiLayer;
com_nick_ultimatetrivia_components_ConfettiLayer.__name__ = ["com","nick","ultimatetrivia","components","ConfettiLayer"];
com_nick_ultimatetrivia_components_ConfettiLayer.__super__ = flambe_Component;
com_nick_ultimatetrivia_components_ConfettiLayer.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "ConfettiLayer_12";
	}
	,onAdded: function() {
		var disposer = new flambe_Disposer();
		this.owner.add(disposer);
		var c_confetti;
		var _g = 0;
		while(_g < 50) {
			var i = _g++;
			c_confetti = new com_nick_ultimatetrivia_components_Confetti(this._globalPack);
			this._confetti[i] = new flambe_Entity();
			this._confetti[i].add(c_confetti);
			this.owner.addChild(this._confetti[i]);
		}
	}
	,__class__: com_nick_ultimatetrivia_components_ConfettiLayer
});
var com_nick_ultimatetrivia_components_Fling2 = function(target) {
	this._moveDisposer = new flambe_Disposer();
	this._dragged = false;
	this._offsetY = 0;
	this._offsetX = 0;
	this._by = 0;
	this._bx = 0;
	this._vy = 0;
	this._vx = 0;
	s2_display_SpriteUser.call(this,false);
	this._target = target;
};
$hxClasses["com.nick.ultimatetrivia.components.Fling2"] = com_nick_ultimatetrivia_components_Fling2;
com_nick_ultimatetrivia_components_Fling2.__name__ = ["com","nick","ultimatetrivia","components","Fling2"];
com_nick_ultimatetrivia_components_Fling2.__super__ = s2_display_SpriteUser;
com_nick_ultimatetrivia_components_Fling2.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		s2_display_SpriteUser.prototype.onAdded.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		disposer.connect1(this.get_sprite().get_pointerDown(),$bind(this,this.mDown));
		disposer.connect1(flambe_System.get_pointer().up,$bind(this,this.mUp));
	}
	,mDown: function(e) {
		this._dragged = true;
		this._start = ((function($this) {
			var $r;
			var component = $this._target.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x.get__();
		this._moveDisposer.connect1(flambe_System.get_pointer().move,$bind(this,this.mMove));
		this._offsetX = ((function($this) {
			var $r;
			var component1 = $this._target.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).x.get__() - e.viewX;
		this._offsetY = ((function($this) {
			var $r;
			var component2 = $this._target.getComponent("Sprite_3");
			$r = component2;
			return $r;
		}(this))).y.get__() - e.viewY;
	}
	,mUp: function(e) {
		this._dragged = false;
		this._moveDisposer.dispose();
	}
	,mMove: function(e) {
		((function($this) {
			var $r;
			var component = $this._target.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x.set__(e.viewX + this._offsetX);
		this._vx = flambe_System.get_pointer().get_x() - this._bx;
		this._vy = flambe_System.get_pointer().get_y() - this._by;
		this._bx = flambe_System.get_pointer().get_x();
		this._by = flambe_System.get_pointer().get_y();
	}
	,onUpdate: function(dt) {
		s2_display_SpriteUser.prototype.onUpdate.call(this,dt);
		if(!this._dragged) {
			if(this._vx != 0) {
				var _g;
				_g = ((function($this) {
					var $r;
					var component = $this._target.getComponent("Sprite_3");
					$r = component;
					return $r;
				}(this))).x;
				_g.set__(_g.get__() + this._vx);
			}
			this._vx *= 0.94;
			this._vy *= 0.94;
		}
	}
	,get_dist: function() {
		return Math.abs(this._start - ((function($this) {
			var $r;
			var component = $this._target.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x.get__());
	}
	,__class__: com_nick_ultimatetrivia_components_Fling2
	,__properties__: $extend(s2_display_SpriteUser.prototype.__properties__,{get_dist:"get_dist"})
});
var com_nick_ultimatetrivia_components_QuizType = $hxClasses["com.nick.ultimatetrivia.components.QuizType"] = { __ename__ : ["com","nick","ultimatetrivia","components","QuizType"], __constructs__ : ["PROPERTY","TOPIC"] };
com_nick_ultimatetrivia_components_QuizType.PROPERTY = ["PROPERTY",0];
com_nick_ultimatetrivia_components_QuizType.PROPERTY.toString = $estr;
com_nick_ultimatetrivia_components_QuizType.PROPERTY.__enum__ = com_nick_ultimatetrivia_components_QuizType;
com_nick_ultimatetrivia_components_QuizType.TOPIC = ["TOPIC",1];
com_nick_ultimatetrivia_components_QuizType.TOPIC.toString = $estr;
com_nick_ultimatetrivia_components_QuizType.TOPIC.__enum__ = com_nick_ultimatetrivia_components_QuizType;
com_nick_ultimatetrivia_components_QuizType.__empty_constructs__ = [com_nick_ultimatetrivia_components_QuizType.PROPERTY,com_nick_ultimatetrivia_components_QuizType.TOPIC];
var com_nick_ultimatetrivia_components_GameTracker = function() {
	this.testAssets = false;
	this._sessionScoreRecord = [];
	this._log = flambe_System.createLogger("GameTracker");
	this._manifests = new haxe_ds_EnumValueMap();
	this.progressed = new flambe_util_Signal0();
	this.optionChanged = new flambe_util_Signal0();
	this.inited = false;
	this.randomQuizMode = false;
	flambe_Component.call(this);
};
$hxClasses["com.nick.ultimatetrivia.components.GameTracker"] = com_nick_ultimatetrivia_components_GameTracker;
com_nick_ultimatetrivia_components_GameTracker.__name__ = ["com","nick","ultimatetrivia","components","GameTracker"];
com_nick_ultimatetrivia_components_GameTracker.sortScoreRecord = function(record) {
	var animationIds = Type.allEnums(com_nick_ultimatetrivia_AnimationIds);
	var _g1 = 0;
	var _g = record.length;
	while(_g1 < _g) {
		var i = _g1++;
		var fromTop = animationIds.length - (record.length - (i + 1));
		var adjustment = fromTop / animationIds.length * 0.5 + 0.5;
		record[i].adjPct = adjustment * record[i].percent;
	}
	var adjustedRecord = record.concat([]);
	adjustedRecord.sort(com_nick_ultimatetrivia_components_GameTracker.sortScores);
	return adjustedRecord;
};
com_nick_ultimatetrivia_components_GameTracker.sortScores = function(a,b) {
	if(a.adjPct < b.adjPct) return 1; else return -1;
};
com_nick_ultimatetrivia_components_GameTracker.__super__ = flambe_Component;
com_nick_ultimatetrivia_components_GameTracker.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "GameTracker_8";
	}
	,getCategoryIds: function() {
		var retVal = com_nick_ultimatetrivia_Data.getCategoryIds(this.quizType);
		var index = retVal.length;
		var catId;
		var _g1 = 0;
		var _g = retVal.length;
		while(_g1 < _g) {
			var i = _g1++;
			index--;
			catId = retVal[index];
			if(!this._categories.exists(catId)) {
				console.log("Removing: " + Std.string(catId));
				retVal.splice(index,1);
			}
		}
		return retVal;
	}
	,init: function(xml) {
		this.inited = true;
		this._xDoc = Xml.parse(xml.toString());
		var url = s2_util_URLParser.fromBrowser();
		this.testAssets = url.query.exists("testassets");
		com_nick_ultimatetrivia_Data.testCategoryNames();
		this._categories = this.readCategories();
		var $it0 = this._categories.keys();
		while( $it0.hasNext() ) {
			var catId = $it0.next();
			if(com_nick_ultimatetrivia_Data.getCategoryType(catId) == com_nick_ultimatetrivia_components_QuizType.TOPIC && this._categories.get(catId).length != 10) this._log.error(Std.string(catId) + " has " + this._categories.get(catId).length + " questions. Should have 10.");
			if(com_nick_ultimatetrivia_Data.getCategoryType(catId) == com_nick_ultimatetrivia_components_QuizType.PROPERTY && this._categories.get(catId).length != 50) this._log.error(Std.string(catId) + " has " + this._categories.get(catId).length + " questions. Should have 50.");
		}
		var sortLongest = function(a,b) {
			if(a.length < b.length) return 1; else return -1;
		};
		var categories = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		var numCategories = 0;
		var rec = flambe_System.get_storage().get("score_record","");
		var arr;
		if(rec.length == 0) arr = []; else arr = rec.split(",");
		var nPct;
		var sPct;
		var id;
		var traitScore;
		var enums = Type.getEnumConstructs(com_nick_ultimatetrivia_CategoryId);
		var _g = 0;
		while(_g < arr.length) {
			var scoreStr = arr[_g];
			++_g;
			var len = scoreStr.indexOf(":");
			id = HxOverrides.substr(scoreStr,0,len);
			var pos = scoreStr.indexOf(":") + 1;
			sPct = HxOverrides.substr(scoreStr,pos,null);
			nPct = Std.parseFloat(sPct);
			if(enums.indexOf(id) != -1) {
				traitScore = { categoryId : Type.createEnum(com_nick_ultimatetrivia_CategoryId,id), percent : nPct, adjPct : -1};
				this._sessionScoreRecord.push(traitScore);
			} else console.log("Unknown CategoryId: " + id);
		}
		this._sessionScoreRecordAdjusted = com_nick_ultimatetrivia_components_GameTracker.sortScoreRecord(this._sessionScoreRecord);
		var _g1 = 0;
		while(_g1 < categories.length) {
			var category = categories[_g1];
			++_g1;
			numCategories++;
			var type;
			if(com_nick_ultimatetrivia_Data.getCategoryType(category) == com_nick_ultimatetrivia_components_QuizType.TOPIC) type = "t_"; else type = "p_";
			var value = flambe_asset_Manifest.fromAssets("assets_" + type + Std.string(category).toLowerCase());
			this._manifests.set(category,value);
		}
	}
	,readCategories: function() {
		var retVal = new haxe_ds_EnumValueMap();
		var fDoc = new haxe_xml_Fast(this._xDoc.firstChild());
		var $it0 = fDoc.get_elements();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var aCategory = [];
			var cat = Type.createEnum(com_nick_ultimatetrivia_CategoryId,child.att.resolve("id").toUpperCase());
			var oQuestion;
			var i = 0;
			var $it1 = child.get_elements();
			while( $it1.hasNext() ) {
				var xQuestion = $it1.next();
				oQuestion = new com_nick_ultimatetrivia_Question(xQuestion.x,cat,i);
				oQuestion.optionChanged.connect($bind(this,this.onOptionChanged));
				aCategory.push(oQuestion);
				i++;
			}
			retVal.set(cat,aCategory);
		}
		var _g = 0;
		var _g1 = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		while(_g < _g1.length) {
			var cat1 = _g1[_g];
			++_g;
			if(!retVal.exists(cat1) && cat1 != com_nick_ultimatetrivia_CategoryId.TEST1) throw new js__$Boot_HaxeError("Missing: " + Std.string(cat1));
		}
		return retVal;
	}
	,getAvailableAnimations: function() {
		var anims = [];
		var anim = null;
		var _g = 0;
		var _g1 = this._sessionScoreRecord;
		while(_g < _g1.length) {
			var traitScore = _g1[_g];
			++_g;
			anim = com_nick_ultimatetrivia_Data.getAnimationId(traitScore.categoryId);
			if(anims.indexOf(anim) == -1) anims.push(anim);
		}
		return anims;
	}
	,onOptionChanged: function() {
		this.optionChanged.emit();
	}
	,getCategories: function() {
		var retval = new haxe_ds_EnumValueMap();
		var $it0 = this._categories.keys();
		while( $it0.hasNext() ) {
			var catId = $it0.next();
			var value = this._categories.get(catId).concat([]);
			retval.set(catId,value);
		}
		return retval;
	}
	,generateQuestions: function(categoryId) {
		this.questionIndex = -1;
		this.category = categoryId;
		this._questions = this._categories.get(categoryId).concat([]);
		if(this.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY) this._questions.sort(s2_util_Utils.sortArrayRandom);
		if(this._questions == null) throw new js__$Boot_HaxeError("Category " + Std.string(categoryId) + " in not in questions.xml.");
		var _g = 0;
		var _g1 = this._questions;
		while(_g < _g1.length) {
			var question = _g1[_g];
			++_g;
			question.reset();
		}
	}
	,get_numCorrect: function() {
		var retVal = 0;
		var _g = 0;
		var _g1 = this.get_questions();
		while(_g < _g1.length) {
			var question = _g1[_g];
			++_g;
			if(question.allCorrect()) retVal++;
		}
		return retVal;
	}
	,get_numStrikes: function() {
		var retVal = 0;
		var _g = 0;
		var _g1 = this.get_questions();
		while(_g < _g1.length) {
			var question = _g1[_g];
			++_g;
			if(question.get_allAnswered() && !question.allCorrect()) retVal++;
		}
		return retVal;
	}
	,get_numQuestions: function() {
		return this._questions.length;
	}
	,nextQuestion: function() {
		this.questionIndex++;
		var retVal = this._questions[this.questionIndex];
		this.progressed.emit();
		return retVal;
	}
	,get_questions: function() {
		return this._questions.concat([]);
	}
	,reset: function() {
		this.category = null;
		this.quizType = null;
	}
	,finishQuiz: function() {
		var percent = this.get_numCorrect() / (this.questionIndex + 1);
		if(this.isPersonalityQuiz()) percent *= 0.6;
		var fixedPct = Math.round(percent * 100) / 100;
		var j = this._sessionScoreRecord.length - 1;
		var _g1 = 0;
		var _g = this._sessionScoreRecord.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._sessionScoreRecord[j].categoryId == this.category) this._sessionScoreRecord.splice(j,1);
			j--;
		}
		this._sessionScoreRecord.push({ categoryId : this.category, percent : fixedPct, adjPct : -1});
		this._sessionScoreRecordAdjusted = com_nick_ultimatetrivia_components_GameTracker.sortScoreRecord(this._sessionScoreRecord);
		var str = "";
		var _g2 = 0;
		var _g11 = this._sessionScoreRecord;
		while(_g2 < _g11.length) {
			var score = _g11[_g2];
			++_g2;
			str += "," + Std.string(score.categoryId) + ":" + score.percent;
		}
		str = HxOverrides.substr(str,1,null);
		flambe_System.get_storage().set("score_record",str);
		flambe_System.get_storage().set(Std.string(this.category),str);
	}
	,getTopPsychTraits: function() {
		return this._sessionScoreRecordAdjusted.concat([]);
	}
	,setQuizType: function(quizType,random) {
		this.quizType = quizType;
		this.randomQuizMode = random;
	}
	,isPersonalityQuiz: function() {
		if(this.category == com_nick_ultimatetrivia_CategoryId.RATHER || this.category == com_nick_ultimatetrivia_CategoryId.PERSONALITY) return true; else return false;
	}
	,get_failed: function() {
		return this.get_numStrikes() > 2 && this.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY;
	}
	,__class__: com_nick_ultimatetrivia_components_GameTracker
	,__properties__: $extend(flambe_Component.prototype.__properties__,{get_failed:"get_failed",get_questions:"get_questions",get_numQuestions:"get_numQuestions",get_numStrikes:"get_numStrikes",get_numCorrect:"get_numCorrect"})
});
var com_nick_ultimatetrivia_components_Head = function(scenePack,brainPack) {
	this._animationIndex = -1;
	this.soundDisposer = new flambe_Disposer();
	this._animationOver = new flambe_Entity();
	this._animationUnder = new flambe_Entity();
	this._brain = new flambe_Entity();
	this._head = new flambe_Entity();
	this._animations = new haxe_ds_EnumValueMap();
	flambe_Component.call(this);
	this._scenePack = scenePack;
	this._brainPack = brainPack;
};
$hxClasses["com.nick.ultimatetrivia.components.Head"] = com_nick_ultimatetrivia_components_Head;
com_nick_ultimatetrivia_components_Head.__name__ = ["com","nick","ultimatetrivia","components","Head"];
com_nick_ultimatetrivia_components_Head.__super__ = flambe_Component;
com_nick_ultimatetrivia_components_Head.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Head_15";
	}
	,onAdded: function() {
		flambe_Component.prototype.onAdded.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var timeUtil;
		var component1 = this.owner.getComponent("TimeUtil_2");
		timeUtil = component1;
		if(timeUtil == null) this.owner.add(timeUtil = new s2_util_TimeUtil());
		var hubAnimationIds = com_nick_ultimatetrivia_Data.getHubAnimationsIds();
		var lib = new flambe_swf_Library(this._scenePack,"lib");
		var gt;
		var component2 = flambe_System.root.getComponent("GameTracker_8");
		gt = component2;
		var catIds = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		var testAnimationsIds = Type.allEnums(com_nick_ultimatetrivia_AnimationIds);
		testAnimationsIds.splice(testAnimationsIds.indexOf(com_nick_ultimatetrivia_AnimationIds.Head_Idle),1);
		if(gt.testAssets) {
			var _g1 = 0;
			var _g = testAnimationsIds.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._scenePack.getSound("sfx/animations/animation_" + Std.string(testAnimationsIds[i]).toLowerCase());
			}
		}
		this.owner.addChild(this._animationUnder);
		var c_headAnimations = new flambe_swf_MoviePlayer(lib);
		c_headAnimations.loop(Std.string(com_nick_ultimatetrivia_AnimationIds.Head_Idle));
		this._head.add(c_headAnimations);
		this.owner.addChild(this._head);
		var brain = new com_nick_ultimatetrivia_components_Brain(this._scenePack,this._brainPack);
		this._brain.add(brain);
		this.owner.addChild(this._brain);
		this.owner.addChild(this._animationOver);
		var e_anim;
		var c_anim;
		var _g2 = 0;
		while(_g2 < hubAnimationIds.length) {
			var hubAnimationId = hubAnimationIds[_g2];
			++_g2;
			e_anim = new flambe_Entity();
			var c_anim1 = lib.createMovie(Std.string(hubAnimationId));
			c_anim1.set_paused(true);
			c_anim1.set_visible(false);
			c_anim1.disablePointer();
			e_anim.add(c_anim1);
			this._animations.set(hubAnimationId,e_anim);
			if(hubAnimationId == com_nick_ultimatetrivia_AnimationIds.Mohawk) this._animationUnder.addChild(e_anim); else this._animationOver.addChild(e_anim);
		}
		this._animationIds = gt.getAvailableAnimations();
		this._animationIds.sort(s2_util_Utils.sortArrayRandom);
		this._animationIds.push(com_nick_ultimatetrivia_AnimationIds.Eye_Look);
		var numAnims = Type.allEnums(com_nick_ultimatetrivia_AnimationIds).length;
		this._animationIndex = 0;
		var adj = (numAnims - this._animationIds.length) * 0.2;
		this._animationTiming = new flambe_animation_AnimatedFloat(6 + adj);
		timeUtil.timeout($bind(this,this.nextAnimation),1);
	}
	,nextAnimation: function() {
		var _g = this;
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		var disposer;
		var component1 = this.owner.getComponent("Disposer_9");
		disposer = component1;
		if(this._animationIndex == this._animationIds.length - 1) this._animationIndex = 0; else this._animationIndex = this._animationIndex + 1;
		this._currAnimation = this._animationIds[this._animationIndex];
		var sSoundId = "sfx/animations/animation_" + Std.string(this._currAnimation).toLowerCase();
		if(com_nick_ultimatetrivia_Data.getHubAnimationsIds().indexOf(this._currAnimation) != -1) {
			var animation = this._animations.get(this._currAnimation);
			var c_animation = Std.instance(animation.getComponent("Sprite_3"),flambe_swf_MovieSprite);
			c_animation.set_paused(false);
			c_animation.set_visible(true);
			var animationTime = 3;
			if(this._currAnimation == com_nick_ultimatetrivia_AnimationIds.Atom || this._currAnimation == com_nick_ultimatetrivia_AnimationIds.Flex_Arm) {
				if(Math.random() < .5) {
					if(Math.random() < .5) {
						c_animation.x.set__(0);
						c_animation.x.animateTo(1366,animationTime);
					} else {
						c_animation.x.set__(1366);
						c_animation.x.animateTo(0,animationTime);
					}
					c_animation.y.set__(Math.random() * 768);
					c_animation.y.animateTo(Math.random() * 768,animationTime);
				} else {
					if(Math.random() < .5) {
						c_animation.y.set__(0);
						c_animation.y.animateTo(768,animationTime);
					} else {
						c_animation.y.set__(768);
						c_animation.y.animateTo(0,animationTime);
					}
					c_animation.x.set__(Math.random() * 1366);
					c_animation.x.animateTo(Math.random() * 1366,animationTime);
				}
				var snd = this._snd = this._scenePack.getSound(sSoundId).loop();
				this.soundDisposer.add(this._snd);
				((function($this) {
					var $r;
					var component2 = $this.owner.getComponent("TimeUtil_2");
					$r = component2;
					return $r;
				}(this))).timeout(function() {
					snd.dispose();
					c_animation.set_paused(true);
					c_animation.set_position(0);
					c_animation.set_visible(false);
				},animationTime);
			} else {
				this._snd = this._scenePack.getSound(sSoundId).play();
				this.soundDisposer.add(this._snd);
				var _g1 = this._currAnimation;
				switch(Type.enumIndex(_g1)) {
				case 12:case 11:
					this._snd.volume.set__(0.6);
					break;
				default:
				}
				disposer.connect0(c_animation.get_looped(),function() {
					c_animation.set_paused(true);
					c_animation.set_position(0);
					c_animation.set_visible(false);
				});
			}
			((function($this) {
				var $r;
				var component3 = $this.owner.getComponent("TimeUtil_2");
				$r = component3;
				return $r;
			}(this))).timeout($bind(this,this.nextAnimation),this._animationTiming.get__());
		} else if(!this._headPlaying) {
			this._snd = this._scenePack.getSound(sSoundId).play();
			this.soundDisposer.add(this._snd);
			this._headPlaying = true;
			((function($this) {
				var $r;
				var component4 = $this._head.getComponent("MoviePlayer_17");
				$r = component4;
				return $r;
			}(this))).play(Std.string(this._currAnimation));
			((function($this) {
				var $r;
				var component5 = $this._head.getComponent("MoviePlayer_17");
				$r = component5;
				return $r;
			}(this))).movie.get__().disablePointer();
			disposer.connect0(((function($this) {
				var $r;
				var component6 = $this._head.getComponent("MoviePlayer_17");
				$r = component6;
				return $r;
			}(this))).movie.get__().get_looped(),function() {
				_g._headPlaying = false;
			});
			((function($this) {
				var $r;
				var component7 = $this.owner.getComponent("TimeUtil_2");
				$r = component7;
				return $r;
			}(this))).timeout($bind(this,this.nextAnimation),this._animationTiming.get__());
		} else this.nextAnimation();
	}
	,get_brain: function() {
		var component = this._brain.getComponent("Brain_16");
		return component;
	}
	,onUpdate: function(dt) {
		flambe_Component.prototype.onUpdate.call(this,dt);
		this._animationTiming.update(dt);
	}
	,disposeSoundsBeforeUnloadingAssets: function() {
		this.soundDisposer.dispose();
	}
	,onRemoved: function() {
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("TimeUtil_2");
			$r = component;
			return $r;
		}(this))).clearAll();
		flambe_Component.prototype.onRemoved.call(this);
	}
	,onPause: function() {
		this.soundDisposer.dispose();
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		this._scenePack = null;
		this._brainPack = null;
	}
	,__class__: com_nick_ultimatetrivia_components_Head
	,__properties__: $extend(flambe_Component.prototype.__properties__,{get_brain:"get_brain"})
});
var com_nick_ultimatetrivia_components_Heading = function(globalPack,locale) {
	this._text = new flambe_Entity();
	this._icon = new flambe_Entity();
	this._banner = new flambe_Entity();
	s2_display_SpriteUser.call(this);
	this._globalPack = globalPack;
	this._locale = locale;
};
$hxClasses["com.nick.ultimatetrivia.components.Heading"] = com_nick_ultimatetrivia_components_Heading;
com_nick_ultimatetrivia_components_Heading.__name__ = ["com","nick","ultimatetrivia","components","Heading"];
com_nick_ultimatetrivia_components_Heading.__super__ = s2_display_SpriteUser;
com_nick_ultimatetrivia_components_Heading.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		var disposer = new flambe_Disposer();
		this.owner.add(disposer);
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		this.get_sprite().disablePointer();
		var c_banner = new flambe_display_ImageSprite(this._globalPack.getTexture("head_banner"));
		c_banner.setXY(183,103);
		this._banner.add(c_banner);
		this.owner.addChild(this._banner);
		var c_icon;
		if(gt.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY && gt.category != null) {
			c_icon = new flambe_display_ImageSprite(this._globalPack.getTexture("icons/" + Std.string(gt.category).toLowerCase()));
			c_icon.setScale(0.75);
		} else c_icon = new flambe_display_ImageSprite(this._globalPack.getTexture("icons/brain_coin"));
		c_icon.setXY(73,0);
		this._icon.add(c_icon);
		this._banner.addChild(this._icon);
		var c_text = s2_localization_Locale.getField("global.heading",0,flambe_display_TextAlign.Center);
		if(s2_localization_Locale.hasField(this._locale)) c_text.set_text(s2_localization_Locale.getFormat(this._locale).text.toUpperCase());
		c_text.x.set__(673);
		this._text.add(c_text);
		while(flambe_display_Sprite.getBounds(this._text).width > 500) c_text.setScale(c_text.scaleX.get__() - 0.01);
		c_text.y.set__(172 - flambe_display_Sprite.getBounds(this._text).height / 2);
		this.owner.addChild(this._text);
	}
	,onResize: function() {
	}
	,onRemoved: function() {
		s2_display_SpriteUser.prototype.onRemoved.call(this);
	}
	,dispose: function() {
		s2_display_SpriteUser.prototype.dispose.call(this);
	}
	,__class__: com_nick_ultimatetrivia_components_Heading
});
var com_nick_ultimatetrivia_components_Hud = function(pack) {
	this._numStrikes = new flambe_Entity();
	this._numCorrect = new flambe_Entity();
	this._box1 = new flambe_Entity();
	this._box0 = new flambe_Entity();
	flambe_Component.call(this);
	this._pack = pack;
};
$hxClasses["com.nick.ultimatetrivia.components.Hud"] = com_nick_ultimatetrivia_components_Hud;
com_nick_ultimatetrivia_components_Hud.__name__ = ["com","nick","ultimatetrivia","components","Hud"];
com_nick_ultimatetrivia_components_Hud.__super__ = flambe_Component;
com_nick_ultimatetrivia_components_Hud.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Hud_13";
	}
	,onAdded: function() {
		var disposer = new flambe_Disposer();
		this.owner.add(disposer);
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		if(!gt.isPersonalityQuiz()) {
			var c_box0 = new flambe_display_ImageSprite(this._pack.getTexture("stat_box"));
			this._box0.add(c_box0);
			c_box0.setScale(0.72);
			c_box0.setXY(1074,210);
			this.owner.addChild(this._box0);
			var c_numCorrectLabel = s2_localization_Locale.getField("question.numCorrectLabel",0,flambe_display_TextAlign.Center);
			c_numCorrectLabel.setXY(86,5);
			this._box0.addChild(new flambe_Entity().add(c_numCorrectLabel));
			var c_numCorrect = s2_localization_Locale.getField("question.numCorrect",0,flambe_display_TextAlign.Center);
			c_numCorrect.setXY(86,32);
			this._numCorrect.add(c_numCorrect);
			this._box0.addChild(this._numCorrect);
		}
		if(gt.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY) {
			var c_box1 = new flambe_display_ImageSprite(this._pack.getTexture("stat_box"));
			this._box1.add(c_box1);
			c_box1.setScale(0.72);
			c_box1.setXY(1074,299);
			this.owner.addChild(this._box1);
			var c_numStrikesLabel = s2_localization_Locale.getField("question.numStrikesLabel",0,flambe_display_TextAlign.Center);
			c_numStrikesLabel.setXY(86,5);
			this._box1.addChild(new flambe_Entity().add(c_numStrikesLabel));
			var c_numStrikes = s2_localization_Locale.getField("question.numStrikes",0,flambe_display_TextAlign.Center);
			c_numStrikes.setXY(86,32);
			this._numStrikes.add(c_numStrikes);
			this._box1.addChild(this._numStrikes);
		}
		this.updateFields();
		disposer.connect0(gt.optionChanged,$bind(this,this.onOptionChange));
		disposer.connect0(gt.progressed,$bind(this,this.onOptionChange));
	}
	,updateFields: function() {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		if(Std.instance(this._numCorrect.getComponent("Sprite_3"),flambe_display_TextSprite) != null) {
			var c_numCorrect = Std.instance(this._numCorrect.getComponent("Sprite_3"),flambe_display_TextSprite);
			c_numCorrect.set_text(s2_util_StringUtil.zeroPad(gt.get_numCorrect(),2));
		}
		if(Std.instance(this._numStrikes.getComponent("Sprite_3"),flambe_display_TextSprite) != null) {
			var c_numStrikes = Std.instance(this._numStrikes.getComponent("Sprite_3"),flambe_display_TextSprite);
			var exes = "";
			var _g1 = 0;
			var _g = gt.get_numStrikes();
			while(_g1 < _g) {
				var i = _g1++;
				exes += "X";
			}
			c_numStrikes.set_text(exes);
		}
	}
	,onOptionChange: function() {
		this.updateFields();
	}
	,onResize: function() {
	}
	,__class__: com_nick_ultimatetrivia_components_Hud
});
var s2_ui_BasicButton = function(pack,id,nIndex) {
	if(nIndex == null) nIndex = -1;
	this.index = -1;
	this.hitArea = new flambe_Entity();
	this.maxScale = s2_ui_BasicButton.staticMaxScale;
	this.minScale = s2_ui_BasicButton.staticMinScale;
	this._pointerIn = false;
	this.offsetY = s2_ui_BasicButton.staticOffsetY;
	this.offsetX = s2_ui_BasicButton.staticOffsetX;
	this._stateHolder = new flambe_Entity();
	this._overlay = new flambe_Entity();
	s2_display_SpriteUser.call(this);
	this._pack = pack;
	this._id = id;
	this.index = nIndex;
	var c_stateHolder = new flambe_display_Sprite();
	c_stateHolder.setScale(this.minScale);
	this._stateHolder.add(c_stateHolder);
	this.createStates();
	this.createHitArea();
};
$hxClasses["s2.ui.BasicButton"] = s2_ui_BasicButton;
s2_ui_BasicButton.__name__ = ["s2","ui","BasicButton"];
s2_ui_BasicButton.__super__ = s2_display_SpriteUser;
s2_ui_BasicButton.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		s2_display_SpriteUser.prototype.onAdded.call(this);
		this.owner.addChild(this._stateHolder);
		this.owner.addChild(this.hitArea);
		var disposer;
		this.owner.add(disposer = new flambe_Disposer());
		var c_hitArea;
		var component = this.hitArea.getComponent("Sprite_3");
		c_hitArea = component;
		disposer.connect1(c_hitArea.get_pointerIn(),$bind(this,this.onPointerIn));
		disposer.connect1(c_hitArea.get_pointerDown(),$bind(this,this.onPointerDown));
		disposer.connect1(c_hitArea.get_pointerOut(),$bind(this,this.onPointerOut));
		disposer.connect1(c_hitArea.get_pointerUp(),$bind(this,this.onPointerUp));
		this.owner.add(new s2_util_TimeUtil());
	}
	,createStates: function() {
		var outTexture = this._pack.getTexture(this._id,false);
		var downTexture = this._pack.getTexture(this._id + "_down",false);
		var overTexture = this._pack.getTexture(this._id + "_over",false);
		var outState = null;
		var downState = null;
		var overState = null;
		if(outTexture != null) {
			outState = this.instanceState(outTexture);
			outState.disablePointer();
			outState.centerAnchor();
		} else throw new js__$Boot_HaxeError("'" + this._id + "' not found.");
		if(overTexture != null) {
			overState = this.instanceState(overTexture);
			overState.disablePointer();
			overState.centerAnchor();
			overState.set_visible(false);
		}
		if(downTexture != null) {
			downState = this.instanceState(downTexture);
			downState.disablePointer();
			downState.centerAnchor();
			downState.set_visible(false);
		}
		this.addStates(outState,overState,downState);
	}
	,instanceState: function(texture) {
		return new flambe_display_ImageSprite(texture);
	}
	,addStates: function(c_imageOut,c_imageOver,c_imageDown) {
		this._imageOut = new flambe_Entity();
		this._imageOut.add(c_imageOut);
		this._stateHolder.addChild(this._imageOut);
		if(c_imageOver != null) {
			this._imageOver = new flambe_Entity();
			this._imageOver.add(c_imageOver);
			this._stateHolder.addChild(this._imageOver);
		}
		if(c_imageDown != null) {
			this._imageDown = new flambe_Entity();
			this._imageDown.add(c_imageDown);
			this._stateHolder.addChild(this._imageDown);
		}
		this._stateHolder.addChild(this._overlay);
	}
	,get_overlay: function() {
		return this._overlay;
	}
	,createHitArea: function() {
		var buttonMode;
		var component = this.hitArea.getComponent("ButtonMode_1");
		buttonMode = component;
		var c_imageOut;
		var component1 = this._imageOut.getComponent("Sprite_3");
		c_imageOut = component1;
		var c_hitArea = new flambe_display_FillSprite(21760,c_imageOut.getNaturalWidth(),c_imageOut.getNaturalHeight());
		c_hitArea.alpha.set__(0.0);
		c_hitArea.centerAnchor();
		this.hitArea.add(c_hitArea);
		if(buttonMode == null) this.hitArea.add(buttonMode = new s2_display_ButtonMode(this.index)); else buttonMode.updateSprite();
	}
	,onPointerIn: function(e) {
		this._pointerIn = true;
		var c_stateHolder;
		var component = this._stateHolder.getComponent("Sprite_3");
		c_stateHolder = component;
		var c_imageOut;
		var component1 = this._imageOut.getComponent("Sprite_3");
		c_imageOut = component1;
		if(this._imageOver != null) {
			var c_imageOver;
			var component2 = this._imageOver.getComponent("Sprite_3");
			c_imageOver = component2;
			c_imageOver.set_visible(true);
			c_imageOut.set_visible(false);
		}
		c_stateHolder.scaleX.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
		c_stateHolder.scaleY.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
	}
	,onPointerDown: function(e) {
		var c_stateHolder;
		var component = this._stateHolder.getComponent("Sprite_3");
		c_stateHolder = component;
		var c_imageOut;
		var component1 = this._imageOut.getComponent("Sprite_3");
		c_imageOut = component1;
		c_stateHolder.setXY(this.offsetX,this.offsetY);
		if(this._imageDown != null) {
			var c_imageDown;
			var component2 = this._imageDown.getComponent("Sprite_3");
			c_imageDown = component2;
			c_imageDown.set_visible(true);
			if(this._imageOver != null) {
				var c_imageOver;
				var component3 = this._imageOver.getComponent("Sprite_3");
				c_imageOver = component3;
				c_imageOver.set_visible(false);
			} else c_imageOut.set_visible(false);
		}
		c_stateHolder.scaleX.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
		c_stateHolder.scaleY.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
	}
	,onPointerUp: function(e) {
		if(this._pointerIn) this.up();
	}
	,up: function() {
		var c_stateHolder;
		var component = this._stateHolder.getComponent("Sprite_3");
		c_stateHolder = component;
		var c_imageOut;
		var component1 = this._imageOut.getComponent("Sprite_3");
		c_imageOut = component1;
		c_stateHolder.setXY(0,0);
		if(this._imageDown != null) {
			var c_imageDown;
			var component2 = this._imageDown.getComponent("Sprite_3");
			c_imageDown = component2;
			c_imageDown.set_visible(false);
		}
		if(this._imageOver != null) {
			var c_imageOver;
			var component3 = this._imageOver.getComponent("Sprite_3");
			c_imageOver = component3;
			c_imageOver.set_visible(true);
		} else c_imageOut.set_visible(true);
		c_stateHolder.scaleX.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
		c_stateHolder.scaleY.animateTo(this.maxScale,.3,flambe_animation_Ease.backOut);
	}
	,onPointerOut: function(e) {
		var c_stateHolder;
		var component = this._stateHolder.getComponent("Sprite_3");
		c_stateHolder = component;
		var c_imageOut;
		var component1 = this._imageOut.getComponent("Sprite_3");
		c_imageOut = component1;
		c_stateHolder.setXY(0,0);
		c_imageOut.set_visible(true);
		if(this._imageOver != null) ((function($this) {
			var $r;
			var component2 = $this._imageOver.getComponent("Sprite_3");
			$r = component2;
			return $r;
		}(this))).set_visible(false);
		if(this._imageDown != null) ((function($this) {
			var $r;
			var component3 = $this._imageDown.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).set_visible(false);
		c_stateHolder.scaleX.animateTo(this.minScale,.3,flambe_animation_Ease.backOut);
		c_stateHolder.scaleY.animateTo(this.minScale,.3,flambe_animation_Ease.backOut);
		this._pointerIn = false;
	}
	,get_engaged: function() {
		return ((function($this) {
			var $r;
			var component = $this.hitArea.getComponent("ButtonMode_1");
			$r = component;
			return $r;
		}(this))).engaged;
	}
	,get_buttonMode: function() {
		var component = this.hitArea.getComponent("ButtonMode_1");
		return component;
	}
	,dispose: function() {
		s2_display_SpriteUser.prototype.dispose.call(this);
		this.hitArea = null;
		this._stateHolder = null;
		this._imageOut = null;
		this._imageOver = null;
		this._imageDown = null;
		this._overlay = null;
		this._pack = null;
	}
	,__class__: s2_ui_BasicButton
	,__properties__: $extend(s2_display_SpriteUser.prototype.__properties__,{get_buttonMode:"get_buttonMode",get_engaged:"get_engaged",get_overlay:"get_overlay"})
});
var s2_ui_TextButton = function(pack,id,loc) {
	this._offsetXY = new flambe_math_Point(s2_ui_TextButton.OFFSET_XY.x,s2_ui_TextButton.OFFSET_XY.y);
	this._loc = loc;
	this._textSprite = this.createField();
	s2_ui_BasicButton.call(this,pack,id);
	this._overlay.add(this._textSprite);
	this.setText(this.get_text());
};
$hxClasses["s2.ui.TextButton"] = s2_ui_TextButton;
s2_ui_TextButton.__name__ = ["s2","ui","TextButton"];
s2_ui_TextButton.__super__ = s2_ui_BasicButton;
s2_ui_TextButton.prototype = $extend(s2_ui_BasicButton.prototype,{
	onAdded: function() {
		s2_ui_BasicButton.prototype.onAdded.call(this);
		this._stateHolder.addChild(this._overlay);
	}
	,createField: function() {
		return s2_localization_Locale.getField(this._loc,0);
	}
	,setText: function(val,offset) {
		if(offset == null) this._offsetXY = new flambe_math_Point(this._offsetXY.x,this._offsetXY.y); else this._offsetXY = new flambe_math_Point(offset.x,offset.y);
		var c_textSprite = Std.instance(this._overlay.getComponent("Sprite_3"),flambe_display_TextSprite);
		if(val != null) c_textSprite.set_text(val);
		var textXY = new flambe_math_Point(-c_textSprite.getNaturalWidth() * c_textSprite.scaleX.get__() / 2,-c_textSprite.getNaturalHeight() * c_textSprite.scaleY.get__() / 2);
		c_textSprite.x.set__(textXY.x + this._offsetXY.x);
		c_textSprite.y.set__(textXY.y + this._offsetXY.y);
		return val;
	}
	,get_text: function() {
		return Std.instance(this._overlay.getComponent("Sprite_3"),flambe_display_TextSprite).get_text();
	}
	,get_textSprite: function() {
		return Std.instance(this._overlay.getComponent("Sprite_3"),flambe_display_TextSprite);
	}
	,dispose: function() {
		s2_ui_BasicButton.prototype.dispose.call(this);
		this._textSprite = null;
		this._overlay = null;
	}
	,__class__: s2_ui_TextButton
	,__properties__: $extend(s2_ui_BasicButton.prototype.__properties__,{get_textSprite:"get_textSprite",get_text:"get_text"})
});
var com_nick_ultimatetrivia_components_QuizButton = function(pack,id,loc) {
	s2_ui_TextButton.call(this,pack,id,loc);
};
$hxClasses["com.nick.ultimatetrivia.components.QuizButton"] = com_nick_ultimatetrivia_components_QuizButton;
com_nick_ultimatetrivia_components_QuizButton.__name__ = ["com","nick","ultimatetrivia","components","QuizButton"];
com_nick_ultimatetrivia_components_QuizButton.__super__ = s2_ui_TextButton;
com_nick_ultimatetrivia_components_QuizButton.prototype = $extend(s2_ui_TextButton.prototype,{
	createField: function() {
		return s2_localization_Locale.getField(this._loc,0,flambe_display_TextAlign.Center);
	}
	,__class__: com_nick_ultimatetrivia_components_QuizButton
});
var com_nick_ultimatetrivia_components_question_QuestionDisplay = function(scenePack,quizPack,globalPack,question) {
	this._order = [0,1,2,3];
	this.transitionedOut = new flambe_util_Signal1();
	this._lightBurst = new flambe_Entity();
	this._options = [];
	this._feedback = new flambe_Entity();
	this._text = new flambe_Entity();
	s2_display_SpriteUser.call(this);
	this._scenePack = scenePack;
	this._globalPack = globalPack;
	this._quizPack = quizPack;
	this._oQuestion = question;
	this._order = this._order.slice(0,question.options.length);
	if(question.type != com_nick_ultimatetrivia_QuestionType.BOOL && question.type != com_nick_ultimatetrivia_QuestionType.RATHER) this._order.sort(s2_util_Utils.sortArrayRandom);
};
$hxClasses["com.nick.ultimatetrivia.components.question.QuestionDisplay"] = com_nick_ultimatetrivia_components_question_QuestionDisplay;
com_nick_ultimatetrivia_components_question_QuestionDisplay.__name__ = ["com","nick","ultimatetrivia","components","question","QuestionDisplay"];
com_nick_ultimatetrivia_components_question_QuestionDisplay.getDisplay = function(scenePack,quizPack,globalPack,question) {
	var _g = question.type;
	switch(Type.enumIndex(_g)) {
	case 0:case 1:case 4:case 7:case 8:
		return new com_nick_ultimatetrivia_components_question_QuestionDisplay(scenePack,quizPack,globalPack,question);
	case 5:
		return new com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay(scenePack,quizPack,globalPack,question);
	case 2:case 3:
		return new com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay(scenePack,quizPack,globalPack,question);
	case 6:
		return new com_nick_ultimatetrivia_components_question_AudioQuestionDisplay(scenePack,quizPack,globalPack,question);
	}
};
com_nick_ultimatetrivia_components_question_QuestionDisplay.__super__ = s2_display_SpriteUser;
com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype = $extend(s2_display_SpriteUser.prototype,{
	onAdded: function() {
		s2_display_SpriteUser.prototype.onAdded.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var timeUtil = new s2_util_TimeUtil();
		this.owner.add(timeUtil);
		var width = 800;
		var c_text = s2_localization_Locale.getField("question.questionText",width,flambe_display_TextAlign.Center);
		c_text.set_text(this._oQuestion.text);
		this._text.add(c_text);
		this.owner.addChild(this._text);
		c_text.setXY((1366 - width) / 2,296 - flambe_display_Sprite.getBounds(this._text).height / 2);
		this.build();
	}
	,build: function() {
		var _g2 = this;
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.IMAGE || this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.AUDIO) {
			var c_lightBurst = new flambe_display_ImageSprite(this._scenePack.getTexture("light_burst"));
			this._lightBurst.add(c_lightBurst);
			c_lightBurst.setXY(332,518);
			c_lightBurst.centerAnchor();
			this.owner.addChild(this._lightBurst);
			var c_image;
			if(this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.AUDIO) {
				if(this._oQuestion.sound == null) c_image = new flambe_display_ImageSprite(this._scenePack.getTexture("missing_sound")); else c_image = new flambe_display_ImageSprite(this._scenePack.getTexture("audio"));
			} else if(this._oQuestion.image == null) c_image = new flambe_display_ImageSprite(this._scenePack.getTexture("missing_image")); else c_image = new flambe_display_ImageSprite(this._quizPack.getTexture(this._oQuestion.image));
			this._image = new flambe_Entity();
			c_image.x.set__(Math.round(c_lightBurst.x.get__() - c_image.getNaturalWidth() / 2));
			c_image.y.set__(Math.round(c_lightBurst.y.get__() - c_image.getNaturalHeight() / 2));
			this._image.add(c_image);
			this.owner.addChild(this._image);
		}
		var c_option;
		var option;
		var i = 0;
		var directory = "ui/btns_";
		var optionX;
		var centerX = 1366 / 2;
		var longest = 0;
		var longestFieldIndex = -1;
		var c_testField;
		var e_testField = new flambe_Entity();
		var _g1 = 0;
		var _g = this._oQuestion.options.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			c_testField = s2_localization_Locale.getField("question.option");
			c_testField.set_text(this._oQuestion.options[i1].text);
			e_testField.add(c_testField);
			var width = flambe_display_Sprite.getBounds(e_testField).width;
			if(longest < width) longestFieldIndex = i1;
			longest = Math.max(longest,flambe_display_Sprite.getBounds(e_testField).width);
		}
		var _g3 = this._oQuestion.type;
		switch(Type.enumIndex(_g3)) {
		case 0:case 8:case 7:
			optionX = centerX;
			if(longest <= 510) directory += "short"; else directory += "choice";
			break;
		case 1:
			optionX = centerX;
			directory += Std.string(this._oQuestion.type).toLowerCase();
			break;
		default:
			directory += "short";
			optionX = centerX + 104;
		}
		var scale = 9999999;
		var _g4 = 0;
		var _g11 = this._oQuestion.options;
		while(_g4 < _g11.length) {
			var oOption = _g11[_g4];
			++_g4;
			c_option = new com_nick_ultimatetrivia_components_QuizButton(this._scenePack,directory + "/" + this._order[i],"question.option");
			c_option.maxScale = 1.06;
			c_option.setText(oOption.text);
			var wye = 68 * this._order[i] + 510 - 68 * (this._oQuestion.options.length - 1) / 2;
			c_option.setXY(optionX,wye);
			(function() {
				var num = i;
				var opt = c_option;
				disposer.connect1(c_option.get_engaged(),function(_) {
					_g2.selectOption(num);
				});
			})();
			option = new flambe_Entity();
			option.add(c_option);
			this._options.push(option);
			i++;
		}
		var longestField = Std.instance(this._options[longestFieldIndex].getComponent("SpriteUser_0"),s2_ui_TextButton).get_textSprite();
		while(flambe_display_Sprite.getBounds(longestField.owner).width > 720) longestField.setScale(longestField.scaleX.get__() - 0.01);
		var textSprite;
		var _g12 = 0;
		var _g5 = this._oQuestion.options.length;
		while(_g12 < _g5) {
			var i2 = _g12++;
			textSprite = Std.instance(this._options[i2].getComponent("SpriteUser_0"),s2_ui_TextButton).get_textSprite();
			textSprite.setScale(longestField.scaleX.get__());
			textSprite.x.set__(2);
			textSprite.y.set__(-flambe_display_Sprite.getBounds(textSprite.owner).height / 2 - 18.5);
			this.owner.addChild(this._options[this._order.indexOf(i2)]);
		}
	}
	,selectOption: function(optionIndex,queryIndex) {
		if(queryIndex == null) queryIndex = 0;
		this._oQuestion.queries[queryIndex].setSelected(this._oQuestion.options[optionIndex]);
	}
	,transitionOut: function() {
		var _g1 = 0;
		var _g = this._options.length;
		while(_g1 < _g) {
			var i = _g1++;
			((function($this) {
				var $r;
				var component = $this._options[i].getComponent("Sprite_3");
				$r = component;
				return $r;
			}(this))).disablePointer();
		}
		var c_feedback;
		var c_text;
		var text = new flambe_Entity();
		var c_text1 = Std.instance(this._text.getComponent("Sprite_3"),flambe_display_TextSprite);
		c_text1.x.animateTo(c_text1.x.get__() + 300,0.5);
		c_text1.alpha.animateTo(0,0.5);
		if(this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.RATHER || this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE) {
			this._scenePack.getSound("sfx/answer_alternate").play();
			c_text1 = s2_localization_Locale.getField("question.feedbackNeutral" + Math.ceil(Math.random() * 5),0,flambe_display_TextAlign.Left);
			c_feedback = new flambe_display_ImageSprite(this._scenePack.getTexture("mark_correct"));
		} else if(this._oQuestion.allCorrect()) {
			this._scenePack.getSound("sfx/answer_correct").play();
			c_text1 = s2_localization_Locale.getField("question.feedbackCorrect",0,flambe_display_TextAlign.Left);
			c_feedback = new flambe_display_ImageSprite(this._scenePack.getTexture("mark_correct"));
		} else {
			this._scenePack.getSound("sfx/answer_wrong").play();
			c_text1 = s2_localization_Locale.getField("question.feedbackIncorrect",0,flambe_display_TextAlign.Left);
			c_feedback = new flambe_display_ImageSprite(this._scenePack.getTexture("mark_incorrect"));
		}
		c_feedback.setXY(230,264);
		c_feedback.alpha.set__(0);
		c_feedback.alpha.animateTo(1,0.5);
		c_text1.setXY(80,0);
		text.add(c_text1);
		this._feedback.add(c_feedback);
		this._feedback.addChild(text);
		c_feedback.x.animateTo(1366 / 2 - flambe_display_Sprite.getBounds(this._feedback).width / 2,0.5);
		this.owner.addChild(this._feedback);
		this.animateOut();
	}
	,animateOut: function() {
		var _g = this;
		var script = new flambe_script_Script();
		this.owner.add(script);
		var seq = new flambe_script_Sequence();
		var timeUtil;
		var component1 = this.owner.getComponent("TimeUtil_2");
		timeUtil = component1;
		var emitTime;
		var isPersonality = this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.RATHER || this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.PERSONALITY_CHOICE;
		var id;
		if(isPersonality) id = this._oQuestion.queries[0].selectedOption.index; else id = this._oQuestion.queries[0].solution.index;
		var alphaOut = function() {
			_g.owner.addChild(_g._options[_g._oQuestion.queries[0].solution.index]);
			var _g2 = 0;
			var _g1 = _g._options.length;
			while(_g2 < _g1) {
				var i = _g2++;
				if(id != _g._oQuestion.options[i].index) ((function($this) {
					var $r;
					var component = _g._options[i].getComponent("Sprite_3");
					$r = component;
					return $r;
				}(this))).alpha.animateTo(0,0.2);
			}
		};
		emitTime = 1.0;
		if(!this._oQuestion.allCorrect() && !isPersonality) {
			var ex = ((function($this) {
				var $r;
				var component2 = $this._options[$this._oQuestion.queries[0].selectedOption.index].getComponent("Sprite_3");
				$r = component2;
				return $r;
			}(this))).x.get__();
			var _g3 = 0;
			while(_g3 < 4) {
				var i1 = _g3++;
				seq.add(new flambe_script_AnimateTo(((function($this) {
					var $r;
					var component3 = $this._options[$this._oQuestion.queries[0].selectedOption.index].getComponent("Sprite_3");
					$r = component3;
					return $r;
				}(this))).x,ex + i1 % 2 * 25,0.12));
			}
			emitTime = 1.8;
			seq.add(new flambe_script_AnimateTo(((function($this) {
				var $r;
				var component4 = $this._options[$this._oQuestion.queries[0].selectedOption.index].getComponent("Sprite_3");
				$r = component4;
				return $r;
			}(this))).x,ex,0.12));
		}
		seq.add(new flambe_script_CallFunction(alphaOut));
		seq.add(new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component5 = $this._options[id].getComponent("Sprite_3");
			$r = component5;
			return $r;
		}(this))).y,510,0.6,flambe_animation_Ease.expoOut));
		script.run(seq);
		timeUtil.timeout($bind(this,this.finishAnimateOut),emitTime);
	}
	,finishAnimateOut: function() {
		this.transitionedOut.emit(this);
	}
	,dispose: function() {
		s2_display_SpriteUser.prototype.dispose.call(this);
		this._scenePack = null;
		this._globalPack = null;
		this._quizPack = null;
		this._oQuestion = null;
		this._text = null;
		this._feedback = null;
		this._image = null;
		this._options = null;
		this._lightBurst = null;
		this.transitionedOut = null;
		this._order = null;
	}
	,__class__: com_nick_ultimatetrivia_components_question_QuestionDisplay
});
var com_nick_ultimatetrivia_components_question_AudioQuestionDisplay = function(scenePack,quizPack,globalPack,question) {
	this._playBtn = new flambe_Entity();
	com_nick_ultimatetrivia_components_question_QuestionDisplay.call(this,scenePack,quizPack,globalPack,question);
};
$hxClasses["com.nick.ultimatetrivia.components.question.AudioQuestionDisplay"] = com_nick_ultimatetrivia_components_question_AudioQuestionDisplay;
com_nick_ultimatetrivia_components_question_AudioQuestionDisplay.__name__ = ["com","nick","ultimatetrivia","components","question","AudioQuestionDisplay"];
com_nick_ultimatetrivia_components_question_AudioQuestionDisplay.__super__ = com_nick_ultimatetrivia_components_question_QuestionDisplay;
com_nick_ultimatetrivia_components_question_AudioQuestionDisplay.prototype = $extend(com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype,{
	build: function() {
		com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype.build.call(this);
		var c_playBtn = new s2_ui_BasicButton(this._scenePack,"ui/play_btn");
		c_playBtn.setXY(335,646);
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Disposer_9");
			$r = component;
			return $r;
		}(this))).connect1(c_playBtn.get_engaged(),$bind(this,this.onPlayBtnEngaged));
		this._playBtn.add(c_playBtn);
		this.owner.addChild(this._playBtn);
		((function($this) {
			var $r;
			var component1 = $this._playBtn.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).set_visible(false);
		if(this._oQuestion.sound != null) {
			this._sound = this._quizPack.getSound(this._oQuestion.sound);
			this.playSound();
		}
	}
	,playSound: function() {
		s2_sound_MusicManager.set_volume(0);
		((function($this) {
			var $r;
			var component = $this._playBtn.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).set_visible(false);
		this._playback = this._sound.play();
		((function($this) {
			var $r;
			var component1 = $this.owner.getComponent("Disposer_9");
			$r = component1;
			return $r;
		}(this))).connect2(this._playback.get_complete().get_changed(),$bind(this,this.onPlaybackCompleteChanged));
	}
	,onPlaybackCompleteChanged: function(val1,val2) {
		s2_sound_MusicManager.set_volume(1);
		((function($this) {
			var $r;
			var component = $this._playBtn.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).set_visible(true);
	}
	,onPlayBtnEngaged: function(e) {
		this.playSound();
	}
	,dispose: function() {
		com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype.dispose.call(this);
		if(this._playback != null) this._playback.dispose();
		this._sound = null;
	}
	,__class__: com_nick_ultimatetrivia_components_question_AudioQuestionDisplay
});
var com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay = function(scenePack,quizPack,globalPack,question) {
	com_nick_ultimatetrivia_components_question_QuestionDisplay.call(this,scenePack,quizPack,globalPack,question);
};
$hxClasses["com.nick.ultimatetrivia.components.question.ImageOptionQuestionDisplay"] = com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay;
com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay.__name__ = ["com","nick","ultimatetrivia","components","question","ImageOptionQuestionDisplay"];
com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay.__super__ = com_nick_ultimatetrivia_components_question_QuestionDisplay;
com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay.prototype = $extend(com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype,{
	onAdded: function() {
		com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype.onAdded.call(this);
	}
	,build: function() {
		var _g2 = this;
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var c_option;
		var option;
		var centerX = 1366 / 2;
		var spacing = 243;
		var _g1 = 0;
		var _g = this._oQuestion.options.length;
		while(_g1 < _g) {
			var i = [_g1++];
			if(this._oQuestion.options[i[0]].image == null) c_option = new s2_ui_BasicButton(this._scenePack,"missing_image_option"); else c_option = new s2_ui_BasicButton(this._quizPack,this._oQuestion.options[i[0]].image);
			c_option.maxScale = 1.06;
			c_option.setXY(centerX + spacing * this._order[i[0]] - (this._oQuestion.options.length - 1) / 2 * spacing,495);
			((function(i) {
				return function() {
					var num = i[0];
					var opt = c_option;
					disposer.connect1(c_option.get_engaged(),(function() {
						return function(_) {
							_g2.selectOption(num);
						};
					})());
				};
			})(i))();
			option = new flambe_Entity();
			option.add(c_option);
			this._options.push(option);
			this.owner.addChild(option);
			var c_frame = new flambe_display_ImageSprite(this._scenePack.getTexture("frame_" + this._order[i[0]]));
			c_frame.x.set__(-6);
			c_frame.y.set__(4);
			c_frame.centerAnchor();
			option.firstChild.addChild(new flambe_Entity().add(c_frame));
		}
	}
	,selectOption: function(optionIndex,queryIndex) {
		if(queryIndex == null) queryIndex = 0;
		this._oQuestion.queries[queryIndex].setSelected(this._oQuestion.options[optionIndex]);
	}
	,__class__: com_nick_ultimatetrivia_components_question_ImageOptionQuestionDisplay
});
var com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay = function(gamePack,questionPack,globalPack,question) {
	this._optionPositions = [-1,-1,-1,-1];
	this._optionIndexes = new haxe_ds_ObjectMap();
	this._queries = [];
	com_nick_ultimatetrivia_components_question_QuestionDisplay.call(this,gamePack,questionPack,globalPack,question);
};
$hxClasses["com.nick.ultimatetrivia.components.question.MatchingQuestionDisplay"] = com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay;
com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay.__name__ = ["com","nick","ultimatetrivia","components","question","MatchingQuestionDisplay"];
com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay.__super__ = com_nick_ultimatetrivia_components_question_QuestionDisplay;
com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay.prototype = $extend(com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype,{
	build: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var c_option;
		var c_query;
		var option;
		var oQuery;
		var oOption;
		var wye = 96;
		var c_queryImage;
		var _g1 = 0;
		var _g = this._oQuestion.queries.length;
		while(_g1 < _g) {
			var i = _g1++;
			oQuery = this._oQuestion.queries[i];
			c_query = new flambe_display_ImageSprite(this._scenePack.getTexture("matching_query" + (i + 1)));
			c_query.centerAnchor();
			c_query.setXY(this.getQueryXPos(i),578);
			this.owner.addChild(this._queries[i] = new flambe_Entity().add(c_query));
			var query;
			c_queryImage = null;
			if(this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE) {
				if(oQuery.image == null) c_queryImage = new flambe_display_ImageSprite(this._scenePack.getTexture("missing_match_image_query")); else c_queryImage = new flambe_display_ImageSprite(this._quizPack.getTexture(oQuery.image));
				c_queryImage.setXY(6,103);
				this._queries[i].addChild(new flambe_Entity().add(c_queryImage));
			}
			var c_queryLabel = null;
			if(oQuery.image == null) {
				var c_queryLabel1 = s2_localization_Locale.getField("question.matchingQuery",170,flambe_display_TextAlign.Center);
				c_queryLabel1.set_text(oQuery.text != null?oQuery.text:oQuery.image);
				c_queryLabel1.centerAnchor();
				query = new flambe_Entity().add(c_queryLabel1);
				this._queries[i].addChild(query);
				c_queryLabel1.setXY(wye,152);
			}
		}
		var _g11 = 0;
		var _g2 = this._oQuestion.queries.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			oOption = this._oQuestion.options[i1];
			c_option = new flambe_display_ImageSprite(this._scenePack.getTexture("matching_option"));
			c_option.centerAnchor();
			var _g21 = c_option.anchorY;
			_g21.set__(_g21.get__() + 1);
			var _g22 = c_option.anchorX;
			_g22.set__(_g22.get__() - 2);
			c_option.setXY(this.getOptionXPos(i1),422);
			this.owner.addChild(this._options[i1] = new flambe_Entity().add(c_option));
			this._optionIndexes.set(this._options[i1],i1);
			this._options[i1].add(new s2_animation_Draggable2());
			disposer.connect1(((function($this) {
				var $r;
				var component1 = $this._options[i1].getComponent("Draggable2_18");
				$r = component1;
				return $r;
			}(this))).drop,$bind(this,this.onDragDrop));
			disposer.connect1(((function($this) {
				var $r;
				var component2 = $this._options[i1].getComponent("Draggable2_18");
				$r = component2;
				return $r;
			}(this))).pick,$bind(this,this.onDragPick));
			var optionText;
			var c_label;
			var c_image = null;
			if(this._oQuestion.type == com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE) {
				if(oOption.image == null) c_image = new flambe_display_ImageSprite(this._scenePack.getTexture("missing_match_image_option")); else c_image = new flambe_display_ImageSprite(this._quizPack.getTexture(oOption.image));
				c_image.setXY(6,6);
				this._options[i1].addChild(new flambe_Entity().add(c_image));
			}
			if(oOption.image == null) {
				var c_optionLabel = s2_localization_Locale.getField("question.matchingOption",170,flambe_display_TextAlign.Center);
				c_optionLabel.set_text(oOption.text != null?oOption.text:oOption.image);
				c_optionLabel.centerAnchor();
				optionText = new flambe_Entity().add(c_optionLabel);
				this._options[i1].addChild(optionText);
				c_optionLabel.setXY(wye,58);
			}
			this._options[i1].add(this._oQuestion.options[i1]);
		}
	}
	,onDragPick: function(dragged) {
		this._scenePack.getSound("sfx/drag_drop_pick_up_piece").play();
		this.owner.addChild(dragged.owner);
	}
	,onDragDrop: function(dragged) {
		var c_closest = null;
		var xy = new flambe_math_Point(((function($this) {
			var $r;
			var component = dragged.owner.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x.get__(),((function($this) {
			var $r;
			var component1 = dragged.owner.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).y.get__());
		var c_queryDisplay = null;
		var shortest = 999999;
		var index = -1;
		var _g1 = 0;
		var _g = this._oQuestion.queries.length;
		while(_g1 < _g) {
			var i = _g1++;
			var component2 = this._queries[i].getComponent("Sprite_3");
			c_queryDisplay = component2;
			var dist = xy.distanceTo(c_queryDisplay.x.get__(),c_queryDisplay.y.get__() + -49);
			if(shortest > dist) {
				c_closest = c_queryDisplay;
				index = i;
			}
			shortest = Math.min(shortest,dist);
		}
		var c_spriteDragged;
		var component3 = dragged.owner.getComponent("Sprite_3");
		c_spriteDragged = component3;
		if(shortest < 100) {
			this._scenePack.getSound("sfx/drag_drop_into_place").play();
			if(this._optionPositions[index] != -1 && this._optionPositions[index] != this._optionIndexes.get(dragged.owner)) {
				var sprite;
				var component4 = this._options[this._optionPositions[index]].getComponent("Sprite_3");
				sprite = component4;
				sprite.x.animateTo(this.getOptionXPos(this._optionIndexes.get(this._options[this._optionPositions[index]])),0.4,flambe_animation_Ease.linear);
				sprite.y.animateTo(422,0.4,flambe_animation_Ease.sineOut);
			}
		}
		if(this._optionPositions.indexOf(this._optionIndexes.get(dragged.owner)) != -1) this._optionPositions[this._optionPositions.indexOf(this._optionIndexes.get(dragged.owner))] = -1;
		if(shortest < 100) {
			this._optionPositions[index] = this._optionIndexes.get(dragged.owner);
			c_spriteDragged.x.animateTo(c_closest.x.get__(),0.2,flambe_animation_Ease.linear);
			c_spriteDragged.y.animateTo(c_closest.y.get__() + -49,0.2,flambe_animation_Ease.sineOut);
		} else {
			c_spriteDragged.x.animateTo(this.getOptionXPos(this._optionIndexes.get(dragged.owner)),0.4,flambe_animation_Ease.linear);
			c_spriteDragged.y.animateTo(422,0.4,flambe_animation_Ease.sineOut);
		}
		var _g11 = 0;
		var _g2 = this._oQuestion.queries.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(this._optionPositions[i1] != -1) this._oQuestion.queries[i1].setSelected(this._oQuestion.options[this._optionPositions[i1]]); else this._oQuestion.queries[i1].setSelected(null);
		}
	}
	,getPos: function(index) {
		var spacing = 900 / this._oQuestion.queries.length;
		var nMid = (this._oQuestion.queries.length - 1) / 2;
		var nPos = nMid - index;
		var ex = spacing * nPos;
		return ex + 1366 / 2;
	}
	,getQueryXPos: function(index) {
		return this.getPos(index);
	}
	,getOptionXPos: function(index) {
		return this.getPos(this._order[index]);
	}
	,animateOut: function() {
		var _g = this;
		var timeUtil;
		var component = this.owner.getComponent("TimeUtil_2");
		timeUtil = component;
		if(this._oQuestion.allCorrect()) timeUtil.timeout($bind(this,this.finishAnimateOut),1.0); else {
			var delayed1 = function() {
				var num1 = 0;
				var _g21 = 0;
				var _g11 = _g._oQuestion.queries.length;
				while(_g21 < _g11) {
					var i1 = [_g21++];
					if(i1[0] != _g._optionPositions[i1[0]]) {
						timeUtil.timeout((function(i1) {
							return function() {
								((function($this) {
									var $r;
									var component3 = _g._options[_g._optionPositions[i1[0]]].getComponent("Sprite_3");
									$r = component3;
									return $r;
								}(this))).y.animateTo(422,.6,flambe_animation_Ease.expoOut);
							};
						})(i1),num1 * 0.1);
						num1++;
					}
				}
				var delayed2 = function() {
					var num2 = 0;
					var _g2 = 0;
					var _g1 = _g._oQuestion.queries.length;
					while(_g2 < _g1) {
						var i = _g2++;
						if(i != _g._optionPositions[i]) {
							var option = [_g._options[_g._optionPositions[i]]];
							timeUtil.timeout((function(option) {
								return function() {
									_g.owner.addChild(option[0]);
									((function($this) {
										var $r;
										var component1 = option[0].getComponent("Sprite_3");
										$r = component1;
										return $r;
									}(this))).x.animateTo(_g.getQueryXPos(Std.instance(option[0].getComponent("IndexedItem_11"),com_nick_ultimatetrivia_Option).index),.6,flambe_animation_Ease.sineIn);
									((function($this) {
										var $r;
										var component2 = option[0].getComponent("Sprite_3");
										$r = component2;
										return $r;
									}(this))).y.animateTo(578 + -49,.6,flambe_animation_Ease.sineOut);
								};
							})(option),num2 * 0.2);
							num2++;
						}
					}
				};
				timeUtil.timeout(delayed2,.5);
			};
			timeUtil.timeout(delayed1,.1);
			timeUtil.timeout($bind(this,this.finishAnimateOut),2.0);
		}
	}
	,dispose: function() {
		com_nick_ultimatetrivia_components_question_QuestionDisplay.prototype.dispose.call(this);
		this._queries = null;
	}
	,__class__: com_nick_ultimatetrivia_components_question_MatchingQuestionDisplay
});
var flambe_scene_Scene = function(opaque) {
	if(opaque == null) opaque = true;
	flambe_Component.call(this);
	this.opaque = opaque;
	this.shown = new flambe_util_Signal0();
	this.hidden = new flambe_util_Signal0();
};
$hxClasses["flambe.scene.Scene"] = flambe_scene_Scene;
flambe_scene_Scene.__name__ = ["flambe","scene","Scene"];
flambe_scene_Scene.__super__ = flambe_Component;
flambe_scene_Scene.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Scene_4";
	}
	,__class__: flambe_scene_Scene
});
var s2_scene_BaseScene = function() {
	this.dynamicManifests = new haxe_ds_StringMap();
	this._intialized = false;
	flambe_scene_Scene.call(this);
	this.requiredPacks = [];
};
$hxClasses["s2.scene.BaseScene"] = s2_scene_BaseScene;
s2_scene_BaseScene.__name__ = ["s2","scene","BaseScene"];
s2_scene_BaseScene.__super__ = flambe_scene_Scene;
s2_scene_BaseScene.prototype = $extend(flambe_scene_Scene.prototype,{
	onAdded: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var topScene = s2_scene_Scenes.director.get_topScene();
		var scene;
		if(topScene != null) {
			var component1 = topScene.getComponent("Scene_4");
			scene = component1;
		} else scene = null;
		var shown = null;
		if(scene != null) shown = scene.hidden.connect($bind(this,this.onShown)).once(); else shown = this.shown.connect($bind(this,this.onShown)).once();
		disposer.add(shown);
		this._hiddenBind = this.hidden.connect($bind(this,this.onHidden)).once();
		disposer.add(this._hiddenBind);
		disposer.connect0(flambe_System.get_stage().resize,$bind(this,this.onResize));
		if(!this._intialized) {
			this.assetsReady();
			this._intialized = true;
			this.onResize();
		}
	}
	,assetsReady: function() {
	}
	,injectAssets: function(assets) {
		this._assets = assets;
	}
	,onShown: function() {
	}
	,onHidden: function() {
	}
	,onResize: function() {
	}
	,onRemoved: function() {
		flambe_scene_Scene.prototype.onRemoved.call(this);
		this._assets = null;
	}
	,__class__: s2_scene_BaseScene
});
var s2_scene_AutoFillScene = function() {
	this.standardHeight = 768;
	this.standardWidth = 1366;
	s2_scene_BaseScene.call(this);
};
$hxClasses["s2.scene.AutoFillScene"] = s2_scene_AutoFillScene;
s2_scene_AutoFillScene.__name__ = ["s2","scene","AutoFillScene"];
s2_scene_AutoFillScene.__super__ = s2_scene_BaseScene;
s2_scene_AutoFillScene.prototype = $extend(s2_scene_BaseScene.prototype,{
	setBackground: function(background) {
		this.__ = new s2_util_Coords(this.standardWidth,this.standardHeight,background.getNaturalWidth(),background.getNaturalHeight());
		(this._backing == null?this._backing = new flambe_Entity():this._backing).add(background);
		if(this.owner != null && this.owner.parent != null) this.onResize();
	}
	,onAdded: function() {
		this.setBackground(new s2_display_SizeSprite(this.standardWidth,this.standardHeight));
		this._container = new flambe_Entity().add(new flambe_display_Sprite()).addChild(this._backing);
		this.owner.addChild(this._container);
		s2_scene_BaseScene.prototype.onAdded.call(this);
	}
	,onResize: function() {
		var safeWidth = 1024;
		var safeHeight = 600;
		this.scale = Math.min(flambe_System.get_stage().get_width() / this.__.x(safeWidth),flambe_System.get_stage().get_height() / this.__.y(safeHeight));
		var nWidth = this.__.newWidth * this.scale;
		var nHeight = this.__.newHeight * this.scale;
		((function($this) {
			var $r;
			var component = $this._container.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).setScale(this.scale).setXY((flambe_System.get_stage().get_width() - nWidth) * 0.5,(flambe_System.get_stage().get_height() - nHeight) * 0.5);
	}
	,onRemoved: function() {
		s2_scene_BaseScene.prototype.onRemoved.call(this);
		this._backing = null;
		this._container = null;
		this.__ = null;
	}
	,__class__: s2_scene_AutoFillScene
});
var com_nick_ultimatetrivia_scenes_BrainHubScene = function() {
	this._messageOverlay = new flambe_Entity();
	this._brainChunckCallout = new flambe_Entity();
	this._selectCTA = new flambe_Entity();
	this._btnPause = new flambe_Entity();
	this._head = new flambe_Entity();
	this._confetti = new flambe_Entity();
	this._chunkContainer = new flambe_Entity();
	this._randomQuizBtn = new flambe_Entity();
	this._categoryQuizTypeBtn = new flambe_Entity();
	this._propertyQuizTypeBtn = new flambe_Entity();
	this._arrow = new flambe_Entity();
	s2_scene_AutoFillScene.call(this);
	com_nick_ultimatetrivia_components_Brain.generateAssetIds();
	var dynamicManifest = new flambe_asset_Manifest();
	var $it0 = com_nick_ultimatetrivia_components_Brain.assetIds.keys();
	while( $it0.hasNext() ) {
		var listId = $it0.next();
		var list = com_nick_ultimatetrivia_components_Brain.assetIds.get(listId);
		var ext;
		var id;
		var brainPack = "/brain_parts/";
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(listId != "fills") ext = ".png"; else ext = ".jpg";
			id = list[i];
			dynamicManifest.add(id,brainPack + id + ext);
		}
	}
	s2_util_Utils.setupManifest(dynamicManifest);
	this.dynamicManifests.set("brain_parts",dynamicManifest);
	this.requiredPacks.push("pause_scene");
	this.requiredPacks.push("brain_hub_scene");
	this.requiredPacks.push("global");
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	gt.reset();
	if(gt.testAssets) {
		var categories = gt.getCategories();
		var $it1 = categories.keys();
		while( $it1.hasNext() ) {
			var catId = $it1.next();
			var str = "assets_";
			if(com_nick_ultimatetrivia_Data.getCategoryType(catId) == com_nick_ultimatetrivia_components_QuizType.PROPERTY) str += "p_"; else str += "t_";
			str += Std.string(catId).toLowerCase();
			this.requiredPacks.push(str);
		}
	}
};
$hxClasses["com.nick.ultimatetrivia.scenes.BrainHubScene"] = com_nick_ultimatetrivia_scenes_BrainHubScene;
com_nick_ultimatetrivia_scenes_BrainHubScene.__name__ = ["com","nick","ultimatetrivia","scenes","BrainHubScene"];
com_nick_ultimatetrivia_scenes_BrainHubScene.__super__ = s2_scene_AutoFillScene;
com_nick_ultimatetrivia_scenes_BrainHubScene.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	assetsReady: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var scenePack = this._assets.get("brain_hub_scene");
		var brainPack = this._assets.get("brain_parts");
		var globalPack = this._assets.get("global");
		var gt;
		var component1 = flambe_System.root.getComponent("GameTracker_8");
		gt = component1;
		s2_sound_MusicManager.loopSoundStandard(globalPack,"sfx/utg_gameplay_quiz_musicloopv1",1);
		if(gt.testAssets) {
			var categories = gt.getCategories();
			var $it0 = categories.keys();
			while( $it0.hasNext() ) {
				var catId = $it0.next();
				var str = "assets_";
				if(com_nick_ultimatetrivia_Data.getCategoryType(catId) == com_nick_ultimatetrivia_components_QuizType.PROPERTY) str += "p_"; else str += "t_";
				str += Std.string(catId).toLowerCase();
				var testPack = this._assets.get(str);
				var _g = 0;
				var _g1 = categories.get(catId);
				while(_g < _g1.length) {
					var question = _g1[_g];
					++_g;
					if(question.image != null) {
						if(testPack.getTexture(question.image,false) == null) console.log("question.image: '" + question.image + "' missing.");
					}
					if(question.sound != null) {
						if(testPack.getSound(question.sound,false) == null) console.log("question.sound: '" + question.sound + "' missing.");
					}
					var _g2 = 0;
					var _g3 = question.queries;
					while(_g2 < _g3.length) {
						var query = _g3[_g2];
						++_g2;
						if(query.image != null) {
							if(testPack.getTexture(query.image,false) == null) console.log("query.image: '" + query.image + "' missing.");
						}
					}
					var _g21 = 0;
					var _g31 = question.options;
					while(_g21 < _g31.length) {
						var option = _g31[_g21];
						++_g21;
						if(option.image != null) {
							if(testPack.getTexture(option.image,false) == null) console.log("option.image: '" + option.image + "' missing.");
						}
					}
				}
			}
		}
		this.setBackground(new s2_display_SizeSprite(1366,768));
		var textures = [];
		var _g4 = 0;
		while(_g4 < 12) {
			var i = _g4++;
			textures.push(globalPack.getTexture("fill_bg"));
		}
		var c_fill = new s2_display_MultiTextureSprite(textures,6);
		this._backing.addChild(new flambe_Entity().add(c_fill));
		var c_vignette = new s2_display_MultiTextureSprite([globalPack.getTexture("vignette_01"),globalPack.getTexture("vignette_02")]);
		this._backing.addChild(new flambe_Entity().add(c_vignette));
		var e_confettiLayer = new flambe_Entity();
		var c_confettiLayer = new com_nick_ultimatetrivia_components_ConfettiLayer(globalPack);
		e_confettiLayer.add(c_confettiLayer);
		this._backing.addChild(e_confettiLayer);
		var c_confetti = new flambe_display_ImageSprite(scenePack.getTexture("confetti"));
		c_confetti.setXY(374,232);
		this._confetti.add(c_confetti);
		this._container.addChild(this._confetti);
		var scores = gt.getTopPsychTraits();
		var width = 300;
		var c_arrow = new flambe_display_ImageSprite(scenePack.getTexture("arrow"));
		c_arrow.setXY(202,106);
		this._arrow.add(c_arrow);
		this._container.addChild(this._arrow);
		var c_selectCTA = s2_localization_Locale.getField("brainHub.selectCTA",270,flambe_display_TextAlign.Center);
		c_selectCTA.setXY(5,14);
		this._selectCTA.add(c_selectCTA);
		this._arrow.addChild(this._selectCTA);
		var btnPause = new s2_ui_BasicButton(globalPack,"ui/pause_btn");
		btnPause.get_buttonMode().playSound = false;
		this._btnPause.add(btnPause);
		this._container.addChild(this._btnPause);
		disposer.connect1(Std.instance(this._btnPause.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onPauseButtonClick));
		var c_propertyQuizTypeBtn = new s2_ui_BasicButton(scenePack,"btn_know_the_show");
		this._propertyQuizTypeBtn.add(c_propertyQuizTypeBtn);
		var c_categoryQuizTypeBtn = new s2_ui_BasicButton(scenePack,"btn_nick_iq");
		this._categoryQuizTypeBtn.add(c_categoryQuizTypeBtn);
		var c_randomQuizBtn = new s2_ui_BasicButton(scenePack,"btn_random");
		this._randomQuizBtn.add(c_randomQuizBtn);
		var btns = [c_propertyQuizTypeBtn,c_categoryQuizTypeBtn,c_randomQuizBtn];
		var _g5 = 0;
		while(_g5 < 3) {
			var i1 = [_g5++];
			btns[i1[0]].setXY(274,i1[0] * 153 + 247);
			btns[i1[0]].get_buttonMode().playSound = false;
			this._container.addChild(btns[i1[0]].owner);
			if(i1[0] % 2 == 1) {
				var _g11 = btns[i1[0]].get_x();
				_g11.set__(_g11.get__() + 18);
			}
			((function(i1) {
				return function() {
					var id = i1[0];
					disposer.connect1(btns[i1[0]].get_engaged(),(function() {
						return function(_) {
							globalPack.getSound("sfx/select_quiz_button").play();
							switch(id) {
							case 0:
								gt.setQuizType(com_nick_ultimatetrivia_components_QuizType.PROPERTY,false);
								s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuizSelectScene);
								break;
							case 1:
								gt.setQuizType(com_nick_ultimatetrivia_components_QuizType.TOPIC,false);
								s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuizSelectScene);
								break;
							case 2:
								var categories1 = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
								var category = categories1[Math.round(Math.random() * categories1.length)];
								gt.setQuizType(com_nick_ultimatetrivia_Data.getCategoryType(category),true);
								gt.generateQuestions(category);
								s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuestionScene);
								break;
							}
						};
					})());
				};
			})(i1))();
		}
		var c_messageOverlay = new flambe_display_FillSprite(0,1366,768);
		c_messageOverlay.disablePointer();
		c_messageOverlay.alpha.set__(0.0);
		this._messageOverlay.add(c_messageOverlay);
		this._container.addChild(this._messageOverlay);
		var c_head = new com_nick_ultimatetrivia_components_Head(scenePack,brainPack);
		this._head.add(c_head);
		this._container.addChild(this._head);
		disposer.connect2(c_head.get_brain().message,$bind(this,this.onBrainMessage));
		var c_brainChunckCallout = new com_nick_ultimatetrivia_components_BrainChunkCallout(scenePack);
		disposer.connect0(c_brainChunckCallout.hide,$bind(this,this.onBrainCalloutHide));
		this._brainChunckCallout.add(c_brainChunckCallout);
		this._container.addChild(this._brainChunckCallout);
		this._container.addChild(this._btnPause);
	}
	,onBrainCalloutHide: function() {
		((function($this) {
			var $r;
			var component = $this._messageOverlay.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.animateTo(0.0,0.0);
	}
	,onBrainMessage: function(messageLoc,p) {
		Std.instance(this._brainChunckCallout.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_BrainChunkCallout).show(messageLoc,p);
		((function($this) {
			var $r;
			var component = $this._messageOverlay.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.animateTo(0.5,0.3);
	}
	,onPauseButtonClick: function(e) {
		((function($this) {
			var $r;
			var component = $this._head.getComponent("Head_15");
			$r = component;
			return $r;
		}(this))).onPause();
		s2_scene_Scenes.push(com_nick_ultimatetrivia_scenes_PauseScene,new flambe_scene_FadeTransition(0.2));
	}
	,onResize: function() {
		s2_scene_AutoFillScene.prototype.onResize.call(this);
		s2_display_LayoutUtil.top(s2_display_LayoutUtil.right(this._btnPause,25),25);
	}
	,onRemoved: function() {
		((function($this) {
			var $r;
			var component = $this._head.getComponent("Head_15");
			$r = component;
			return $r;
		}(this))).disposeSoundsBeforeUnloadingAssets();
		this._assets.unload("brain_parts");
		this._assets.unload("brain_hub_scene");
		s2_scene_AutoFillScene.prototype.onRemoved.call(this);
	}
	,__class__: com_nick_ultimatetrivia_scenes_BrainHubScene
});
var com_nick_ultimatetrivia_scenes_InGameScene = function() {
	this._confetti = new flambe_Entity();
	this._btnPause = new flambe_Entity();
	this._head = new flambe_Entity();
	this._hud = new flambe_Entity();
	s2_scene_AutoFillScene.call(this);
	this.requiredPacks.push("global");
	this.requiredPacks.push("pause_scene");
};
$hxClasses["com.nick.ultimatetrivia.scenes.InGameScene"] = com_nick_ultimatetrivia_scenes_InGameScene;
com_nick_ultimatetrivia_scenes_InGameScene.__name__ = ["com","nick","ultimatetrivia","scenes","InGameScene"];
com_nick_ultimatetrivia_scenes_InGameScene.__super__ = s2_scene_AutoFillScene;
com_nick_ultimatetrivia_scenes_InGameScene.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	assetsReady: function() {
		s2_scene_AutoFillScene.prototype.assetsReady.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var globalPack = this._assets.get("global");
		var gt;
		var component1 = flambe_System.root.getComponent("GameTracker_8");
		gt = component1;
		this.setBackground(new s2_display_SizeSprite(1366,768));
		var textures = [];
		var _g = 0;
		while(_g < 12) {
			var i = _g++;
			textures.push(globalPack.getTexture("fill_bg"));
		}
		var c_fill = new s2_display_MultiTextureSprite(textures,6);
		this._backing.addChild(new flambe_Entity().add(c_fill));
		var c_vignette = new s2_display_MultiTextureSprite([globalPack.getTexture("vignette_01"),globalPack.getTexture("vignette_02")]);
		this._backing.addChild(new flambe_Entity().add(c_vignette));
		var c_confetti = new com_nick_ultimatetrivia_components_ConfettiLayer(globalPack);
		this._confetti.add(c_confetti);
		this._backing.addChild(this._confetti);
		var c_head = new com_nick_ultimatetrivia_components_Heading(globalPack,this._headLocale);
		this._head.add(c_head);
		this._container.addChild(this._head);
		var btnPause = new s2_ui_BasicButton(globalPack,"ui/pause_btn");
		btnPause.get_engaged().connect($bind(this,this.onPauseButtonClick));
		this._btnPause.add(btnPause);
		this._container.addChild(this._btnPause);
		this.onResize();
	}
	,onResize: function() {
		s2_scene_AutoFillScene.prototype.onResize.call(this);
		if(Std.instance(this._head.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_Heading) != null) Std.instance(this._head.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_Heading).onResize();
		s2_display_LayoutUtil.top(s2_display_LayoutUtil.right(this._btnPause,25),25);
		if((function($this) {
			var $r;
			var component = $this._hud.getComponent("Hud_13");
			$r = component;
			return $r;
		}(this)) != null) ((function($this) {
			var $r;
			var component1 = $this._hud.getComponent("Hud_13");
			$r = component1;
			return $r;
		}(this))).onResize();
	}
	,onPauseButtonClick: function(e) {
		s2_scene_Scenes.push(com_nick_ultimatetrivia_scenes_PauseScene,new flambe_scene_FadeTransition(0.2));
	}
	,onRemoved: function() {
		s2_scene_AutoFillScene.prototype.onRemoved.call(this);
	}
	,dispose: function() {
		s2_scene_AutoFillScene.prototype.dispose.call(this);
	}
	,__class__: com_nick_ultimatetrivia_scenes_InGameScene
});
var com_nick_ultimatetrivia_scenes_PauseScene = function() {
	this._btnQuit = new flambe_Entity();
	this._btnResume = new flambe_Entity();
	this._btnMute = new flambe_Entity();
	this._buttons = new flambe_Entity();
	s2_scene_AutoFillScene.call(this);
	this.opaque = false;
	this.requiredPacks.push("pause_scene");
	this.requiredPacks.push("global");
};
$hxClasses["com.nick.ultimatetrivia.scenes.PauseScene"] = com_nick_ultimatetrivia_scenes_PauseScene;
com_nick_ultimatetrivia_scenes_PauseScene.__name__ = ["com","nick","ultimatetrivia","scenes","PauseScene"];
com_nick_ultimatetrivia_scenes_PauseScene.__super__ = s2_scene_AutoFillScene;
com_nick_ultimatetrivia_scenes_PauseScene.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	updateMuteButton: function() {
		var pack = this._assets.get("pause_scene");
		var id;
		if(flambe_System.volume.get__() == 0) id = "sound_off"; else id = "sound_on";
		var texture = pack.getTexture(id);
		var sprite = new flambe_display_ImageSprite(texture);
		sprite.centerAnchor();
		Std.instance(this._btnMute.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_overlay().add(sprite);
	}
	,assetsReady: function() {
		var _g = this;
		var disposer;
		var component2 = this.owner.getComponent("Disposer_9");
		disposer = component2;
		var pack = this._assets.get("pause_scene");
		var globalPack = this._assets.get("global");
		this.setBackground(new flambe_display_FillSprite(0,1366,768).setAlpha(.4));
		this._frame = new flambe_Entity().add(new flambe_display_ImageSprite(pack.getTexture("panel",false)));
		var frameWidth = ((function($this) {
			var $r;
			var component = $this._frame.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).getNaturalWidth();
		var frameHeight = ((function($this) {
			var $r;
			var component1 = $this._frame.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).getNaturalHeight();
		this._btnMute.add(new s2_ui_BasicButton(pack,"btn"));
		this.updateMuteButton();
		this._btnResume.add(new s2_ui_BasicButton(pack,"btn_resume"));
		this._btnQuit.add(new s2_ui_BasicButton(pack,"btn_home"));
		this.arrangeLayout();
		this._confirm = new flambe_Entity().add(new flambe_display_Sprite());
		var header = new flambe_Entity().add(s2_localization_Locale.getField("pause.confirmQuit").centerAnchor());
		((function($this) {
			var $r;
			var component3 = header.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).setXY(206,flambe_display_Sprite.getBounds(header).height * 0.5 - 10);
		var yes = new flambe_Entity().add(new s2_ui_TextButton(globalPack,"ui/confirm_button","pause.yes").setXY(40,20));
		var no = new flambe_Entity().add(new s2_ui_TextButton(globalPack,"ui/confirm_button","pause.no").setXY(280,20));
		var yesno = new flambe_Entity().add(new flambe_display_Sprite()).addChild(yes).addChild(no);
		var yesNoBounds = flambe_display_Sprite.getBounds(yesno);
		((function($this) {
			var $r;
			var component4 = yesno.getComponent("Sprite_3");
			$r = component4;
			return $r;
		}(this))).setXY(frameWidth / 2 - yesNoBounds.width / 2,((function($this) {
			var $r;
			var component5 = header.getComponent("Sprite_3");
			$r = component5;
			return $r;
		}(this))).getNaturalHeight() * ((function($this) {
			var $r;
			var component6 = header.getComponent("Sprite_3");
			$r = component6;
			return $r;
		}(this))).scaleY.get__() + ((function($this) {
			var $r;
			var component7 = header.getComponent("Sprite_3");
			$r = component7;
			return $r;
		}(this))).y.get__());
		this._confirm.addChild(header).addChild(yesno);
		var confirmBounds = flambe_display_Sprite.getBounds(this._confirm);
		((function($this) {
			var $r;
			var component8 = $this._confirm.getComponent("Sprite_3");
			$r = component8;
			return $r;
		}(this))).setXY(frameWidth / 2 - confirmBounds.width / 2 - confirmBounds.x,frameHeight / 2 - confirmBounds.height / 2);
		this._frame.addChild(this._confirm);
		this._frame.addChild(this._buttons);
		this._container.addChild(this._frame);
		((function($this) {
			var $r;
			var component9 = $this._confirm.getComponent("Sprite_3");
			$r = component9;
			return $r;
		}(this))).set_visible(false);
		disposer.connect1(Std.instance(this._btnMute.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onMuteClick));
		disposer.connect1(Std.instance(this._btnQuit.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onQuitClick));
		disposer.connect1(Std.instance(this._btnResume.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onResumeGame));
		disposer.connect1(Std.instance(no.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onNoClick));
		disposer.connect1(Std.instance(yes.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onYesClick));
		disposer.connect2(flambe_System.volume.get_changed(),function(to,_) {
			_g.updateMuteButton();
		});
	}
	,onAdded: function() {
		s2_scene_AutoFillScene.prototype.onAdded.call(this);
		var pack = this._assets.get("pause_scene");
		pack.getSound("sfx/pause").play();
	}
	,arrangeLayout: function() {
		var buttonOrder;
		var frameWidth = ((function($this) {
			var $r;
			var component = $this._frame.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).getNaturalWidth();
		var frameHeight = ((function($this) {
			var $r;
			var component1 = $this._frame.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).getNaturalHeight();
		buttonOrder = [this._btnResume,this._btnMute,this._btnQuit];
		var center = this.standardWidth / 2;
		var spacing = 150;
		var _g1 = 0;
		var _g = buttonOrder.length;
		while(_g1 < _g) {
			var i = _g1++;
			var button = buttonOrder[i];
			var image;
			var component2 = button.getComponent("Sprite_3");
			image = component2;
			image.x.set__(spacing * i - spacing * (buttonOrder.length - 1) / 2);
			this._buttons.addChild(button);
		}
		this._buttons.add(new flambe_display_Sprite());
		var buttonBounds = flambe_display_Sprite.getBounds(this._buttons);
		((function($this) {
			var $r;
			var component3 = $this._buttons.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).setXY(frameWidth * 0.5 - buttonBounds.get_centerX(),frameHeight * 0.5 - buttonBounds.get_centerY());
	}
	,onResize: function() {
		s2_scene_AutoFillScene.prototype.onResize.call(this);
		s2_display_LayoutUtil.center(this._frame);
	}
	,onYesClick: function(e) {
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_TitleScene);
	}
	,onNoClick: function(e) {
		((function($this) {
			var $r;
			var component = $this._confirm.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).set_visible(false);
		((function($this) {
			var $r;
			var component1 = $this._buttons.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).set_visible(true);
	}
	,onMuteClick: function(e) {
		flambe_System.volume.set__(flambe_System.volume.get__() == 0?1:0);
	}
	,onQuitClick: function(e) {
		((function($this) {
			var $r;
			var component = $this._confirm.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).set_visible(true);
		((function($this) {
			var $r;
			var component1 = $this._buttons.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).set_visible(false);
	}
	,onResumeGame: function(e) {
		while(s2_scene_Scenes.director.occludedScenes.length > 0) s2_scene_Scenes.director.popScene();
	}
	,__class__: com_nick_ultimatetrivia_scenes_PauseScene
});
var com_nick_ultimatetrivia_scenes_QuestionScene = function() {
	this._bar = new flambe_Entity();
	this._questionDisplay = new flambe_Entity();
	com_nick_ultimatetrivia_scenes_InGameScene.call(this);
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	this._headLocale = "categoryNames." + Std.string(gt.category).toLowerCase();
	this.requiredPacks.push("question_scene");
	this._quizPackId = "assets_";
	if(gt.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY) this._quizPackId += "p_"; else if(gt.quizType == com_nick_ultimatetrivia_components_QuizType.TOPIC) this._quizPackId += "t_"; else this._quizPackId += "oops_";
	this._quizPackId += Std.string(gt.category).toLowerCase();
	this.requiredPacks.push(this._quizPackId);
};
$hxClasses["com.nick.ultimatetrivia.scenes.QuestionScene"] = com_nick_ultimatetrivia_scenes_QuestionScene;
com_nick_ultimatetrivia_scenes_QuestionScene.__name__ = ["com","nick","ultimatetrivia","scenes","QuestionScene"];
com_nick_ultimatetrivia_scenes_QuestionScene.__super__ = com_nick_ultimatetrivia_scenes_InGameScene;
com_nick_ultimatetrivia_scenes_QuestionScene.prototype = $extend(com_nick_ultimatetrivia_scenes_InGameScene.prototype,{
	assetsReady: function() {
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.assetsReady.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var pack = this._assets.get("question_scene");
		var globalPack = this._assets.get("global");
		var questionPack = this._assets.get(this._quizPackId);
		var gt;
		var component1 = flambe_System.root.getComponent("GameTracker_8");
		gt = component1;
		s2_sound_MusicManager.loopSoundStandard(globalPack,"sfx/utg_gameplay_quiz_musicloopv1",1);
		var questions = gt.get_questions();
		var c_bar = new flambe_display_FillSprite(0,1366,112);
		c_bar.y.set__(239);
		this._bar.add(c_bar);
		this._container.addChild(this._bar);
		var c_hud = new com_nick_ultimatetrivia_components_Hud(pack);
		this._hud.add(c_hud);
		this._container.addChild(this._hud);
		this.nextQuestion();
		this.onResize();
	}
	,completeQuestion: function() {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		var c_questionDisplay = Std.instance(this._questionDisplay.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_question_QuestionDisplay);
		if(c_questionDisplay != null) c_questionDisplay.transitionOut();
		if(gt.get_failed() || gt.questionIndex >= gt.get_numQuestions() - 1) this.playStinger();
	}
	,nextQuestion: function() {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		this._question = gt.nextQuestion();
		if(this._question != null) {
			var pack = this._assets.get("question_scene");
			var globalPack = this._assets.get("global");
			var questionPack = this._assets.get(this._quizPackId);
			var disposer;
			var component1 = this.owner.getComponent("Disposer_9");
			disposer = component1;
			var c_questionDisplay = Std.instance(this._questionDisplay.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_question_QuestionDisplay);
			disposer.connect0(this._question.optionChanged,$bind(this,this.onOptionChange));
			if(this._questionDisplay != null) this._questionDisplay.dispose();
			this._questionDisplay = new flambe_Entity();
			this._container.addChild(this._questionDisplay);
			c_questionDisplay = com_nick_ultimatetrivia_components_question_QuestionDisplay.getDisplay(pack,questionPack,globalPack,this._question);
			disposer.connect1(c_questionDisplay.transitionedOut,$bind(this,this.onQuestionTranitionedOut));
			this._questionDisplay.add(c_questionDisplay);
		}
	}
	,onOptionChange: function() {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		if(this._question.type == com_nick_ultimatetrivia_QuestionType.MATCH || this._question.type == com_nick_ultimatetrivia_QuestionType.MATCH_IMAGE) {
			if(this._question.get_allAnswered()) this.completeQuestion();
		} else this.completeQuestion();
	}
	,onQuestionTranitionedOut: function(questionDisplay) {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		questionDisplay.owner.dispose();
		if(gt.get_failed()) this.complete(); else if(gt.questionIndex < gt.get_numQuestions() - 1) this.nextQuestion(); else this.complete();
	}
	,complete: function() {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		gt.finishQuiz();
		this._questionDisplay.dispose();
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_ResultsScene);
	}
	,playStinger: function() {
		var globalPack = this._assets.get("global");
		s2_sound_MusicManager.stop();
		globalPack.getSound("sfx/utg_gameplay_quiz_music_endstingerv1").play();
	}
	,onResize: function() {
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.onResize.call(this);
		if((function($this) {
			var $r;
			var component = $this._hud.getComponent("Hud_13");
			$r = component;
			return $r;
		}(this)) != null) ((function($this) {
			var $r;
			var component1 = $this._hud.getComponent("Hud_13");
			$r = component1;
			return $r;
		}(this))).onResize();
	}
	,onRemoved: function() {
		this._assets.unload(this._quizPackId);
		this._assets.unload("question_scene");
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.onRemoved.call(this);
	}
	,__class__: com_nick_ultimatetrivia_scenes_QuestionScene
});
var com_nick_ultimatetrivia_scenes_QuizSelectScene = function() {
	this._currentPage = 0;
	this._btnHolder = new flambe_Entity();
	this._navBtns = [];
	this._btns = [];
	com_nick_ultimatetrivia_scenes_InGameScene.call(this);
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	this._headLocale = "global.quizType_" + Std.string(gt.quizType).toLowerCase();
	this.requiredPacks.push("quiz_select_scene");
};
$hxClasses["com.nick.ultimatetrivia.scenes.QuizSelectScene"] = com_nick_ultimatetrivia_scenes_QuizSelectScene;
com_nick_ultimatetrivia_scenes_QuizSelectScene.__name__ = ["com","nick","ultimatetrivia","scenes","QuizSelectScene"];
com_nick_ultimatetrivia_scenes_QuizSelectScene.__super__ = com_nick_ultimatetrivia_scenes_InGameScene;
com_nick_ultimatetrivia_scenes_QuizSelectScene.prototype = $extend(com_nick_ultimatetrivia_scenes_InGameScene.prototype,{
	assetsReady: function() {
		var _g2 = this;
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.assetsReady.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var pack = this._assets.get("quiz_select_scene");
		var globalPack = this._assets.get("global");
		var c_btnHolder = new flambe_display_Sprite();
		c_btnHolder.x.set__(-800);
		c_btnHolder.x.animateTo(370,1.5,flambe_animation_Ease.backOut);
		this._btnHolder.add(c_btnHolder);
		this._backing.addChild(this._btnHolder);
		var gt;
		var component1 = flambe_System.root.getComponent("GameTracker_8");
		gt = component1;
		var btn;
		var c_btn;
		var pos;
		var coin;
		var icon;
		var wrapWidth = 400;
		this._categories = gt.getCategoryIds();
		var _g1 = 0;
		var _g = this._categories.length;
		while(_g1 < _g) {
			var i = [_g1++];
			pos = i[0] % 5;
			if(i[0] == this._categories.length - 1) {
				if(i[0] % 5 == 0) pos = 2;
			}
			this._btns[i[0]] = btn = new flambe_Entity();
			c_btn = new s2_ui_TextButton(pack,"ui/btn" + pos,"quizSelect.btn");
			c_btn.get_buttonMode().playSound = false;
			c_btn.setText(s2_localization_Locale.getFormat("categoryNames." + Std.string(this._categories[i[0]]).toLowerCase()).text);
			c_btn.get_textSprite().wrapWidth.set__(wrapWidth);
			c_btn.get_textSprite().set_align(flambe_display_TextAlign.Center);
			c_btn.setXY(i[0] * 310,460);
			c_btn.get_textSprite().centerAnchor();
			btn.add(c_btn);
			c_btn.get_textSprite().x.set__(7);
			c_btn.get_textSprite().y.set__(43);
			while(flambe_display_Sprite.getBounds(c_btn.get_textSprite().owner).height > 120) {
				c_btn.get_textSprite().setScale(c_btn.get_textSprite().scaleX.get__() - 0.01);
				c_btn.get_textSprite().centerAnchor();
			}
			coin = new flambe_Entity();
			var c_coin;
			var c_icon;
			if(gt.quizType == com_nick_ultimatetrivia_components_QuizType.PROPERTY) {
				c_coin = new flambe_display_Sprite();
				c_icon = new flambe_display_ImageSprite(globalPack.getTexture("icons/" + Std.string(this._categories[i[0]]).toLowerCase()));
			} else {
				c_coin = new flambe_display_Sprite();
				c_icon = new flambe_display_ImageSprite(globalPack.getTexture("icons_50_quizzes/icon" + i[0] % 5));
			}
			c_coin.setXY(-90,-196);
			coin.add(c_coin);
			this._btns[i[0]].firstChild.addChild(coin);
			icon = new flambe_Entity().add(c_icon);
			coin.addChild(icon);
			this._btnHolder.addChild(btn);
			disposer.connect1(c_btn.get_engaged(),(function(i) {
				return function(_) {
					_g2.onButtonClick(i[0]);
				};
			})(i));
		}
		var c_navBtn;
		var btnIds = ["lt","rt"];
		var _g3 = 0;
		while(_g3 < 2) {
			var i1 = [_g3++];
			c_navBtn = new s2_ui_BasicButton(pack,"ui/btn_" + btnIds[i1[0]]);
			c_navBtn.setXY(i1[0] * 828 + 268,400);
			this._navBtns[i1[0]] = new flambe_Entity().add(c_navBtn);
			((function(i1) {
				return function() {
					var id = i1[0];
					disposer.connect1(c_navBtn.get_engaged(),(function() {
						return function(_1) {
							switch(id) {
							case 0:
								_g2.navToPos(-1);
								break;
							case 1:
								_g2.navToPos(1);
								break;
							}
						};
					})());
				};
			})(i1))();
		}
		var fling = new com_nick_ultimatetrivia_components_Fling2(this._btnHolder);
		this._container.add(fling);
		disposer.connect2(((function($this) {
			var $r;
			var component2 = $this._btnHolder.getComponent("Sprite_3");
			$r = component2;
			return $r;
		}(this))).x.get_changed(),$bind(this,this.onHolderXChanged));
	}
	,onHolderXChanged: function(curr,prev) {
		var wrapExtra = 400;
		var btn;
		var offsetX = Math.ceil((curr + wrapExtra) / (this._btns.length * 310));
		if(curr < prev) {
			var _g1 = 0;
			var _g = this._btns.length;
			while(_g1 < _g) {
				var i = _g1++;
				var component = this._btns[i].getComponent("Sprite_3");
				btn = component;
				if(btn.x.get__() + curr < -wrapExtra) btn.x.set__((-offsetX + 1) * this._btns.length * 310 + i * 310);
			}
		} else if(curr >= prev) {
			var _g11 = 0;
			var _g2 = this._btns.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var component1 = this._btns[i1].getComponent("Sprite_3");
				btn = component1;
				if(btn.x.get__() + curr > wrapExtra + 1366) btn.x.set__(-offsetX * this._btns.length * 310 + i1 * 310);
			}
		}
	}
	,navToPos: function(step) {
		this._currentPage += step;
		this._currentPage = Math.round(flambe_math_FMath.clamp(this._currentPage,0,Math.round(this._categories.length / 5)));
		var theX;
		theX = ((function($this) {
			var $r;
			var component = $this._btnHolder.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).x;
		var pos = Math.round(theX.get__() / 310);
		(js_Boot.__cast(((function($this) {
			var $r;
			var component1 = $this._btnHolder.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).x.get_behavior() , s2_behavior_Damping)).target = pos * 310 + step * 310;
	}
	,onButtonClick: function(id) {
		if(Std.instance(this._container.getComponent("SpriteUser_0"),com_nick_ultimatetrivia_components_Fling2).get_dist() < 20) {
			var gt;
			var component = flambe_System.root.getComponent("GameTracker_8");
			gt = component;
			gt.generateQuestions(this._categories[id]);
			var globalPack = this._assets.get("global");
			globalPack.getSound("sfx/select_quiz_button").play();
			s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuestionScene);
		}
	}
	,onRemoved: function() {
		this.requiredPacks.push("quiz_select_scene");
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.onRemoved.call(this);
	}
	,__class__: com_nick_ultimatetrivia_scenes_QuizSelectScene
});
var com_nick_ultimatetrivia_scenes_ResultsScene = function() {
	this._msgDesc = new flambe_Entity();
	this._msgHead = new flambe_Entity();
	this._numberBlocks = new flambe_Entity();
	this._wedgeWings = new flambe_Entity();
	this._banner = new flambe_Entity();
	com_nick_ultimatetrivia_scenes_InGameScene.call(this);
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	this._headLocale = "categoryNames." + Std.string(gt.category).toLowerCase();
	this.requiredPacks.push("results_scene");
};
$hxClasses["com.nick.ultimatetrivia.scenes.ResultsScene"] = com_nick_ultimatetrivia_scenes_ResultsScene;
com_nick_ultimatetrivia_scenes_ResultsScene.__name__ = ["com","nick","ultimatetrivia","scenes","ResultsScene"];
com_nick_ultimatetrivia_scenes_ResultsScene.__super__ = com_nick_ultimatetrivia_scenes_InGameScene;
com_nick_ultimatetrivia_scenes_ResultsScene.prototype = $extend(com_nick_ultimatetrivia_scenes_InGameScene.prototype,{
	assetsReady: function() {
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.assetsReady.call(this);
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var pack = this._assets.get("results_scene");
		var globalPack = this._assets.get("global");
		var gt;
		var component1 = flambe_System.root.getComponent("GameTracker_8");
		gt = component1;
		var timeUtil = new s2_util_TimeUtil();
		this.owner.add(timeUtil);
		timeUtil.timeout(function() {
			s2_sound_MusicManager.loopSoundStandard(pack,"snd/utg_splash_menuscreens__endscreen_musicloopv1",1);
		},0.0);
		this._btnHub = new flambe_Entity();
		var c_btnHub = new s2_ui_TextButton(globalPack,"ui/btn_pink","results.btnHub");
		this._btnHub.add(c_btnHub);
		this._container.addChild(this._btnHub);
		this._btnRandom = new flambe_Entity();
		this._btnRandom.add(new s2_ui_TextButton(globalPack,"ui/btn_blue","results.btnRandom"));
		this._container.addChild(this._btnRandom);
		this._btnReplay = new flambe_Entity();
		this._btnReplay.add(new s2_ui_TextButton(globalPack,"ui/btn_orange","results.btnReplay"));
		this._container.addChild(this._btnReplay);
		var c_banner = new flambe_display_ImageSprite(pack.getTexture("results_banner"));
		c_banner.setXY(260,253);
		this._banner.add(c_banner);
		this._container.addChild(this._banner);
		if(!gt.isPersonalityQuiz()) {
			var c_wedgeWings = new flambe_display_ImageSprite(pack.getTexture("wedge_wings"));
			c_wedgeWings.setXY(130,76);
			this._wedgeWings.add(c_wedgeWings);
			this._banner.addChild(this._wedgeWings);
			var c_numberBlocks = new flambe_display_ImageSprite(pack.getTexture("number_blocks"));
			c_numberBlocks.setXY(325,85);
			this._numberBlocks.add(c_numberBlocks);
			this._banner.addChild(this._numberBlocks);
			var c_howMany = s2_localization_Locale.getField("results.numCorrect",0,flambe_display_TextAlign.Center);
			c_howMany.setXY(432,208);
			this._banner.addChild(new flambe_Entity().add(c_howMany));
			var msgLoc;
			if(gt.get_failed()) msgLoc = "results.failMsg"; else msgLoc = "results.successMsg";
			var c_msg = s2_localization_Locale.getField(msgLoc,0,flambe_display_TextAlign.Center);
			c_msg.setXY(432,36);
			this._banner.addChild(new flambe_Entity().add(c_msg));
			var numCorrect = s2_util_StringUtil.zeroPad(gt.get_numCorrect(),2);
			var digit0 = s2_localization_Locale.getField("results.digit",0,flambe_display_TextAlign.Center);
			digit0.setXY(377,92);
			digit0.set_text(numCorrect.charAt(0));
			this._banner.addChild(new flambe_Entity().add(digit0));
			var digit1 = s2_localization_Locale.getField("results.digit",0,flambe_display_TextAlign.Center);
			digit1.setXY(478,92);
			digit1.set_text(numCorrect.charAt(1));
			this._banner.addChild(new flambe_Entity().add(digit1));
		} else {
			var rand = -1;
			var id = "";
			var descY = -1;
			var c_msgHead;
			var c_msgDesc;
			var ex = 132;
			var width = 590;
			if(gt.category == com_nick_ultimatetrivia_CategoryId.RATHER) {
				rand = s2_util_Utils.randomInt(6) + 1;
				descY = 139;
				id = "results.rather";
			} else if(gt.category == com_nick_ultimatetrivia_CategoryId.PERSONALITY) {
				rand = s2_util_Utils.randomInt(9) + 1;
				id = "results.personality";
				descY = 178;
				c_msgHead = s2_localization_Locale.getField(id + "Head" + rand,width,flambe_display_TextAlign.Center);
				c_msgHead.lineSpacing.set__(-6);
				this._msgHead.add(c_msgHead);
				c_msgHead.setXY(ex,80 - flambe_display_Sprite.getBounds(this._msgHead).height / 2);
				this._banner.addChild(this._msgHead);
			}
			c_msgDesc = s2_localization_Locale.getField(id + "Desc" + rand,width,flambe_display_TextAlign.Center);
			c_msgDesc.lineSpacing.set__(-3);
			this._msgDesc.add(c_msgDesc);
			c_msgDesc.setXY(ex,descY - flambe_display_Sprite.getBounds(this._msgDesc).height / 2);
			this._banner.addChild(this._msgDesc);
		}
		disposer.connect1(Std.instance(this._btnHub.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onNextButtonClick));
		disposer.connect1(Std.instance(this._btnRandom.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onRandomButtonClick));
		disposer.connect1(Std.instance(this._btnReplay.getComponent("SpriteUser_0"),s2_ui_BasicButton).get_engaged(),$bind(this,this.onReplayButtonClick));
		var btnY = 600;
		if(gt.randomQuizMode) {
			((function($this) {
				var $r;
				var component2 = $this._btnHub.getComponent("Sprite_3");
				$r = component2;
				return $r;
			}(this))).setXY(357,btnY);
			((function($this) {
				var $r;
				var component3 = $this._btnRandom.getComponent("Sprite_3");
				$r = component3;
				return $r;
			}(this))).setXY(678,btnY);
			((function($this) {
				var $r;
				var component4 = $this._btnReplay.getComponent("Sprite_3");
				$r = component4;
				return $r;
			}(this))).setXY(1005,btnY);
		} else {
			((function($this) {
				var $r;
				var component5 = $this._btnHub.getComponent("Sprite_3");
				$r = component5;
				return $r;
			}(this))).setXY(460,btnY);
			((function($this) {
				var $r;
				var component6 = $this._btnRandom.getComponent("Sprite_3");
				$r = component6;
				return $r;
			}(this))).set_visible(false);
			((function($this) {
				var $r;
				var component7 = $this._btnReplay.getComponent("Sprite_3");
				$r = component7;
				return $r;
			}(this))).setXY(900,btnY);
		}
	}
	,onResize: function() {
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.onResize.call(this);
	}
	,onNextButtonClick: function(e) {
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_BrainHubScene);
	}
	,onRandomButtonClick: function(e) {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		var categories = Type.allEnums(com_nick_ultimatetrivia_CategoryId);
		var category = categories[Math.round(Math.random() * categories.length)];
		gt.setQuizType(com_nick_ultimatetrivia_Data.getCategoryType(category),true);
		gt.generateQuestions(category);
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuestionScene);
	}
	,onReplayButtonClick: function(e) {
		var gt;
		var component = flambe_System.root.getComponent("GameTracker_8");
		gt = component;
		gt.generateQuestions(gt.category);
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_QuestionScene);
	}
	,onRemoved: function() {
		s2_sound_MusicManager.stop();
		this._assets.unload("results_scene");
		com_nick_ultimatetrivia_scenes_InGameScene.prototype.onRemoved.call(this);
	}
	,__class__: com_nick_ultimatetrivia_scenes_ResultsScene
});
var com_nick_ultimatetrivia_scenes_TitleScene = function() {
	this._linesHolder = new flambe_Entity();
	this._lines = [];
	this._btnMute = new flambe_Entity();
	this._play = new flambe_Entity();
	this._head = new flambe_Entity();
	this._shards1 = new flambe_Entity();
	this._title = new flambe_Entity();
	this._logo = new flambe_Entity();
	s2_scene_AutoFillScene.call(this);
	this.requiredPacks.push("title_scene");
	this.requiredPacks.push("global");
	var gt;
	var component = flambe_System.root.getComponent("GameTracker_8");
	gt = component;
	if(!gt.inited) this.requiredPacks.push("data");
};
$hxClasses["com.nick.ultimatetrivia.scenes.TitleScene"] = com_nick_ultimatetrivia_scenes_TitleScene;
com_nick_ultimatetrivia_scenes_TitleScene.__name__ = ["com","nick","ultimatetrivia","scenes","TitleScene"];
com_nick_ultimatetrivia_scenes_TitleScene.__super__ = s2_scene_AutoFillScene;
com_nick_ultimatetrivia_scenes_TitleScene.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	assetsReady: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		var timeUtil;
		var component1 = this.owner.getComponent("TimeUtil_2");
		timeUtil = component1;
		if(timeUtil == null) this.owner.add(timeUtil = new s2_util_TimeUtil());
		var pack = this._assets.get("title_scene");
		var globalPack = this._assets.get("global");
		var dataPack;
		s2_sound_MusicManager.loopSoundStandard(globalPack,"sfx/utg_gameplay_quiz_musicloopv1",1);
		var gt;
		var component2 = flambe_System.root.getComponent("GameTracker_8");
		gt = component2;
		if(!gt.inited) {
			dataPack = this._assets.get("data");
			gt.init(dataPack.getFile("questions.xml"));
		}
		s2_display_ButtonMode.initialize(globalPack.getSound("sfx/answer_button_click"));
		this.setBackground(new s2_display_SizeSprite(1366,768));
		var textures = [];
		var _g = 0;
		while(_g < 12) {
			var i = _g++;
			textures.push(globalPack.getTexture("fill_bg"));
		}
		var c_lineHolder = new flambe_display_Sprite().setXY(990,470);
		c_lineHolder.disablePointer();
		this._linesHolder.add(c_lineHolder);
		this._container.addChild(this._linesHolder);
		var c_line;
		var _g1 = 0;
		while(_g1 < 120) {
			var i1 = _g1++;
			this._lines[i1] = new flambe_Entity();
			c_line = new flambe_display_FillSprite(13232926,i1 % 2 == 0?300:200,1);
			c_line.rotation.set__(i1 / 120 * 360);
			this._lines[i1].add(c_line);
			this._linesHolder.addChild(this._lines[i1]);
		}
		this.owner.add(new flambe_script_Script());
		var by = new flambe_script_AnimateBy(c_lineHolder.rotation,360,40);
		var repeat = new flambe_script_Repeat(by);
		((function($this) {
			var $r;
			var component3 = $this.owner.getComponent("Script_5");
			$r = component3;
			return $r;
		}(this))).run(repeat);
		var c_fill = new s2_display_MultiTextureSprite(textures,6);
		this._backing.addChild(new flambe_Entity().add(c_fill));
		var c_vignette = new s2_display_MultiTextureSprite([globalPack.getTexture("vignette_01"),globalPack.getTexture("vignette_02")]);
		this._backing.addChild(new flambe_Entity().add(c_vignette));
		var e_confettiLayer = new flambe_Entity();
		var c_confettiLayer = new com_nick_ultimatetrivia_components_ConfettiLayer(globalPack);
		e_confettiLayer.add(c_confettiLayer);
		this._backing.addChild(e_confettiLayer);
		var onMuteEngaged = function(e) {
			flambe_System.volume.set__(flambe_System.volume.get__() == 0?1:0);
		};
		var c_btnMute = new s2_ui_BasicButton(globalPack,"ui/mute_btn");
		this._btnMute.add(c_btnMute);
		disposer.connect1(c_btnMute.get_engaged(),onMuteEngaged);
		this._container.addChild(this._btnMute);
		var addBtnIcon = function() {
			var id;
			if(flambe_System.volume.get__() == 0) id = "ui/sound_off"; else id = "ui/sound_on";
			c_btnMute.get_overlay().add(new flambe_display_ImageSprite(globalPack.getTexture(id)).centerAnchor().setXY(5,-5));
		};
		addBtnIcon();
		disposer.connect2(flambe_System.volume.get_changed(),function(to,_) {
			addBtnIcon();
		});
		this._logo.add(new flambe_display_ImageSprite(pack.getTexture("logo")).disablePointer());
		this._title.add(new flambe_display_ImageSprite(pack.getTexture("title")).centerAnchor().disablePointer());
		this._head.add(new flambe_display_ImageSprite(pack.getTexture("head")).centerAnchor().disablePointer());
		this._shards1.add(new flambe_display_ImageSprite(pack.getTexture("shards")).disablePointer());
		this._backing.add(new s2_display_ButtonMode(Math.round(Math.random() * 200)));
		this._play.add(new s2_ui_TextButton(pack,"start_btn","title.play"));
		Std.instance(this._play.getComponent("SpriteUser_0"),s2_ui_TextButton).get_textSprite().y.set__(-35);
		this._container.addChild(this._logo).addChild(this._head).addChild(this._title).addChild(this._shards1).addChild(this._play);
		disposer.connect1(((function($this) {
			var $r;
			var component4 = $this._backing.getComponent("ButtonMode_1");
			$r = component4;
			return $r;
		}(this))).engaged,$bind(this,this.onNextClick));
		disposer.connect1(Std.instance(this._play.getComponent("SpriteUser_0"),s2_ui_TextButton).get_engaged(),$bind(this,this.onNextClick));
	}
	,onResize: function() {
		s2_scene_AutoFillScene.prototype.onResize.call(this);
		((function($this) {
			var $r;
			var component = $this._logo.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).setXY(347,143);
		((function($this) {
			var $r;
			var component1 = $this._title.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).setXY(496,390);
		((function($this) {
			var $r;
			var component2 = $this._play.getComponent("Sprite_3");
			$r = component2;
			return $r;
		}(this))).setXY(531,606);
		((function($this) {
			var $r;
			var component3 = $this._head.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).x.set__(990);
		((function($this) {
			var $r;
			var component4 = $this._head.getComponent("Sprite_3");
			$r = component4;
			return $r;
		}(this))).y.set__(460);
		s2_display_LayoutUtil.top(s2_display_LayoutUtil.right(this._btnMute,25),25);
	}
	,onUpdate: function(dt) {
		s2_scene_AutoFillScene.prototype.onUpdate.call(this,dt);
		var c_line;
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			var component = this._lines[i].getComponent("Sprite_3");
			c_line = component;
			if((c_line.rotation.get__() + ((function($this) {
				var $r;
				var component1 = $this._linesHolder.getComponent("Sprite_3");
				$r = component1;
				return $r;
			}(this))).rotation.get__() - 7) % 360 > 180) {
				if(c_line.alpha.get__() == 0) c_line.alpha.animateTo(1,0.5);
			} else if(c_line.alpha.get__() == 1) c_line.alpha.animateTo(0,0.5);
		}
	}
	,onNextClick: function(e) {
		s2_client_Config.track(["play"]);
		s2_scene_Scenes["goto"](com_nick_ultimatetrivia_scenes_BrainHubScene);
	}
	,onRemoved: function() {
		this._assets.unload("title_scene");
		this._assets.unload("data",false);
	}
	,__class__: com_nick_ultimatetrivia_scenes_TitleScene
});
var flambe_Disposer = function() {
	flambe_Component.call(this);
	this._disposables = [];
};
$hxClasses["flambe.Disposer"] = flambe_Disposer;
flambe_Disposer.__name__ = ["flambe","Disposer"];
flambe_Disposer.__super__ = flambe_Component;
flambe_Disposer.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Disposer_9";
	}
	,add: function(disposable) {
		this._disposables.push(disposable);
		return this;
	}
	,connect0: function(signal,listener) {
		this.add(signal.connect(listener));
		return this;
	}
	,connect1: function(signal,listener) {
		this.add(signal.connect(listener));
		return this;
	}
	,connect2: function(signal,listener) {
		this.add(signal.connect(listener));
		return this;
	}
	,onRemoved: function() {
		this.freeDisposables();
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		this.freeDisposables();
	}
	,freeDisposables: function() {
		var snapshot = this._disposables;
		this._disposables = [];
		var _g = 0;
		while(_g < snapshot.length) {
			var disposable = snapshot[_g];
			++_g;
			disposable.dispose();
		}
	}
	,__class__: flambe_Disposer
});
var flambe_Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe_Entity;
flambe_Entity.__name__ = ["flambe","Entity"];
flambe_Entity.__interfaces__ = [flambe_util_Disposable];
flambe_Entity.prototype = {
	add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null;
		var p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.next = component; else this.firstComponent = component;
		component.owner = this;
		component.next = null;
		component.onAdded();
		return this;
	}
	,remove: function(component) {
		var prev = null;
		var p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else {
					prev.owner = this;
					prev.next = next;
				}
				delete(this._compMap[p.get_name()]);
				if(flambe_util_BitSets.contains(p._flags,1)) {
					p.onStop();
					p._flags = flambe_util_BitSets.remove(p._flags,1);
				}
				p.onRemoved();
				p.owner = null;
				p.next = null;
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,getComponent: function(name) {
		return this._compMap[name];
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null;
			var p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,removeChild: function(entity) {
		var prev = null;
		var p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,toString: function() {
		return this.toStringImpl("");
	}
	,toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
	}
	,_internal_getFromParents: function(name,safeCast) {
		var entity = this;
		do {
			var component = entity.getComponent(name);
			if(safeCast != null) component = Std.instance(component,safeCast);
			if(component != null) return component;
			entity = entity.parent;
		} while(entity != null);
		return null;
	}
	,__class__: flambe_Entity
};
var flambe_util_PackageLog = function() { };
$hxClasses["flambe.util.PackageLog"] = flambe_util_PackageLog;
flambe_util_PackageLog.__name__ = ["flambe","util","PackageLog"];
var flambe_platform_Platform = function() { };
$hxClasses["flambe.platform.Platform"] = flambe_platform_Platform;
flambe_platform_Platform.__name__ = ["flambe","platform","Platform"];
flambe_platform_Platform.prototype = {
	__class__: flambe_platform_Platform
};
var flambe_platform_html_HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe_platform_html_HtmlPlatform;
flambe_platform_html_HtmlPlatform.__name__ = ["flambe","platform","html","HtmlPlatform"];
flambe_platform_html_HtmlPlatform.__interfaces__ = [flambe_platform_Platform];
flambe_platform_html_HtmlPlatform.prototype = {
	init: function() {
		var _g = this;
		flambe_platform_html_HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js_Browser.get_window().flambe.canvas;
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
		}
		flambe_util_Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.style.webkitTapHighlightColor = "transparent";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe_platform_html_HtmlStage(canvas);
		this._pointer = new flambe_platform_BasicPointer();
		this._mouse = new flambe_platform_html_HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe_platform_MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			var _g1 = event.type;
			switch(_g1) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity;
				if(event.type == "mousewheel") velocity = event.wheelDelta / 40; else velocity = -event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js_Browser.get_window().addEventListener("mousedown",onMouse,false);
		js_Browser.get_window().addEventListener("mousemove",onMouse,false);
		js_Browser.get_window().addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		canvas.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},false);
		var standardTouch = typeof(js_Browser.get_window().ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe_platform_BasicTouch(this._pointer,standardTouch?4:js_Browser.get_navigator().msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event2) {
				var changedTouches;
				if(standardTouch) changedTouches = event2.changedTouches; else changedTouches = [event2];
				var bounds1 = event2.target.getBoundingClientRect();
				lastTouchTime = event2.timeStamp;
				var _g2 = event2.type;
				switch(_g2) {
				case "touchstart":case "MSPointerDown":case "pointerdown":
					event2.preventDefault();
					if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe_platform_html_HtmlUtil.hideMobileBrowser();
					var _g11 = 0;
					while(_g11 < changedTouches.length) {
						var touch = changedTouches[_g11];
						++_g11;
						var x1 = _g.getX(touch,bounds1);
						var y1 = _g.getY(touch,bounds1);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitDown(id,x1,y1);
					}
					break;
				case "touchmove":case "MSPointerMove":case "pointermove":
					event2.preventDefault();
					var _g12 = 0;
					while(_g12 < changedTouches.length) {
						var touch1 = changedTouches[_g12];
						++_g12;
						var x2 = _g.getX(touch1,bounds1);
						var y2 = _g.getY(touch1,bounds1);
						var id1 = Std["int"](standardTouch?touch1.identifier:touch1.pointerId);
						basicTouch.submitMove(id1,x2,y2);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":case "pointerup":
					var _g13 = 0;
					while(_g13 < changedTouches.length) {
						var touch2 = changedTouches[_g13];
						++_g13;
						var x3 = _g.getX(touch2,bounds1);
						var y3 = _g.getY(touch2,bounds1);
						var id2 = Std["int"](standardTouch?touch2.identifier:touch2.pointerId);
						basicTouch.submitUp(id2,x3,y3);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe_platform_DummyTouch();
		var oldErrorHandler = js_Browser.get_window().onerror;
		js_Browser.get_window().onerror = function(message,url,line) {
			flambe_System.uncaughtError.emit(message);
			if(oldErrorHandler != null) return oldErrorHandler(message,url,line); else return false;
		};
		var hiddenApi = flambe_platform_html_HtmlUtil.loadExtension("hidden",js_Browser.get_document());
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe_System.hidden.set__(Reflect.field(js_Browser.get_document(),hiddenApi.field));
			};
			onVisibilityChanged(null);
			js_Browser.get_document().addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event3) {
				flambe_System.hidden.set__(event3.type == "pagehide");
			};
			js_Browser.get_window().addEventListener("pageshow",onPageTransitionChange,false);
			js_Browser.get_window().addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe_System.hidden.get_changed().connect(function(hidden,_1) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = flambe_platform_html_HtmlUtil.now();
		var requestAnimationFrame = flambe_platform_html_HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js_Browser.get_window().performance;
			var hasPerfNow = performance != null && flambe_platform_html_HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe_Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe_Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js_Browser.get_window().setInterval(function() {
				_g.update(flambe_platform_html_HtmlUtil.now());
			},16);
		}
		new flambe_platform_DebugLogic(this);
		if(flambe_platform_html_HtmlCatapultClient.canUse()) this._catapult = new flambe_platform_html_HtmlCatapultClient(); else this._catapult = null;
		flambe_Log.info("Initialized HTML platform",["renderer",this._renderer.get_type()]);
	}
	,loadAssetPack: function(manifest) {
		return new flambe_platform_html_HtmlAssetPackLoader(this,manifest).promise;
	}
	,getStage: function() {
		return this._stage;
	}
	,getStorage: function() {
		if(this._storage == null) {
			var localStorage = js_Browser.getLocalStorage();
			if(localStorage != null) this._storage = new flambe_platform_html_HtmlStorage(localStorage); else {
				flambe_Log.warn("localStorage is unavailable, falling back to unpersisted storage");
				this._storage = new flambe_platform_DummyStorage();
			}
		}
		return this._storage;
	}
	,createLogHandler: function(tag) {
		if(flambe_platform_html_HtmlLogHandler.isSupported()) return new flambe_platform_html_HtmlLogHandler(tag);
		return null;
	}
	,getCatapultClient: function() {
		return this._catapult;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe_System.hidden.get__()) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getPointer: function() {
		return this._pointer;
	}
	,getMouse: function() {
		return this._mouse;
	}
	,getTouch: function() {
		return this._touch;
	}
	,getKeyboard: function() {
		var _g1 = this;
		if(this._keyboard == null) {
			this._keyboard = new flambe_platform_BasicKeyboard();
			var onKey = function(event) {
				var _g = event.type;
				switch(_g) {
				case "keydown":
					if(_g1._keyboard.submitDown(event.keyCode)) event.preventDefault();
					break;
				case "keyup":
					_g1._keyboard.submitUp(event.keyCode);
					break;
				}
			};
			this._canvas.addEventListener("keydown",onKey,false);
			this._canvas.addEventListener("keyup",onKey,false);
		}
		return this._keyboard;
	}
	,getExternal: function() {
		if(this._external == null) this._external = new flambe_platform_html_HtmlExternal();
		return this._external;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,createRenderer: function(canvas) {
		try {
			var gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(canvas,{ alpha : false, depth : false, failIfMajorPerformanceCaveat : true});
			if(gl != null) {
				if(flambe_platform_html_HtmlUtil.detectSlowDriver(gl)) flambe_Log.warn("Detected a slow WebGL driver, falling back to canvas"); else return new flambe_platform_html_WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
		}
		return new flambe_platform_html_CanvasRenderer(canvas);
		flambe_Log.error("No renderer available!");
		return null;
	}
	,__class__: flambe_platform_html_HtmlPlatform
};
var flambe_util_Value = function(value,listener) {
	this._value = value;
	if(listener != null) this._changed = new flambe_util_Signal2(listener); else this._changed = null;
};
$hxClasses["flambe.util.Value"] = flambe_util_Value;
flambe_util_Value.__name__ = ["flambe","util","Value"];
flambe_util_Value.prototype = {
	watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,get__: function() {
		return this._value;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe_util_Signal2();
		return this._changed;
	}
	,toString: function() {
		return "" + Std.string(this._value);
	}
	,__class__: flambe_util_Value
	,__properties__: {get_changed:"get_changed",set__:"set__",get__:"get__"}
};
var flambe_util_SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe_util_SignalConnection;
flambe_util_SignalConnection.__name__ = ["flambe","util","SignalConnection"];
flambe_util_SignalConnection.__interfaces__ = [flambe_util_Disposable];
flambe_util_SignalConnection.prototype = {
	once: function() {
		this.stayInList = false;
		return this;
	}
	,dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,__class__: flambe_util_SignalConnection
};
var flambe_util_SignalBase = function(listener) {
	if(listener != null) this._head = new flambe_util_SignalConnection(this,listener); else this._head = null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe_util_SignalBase;
flambe_util_SignalBase.__name__ = ["flambe","util","SignalBase"];
flambe_util_SignalBase.prototype = {
	hasListeners: function() {
		return this._head != null;
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe_util_SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,defer: function(fn) {
		var tail = null;
		var p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe_util__$SignalBase_Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,willEmit: function() {
		flambe_util_Assert.that(!this.dispatching());
		var snapshot = this._head;
		this._head = flambe_util_SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null;
			var p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,listRemove: function(conn) {
		var prev = null;
		var p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,dispatching: function() {
		return this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL;
	}
	,__class__: flambe_util_SignalBase
};
var flambe_util_Signal2 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe_util_Signal2;
flambe_util_Signal2.__name__ = ["flambe","util","Signal2"];
flambe_util_Signal2.__super__ = flambe_util_SignalBase;
flambe_util_Signal2.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal2
});
var flambe_util_Signal1 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe_util_Signal1;
flambe_util_Signal1.__name__ = ["flambe","util","Signal1"];
flambe_util_Signal1.__super__ = flambe_util_SignalBase;
flambe_util_Signal1.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal1
});
var flambe_animation_AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe_util_Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe_animation_AnimatedFloat;
flambe_animation_AnimatedFloat.__name__ = ["flambe","animation","AnimatedFloat"];
flambe_animation_AnimatedFloat.__super__ = flambe_util_Value;
flambe_animation_AnimatedFloat.prototype = $extend(flambe_util_Value.prototype,{
	set__: function(value) {
		this._behavior = null;
		return flambe_util_Value.prototype.set__.call(this,value);
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe_util_Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,animateTo: function(to,seconds,easing) {
		this.set_behavior(new flambe_animation_Tween(this._value,to,seconds,easing));
	}
	,set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,get_behavior: function() {
		return this._behavior;
	}
	,__class__: flambe_animation_AnimatedFloat
	,__properties__: $extend(flambe_util_Value.prototype.__properties__,{set_behavior:"set_behavior",get_behavior:"get_behavior"})
});
var flambe_System = function() { };
$hxClasses["flambe.System"] = flambe_System;
flambe_System.__name__ = ["flambe","System"];
flambe_System.__properties__ = {get_renderer:"get_renderer",get_external:"get_external",get_touch:"get_touch",get_mouse:"get_mouse",get_pointer:"get_pointer",get_storage:"get_storage",get_stage:"get_stage"}
flambe_System.init = function() {
	if(!flambe_System._calledInit) {
		flambe_System._platform.init();
		flambe_System._calledInit = true;
	}
};
flambe_System.loadAssetPack = function(manifest) {
	flambe_System.assertCalledInit();
	return flambe_System._platform.loadAssetPack(manifest);
};
flambe_System.createLogger = function(tag) {
	return new flambe_util_Logger(flambe_System._platform.createLogHandler(tag));
};
flambe_System.get_stage = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getStage();
};
flambe_System.get_storage = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getStorage();
};
flambe_System.get_pointer = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getPointer();
};
flambe_System.get_mouse = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getMouse();
};
flambe_System.get_touch = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getTouch();
};
flambe_System.get_external = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getExternal();
};
flambe_System.get_renderer = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getRenderer();
};
flambe_System.assertCalledInit = function() {
	flambe_util_Assert.that(flambe_System._calledInit,"You must call System.init() first");
};
var flambe_util_Logger = function(handler) {
	this._handler = handler;
};
$hxClasses["flambe.util.Logger"] = flambe_util_Logger;
flambe_util_Logger.__name__ = ["flambe","util","Logger"];
flambe_util_Logger.prototype = {
	info: function(text,fields) {
		this.log(flambe_util_LogLevel.Info,text,fields);
	}
	,warn: function(text,fields) {
		this.log(flambe_util_LogLevel.Warn,text,fields);
	}
	,error: function(text,fields) {
		this.log(flambe_util_LogLevel.Error,text,fields);
	}
	,log: function(level,text,fields) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(fields != null) text = flambe_util_Strings.withFields(text,fields);
		this._handler.log(level,text);
	}
	,__class__: flambe_util_Logger
};
var flambe_Log = function() { };
$hxClasses["flambe.Log"] = flambe_Log;
flambe_Log.__name__ = ["flambe","Log"];
flambe_Log.info = function(text,args) {
	flambe_Log.logger.info(text,args);
};
flambe_Log.warn = function(text,args) {
	flambe_Log.logger.warn(text,args);
};
flambe_Log.error = function(text,args) {
	flambe_Log.logger.error(text,args);
};
flambe_Log.__super__ = flambe_util_PackageLog;
flambe_Log.prototype = $extend(flambe_util_PackageLog.prototype,{
	__class__: flambe_Log
});
var flambe_SpeedAdjuster = function(scale) {
	if(scale == null) scale = 1;
	this._realDt = 0;
	flambe_Component.call(this);
	this.scale = new flambe_animation_AnimatedFloat(scale);
};
$hxClasses["flambe.SpeedAdjuster"] = flambe_SpeedAdjuster;
flambe_SpeedAdjuster.__name__ = ["flambe","SpeedAdjuster"];
flambe_SpeedAdjuster.__super__ = flambe_Component;
flambe_SpeedAdjuster.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "SpeedAdjuster_7";
	}
	,onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,__class__: flambe_SpeedAdjuster
});
var flambe_animation_Behavior = function() { };
$hxClasses["flambe.animation.Behavior"] = flambe_animation_Behavior;
flambe_animation_Behavior.__name__ = ["flambe","animation","Behavior"];
flambe_animation_Behavior.prototype = {
	__class__: flambe_animation_Behavior
};
var flambe_animation_Ease = function() { };
$hxClasses["flambe.animation.Ease"] = flambe_animation_Ease;
flambe_animation_Ease.__name__ = ["flambe","animation","Ease"];
flambe_animation_Ease.linear = function(t) {
	return t;
};
flambe_animation_Ease.quadIn = function(t) {
	return t * t;
};
flambe_animation_Ease.quadOut = function(t) {
	return t * (2 - t);
};
flambe_animation_Ease.sineIn = function(t) {
	return 1 - Math.cos(1.57079632679489656 * t);
};
flambe_animation_Ease.sineOut = function(t) {
	return Math.sin(1.57079632679489656 * t);
};
flambe_animation_Ease.sineInOut = function(t) {
	return .5 - Math.cos(3.141592653589793 * t) / 2;
};
flambe_animation_Ease.bounceOut = function(t) {
	if(t < 0.363636363636363646) return 7.5625 * t * t;
	if(t < 0.727272727272727293) return 7.5625 * (t - 0.545454545454545414) * (t - 0.545454545454545414) + .75;
	if(t < 0.909090909090909061) return 7.5625 * (t - 0.818181818181818232) * (t - 0.818181818181818232) + .9375;
	return 7.5625 * (t - 0.954545454545454586) * (t - 0.954545454545454586) + .984375;
};
flambe_animation_Ease.expoOut = function(t) {
	return -Math.pow(2,-10 * t) + 1;
};
flambe_animation_Ease.backOut = function(t) {
	return 1 - --t * t * (-2.70158 * t - 1.70158);
};
var flambe_animation_Sine = function(start,end,speed,cycles,offset) {
	if(offset == null) offset = 0;
	if(cycles == null) cycles = 0;
	if(speed == null) speed = 1;
	this.start = start;
	this.end = end;
	this.cycles = cycles;
	this.speed = new flambe_animation_AnimatedFloat(speed);
	this._count = 1.57079632679489656 + offset * (3.141592653589793 / speed);
	this._distance = (start - end) * .5;
	this._center = end + this._distance;
};
$hxClasses["flambe.animation.Sine"] = flambe_animation_Sine;
flambe_animation_Sine.__name__ = ["flambe","animation","Sine"];
flambe_animation_Sine.__interfaces__ = [flambe_animation_Behavior];
flambe_animation_Sine.prototype = {
	update: function(dt) {
		this.speed.update(dt);
		this._count += dt * (3.141592653589793 / this.speed.get__());
		if(this.isComplete()) return this._center + 3.141592653589793 * this._distance;
		return this._center + Math.sin(this._count) * this._distance;
	}
	,isComplete: function() {
		return this.cycles > 0 && (this._count - 1.57079632679489656) / 3.141592653589793 * .5 >= this.cycles;
	}
	,__class__: flambe_animation_Sine
};
var flambe_animation_Tween = function(from,to,seconds,easing) {
	this._from = from;
	this._to = to;
	this._duration = seconds;
	this.elapsed = 0;
	if(easing != null) this._easing = easing; else this._easing = flambe_animation_Ease.linear;
};
$hxClasses["flambe.animation.Tween"] = flambe_animation_Tween;
flambe_animation_Tween.__name__ = ["flambe","animation","Tween"];
flambe_animation_Tween.__interfaces__ = [flambe_animation_Behavior];
flambe_animation_Tween.prototype = {
	update: function(dt) {
		this.elapsed += dt;
		if(this.elapsed >= this._duration) return this._to; else return this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration);
	}
	,isComplete: function() {
		return this.elapsed >= this._duration;
	}
	,__class__: flambe_animation_Tween
};
var flambe_asset_Asset = function() { };
$hxClasses["flambe.asset.Asset"] = flambe_asset_Asset;
flambe_asset_Asset.__name__ = ["flambe","asset","Asset"];
flambe_asset_Asset.__interfaces__ = [flambe_util_Disposable];
flambe_asset_Asset.prototype = {
	__class__: flambe_asset_Asset
	,__properties__: {get_reloadCount:"get_reloadCount"}
};
var flambe_asset_AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : ["flambe","asset","AssetFormat"], __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] };
flambe_asset_AssetFormat.WEBP = ["WEBP",0];
flambe_asset_AssetFormat.WEBP.toString = $estr;
flambe_asset_AssetFormat.WEBP.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JXR = ["JXR",1];
flambe_asset_AssetFormat.JXR.toString = $estr;
flambe_asset_AssetFormat.JXR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PNG = ["PNG",2];
flambe_asset_AssetFormat.PNG.toString = $estr;
flambe_asset_AssetFormat.PNG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JPG = ["JPG",3];
flambe_asset_AssetFormat.JPG.toString = $estr;
flambe_asset_AssetFormat.JPG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.GIF = ["GIF",4];
flambe_asset_AssetFormat.GIF.toString = $estr;
flambe_asset_AssetFormat.GIF.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.DDS = ["DDS",5];
flambe_asset_AssetFormat.DDS.toString = $estr;
flambe_asset_AssetFormat.DDS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PVR = ["PVR",6];
flambe_asset_AssetFormat.PVR.toString = $estr;
flambe_asset_AssetFormat.PVR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PKM = ["PKM",7];
flambe_asset_AssetFormat.PKM.toString = $estr;
flambe_asset_AssetFormat.PKM.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.MP3 = ["MP3",8];
flambe_asset_AssetFormat.MP3.toString = $estr;
flambe_asset_AssetFormat.MP3.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.M4A = ["M4A",9];
flambe_asset_AssetFormat.M4A.toString = $estr;
flambe_asset_AssetFormat.M4A.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OPUS = ["OPUS",10];
flambe_asset_AssetFormat.OPUS.toString = $estr;
flambe_asset_AssetFormat.OPUS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OGG = ["OGG",11];
flambe_asset_AssetFormat.OGG.toString = $estr;
flambe_asset_AssetFormat.OGG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.WAV = ["WAV",12];
flambe_asset_AssetFormat.WAV.toString = $estr;
flambe_asset_AssetFormat.WAV.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.Data = ["Data",13];
flambe_asset_AssetFormat.Data.toString = $estr;
flambe_asset_AssetFormat.Data.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.__empty_constructs__ = [flambe_asset_AssetFormat.WEBP,flambe_asset_AssetFormat.JXR,flambe_asset_AssetFormat.PNG,flambe_asset_AssetFormat.JPG,flambe_asset_AssetFormat.GIF,flambe_asset_AssetFormat.DDS,flambe_asset_AssetFormat.PVR,flambe_asset_AssetFormat.PKM,flambe_asset_AssetFormat.MP3,flambe_asset_AssetFormat.M4A,flambe_asset_AssetFormat.OPUS,flambe_asset_AssetFormat.OGG,flambe_asset_AssetFormat.WAV,flambe_asset_AssetFormat.Data];
var flambe_asset_AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe_asset_AssetEntry;
flambe_asset_AssetEntry.__name__ = ["flambe","asset","AssetEntry"];
flambe_asset_AssetEntry.prototype = {
	__class__: flambe_asset_AssetEntry
};
var flambe_asset_AssetPack = function() { };
$hxClasses["flambe.asset.AssetPack"] = flambe_asset_AssetPack;
flambe_asset_AssetPack.__name__ = ["flambe","asset","AssetPack"];
flambe_asset_AssetPack.__interfaces__ = [flambe_util_Disposable];
flambe_asset_AssetPack.prototype = {
	__class__: flambe_asset_AssetPack
	,__properties__: {get_manifest:"get_manifest"}
};
var flambe_asset_File = function() { };
$hxClasses["flambe.asset.File"] = flambe_asset_File;
flambe_asset_File.__name__ = ["flambe","asset","File"];
flambe_asset_File.__interfaces__ = [flambe_asset_Asset];
flambe_asset_File.prototype = {
	__class__: flambe_asset_File
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.__properties__ = {get_navigator:"get_navigator",get_location:"get_location",get_document:"get_document",get_window:"get_window"}
js_Browser.get_window = function() {
	return window;
};
js_Browser.get_document = function() {
	return window.document;
};
js_Browser.get_location = function() {
	return window.location;
};
js_Browser.get_navigator = function() {
	return window.navigator;
};
js_Browser.getLocalStorage = function() {
	try {
		var s = js_Browser.get_window().localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var flambe_asset_Manifest = function() {
	this._remoteBase = null;
	this._localBase = null;
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe_asset_Manifest;
flambe_asset_Manifest.__name__ = ["flambe","asset","Manifest"];
flambe_asset_Manifest.fromAssets = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe_rtti_Meta.getType(flambe_asset_Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing asset pack",["name",packName]));
		return null;
	}
	var manifest = new flambe_asset_Manifest();
	manifest.set_localBase("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe_asset_Manifest.inferFormat(name);
		if(format != flambe_asset_AssetFormat.Data) name = flambe_util_Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
};
flambe_asset_Manifest.exists = function(packName) {
	return Reflect.hasField(haxe_rtti_Meta.getType(flambe_asset_Manifest).assets[0],packName);
};
flambe_asset_Manifest.inferFormat = function(url) {
	var extension = flambe_util_Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe_asset_AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe_asset_AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe_asset_AssetFormat.JXR;
		case "png":
			return flambe_asset_AssetFormat.PNG;
		case "webp":
			return flambe_asset_AssetFormat.WEBP;
		case "dds":
			return flambe_asset_AssetFormat.DDS;
		case "pvr":
			return flambe_asset_AssetFormat.PVR;
		case "pkm":
			return flambe_asset_AssetFormat.PKM;
		case "m4a":
			return flambe_asset_AssetFormat.M4A;
		case "mp3":
			return flambe_asset_AssetFormat.MP3;
		case "ogg":
			return flambe_asset_AssetFormat.OGG;
		case "opus":
			return flambe_asset_AssetFormat.OPUS;
		case "wav":
			return flambe_asset_AssetFormat.WAV;
		}
	} else flambe_Log.warn("No file extension for asset, it will be loaded as data",["url",url]);
	return flambe_asset_AssetFormat.Data;
};
flambe_asset_Manifest.prototype = {
	add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe_asset_Manifest.inferFormat(url);
		var entry = new flambe_asset_AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,getFullURL: function(entry) {
		var basePath;
		if(this.get_remoteBase() != null && flambe_asset_Manifest._supportsCrossOrigin) basePath = this.get_remoteBase(); else basePath = this.get_localBase();
		if(basePath != null) return flambe_util_Strings.joinPath(basePath,entry.url); else return entry.url;
	}
	,get_localBase: function() {
		return this._localBase;
	}
	,set_localBase: function(localBase) {
		if(localBase != null) flambe_util_Assert.that(!StringTools.startsWith(localBase,"http://") && !StringTools.startsWith(localBase,"https://"),"localBase must be a path on the same domain, NOT starting with http(s)://");
		return this._localBase = localBase;
	}
	,get_remoteBase: function() {
		return this._remoteBase;
	}
	,set_remoteBase: function(remoteBase) {
		if(remoteBase != null) flambe_util_Assert.that(StringTools.startsWith(remoteBase,"http://") || StringTools.startsWith(remoteBase,"https://"),"remoteBase must be on a remote domain, starting with http(s)://");
		return this._remoteBase = remoteBase;
	}
	,__class__: flambe_asset_Manifest
	,__properties__: {set_remoteBase:"set_remoteBase",get_remoteBase:"get_remoteBase",set_localBase:"set_localBase",get_localBase:"get_localBase"}
};
var flambe_display_BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : ["flambe","display","BlendMode"], __constructs__ : ["Normal","Add","Multiply","Screen","Mask","Copy"] };
flambe_display_BlendMode.Normal = ["Normal",0];
flambe_display_BlendMode.Normal.toString = $estr;
flambe_display_BlendMode.Normal.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Add = ["Add",1];
flambe_display_BlendMode.Add.toString = $estr;
flambe_display_BlendMode.Add.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Multiply = ["Multiply",2];
flambe_display_BlendMode.Multiply.toString = $estr;
flambe_display_BlendMode.Multiply.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Screen = ["Screen",3];
flambe_display_BlendMode.Screen.toString = $estr;
flambe_display_BlendMode.Screen.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Mask = ["Mask",4];
flambe_display_BlendMode.Mask.toString = $estr;
flambe_display_BlendMode.Mask.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Copy = ["Copy",5];
flambe_display_BlendMode.Copy.toString = $estr;
flambe_display_BlendMode.Copy.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.__empty_constructs__ = [flambe_display_BlendMode.Normal,flambe_display_BlendMode.Add,flambe_display_BlendMode.Multiply,flambe_display_BlendMode.Screen,flambe_display_BlendMode.Mask,flambe_display_BlendMode.Copy];
var flambe_display_Sprite = function() {
	this._cosCache = 0;
	this._sinCache = 0;
	this._parentViewMatrixUpdateCount = 0;
	this._viewMatrixUpdateCount = 0;
	this._viewMatrix = null;
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	flambe_Component.call(this);
	this._flags = flambe_util_BitSets.add(this._flags,2 | 4 | 16 | 32 | 128);
	this._localMatrix = new flambe_math_Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe_util_BitSets.add(_g._flags,8 | 16);
	};
	this.x = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe_animation_AnimatedFloat(0,function(_2,_3) {
		_g._flags = flambe_util_BitSets.add(_g._flags,8 | 16 | 128);
	});
	this.scaleX = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe_animation_AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe_display_Sprite;
flambe_display_Sprite.__name__ = ["flambe","display","Sprite"];
flambe_display_Sprite.hitTest = function(entity,x,y) {
	var sprite;
	var component = entity.getComponent("Sprite_3");
	sprite = component;
	if(sprite != null) {
		if(!flambe_util_BitSets.containsAll(sprite._flags,2 | 4)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe_display_Sprite._scratchPoint)) {
			x = flambe_display_Sprite._scratchPoint.x;
			y = flambe_display_Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe_display_Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	if(sprite != null && sprite.containsLocal(x,y)) return sprite; else return null;
};
flambe_display_Sprite.getBounds = function(entity,result) {
	if(result == null) result = new flambe_math_Rectangle();
	result.set(1.79769313486231e+308,1.79769313486231e+308,-1.79769313486231e+308,-1.79769313486231e+308);
	flambe_display_Sprite.getBoundsImpl(entity,null,result);
	result.width -= result.x;
	result.height -= result.y;
	return result;
};
flambe_display_Sprite.render = function(entity,g) {
	var sprite;
	var component = entity.getComponent("Sprite_3");
	sprite = component;
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if(sprite.get_pixelSnapping()) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director;
	var component1 = entity.getComponent("Director_10");
	director = component1;
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe_display_Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe_display_Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
};
flambe_display_Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe_display_Sprite.hitTestBackwards(entity.next,x,y);
		if(result != null) return result; else return flambe_display_Sprite.hitTest(entity,x,y);
	}
	return null;
};
flambe_display_Sprite.getBoundsImpl = function(entity,matrix,result) {
	var sprite;
	var component = entity.getComponent("Sprite_3");
	sprite = component;
	if(sprite != null) {
		if(matrix != null) matrix = flambe_math_Matrix.multiply(matrix,sprite.getLocalMatrix()); else matrix = sprite.getLocalMatrix();
		var x1 = 0.0;
		var y1 = 0.0;
		var x2 = sprite.getNaturalWidth();
		var y2 = sprite.getNaturalHeight();
		if(x2 > x1 && y2 > y1) {
			flambe_display_Sprite.extendRect(matrix,x1,y1,result);
			flambe_display_Sprite.extendRect(matrix,x2,y1,result);
			flambe_display_Sprite.extendRect(matrix,x2,y2,result);
			flambe_display_Sprite.extendRect(matrix,x1,y2,result);
		}
	}
	var director;
	var component1 = entity.getComponent("Director_10");
	director = component1;
	if(director != null) {
		var scenes = director.occludedScenes;
		var ii = 0;
		var ll = scenes.length;
		while(ii < ll) {
			flambe_display_Sprite.getBoundsImpl(scenes[ii],matrix,result);
			++ii;
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe_display_Sprite.getBoundsImpl(p,matrix,result);
		p = next;
	}
};
flambe_display_Sprite.extendRect = function(matrix,x,y,rect) {
	var p = matrix.transform(x,y,flambe_display_Sprite._scratchPoint);
	x = p.x;
	y = p.y;
	if(x < rect.x) rect.x = x;
	if(y < rect.y) rect.y = y;
	if(x > rect.width) rect.width = x;
	if(y > rect.height) rect.height = y;
};
flambe_display_Sprite.__super__ = flambe_Component;
flambe_display_Sprite.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Sprite_3";
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getLocalMatrix: function() {
		if(flambe_util_BitSets.contains(this._flags,8)) {
			this._flags = flambe_util_BitSets.remove(this._flags,8);
			if(flambe_util_BitSets.contains(this._flags,128)) {
				this._flags = flambe_util_BitSets.remove(this._flags,128);
				var rotation = flambe_math_FMath.toRadians(this.rotation.get__());
				this._sinCache = Math.sin(rotation);
				this._cosCache = Math.cos(rotation);
			}
			var scaleX = this.scaleX.get__();
			var scaleY = this.scaleY.get__();
			this._localMatrix.set(this._cosCache * scaleX,this._sinCache * scaleX,-this._sinCache * scaleY,this._cosCache * scaleY,this.x.get__(),this.y.get__());
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,getViewMatrix: function() {
		if(this.isViewMatrixDirty()) {
			var parentSprite = this.getParentSprite();
			if(parentSprite != null) this._viewMatrix = flambe_math_Matrix.multiply(parentSprite.getViewMatrix(),this.getLocalMatrix(),this._viewMatrix); else this._viewMatrix = this.getLocalMatrix().clone(this._viewMatrix);
			this._flags = flambe_util_BitSets.remove(this._flags,16);
			if(parentSprite != null) this._parentViewMatrixUpdateCount = parentSprite._viewMatrixUpdateCount;
			++this._viewMatrixUpdateCount;
		}
		return this._viewMatrix;
	}
	,setAnchor: function(x,y) {
		this.anchorX.set__(x);
		this.anchorY.set__(y);
		return this;
	}
	,centerAnchor: function() {
		this.anchorX.set__(this.getNaturalWidth() / 2);
		this.anchorY.set__(this.getNaturalHeight() / 2);
		return this;
	}
	,setXY: function(x,y) {
		this.x.set__(x);
		this.y.set__(y);
		return this;
	}
	,setAlpha: function(alpha) {
		this.alpha.set__(alpha);
		return this;
	}
	,setScale: function(scale) {
		this.scaleX.set__(scale);
		this.scaleY.set__(scale);
		return this;
	}
	,disablePointer: function() {
		this.set_pointerEnabled(false);
		return this;
	}
	,onAdded: function() {
		if(flambe_util_BitSets.contains(this._flags,64)) this.connectHover();
	}
	,onRemoved: function() {
		if(this._hoverConnection != null) {
			this._hoverConnection.dispose();
			this._hoverConnection = null;
		}
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,draw: function(g) {
	}
	,isViewMatrixDirty: function() {
		if(flambe_util_BitSets.contains(this._flags,16)) return true;
		var parentSprite = this.getParentSprite();
		if(parentSprite == null) return false;
		return this._parentViewMatrixUpdateCount != parentSprite._viewMatrixUpdateCount || parentSprite.isViewMatrixDirty();
	}
	,getParentSprite: function() {
		if(this.owner == null) return null;
		var entity = this.owner.parent;
		while(entity != null) {
			var sprite;
			var component = entity.getComponent("Sprite_3");
			sprite = component;
			if(sprite != null) return sprite;
			entity = entity.parent;
		}
		return null;
	}
	,get_pointerDown: function() {
		if(this._pointerDown == null) this._pointerDown = new flambe_util_Signal1();
		return this._pointerDown;
	}
	,get_pointerMove: function() {
		if(this._pointerMove == null) this._pointerMove = new flambe_util_Signal1();
		return this._pointerMove;
	}
	,get_pointerUp: function() {
		if(this._pointerUp == null) this._pointerUp = new flambe_util_Signal1();
		return this._pointerUp;
	}
	,get_pointerIn: function() {
		if(this._pointerIn == null) this._pointerIn = new flambe_util_Signal1();
		return this._pointerIn;
	}
	,get_pointerOut: function() {
		if(this._pointerOut == null) this._pointerOut = new flambe_util_Signal1();
		return this._pointerOut;
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = flambe_System.get_pointer().move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentSprite();
			}
			if(_g._pointerOut != null && flambe_util_BitSets.contains(_g._flags,64)) _g._pointerOut.emit(event);
			_g._flags = flambe_util_BitSets.remove(_g._flags,64);
			if(_g._hoverConnection != null) {
				_g._hoverConnection.dispose();
				_g._hoverConnection = null;
			}
		});
	}
	,get_visible: function() {
		return flambe_util_BitSets.contains(this._flags,2);
	}
	,set_visible: function(visible) {
		this._flags = flambe_util_BitSets.set(this._flags,2,visible);
		return visible;
	}
	,set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe_util_BitSets.set(this._flags,4,pointerEnabled);
		return pointerEnabled;
	}
	,get_pixelSnapping: function() {
		return flambe_util_BitSets.contains(this._flags,32);
	}
	,set_pixelSnapping: function(pixelSnapping) {
		this._flags = flambe_util_BitSets.set(this._flags,32,pixelSnapping);
		return pixelSnapping;
	}
	,onPointerDown: function(event) {
		this.onHover(event);
		if(this._pointerDown != null) this._pointerDown.emit(event);
	}
	,onPointerMove: function(event) {
		this.onHover(event);
		if(this._pointerMove != null) this._pointerMove.emit(event);
	}
	,onHover: function(event) {
		if(flambe_util_BitSets.contains(this._flags,64)) return;
		this._flags = flambe_util_BitSets.add(this._flags,64);
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(event);
			this.connectHover();
		}
	}
	,onPointerUp: function(event) {
		{
			var _g = event.source;
			switch(Type.enumIndex(_g)) {
			case 1:
				var point = _g[2];
				if(this._pointerOut != null && flambe_util_BitSets.contains(this._flags,64)) this._pointerOut.emit(event);
				this._flags = flambe_util_BitSets.remove(this._flags,64);
				if(this._hoverConnection != null) {
					this._hoverConnection.dispose();
					this._hoverConnection = null;
				}
				break;
			default:
			}
		}
		if(this._pointerUp != null) this._pointerUp.emit(event);
	}
	,__class__: flambe_display_Sprite
	,__properties__: $extend(flambe_Component.prototype.__properties__,{get_pointerOut:"get_pointerOut",get_pointerIn:"get_pointerIn",get_pointerUp:"get_pointerUp",get_pointerMove:"get_pointerMove",get_pointerDown:"get_pointerDown",set_pointerEnabled:"set_pointerEnabled",set_pixelSnapping:"set_pixelSnapping",get_pixelSnapping:"get_pixelSnapping",set_visible:"set_visible",get_visible:"get_visible"})
});
var flambe_display_FillSprite = function(color,width,height) {
	flambe_display_Sprite.call(this);
	this.color = color;
	this.width = new flambe_animation_AnimatedFloat(width);
	this.height = new flambe_animation_AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe_display_FillSprite;
flambe_display_FillSprite.__name__ = ["flambe","display","FillSprite"];
flambe_display_FillSprite.__super__ = flambe_display_Sprite;
flambe_display_FillSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		g.fillRect(this.color,0,0,this.width.get__(),this.height.get__());
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,getNaturalHeight: function() {
		return this.height.get__();
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,__class__: flambe_display_FillSprite
});
var flambe_display_Glyph = function(charCode) {
	this._kernings = null;
	this.xAdvance = 0;
	this.yOffset = 0;
	this.xOffset = 0;
	this.page = null;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.charCode = charCode;
};
$hxClasses["flambe.display.Glyph"] = flambe_display_Glyph;
flambe_display_Glyph.__name__ = ["flambe","display","Glyph"];
flambe_display_Glyph.prototype = {
	draw: function(g,destX,destY) {
		if(this.width > 0) g.drawSubTexture(this.page,destX + this.xOffset,destY + this.yOffset,this.x,this.y,this.width,this.height);
	}
	,getKerning: function(nextCharCode) {
		if(this._kernings != null) return Std["int"](this._kernings.get(nextCharCode)); else return 0;
	}
	,setKerning: function(nextCharCode,amount) {
		if(this._kernings == null) this._kernings = new haxe_ds_IntMap();
		this._kernings.set(nextCharCode,amount);
	}
	,__class__: flambe_display_Glyph
};
var flambe_display_Font = function(pack,name) {
	this.name = name;
	this._pack = pack;
	this._file = pack.getFile(name + ".fnt");
	this.reload();
	this._lastReloadCount = this._file.get_reloadCount().get__();
};
$hxClasses["flambe.display.Font"] = flambe_display_Font;
flambe_display_Font.__name__ = ["flambe","display","Font"];
flambe_display_Font.prototype = {
	disposeFiles: function() {
		this._file.dispose();
		return this;
	}
	,layoutText: function(text,align,wrapWidth,letterSpacing,lineSpacing) {
		if(lineSpacing == null) lineSpacing = 0;
		if(letterSpacing == null) letterSpacing = 0;
		if(wrapWidth == null) wrapWidth = 0;
		if(align == null) align = flambe_display_TextAlign.Left;
		return new flambe_display_TextLayout(this,text,align,wrapWidth,letterSpacing,lineSpacing);
	}
	,getGlyph: function(charCode) {
		return this._glyphs.get(charCode);
	}
	,checkReload: function() {
		var reloadCount = this._file.get_reloadCount().get__();
		if(this._lastReloadCount != reloadCount) {
			this._lastReloadCount = reloadCount;
			this.reload();
		}
		return reloadCount;
	}
	,reload: function() {
		this._glyphs = new haxe_ds_IntMap();
		this._glyphs.set(flambe_display_Font.NEWLINE.charCode,flambe_display_Font.NEWLINE);
		var parser = new flambe_display__$Font_ConfigParser(this._file.toString());
		var pages = new haxe_ds_IntMap();
		var idx = this.name.lastIndexOf("/");
		var basePath;
		if(idx >= 0) basePath = HxOverrides.substr(this.name,0,idx + 1); else basePath = "";
		var $it0 = parser.keywords();
		while( $it0.hasNext() ) {
			var keyword = $it0.next();
			switch(keyword) {
			case "info":
				var $it1 = parser.pairs();
				while( $it1.hasNext() ) {
					var pair = $it1.next();
					var _g = pair.key;
					switch(_g) {
					case "size":
						this.size = pair.getInt();
						break;
					}
				}
				break;
			case "common":
				var $it2 = parser.pairs();
				while( $it2.hasNext() ) {
					var pair1 = $it2.next();
					var _g1 = pair1.key;
					switch(_g1) {
					case "lineHeight":
						this.lineHeight = pair1.getInt();
						break;
					}
				}
				break;
			case "page":
				var pageId = 0;
				var file = null;
				var $it3 = parser.pairs();
				while( $it3.hasNext() ) {
					var pair2 = $it3.next();
					var _g2 = pair2.key;
					switch(_g2) {
					case "id":
						pageId = pair2.getInt();
						break;
					case "file":
						file = pair2.getString();
						break;
					}
				}
				var value = this._pack.getTexture(basePath + flambe_util_Strings.removeFileExtension(file));
				pages.set(pageId,value);
				break;
			case "char":
				var glyph = null;
				var $it4 = parser.pairs();
				while( $it4.hasNext() ) {
					var pair3 = $it4.next();
					var _g3 = pair3.key;
					switch(_g3) {
					case "id":
						glyph = new flambe_display_Glyph(pair3.getInt());
						break;
					case "x":
						glyph.x = pair3.getInt();
						break;
					case "y":
						glyph.y = pair3.getInt();
						break;
					case "width":
						glyph.width = pair3.getInt();
						break;
					case "height":
						glyph.height = pair3.getInt();
						break;
					case "page":
						var key = pair3.getInt();
						glyph.page = pages.get(key);
						break;
					case "xoffset":
						glyph.xOffset = pair3.getInt();
						break;
					case "yoffset":
						glyph.yOffset = pair3.getInt();
						break;
					case "xadvance":
						glyph.xAdvance = pair3.getInt();
						break;
					}
				}
				this._glyphs.set(glyph.charCode,glyph);
				break;
			case "kerning":
				var first = null;
				var second = 0;
				var amount = 0;
				var $it5 = parser.pairs();
				while( $it5.hasNext() ) {
					var pair4 = $it5.next();
					var _g4 = pair4.key;
					switch(_g4) {
					case "first":
						var key1 = pair4.getInt();
						first = this._glyphs.get(key1);
						break;
					case "second":
						second = pair4.getInt();
						break;
					case "amount":
						amount = pair4.getInt();
						break;
					}
				}
				if(first != null && amount != 0) first.setKerning(second,amount);
				break;
			}
		}
	}
	,__class__: flambe_display_Font
};
var flambe_display_TextAlign = $hxClasses["flambe.display.TextAlign"] = { __ename__ : ["flambe","display","TextAlign"], __constructs__ : ["Left","Center","Right"] };
flambe_display_TextAlign.Left = ["Left",0];
flambe_display_TextAlign.Left.toString = $estr;
flambe_display_TextAlign.Left.__enum__ = flambe_display_TextAlign;
flambe_display_TextAlign.Center = ["Center",1];
flambe_display_TextAlign.Center.toString = $estr;
flambe_display_TextAlign.Center.__enum__ = flambe_display_TextAlign;
flambe_display_TextAlign.Right = ["Right",2];
flambe_display_TextAlign.Right.toString = $estr;
flambe_display_TextAlign.Right.__enum__ = flambe_display_TextAlign;
flambe_display_TextAlign.__empty_constructs__ = [flambe_display_TextAlign.Left,flambe_display_TextAlign.Center,flambe_display_TextAlign.Right];
var flambe_display_TextLayout = function(font,text,align,wrapWidth,letterSpacing,lineSpacing) {
	this.lines = 0;
	var _g = this;
	this._font = font;
	this._glyphs = [];
	this._offsets = [];
	this._lineOffset = Math.round(font.lineHeight + lineSpacing);
	this.bounds = new flambe_math_Rectangle();
	var lineWidths = [];
	var ll = text.length;
	var _g1 = 0;
	while(_g1 < ll) {
		var ii2 = _g1++;
		var charCode = StringTools.fastCodeAt(text,ii2);
		var glyph = font.getGlyph(charCode);
		if(glyph != null) this._glyphs.push(glyph); else flambe_Log.warn("Requested a missing character from font",["font",font.name,"charCode",charCode]);
	}
	var lastSpaceIdx = -1;
	var lineWidth = 0.0;
	var lineHeight = 0.0;
	var newline = font.getGlyph(10);
	var addLine = function() {
		_g.bounds.width = flambe_math_FMath.max(_g.bounds.width,lineWidth);
		_g.bounds.height += lineHeight;
		lineWidths[_g.lines] = lineWidth;
		lineWidth = 0;
		lineHeight = 0;
		++_g.lines;
	};
	var ii = 0;
	while(ii < this._glyphs.length) {
		var glyph1 = this._glyphs[ii];
		this._offsets[ii] = Math.round(lineWidth);
		var wordWrap = wrapWidth > 0 && lineWidth + glyph1.width > wrapWidth;
		if(wordWrap || glyph1 == newline) {
			if(wordWrap) {
				if(lastSpaceIdx >= 0) {
					this._glyphs[lastSpaceIdx] = newline;
					lineWidth = this._offsets[lastSpaceIdx];
					ii = lastSpaceIdx;
				} else this._glyphs.splice(ii,0,newline);
			}
			lastSpaceIdx = -1;
			lineHeight = this._lineOffset;
			addLine();
		} else {
			if(glyph1.charCode == 32) lastSpaceIdx = ii;
			lineWidth += glyph1.xAdvance + letterSpacing;
			lineHeight = flambe_math_FMath.max(lineHeight,glyph1.height + glyph1.yOffset);
			if(ii + 1 < this._glyphs.length) {
				var nextGlyph = this._glyphs[ii + 1];
				lineWidth += glyph1.getKerning(nextGlyph.charCode);
			}
		}
		++ii;
	}
	addLine();
	var lineY = 0.0;
	var alignOffset = flambe_display_TextLayout.getAlignOffset(align,lineWidths[0],wrapWidth);
	var top = 1.79769313486231e+308;
	var bottom = -1.79769313486231e+308;
	var line = 0;
	var ii1 = 0;
	var ll1 = this._glyphs.length;
	while(ii1 < ll1) {
		var glyph2 = this._glyphs[ii1];
		if(glyph2.charCode == 10) {
			lineY += this._lineOffset;
			++line;
			alignOffset = flambe_display_TextLayout.getAlignOffset(align,lineWidths[line],wrapWidth);
		}
		this._offsets[ii1] += alignOffset;
		var glyphY = lineY + glyph2.yOffset;
		top = flambe_math_FMath.min(top,glyphY);
		bottom = flambe_math_FMath.max(bottom,glyphY + glyph2.height);
		++ii1;
	}
	this.bounds.x = flambe_display_TextLayout.getAlignOffset(align,this.bounds.width,wrapWidth);
	this.bounds.y = top;
	this.bounds.height = bottom - top;
};
$hxClasses["flambe.display.TextLayout"] = flambe_display_TextLayout;
flambe_display_TextLayout.__name__ = ["flambe","display","TextLayout"];
flambe_display_TextLayout.getAlignOffset = function(align,lineWidth,totalWidth) {
	switch(Type.enumIndex(align)) {
	case 0:
		return 0;
	case 2:
		return totalWidth - lineWidth;
	case 1:
		return Math.round((totalWidth - lineWidth) / 2);
	}
};
flambe_display_TextLayout.prototype = {
	draw: function(g) {
		var y = 0.0;
		var ii = 0;
		var ll = this._glyphs.length;
		while(ii < ll) {
			var glyph = this._glyphs[ii];
			if(glyph.charCode == 10) y += this._lineOffset; else {
				var x = this._offsets[ii];
				glyph.draw(g,x,y);
			}
			++ii;
		}
	}
	,__class__: flambe_display_TextLayout
};
var flambe_display__$Font_ConfigParser = function(config) {
	this._configText = config;
	this._keywordPattern = new EReg("([A-Za-z]+)(.*)","");
	this._pairPattern = new EReg("([A-Za-z]+)=(\"[^\"]*\"|[^\\s]+)","");
};
$hxClasses["flambe.display._Font.ConfigParser"] = flambe_display__$Font_ConfigParser;
flambe_display__$Font_ConfigParser.__name__ = ["flambe","display","_Font","ConfigParser"];
flambe_display__$Font_ConfigParser.advance = function(text,expr) {
	var m = expr.matchedPos();
	return HxOverrides.substr(text,m.pos + m.len,text.length);
};
flambe_display__$Font_ConfigParser.prototype = {
	keywords: function() {
		var _g = this;
		var text = this._configText;
		return { next : function() {
			text = flambe_display__$Font_ConfigParser.advance(text,_g._keywordPattern);
			_g._pairText = _g._keywordPattern.matched(2);
			return _g._keywordPattern.matched(1);
		}, hasNext : function() {
			return _g._keywordPattern.match(text);
		}};
	}
	,pairs: function() {
		var _g = this;
		var text = this._pairText;
		return { next : function() {
			text = flambe_display__$Font_ConfigParser.advance(text,_g._pairPattern);
			return new flambe_display__$Font_ConfigPair(_g._pairPattern.matched(1),_g._pairPattern.matched(2));
		}, hasNext : function() {
			return _g._pairPattern.match(text);
		}};
	}
	,__class__: flambe_display__$Font_ConfigParser
};
var flambe_display__$Font_ConfigPair = function(key,value) {
	this.key = key;
	this._value = value;
};
$hxClasses["flambe.display._Font.ConfigPair"] = flambe_display__$Font_ConfigPair;
flambe_display__$Font_ConfigPair.__name__ = ["flambe","display","_Font","ConfigPair"];
flambe_display__$Font_ConfigPair.prototype = {
	getInt: function() {
		return Std.parseInt(this._value);
	}
	,getString: function() {
		if(StringTools.fastCodeAt(this._value,0) != 34) return null;
		return HxOverrides.substr(this._value,1,this._value.length - 2);
	}
	,__class__: flambe_display__$Font_ConfigPair
};
var flambe_display_Graphics = function() { };
$hxClasses["flambe.display.Graphics"] = flambe_display_Graphics;
flambe_display_Graphics.__name__ = ["flambe","display","Graphics"];
flambe_display_Graphics.prototype = {
	__class__: flambe_display_Graphics
};
var flambe_display_ImageSprite = function(texture) {
	flambe_display_Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe_display_ImageSprite;
flambe_display_ImageSprite.__name__ = ["flambe","display","ImageSprite"];
flambe_display_ImageSprite.__super__ = flambe_display_Sprite;
flambe_display_ImageSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		if(this.texture != null) g.drawTexture(this.texture,0,0);
	}
	,getNaturalWidth: function() {
		if(this.texture != null) return this.texture.get_width(); else return 0;
	}
	,getNaturalHeight: function() {
		if(this.texture != null) return this.texture.get_height(); else return 0;
	}
	,__class__: flambe_display_ImageSprite
});
var flambe_display_Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : ["flambe","display","Orientation"], __constructs__ : ["Portrait","Landscape"] };
flambe_display_Orientation.Portrait = ["Portrait",0];
flambe_display_Orientation.Portrait.toString = $estr;
flambe_display_Orientation.Portrait.__enum__ = flambe_display_Orientation;
flambe_display_Orientation.Landscape = ["Landscape",1];
flambe_display_Orientation.Landscape.toString = $estr;
flambe_display_Orientation.Landscape.__enum__ = flambe_display_Orientation;
flambe_display_Orientation.__empty_constructs__ = [flambe_display_Orientation.Portrait,flambe_display_Orientation.Landscape];
var flambe_display_Texture = function() { };
$hxClasses["flambe.display.Texture"] = flambe_display_Texture;
flambe_display_Texture.__name__ = ["flambe","display","Texture"];
flambe_display_Texture.__interfaces__ = [flambe_asset_Asset];
flambe_display_Texture.prototype = {
	__class__: flambe_display_Texture
	,__properties__: {get_graphics:"get_graphics",get_height:"get_height",get_width:"get_width"}
};
var flambe_display_SubTexture = function() { };
$hxClasses["flambe.display.SubTexture"] = flambe_display_SubTexture;
flambe_display_SubTexture.__name__ = ["flambe","display","SubTexture"];
flambe_display_SubTexture.__interfaces__ = [flambe_display_Texture];
flambe_display_SubTexture.prototype = {
	__class__: flambe_display_SubTexture
	,__properties__: {get_y:"get_y",get_x:"get_x"}
};
var flambe_display_TextSprite = function(font,text) {
	if(text == null) text = "";
	this._lastReloadCount = -1;
	this._layout = null;
	var _g = this;
	flambe_display_Sprite.call(this);
	this._font = font;
	this._text = text;
	this._align = flambe_display_TextAlign.Left;
	this._flags = flambe_util_BitSets.add(this._flags,256);
	var dirtyText = function(_,_1) {
		_g._flags = flambe_util_BitSets.add(_g._flags,256);
	};
	this.wrapWidth = new flambe_animation_AnimatedFloat(0,dirtyText);
	this.letterSpacing = new flambe_animation_AnimatedFloat(0,dirtyText);
	this.lineSpacing = new flambe_animation_AnimatedFloat(0,dirtyText);
};
$hxClasses["flambe.display.TextSprite"] = flambe_display_TextSprite;
flambe_display_TextSprite.__name__ = ["flambe","display","TextSprite"];
flambe_display_TextSprite.__super__ = flambe_display_Sprite;
flambe_display_TextSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		this.updateLayout();
		this._layout.draw(g);
	}
	,getNaturalWidth: function() {
		this.updateLayout();
		if(this.wrapWidth.get__() > 0) return this.wrapWidth.get__(); else return this._layout.bounds.width;
	}
	,getNaturalHeight: function() {
		this.updateLayout();
		var paddedHeight = this._layout.lines * (this._font.lineHeight + this.lineSpacing.get__());
		var boundsHeight = this._layout.bounds.height;
		return flambe_math_FMath.max(paddedHeight,boundsHeight);
	}
	,containsLocal: function(localX,localY) {
		this.updateLayout();
		return this._layout.bounds.contains(localX,localY);
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(text) {
		if(text != this._text) {
			this._text = text;
			this._flags = flambe_util_BitSets.add(this._flags,256);
		}
		return text;
	}
	,get_font: function() {
		return this._font;
	}
	,set_align: function(align) {
		if(align != this._align) {
			this._align = align;
			this._flags = flambe_util_BitSets.add(this._flags,256);
		}
		return align;
	}
	,updateLayout: function() {
		var reloadCount = this._font.checkReload();
		if(reloadCount != this._lastReloadCount) {
			this._lastReloadCount = reloadCount;
			this._flags = flambe_util_BitSets.add(this._flags,256);
		}
		if(flambe_util_BitSets.contains(this._flags,256)) {
			this._flags = flambe_util_BitSets.remove(this._flags,256);
			this._layout = this.get_font().layoutText(this._text,this._align,this.wrapWidth.get__(),this.letterSpacing.get__(),this.lineSpacing.get__());
		}
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.wrapWidth.update(dt);
		this.letterSpacing.update(dt);
		this.lineSpacing.update(dt);
	}
	,__class__: flambe_display_TextSprite
	,__properties__: $extend(flambe_display_Sprite.prototype.__properties__,{set_align:"set_align",get_font:"get_font",set_text:"set_text",get_text:"get_text"})
});
var flambe_input_Key = $hxClasses["flambe.input.Key"] = { __ename__ : ["flambe","input","Key"], __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] };
flambe_input_Key.A = ["A",0];
flambe_input_Key.A.toString = $estr;
flambe_input_Key.A.__enum__ = flambe_input_Key;
flambe_input_Key.B = ["B",1];
flambe_input_Key.B.toString = $estr;
flambe_input_Key.B.__enum__ = flambe_input_Key;
flambe_input_Key.C = ["C",2];
flambe_input_Key.C.toString = $estr;
flambe_input_Key.C.__enum__ = flambe_input_Key;
flambe_input_Key.D = ["D",3];
flambe_input_Key.D.toString = $estr;
flambe_input_Key.D.__enum__ = flambe_input_Key;
flambe_input_Key.E = ["E",4];
flambe_input_Key.E.toString = $estr;
flambe_input_Key.E.__enum__ = flambe_input_Key;
flambe_input_Key.F = ["F",5];
flambe_input_Key.F.toString = $estr;
flambe_input_Key.F.__enum__ = flambe_input_Key;
flambe_input_Key.G = ["G",6];
flambe_input_Key.G.toString = $estr;
flambe_input_Key.G.__enum__ = flambe_input_Key;
flambe_input_Key.H = ["H",7];
flambe_input_Key.H.toString = $estr;
flambe_input_Key.H.__enum__ = flambe_input_Key;
flambe_input_Key.I = ["I",8];
flambe_input_Key.I.toString = $estr;
flambe_input_Key.I.__enum__ = flambe_input_Key;
flambe_input_Key.J = ["J",9];
flambe_input_Key.J.toString = $estr;
flambe_input_Key.J.__enum__ = flambe_input_Key;
flambe_input_Key.K = ["K",10];
flambe_input_Key.K.toString = $estr;
flambe_input_Key.K.__enum__ = flambe_input_Key;
flambe_input_Key.L = ["L",11];
flambe_input_Key.L.toString = $estr;
flambe_input_Key.L.__enum__ = flambe_input_Key;
flambe_input_Key.M = ["M",12];
flambe_input_Key.M.toString = $estr;
flambe_input_Key.M.__enum__ = flambe_input_Key;
flambe_input_Key.N = ["N",13];
flambe_input_Key.N.toString = $estr;
flambe_input_Key.N.__enum__ = flambe_input_Key;
flambe_input_Key.O = ["O",14];
flambe_input_Key.O.toString = $estr;
flambe_input_Key.O.__enum__ = flambe_input_Key;
flambe_input_Key.P = ["P",15];
flambe_input_Key.P.toString = $estr;
flambe_input_Key.P.__enum__ = flambe_input_Key;
flambe_input_Key.Q = ["Q",16];
flambe_input_Key.Q.toString = $estr;
flambe_input_Key.Q.__enum__ = flambe_input_Key;
flambe_input_Key.R = ["R",17];
flambe_input_Key.R.toString = $estr;
flambe_input_Key.R.__enum__ = flambe_input_Key;
flambe_input_Key.S = ["S",18];
flambe_input_Key.S.toString = $estr;
flambe_input_Key.S.__enum__ = flambe_input_Key;
flambe_input_Key.T = ["T",19];
flambe_input_Key.T.toString = $estr;
flambe_input_Key.T.__enum__ = flambe_input_Key;
flambe_input_Key.U = ["U",20];
flambe_input_Key.U.toString = $estr;
flambe_input_Key.U.__enum__ = flambe_input_Key;
flambe_input_Key.V = ["V",21];
flambe_input_Key.V.toString = $estr;
flambe_input_Key.V.__enum__ = flambe_input_Key;
flambe_input_Key.W = ["W",22];
flambe_input_Key.W.toString = $estr;
flambe_input_Key.W.__enum__ = flambe_input_Key;
flambe_input_Key.X = ["X",23];
flambe_input_Key.X.toString = $estr;
flambe_input_Key.X.__enum__ = flambe_input_Key;
flambe_input_Key.Y = ["Y",24];
flambe_input_Key.Y.toString = $estr;
flambe_input_Key.Y.__enum__ = flambe_input_Key;
flambe_input_Key.Z = ["Z",25];
flambe_input_Key.Z.toString = $estr;
flambe_input_Key.Z.__enum__ = flambe_input_Key;
flambe_input_Key.Number0 = ["Number0",26];
flambe_input_Key.Number0.toString = $estr;
flambe_input_Key.Number0.__enum__ = flambe_input_Key;
flambe_input_Key.Number1 = ["Number1",27];
flambe_input_Key.Number1.toString = $estr;
flambe_input_Key.Number1.__enum__ = flambe_input_Key;
flambe_input_Key.Number2 = ["Number2",28];
flambe_input_Key.Number2.toString = $estr;
flambe_input_Key.Number2.__enum__ = flambe_input_Key;
flambe_input_Key.Number3 = ["Number3",29];
flambe_input_Key.Number3.toString = $estr;
flambe_input_Key.Number3.__enum__ = flambe_input_Key;
flambe_input_Key.Number4 = ["Number4",30];
flambe_input_Key.Number4.toString = $estr;
flambe_input_Key.Number4.__enum__ = flambe_input_Key;
flambe_input_Key.Number5 = ["Number5",31];
flambe_input_Key.Number5.toString = $estr;
flambe_input_Key.Number5.__enum__ = flambe_input_Key;
flambe_input_Key.Number6 = ["Number6",32];
flambe_input_Key.Number6.toString = $estr;
flambe_input_Key.Number6.__enum__ = flambe_input_Key;
flambe_input_Key.Number7 = ["Number7",33];
flambe_input_Key.Number7.toString = $estr;
flambe_input_Key.Number7.__enum__ = flambe_input_Key;
flambe_input_Key.Number8 = ["Number8",34];
flambe_input_Key.Number8.toString = $estr;
flambe_input_Key.Number8.__enum__ = flambe_input_Key;
flambe_input_Key.Number9 = ["Number9",35];
flambe_input_Key.Number9.toString = $estr;
flambe_input_Key.Number9.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad0 = ["Numpad0",36];
flambe_input_Key.Numpad0.toString = $estr;
flambe_input_Key.Numpad0.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad1 = ["Numpad1",37];
flambe_input_Key.Numpad1.toString = $estr;
flambe_input_Key.Numpad1.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad2 = ["Numpad2",38];
flambe_input_Key.Numpad2.toString = $estr;
flambe_input_Key.Numpad2.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad3 = ["Numpad3",39];
flambe_input_Key.Numpad3.toString = $estr;
flambe_input_Key.Numpad3.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad4 = ["Numpad4",40];
flambe_input_Key.Numpad4.toString = $estr;
flambe_input_Key.Numpad4.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad5 = ["Numpad5",41];
flambe_input_Key.Numpad5.toString = $estr;
flambe_input_Key.Numpad5.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad6 = ["Numpad6",42];
flambe_input_Key.Numpad6.toString = $estr;
flambe_input_Key.Numpad6.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad7 = ["Numpad7",43];
flambe_input_Key.Numpad7.toString = $estr;
flambe_input_Key.Numpad7.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad8 = ["Numpad8",44];
flambe_input_Key.Numpad8.toString = $estr;
flambe_input_Key.Numpad8.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad9 = ["Numpad9",45];
flambe_input_Key.Numpad9.toString = $estr;
flambe_input_Key.Numpad9.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadAdd = ["NumpadAdd",46];
flambe_input_Key.NumpadAdd.toString = $estr;
flambe_input_Key.NumpadAdd.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDecimal = ["NumpadDecimal",47];
flambe_input_Key.NumpadDecimal.toString = $estr;
flambe_input_Key.NumpadDecimal.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDivide = ["NumpadDivide",48];
flambe_input_Key.NumpadDivide.toString = $estr;
flambe_input_Key.NumpadDivide.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadEnter = ["NumpadEnter",49];
flambe_input_Key.NumpadEnter.toString = $estr;
flambe_input_Key.NumpadEnter.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadMultiply = ["NumpadMultiply",50];
flambe_input_Key.NumpadMultiply.toString = $estr;
flambe_input_Key.NumpadMultiply.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadSubtract = ["NumpadSubtract",51];
flambe_input_Key.NumpadSubtract.toString = $estr;
flambe_input_Key.NumpadSubtract.__enum__ = flambe_input_Key;
flambe_input_Key.F1 = ["F1",52];
flambe_input_Key.F1.toString = $estr;
flambe_input_Key.F1.__enum__ = flambe_input_Key;
flambe_input_Key.F2 = ["F2",53];
flambe_input_Key.F2.toString = $estr;
flambe_input_Key.F2.__enum__ = flambe_input_Key;
flambe_input_Key.F3 = ["F3",54];
flambe_input_Key.F3.toString = $estr;
flambe_input_Key.F3.__enum__ = flambe_input_Key;
flambe_input_Key.F4 = ["F4",55];
flambe_input_Key.F4.toString = $estr;
flambe_input_Key.F4.__enum__ = flambe_input_Key;
flambe_input_Key.F5 = ["F5",56];
flambe_input_Key.F5.toString = $estr;
flambe_input_Key.F5.__enum__ = flambe_input_Key;
flambe_input_Key.F6 = ["F6",57];
flambe_input_Key.F6.toString = $estr;
flambe_input_Key.F6.__enum__ = flambe_input_Key;
flambe_input_Key.F7 = ["F7",58];
flambe_input_Key.F7.toString = $estr;
flambe_input_Key.F7.__enum__ = flambe_input_Key;
flambe_input_Key.F8 = ["F8",59];
flambe_input_Key.F8.toString = $estr;
flambe_input_Key.F8.__enum__ = flambe_input_Key;
flambe_input_Key.F9 = ["F9",60];
flambe_input_Key.F9.toString = $estr;
flambe_input_Key.F9.__enum__ = flambe_input_Key;
flambe_input_Key.F10 = ["F10",61];
flambe_input_Key.F10.toString = $estr;
flambe_input_Key.F10.__enum__ = flambe_input_Key;
flambe_input_Key.F11 = ["F11",62];
flambe_input_Key.F11.toString = $estr;
flambe_input_Key.F11.__enum__ = flambe_input_Key;
flambe_input_Key.F12 = ["F12",63];
flambe_input_Key.F12.toString = $estr;
flambe_input_Key.F12.__enum__ = flambe_input_Key;
flambe_input_Key.F13 = ["F13",64];
flambe_input_Key.F13.toString = $estr;
flambe_input_Key.F13.__enum__ = flambe_input_Key;
flambe_input_Key.F14 = ["F14",65];
flambe_input_Key.F14.toString = $estr;
flambe_input_Key.F14.__enum__ = flambe_input_Key;
flambe_input_Key.F15 = ["F15",66];
flambe_input_Key.F15.toString = $estr;
flambe_input_Key.F15.__enum__ = flambe_input_Key;
flambe_input_Key.Left = ["Left",67];
flambe_input_Key.Left.toString = $estr;
flambe_input_Key.Left.__enum__ = flambe_input_Key;
flambe_input_Key.Up = ["Up",68];
flambe_input_Key.Up.toString = $estr;
flambe_input_Key.Up.__enum__ = flambe_input_Key;
flambe_input_Key.Right = ["Right",69];
flambe_input_Key.Right.toString = $estr;
flambe_input_Key.Right.__enum__ = flambe_input_Key;
flambe_input_Key.Down = ["Down",70];
flambe_input_Key.Down.toString = $estr;
flambe_input_Key.Down.__enum__ = flambe_input_Key;
flambe_input_Key.Alt = ["Alt",71];
flambe_input_Key.Alt.toString = $estr;
flambe_input_Key.Alt.__enum__ = flambe_input_Key;
flambe_input_Key.Backquote = ["Backquote",72];
flambe_input_Key.Backquote.toString = $estr;
flambe_input_Key.Backquote.__enum__ = flambe_input_Key;
flambe_input_Key.Backslash = ["Backslash",73];
flambe_input_Key.Backslash.toString = $estr;
flambe_input_Key.Backslash.__enum__ = flambe_input_Key;
flambe_input_Key.Backspace = ["Backspace",74];
flambe_input_Key.Backspace.toString = $estr;
flambe_input_Key.Backspace.__enum__ = flambe_input_Key;
flambe_input_Key.CapsLock = ["CapsLock",75];
flambe_input_Key.CapsLock.toString = $estr;
flambe_input_Key.CapsLock.__enum__ = flambe_input_Key;
flambe_input_Key.Comma = ["Comma",76];
flambe_input_Key.Comma.toString = $estr;
flambe_input_Key.Comma.__enum__ = flambe_input_Key;
flambe_input_Key.Command = ["Command",77];
flambe_input_Key.Command.toString = $estr;
flambe_input_Key.Command.__enum__ = flambe_input_Key;
flambe_input_Key.Control = ["Control",78];
flambe_input_Key.Control.toString = $estr;
flambe_input_Key.Control.__enum__ = flambe_input_Key;
flambe_input_Key.Delete = ["Delete",79];
flambe_input_Key.Delete.toString = $estr;
flambe_input_Key.Delete.__enum__ = flambe_input_Key;
flambe_input_Key.End = ["End",80];
flambe_input_Key.End.toString = $estr;
flambe_input_Key.End.__enum__ = flambe_input_Key;
flambe_input_Key.Enter = ["Enter",81];
flambe_input_Key.Enter.toString = $estr;
flambe_input_Key.Enter.__enum__ = flambe_input_Key;
flambe_input_Key.Equals = ["Equals",82];
flambe_input_Key.Equals.toString = $estr;
flambe_input_Key.Equals.__enum__ = flambe_input_Key;
flambe_input_Key.Escape = ["Escape",83];
flambe_input_Key.Escape.toString = $estr;
flambe_input_Key.Escape.__enum__ = flambe_input_Key;
flambe_input_Key.Home = ["Home",84];
flambe_input_Key.Home.toString = $estr;
flambe_input_Key.Home.__enum__ = flambe_input_Key;
flambe_input_Key.Insert = ["Insert",85];
flambe_input_Key.Insert.toString = $estr;
flambe_input_Key.Insert.__enum__ = flambe_input_Key;
flambe_input_Key.LeftBracket = ["LeftBracket",86];
flambe_input_Key.LeftBracket.toString = $estr;
flambe_input_Key.LeftBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Minus = ["Minus",87];
flambe_input_Key.Minus.toString = $estr;
flambe_input_Key.Minus.__enum__ = flambe_input_Key;
flambe_input_Key.PageDown = ["PageDown",88];
flambe_input_Key.PageDown.toString = $estr;
flambe_input_Key.PageDown.__enum__ = flambe_input_Key;
flambe_input_Key.PageUp = ["PageUp",89];
flambe_input_Key.PageUp.toString = $estr;
flambe_input_Key.PageUp.__enum__ = flambe_input_Key;
flambe_input_Key.Period = ["Period",90];
flambe_input_Key.Period.toString = $estr;
flambe_input_Key.Period.__enum__ = flambe_input_Key;
flambe_input_Key.Quote = ["Quote",91];
flambe_input_Key.Quote.toString = $estr;
flambe_input_Key.Quote.__enum__ = flambe_input_Key;
flambe_input_Key.RightBracket = ["RightBracket",92];
flambe_input_Key.RightBracket.toString = $estr;
flambe_input_Key.RightBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Semicolon = ["Semicolon",93];
flambe_input_Key.Semicolon.toString = $estr;
flambe_input_Key.Semicolon.__enum__ = flambe_input_Key;
flambe_input_Key.Shift = ["Shift",94];
flambe_input_Key.Shift.toString = $estr;
flambe_input_Key.Shift.__enum__ = flambe_input_Key;
flambe_input_Key.Slash = ["Slash",95];
flambe_input_Key.Slash.toString = $estr;
flambe_input_Key.Slash.__enum__ = flambe_input_Key;
flambe_input_Key.Space = ["Space",96];
flambe_input_Key.Space.toString = $estr;
flambe_input_Key.Space.__enum__ = flambe_input_Key;
flambe_input_Key.Tab = ["Tab",97];
flambe_input_Key.Tab.toString = $estr;
flambe_input_Key.Tab.__enum__ = flambe_input_Key;
flambe_input_Key.Menu = ["Menu",98];
flambe_input_Key.Menu.toString = $estr;
flambe_input_Key.Menu.__enum__ = flambe_input_Key;
flambe_input_Key.Search = ["Search",99];
flambe_input_Key.Search.toString = $estr;
flambe_input_Key.Search.__enum__ = flambe_input_Key;
flambe_input_Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe_input_Key; $x.toString = $estr; return $x; };
flambe_input_Key.__empty_constructs__ = [flambe_input_Key.A,flambe_input_Key.B,flambe_input_Key.C,flambe_input_Key.D,flambe_input_Key.E,flambe_input_Key.F,flambe_input_Key.G,flambe_input_Key.H,flambe_input_Key.I,flambe_input_Key.J,flambe_input_Key.K,flambe_input_Key.L,flambe_input_Key.M,flambe_input_Key.N,flambe_input_Key.O,flambe_input_Key.P,flambe_input_Key.Q,flambe_input_Key.R,flambe_input_Key.S,flambe_input_Key.T,flambe_input_Key.U,flambe_input_Key.V,flambe_input_Key.W,flambe_input_Key.X,flambe_input_Key.Y,flambe_input_Key.Z,flambe_input_Key.Number0,flambe_input_Key.Number1,flambe_input_Key.Number2,flambe_input_Key.Number3,flambe_input_Key.Number4,flambe_input_Key.Number5,flambe_input_Key.Number6,flambe_input_Key.Number7,flambe_input_Key.Number8,flambe_input_Key.Number9,flambe_input_Key.Numpad0,flambe_input_Key.Numpad1,flambe_input_Key.Numpad2,flambe_input_Key.Numpad3,flambe_input_Key.Numpad4,flambe_input_Key.Numpad5,flambe_input_Key.Numpad6,flambe_input_Key.Numpad7,flambe_input_Key.Numpad8,flambe_input_Key.Numpad9,flambe_input_Key.NumpadAdd,flambe_input_Key.NumpadDecimal,flambe_input_Key.NumpadDivide,flambe_input_Key.NumpadEnter,flambe_input_Key.NumpadMultiply,flambe_input_Key.NumpadSubtract,flambe_input_Key.F1,flambe_input_Key.F2,flambe_input_Key.F3,flambe_input_Key.F4,flambe_input_Key.F5,flambe_input_Key.F6,flambe_input_Key.F7,flambe_input_Key.F8,flambe_input_Key.F9,flambe_input_Key.F10,flambe_input_Key.F11,flambe_input_Key.F12,flambe_input_Key.F13,flambe_input_Key.F14,flambe_input_Key.F15,flambe_input_Key.Left,flambe_input_Key.Up,flambe_input_Key.Right,flambe_input_Key.Down,flambe_input_Key.Alt,flambe_input_Key.Backquote,flambe_input_Key.Backslash,flambe_input_Key.Backspace,flambe_input_Key.CapsLock,flambe_input_Key.Comma,flambe_input_Key.Command,flambe_input_Key.Control,flambe_input_Key.Delete,flambe_input_Key.End,flambe_input_Key.Enter,flambe_input_Key.Equals,flambe_input_Key.Escape,flambe_input_Key.Home,flambe_input_Key.Insert,flambe_input_Key.LeftBracket,flambe_input_Key.Minus,flambe_input_Key.PageDown,flambe_input_Key.PageUp,flambe_input_Key.Period,flambe_input_Key.Quote,flambe_input_Key.RightBracket,flambe_input_Key.Semicolon,flambe_input_Key.Shift,flambe_input_Key.Slash,flambe_input_Key.Space,flambe_input_Key.Tab,flambe_input_Key.Menu,flambe_input_Key.Search];
var flambe_input_KeyboardEvent = function() {
	this.init(0,null);
};
$hxClasses["flambe.input.KeyboardEvent"] = flambe_input_KeyboardEvent;
flambe_input_KeyboardEvent.__name__ = ["flambe","input","KeyboardEvent"];
flambe_input_KeyboardEvent.prototype = {
	init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe_input_KeyboardEvent
};
var flambe_input_MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : ["flambe","input","MouseButton"], __constructs__ : ["Left","Middle","Right","Unknown"] };
flambe_input_MouseButton.Left = ["Left",0];
flambe_input_MouseButton.Left.toString = $estr;
flambe_input_MouseButton.Left.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Middle = ["Middle",1];
flambe_input_MouseButton.Middle.toString = $estr;
flambe_input_MouseButton.Middle.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Right = ["Right",2];
flambe_input_MouseButton.Right.toString = $estr;
flambe_input_MouseButton.Right.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe_input_MouseButton; $x.toString = $estr; return $x; };
flambe_input_MouseButton.__empty_constructs__ = [flambe_input_MouseButton.Left,flambe_input_MouseButton.Middle,flambe_input_MouseButton.Right];
var flambe_input_MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : ["flambe","input","MouseCursor"], __constructs__ : ["Default","Button","None"] };
flambe_input_MouseCursor.Default = ["Default",0];
flambe_input_MouseCursor.Default.toString = $estr;
flambe_input_MouseCursor.Default.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.Button = ["Button",1];
flambe_input_MouseCursor.Button.toString = $estr;
flambe_input_MouseCursor.Button.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.None = ["None",2];
flambe_input_MouseCursor.None.toString = $estr;
flambe_input_MouseCursor.None.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.__empty_constructs__ = [flambe_input_MouseCursor.Default,flambe_input_MouseCursor.Button,flambe_input_MouseCursor.None];
var flambe_input_MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe_input_MouseEvent;
flambe_input_MouseEvent.__name__ = ["flambe","input","MouseEvent"];
flambe_input_MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe_input_MouseEvent
};
var flambe_input_EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : ["flambe","input","EventSource"], __constructs__ : ["Mouse","Touch"] };
flambe_input_EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
flambe_input_EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
flambe_input_EventSource.__empty_constructs__ = [];
var flambe_input_PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe_input_PointerEvent;
flambe_input_PointerEvent.__name__ = ["flambe","input","PointerEvent"];
flambe_input_PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe_input_PointerEvent
};
var flambe_input_TouchPoint = function(id) {
	this.id = id;
	this._source = flambe_input_EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe_input_TouchPoint;
flambe_input_TouchPoint.__name__ = ["flambe","input","TouchPoint"];
flambe_input_TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe_input_TouchPoint
};
var flambe_math_FMath = function() { };
$hxClasses["flambe.math.FMath"] = flambe_math_FMath;
flambe_math_FMath.__name__ = ["flambe","math","FMath"];
flambe_math_FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
};
flambe_math_FMath.max = function(a,b) {
	if(a > b) return a; else return b;
};
flambe_math_FMath.min = function(a,b) {
	if(a < b) return a; else return b;
};
flambe_math_FMath.clamp = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
var flambe_math_Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe_math_Matrix;
flambe_math_Matrix.__name__ = ["flambe","math","Matrix"];
flambe_math_Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe_math_Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
};
flambe_math_Matrix.prototype = {
	set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,transform: function(x,y,result) {
		if(result == null) result = new flambe_math_Point();
		result.x = x * this.m00 + y * this.m01 + this.m02;
		result.y = x * this.m10 + y * this.m11 + this.m12;
		return result;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii];
			var y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
	}
	,__class__: flambe_math_Matrix
};
var flambe_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe_math_Rectangle;
flambe_math_Rectangle.__name__ = ["flambe","math","Rectangle"];
flambe_math_Rectangle.prototype = {
	set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,get_centerX: function() {
		return this.x + this.width / 2;
	}
	,get_centerY: function() {
		return this.y + this.height / 2;
	}
	,__class__: flambe_math_Rectangle
	,__properties__: {get_centerY:"get_centerY",get_centerX:"get_centerX"}
};
var flambe_platform_BasicAsset = function() {
	this._reloadCount = null;
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe_platform_BasicAsset;
flambe_platform_BasicAsset.__name__ = ["flambe","platform","BasicAsset"];
flambe_platform_BasicAsset.__interfaces__ = [flambe_asset_Asset];
flambe_platform_BasicAsset.prototype = {
	assertNotDisposed: function(sup) {
		flambe_util_Assert.that(!this._disposed,"Asset cannot be used after being disposed: " + this.id + " " + sup);
	}
	,reload: function(asset) {
		this.dispose();
		this._disposed = false;
		this.copyFrom(asset);
		var _g = this.get_reloadCount();
		_g.set__(_g.get__() + 1);
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,copyFrom: function(asset) {
		flambe_util_Assert.fail();
	}
	,onDisposed: function() {
		flambe_util_Assert.fail();
	}
	,get_reloadCount: function() {
		if(this._reloadCount == null) this._reloadCount = new flambe_util_Value(0);
		return this._reloadCount;
	}
	,__class__: flambe_platform_BasicAsset
	,__properties__: {get_reloadCount:"get_reloadCount"}
};
var flambe_platform_BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe_util_Promise();
	this._bytesLoaded = new haxe_ds_StringMap();
	this._pack = new flambe_platform__$BasicAssetPackLoader_BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe_ds_StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = groups.iterator();
		while( $it0.hasNext() ) {
			var group1 = $it0.next();
			var group2 = [group1];
			this.pickBestEntry(group2[0],(function(group2) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							if (error instanceof js__$Boot_HaxeError) error = error.val;
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g11 = _g.promise;
						_g11.set_total(_g11.get_total() + bestEntry.bytes);
					} else {
						var badEntry = group2[0][0];
						if(flambe_platform_BasicAssetPackLoader.isAudio(badEntry.format)) {
							flambe_Log.warn("Could not find a supported audio format to load",["name",badEntry.name]);
							_g.handleLoad(badEntry,flambe_platform_DummySound.getInstance());
						} else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group2));
		}
	}
	var catapult = this._platform.getCatapultClient();
	if(catapult != null) catapult.add(this);
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe_platform_BasicAssetPackLoader;
flambe_platform_BasicAssetPackLoader.__name__ = ["flambe","platform","BasicAssetPackLoader"];
flambe_platform_BasicAssetPackLoader.removeUrlParams = function(url) {
	var query = url.indexOf("?");
	if(query > 0) return HxOverrides.substr(url,0,query); else return url;
};
flambe_platform_BasicAssetPackLoader.isAudio = function(format) {
	switch(Type.enumIndex(format)) {
	case 8:case 9:case 10:case 11:case 12:
		return true;
	default:
		return false;
	}
};
flambe_platform_BasicAssetPackLoader.prototype = {
	reload: function(url) {
		var _g = this;
		var baseUrl = flambe_platform_BasicAssetPackLoader.removeUrlParams(url);
		var foundEntry = null;
		var $it0 = this.manifest.iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			if(baseUrl == flambe_platform_BasicAssetPackLoader.removeUrlParams(entry.url)) {
				foundEntry = entry;
				break;
			}
		}
		if(foundEntry != null) this.getAssetFormats(function(formats) {
			if(formats.indexOf(foundEntry.format) >= 0) {
				var entry1 = new flambe_asset_AssetEntry(foundEntry.name,url,foundEntry.format,0);
				_g.loadEntry(_g.manifest.getFullURL(entry1),entry1);
			}
		});
	}
	,onDisposed: function() {
		var catapult = this._platform.getCatapultClient();
		if(catapult != null) catapult.remove(this);
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,loadEntry: function(url,entry) {
		flambe_util_Assert.fail();
	}
	,getAssetFormats: function(fn) {
		flambe_util_Assert.fail();
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		var _g = entry.format;
		switch(Type.enumIndex(_g)) {
		case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
			map = this._pack.textures;
			break;
		case 8:case 9:case 10:case 11:case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		var oldAsset = map.get(entry.name);
		if(oldAsset != null) {
			flambe_Log.info("Reloaded asset",["url",entry.url]);
			oldAsset.reload(asset);
		} else {
			map.set(entry.name,asset);
			this._assetsRemaining -= 1;
			if(this._assetsRemaining == 0) this.handleSuccess();
		}
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = this._bytesLoaded.iterator();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleError: function(entry,message) {
		flambe_Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
		this.promise.error.emit(flambe_util_Strings.withFields(message,["url",entry.url]));
	}
	,handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,__class__: flambe_platform_BasicAssetPackLoader
};
var flambe_platform__$BasicAssetPackLoader_BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe_ds_StringMap();
	this.sounds = new haxe_ds_StringMap();
	this.files = new haxe_ds_StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe_platform__$BasicAssetPackLoader_BasicAssetPack;
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__name__ = ["flambe","platform","_BasicAssetPackLoader","BasicAssetPack"];
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__interfaces__ = [flambe_asset_AssetPack];
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe_util_Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe_Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe_util_Strings.removeFileExtension(path) + "\"?");
};
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.prototype = {
	getTexture: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing texture",["name",name]));
		return texture;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension(name);
		var sound = this.sounds.get(name);
		if(sound == null && required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing sound",["name",name]));
		return sound;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		var file = this.files.get(name);
		if(file == null && required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing file",["name",name]));
		return file;
	}
	,dispose: function() {
		if(!this.disposed) {
			this.disposed = true;
			var $it0 = this.textures.iterator();
			while( $it0.hasNext() ) {
				var texture = $it0.next();
				texture.dispose();
			}
			this.textures = null;
			var $it1 = this.sounds.iterator();
			while( $it1.hasNext() ) {
				var sound = $it1.next();
				sound.dispose();
			}
			this.sounds = null;
			var $it2 = this.files.iterator();
			while( $it2.hasNext() ) {
				var file = $it2.next();
				file.dispose();
			}
			this.files = null;
			this.loader.onDisposed();
		}
	}
	,get_manifest: function() {
		return this._manifest;
	}
	,assertNotDisposed: function() {
		flambe_util_Assert.that(!this.disposed,"AssetPack cannot be used after being disposed");
	}
	,__class__: flambe_platform__$BasicAssetPackLoader_BasicAssetPack
	,__properties__: {get_manifest:"get_manifest"}
};
var flambe_platform_BasicFile = function(content) {
	flambe_platform_BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe_platform_BasicFile;
flambe_platform_BasicFile.__name__ = ["flambe","platform","BasicFile"];
flambe_platform_BasicFile.__interfaces__ = [flambe_asset_File];
flambe_platform_BasicFile.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicFile.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	toString: function() {
		this.assertNotDisposed();
		return this._content;
	}
	,copyFrom: function(that) {
		this._content = that._content;
	}
	,onDisposed: function() {
		this._content = null;
	}
	,__class__: flambe_platform_BasicFile
});
var flambe_subsystem_KeyboardSystem = function() { };
$hxClasses["flambe.subsystem.KeyboardSystem"] = flambe_subsystem_KeyboardSystem;
flambe_subsystem_KeyboardSystem.__name__ = ["flambe","subsystem","KeyboardSystem"];
flambe_subsystem_KeyboardSystem.prototype = {
	__class__: flambe_subsystem_KeyboardSystem
};
var flambe_platform_BasicKeyboard = function() {
	this.down = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.backButton = new flambe_util_Signal0();
	this._keyStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicKeyboard"] = flambe_platform_BasicKeyboard;
flambe_platform_BasicKeyboard.__name__ = ["flambe","platform","BasicKeyboard"];
flambe_platform_BasicKeyboard.__interfaces__ = [flambe_subsystem_KeyboardSystem];
flambe_platform_BasicKeyboard.prototype = {
	isDown: function(key) {
		return this.isCodeDown(flambe_platform_KeyCodes.toKeyCode(key));
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.down.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.up.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
	}
	,__class__: flambe_platform_BasicKeyboard
};
var flambe_subsystem_MouseSystem = function() { };
$hxClasses["flambe.subsystem.MouseSystem"] = flambe_subsystem_MouseSystem;
flambe_subsystem_MouseSystem.__name__ = ["flambe","subsystem","MouseSystem"];
flambe_subsystem_MouseSystem.prototype = {
	__class__: flambe_subsystem_MouseSystem
	,__properties__: {set_cursor:"set_cursor"}
};
var flambe_platform_BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe_input_EventSource.Mouse(flambe_platform_BasicMouse._sharedEvent);
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.scroll = new flambe_util_Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe_input_MouseCursor.Default;
	this._buttonStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe_platform_BasicMouse;
flambe_platform_BasicMouse.__name__ = ["flambe","platform","BasicMouse"];
flambe_platform_BasicMouse.__interfaces__ = [flambe_subsystem_MouseSystem];
flambe_platform_BasicMouse.prototype = {
	set_cursor: function(cursor) {
		return this._cursor = cursor;
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this.isCodeDown(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe_platform_BasicMouse._sharedEvent);
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicMouse._sharedEvent.init(flambe_platform_BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,__class__: flambe_platform_BasicMouse
	,__properties__: {set_cursor:"set_cursor"}
};
var flambe_subsystem_PointerSystem = function() { };
$hxClasses["flambe.subsystem.PointerSystem"] = flambe_subsystem_PointerSystem;
flambe_subsystem_PointerSystem.__name__ = ["flambe","subsystem","PointerSystem"];
flambe_subsystem_PointerSystem.prototype = {
	__class__: flambe_subsystem_PointerSystem
	,__properties__: {get_y:"get_y",get_x:"get_x"}
};
var flambe_platform_BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe_platform_BasicPointer;
flambe_platform_BasicPointer.__name__ = ["flambe","platform","BasicPointer"];
flambe_platform_BasicPointer.__interfaces__ = [flambe_subsystem_PointerSystem];
flambe_platform_BasicPointer.prototype = {
	get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = true;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_3");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerDown(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.down.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		if(viewX == this._x && viewY == this._y) return;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_3");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerMove(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.move.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = false;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_3");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerUp(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.up.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicPointer._sharedEvent.init(flambe_platform_BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,__class__: flambe_platform_BasicPointer
	,__properties__: {get_y:"get_y",get_x:"get_x"}
};
var flambe_platform_BasicTexture = function(root,width,height) {
	this._y = 0;
	this._x = 0;
	this._parent = null;
	this.rootY = 0;
	this.rootX = 0;
	flambe_platform_BasicAsset.call(this);
	this.root = root;
	this._width = width;
	this._height = height;
};
$hxClasses["flambe.platform.BasicTexture"] = flambe_platform_BasicTexture;
flambe_platform_BasicTexture.__name__ = ["flambe","platform","BasicTexture"];
flambe_platform_BasicTexture.__interfaces__ = [flambe_display_SubTexture];
flambe_platform_BasicTexture.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicTexture.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	subTexture: function(x,y,width,height) {
		var sub = this.root.createTexture(width,height);
		sub._parent = this;
		sub._x = x;
		sub._y = y;
		sub.rootX = this.rootX + x;
		sub.rootY = this.rootY + y;
		return sub;
	}
	,split: function(tilesWide,tilesHigh) {
		if(tilesHigh == null) tilesHigh = 1;
		var tiles = [];
		var tileWidth = Std["int"](this._width / tilesWide);
		var tileHeight = Std["int"](this._height / tilesHigh);
		var _g = 0;
		while(_g < tilesHigh) {
			var y = _g++;
			var _g1 = 0;
			while(_g1 < tilesWide) {
				var x = _g1++;
				tiles.push(this.subTexture(x * tileWidth,y * tileHeight,tileWidth,tileHeight));
			}
		}
		return tiles;
	}
	,get_graphics: function() {
		return this.root.getGraphics();
	}
	,copyFrom: function(that) {
		this.root._disposed = false;
		this.root.copyFrom(that.root);
		this._width = that._width;
		this._height = that._height;
		flambe_util_Assert.that(this.rootX == that.rootX && this.rootY == that.rootY && this._x == that._x && this._y == that._y);
	}
	,onDisposed: function() {
		if(this._parent == null) this.root.dispose();
	}
	,get_reloadCount: function() {
		return this.root.get_reloadCount();
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,get_width: function() {
		return this._width;
	}
	,get_height: function() {
		return this._height;
	}
	,__class__: flambe_platform_BasicTexture
	,__properties__: $extend(flambe_platform_BasicAsset.prototype.__properties__,{get_height:"get_height",get_width:"get_width",get_y:"get_y",get_x:"get_x",get_graphics:"get_graphics"})
});
var flambe_subsystem_TouchSystem = function() { };
$hxClasses["flambe.subsystem.TouchSystem"] = flambe_subsystem_TouchSystem;
flambe_subsystem_TouchSystem.__name__ = ["flambe","subsystem","TouchSystem"];
flambe_subsystem_TouchSystem.prototype = {
	__class__: flambe_subsystem_TouchSystem
	,__properties__: {get_supported:"get_supported"}
};
var flambe_platform_BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe_ds_IntMap();
	this._points = [];
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe_platform_BasicTouch;
flambe_platform_BasicTouch.__name__ = ["flambe","platform","BasicTouch"];
flambe_platform_BasicTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_BasicTouch.prototype = {
	get_supported: function() {
		return true;
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe_input_TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,__class__: flambe_platform_BasicTouch
	,__properties__: {get_supported:"get_supported"}
};
var flambe_platform_CatapultClient = function() {
	this._loaders = [];
};
$hxClasses["flambe.platform.CatapultClient"] = flambe_platform_CatapultClient;
flambe_platform_CatapultClient.__name__ = ["flambe","platform","CatapultClient"];
flambe_platform_CatapultClient.prototype = {
	add: function(loader) {
		if(loader.manifest.get_localBase() == "assets") this._loaders.push(loader);
	}
	,remove: function(loader) {
		HxOverrides.remove(this._loaders,loader);
	}
	,onError: function(cause) {
		flambe_Log.warn("Unable to connect to Catapult",["cause",cause]);
	}
	,onMessage: function(message) {
		var message1 = haxe_Json.parse(message);
		var _g = message1.type;
		switch(_g) {
		case "file_changed":
			var url = message1.name + "?v=" + message1.md5;
			url = StringTools.replace(url,"\\","/");
			var _g1 = 0;
			var _g2 = this._loaders;
			while(_g1 < _g2.length) {
				var loader = _g2[_g1];
				++_g1;
				loader.reload(url);
			}
			break;
		case "restart":
			this.onRestart();
			break;
		}
	}
	,onRestart: function() {
		flambe_util_Assert.fail();
	}
	,__class__: flambe_platform_CatapultClient
};
var flambe_platform_DebugLogic = function(platform) {
	var _g = this;
	this._platform = platform;
	platform.getKeyboard().down.connect(function(event) {
		if(event.key == flambe_input_Key.O && platform.getKeyboard().isDown(flambe_input_Key.Control)) {
			if(_g.toggleOverdrawGraphics()) flambe_Log.info("Enabled overdraw visualizer, press Ctrl-O again to disable");
		}
	});
};
$hxClasses["flambe.platform.DebugLogic"] = flambe_platform_DebugLogic;
flambe_platform_DebugLogic.__name__ = ["flambe","platform","DebugLogic"];
flambe_platform_DebugLogic.prototype = {
	toggleOverdrawGraphics: function() {
		var renderer = this._platform.getRenderer();
		if(this._savedGraphics != null) {
			renderer.graphics = this._savedGraphics;
			this._savedGraphics = null;
		} else if(renderer.graphics != null) {
			this._savedGraphics = renderer.graphics;
			renderer.graphics = new flambe_platform_OverdrawGraphics(this._savedGraphics);
			return true;
		}
		return false;
	}
	,__class__: flambe_platform_DebugLogic
};
var flambe_sound_Sound = function() { };
$hxClasses["flambe.sound.Sound"] = flambe_sound_Sound;
flambe_sound_Sound.__name__ = ["flambe","sound","Sound"];
flambe_sound_Sound.__interfaces__ = [flambe_asset_Asset];
flambe_sound_Sound.prototype = {
	__class__: flambe_sound_Sound
};
var flambe_platform_DummySound = function() {
	flambe_platform_BasicAsset.call(this);
	this._playback = new flambe_platform_DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe_platform_DummySound;
flambe_platform_DummySound.__name__ = ["flambe","platform","DummySound"];
flambe_platform_DummySound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_DummySound.getInstance = function() {
	if(flambe_platform_DummySound._instance == null) flambe_platform_DummySound._instance = new flambe_platform_DummySound();
	return flambe_platform_DummySound._instance;
};
flambe_platform_DummySound.__super__ = flambe_platform_BasicAsset;
flambe_platform_DummySound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,copyFrom: function(asset) {
	}
	,onDisposed: function() {
	}
	,__class__: flambe_platform_DummySound
});
var flambe_sound_Playback = function() { };
$hxClasses["flambe.sound.Playback"] = flambe_sound_Playback;
flambe_sound_Playback.__name__ = ["flambe","sound","Playback"];
flambe_sound_Playback.__interfaces__ = [flambe_util_Disposable];
flambe_sound_Playback.prototype = {
	__class__: flambe_sound_Playback
	,__properties__: {get_sound:"get_sound",get_complete:"get_complete"}
};
var flambe_platform_DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe_animation_AnimatedFloat(0);
	this._complete = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe_platform_DummyPlayback;
flambe_platform_DummyPlayback.__name__ = ["flambe","platform","DummyPlayback"];
flambe_platform_DummyPlayback.__interfaces__ = [flambe_sound_Playback];
flambe_platform_DummyPlayback.prototype = {
	get_sound: function() {
		return this._sound;
	}
	,get_complete: function() {
		return this._complete;
	}
	,dispose: function() {
	}
	,__class__: flambe_platform_DummyPlayback
	,__properties__: {get_complete:"get_complete",get_sound:"get_sound"}
};
var flambe_subsystem_StorageSystem = function() { };
$hxClasses["flambe.subsystem.StorageSystem"] = flambe_subsystem_StorageSystem;
flambe_subsystem_StorageSystem.__name__ = ["flambe","subsystem","StorageSystem"];
flambe_subsystem_StorageSystem.prototype = {
	__class__: flambe_subsystem_StorageSystem
};
var flambe_platform_DummyStorage = function() {
	this.clear();
};
$hxClasses["flambe.platform.DummyStorage"] = flambe_platform_DummyStorage;
flambe_platform_DummyStorage.__name__ = ["flambe","platform","DummyStorage"];
flambe_platform_DummyStorage.__interfaces__ = [flambe_subsystem_StorageSystem];
flambe_platform_DummyStorage.prototype = {
	set: function(key,value) {
		var value1 = value;
		this._hash.set(key,value1);
		return true;
	}
	,get: function(key,defaultValue) {
		if(this._hash.exists(key)) return this._hash.get(key); else return defaultValue;
	}
	,clear: function() {
		this._hash = new haxe_ds_StringMap();
	}
	,__class__: flambe_platform_DummyStorage
};
var flambe_platform_DummyTouch = function() {
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe_platform_DummyTouch;
flambe_platform_DummyTouch.__name__ = ["flambe","platform","DummyTouch"];
flambe_platform_DummyTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_DummyTouch.prototype = {
	get_supported: function() {
		return false;
	}
	,__class__: flambe_platform_DummyTouch
	,__properties__: {get_supported:"get_supported"}
};
var flambe_platform_EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe_platform_EventGroup;
flambe_platform_EventGroup.__name__ = ["flambe","platform","EventGroup"];
flambe_platform_EventGroup.__interfaces__ = [flambe_util_Disposable];
flambe_platform_EventGroup.prototype = {
	addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe_platform__$EventGroup_Entry(dispatcher,type,listener));
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,dispose: function() {
		var _g = 0;
		var _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,__class__: flambe_platform_EventGroup
};
var flambe_platform__$EventGroup_Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe_platform__$EventGroup_Entry;
flambe_platform__$EventGroup_Entry.__name__ = ["flambe","platform","_EventGroup","Entry"];
flambe_platform__$EventGroup_Entry.prototype = {
	__class__: flambe_platform__$EventGroup_Entry
};
var flambe_platform_InternalGraphics = function() { };
$hxClasses["flambe.platform.InternalGraphics"] = flambe_platform_InternalGraphics;
flambe_platform_InternalGraphics.__name__ = ["flambe","platform","InternalGraphics"];
flambe_platform_InternalGraphics.__interfaces__ = [flambe_display_Graphics];
flambe_platform_InternalGraphics.prototype = {
	__class__: flambe_platform_InternalGraphics
};
var flambe_subsystem_RendererSystem = function() { };
$hxClasses["flambe.subsystem.RendererSystem"] = flambe_subsystem_RendererSystem;
flambe_subsystem_RendererSystem.__name__ = ["flambe","subsystem","RendererSystem"];
flambe_subsystem_RendererSystem.prototype = {
	__class__: flambe_subsystem_RendererSystem
	,__properties__: {get_type:"get_type"}
};
var flambe_platform_InternalRenderer = function() { };
$hxClasses["flambe.platform.InternalRenderer"] = flambe_platform_InternalRenderer;
flambe_platform_InternalRenderer.__name__ = ["flambe","platform","InternalRenderer"];
flambe_platform_InternalRenderer.__interfaces__ = [flambe_subsystem_RendererSystem];
flambe_platform_InternalRenderer.prototype = {
	__class__: flambe_platform_InternalRenderer
};
var flambe_platform_KeyCodes = function() { };
$hxClasses["flambe.platform.KeyCodes"] = flambe_platform_KeyCodes;
flambe_platform_KeyCodes.__name__ = ["flambe","platform","KeyCodes"];
flambe_platform_KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe_input_Key.A;
	case 66:
		return flambe_input_Key.B;
	case 67:
		return flambe_input_Key.C;
	case 68:
		return flambe_input_Key.D;
	case 69:
		return flambe_input_Key.E;
	case 70:
		return flambe_input_Key.F;
	case 71:
		return flambe_input_Key.G;
	case 72:
		return flambe_input_Key.H;
	case 73:
		return flambe_input_Key.I;
	case 74:
		return flambe_input_Key.J;
	case 75:
		return flambe_input_Key.K;
	case 76:
		return flambe_input_Key.L;
	case 77:
		return flambe_input_Key.M;
	case 78:
		return flambe_input_Key.N;
	case 79:
		return flambe_input_Key.O;
	case 80:
		return flambe_input_Key.P;
	case 81:
		return flambe_input_Key.Q;
	case 82:
		return flambe_input_Key.R;
	case 83:
		return flambe_input_Key.S;
	case 84:
		return flambe_input_Key.T;
	case 85:
		return flambe_input_Key.U;
	case 86:
		return flambe_input_Key.V;
	case 87:
		return flambe_input_Key.W;
	case 88:
		return flambe_input_Key.X;
	case 89:
		return flambe_input_Key.Y;
	case 90:
		return flambe_input_Key.Z;
	case 48:
		return flambe_input_Key.Number0;
	case 49:
		return flambe_input_Key.Number1;
	case 50:
		return flambe_input_Key.Number2;
	case 51:
		return flambe_input_Key.Number3;
	case 52:
		return flambe_input_Key.Number4;
	case 53:
		return flambe_input_Key.Number5;
	case 54:
		return flambe_input_Key.Number6;
	case 55:
		return flambe_input_Key.Number7;
	case 56:
		return flambe_input_Key.Number8;
	case 57:
		return flambe_input_Key.Number9;
	case 96:
		return flambe_input_Key.Numpad0;
	case 97:
		return flambe_input_Key.Numpad1;
	case 98:
		return flambe_input_Key.Numpad2;
	case 99:
		return flambe_input_Key.Numpad3;
	case 100:
		return flambe_input_Key.Numpad4;
	case 101:
		return flambe_input_Key.Numpad5;
	case 102:
		return flambe_input_Key.Numpad6;
	case 103:
		return flambe_input_Key.Numpad7;
	case 104:
		return flambe_input_Key.Numpad8;
	case 105:
		return flambe_input_Key.Numpad9;
	case 107:
		return flambe_input_Key.NumpadAdd;
	case 110:
		return flambe_input_Key.NumpadDecimal;
	case 111:
		return flambe_input_Key.NumpadDivide;
	case 108:
		return flambe_input_Key.NumpadEnter;
	case 106:
		return flambe_input_Key.NumpadMultiply;
	case 109:
		return flambe_input_Key.NumpadSubtract;
	case 112:
		return flambe_input_Key.F1;
	case 113:
		return flambe_input_Key.F2;
	case 114:
		return flambe_input_Key.F3;
	case 115:
		return flambe_input_Key.F4;
	case 116:
		return flambe_input_Key.F5;
	case 117:
		return flambe_input_Key.F6;
	case 118:
		return flambe_input_Key.F7;
	case 119:
		return flambe_input_Key.F8;
	case 120:
		return flambe_input_Key.F9;
	case 121:
		return flambe_input_Key.F10;
	case 122:
		return flambe_input_Key.F11;
	case 123:
		return flambe_input_Key.F12;
	case 37:
		return flambe_input_Key.Left;
	case 38:
		return flambe_input_Key.Up;
	case 39:
		return flambe_input_Key.Right;
	case 40:
		return flambe_input_Key.Down;
	case 18:
		return flambe_input_Key.Alt;
	case 192:
		return flambe_input_Key.Backquote;
	case 220:
		return flambe_input_Key.Backslash;
	case 8:
		return flambe_input_Key.Backspace;
	case 20:
		return flambe_input_Key.CapsLock;
	case 188:
		return flambe_input_Key.Comma;
	case 15:
		return flambe_input_Key.Command;
	case 17:
		return flambe_input_Key.Control;
	case 46:
		return flambe_input_Key.Delete;
	case 35:
		return flambe_input_Key.End;
	case 13:
		return flambe_input_Key.Enter;
	case 187:
		return flambe_input_Key.Equals;
	case 27:
		return flambe_input_Key.Escape;
	case 36:
		return flambe_input_Key.Home;
	case 45:
		return flambe_input_Key.Insert;
	case 219:
		return flambe_input_Key.LeftBracket;
	case 189:
		return flambe_input_Key.Minus;
	case 34:
		return flambe_input_Key.PageDown;
	case 33:
		return flambe_input_Key.PageUp;
	case 190:
		return flambe_input_Key.Period;
	case 222:
		return flambe_input_Key.Quote;
	case 221:
		return flambe_input_Key.RightBracket;
	case 186:
		return flambe_input_Key.Semicolon;
	case 16:
		return flambe_input_Key.Shift;
	case 191:
		return flambe_input_Key.Slash;
	case 32:
		return flambe_input_Key.Space;
	case 9:
		return flambe_input_Key.Tab;
	case 16777234:
		return flambe_input_Key.Menu;
	case 16777247:
		return flambe_input_Key.Search;
	}
	return flambe_input_Key.Unknown(keyCode);
};
flambe_platform_KeyCodes.toKeyCode = function(key) {
	switch(Type.enumIndex(key)) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = key[2];
		return keyCode;
	}
};
var flambe_platform_MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe_platform_MainLoop;
flambe_platform_MainLoop.__name__ = ["flambe","platform","MainLoop"];
flambe_platform_MainLoop.updateEntity = function(entity,dt) {
	var speed;
	var component = entity.getComponent("SpeedAdjuster_7");
	speed = component;
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale.get__();
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		if(!flambe_util_BitSets.contains(p._flags,1)) {
			p._flags = flambe_util_BitSets.add(p._flags,1);
			p.onStart();
		}
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next1 = p1.next;
		flambe_platform_MainLoop.updateEntity(p1,dt);
		p1 = next1;
	}
};
flambe_platform_MainLoop.prototype = {
	update: function(dt) {
		if(dt <= 0) {
			flambe_Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe_System.volume.update(dt);
		flambe_platform_MainLoop.updateEntity(flambe_System.root,dt);
	}
	,render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe_display_Sprite.render(flambe_System.root,graphics);
			renderer.didRender();
		}
	}
	,addTickable: function(t) {
		this._tickables.push(t);
	}
	,__class__: flambe_platform_MainLoop
};
var flambe_platform_MathUtil = function() { };
$hxClasses["flambe.platform.MathUtil"] = flambe_platform_MathUtil;
flambe_platform_MathUtil.__name__ = ["flambe","platform","MathUtil"];
flambe_platform_MathUtil.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
};
var flambe_platform_MouseCodes = function() { };
$hxClasses["flambe.platform.MouseCodes"] = flambe_platform_MouseCodes;
flambe_platform_MouseCodes.__name__ = ["flambe","platform","MouseCodes"];
flambe_platform_MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe_input_MouseButton.Left;
	case 1:
		return flambe_input_MouseButton.Middle;
	case 2:
		return flambe_input_MouseButton.Right;
	}
	return flambe_input_MouseButton.Unknown(buttonCode);
};
var flambe_platform_OverdrawGraphics = function(impl) {
	this._impl = impl;
};
$hxClasses["flambe.platform.OverdrawGraphics"] = flambe_platform_OverdrawGraphics;
flambe_platform_OverdrawGraphics.__name__ = ["flambe","platform","OverdrawGraphics"];
flambe_platform_OverdrawGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_OverdrawGraphics.prototype = {
	save: function() {
		this._impl.save();
	}
	,translate: function(x,y) {
		this._impl.translate(x,y);
	}
	,scale: function(x,y) {
		this._impl.scale(x,y);
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._impl.transform(m00,m10,m01,m11,m02,m12);
	}
	,multiplyAlpha: function(factor) {
	}
	,setBlendMode: function(blendMode) {
	}
	,applyScissor: function(x,y,width,height) {
		this._impl.applyScissor(x,y,width,height);
	}
	,restore: function() {
		this._impl.restore();
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawRegion(destX,destY,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		this.drawRegion(destX,destY,sourceW,sourceH);
	}
	,fillRect: function(color,x,y,width,height) {
		this.drawRegion(x,y,width,height);
	}
	,willRender: function() {
		this._impl.willRender();
		this._impl.save();
		this._impl.setBlendMode(flambe_display_BlendMode.Add);
	}
	,didRender: function() {
		this._impl.restore();
		this._impl.didRender();
	}
	,onResize: function(width,height) {
		this._impl.onResize(width,height);
	}
	,drawRegion: function(x,y,width,height) {
		this._impl.fillRect(1052680,x,y,width,height);
	}
	,__class__: flambe_platform_OverdrawGraphics
};
var flambe_platform_TextureRoot = function() { };
$hxClasses["flambe.platform.TextureRoot"] = flambe_platform_TextureRoot;
flambe_platform_TextureRoot.__name__ = ["flambe","platform","TextureRoot"];
flambe_platform_TextureRoot.prototype = {
	__class__: flambe_platform_TextureRoot
};
var flambe_platform_Tickable = function() { };
$hxClasses["flambe.platform.Tickable"] = flambe_platform_Tickable;
flambe_platform_Tickable.__name__ = ["flambe","platform","Tickable"];
flambe_platform_Tickable.prototype = {
	__class__: flambe_platform_Tickable
};
var flambe_platform_html_CanvasGraphics = function(canvas,alpha) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d",{ alpha : alpha});
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe_platform_html_CanvasGraphics;
flambe_platform_html_CanvasGraphics.__name__ = ["flambe","platform","html","CanvasGraphics"];
flambe_platform_html_CanvasGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_CanvasGraphics.prototype = {
	save: function() {
		this._canvasCtx.save();
	}
	,translate: function(x,y) {
		this._canvasCtx.translate(Std["int"](x),Std["int"](y));
	}
	,scale: function(x,y) {
		this._canvasCtx.scale(x,y);
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawSubTexture(texture,destX,destY,0,0,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubTexture(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		this._canvasCtx.drawImage(root.image,Std["int"](texture1.rootX + sourceX),Std["int"](texture1.rootY + sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch(Type.enumIndex(blendMode)) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "multiply";
			break;
		case 3:
			op = "screen";
			break;
		case 4:
			op = "destination-in";
			break;
		case 5:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
		this._canvasCtx.clip();
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,didRender: function() {
	}
	,onResize: function(width,height) {
	}
	,__class__: flambe_platform_html_CanvasGraphics
};
var flambe_platform_html_CanvasRenderer = function(canvas) {
	this.graphics = new flambe_platform_html_CanvasGraphics(canvas,false);
	this._hasGPU = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe_platform_html_CanvasRenderer;
flambe_platform_html_CanvasRenderer.__name__ = ["flambe","platform","html","CanvasRenderer"];
flambe_platform_html_CanvasRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_CanvasRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.Canvas;
	}
	,createTextureFromImage: function(image) {
		var root = new flambe_platform_html_CanvasTextureRoot(flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES?flambe_platform_html_HtmlUtil.createCanvas(image):image);
		return root.createTexture(root.width,root.height);
	}
	,createTexture: function(width,height) {
		var root = new flambe_platform_html_CanvasTextureRoot(flambe_platform_html_HtmlUtil.createEmptyCanvas(width,height));
		return root.createTexture(width,height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		flambe_util_Assert.fail();
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,__class__: flambe_platform_html_CanvasRenderer
	,__properties__: {get_type:"get_type"}
};
var flambe_platform_html_CanvasTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe_platform_html_CanvasTexture;
flambe_platform_html_CanvasTexture.__name__ = ["flambe","platform","html","CanvasTexture"];
flambe_platform_html_CanvasTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_CanvasTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_CanvasTexture
});
var flambe_platform_html_CanvasTextureRoot = function(image) {
	this._graphics = null;
	this.updateCount = 0;
	flambe_platform_BasicAsset.call(this);
	this.image = image;
	this.width = image.width;
	this.height = image.height;
};
$hxClasses["flambe.platform.html.CanvasTextureRoot"] = flambe_platform_html_CanvasTextureRoot;
flambe_platform_html_CanvasTextureRoot.__name__ = ["flambe","platform","html","CanvasTextureRoot"];
flambe_platform_html_CanvasTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_CanvasTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_CanvasTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_CanvasTexture(this,width,height);
	}
	,dirtyContents: function() {
		++this.updateCount;
	}
	,getGraphics: function() {
		this.assertNotDisposed();
		if(this._graphics == null) {
			this.getContext2d();
			this._graphics = new flambe_platform_html__$CanvasTextureRoot_InternalGraphics(this);
		}
		return this._graphics;
	}
	,getContext2d: function() {
		if(!Std["is"](this.image,HTMLCanvasElement)) this.image = flambe_platform_html_HtmlUtil.createCanvas(this.image);
		var canvas = this.image;
		return canvas.getContext("2d",null);
	}
	,copyFrom: function(that) {
		this.image = that.image;
		this._graphics = that._graphics;
		this.dirtyContents();
	}
	,onDisposed: function() {
		this.image = null;
		this._graphics = null;
	}
	,__class__: flambe_platform_html_CanvasTextureRoot
});
var flambe_platform_html__$CanvasTextureRoot_InternalGraphics = function(renderTarget) {
	flambe_platform_html_CanvasGraphics.call(this,renderTarget.image,true);
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html._CanvasTextureRoot.InternalGraphics"] = flambe_platform_html__$CanvasTextureRoot_InternalGraphics;
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.__name__ = ["flambe","platform","html","_CanvasTextureRoot","InternalGraphics"];
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.__super__ = flambe_platform_html_CanvasGraphics;
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.prototype = $extend(flambe_platform_html_CanvasGraphics.prototype,{
	drawTexture: function(texture,x,y) {
		flambe_platform_html_CanvasGraphics.prototype.drawTexture.call(this,texture,x,y);
		this._renderTarget.dirtyContents();
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		flambe_platform_html_CanvasGraphics.prototype.drawSubTexture.call(this,texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
		this._renderTarget.dirtyContents();
	}
	,fillRect: function(color,x,y,width,height) {
		flambe_platform_html_CanvasGraphics.prototype.fillRect.call(this,color,x,y,width,height);
		this._renderTarget.dirtyContents();
	}
	,__class__: flambe_platform_html__$CanvasTextureRoot_InternalGraphics
});
var flambe_platform_html_HtmlAssetPackLoader = function(platform,manifest) {
	flambe_platform_BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe_platform_html_HtmlAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.__name__ = ["flambe","platform","html","HtmlAssetPackLoader"];
flambe_platform_html_HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe_asset_AssetFormat.PNG,flambe_asset_AssetFormat.JPG,flambe_asset_AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp;
	var _this = js_Browser.get_document();
	webp = _this.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe_asset_AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr;
	var _this1 = js_Browser.get_document();
	jxr = _this1.createElement("img");
	jxr.onload = jxr.onerror = function(_1) {
		if(jxr.width == 1) formats.unshift(flambe_asset_AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
};
flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio;
	var _this = js_Browser.get_document();
	audio = _this.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		flambe_Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b","");
	var userAgent = js_Browser.get_navigator().userAgent;
	if(!flambe_platform_html_WebAudioSound.get_supported() && blacklist.match(userAgent)) {
		flambe_Log.warn("HTML5 audio is blacklisted for this browser",["userAgent",userAgent]);
		return [];
	}
	var types = [{ format : flambe_asset_AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe_asset_AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe_asset_AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe_asset_AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe_asset_AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
};
flambe_platform_html_HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport) {
		flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = false;
		if(new EReg("\\bSilk\\b","").match(js_Browser.get_navigator().userAgent)) return false;
		if(js_Browser.get_window().Blob == null) return false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		if(xhr.responseType != "") return false;
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe_platform_html_HtmlAssetPackLoader._URL = flambe_platform_html_HtmlUtil.loadExtension("URL").value;
	}
	return flambe_platform_html_HtmlAssetPackLoader._URL != null && flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL != null;
};
flambe_platform_html_HtmlAssetPackLoader.__super__ = flambe_platform_BasicAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.prototype = $extend(flambe_platform_BasicAssetPackLoader.prototype,{
	loadEntry: function(url,entry) {
		var _g1 = this;
		var _g = entry.format;
		switch(Type.enumIndex(_g)) {
		case 0:case 1:case 2:case 3:case 4:
			var image;
			var _this = js_Browser.get_document();
			image = _this.createElement("img");
			var events = new flambe_platform_EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe_Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) flambe_platform_html_HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g1._platform.getRenderer().createTextureFromImage(image);
				if(texture != null) _g1.handleLoad(entry,texture); else _g1.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_1) {
				_g1.handleError(entry,"Failed to load image");
			});
			if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) this.downloadBlob(url,entry,function(blob) {
				image.src = flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:case 6:case 7:
			this.downloadArrayBuffer(url,entry,function(buffer) {
				var texture1 = _g1._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture1 != null) _g1.handleLoad(entry,texture1); else _g1.handleTextureError(entry);
			});
			break;
		case 8:case 9:case 10:case 11:case 12:
			if(flambe_platform_html_WebAudioSound.get_supported()) this.downloadArrayBuffer(url,entry,function(buffer1) {
				flambe_platform_html_WebAudioSound.ctx.decodeAudioData(buffer1,function(decoded) {
					_g1.handleLoad(entry,new flambe_platform_html_WebAudioSound(decoded,url));
				},function() {
					flambe_Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
				});
			}); else {
				var audio;
				var _this1 = js_Browser.get_document();
				audio = _this1.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe_platform_html_HtmlAssetPackLoader._mediaRefCount;
				if(flambe_platform_html_HtmlAssetPackLoader._mediaElements == null) flambe_platform_html_HtmlAssetPackLoader._mediaElements = new haxe_ds_IntMap();
				flambe_platform_html_HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events1 = new flambe_platform_EventGroup();
				events1.addDisposingListener(audio,"canplaythrough",function(_2) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					_g1.handleLoad(entry,new flambe_platform_html_HtmlSound(audio));
				});
				events1.addDisposingListener(audio,"error",function(_3) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) {
						flambe_Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
					} else _g1.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events1.addListener(audio,"progress",function(_4) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g1.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.downloadText(url,entry,function(text) {
				_g1.handleLoad(entry,new flambe_platform_BasicFile(text));
			});
			break;
		}
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe_platform_html_HtmlAssetPackLoader._supportedFormats == null) {
			flambe_platform_html_HtmlAssetPackLoader._supportedFormats = new flambe_util_Promise();
			flambe_platform_html_HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe_platform_html_HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats()).concat([flambe_asset_AssetFormat.Data]));
			});
		}
		flambe_platform_html_HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,downloadArrayBuffer: function(url,entry,onLoad) {
		this.download(url,entry,"arraybuffer",onLoad);
	}
	,downloadBlob: function(url,entry,onLoad) {
		this.download(url,entry,"blob",onLoad);
	}
	,downloadText: function(url,entry,onLoad) {
		this.download(url,entry,"text",onLoad);
	}
	,download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = null;
		var start = null;
		var intervalId = 0;
		var hasInterval = false;
		var clearRetryInterval = function() {
			if(hasInterval) {
				hasInterval = false;
				js_Browser.get_window().clearInterval(intervalId);
			}
		};
		var retries = 3;
		var maybeRetry = function() {
			--retries;
			if(retries >= 0) {
				flambe_Log.warn("Retrying asset download",["url",entry.url]);
				start();
				return true;
			}
			return false;
		};
		start = function() {
			clearRetryInterval();
			if(xhr != null) xhr.abort();
			xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			var lastProgress = 0.0;
			xhr.onprogress = function(event) {
				if(!hasInterval) {
					hasInterval = true;
					intervalId = js_Browser.get_window().setInterval(function() {
						if(xhr.readyState != 4 && flambe_platform_html_HtmlUtil.now() - lastProgress > 5000) {
							if(!maybeRetry()) {
								clearRetryInterval();
								_g.handleError(entry,"Download stalled");
							}
						}
					},1000);
				}
				lastProgress = flambe_platform_html_HtmlUtil.now();
				_g.handleProgress(entry,event.loaded);
			};
			xhr.onerror = function(_) {
				if(xhr.status != 0 || !maybeRetry()) {
					clearRetryInterval();
					_g.handleError(entry,"HTTP error " + xhr.status);
				}
			};
			xhr.onload = function(_1) {
				var response = xhr.response;
				if(response == null) response = xhr.responseText;
				clearRetryInterval();
				onLoad(response);
			};
			xhr.send();
		};
		start();
	}
	,__class__: flambe_platform_html_HtmlAssetPackLoader
});
var flambe_platform_html_HtmlCatapultClient = function() {
	var _g = this;
	flambe_platform_CatapultClient.call(this);
	this._socket = new WebSocket("ws://" + js_Browser.get_location().host);
	this._socket.onerror = function(event) {
		_g.onError("unknown");
	};
	this._socket.onopen = function(event1) {
		flambe_Log.info("Catapult connected");
	};
	this._socket.onmessage = function(event2) {
		_g.onMessage(event2.data);
	};
};
$hxClasses["flambe.platform.html.HtmlCatapultClient"] = flambe_platform_html_HtmlCatapultClient;
flambe_platform_html_HtmlCatapultClient.__name__ = ["flambe","platform","html","HtmlCatapultClient"];
flambe_platform_html_HtmlCatapultClient.canUse = function() {
	return Reflect.hasField(js_Browser.get_window(),"WebSocket");
};
flambe_platform_html_HtmlCatapultClient.__super__ = flambe_platform_CatapultClient;
flambe_platform_html_HtmlCatapultClient.prototype = $extend(flambe_platform_CatapultClient.prototype,{
	onRestart: function() {
		js_Browser.get_window().top.location.reload();
	}
	,__class__: flambe_platform_html_HtmlCatapultClient
});
var flambe_subsystem_ExternalSystem = function() { };
$hxClasses["flambe.subsystem.ExternalSystem"] = flambe_subsystem_ExternalSystem;
flambe_subsystem_ExternalSystem.__name__ = ["flambe","subsystem","ExternalSystem"];
flambe_subsystem_ExternalSystem.prototype = {
	__class__: flambe_subsystem_ExternalSystem
	,__properties__: {get_supported:"get_supported"}
};
var flambe_platform_html_HtmlExternal = function() {
};
$hxClasses["flambe.platform.html.HtmlExternal"] = flambe_platform_html_HtmlExternal;
flambe_platform_html_HtmlExternal.__name__ = ["flambe","platform","html","HtmlExternal"];
flambe_platform_html_HtmlExternal.__interfaces__ = [flambe_subsystem_ExternalSystem];
flambe_platform_html_HtmlExternal.prototype = {
	get_supported: function() {
		return true;
	}
	,call: function(name,params) {
		if(params == null) params = [];
		var object = js_Browser.get_window();
		var method = object;
		var _g = 0;
		var _g1 = name.split(".");
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			object = method;
			method = Reflect.field(object,fieldName);
		}
		return Reflect.callMethod(object,method,params);
	}
	,__class__: flambe_platform_html_HtmlExternal
	,__properties__: {get_supported:"get_supported"}
};
var flambe_util_LogHandler = function() { };
$hxClasses["flambe.util.LogHandler"] = flambe_util_LogHandler;
flambe_util_LogHandler.__name__ = ["flambe","util","LogHandler"];
flambe_util_LogHandler.prototype = {
	__class__: flambe_util_LogHandler
};
var flambe_platform_html_HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
$hxClasses["flambe.platform.html.HtmlLogHandler"] = flambe_platform_html_HtmlLogHandler;
flambe_platform_html_HtmlLogHandler.__name__ = ["flambe","platform","html","HtmlLogHandler"];
flambe_platform_html_HtmlLogHandler.__interfaces__ = [flambe_util_LogHandler];
flambe_platform_html_HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
};
flambe_platform_html_HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch(Type.enumIndex(level)) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe_platform_html_HtmlLogHandler
};
var flambe_platform_html_HtmlMouse = function(pointer,canvas) {
	flambe_platform_BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe_platform_html_HtmlMouse;
flambe_platform_html_HtmlMouse.__name__ = ["flambe","platform","html","HtmlMouse"];
flambe_platform_html_HtmlMouse.__super__ = flambe_platform_BasicMouse;
flambe_platform_html_HtmlMouse.prototype = $extend(flambe_platform_BasicMouse.prototype,{
	set_cursor: function(cursor) {
		var name;
		switch(Type.enumIndex(cursor)) {
		case 0:
			name = "";
			break;
		case 1:
			name = "pointer";
			break;
		case 2:
			name = "none";
			break;
		}
		this._canvas.style.cursor = name;
		return flambe_platform_BasicMouse.prototype.set_cursor.call(this,cursor);
	}
	,__class__: flambe_platform_html_HtmlMouse
});
var flambe_platform_html_HtmlSound = function(audioElement) {
	flambe_platform_BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe_platform_html_HtmlSound;
flambe_platform_html_HtmlSound.__name__ = ["flambe","platform","html","HtmlSound"];
flambe_platform_html_HtmlSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_HtmlSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_HtmlSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$HtmlSound_HtmlPlayback(this,volume,false);
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$HtmlSound_HtmlPlayback(this,volume,true);
	}
	,copyFrom: function(that) {
		this.audioElement = that.audioElement;
	}
	,onDisposed: function() {
		this.audioElement = null;
	}
	,__class__: flambe_platform_html_HtmlSound
});
var flambe_platform_html__$HtmlSound_HtmlPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._tickableAdded = false;
	var _this = js_Browser.get_document();
	this._clonedElement = _this.createElement("audio");
	this._clonedElement.loop = loop;
	this._clonedElement.src = sound.audioElement.src;
	this.volume = new flambe_animation_AnimatedFloat(volume,function(_,_1) {
		_g.updateVolume();
	});
	this.updateVolume();
	this._complete = new flambe_util_Value(false);
	this.playAudio();
	if(flambe_System.hidden.get__()) this.set_paused(true);
};
$hxClasses["flambe.platform.html._HtmlSound.HtmlPlayback"] = flambe_platform_html__$HtmlSound_HtmlPlayback;
flambe_platform_html__$HtmlSound_HtmlPlayback.__name__ = ["flambe","platform","html","_HtmlSound","HtmlPlayback"];
flambe_platform_html__$HtmlSound_HtmlPlayback.__interfaces__ = [flambe_platform_Tickable,flambe_sound_Playback];
flambe_platform_html__$HtmlSound_HtmlPlayback.prototype = {
	get_sound: function() {
		return this._sound;
	}
	,get_paused: function() {
		return this._clonedElement.paused;
	}
	,set_paused: function(paused) {
		if(this._clonedElement.paused != paused) {
			if(paused) this._clonedElement.pause(); else this.playAudio();
		}
		return paused;
	}
	,get_complete: function() {
		return this._complete;
	}
	,update: function(dt) {
		this.volume.update(dt);
		this._complete.set__(this._clonedElement.ended);
		if(this._complete.get__() || this.get_paused()) {
			this._tickableAdded = false;
			this._volumeBinding.dispose();
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,dispose: function() {
		this.set_paused(true);
		this._complete.set__(true);
	}
	,playAudio: function() {
		var _g = this;
		this._clonedElement.play();
		if(!this._tickableAdded) {
			flambe_platform_html_HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._volumeBinding = flambe_System.volume.get_changed().connect(function(_,_1) {
				_g.updateVolume();
			});
			this._hideBinding = flambe_System.hidden.get_changed().connect(function(hidden,_2) {
				if(hidden) {
					_g._wasPaused = _g.get_paused();
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,updateVolume: function() {
		this._clonedElement.volume = flambe_System.volume.get__() * this.volume.get__();
	}
	,__class__: flambe_platform_html__$HtmlSound_HtmlPlayback
	,__properties__: {get_complete:"get_complete",get_sound:"get_sound",set_paused:"set_paused",get_paused:"get_paused"}
};
var flambe_subsystem_StageSystem = function() { };
$hxClasses["flambe.subsystem.StageSystem"] = flambe_subsystem_StageSystem;
flambe_subsystem_StageSystem.__name__ = ["flambe","subsystem","StageSystem"];
flambe_subsystem_StageSystem.prototype = {
	__class__: flambe_subsystem_StageSystem
	,__properties__: {get_height:"get_height",get_width:"get_width"}
};
var flambe_platform_html_HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe_util_Signal0();
	this.scaleFactor = flambe_platform_html_HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe_Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js_Browser.get_window().addEventListener("orientationchange",function(_) {
			flambe_platform_html_HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js_Browser.get_window().addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe_util_Value(null);
	if(js_Browser.get_window().orientation != null) {
		js_Browser.get_window().addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe_util_Value(false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenchange",function(_1) {
		_g.updateFullscreen();
	},false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenerror",function(_2) {
		flambe_Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe_platform_html_HtmlStage;
flambe_platform_html_HtmlStage.__name__ = ["flambe","platform","html","HtmlStage"];
flambe_platform_html_HtmlStage.__interfaces__ = [flambe_subsystem_StageSystem];
flambe_platform_html_HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js_Browser.get_window().devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas;
	var _this = js_Browser.get_document();
	canvas = _this.createElement("canvas");
	var ctx = canvas.getContext("2d",null);
	var backingStorePixelRatio = flambe_platform_html_HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js_Browser.get_window().screen.width;
	var screenHeight = js_Browser.get_window().screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
};
flambe_platform_html_HtmlStage.prototype = {
	get_width: function() {
		return this._canvas.width;
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = Std["int"](scaledWidth);
		this._canvas.height = Std["int"](scaledHeight);
		this.resize.emit();
		return true;
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js_Browser.get_document().documentElement.style;
		htmlStyle.height = js_Browser.get_window().innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js_Browser.get_window().innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe_platform_html_HtmlUtil.callLater(function() {
			flambe_platform_html_HtmlUtil.hideMobileBrowser();
			flambe_platform_html_HtmlUtil.callLater(function() {
				htmlStyle.height = js_Browser.get_window().innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,onOrientationChange: function(_) {
		var value = flambe_platform_html_HtmlUtil.orientation(js_Browser.get_window().orientation);
		this.orientation.set__(value);
	}
	,updateFullscreen: function() {
		var state = flambe_platform_html_HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js_Browser.get_document()).value;
		this.fullscreen.set__(state == true);
	}
	,__class__: flambe_platform_html_HtmlStage
	,__properties__: {get_height:"get_height",get_width:"get_width"}
};
var flambe_platform_html_HtmlStorage = function(storage) {
	this._storage = storage;
};
$hxClasses["flambe.platform.html.HtmlStorage"] = flambe_platform_html_HtmlStorage;
flambe_platform_html_HtmlStorage.__name__ = ["flambe","platform","html","HtmlStorage"];
flambe_platform_html_HtmlStorage.__interfaces__ = [flambe_subsystem_StorageSystem];
flambe_platform_html_HtmlStorage.prototype = {
	set: function(key,value) {
		var encoded;
		try {
			var serializer = new haxe_Serializer();
			serializer.useCache = true;
			serializer.useEnumIndex = false;
			serializer.serialize(value);
			encoded = serializer.toString();
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			flambe_Log.warn("Storage serialization failed",["message",error]);
			return false;
		}
		try {
			this._storage.setItem("flambe:" + key,encoded);
		} catch( error1 ) {
			if (error1 instanceof js__$Boot_HaxeError) error1 = error1.val;
			flambe_Log.warn("localStorage.setItem failed",["message",error1.message]);
			return false;
		}
		return true;
	}
	,get: function(key,defaultValue) {
		var encoded = null;
		try {
			encoded = this._storage.getItem("flambe:" + key);
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			flambe_Log.warn("localStorage.getItem failed",["message",error.message]);
		}
		if(encoded != null) try {
			return haxe_Unserializer.run(encoded);
		} catch( error1 ) {
			if (error1 instanceof js__$Boot_HaxeError) error1 = error1.val;
			flambe_Log.warn("Storage unserialization failed",["message",error1]);
		}
		return defaultValue;
	}
	,clear: function() {
		try {
			this._storage.clear();
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			flambe_Log.warn("localStorage.clear failed",["message",error.message]);
		}
	}
	,__class__: flambe_platform_html_HtmlStorage
};
var flambe_platform_html_HtmlUtil = function() { };
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe_platform_html_HtmlUtil;
flambe_platform_html_HtmlUtil.__name__ = ["flambe","platform","html","HtmlUtil"];
flambe_platform_html_HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js_Browser.get_window().setTimeout(func,delay);
};
flambe_platform_html_HtmlUtil.hideMobileBrowser = function() {
	js_Browser.get_window().scrollTo(1,0);
};
flambe_platform_html_HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js_Browser.get_window();
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe_platform_html_HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js_Browser.get_window();
	var value = flambe_platform_html_HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
	return true;
};
flambe_platform_html_HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
};
flambe_platform_html_HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
};
flambe_platform_html_HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe_display_Orientation.Landscape;
	default:
		return flambe_display_Orientation.Portrait;
	}
};
flambe_platform_html_HtmlUtil.now = function() {
	return Date.now();
};
flambe_platform_html_HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas;
	var _this = js_Browser.get_document();
	canvas = _this.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
};
flambe_platform_html_HtmlUtil.createCanvas = function(source) {
	var canvas = flambe_platform_html_HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d",null);
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
};
flambe_platform_html_HtmlUtil.detectSlowDriver = function(gl) {
	var windows = js_Browser.get_navigator().platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js_Browser.get_window().chrome != null;
		if(chrome) {
			var _g = 0;
			var _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
};
flambe_platform_html_HtmlUtil.fixAndroidMath = function() {
	if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android 4") >= 0) {
		flambe_Log.warn("Monkey patching around Android sin/cos bug");
		var sin = Math.sin;
		var cos = Math.cos;
		Math.sin = function(x) {
			if(x == 0) return 0; else return sin(x);
		};
		Math.cos = function(x1) {
			if(x1 == 0) return 1; else return cos(x1);
		};
	}
};
var flambe_platform_html_WebAudioSound = function(buffer,id) {
	this.id = id;
	flambe_platform_BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe_platform_html_WebAudioSound;
flambe_platform_html_WebAudioSound.__name__ = ["flambe","platform","html","WebAudioSound"];
flambe_platform_html_WebAudioSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_WebAudioSound.__properties__ = {get_supported:"get_supported"}
flambe_platform_html_WebAudioSound.get_supported = function() {
	if(flambe_platform_html_WebAudioSound._detectSupport) {
		flambe_platform_html_WebAudioSound._detectSupport = false;
		var AudioContext = flambe_platform_html_HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe_platform_html_WebAudioSound.ctx = new AudioContext();
			flambe_platform_html_WebAudioSound.gain = flambe_platform_html_WebAudioSound.createGain();
			flambe_platform_html_WebAudioSound.gain.connect(flambe_platform_html_WebAudioSound.ctx.destination);
			flambe_System.volume.watch(function(volume,_) {
				flambe_platform_html_WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe_platform_html_WebAudioSound.ctx != null;
};
flambe_platform_html_WebAudioSound.createGain = function() {
	if(flambe_platform_html_WebAudioSound.ctx.createGain != null) return flambe_platform_html_WebAudioSound.ctx.createGain(); else return flambe_platform_html_WebAudioSound.ctx.createGainNode();
};
flambe_platform_html_WebAudioSound.start = function(node,time) {
	if(node.start != null) node.start(time); else node.noteOn(time);
};
flambe_platform_html_WebAudioSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebAudioSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed("play");
		return new flambe_platform_html__$WebAudioSound_WebAudioPlayback(this,volume,false);
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed("loop");
		return new flambe_platform_html__$WebAudioSound_WebAudioPlayback(this,volume,true);
	}
	,get_duration: function() {
		this.assertNotDisposed("get_duration");
		return this.buffer.duration;
	}
	,copyFrom: function(that) {
		this.buffer = that.buffer;
	}
	,onDisposed: function() {
		this.buffer = null;
	}
	,__class__: flambe_platform_html_WebAudioSound
	,__properties__: $extend(flambe_platform_BasicAsset.prototype.__properties__,{get_duration:"get_duration"})
});
var flambe_platform_html__$WebAudioSound_WebAudioPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._head = flambe_platform_html_WebAudioSound.gain;
	this._complete = new flambe_util_Value(false);
	this._sourceNode = flambe_platform_html_WebAudioSound.ctx.createBufferSource();
	this._sourceNode.buffer = sound.buffer;
	this._sourceNode.loop = loop;
	this._sourceNode.onended = function() {
		_g._complete.set__(true);
	};
	flambe_platform_html_WebAudioSound.start(this._sourceNode,0);
	this.playAudio();
	this.volume = new flambe_animation_AnimatedFloat(volume,function(v,_) {
		_g.setVolume(v);
	});
	if(volume != 1) this.setVolume(volume);
	if(flambe_System.hidden.get__()) this.set_paused(true);
};
$hxClasses["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = flambe_platform_html__$WebAudioSound_WebAudioPlayback;
flambe_platform_html__$WebAudioSound_WebAudioPlayback.__name__ = ["flambe","platform","html","_WebAudioSound","WebAudioPlayback"];
flambe_platform_html__$WebAudioSound_WebAudioPlayback.__interfaces__ = [flambe_platform_Tickable,flambe_sound_Playback];
flambe_platform_html__$WebAudioSound_WebAudioPlayback.prototype = {
	get_sound: function() {
		return this._sound;
	}
	,get_paused: function() {
		return this._pausedAt >= 0;
	}
	,set_paused: function(paused) {
		if(paused != this.get_paused()) {
			if(paused) {
				this._sourceNode.disconnect();
				this._pausedAt = this.get_position();
			} else this.playAudio();
		}
		return paused;
	}
	,get_complete: function() {
		return this._complete;
	}
	,get_position: function() {
		if(this._complete.get__()) return this._sound.get_duration(); else if(this.get_paused()) return this._pausedAt; else {
			var elapsed = flambe_platform_html_WebAudioSound.ctx.currentTime - this._startedAt;
			return elapsed % this._sound.get_duration();
		}
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this._sourceNode.playbackState == 3) this._complete.set__(true);
		if(this._complete.get__() || this.get_paused()) {
			this._tickableAdded = false;
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,dispose: function() {
		this.set_paused(true);
		this._complete.set__(true);
	}
	,setVolume: function(volume) {
		if(this._gainNode == null) {
			this._gainNode = flambe_platform_html_WebAudioSound.createGain();
			this.insertNode(this._gainNode);
		}
		this._gainNode.gain.value = volume;
	}
	,insertNode: function(head) {
		if(!this.get_paused()) {
			this._sourceNode.disconnect();
			this._sourceNode.connect(head);
		}
		head.connect(this._head);
		this._head = head;
	}
	,playAudio: function() {
		var _g = this;
		this._sourceNode.connect(this._head);
		this._startedAt = flambe_platform_html_WebAudioSound.ctx.currentTime;
		this._pausedAt = -1;
		if(!this._tickableAdded) {
			flambe_platform_html_HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._hideBinding = flambe_System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g.get_paused();
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,__class__: flambe_platform_html__$WebAudioSound_WebAudioPlayback
	,__properties__: {get_position:"get_position",get_complete:"get_complete",get_sound:"get_sound",set_paused:"set_paused",get_paused:"get_paused"}
};
var flambe_platform_html_WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,0);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawTextureShader = new flambe_platform_shader_DrawTextureGL(gl);
	this._drawPatternShader = new flambe_platform_shader_DrawPatternGL(gl);
	this._fillRectShader = new flambe_platform_shader_FillRectGL(gl);
	this.resize(16);
};
$hxClasses["flambe.platform.html.WebGLBatcher"] = flambe_platform_html_WebGLBatcher;
flambe_platform_html_WebGLBatcher.__name__ = ["flambe","platform","html","WebGLBatcher"];
flambe_platform_html_WebGLBatcher.prototype = {
	resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,willRender: function() {
	}
	,didRender: function() {
		this.flush();
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,deleteTexture: function(texture) {
		if(this._lastTexture != null && this._lastTexture.root == texture) {
			this.flush();
			this._lastTexture = null;
			this._currentTexture = null;
		}
		this._gl.deleteTexture(texture.nativeTexture);
	}
	,bindFramebuffer: function(texture) {
		if(texture != this._lastRenderTarget) {
			this.flush();
			this.bindRenderTarget(texture);
		}
	}
	,deleteFramebuffer: function(texture) {
		if(texture == this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = null;
			this._currentRenderTarget = null;
		}
		this._gl.deleteFramebuffer(texture.framebuffer);
	}
	,prepareDrawTexture: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawTextureShader);
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				if(scissor != null) this._lastScissor = scissor.clone(this._lastScissor); else this._lastScissor = null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this._lastBlendMode;
			switch(Type.enumIndex(_g)) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(774,771);
				break;
			case 3:
				this._gl.blendFunc(1,769);
				break;
			case 4:
				this._gl.blendFunc(0,770);
				break;
			case 5:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(Std["int"](this._lastScissor.x),Std["int"](this._lastScissor.y),Std["int"](this._lastScissor.width),Std["int"](this._lastScissor.height));
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.root.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) {
			var texture = this._lastTexture;
			var root = texture.root;
			this._drawPatternShader.setRegion(texture.rootX / root.width,texture.rootY / root.height,texture.get_width() / root.width,texture.get_height() / root.height);
		}
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6 + 0] = ii * 4 + 0;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4 + 0;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture.width,texture.height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,__class__: flambe_platform_html_WebGLBatcher
};
var flambe_platform_html_WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe_platform_html_WebGLGraphics._scratchQuadArray == null) flambe_platform_html_WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html.WebGLGraphics"] = flambe_platform_html_WebGLGraphics;
flambe_platform_html_WebGLGraphics.__name__ = ["flambe","platform","html","WebGLGraphics"];
flambe_platform_html_WebGLGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_WebGLGraphics.prototype = {
	save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe_platform_html__$WebGLGraphics_DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		if(current.scissor != null) state.scissor = current.scissor.clone(state.scissor); else state.scissor = null;
		this._stateList = state;
	}
	,translate: function(x,y) {
		var matrix = this.getTopState().matrix;
		matrix.m02 += matrix.m00 * x + matrix.m01 * y;
		matrix.m12 += matrix.m10 * x + matrix.m11 * y;
	}
	,scale: function(x,y) {
		var matrix = this.getTopState().matrix;
		matrix.m00 *= x;
		matrix.m10 *= x;
		matrix.m01 *= y;
		matrix.m11 *= y;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this.getTopState();
		flambe_platform_html_WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe_math_Matrix.multiply(state.matrix,flambe_platform_html_WebGLGraphics._scratchMatrix,state.matrix);
	}
	,restore: function() {
		flambe_util_Assert.that(this._stateList.prev != null,"Can't restore without a previous save");
		this._stateList = this._stateList.prev;
	}
	,drawTexture: function(texture,x,y) {
		this.drawSubTexture(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this.getTopState();
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var rootWidth = root.width;
		var rootHeight = root.height;
		var u1 = (texture1.rootX + sourceX) / rootWidth;
		var v1 = (texture1.rootY + sourceY) / rootHeight;
		var u2 = u1 + sourceW / rootWidth;
		var v2 = v1 + sourceH / rootHeight;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawTexture(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this.getTopState();
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,multiplyAlpha: function(factor) {
		this.getTopState().alpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		this.getTopState().blendMode = blendMode;
	}
	,applyScissor: function(x,y,width,height) {
		var state = this.getTopState();
		var rect = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,willRender: function() {
		this._batcher.willRender();
	}
	,didRender: function() {
		this._batcher.didRender();
	}
	,onResize: function(width,height) {
		this._stateList = new flambe_platform_html__$WebGLGraphics_DrawingState();
		var flip;
		if(this._renderTarget != null) flip = -1; else flip = 1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe_math_Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,getTopState: function() {
		return this._stateList;
	}
	,transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this.getTopState().matrix.transformArray(pos,8,pos);
		return pos;
	}
	,__class__: flambe_platform_html_WebGLGraphics
};
var flambe_platform_html__$WebGLGraphics_DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe_math_Matrix();
	this.alpha = 1;
	this.blendMode = flambe_display_BlendMode.Normal;
};
$hxClasses["flambe.platform.html._WebGLGraphics.DrawingState"] = flambe_platform_html__$WebGLGraphics_DrawingState;
flambe_platform_html__$WebGLGraphics_DrawingState.__name__ = ["flambe","platform","html","_WebGLGraphics","DrawingState"];
flambe_platform_html__$WebGLGraphics_DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe_math_FMath.max(this.scissor.x,x);
			var y1 = flambe_math_FMath.max(this.scissor.y,y);
			var x2 = flambe_math_FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe_math_FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe_math_Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe_platform_html__$WebGLGraphics_DrawingState
};
var flambe_platform_html_WebGLRenderer = function(stage,gl) {
	var _g = this;
	this._hasGPU = new flambe_util_Value(true);
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		flambe_Log.warn("WebGL context lost");
		_g._hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event1) {
		flambe_Log.warn("WebGL context restored");
		_g.init();
		_g._hasGPU.set__(true);
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
$hxClasses["flambe.platform.html.WebGLRenderer"] = flambe_platform_html_WebGLRenderer;
flambe_platform_html_WebGLRenderer.__name__ = ["flambe","platform","html","WebGLRenderer"];
flambe_platform_html_WebGLRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_WebGLRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.WebGL;
	}
	,createTextureFromImage: function(image) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe_platform_html_WebGLTextureRoot(this,image.width,image.height);
		root.uploadImageData(image);
		return root.createTexture(image.width,image.height);
	}
	,createTexture: function(width,height) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe_platform_html_WebGLTextureRoot(this,width,height);
		root.clear();
		return root.createTexture(width,height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		flambe_util_Assert.fail();
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,onResize: function() {
		var width = this.gl.canvas.width;
		var height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,init: function() {
		this.batcher = new flambe_platform_html_WebGLBatcher(this.gl);
		this.graphics = new flambe_platform_html_WebGLGraphics(this.batcher,null);
		this.onResize();
	}
	,__class__: flambe_platform_html_WebGLRenderer
	,__properties__: {get_type:"get_type"}
};
var flambe_platform_html_WebGLTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.WebGLTexture"] = flambe_platform_html_WebGLTexture;
flambe_platform_html_WebGLTexture.__name__ = ["flambe","platform","html","WebGLTexture"];
flambe_platform_html_WebGLTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_WebGLTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_WebGLTexture
});
var flambe_platform_html_WebGLTextureRoot = function(renderer,width,height) {
	this._graphics = null;
	this.framebuffer = null;
	flambe_platform_BasicAsset.call(this);
	this._renderer = renderer;
	this.width = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(width));
	this.height = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(height));
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9729);
};
$hxClasses["flambe.platform.html.WebGLTextureRoot"] = flambe_platform_html_WebGLTextureRoot;
flambe_platform_html_WebGLTextureRoot.__name__ = ["flambe","platform","html","WebGLTextureRoot"];
flambe_platform_html_WebGLTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_WebGLTextureRoot.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d",null);
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
};
flambe_platform_html_WebGLTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebGLTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_WebGLTexture(this,width,height);
	}
	,uploadImageData: function(image) {
		this.assertNotDisposed();
		if(this.width != image.width || this.height != image.height) {
			var resized = flambe_platform_html_HtmlUtil.createEmptyCanvas(this.width,this.height);
			resized.getContext("2d",null).drawImage(image,0,0);
			flambe_platform_html_WebGLTextureRoot.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,clear: function() {
		this.assertNotDisposed();
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,this.width,this.height,0,6408,5121,null);
	}
	,getGraphics: function() {
		this.assertNotDisposed();
		if(this._graphics == null) {
			this._graphics = new flambe_platform_html_WebGLGraphics(this._renderer.batcher,this);
			this._graphics.onResize(this.width,this.height);
			var gl = this._renderer.gl;
			this.framebuffer = gl.createFramebuffer();
			this._renderer.batcher.bindFramebuffer(this);
			gl.framebufferTexture2D(36160,36064,3553,this.nativeTexture,0);
		}
		return this._graphics;
	}
	,copyFrom: function(that) {
		this.nativeTexture = that.nativeTexture;
		this.framebuffer = that.framebuffer;
		this.width = that.width;
		this.height = that.height;
		this._graphics = that._graphics;
	}
	,onDisposed: function() {
		var batcher = this._renderer.batcher;
		batcher.deleteTexture(this);
		if(this.framebuffer != null) batcher.deleteFramebuffer(this);
		this.nativeTexture = null;
		this.framebuffer = null;
		this._graphics = null;
	}
	,__class__: flambe_platform_html_WebGLTextureRoot
});
var flambe_platform_shader_ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
	if(!gl.getProgramParameter(this._program,35714)) flambe_Log.error("Error linking shader program",["log",gl.getProgramInfoLog(this._program)]);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe_platform_shader_ShaderGL;
flambe_platform_shader_ShaderGL.__name__ = ["flambe","platform","shader","ShaderGL"];
flambe_platform_shader_ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,35713)) {
		var typeName;
		if(type == 35633) typeName = "vertex"; else typeName = "fragment";
		flambe_Log.error("Error compiling " + typeName + " shader",["log",gl.getShaderInfoLog(shader)]);
	}
	return shader;
};
flambe_platform_shader_ShaderGL.prototype = {
	useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,prepare: function() {
		flambe_util_Assert.fail("abstract");
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		flambe_util_Assert.that(loc >= 0,"Missing attribute",["name",name]);
		return loc;
	}
	,getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		flambe_util_Assert.that(loc != null,"Missing uniform",["name",name]);
		return loc;
	}
	,__class__: flambe_platform_shader_ShaderGL
};
var flambe_platform_shader_DrawPatternGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec4 u_region;","void main (void) {","gl_FragColor = texture2D(u_texture, u_region.xy + mod(v_uv, u_region.zw)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_region = this.getUniformLocation("u_region");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawPatternGL"] = flambe_platform_shader_DrawPatternGL;
flambe_platform_shader_DrawPatternGL.__name__ = ["flambe","platform","shader","DrawPatternGL"];
flambe_platform_shader_DrawPatternGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawPatternGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,setRegion: function(x,y,width,height) {
		this._gl.uniform4f(this.u_region,x,y,width,height);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawPatternGL
});
var flambe_platform_shader_DrawTextureGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawTextureGL"] = flambe_platform_shader_DrawTextureGL;
flambe_platform_shader_DrawTextureGL.__name__ = ["flambe","platform","shader","DrawTextureGL"];
flambe_platform_shader_DrawTextureGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawTextureGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawTextureGL
});
var flambe_platform_shader_FillRectGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
$hxClasses["flambe.platform.shader.FillRectGL"] = flambe_platform_shader_FillRectGL;
flambe_platform_shader_FillRectGL.__name__ = ["flambe","platform","shader","FillRectGL"];
flambe_platform_shader_FillRectGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_FillRectGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_FillRectGL
});
var flambe_scene_Director = function() {
	this._transitor = null;
	flambe_Component.call(this);
	this.scenes = [];
	this.occludedScenes = [];
	this._root = new flambe_Entity();
};
$hxClasses["flambe.scene.Director"] = flambe_scene_Director;
flambe_scene_Director.__name__ = ["flambe","scene","Director"];
flambe_scene_Director.__super__ = flambe_Component;
flambe_scene_Director.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Director_10";
	}
	,pushScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) this.playTransition(oldTop,scene,transition,function() {
			_g.hide(oldTop);
		}); else {
			this.add(scene);
			this.invalidateVisibility();
		}
	}
	,popScene: function(transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			this.scenes.pop();
			var newTop = this.get_topScene();
			if(newTop != null) this.playTransition(oldTop,newTop,transition,function() {
				_g.hideAndDispose(oldTop);
			}); else {
				this.hideAndDispose(oldTop);
				this.invalidateVisibility();
			}
		}
	}
	,unwindToScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			if(oldTop == scene) return;
			this.scenes.pop();
			while(this.scenes.length > 0 && this.scenes[this.scenes.length - 1] != scene) this.scenes.pop().dispose();
			this.playTransition(oldTop,scene,transition,function() {
				_g.hideAndDispose(oldTop);
			});
		} else this.pushScene(scene,transition);
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		if(ll > 0) return this.scenes[ll - 1]; else return null;
	}
	,get_transitioning: function() {
		return this._transitor != null;
	}
	,add: function(scene) {
		var oldTop = this.get_topScene();
		if(oldTop != null) this._root.removeChild(oldTop);
		HxOverrides.remove(this.scenes,scene);
		this.scenes.push(scene);
		this._root.addChild(scene);
	}
	,hide: function(scene) {
		var events;
		var component = scene.getComponent("Scene_4");
		events = component;
		if(events != null) events.hidden.emit();
	}
	,hideAndDispose: function(scene) {
		this.hide(scene);
		scene.dispose();
	}
	,show: function(scene) {
		var events;
		var component = scene.getComponent("Scene_4");
		events = component;
		if(events != null) events.shown.emit();
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene1 = this.scenes[--ii];
			var comp;
			var component = scene1.getComponent("Scene_4");
			comp = component;
			if(comp == null || comp.opaque) break;
		}
		if(this.scenes.length > 0) this.occludedScenes = this.scenes.slice(ii,this.scenes.length - 1); else this.occludedScenes = [];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,playTransition: function(from,to,transition,onComplete) {
		this.completeTransition();
		this.add(to);
		if(transition != null) {
			this.occludedScenes.push(from);
			this._transitor = new flambe_scene__$Director_Transitor(from,to,transition,onComplete);
			this._transitor.init(this);
		} else {
			onComplete();
			this.invalidateVisibility();
		}
	}
	,__class__: flambe_scene_Director
	,__properties__: $extend(flambe_Component.prototype.__properties__,{get_transitioning:"get_transitioning",get_topScene:"get_topScene"})
});
var flambe_scene__$Director_Transitor = function(from,to,transition,onComplete) {
	this._from = from;
	this._to = to;
	this._transition = transition;
	this._onComplete = onComplete;
};
$hxClasses["flambe.scene._Director.Transitor"] = flambe_scene__$Director_Transitor;
flambe_scene__$Director_Transitor.__name__ = ["flambe","scene","_Director","Transitor"];
flambe_scene__$Director_Transitor.prototype = {
	init: function(director) {
		this._transition.init(director,this._from,this._to);
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,__class__: flambe_scene__$Director_Transitor
};
var flambe_scene_Transition = function() { };
$hxClasses["flambe.scene.Transition"] = flambe_scene_Transition;
flambe_scene_Transition.__name__ = ["flambe","scene","Transition"];
flambe_scene_Transition.prototype = {
	init: function(director,from,to) {
		this._director = director;
		this._from = from;
		this._to = to;
	}
	,update: function(dt) {
		return true;
	}
	,complete: function() {
	}
	,__class__: flambe_scene_Transition
};
var flambe_scene_TweenTransition = function(duration,ease) {
	this._duration = duration;
	if(ease != null) this._ease = ease; else this._ease = flambe_animation_Ease.linear;
};
$hxClasses["flambe.scene.TweenTransition"] = flambe_scene_TweenTransition;
flambe_scene_TweenTransition.__name__ = ["flambe","scene","TweenTransition"];
flambe_scene_TweenTransition.__super__ = flambe_scene_Transition;
flambe_scene_TweenTransition.prototype = $extend(flambe_scene_Transition.prototype,{
	init: function(director,from,to) {
		flambe_scene_Transition.prototype.init.call(this,director,from,to);
		this._elapsed = 0;
	}
	,update: function(dt) {
		this._elapsed += dt;
		return this._elapsed >= this._duration;
	}
	,interp: function(from,to) {
		return from + (to - from) * this._ease(this._elapsed / this._duration);
	}
	,__class__: flambe_scene_TweenTransition
});
var flambe_scene_FadeTransition = function(duration,ease) {
	flambe_scene_TweenTransition.call(this,duration,ease);
};
$hxClasses["flambe.scene.FadeTransition"] = flambe_scene_FadeTransition;
flambe_scene_FadeTransition.__name__ = ["flambe","scene","FadeTransition"];
flambe_scene_FadeTransition.__super__ = flambe_scene_TweenTransition;
flambe_scene_FadeTransition.prototype = $extend(flambe_scene_TweenTransition.prototype,{
	init: function(director,from,to) {
		flambe_scene_TweenTransition.prototype.init.call(this,director,from,to);
		var sprite;
		var component = this._to.getComponent("Sprite_3");
		sprite = component;
		if(sprite == null) this._to.add(sprite = new flambe_display_Sprite());
		sprite.alpha.set__(0);
	}
	,update: function(dt) {
		var done = flambe_scene_TweenTransition.prototype.update.call(this,dt);
		((function($this) {
			var $r;
			var component = $this._to.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.set__(this.interp(0,1));
		return done;
	}
	,complete: function() {
		((function($this) {
			var $r;
			var component = $this._to.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.set__(1);
	}
	,__class__: flambe_scene_FadeTransition
});
var flambe_script_Action = function() { };
$hxClasses["flambe.script.Action"] = flambe_script_Action;
flambe_script_Action.__name__ = ["flambe","script","Action"];
flambe_script_Action.prototype = {
	__class__: flambe_script_Action
};
var flambe_script_AnimateBy = function(value,by,seconds,easing) {
	this._value = value;
	this._by = by;
	this._seconds = seconds;
	this._easing = easing;
};
$hxClasses["flambe.script.AnimateBy"] = flambe_script_AnimateBy;
flambe_script_AnimateBy.__name__ = ["flambe","script","AnimateBy"];
flambe_script_AnimateBy.__interfaces__ = [flambe_script_Action];
flambe_script_AnimateBy.prototype = {
	update: function(dt,actor) {
		if(this._tween == null) {
			this._tween = new flambe_animation_Tween(this._value.get__(),this._value.get__() + this._by,this._seconds,this._easing);
			this._value.set_behavior(this._tween);
			this._value.update(dt);
		}
		if(this._value.get_behavior() != this._tween) {
			var overtime = this._tween.elapsed - this._seconds;
			this._tween = null;
			if(overtime > 0) return Math.max(0,dt - overtime); else return 0;
		}
		return -1;
	}
	,__class__: flambe_script_AnimateBy
};
var flambe_script_AnimateTo = function(value,to,seconds,easing) {
	this._value = value;
	this._to = to;
	this._seconds = seconds;
	this._easing = easing;
};
$hxClasses["flambe.script.AnimateTo"] = flambe_script_AnimateTo;
flambe_script_AnimateTo.__name__ = ["flambe","script","AnimateTo"];
flambe_script_AnimateTo.__interfaces__ = [flambe_script_Action];
flambe_script_AnimateTo.prototype = {
	update: function(dt,actor) {
		if(this._tween == null) {
			this._tween = new flambe_animation_Tween(this._value.get__(),this._to,this._seconds,this._easing);
			this._value.set_behavior(this._tween);
			this._value.update(dt);
		}
		if(this._value.get_behavior() != this._tween) {
			var overtime = this._tween.elapsed - this._seconds;
			this._tween = null;
			if(overtime > 0) return Math.max(0,dt - overtime); else return 0;
		}
		return -1;
	}
	,__class__: flambe_script_AnimateTo
};
var flambe_script_CallFunction = function(fn) {
	this._fn = fn;
};
$hxClasses["flambe.script.CallFunction"] = flambe_script_CallFunction;
flambe_script_CallFunction.__name__ = ["flambe","script","CallFunction"];
flambe_script_CallFunction.__interfaces__ = [flambe_script_Action];
flambe_script_CallFunction.prototype = {
	update: function(dt,actor) {
		this._fn();
		return 0;
	}
	,__class__: flambe_script_CallFunction
};
var flambe_script_Delay = function(seconds) {
	this._duration = seconds;
	this._elapsed = 0;
};
$hxClasses["flambe.script.Delay"] = flambe_script_Delay;
flambe_script_Delay.__name__ = ["flambe","script","Delay"];
flambe_script_Delay.__interfaces__ = [flambe_script_Action];
flambe_script_Delay.prototype = {
	update: function(dt,actor) {
		this._elapsed += dt;
		if(this._elapsed >= this._duration) {
			var overtime = this._elapsed - this._duration;
			this._elapsed = 0;
			return dt - overtime;
		}
		return -1;
	}
	,__class__: flambe_script_Delay
};
var flambe_script_Parallel = function(actions) {
	this._completedActions = [];
	if(actions != null) this._runningActions = actions.slice(); else this._runningActions = [];
};
$hxClasses["flambe.script.Parallel"] = flambe_script_Parallel;
flambe_script_Parallel.__name__ = ["flambe","script","Parallel"];
flambe_script_Parallel.__interfaces__ = [flambe_script_Action];
flambe_script_Parallel.prototype = {
	add: function(action) {
		this._runningActions.push(action);
	}
	,update: function(dt,actor) {
		var done = true;
		var maxSpent = 0.0;
		var _g1 = 0;
		var _g = this._runningActions.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var action = this._runningActions[ii];
			if(action != null) {
				var spent = action.update(dt,actor);
				if(spent >= 0) {
					this._runningActions[ii] = null;
					this._completedActions.push(action);
					if(spent > maxSpent) maxSpent = spent;
				} else done = false;
			}
		}
		if(done) {
			this._runningActions = this._completedActions;
			this._completedActions = [];
			return maxSpent;
		}
		return -1;
	}
	,__class__: flambe_script_Parallel
};
var flambe_script_Repeat = function(action,count) {
	if(count == null) count = -1;
	this._action = action;
	this._count = count;
	this._remaining = count;
};
$hxClasses["flambe.script.Repeat"] = flambe_script_Repeat;
flambe_script_Repeat.__name__ = ["flambe","script","Repeat"];
flambe_script_Repeat.__interfaces__ = [flambe_script_Action];
flambe_script_Repeat.prototype = {
	update: function(dt,actor) {
		if(this._count == 0) return 0;
		var spent = this._action.update(dt,actor);
		if(this._count > 0 && spent >= 0 && --this._remaining == 0) {
			this._remaining = this._count;
			return spent;
		}
		return -1;
	}
	,__class__: flambe_script_Repeat
};
var flambe_script_Script = function() {
	flambe_Component.call(this);
	this.stopAll();
};
$hxClasses["flambe.script.Script"] = flambe_script_Script;
flambe_script_Script.__name__ = ["flambe","script","Script"];
flambe_script_Script.__super__ = flambe_Component;
flambe_script_Script.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Script_5";
	}
	,run: function(action) {
		var handle = new flambe_script__$Script_Handle(action);
		this._handles.push(handle);
		return handle;
	}
	,stopAll: function() {
		this._handles = [];
	}
	,onUpdate: function(dt) {
		var ii = 0;
		while(ii < this._handles.length) {
			var handle = this._handles[ii];
			if(handle.removed || handle.action.update(dt,this.owner) >= 0) this._handles.splice(ii,1); else ++ii;
		}
	}
	,__class__: flambe_script_Script
});
var flambe_script__$Script_Handle = function(action) {
	this.removed = false;
	this.action = action;
};
$hxClasses["flambe.script._Script.Handle"] = flambe_script__$Script_Handle;
flambe_script__$Script_Handle.__name__ = ["flambe","script","_Script","Handle"];
flambe_script__$Script_Handle.__interfaces__ = [flambe_util_Disposable];
flambe_script__$Script_Handle.prototype = {
	dispose: function() {
		this.removed = true;
		this.action = null;
	}
	,__class__: flambe_script__$Script_Handle
};
var flambe_script_Sequence = function(actions) {
	this._idx = 0;
	if(actions != null) this._runningActions = actions.slice(); else this._runningActions = [];
};
$hxClasses["flambe.script.Sequence"] = flambe_script_Sequence;
flambe_script_Sequence.__name__ = ["flambe","script","Sequence"];
flambe_script_Sequence.__interfaces__ = [flambe_script_Action];
flambe_script_Sequence.prototype = {
	add: function(action) {
		this._runningActions.push(action);
		return this;
	}
	,removeAll: function() {
		this._idx = 0;
		this._runningActions = [];
	}
	,update: function(dt,actor) {
		var total = 0.0;
		while(true) {
			var action = this._runningActions[this._idx];
			if(action != null) {
				var spent = action.update(dt - total,actor);
				if(spent >= 0) total += spent; else return -1;
			}
			++this._idx;
			if(this._idx >= this._runningActions.length) {
				this._idx = 0;
				break;
			} else if(total > dt) return -1;
		}
		return total;
	}
	,__class__: flambe_script_Sequence
};
var flambe_subsystem_RendererType = $hxClasses["flambe.subsystem.RendererType"] = { __ename__ : ["flambe","subsystem","RendererType"], __constructs__ : ["Stage3D","WebGL","Canvas"] };
flambe_subsystem_RendererType.Stage3D = ["Stage3D",0];
flambe_subsystem_RendererType.Stage3D.toString = $estr;
flambe_subsystem_RendererType.Stage3D.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.WebGL = ["WebGL",1];
flambe_subsystem_RendererType.WebGL.toString = $estr;
flambe_subsystem_RendererType.WebGL.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.Canvas = ["Canvas",2];
flambe_subsystem_RendererType.Canvas.toString = $estr;
flambe_subsystem_RendererType.Canvas.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.__empty_constructs__ = [flambe_subsystem_RendererType.Stage3D,flambe_subsystem_RendererType.WebGL,flambe_subsystem_RendererType.Canvas];
var flambe_swf_Symbol = function() { };
$hxClasses["flambe.swf.Symbol"] = flambe_swf_Symbol;
flambe_swf_Symbol.__name__ = ["flambe","swf","Symbol"];
flambe_swf_Symbol.prototype = {
	__class__: flambe_swf_Symbol
};
var flambe_swf_BitmapSymbol = function(json,atlas) {
	this._name = json.symbol;
	var rect = json.rect;
	this.texture = atlas.subTexture(rect[0],rect[1],rect[2],rect[3]);
	var origin = json.origin;
	if(origin != null) {
		this.anchorX = origin[0];
		this.anchorY = origin[1];
	} else {
		this.anchorX = 0;
		this.anchorY = 0;
	}
};
$hxClasses["flambe.swf.BitmapSymbol"] = flambe_swf_BitmapSymbol;
flambe_swf_BitmapSymbol.__name__ = ["flambe","swf","BitmapSymbol"];
flambe_swf_BitmapSymbol.__interfaces__ = [flambe_swf_Symbol];
flambe_swf_BitmapSymbol.prototype = {
	createSprite: function() {
		var sprite = new flambe_display_ImageSprite(this.texture);
		sprite.setAnchor(this.anchorX,this.anchorY);
		return sprite;
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: flambe_swf_BitmapSymbol
	,__properties__: {get_name:"get_name"}
};
var flambe_swf_Library = function(pack,baseDir) {
	this._file = pack.getFile(baseDir + "/library.json");
	var json = haxe_Json.parse(this._file.toString());
	this._symbols = new haxe_ds_StringMap();
	this.frameRate = json.frameRate;
	var movies = [];
	var _g = 0;
	var _g1 = json.movies;
	while(_g < _g1.length) {
		var movieObject = _g1[_g];
		++_g;
		var movie = new flambe_swf_MovieSymbol(this,movieObject);
		movies.push(movie);
		var key = movie.get_name();
		this._symbols.set(key,movie);
	}
	var groups = json.textureGroups;
	if(groups[0].scaleFactor != 1 || groups.length > 1) flambe_Log.warn("Flambe doesn't support Flump's Additional Scale Factors. " + "Use Base Scales and load from different asset packs instead.");
	var atlases = groups[0].atlases;
	var _g2 = 0;
	while(_g2 < atlases.length) {
		var atlasObject = atlases[_g2];
		++_g2;
		var atlas = pack.getTexture(baseDir + "/" + flambe_util_Strings.removeFileExtension(atlasObject.file));
		var _g11 = 0;
		var _g21 = atlasObject.textures;
		while(_g11 < _g21.length) {
			var textureObject = _g21[_g11];
			++_g11;
			var bitmap = new flambe_swf_BitmapSymbol(textureObject,atlas);
			var key1 = bitmap.get_name();
			this._symbols.set(key1,bitmap);
		}
	}
	var _g3 = 0;
	while(_g3 < movies.length) {
		var movie1 = movies[_g3];
		++_g3;
		var _g12 = 0;
		var _g22 = movie1.layers;
		while(_g12 < _g22.length) {
			var layer = _g22[_g12];
			++_g12;
			var keyframes = layer.keyframes;
			var ll = keyframes.length;
			var _g31 = 0;
			while(_g31 < ll) {
				var ii = _g31++;
				var kf = keyframes[ii];
				if(kf.symbolName != null) {
					var symbol = this._symbols.get(kf.symbolName);
					flambe_util_Assert.that(symbol != null);
					kf.setSymbol(symbol);
				}
				if(kf.tweened && kf.duration == 1 && ii + 1 < ll) {
					var nextKf = keyframes[ii + 1];
					if(!nextKf.visible || nextKf.symbolName == null) kf.setVisible(false);
				}
			}
		}
	}
};
$hxClasses["flambe.swf.Library"] = flambe_swf_Library;
flambe_swf_Library.__name__ = ["flambe","swf","Library"];
flambe_swf_Library.prototype = {
	createSprite: function(symbolName,required) {
		if(required == null) required = true;
		var symbol = this._symbols.get(symbolName);
		if(symbol == null) {
			if(required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing symbol",["name",symbolName]));
			return null;
		}
		return symbol.createSprite();
	}
	,createMovie: function(symbolName,required) {
		if(required == null) required = true;
		return this.createSprite(symbolName,required);
	}
	,__class__: flambe_swf_Library
};
var flambe_swf_MoviePlayer = function(lib) {
	this._loopingSprite = null;
	this._oneshotSprite = null;
	flambe_Component.call(this);
	this._lib = lib;
	this._root = new flambe_Entity();
	this.movie = new flambe_util_Value(null);
	this.setCache(true);
};
$hxClasses["flambe.swf.MoviePlayer"] = flambe_swf_MoviePlayer;
flambe_swf_MoviePlayer.__name__ = ["flambe","swf","MoviePlayer"];
flambe_swf_MoviePlayer.__super__ = flambe_Component;
flambe_swf_MoviePlayer.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "MoviePlayer_17";
	}
	,setCache: function(cache) {
		if(cache) this._cache = new haxe_ds_StringMap(); else this._cache = null;
		return this;
	}
	,play: function(name,restart) {
		if(restart == null) restart = true;
		flambe_util_Assert.that(this._loopingSprite != null,"A loop must be started before the first call to play()");
		if(restart || this._oneshotSprite == null || this._oneshotSprite.symbol.get_name() != name) this._oneshotSprite = this.playFromCache(name);
		return this;
	}
	,loop: function(name,restart) {
		if(restart == null) restart = true;
		if(restart || this._loopingSprite == null || this._loopingSprite.symbol.get_name() != name) {
			this._oneshotSprite = null;
			this._loopingSprite = this.playFromCache(name);
		}
		return this;
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,onRemoved: function() {
		this._root.dispose();
		this._oneshotSprite = this._loopingSprite = null;
		this.movie.set__(null);
	}
	,onUpdate: function(dt) {
		if(this._oneshotSprite != null && this._oneshotSprite.get_position() + dt > this._oneshotSprite.symbol.duration) {
			this._oneshotSprite = null;
			this.setCurrent(this._loopingSprite);
		}
	}
	,playFromCache: function(name) {
		var sprite;
		if(this._cache != null) {
			sprite = this._cache.get(name);
			if(sprite != null) sprite.set_position(0); else {
				sprite = this.createMovie(name);
				this._cache.set(name,sprite);
			}
		} else sprite = this.createMovie(name);
		return this.setCurrent(sprite);
	}
	,createMovie: function(name) {
		var sprite = this._lib.createMovie(name);
		if(this._decorator != null) this._decorator(sprite);
		return sprite;
	}
	,setCurrent: function(current) {
		this._root.add(current);
		return this.movie.set__(current);
	}
	,__class__: flambe_swf_MoviePlayer
});
var flambe_swf_MovieSprite = function(symbol) {
	this._looped = null;
	flambe_display_Sprite.call(this);
	this.symbol = symbol;
	this.speed = new flambe_animation_AnimatedFloat(1);
	this._animators = flambe_util_Arrays.create(symbol.layers.length);
	var _g1 = 0;
	var _g = this._animators.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = symbol.layers[ii];
		this._animators[ii] = new flambe_swf__$MovieSprite_LayerAnimator(layer);
	}
	this._frame = 0;
	this._position = 0;
	this["goto"](1);
};
$hxClasses["flambe.swf.MovieSprite"] = flambe_swf_MovieSprite;
flambe_swf_MovieSprite.__name__ = ["flambe","swf","MovieSprite"];
flambe_swf_MovieSprite.__super__ = flambe_display_Sprite;
flambe_swf_MovieSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	getLayer: function(name,required) {
		if(required == null) required = true;
		var _g = 0;
		var _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			if(animator.layer.name == name) return animator.content;
		}
		if(required) throw new js__$Boot_HaxeError(flambe_util_Strings.withFields("Missing layer",["name",name]));
		return null;
	}
	,onAdded: function() {
		flambe_display_Sprite.prototype.onAdded.call(this);
		var _g = 0;
		var _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.addChild(animator.content);
		}
	}
	,onRemoved: function() {
		flambe_display_Sprite.prototype.onRemoved.call(this);
		var _g = 0;
		var _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.removeChild(animator.content);
		}
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.speed.update(dt);
		var _g = this._flags & (256 | 512);
		switch(_g) {
		case 0:
			this._position += this.speed.get__() * dt;
			if(this._position > this.symbol.duration) {
				this._position = this._position % this.symbol.duration;
				if(this._looped != null) this._looped.emit();
			}
			break;
		case 512:
			this._flags = flambe_util_BitSets.remove(this._flags,512);
			break;
		}
		var newFrame = this._position * this.symbol.frameRate;
		this["goto"](newFrame);
	}
	,'goto': function(newFrame) {
		if(this._frame == newFrame) return;
		var wrapped = newFrame < this._frame;
		if(wrapped) {
			var _g = 0;
			var _g1 = this._animators;
			while(_g < _g1.length) {
				var animator = _g1[_g];
				++_g;
				animator.needsKeyframeUpdate = true;
				animator.keyframeIdx = 0;
			}
		}
		var _g2 = 0;
		var _g11 = this._animators;
		while(_g2 < _g11.length) {
			var animator1 = _g11[_g2];
			++_g2;
			animator1.composeFrame(newFrame);
		}
		this._frame = newFrame;
	}
	,get_position: function() {
		return this._position;
	}
	,set_position: function(position) {
		return this._position = flambe_math_FMath.clamp(position,0,this.symbol.duration);
	}
	,set_paused: function(paused) {
		this._flags = flambe_util_BitSets.set(this._flags,256,paused);
		return paused;
	}
	,get_looped: function() {
		if(this._looped == null) this._looped = new flambe_util_Signal0();
		return this._looped;
	}
	,set_pixelSnapping: function(pixelSnapping) {
		var _g = 0;
		var _g1 = this._animators;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.setPixelSnapping(pixelSnapping);
		}
		return flambe_display_Sprite.prototype.set_pixelSnapping.call(this,pixelSnapping);
	}
	,rewind: function() {
		this._position = 0;
		this._flags = flambe_util_BitSets.add(this._flags,512);
	}
	,__class__: flambe_swf_MovieSprite
	,__properties__: $extend(flambe_display_Sprite.prototype.__properties__,{get_looped:"get_looped",set_paused:"set_paused",set_position:"set_position",get_position:"get_position"})
});
var flambe_swf__$MovieSprite_LayerAnimator = function(layer) {
	this.keyframeIdx = 0;
	this.needsKeyframeUpdate = false;
	this.layer = layer;
	this.content = new flambe_Entity();
	if(layer.empty) this._sprites = null; else {
		this._sprites = flambe_util_Arrays.create(layer.keyframes.length);
		var _g1 = 0;
		var _g = this._sprites.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var kf = layer.keyframes[ii];
			if(ii > 0 && layer.keyframes[ii - 1].symbol == kf.symbol) this._sprites[ii] = this._sprites[ii - 1]; else if(kf.symbol == null) this._sprites[ii] = new flambe_display_Sprite(); else this._sprites[ii] = kf.symbol.createSprite();
		}
		this.content.add(this._sprites[0]);
	}
};
$hxClasses["flambe.swf._MovieSprite.LayerAnimator"] = flambe_swf__$MovieSprite_LayerAnimator;
flambe_swf__$MovieSprite_LayerAnimator.__name__ = ["flambe","swf","_MovieSprite","LayerAnimator"];
flambe_swf__$MovieSprite_LayerAnimator.prototype = {
	composeFrame: function(frame) {
		if(this._sprites == null) return;
		var keyframes = this.layer.keyframes;
		var finalFrame = keyframes.length - 1;
		if(frame > this.layer.frames) {
			((function($this) {
				var $r;
				var component = $this.content.getComponent("Sprite_3");
				$r = component;
				return $r;
			}(this))).set_visible(false);
			this.keyframeIdx = finalFrame;
			this.needsKeyframeUpdate = true;
			return;
		}
		while(this.keyframeIdx < finalFrame && keyframes[this.keyframeIdx + 1].index <= frame) {
			++this.keyframeIdx;
			this.needsKeyframeUpdate = true;
		}
		var sprite;
		if(this.needsKeyframeUpdate) {
			this.needsKeyframeUpdate = false;
			sprite = this._sprites[this.keyframeIdx];
			if(sprite != (function($this) {
				var $r;
				var component1 = $this.content.getComponent("Sprite_3");
				$r = component1;
				return $r;
			}(this))) {
				if(Type.getClass(sprite) == flambe_swf_MovieSprite) {
					var movie = sprite;
					movie.rewind();
				}
				this.content.add(sprite);
			}
		} else {
			var component2 = this.content.getComponent("Sprite_3");
			sprite = component2;
		}
		var kf = keyframes[this.keyframeIdx];
		var visible = kf.visible && kf.symbol != null;
		sprite.set_visible(visible);
		if(!visible) return;
		var x = kf.x;
		var y = kf.y;
		var scaleX = kf.scaleX;
		var scaleY = kf.scaleY;
		var skewX = kf.skewX;
		var skewY = kf.skewY;
		var alpha = kf.alpha;
		if(kf.tweened && this.keyframeIdx < finalFrame) {
			var interp = (frame - kf.index) / kf.duration;
			var ease = kf.ease;
			if(ease != 0) {
				var t;
				if(ease < 0) {
					var inv = 1 - interp;
					t = 1 - inv * inv;
					ease = -ease;
				} else t = interp * interp;
				interp = ease * t + (1 - ease) * interp;
			}
			var nextKf = keyframes[this.keyframeIdx + 1];
			x += (nextKf.x - x) * interp;
			y += (nextKf.y - y) * interp;
			scaleX += (nextKf.scaleX - scaleX) * interp;
			scaleY += (nextKf.scaleY - scaleY) * interp;
			skewX += (nextKf.skewX - skewX) * interp;
			skewY += (nextKf.skewY - skewY) * interp;
			alpha += (nextKf.alpha - alpha) * interp;
		}
		var matrix = sprite.getLocalMatrix();
		var sinX = 0.0;
		var cosX = 1.0;
		var sinY = 0.0;
		var cosY = 1.0;
		if(skewX != 0) {
			sinX = Math.sin(skewX);
			cosX = Math.cos(skewX);
		}
		if(skewY != 0) {
			sinY = Math.sin(skewY);
			cosY = Math.cos(skewY);
		}
		matrix.set(cosY * scaleX,sinY * scaleX,-sinX * scaleY,cosX * scaleY,x,y);
		matrix.translate(-kf.pivotX,-kf.pivotY);
		sprite.alpha.set__(alpha);
	}
	,setPixelSnapping: function(pixelSnapping) {
		if(this._sprites != null) {
			var _g = 0;
			var _g1 = this._sprites;
			while(_g < _g1.length) {
				var sprite = _g1[_g];
				++_g;
				sprite.set_pixelSnapping(pixelSnapping);
			}
		}
	}
	,__class__: flambe_swf__$MovieSprite_LayerAnimator
};
var flambe_swf_MovieSymbol = function(lib,json) {
	this._name = json.id;
	this.frameRate = lib.frameRate;
	this.frames = 0.0;
	this.layers = flambe_util_Arrays.create(json.layers.length);
	var _g1 = 0;
	var _g = this.layers.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = new flambe_swf_MovieLayer(json.layers[ii]);
		this.frames = Math.max(layer.frames,this.frames);
		this.layers[ii] = layer;
	}
	this.duration = this.frames / this.frameRate;
};
$hxClasses["flambe.swf.MovieSymbol"] = flambe_swf_MovieSymbol;
flambe_swf_MovieSymbol.__name__ = ["flambe","swf","MovieSymbol"];
flambe_swf_MovieSymbol.__interfaces__ = [flambe_swf_Symbol];
flambe_swf_MovieSymbol.prototype = {
	get_name: function() {
		return this._name;
	}
	,createSprite: function() {
		return new flambe_swf_MovieSprite(this);
	}
	,__class__: flambe_swf_MovieSymbol
	,__properties__: {get_name:"get_name"}
};
var flambe_swf_MovieLayer = function(json) {
	this.empty = true;
	this.name = json.name;
	var prevKf = null;
	this.keyframes = flambe_util_Arrays.create(json.keyframes.length);
	var _g1 = 0;
	var _g = this.keyframes.length;
	while(_g1 < _g) {
		var ii = _g1++;
		prevKf = new flambe_swf_MovieKeyframe(json.keyframes[ii],prevKf);
		this.keyframes[ii] = prevKf;
		this.empty = this.empty && prevKf.symbolName == null;
	}
	if(prevKf != null) this.frames = prevKf.index + prevKf.duration; else this.frames = 0;
};
$hxClasses["flambe.swf.MovieLayer"] = flambe_swf_MovieLayer;
flambe_swf_MovieLayer.__name__ = ["flambe","swf","MovieLayer"];
flambe_swf_MovieLayer.prototype = {
	__class__: flambe_swf_MovieLayer
};
var flambe_swf_MovieKeyframe = function(json,prevKf) {
	this.ease = 0;
	this.tweened = true;
	this.visible = true;
	this.alpha = 1;
	this.pivotY = 0;
	this.pivotX = 0;
	this.skewY = 0;
	this.skewX = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.y = 0;
	this.x = 0;
	this.symbol = null;
	if(prevKf != null) this.index = prevKf.index + prevKf.duration; else this.index = 0;
	this.duration = json.duration;
	this.label = json.label;
	this.symbolName = json.ref;
	var loc = json.loc;
	if(loc != null) {
		this.x = loc[0];
		this.y = loc[1];
	}
	var scale = json.scale;
	if(scale != null) {
		this.scaleX = scale[0];
		this.scaleY = scale[1];
	}
	var skew = json.skew;
	if(skew != null) {
		this.skewX = skew[0];
		this.skewY = skew[1];
	}
	var pivot = json.pivot;
	if(pivot != null) {
		this.pivotX = pivot[0];
		this.pivotY = pivot[1];
	}
	if(json.alpha != null) this.alpha = json.alpha;
	if(json.visible != null) this.visible = json.visible;
	if(json.tweened != null) this.tweened = json.tweened;
	if(json.ease != null) this.ease = json.ease;
};
$hxClasses["flambe.swf.MovieKeyframe"] = flambe_swf_MovieKeyframe;
flambe_swf_MovieKeyframe.__name__ = ["flambe","swf","MovieKeyframe"];
flambe_swf_MovieKeyframe.prototype = {
	setVisible: function(visible) {
		this.visible = visible;
	}
	,setSymbol: function(symbol) {
		this.symbol = symbol;
	}
	,__class__: flambe_swf_MovieKeyframe
};
var flambe_util_Arrays = function() { };
$hxClasses["flambe.util.Arrays"] = flambe_util_Arrays;
flambe_util_Arrays.__name__ = ["flambe","util","Arrays"];
flambe_util_Arrays.create = function(length) {
	return new Array(length);
};
var flambe_util_Assert = function() { };
$hxClasses["flambe.util.Assert"] = flambe_util_Assert;
flambe_util_Assert.__name__ = ["flambe","util","Assert"];
flambe_util_Assert.that = function(condition,message,fields) {
	if(!condition) flambe_util_Assert.fail(message,fields);
};
flambe_util_Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe_util_Strings.withFields(error,fields);
	throw new js__$Boot_HaxeError(error);
};
var flambe_util_BitSets = function() { };
$hxClasses["flambe.util.BitSets"] = flambe_util_BitSets;
flambe_util_BitSets.__name__ = ["flambe","util","BitSets"];
flambe_util_BitSets.add = function(bits,mask) {
	return bits | mask;
};
flambe_util_BitSets.remove = function(bits,mask) {
	return bits & ~mask;
};
flambe_util_BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
};
flambe_util_BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
};
flambe_util_BitSets.set = function(bits,mask,enabled) {
	if(enabled) return flambe_util_BitSets.add(bits,mask); else return flambe_util_BitSets.remove(bits,mask);
};
var flambe_util_LogLevel = $hxClasses["flambe.util.LogLevel"] = { __ename__ : ["flambe","util","LogLevel"], __constructs__ : ["Info","Warn","Error"] };
flambe_util_LogLevel.Info = ["Info",0];
flambe_util_LogLevel.Info.toString = $estr;
flambe_util_LogLevel.Info.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Warn = ["Warn",1];
flambe_util_LogLevel.Warn.toString = $estr;
flambe_util_LogLevel.Warn.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Error = ["Error",2];
flambe_util_LogLevel.Error.toString = $estr;
flambe_util_LogLevel.Error.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.__empty_constructs__ = [flambe_util_LogLevel.Info,flambe_util_LogLevel.Warn,flambe_util_LogLevel.Error];
var flambe_util_Promise = function() {
	this.success = new flambe_util_Signal1();
	this.error = new flambe_util_Signal1();
	this.progressChanged = new flambe_util_Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe_util_Promise;
flambe_util_Promise.__name__ = ["flambe","util","Promise"];
flambe_util_Promise.prototype = {
	get_result: function() {
		if(!this.hasResult) throw new js__$Boot_HaxeError("Promise result not yet available");
		return this._result;
	}
	,set_result: function(result) {
		if(this.hasResult) throw new js__$Boot_HaxeError("Promise result already assigned");
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,get_progress: function() {
		return this._progress;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,get_total: function() {
		return this._total;
	}
	,__class__: flambe_util_Promise
	,__properties__: {set_total:"set_total",get_total:"get_total",set_progress:"set_progress",get_progress:"get_progress",set_result:"set_result",get_result:"get_result"}
};
var flambe_util_Signal0 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe_util_Signal0;
flambe_util_Signal0.__name__ = ["flambe","util","Signal0"];
flambe_util_Signal0.__super__ = flambe_util_SignalBase;
flambe_util_Signal0.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function() {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal0
});
var flambe_util__$SignalBase_Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe_util__$SignalBase_Task;
flambe_util__$SignalBase_Task.__name__ = ["flambe","util","_SignalBase","Task"];
flambe_util__$SignalBase_Task.prototype = {
	__class__: flambe_util__$SignalBase_Task
};
var flambe_util_Strings = function() { };
$hxClasses["flambe.util.Strings"] = flambe_util_Strings;
flambe_util_Strings.__name__ = ["flambe","util","Strings"];
flambe_util_Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,dot + 1,null); else return null;
};
flambe_util_Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,0,dot); else return fileName;
};
flambe_util_Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe_util_Strings.getFileExtension(url);
};
flambe_util_Strings.joinPath = function(base,relative) {
	if(base.length > 0 && StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
	return base + relative;
};
flambe_util_Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		if(message.length > 0) message += " ["; else message += "[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
};
var flambesdk_BaseUtils = function() { };
$hxClasses["flambesdk.BaseUtils"] = flambesdk_BaseUtils;
flambesdk_BaseUtils.__name__ = ["flambesdk","BaseUtils"];
flambesdk_BaseUtils.setupManifest = function(manifest) {
	if(flambesdk_BaseUtils.BASE_URL != "") {
		if(nicksdk_jsembed_JSEmbedProxy.get_isCrossdomain()) manifest.set_remoteBase(flambesdk_BaseUtils.BASE_URL); else manifest.set_localBase(flambesdk_BaseUtils.BASE_URL);
	}
	return manifest;
};
flambesdk_BaseUtils.setupBaseURL = function() {
	if(nicksdk_jsembed_JSEmbedProxy.get_exists()) {
		if(nicksdk_jsembed_JSEmbedProxy.get_isCrossdomain()) flambesdk_BaseUtils.BASE_URL = flambesdk_BaseUtils.appendAssetsToUrl(nicksdk_jsembed_JSEmbedProxy.get_base()); else flambesdk_BaseUtils.BASE_URL = flambesdk_BaseUtils.trimUrl(nicksdk_jsembed_JSEmbedProxy.get_base());
	} else flambesdk_BaseUtils.BASE_URL = "";
};
flambesdk_BaseUtils.trimUrl = function(url) {
	if(url == "") return "";
	if(url.indexOf("http") < 0) {
		if(url.charAt(0) == "/") url = HxOverrides.substr(url,1,url.length - 1);
		return url;
	}
	var tStartIndex = url.indexOf("http://");
	if(tStartIndex < 0) {
		tStartIndex = url.indexOf("https://");
		if(tStartIndex < 0) tStartIndex = 0; else tStartIndex += 8;
	} else tStartIndex += 7;
	var tEndIndex = url.indexOf("/",tStartIndex);
	var result = HxOverrides.substr(url,tEndIndex,url.length - tEndIndex);
	result = flambesdk_BaseUtils.appendAssetsToUrl(result);
	return result;
};
flambesdk_BaseUtils.appendAssetsToUrl = function(url) {
	if(url.charAt(url.length - 1) != "/") url = url + "/";
	url = url + "assets/";
	return url;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Json = function() { };
$hxClasses["haxe.Json"] = haxe_Json;
haxe_Json.__name__ = ["haxe","Json"];
haxe_Json.parse = function(text) {
	return haxe_format_JsonParser.parse(text);
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.toString();
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.add("R");
			this.buf.add(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.add("y");
		s = StringTools.urlEncode(s);
		this.buf.add(s.length);
		this.buf.add(":");
		this.buf.add(s);
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.add("g");
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(Type.enumIndex(_g)) {
			case 0:
				this.buf.add("n");
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.add("z");
					return;
				}
				this.buf.add("i");
				this.buf.add(v1);
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.add("k"); else if(!isFinite(v2)) this.buf.add(v2 < 0?"m":"p"); else {
					this.buf.add("d");
					this.buf.add(v2);
				}
				break;
			case 3:
				this.buf.add(v?"t":"f");
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.add("a");
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.add("n"); else {
									this.buf.add("u");
									this.buf.add(ucount);
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.add("n"); else {
							this.buf.add("u");
							this.buf.add(ucount);
						}
					}
					this.buf.add("h");
					break;
				case List:
					this.buf.add("l");
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.add("h");
					break;
				case Date:
					var d = v;
					this.buf.add("v");
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.add("b");
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.add("h");
					break;
				case haxe_ds_IntMap:
					this.buf.add("q");
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.add(":");
						this.buf.add(k1);
						this.serialize(v5.get(k1));
					}
					this.buf.add("h");
					break;
				case haxe_ds_ObjectMap:
					this.buf.add("M");
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						Reflect.setField(k2,"__id__",id);
						this.serialize(v6.get(k2));
					}
					this.buf.add("h");
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.toString();
					this.buf.add("s");
					this.buf.add(chars.length);
					this.buf.add(":");
					this.buf.add(chars);
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.add("C");
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.add("g");
					} else {
						this.buf.add("c");
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(Std["is"](v,Class)) {
					var className = Type.getClassName(v);
					this.buf.add("A");
					this.serializeString(className);
				} else if(Std["is"](v,Enum)) {
					this.buf.add("B");
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.add("o");
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				this.buf.add(this.useEnumIndex?"j":"w");
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.add(":");
					this.buf.add(v[1]);
				} else this.serializeString(v[0]);
				this.buf.add(":");
				var l1 = v.length;
				this.buf.add(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[StringTools.fastCodeAt(haxe_Unserializer.BASE64,i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return StringTools.fastCodeAt(this.buf,p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.get(this.pos);
			if(StringTools.isEof(c)) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.get(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.get(this.pos) == 103) break;
			var k = this.unserialize();
			if(!Std["is"](k,String)) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			Reflect.setField(o,k,v);
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.get(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.get(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.get(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.get(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.get(this.pos) >= 48 && this.get(this.pos) <= 57 && this.get(this.pos + 1) >= 48 && this.get(this.pos + 1) <= 57 && this.get(this.pos + 2) >= 48 && this.get(this.pos + 2) <= 57 && this.get(this.pos + 3) >= 48 && this.get(this.pos + 3) <= 57 && this.get(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = Type.enumIndex(k1) - Type.enumIndex(k2);
		if(d != 0) return d;
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if(Std["is"](v1,Array) && Std["is"](v2,Array)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.assignId = function(obj) {
	return obj.__id__ = ++haxe_ds_ObjectMap.count;
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || haxe_ds_ObjectMap.assignId(key);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[haxe_ds_ObjectMap.getId(key)];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	isReserved: function(key) {
		return __map_reserved[key] != null;
	}
	,set: function(key,value) {
		if(this.isReserved(key)) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(this.isReserved(key)) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(this.isReserved(key)) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(this.isReserved(key)) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_format_JsonParser = function(str) {
	this.str = str;
	this.pos = 0;
};
$hxClasses["haxe.format.JsonParser"] = haxe_format_JsonParser;
haxe_format_JsonParser.__name__ = ["haxe","format","JsonParser"];
haxe_format_JsonParser.parse = function(str) {
	return new haxe_format_JsonParser(str).parseRec();
};
haxe_format_JsonParser.prototype = {
	parseRec: function() {
		while(true) {
			var c = this.nextChar();
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { };
				var field = null;
				var comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						Reflect.setField(obj,field,this.parseRec());
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [];
				var comma1 = null;
				while(true) {
					var c2 = this.nextChar();
					switch(c2) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma1 == false) this.invalidChar();
						return arr;
					case 44:
						if(comma1) comma1 = false; else this.invalidChar();
						break;
					default:
						if(comma1) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma1 = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.nextChar() != 114 || this.nextChar() != 117 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save1 = this.pos;
				if(this.nextChar() != 97 || this.nextChar() != 108 || this.nextChar() != 115 || this.nextChar() != 101) {
					this.pos = save1;
					this.invalidChar();
				}
				return false;
			case 110:
				var save2 = this.pos;
				if(this.nextChar() != 117 || this.nextChar() != 108 || this.nextChar() != 108) {
					this.pos = save2;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,parseString: function() {
		var start = this.pos;
		var buf = null;
		while(true) {
			var c = this.nextChar();
			if(c == 34) break;
			if(c == 92) {
				if(buf == null) buf = new StringBuf();
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.nextChar();
				switch(c) {
				case 114:
					buf.addChar(13);
					break;
				case 110:
					buf.addChar(10);
					break;
				case 116:
					buf.addChar(9);
					break;
				case 98:
					buf.addChar(8);
					break;
				case 102:
					buf.addChar(12);
					break;
				case 47:case 92:case 34:
					buf.addChar(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.addChar(uc);
					break;
				default:
					throw new js__$Boot_HaxeError("Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1));
				}
				start = this.pos;
			} else if(StringTools.isEof(c)) throw new js__$Boot_HaxeError("Unclosed string");
		}
		if(buf == null) return HxOverrides.substr(this.str,start,this.pos - start - 1); else {
			buf.addSub(this.str,start,this.pos - start - 1);
			return buf.toString();
		}
	}
	,parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45;
		var digit = !minus;
		var zero = c == 48;
		var point = false;
		var e = false;
		var pm = false;
		var end = false;
		while(true) {
			c = this.nextChar();
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = Std["int"](f);
		if(i == f) return i; else return f;
	}
	,nextChar: function() {
		return StringTools.fastCodeAt(this.str,this.pos++);
	}
	,invalidChar: function() {
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + StringTools.fastCodeAt(this.str,this.pos) + " at position " + this.pos);
	}
	,invalidNumber: function(start) {
		throw new js__$Boot_HaxeError("Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start));
	}
	,__class__: haxe_format_JsonParser
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = Std["int"](sig);
		var sig_h = Std["int"](sig / 4294967296.0);
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
var haxe_xml__$Fast_NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe_xml__$Fast_NodeAccess;
haxe_xml__$Fast_NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe_xml__$Fast_NodeAccess.prototype = {
	__class__: haxe_xml__$Fast_NodeAccess
};
var haxe_xml__$Fast_AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe_xml__$Fast_AttribAccess;
haxe_xml__$Fast_AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe_xml__$Fast_AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw new js__$Boot_HaxeError("Cannot access document attribute " + name);
		var v = this.__x.get(name);
		if(v == null) throw new js__$Boot_HaxeError(this.__x.get_nodeName() + " is missing attribute " + name);
		return v;
	}
	,__class__: haxe_xml__$Fast_AttribAccess
};
var haxe_xml__$Fast_HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe_xml__$Fast_HasAttribAccess;
haxe_xml__$Fast_HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe_xml__$Fast_HasAttribAccess.prototype = {
	__class__: haxe_xml__$Fast_HasAttribAccess
};
var haxe_xml__$Fast_HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe_xml__$Fast_HasNodeAccess;
haxe_xml__$Fast_HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe_xml__$Fast_HasNodeAccess.prototype = {
	__class__: haxe_xml__$Fast_HasNodeAccess
};
var haxe_xml__$Fast_NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe_xml__$Fast_NodeListAccess;
haxe_xml__$Fast_NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe_xml__$Fast_NodeListAccess.prototype = {
	__class__: haxe_xml__$Fast_NodeListAccess
};
var haxe_xml_Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Invalid nodeType " + x.nodeType);
	this.x = x;
	this.node = new haxe_xml__$Fast_NodeAccess(x);
	this.nodes = new haxe_xml__$Fast_NodeListAccess(x);
	this.att = new haxe_xml__$Fast_AttribAccess(x);
	this.has = new haxe_xml__$Fast_HasAttribAccess(x);
	this.hasNode = new haxe_xml__$Fast_HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe_xml_Fast;
haxe_xml_Fast.__name__ = ["haxe","xml","Fast"];
haxe_xml_Fast.prototype = {
	get_elements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe_xml_Fast(x);
		}};
	}
	,__class__: haxe_xml_Fast
	,__properties__: {get_elements:"get_elements"}
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = StringTools.fastCodeAt(str,p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!StringTools.isEof(c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.toString());
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && StringTools.fastCodeAt(str,p + 1) == 93 && StringTools.fastCodeAt(str,p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(StringTools.fastCodeAt(str,p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) == 68 || StringTools.fastCodeAt(str,p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) != 45 || StringTools.fastCodeAt(str,p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!haxe_xml_Parser.isValidChar(c)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!haxe_xml_Parser.isValidChar(c)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.toString();
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.toString();
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.toString();
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!haxe_xml_Parser.isValidChar(c)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw new js__$Boot_HaxeError("Expected </" + parent.get_nodeName() + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && StringTools.fastCodeAt(str,p + 1) == 45 && StringTools.fastCodeAt(str,p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && StringTools.fastCodeAt(str,p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(StringTools.fastCodeAt(s,0) == 35) {
					var c1;
					if(StringTools.fastCodeAt(s,1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.addChar(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.add("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!haxe_xml_Parser.isValidChar(c) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.addChar(38);
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.toString());
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.addChar(38);
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.toString());
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
haxe_xml_Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = ["haxe","xml","Printer"];
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.toString();
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		var _g = value.nodeType;
		switch(_g) {
		case 2:
			this.write(tabs + "<![CDATA[");
			this.write(StringTools.trim(value.get_nodeValue()));
			this.write("]]>");
			this.newline();
			break;
		case 3:
			var commentContent = value.get_nodeValue();
			commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
			commentContent = "<!--" + commentContent + "-->";
			this.write(tabs);
			this.write(StringTools.trim(commentContent));
			this.newline();
			break;
		case 6:
			var $it0 = value.iterator();
			while( $it0.hasNext() ) {
				var child = $it0.next();
				this.writeNode(child,tabs);
			}
			break;
		case 0:
			this.write(tabs + "<");
			this.write(value.get_nodeName());
			var $it1 = value.attributes();
			while( $it1.hasNext() ) {
				var attribute = $it1.next();
				this.write(" " + attribute + "=\"");
				this.write(StringTools.htmlEscape(value.get(attribute),true));
				this.write("\"");
			}
			if(this.hasChildren(value)) {
				this.write(">");
				this.newline();
				var $it2 = value.iterator();
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					this.writeNode(child1,this.pretty?tabs + "\t":tabs);
				}
				this.write(tabs + "</");
				this.write(value.get_nodeName());
				this.write(">");
				this.newline();
			} else {
				this.write("/>");
				this.newline();
			}
			break;
		case 1:
			var nodeValue = value.get_nodeValue();
			if(nodeValue.length != 0) {
				this.write(tabs + StringTools.htmlEscape(nodeValue));
				this.newline();
			}
			break;
		case 5:
			this.write("<?" + value.get_nodeValue() + "?>");
			break;
		case 4:
			this.write("<!DOCTYPE " + value.get_nodeValue() + ">");
			break;
		}
	}
	,write: function(input) {
		this.output.add(input);
	}
	,newline: function() {
		if(this.pretty) this.output.add("");
	}
	,hasChildren: function(value) {
		var $it0 = value.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var _g = child.nodeType;
			switch(_g) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(StringTools.ltrim(child.get_nodeValue()).length != 0) return true;
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(Std["is"](o,Array)) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js_Boot.isClass(o) || js_Boot.isEnum(o))) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_html_compat_ArrayBuffer = function(a) {
	if(Std["is"](a,Array)) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(Std["is"](arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if(Std["is"](arg1,Array)) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(Std["is"](arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if(Std["is"](arg,Array)) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var nicksdk_jsembed_JSEmbedProxy = function() { };
$hxClasses["nicksdk.jsembed.JSEmbedProxy"] = nicksdk_jsembed_JSEmbedProxy;
nicksdk_jsembed_JSEmbedProxy.__name__ = ["nicksdk","jsembed","JSEmbedProxy"];
nicksdk_jsembed_JSEmbedProxy.__properties__ = {get_isCrossdomain:"get_isCrossdomain",get_base:"get_base",get_exists:"get_exists"}
nicksdk_jsembed_JSEmbedProxy.get_exists = function() {
	return nicksdk_jsembed_JSEmbedProxy.callJSEmbedMethod("exists()");
};
nicksdk_jsembed_JSEmbedProxy.get_base = function() {
	return nicksdk_jsembed_JSEmbedProxy.callJSEmbedMethod("baseUrl()");
};
nicksdk_jsembed_JSEmbedProxy.get_isCrossdomain = function() {
	return nicksdk_jsembed_JSEmbedProxy.callJSEmbedMethod("isBaseCrossdomain()");
};
nicksdk_jsembed_JSEmbedProxy.callJSEmbedMethod = function(pRequest) {
	try {
		var result = nicksdk_jsembed_JSEmbedProxy["eval"]("eval",["jsembed." + pRequest]);
		if(result == null) return ""; else return result;
	} catch( err ) {
		if (err instanceof js__$Boot_HaxeError) err = err.val;
	}
	return "";
};
nicksdk_jsembed_JSEmbedProxy["eval"] = function(name,params) {
	if(params == null) params = [];
	var object = js_Browser.get_window();
	var method = object;
	var _g = 0;
	var _g1 = name.split(".");
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		object = method;
		method = Reflect.field(object,fieldName);
	}
	return Reflect.callMethod(object,method,params);
};
var s2_animation_Draggable2 = function(offset,bounds,factor,easeTime,ease) {
	if(easeTime == null) easeTime = -1;
	this._factor = 1;
	flambe_Component.call(this);
	this._bounds = bounds;
	this._easeTime = easeTime;
	this._ease = ease;
	this.change = new flambe_math_Point(0,0);
	this.drag = new flambe_util_Signal1();
	this.pick = new flambe_util_Signal1();
	this.drop = new flambe_util_Signal1();
	if(factor != null) this._factor = factor; else this._factor = this._factor;
};
$hxClasses["s2.animation.Draggable2"] = s2_animation_Draggable2;
s2_animation_Draggable2.__name__ = ["s2","animation","Draggable2"];
s2_animation_Draggable2.__super__ = flambe_Component;
s2_animation_Draggable2.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Draggable2_18";
	}
	,onAdded: function() {
		if((function($this) {
			var $r;
			var component = $this.owner.getComponent("Disposer_9");
			$r = component;
			return $r;
		}(this)) == null) this.owner.add(new flambe_Disposer());
		if((function($this) {
			var $r;
			var component1 = flambe_System.root.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this)) == null) flambe_System.root.add(new flambe_display_Sprite());
		var disposer;
		var component2 = this.owner.getComponent("Disposer_9");
		disposer = component2;
		disposer.connect1(((function($this) {
			var $r;
			var component3 = $this.owner.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).get_pointerDown(),$bind(this,this.onPointerDn));
		disposer.connect1(flambe_System.get_pointer().up,$bind(this,this.onSystemPointerUp));
	}
	,onPointerDn: function(e) {
		this.startDrag();
	}
	,startDrag: function() {
		this._mouseStart = new flambe_math_Point(flambe_System.get_pointer().get_x(),flambe_System.get_pointer().get_y());
		var sprite;
		var component = this.owner.getComponent("Sprite_3");
		sprite = component;
		this._spriteStart = new flambe_math_Point(sprite.x.get__(),sprite.y.get__());
		s2_animation_Draggable2.dragging = this;
		this.pick.emit(this);
		s2_animation_Draggable2.staticPick.emit(this);
	}
	,stopDrag: function(emit) {
		if(emit == null) emit = true;
		if(emit) {
			this.drop.emit(this);
			s2_animation_Draggable2.staticDrop.emit(this);
		}
		this.change = new flambe_math_Point(0,0);
		s2_animation_Draggable2.dragging = null;
	}
	,onSystemPointerUp: function(e) {
		if(s2_animation_Draggable2.dragging == this) this.stopDrag();
	}
	,onUpdate: function(dt) {
		if(s2_animation_Draggable2.dragging == this) {
			var scale = 1;
			var ancestor = this.owner;
			var cAncestor;
			while(ancestor != null) {
				var component = ancestor.getComponent("Sprite_3");
				cAncestor = component;
				if(cAncestor != null) scale = scale * cAncestor.scaleX.get__();
				ancestor = ancestor.parent;
			}
			this.change = new flambe_math_Point(flambe_System.get_pointer().get_x() - this._mouseStart.x,flambe_System.get_pointer().get_y() - this._mouseStart.y);
			this.targX = this._spriteStart.x + Math.round(this.change.x / scale * this._factor);
			this.targY = this._spriteStart.y + Math.round(this.change.y / scale * this._factor);
			if(this._bounds != null) {
				this.targX = Math.min(Math.max(this.targX,this._bounds.x),this._bounds.x + this._bounds.width);
				this.targY = Math.min(Math.max(this.targY,this._bounds.y),this._bounds.y + this._bounds.height);
			}
			var sprite;
			var component1 = this.owner.getComponent("Sprite_3");
			sprite = component1;
			var changed = sprite.x.get__() != this.targX || sprite.y.get__() != this.targY;
			if(!(this._easeTime > 0)) {
				((function($this) {
					var $r;
					var component2 = $this.owner.getComponent("Sprite_3");
					$r = component2;
					return $r;
				}(this))).x.set__(this.targX);
				((function($this) {
					var $r;
					var component3 = $this.owner.getComponent("Sprite_3");
					$r = component3;
					return $r;
				}(this))).y.set__(this.targY);
			} else {
				((function($this) {
					var $r;
					var component4 = $this.owner.getComponent("Sprite_3");
					$r = component4;
					return $r;
				}(this))).x.animateTo(this.targX,this._easeTime,this._ease);
				((function($this) {
					var $r;
					var component5 = $this.owner.getComponent("Sprite_3");
					$r = component5;
					return $r;
				}(this))).y.animateTo(this.targY,this._easeTime,this._ease);
			}
			if(changed) {
				this.drag.emit(this);
				s2_animation_Draggable2.staticDrag.emit(this);
			}
		}
	}
	,dispose: function() {
		if(s2_animation_Draggable2.dragging == this) s2_animation_Draggable2.dragging = null;
		flambe_Component.prototype.dispose.call(this);
	}
	,__class__: s2_animation_Draggable2
});
var s2_behavior_Damping = function() {
	this.target = 0;
	this.nDecay = 0.9;
	this.nK = 0.2;
	this.nM = 10;
	this.velocity = 0;
	this._nPos = 0;
	this._nAccel = 0;
};
$hxClasses["s2.behavior.Damping"] = s2_behavior_Damping;
s2_behavior_Damping.__name__ = ["s2","behavior","Damping"];
s2_behavior_Damping.__interfaces__ = [flambe_animation_Behavior];
s2_behavior_Damping.prototype = {
	update: function(dt) {
		this._nAccel = -(this.nK / this.nM) * (this._nPos - this.target);
		this.velocity *= this.nDecay;
		this.velocity += this._nAccel;
		this._nPos += this.velocity;
		return this._nPos;
	}
	,isComplete: function() {
		return false;
	}
	,__class__: s2_behavior_Damping
};
var s2_client_ClientBootstrap = function() { };
$hxClasses["s2.client.ClientBootstrap"] = s2_client_ClientBootstrap;
s2_client_ClientBootstrap.__name__ = ["s2","client","ClientBootstrap"];
s2_client_ClientBootstrap.prototype = {
	__class__: s2_client_ClientBootstrap
};
var s2_client_CommonBootstrap = function() {
	this.complete = new flambe_util_Signal0();
	this._options = new haxe_ds_StringMap();
	if(s2_util_Sniffer.get_lowMemory()) s2_loading_Assets.suffix = "mob";
};
$hxClasses["s2.client.CommonBootstrap"] = s2_client_CommonBootstrap;
s2_client_CommonBootstrap.__name__ = ["s2","client","CommonBootstrap"];
s2_client_CommonBootstrap.__interfaces__ = [s2_client_ClientBootstrap];
s2_client_CommonBootstrap.prototype = {
	start: function() {
		flambe_util_Assert.fail("Must subclass and override CommonBootsrap.start().");
	}
	,track: function(params) {
	}
	,__class__: s2_client_CommonBootstrap
};
var s2_client_Config = function() { };
$hxClasses["s2.client.Config"] = s2_client_Config;
s2_client_Config.__name__ = ["s2","client","Config"];
s2_client_Config.init = function(bootstrap,completed) {
	if(s2_client_Config.initialized == null) s2_client_Config.initialized = new flambe_util_Value(false);
	if(!s2_client_Config.initialized.get__()) {
		bootstrap.complete.connect(function() {
			s2_client_Config.initialized.set__(true);
			if(completed != null) completed();
		}).once();
		s2_client_Config._bootstrap = bootstrap;
		bootstrap.start();
	}
};
s2_client_Config.track = function(params) {
	s2_client_Config._bootstrap.track(params);
};
var s2_client_NickBootstrap = function() {
	this._embedTargetBase = null;
	this._gameProperty = "";
	this._gameName = "";
	s2_client_CommonBootstrap.call(this);
	if(flambe_System.get_external().get_supported()) this._embedTargetBase = nicksdk_jsembed_JSEmbedProxy.get_base();
	if(this._embedTargetBase != null) this._embedTargetBase = this._embedTargetBase; else this._embedTargetBase = "";
	this.setupBasePaths();
};
$hxClasses["s2.client.NickBootstrap"] = s2_client_NickBootstrap;
s2_client_NickBootstrap.__name__ = ["s2","client","NickBootstrap"];
s2_client_NickBootstrap.__super__ = s2_client_CommonBootstrap;
s2_client_NickBootstrap.prototype = $extend(s2_client_CommonBootstrap.prototype,{
	start: function() {
		var manifest = new flambe_asset_Manifest();
		var xmlPath = "xml/config.xml";
		var sPath = this._embedTargetBase + xmlPath;
		manifest.add(xmlPath,sPath);
		var loader = flambe_System.loadAssetPack(manifest);
		loader.get($bind(this,this.onConfigLoaded));
		this.setupBasePaths();
	}
	,onConfigLoaded: function(pack) {
		var rawFile = pack.getFile("xml/config.xml");
		this._config = Xml.parse(rawFile.toString());
		if(this._parser != null) {
			this._parser(this._config);
			this._parser = null;
		}
		rawFile.dispose();
		var trackingInfo = this._config.elementsNamed("config").next().elementsNamed("tracking").next();
		var trackingEnabled = trackingInfo != null && trackingInfo.get("enabled").toString().toLowerCase() == "true";
		this._gameName = trackingInfo.elementsNamed("gameName").next().firstChild().toString();
		if(trackingInfo.elementsNamed("gameProperty").next() != null) this._gameProperty = trackingInfo.elementsNamed("gameProperty").next().firstChild().toString(); else this._gameProperty = "";
		this.setupTracking(trackingEnabled);
		var locale = trackingInfo.elementsNamed("locale").next();
		if(locale != null) this._localizationRegion = locale.firstChild().toString(); else this._localizationRegion = null;
		var appendRegion;
		if(this._localizationRegion == null || this._localizationRegion == "") appendRegion = ""; else appendRegion = "_" + this._localizationRegion;
		s2_localization_Locale.init($bind(this,this.onLocalizationLoaded),new s2_localization_DParser(),"strings/strings" + appendRegion + ".xml");
	}
	,setupTracking: function(trackingEnabled) {
		var hasTrackFlashEvent = false;
		if(trackingEnabled && flambe_System.get_external().get_supported()) hasTrackFlashEvent = js_Browser.get_window().trackFlashEvent != null;
		this._externalSupported = hasTrackFlashEvent;
	}
	,onLocalizationLoaded: function() {
		this.complete.emit();
	}
	,track: function(params) {
		flambe_util_Assert.that(params != null && params.length > 0,"You must pass in the event name as the first parameter.");
		if(this._externalSupported) flambe_System.get_external().call("trackFlashEvent",[this._gameName,params[0],"true"]);
	}
	,setupBasePaths: function() {
		var httpPattern = new EReg("^http(s)?://","i");
		if(this._embedTargetBase != null && this._embedTargetBase.length > 0) {
			if(httpPattern.match(this._embedTargetBase)) {
				var url = s2_util_Utils.runJSStatement("window.location.href");
				var parts = url.split("/");
				if(parts[parts.length - 1] == null || parts[parts.length - 1].indexOf(".") > -1) parts.pop();
				url = parts.join("/").split("?")[0];
				var relativePath = s2_util_PathUtil.absoluteToRelative(url,this._embedTargetBase);
				if(relativePath != null) {
					s2_loading_Assets.relativeBase = relativePath + "assets/";
					s2_localization_Locale.relativeBase = relativePath;
				} else {
					s2_loading_Assets.externalBase = this._embedTargetBase + "assets/";
					s2_localization_Locale.externalBase = this._embedTargetBase;
				}
			} else {
				s2_loading_Assets.relativeBase = this._embedTargetBase + "assets/";
				s2_localization_Locale.relativeBase = this._embedTargetBase;
			}
		}
	}
	,__class__: s2_client_NickBootstrap
});
var s2_display_ButtonMode = function(nIndex) {
	if(nIndex == null) nIndex = -1;
	this.engaged = new flambe_util_Signal1();
	this.index = -1;
	this._isDown = false;
	flambe_Component.call(this);
	this.index = nIndex;
	if(!s2_display_ButtonMode.inited) s2_display_ButtonMode.initialize(null);
};
$hxClasses["s2.display.ButtonMode"] = s2_display_ButtonMode;
s2_display_ButtonMode.__name__ = ["s2","display","ButtonMode"];
s2_display_ButtonMode.initialize = function(defaultSound) {
	s2_display_ButtonMode.inited = true;
	s2_display_ButtonMode._defaultSound = defaultSound;
	var root = flambe_System.root;
	var sRoot;
	s2_display_ButtonMode.staticChanged = new flambe_util_Signal1();
	s2_display_ButtonMode.staticDisposer = new flambe_Disposer();
	if((function($this) {
		var $r;
		var component = root.getComponent("Sprite_3");
		$r = component;
		return $r;
	}(this)) == null) flambe_System.root.add(new flambe_display_Sprite());
	var component1 = flambe_System.root.getComponent("Sprite_3");
	sRoot = component1;
	s2_display_ButtonMode.staticDisposer.connect1(sRoot.get_pointerMove(),s2_display_ButtonMode.onPointerMove);
	s2_display_ButtonMode.staticDisposer.connect1(s2_display_ButtonMode.staticChanged,s2_display_ButtonMode.staticOnChanged);
};
s2_display_ButtonMode.staticOnChanged = function(current) {
	if(current.owner != null && (function($this) {
		var $r;
		var component = current.owner._internal_getFromParents("ButtonMode_1");
		$r = component;
		return $r;
	}(this)) != null) flambe_System.get_mouse().set_cursor(flambe_input_MouseCursor.Button); else flambe_System.get_mouse().set_cursor(flambe_input_MouseCursor.Default);
};
s2_display_ButtonMode.onPointerMove = function(e) {
	if(s2_display_ButtonMode.currentTarget != e.hit) s2_display_ButtonMode.staticChanged.emit(e.hit);
	s2_display_ButtonMode.currentTarget = e.hit;
};
s2_display_ButtonMode.__super__ = flambe_Component;
s2_display_ButtonMode.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "ButtonMode_1";
	}
	,onAdded: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		if(disposer == null) this.owner.add(disposer = new flambe_Disposer());
		disposer.connect1(s2_display_ButtonMode.staticChanged,$bind(this,this.onChanged));
		disposer.connect1(flambe_System.get_pointer().up,$bind(this,this.onSystemPointerUp));
		this.updateSprite();
	}
	,updateSprite: function() {
		var disposer;
		var component = this.owner.getComponent("Disposer_9");
		disposer = component;
		var sprite;
		var component1 = this.owner.getComponent("Sprite_3");
		sprite = component1;
		if(sprite == null) throw new js__$Boot_HaxeError("Add Sprite instance first.");
		if(this._spriteConnectionDisposer != null) this._spriteConnectionDisposer.dispose();
		this._spriteConnectionDisposer = new flambe_Disposer();
		disposer.add(this._spriteConnectionDisposer);
		this._spriteConnectionDisposer.connect1(sprite.get_pointerDown(),$bind(this,this.onPointerDown));
	}
	,onSystemPointerUp: function(e) {
		if(this._isDown && e.hit != null && (function($this) {
			var $r;
			var component = e.hit.owner._internal_getFromParents("ButtonMode_1");
			$r = component;
			return $r;
		}(this)) == this) {
			if(s2_display_ButtonMode._defaultSound != null && this.playSound) s2_display_ButtonMode._defaultSound.play();
			this.engaged.emit(e);
		}
		this._isDown = false;
	}
	,onPointerDown: function(e) {
		this._isDown = true;
	}
	,onChanged: function(current) {
		if(this.owner == null) throw new js__$Boot_HaxeError("No owner. You possibly added to an entity that already had ButtonMode.");
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		this.engaged = null;
		this._spriteConnectionDisposer = null;
	}
	,__class__: s2_display_ButtonMode
});
var s2_display_LayoutUtil = function() { };
$hxClasses["s2.display.LayoutUtil"] = s2_display_LayoutUtil;
s2_display_LayoutUtil.__name__ = ["s2","display","LayoutUtil"];
s2_display_LayoutUtil.left = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.x.set__(0);
	var b = flambe_display_Sprite.getBounds(entity);
	var localScaleX = Math.sqrt(s.getLocalMatrix().m00 * s.getLocalMatrix().m00 + s.getLocalMatrix().m01 * s.getLocalMatrix().m01);
	var edge;
	if(units == s2_display_Units.px) edge = offset; else edge = flambe_System.get_stage().get_width() * offset;
	var pt = s2_util_Positioning.globalToLocal(entity,edge,0);
	s.x.set__(pt.x * localScaleX - b.x);
	return entity;
};
s2_display_LayoutUtil.right = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.x.set__(0);
	var b = flambe_display_Sprite.getBounds(entity);
	var localScaleX = Math.sqrt(s.getLocalMatrix().m00 * s.getLocalMatrix().m00 + s.getLocalMatrix().m01 * s.getLocalMatrix().m01);
	var edge;
	if(units == s2_display_Units.px) edge = flambe_System.get_stage().get_width() - offset; else edge = flambe_System.get_stage().get_width() - flambe_System.get_stage().get_width() * offset;
	var pt = s2_util_Positioning.globalToLocal(entity,edge,0);
	s.x.set__(pt.x * localScaleX - b.x - b.width);
	return entity;
};
s2_display_LayoutUtil.top = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.y.set__(0);
	var b = flambe_display_Sprite.getBounds(entity);
	var localScaleY = Math.sqrt(s.getLocalMatrix().m10 * s.getLocalMatrix().m10 + s.getLocalMatrix().m11 * s.getLocalMatrix().m11);
	var edge;
	if(units == s2_display_Units.px) edge = offset; else edge = flambe_System.get_stage().get_height() * offset;
	var pt = s2_util_Positioning.globalToLocal(entity,0,edge);
	s.y.set__(pt.y * localScaleY - b.y);
	return entity;
};
s2_display_LayoutUtil.bottom = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.y.set__(0);
	var localScaleY = Math.sqrt(s.getLocalMatrix().m10 * s.getLocalMatrix().m10 + s.getLocalMatrix().m11 * s.getLocalMatrix().m11);
	var b = flambe_display_Sprite.getBounds(entity);
	var edge;
	if(units == s2_display_Units.px) edge = flambe_System.get_stage().get_height() - offset; else edge = flambe_System.get_stage().get_height() - flambe_System.get_stage().get_height() * offset;
	var pt = s2_util_Positioning.globalToLocal(entity,0,edge);
	s.y.set__(pt.y * localScaleY - b.y - b.height);
	return entity;
};
s2_display_LayoutUtil.centerX = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.x.set__(0);
	var localScaleX = Math.sqrt(s.getLocalMatrix().m00 * s.getLocalMatrix().m00 + s.getLocalMatrix().m01 * s.getLocalMatrix().m01);
	var b = flambe_display_Sprite.getBounds(entity);
	var edge;
	if(units == s2_display_Units.px) edge = flambe_System.get_stage().get_width() * .5 + offset; else edge = flambe_System.get_stage().get_width() * .5 + flambe_System.get_stage().get_width() * offset * .5;
	var pt = s2_util_Positioning.globalToLocal(entity,edge,0);
	s.x.set__(Math.round(pt.x * localScaleX - b.width * .5 - b.x));
	return entity;
};
s2_display_LayoutUtil.centerY = function(entity,offset,units) {
	if(offset == null) offset = 0;
	if(units == null) units = s2_display_Units.px; else units = s2_display_Units.percent;
	var s = s2_display_LayoutUtil.getSprite(entity);
	s.y.set__(0);
	var b = flambe_display_Sprite.getBounds(entity);
	var localScaleY = Math.sqrt(s.getLocalMatrix().m10 * s.getLocalMatrix().m10 + s.getLocalMatrix().m11 * s.getLocalMatrix().m11);
	var edge;
	if(units == s2_display_Units.px) edge = flambe_System.get_stage().get_height() * .5 + offset; else edge = flambe_System.get_stage().get_height() * .5 + flambe_System.get_stage().get_height() * offset * .5;
	var pt = s2_util_Positioning.globalToLocal(entity,0,edge);
	s.y.set__(Math.round(pt.y * localScaleY - b.height * .5 - b.y));
	return entity;
};
s2_display_LayoutUtil.center = function(entity,offsetX,offsetY,units) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	s2_display_LayoutUtil.centerX(entity,offsetX);
	return s2_display_LayoutUtil.centerY(entity,offsetY);
};
s2_display_LayoutUtil.getSprite = function(entity) {
	var s;
	var component = entity.getComponent("Sprite_3");
	s = component;
	if(s == null) entity.add(s = new flambe_display_Sprite());
	return s;
};
var s2_display_Units = $hxClasses["s2.display.Units"] = { __ename__ : ["s2","display","Units"], __constructs__ : ["px","percent"] };
s2_display_Units.px = ["px",0];
s2_display_Units.px.toString = $estr;
s2_display_Units.px.__enum__ = s2_display_Units;
s2_display_Units.percent = ["percent",1];
s2_display_Units.percent.toString = $estr;
s2_display_Units.percent.__enum__ = s2_display_Units;
s2_display_Units.__empty_constructs__ = [s2_display_Units.px,s2_display_Units.percent];
var s2_display_MultiTextureSprite = function(aTextures,nCols,nOverlap) {
	if(nOverlap == null) nOverlap = 0;
	flambe_display_Sprite.call(this);
	this._aTextures = aTextures;
	if(nCols == null) nCols = this._aTextures.length;
	this._nOverlap = nOverlap;
	this._nCols = nCols;
	this._nRows = Math.ceil(this._aTextures.length / this._nCols);
};
$hxClasses["s2.display.MultiTextureSprite"] = s2_display_MultiTextureSprite;
s2_display_MultiTextureSprite.__name__ = ["s2","display","MultiTextureSprite"];
s2_display_MultiTextureSprite.__super__ = flambe_display_Sprite;
s2_display_MultiTextureSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		var nRow;
		var nCol;
		var nRowY = 0;
		var nColX = 0;
		var _g1 = 0;
		var _g = this._aTextures.length;
		while(_g1 < _g) {
			var i = _g1++;
			nCol = i % this._nCols;
			nRow = Math.floor(i / this._nCols);
			if(nCol == 0 && nRow > 0) nRowY += this._aTextures[this._nCols * (nRow - 1)].get_height() - this._nOverlap * nRow;
			if(nCol == 0) nColX = 0; else nColX += this._aTextures[i - 1].get_width() - this._nOverlap * nCol;
			g.drawTexture(this._aTextures[i],nColX,nRowY);
		}
	}
	,getNaturalWidth: function() {
		var nWidth = 0;
		var _g1 = 0;
		var _g = this._nCols;
		while(_g1 < _g) {
			var i = _g1++;
			nWidth += this._aTextures[i].get_width() - this._nOverlap * i;
		}
		return nWidth;
	}
	,getNaturalHeight: function() {
		var nHeight = 0;
		var _g1 = 0;
		var _g = this._nRows;
		while(_g1 < _g) {
			var i = _g1++;
			nHeight += this._aTextures[i * this._nCols].get_height() - this._nOverlap * i;
		}
		return nHeight;
	}
	,__class__: s2_display_MultiTextureSprite
});
var s2_display_SizeSprite = function(nWidth,nHeight) {
	flambe_display_Sprite.call(this);
	this.width = nWidth;
	this.height = nHeight;
};
$hxClasses["s2.display.SizeSprite"] = s2_display_SizeSprite;
s2_display_SizeSprite.__name__ = ["s2","display","SizeSprite"];
s2_display_SizeSprite.__super__ = flambe_display_Sprite;
s2_display_SizeSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	getNaturalWidth: function() {
		return this.width;
	}
	,getNaturalHeight: function() {
		return this.height;
	}
	,__class__: s2_display_SizeSprite
});
var s2_display_SwapSprite = function(textureFront,textureBack,direction) {
	flambe_display_Sprite.call(this);
	this.progress = new flambe_animation_AnimatedFloat(0);
	flambe_util_Assert.that(textureFront.get_width() == textureBack.get_width() && textureFront.get_height() == textureBack.get_height(),"Texture widths must match.");
	this.position = 0;
	this.textureFront = textureFront;
	this.textureBack = textureBack;
	if(direction == null) direction = s2_display_SwapDirection.Left;
	if(direction != null) switch(Type.enumIndex(direction)) {
	case 0:
		this._drawFunction = $bind(this,this.left);
		break;
	case 1:
		this._drawFunction = $bind(this,this.right);
		break;
	case 2:
		this._drawFunction = $bind(this,this.top);
		break;
	case 3:
		this._drawFunction = $bind(this,this.bottom);
		break;
	default:
		this._drawFunction = $bind(this,this.left);
	} else this._drawFunction = $bind(this,this.left);
};
$hxClasses["s2.display.SwapSprite"] = s2_display_SwapSprite;
s2_display_SwapSprite.__name__ = ["s2","display","SwapSprite"];
s2_display_SwapSprite.__super__ = flambe_display_Sprite;
s2_display_SwapSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	onUpdate: function(dt) {
		this.progress.update(dt);
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
	}
	,draw: function(g) {
		this._drawFunction(g,flambe_math_FMath.clamp(this.progress.get__(),0,1));
	}
	,left: function(g,percent) {
		this.position = this.textureFront.get_width() * percent;
		g.drawTexture(this.textureBack,0,0);
		g.save();
		g.applyScissor(0,0,this.position,this.textureFront.get_height());
		g.drawTexture(this.textureFront,0,0);
		g.restore();
	}
	,right: function(g,percent) {
		this.position = this.textureFront.get_width() * (1 - percent);
		g.drawTexture(this.textureFront,0,0);
		g.save();
		g.applyScissor(0,0,this.position,this.textureFront.get_height());
		g.drawTexture(this.textureBack,0,0);
		g.restore();
	}
	,top: function(g,percent) {
		this.position = this.textureFront.get_height() * percent;
		g.drawSubTexture(this.textureFront,0,0,0,0,this.textureFront.get_width(),this.position);
		g.drawSubTexture(this.textureBack,0,this.position,0,this.position,this.textureFront.get_width(),this.textureFront.get_height() - this.position);
	}
	,bottom: function(g,percent) {
		this.position = this.textureFront.get_height() * (1 - percent);
		g.drawTexture(this.textureFront,0,0);
		g.save();
		g.applyScissor(0,0,this.textureFront.get_width(),this.position);
		g.drawTexture(this.textureBack,0,0);
		g.restore();
	}
	,getNaturalWidth: function() {
		return this.textureFront.get_width();
	}
	,getNaturalHeight: function() {
		return this.textureFront.get_height();
	}
	,__class__: s2_display_SwapSprite
});
var s2_display_SwapDirection = $hxClasses["s2.display.SwapDirection"] = { __ename__ : ["s2","display","SwapDirection"], __constructs__ : ["Left","Right","Top","Bottom"] };
s2_display_SwapDirection.Left = ["Left",0];
s2_display_SwapDirection.Left.toString = $estr;
s2_display_SwapDirection.Left.__enum__ = s2_display_SwapDirection;
s2_display_SwapDirection.Right = ["Right",1];
s2_display_SwapDirection.Right.toString = $estr;
s2_display_SwapDirection.Right.__enum__ = s2_display_SwapDirection;
s2_display_SwapDirection.Top = ["Top",2];
s2_display_SwapDirection.Top.toString = $estr;
s2_display_SwapDirection.Top.__enum__ = s2_display_SwapDirection;
s2_display_SwapDirection.Bottom = ["Bottom",3];
s2_display_SwapDirection.Bottom.toString = $estr;
s2_display_SwapDirection.Bottom.__enum__ = s2_display_SwapDirection;
s2_display_SwapDirection.__empty_constructs__ = [s2_display_SwapDirection.Left,s2_display_SwapDirection.Right,s2_display_SwapDirection.Top,s2_display_SwapDirection.Bottom];
var s2_loading_Assets = function(neededPacks,dynamicManifests,append) {
	this.totalBytes = 0;
	this.loadedBytes = 0;
	this.ready = false;
	this._retryCount = 0;
	this._isLoading = false;
	this.releaseCacheOnRemove = false;
	this._nNeeded = 0;
	this._nLoaded = 0;
	flambe_Component.call(this);
	this.progressed = new flambe_util_Signal2();
	this.success = new flambe_util_Signal0();
	this._disposer = new flambe_Disposer();
	if(append != null) this._suffix = append; else this._suffix = s2_loading_Assets.suffix;
	this._manifests = new haxe_ds_StringMap();
	this._packsReady = new haxe_ds_StringMap();
	this._packsLoading = [];
	this._queue = [];
	this.autoCacheResults = true;
	this.releaseCacheOnRemove = false;
	this._nNeeded = 0;
	this._nLoaded = 0;
	if(neededPacks != null) {
		var _g1 = 0;
		var _g = neededPacks.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.require(neededPacks[i]);
		}
	}
	if(dynamicManifests != null) {
		var $it0 = dynamicManifests.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.addManifest(dynamicManifests.get(key),key,true);
		}
	}
};
$hxClasses["s2.loading.Assets"] = s2_loading_Assets;
s2_loading_Assets.__name__ = ["s2","loading","Assets"];
s2_loading_Assets.getManifest = function(directory) {
	var manifest = null;
	if(s2_loading_Assets.suffix != null && flambe_asset_Manifest.exists(directory + "_" + s2_loading_Assets.suffix)) manifest = flambe_asset_Manifest.fromAssets(directory + "_" + s2_loading_Assets.suffix);
	manifest = flambe_asset_Manifest.fromAssets(directory);
	return s2_loading_Assets.setupManifest(manifest);
};
s2_loading_Assets.setupManifest = function(manifest) {
	if(manifest == null) manifest = new flambe_asset_Manifest(); else manifest = manifest;
	if(s2_loading_Assets.externalBase != null) manifest.set_remoteBase(s2_loading_Assets.externalBase); else if(s2_loading_Assets.relativeBase != null) manifest.set_localBase(s2_loading_Assets.relativeBase);
	return manifest;
};
s2_loading_Assets.getCached = function(key) {
	if(s2_loading_Assets._cache == null) s2_loading_Assets._cache = new haxe_ds_StringMap();
	if(s2_loading_Assets._cache.exists(key)) return s2_loading_Assets._cache.get(key);
	return null;
};
s2_loading_Assets.cache = function(key,pack) {
	if(s2_loading_Assets._cache == null) s2_loading_Assets._cache = new haxe_ds_StringMap();
	if(!s2_loading_Assets._cache.exists(key)) console.log("Caching asset pack: " + key + ". Please be sure to release it when done.");
	s2_loading_Assets._cache.set(key,pack);
};
s2_loading_Assets.release = function(key) {
	if(s2_loading_Assets._cache != null && s2_loading_Assets._cache.exists(key)) {
		var pack = s2_loading_Assets._cache.get(key);
		s2_loading_Assets._cache.remove(key);
		return pack;
	}
	console.log("WARNING: calling release on assetpack " + key + ". Does not exist.");
	return new s2_loading_NullAssetPack();
};
s2_loading_Assets.__super__ = flambe_Component;
s2_loading_Assets.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Assets_6";
	}
	,require: function(directory) {
		var suffix;
		if(this._suffix == null) suffix = ""; else suffix = "_" + this._suffix;
		if(flambe_asset_Manifest.exists(directory + suffix)) this.addManifest(flambe_asset_Manifest.fromAssets(directory + suffix),directory); else if(flambe_asset_Manifest.exists(directory)) this.addManifest(flambe_asset_Manifest.fromAssets(directory),directory); else {
			var se;
			if(this._suffix == null) se = ""; else se = " Also attempted path " + directory + suffix;
			throw new js__$Boot_HaxeError("The directory " + directory + " does not exist in the manifest." + se);
		}
		return this;
	}
	,addManifest: function(manifest,key,replace) {
		if(replace == null) replace = false;
		if(!this._manifests.exists(key) || replace) {
			this._nNeeded++;
			if(s2_loading_Assets.externalBase != null) manifest.set_remoteBase(s2_loading_Assets.externalBase); else if(s2_loading_Assets.relativeBase != null) manifest.set_localBase(s2_loading_Assets.relativeBase);
			this._manifests.set(key,manifest);
			this._queue.push(key);
		} else throw new js__$Boot_HaxeError("Asset key for manifest " + key + " already exists.");
		return this;
	}
	,load: function() {
		this.totalBytes = 0;
		this.loadedBytes = 0;
		this.ready = false;
		var $it0 = this._manifests.iterator();
		while( $it0.hasNext() ) {
			var manifest = $it0.next();
			var $it1 = manifest.iterator();
			while( $it1.hasNext() ) {
				var entry = $it1.next();
				this.totalBytes += entry.bytes;
			}
		}
		this.loadManifest(this._queue.shift());
	}
	,unload: function(key,bark) {
		if(bark == null) bark = true;
		if(Lambda.has(this._queue,key)) HxOverrides.remove(this._queue,key);
		var pack = this.get(key,bark);
		if(pack != null) {
			s2_loading_Assets.release(key);
			this._manifests.remove(key);
			pack.dispose();
		}
	}
	,loadManifest: function(key) {
		var cachedPack = s2_loading_Assets.getCached(key);
		if(cachedPack != null) {
			var value = cachedPack.get_manifest();
			this._manifests.set(key,value);
			this.onSuccess(cachedPack);
		} else {
			var promise = flambe_System.loadAssetPack(this._manifests.get(key));
			if(promise.hasResult) this.onSuccess(promise.get_result()); else {
				this._isLoading = true;
				this._packsLoading.push(promise);
				var s = promise.success.connect($bind(this,this.onSuccess)).once();
				var err = promise.error.connect($bind(this,this.onError));
				var p = promise.progressChanged.connect($bind(this,this.onProgress));
				this._currentManifest = key;
				this._disposer.add(s);
				this._disposer.add(err);
				this._disposer.add(p);
			}
		}
	}
	,onProgress: function() {
		var nLoaded = 0;
		var _g1 = 0;
		var _g = this._packsLoading.length;
		while(_g1 < _g) {
			var i = _g1++;
			nLoaded += this._packsLoading[i].get_progress();
		}
		var $it0 = this._packsReady.iterator();
		while( $it0.hasNext() ) {
			var pack = $it0.next();
			var $it1 = pack.get_manifest().iterator();
			while( $it1.hasNext() ) {
				var entry = $it1.next();
				nLoaded += entry.bytes;
			}
		}
		this.progressed.emit(nLoaded,this.totalBytes);
		this.loadedBytes = nLoaded;
	}
	,onRemoved: function() {
		if(this.releaseCacheOnRemove) {
			var keys = this._manifests.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				s2_loading_Assets.release(key);
			}
		}
		this._disposer.dispose();
		this._isLoading = false;
		this.ready = false;
		this._packsLoading = [];
		this._packsReady = new haxe_ds_StringMap();
	}
	,get: function(directory,bark) {
		if(bark == null) bark = true;
		if(this.ready) {
			var suffix;
			if(this._suffix == null) suffix = ""; else suffix = "_" + this._suffix;
			var pack = this._packsReady.get(directory + suffix);
			if(pack != null) return pack; else {
				pack = this._packsReady.get(directory);
				if(pack != null) return pack; else if(bark) throw new js__$Boot_HaxeError("Asset pack " + directory + " not part of this asset requirement."); else return null;
			}
		} else throw new js__$Boot_HaxeError("Can't get an asset pack before all packs are loaded and ready.");
	}
	,onSuccess: function(pack) {
		this._retryCount = 0;
		this._disposer.dispose();
		this._nLoaded++;
		var keys = this._manifests.keys();
		var $it0 = this._manifests.keys();
		while( $it0.hasNext() ) {
			var directory = $it0.next();
			if(this._manifests.get(directory) == pack.get_manifest()) {
				if(this.autoCacheResults) s2_loading_Assets.cache(directory,pack);
				this._packsReady.set(directory,pack);
			}
		}
		if(this._nLoaded == this._nNeeded) {
			this.progressed.emit(this.totalBytes,this.totalBytes);
			this._isLoading = false;
			this.ready = true;
			this.success.emit();
		} else {
			this._packsLoading.shift();
			this.loadManifest(this._queue.shift());
		}
	}
	,onError: function(err) {
		console.log(err);
		console.log("Error loading. Retrying pack " + this._currentManifest);
		console.log(err);
		if(this._retryCount > 3) {
			alert(err + "\nAttempted retries: " + this._retryCount);
			return;
		}
		this._disposer.dispose();
		this._retryCount++;
		this.loadManifest(this._currentManifest);
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		s2_loading_Assets._cache = null;
		this._packsReady = null;
		this._manifests = null;
		this._packsLoading = null;
		this.success = null;
		this.progressed = null;
	}
	,__class__: s2_loading_Assets
});
var s2_loading_NullAssetPack = function() {
};
$hxClasses["s2.loading.NullAssetPack"] = s2_loading_NullAssetPack;
s2_loading_NullAssetPack.__name__ = ["s2","loading","NullAssetPack"];
s2_loading_NullAssetPack.__interfaces__ = [flambe_asset_AssetPack];
s2_loading_NullAssetPack.prototype = {
	getTexture: function(name,required) {
		if(required == null) required = true;
		return null;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		return null;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		return null;
	}
	,dispose: function() {
		console.log("WARNING: Disposing a NullAssetPack.");
	}
	,get_manifest: function() {
		return null;
	}
	,__class__: s2_loading_NullAssetPack
	,__properties__: {get_manifest:"get_manifest"}
};
var s2_localization_LocaleParser = function() { };
$hxClasses["s2.localization.LocaleParser"] = s2_localization_LocaleParser;
s2_localization_LocaleParser.__name__ = ["s2","localization","LocaleParser"];
s2_localization_LocaleParser.prototype = {
	__class__: s2_localization_LocaleParser
};
var s2_localization_DParser = function() {
};
$hxClasses["s2.localization.DParser"] = s2_localization_DParser;
s2_localization_DParser.__name__ = ["s2","localization","DParser"];
s2_localization_DParser.__interfaces__ = [s2_localization_LocaleParser];
s2_localization_DParser.prototype = {
	parseFonts: function(data) {
		var fontManifest = new flambe_asset_Manifest();
		var fonts = [];
		if(Std["is"](data,Xml)) {
			var x = data;
			var section = x.firstElement().elements();
			while( section.hasNext() ) {
				var node = section.next();
				var sectionStrings = node.elements();
				while( sectionStrings.hasNext() ) {
					var node1 = sectionStrings.next();
					var fontName = node1.get("font");
					if(fonts.indexOf(fontName) == -1 && fontName != null) {
						fontManifest.add(fontName + ".fnt",fontName + ".fnt");
						fonts.push(fontName);
					}
				}
			}
		}
		return fontManifest;
	}
	,parseDefinitions: function(definitionPack) {
		var fontManifest = new flambe_asset_Manifest();
		var $it0 = definitionPack.get_manifest().iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			fontManifest.add(entry.url,entry.name);
			var file = definitionPack.getFile(entry.name).toString();
			var lastID = 0;
			do {
				var prev = lastID;
				var startID = file.indexOf("file=\"",prev);
				var endID = -1;
				if(startID > -1) {
					startID += 6;
					endID = file.indexOf("\"",startID);
					var filename = file.substring(startID,endID);
					fontManifest.add(filename.split(".")[0],filename);
				}
				lastID = endID;
			} while(lastID > -1);
			definitionPack.getFile(entry.name).dispose();
		}
		return fontManifest;
	}
	,parseStrings: function(data,pack) {
		var formats = new haxe_ds_StringMap();
		var fonts = new haxe_ds_StringMap();
		if(Std["is"](data,Xml)) {
			var x = data;
			var section = x.firstElement().elements();
			while( section.hasNext() ) {
				var node = section.next();
				var sectionStrings = node.elements();
				var parentNodeName = node.get_nodeName();
				while( sectionStrings.hasNext() ) {
					var node1 = sectionStrings.next();
					var fontName = node1.get("font");
					var font = null;
					var nScale;
					if(node1.get("fontScale") == null) nScale = 1; else nScale = Std.parseFloat(node1.get("fontScale"));
					var format = null;
					if(fontName != null) {
						if(fonts.exists(fontName)) font = fonts.get(fontName); else font = new flambe_display_Font(pack,fontName).disposeFiles();
						fonts.set(fontName,font);
					}
					format = { id : parentNodeName + "." + node1.get_nodeName(), font : font, lineHeight : Std.parseFloat(node1.get("lineHeight")), scale : nScale, text : node1.firstChild() == null?"":node1.firstChild().get_nodeValue(), offsetX : node1.get("offsetX") == null?0:Std.parseFloat(node1.get("offsetX")), offsetY : node1.get("offsetY") == null?0:Std.parseFloat(node1.get("offsetY"))};
					formats.set(format.id,format);
				}
			}
		}
		return formats;
	}
	,__class__: s2_localization_DParser
};
var s2_localization_Locale = function() { };
$hxClasses["s2.localization.Locale"] = s2_localization_Locale;
s2_localization_Locale.__name__ = ["s2","localization","Locale"];
s2_localization_Locale.init = function(onReady,parser,xmlPath,fontDirectory) {
	if(fontDirectory == null) fontDirectory = "assets/fonts";
	if(xmlPath == null) xmlPath = "xml/translation.xml";
	s2_localization_Locale._formats = new haxe_ds_StringMap();
	s2_localization_Locale._xmlPath = xmlPath;
	s2_localization_Locale._fontDirectory = fontDirectory;
	s2_localization_Locale._onReady = onReady;
	s2_localization_Locale._parser = parser;
	var manifest = new flambe_asset_Manifest();
	var sPath = xmlPath;
	if(s2_localization_Locale.externalBase != null) sPath = s2_localization_Locale.externalBase + s2_localization_Locale._xmlPath; else if(s2_localization_Locale.relativeBase != null) sPath = s2_localization_Locale.relativeBase + s2_localization_Locale._xmlPath;
	manifest.add(xmlPath,sPath);
	var loader = flambe_System.loadAssetPack(manifest);
	loader.get(s2_localization_Locale.onXmlSuccess);
};
s2_localization_Locale.getField = function(id,width,alignment) {
	if(width == null) width = 0;
	if(s2_util_Sniffer.get_mobile() && s2_localization_Locale._formats.exists(id + "_mob")) id = id + "_mob";
	if(s2_localization_Locale._formats.exists(id)) {
		var format = s2_localization_Locale._formats.get(id);
		var sprite = new flambe_display_TextSprite(format.font,format.text);
		sprite.wrapWidth.set__(width / format.scale);
		sprite.set_align(alignment);
		sprite.setScale(format.scale);
		sprite.anchorX.set__(-format.offsetX);
		sprite.anchorY.set__(-format.offsetY);
		sprite.set_pixelSnapping(false);
		return sprite;
	} else throw new js__$Boot_HaxeError("No string id : '" + id + "' exists.");
};
s2_localization_Locale.hasField = function(id) {
	return s2_localization_Locale._formats.exists(id);
};
s2_localization_Locale.getFormat = function(id) {
	if(s2_localization_Locale._formats.exists(id)) return s2_localization_Locale._formats.get(id); else throw new js__$Boot_HaxeError("No string id : '" + id + "' exists.");
};
s2_localization_Locale.onXmlSuccess = function(pack) {
	var rawFile = pack.getFile(s2_localization_Locale._xmlPath);
	s2_localization_Locale._x = Xml.parse(rawFile.toString());
	rawFile.dispose();
	var fontManifest = s2_localization_Locale.prepManifest(s2_localization_Locale._parser.parseFonts(s2_localization_Locale._x));
	var loader = flambe_System.loadAssetPack(fontManifest);
	loader.get(s2_localization_Locale.onDefinitionLoadSuccess);
};
s2_localization_Locale.onDefinitionLoadSuccess = function(pack) {
	var fontAtlas = s2_localization_Locale.prepManifest(s2_localization_Locale._parser.parseDefinitions(pack));
	var loader = flambe_System.loadAssetPack(fontAtlas);
	loader.get(s2_localization_Locale.onAtlasLoadSuccess);
};
s2_localization_Locale.prepManifest = function(manifest) {
	if(s2_localization_Locale.externalBase != null) manifest.set_remoteBase(s2_localization_Locale.externalBase + s2_localization_Locale._fontDirectory); else if(s2_localization_Locale.relativeBase != null) manifest.set_localBase(s2_localization_Locale.relativeBase + s2_localization_Locale._fontDirectory); else manifest.set_localBase(s2_localization_Locale._fontDirectory);
	return manifest;
};
s2_localization_Locale.onAtlasLoadSuccess = function(pack) {
	s2_localization_Locale._formats = s2_localization_Locale._parser.parseStrings(s2_localization_Locale._x,pack);
	var $it0 = s2_localization_Locale._formats.iterator();
	while( $it0.hasNext() ) {
		var format = $it0.next();
		var text = StringTools.replace(format.text,"<br>","\n");
		if(text != format.text) format.text = text;
	}
	s2_localization_Locale.loading = false;
	if(s2_localization_Locale._onReady != null) Reflect.callMethod(null,s2_localization_Locale._onReady,[]);
	s2_localization_Locale._onReady = null;
};
var s2_scene_BoxTransition = function(time,tilesWide,tilesHigh) {
	this._time = time;
	this._tilesWide = tilesWide;
	this._tilesHigh = tilesHigh;
	this._holder = new flambe_Entity();
};
$hxClasses["s2.scene.BoxTransition"] = s2_scene_BoxTransition;
s2_scene_BoxTransition.__name__ = ["s2","scene","BoxTransition"];
s2_scene_BoxTransition.__super__ = flambe_scene_Transition;
s2_scene_BoxTransition.prototype = $extend(flambe_scene_Transition.prototype,{
	init: function(director,from,to) {
		flambe_scene_Transition.prototype.init.call(this,director,from,to);
		this._elapsed = 0;
		this._texture = flambe_System.get_renderer().createTexture(flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height());
		flambe_display_Sprite.render(from,this._texture.get_graphics());
		this._parallel = new flambe_script_Parallel();
		var speed = .5;
		var textures = this._texture.split(this._tilesWide,this._tilesHigh);
		var _g1 = 0;
		var _g = textures.length;
		while(_g1 < _g) {
			var i = _g1++;
			var tex = textures[i];
			var sprite = new flambe_display_ImageSprite(tex);
			var box = new flambe_Entity().add(sprite.centerAnchor().setXY(tex.get_x() + tex.get_width() * 0.5,tex.get_y() + tex.get_height() * 0.5));
			this._parallel.add(new flambe_script_AnimateTo(sprite.alpha,0,Math.random() * speed));
			this._parallel.add(new flambe_script_AnimateTo(sprite.scaleX,2,Math.random() * speed));
			this._parallel.add(new flambe_script_AnimateTo(sprite.scaleY,2,Math.random() * speed));
			this._holder.addChild(box);
		}
		((function($this) {
			var $r;
			var _this = $this._holder.add(new flambe_script_Script());
			var component = $this._holder.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(this._parallel);
		director.owner.addChild(this._holder);
	}
	,update: function(dt) {
		return this._parallel.update(0,this._holder) >= 0;
	}
	,complete: function() {
		this._holder.dispose();
		this._texture.dispose();
	}
	,__class__: s2_scene_BoxTransition
});
var s2_scene_SceneLoader = function(waitForTransitions) {
	if(waitForTransitions == null) waitForTransitions = true;
	this._wait = false;
	s2_scene_AutoFillScene.call(this);
	this.waitForTransitions = waitForTransitions;
};
$hxClasses["s2.scene.SceneLoader"] = s2_scene_SceneLoader;
s2_scene_SceneLoader.__name__ = ["s2","scene","SceneLoader"];
s2_scene_SceneLoader.__super__ = s2_scene_AutoFillScene;
s2_scene_SceneLoader.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	load: function() {
		this._wait = false;
		this._loadingAssets.load();
	}
	,setNextScene: function(nextScene,unwind,transition) {
		if(unwind == null) unwind = true;
		if(this._progressBind != null) {
			this._progressBind.dispose();
			this._loadCompleteBind.dispose();
		}
		this.nextScene = nextScene;
		this._unwind = unwind;
		this._loadingAssets = new s2_loading_Assets(nextScene.requiredPacks,nextScene.dynamicManifests);
		if(transition == null) this._transition = s2_scene_Scenes.getTransition(); else this._transition = transition;
		this._progressBind = this._loadingAssets.progressed.connect($bind(this,this.onProgress));
		this._loadCompleteBind = this._loadingAssets.success.connect($bind(this,this.onLoadSuccess));
		return this;
	}
	,onProgress: function(nBytes,nTotal) {
		var nPercent = nBytes / nTotal;
		this.owner.add(new flambe_display_FillSprite(13369344,flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height()));
		if(this.owner.firstChild != null) this.owner.firstChild.dispose();
		this.owner.addChild(new flambe_Entity().add(new flambe_display_FillSprite(16777215,nPercent * flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height())));
	}
	,onLoadSuccess: function() {
		this._progressBind.dispose();
		this._loadCompleteBind.dispose();
		this.nextScene.injectAssets(this._loadingAssets);
		this._loadingAssets = null;
		if(s2_scene_Scenes.director.get_transitioning() && this.waitForTransitions) this._wait = true; else this.progressToNextScene();
	}
	,onUpdate: function(dt) {
		if(this._wait && !s2_scene_Scenes.director.get_transitioning()) this.progressToNextScene();
	}
	,progressToNextScene: function() {
		if(this._unwind) s2_scene_Scenes.director.unwindToScene(new flambe_Entity().add(this.nextScene),this._transition); else {
			s2_scene_Scenes.director.popScene();
			s2_scene_Scenes.director.pushScene(new flambe_Entity().add(this.nextScene),this._transition);
		}
		this._transition = null;
		this._wait = false;
	}
	,__class__: s2_scene_SceneLoader
});
var s2_scene_CustomPreloadScene = function(pack) {
	this._brainRect = new flambe_math_Rectangle(50,18,208,148);
	this._waveHolder = new flambe_Entity();
	this._waves = [];
	this._percent = new flambe_Entity();
	s2_scene_SceneLoader.call(this);
	this.opaque = false;
	this._pack = pack;
};
$hxClasses["s2.scene.CustomPreloadScene"] = s2_scene_CustomPreloadScene;
s2_scene_CustomPreloadScene.__name__ = ["s2","scene","CustomPreloadScene"];
s2_scene_CustomPreloadScene.__super__ = s2_scene_SceneLoader;
s2_scene_CustomPreloadScene.prototype = $extend(s2_scene_SceneLoader.prototype,{
	onAdded: function() {
		s2_scene_SceneLoader.prototype.onAdded.call(this);
		this.setBackground(new s2_display_SizeSprite(1366,768));
		var textures = [];
		var _g = 0;
		while(_g < 12) {
			var i = _g++;
			textures.push(this._pack.getTexture("fill_bg"));
		}
		var c_fill = new s2_display_MultiTextureSprite(textures,6);
		this._backing.addChild(new flambe_Entity().add(c_fill));
		var headHolder = new flambe_Entity();
		var c_headHolder = new flambe_display_Sprite();
		c_headHolder.setXY(653,249);
		headHolder.add(c_headHolder);
		this._backing.addChild(headHolder);
		var c_waveHolderHolder = new flambe_display_FillSprite(4737096,this._brainRect.width,this._brainRect.height);
		c_waveHolderHolder.setXY(this._brainRect.x,this._brainRect.y);
		c_waveHolderHolder.scissor = new flambe_math_Rectangle(0,0,this._brainRect.width,this._brainRect.height);
		var e_waveHolderHolder = new flambe_Entity().add(c_waveHolderHolder);
		headHolder.addChild(e_waveHolderHolder);
		var c_waveHolder = new flambe_display_Sprite();
		c_waveHolder.y.set__(144);
		this._waveHolder.add(c_waveHolder);
		e_waveHolderHolder.addChild(this._waveHolder);
		this.owner.add(new flambe_script_Script());
		var c_wave;
		var _g1 = 0;
		while(_g1 < 2) {
			var i1 = _g1++;
			c_wave = new flambe_display_ImageSprite(this._pack.getTexture("wave"));
			c_wave.x.set__(c_wave.getNaturalWidth() * i1);
			this._waves[i1] = new flambe_Entity().add(c_wave);
			this._waveHolder.addChild(this._waves[i1]);
		}
		this.animateWaves();
		var c_head = new flambe_display_ImageSprite(this._pack.getTexture("head"));
		var head = new flambe_Entity().add(c_head);
		headHolder.addChild(head);
		var c_vignette = new s2_display_MultiTextureSprite([this._pack.getTexture("vignette_01"),this._pack.getTexture("vignette_02")]);
		this._backing.addChild(new flambe_Entity().add(c_vignette));
		var c_bubble = new flambe_display_ImageSprite(this._pack.getTexture("bubble"));
		c_bubble.setXY(-266,34);
		var e_bubble = new flambe_Entity();
		headHolder.addChild(e_bubble.add(c_bubble));
		var c_arrows = new flambe_display_ImageSprite(this._pack.getTexture("arrows"));
		c_arrows.setXY(-28,-88);
		headHolder.addChild(new flambe_Entity().add(c_arrows));
		var c_loading = s2_localization_Locale.getField("loading.loading",0,flambe_display_TextAlign.Center);
		c_loading.setXY(132,36);
		var loading = new flambe_Entity().add(c_loading);
		e_bubble.addChild(loading);
		var c_percent = s2_localization_Locale.getField("loading.percent",0,flambe_display_TextAlign.Center);
		c_percent.setXY(132,76);
		this._percent.add(c_percent);
		e_bubble.addChild(this._percent);
		this._resizeHandle = flambe_System.get_stage().resize.connect($bind(this,this.onResize));
		this.onResize();
	}
	,animateWaves: function() {
		var c_waveSprite;
		var par1 = new flambe_script_Parallel();
		var par2 = new flambe_script_Parallel();
		var seq = new flambe_script_Sequence();
		var animateTo;
		var _g1 = 0;
		var _g = this._waves.length;
		while(_g1 < _g) {
			var i = _g1++;
			c_waveSprite = Std.instance(this._waves[i].getComponent("Sprite_3"),flambe_display_ImageSprite);
			if(c_waveSprite.x.get__() <= -c_waveSprite.getNaturalWidth()) c_waveSprite.x.set__(c_waveSprite.getNaturalWidth());
			par1.add(new flambe_script_AnimateTo(c_waveSprite.x,c_waveSprite.x.get__() - c_waveSprite.getNaturalWidth(),0.8));
			par2.add(new flambe_script_AnimateTo(c_waveSprite.x,c_waveSprite.x.get__(),0.0));
		}
		seq.add(par1);
		seq.add(par2);
		var rep = new flambe_script_Repeat(seq);
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(rep);
	}
	,onProgress: function(bytesLoaded,bytesTotal) {
		var c_waveHolder;
		var component = this._waveHolder.getComponent("Sprite_3");
		c_waveHolder = component;
		var progress = Math.min(bytesLoaded / bytesTotal,1);
		var pct = Math.round(Math.min(1,progress) * 100);
		c_waveHolder.y.set__(144 - (144 + 25) * progress);
		Std.instance(this._percent.getComponent("Sprite_3"),flambe_display_TextSprite).set_text(pct + "%");
	}
	,onRemoved: function() {
		s2_scene_SceneLoader.prototype.onRemoved.call(this);
		this._resizeHandle.dispose();
	}
	,__class__: s2_scene_CustomPreloadScene
});
var s2_scene_DropTransition = function(time,tilesWide,tilesHigh) {
	this._time = time;
	this._tilesWide = tilesWide;
	this._tilesHigh = tilesHigh;
	this._holder = new flambe_Entity();
};
$hxClasses["s2.scene.DropTransition"] = s2_scene_DropTransition;
s2_scene_DropTransition.__name__ = ["s2","scene","DropTransition"];
s2_scene_DropTransition.__super__ = flambe_scene_Transition;
s2_scene_DropTransition.prototype = $extend(flambe_scene_Transition.prototype,{
	init: function(director,from,to) {
		flambe_scene_Transition.prototype.init.call(this,director,from,to);
		this._elapsed = 0;
		this._texture = flambe_System.get_renderer().createTexture(flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height());
		flambe_display_Sprite.render(from,this._texture.get_graphics());
		this._parallel = new flambe_script_Parallel();
		var textures = this._texture.split(this._tilesWide,this._tilesHigh);
		var _g1 = 0;
		var _g = textures.length;
		while(_g1 < _g) {
			var i = _g1++;
			var tex = [textures[i]];
			var sprite = new flambe_display_ImageSprite(tex[0]);
			var box = [new flambe_Entity().add(sprite.centerAnchor().setXY(tex[0].get_x() + tex[0].get_width() * 0.5,tex[0].get_y() + tex[0].get_height() * 0.5))];
			var time = Math.random() * this._time;
			this._parallel.add(new flambe_script_Sequence([new flambe_script_Delay(Math.random() * this._time * .25),new flambe_script_Parallel([new flambe_script_AnimateTo(sprite.rotation,-360 + Math.random() * 720,time,flambe_animation_Ease.quadIn),new flambe_script_AnimateTo(sprite.y,flambe_System.get_stage().get_height() + tex[0].get_height(),time,flambe_animation_Ease.quadIn)]),new flambe_script_CallFunction((function(box,tex) {
				return function() {
					box[0].dispose();
					tex[0].dispose();
				};
			})(box,tex))]));
			this._holder.addChild(box[0]);
		}
		((function($this) {
			var $r;
			var _this = $this._holder.add(new flambe_script_Script());
			var component = $this._holder.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(this._parallel);
		director.owner.addChild(this._holder);
	}
	,update: function(dt) {
		return this._parallel.update(0,this._holder) >= 0;
	}
	,complete: function() {
		this._holder.dispose();
		this._texture.dispose();
	}
	,__class__: s2_scene_DropTransition
});
var s2_scene_MovieTransition = function(movie,obscuredTime) {
	if(obscuredTime == null) obscuredTime = -1;
	if(obscuredTime < 0) this._obscured = movie.symbol.duration / 2; else this._obscured = obscuredTime;
	this._movie = movie;
	this._holder = new flambe_Entity();
};
$hxClasses["s2.scene.MovieTransition"] = s2_scene_MovieTransition;
s2_scene_MovieTransition.__name__ = ["s2","scene","MovieTransition"];
s2_scene_MovieTransition.__super__ = flambe_scene_Transition;
s2_scene_MovieTransition.prototype = $extend(flambe_scene_Transition.prototype,{
	init: function(director,from,to) {
		flambe_scene_Transition.prototype.init.call(this,director,from,to);
		var scale = Math.max(flambe_System.get_stage().get_height() / 768,flambe_System.get_stage().get_width() / 1024);
		this._holder.add(this._movie);
		this._movie.setScale(scale);
		this._movie.set_paused(false);
		this._movie.set_position(0);
		this._movie.set_paused(true);
		var sprite;
		var component = this._to.getComponent("Sprite_3");
		sprite = component;
		if(sprite == null) this._to.add(sprite = new flambe_display_Sprite());
		sprite.alpha.set__(0);
		director.owner.addChild(this._holder);
	}
	,update: function(dt) {
		this._movie.set_paused(false);
		var _g = this._movie;
		_g.set_position(_g.get_position() + dt);
		this._movie.set_paused(true);
		if(this._movie.get_position() >= this._obscured) {
			((function($this) {
				var $r;
				var component = $this._to.getComponent("Sprite_3");
				$r = component;
				return $r;
			}(this))).alpha.set__(1);
			var from;
			var component1 = this._from.getComponent("Sprite_3");
			from = component1;
			if(from == null) this._from.add(from = new flambe_display_Sprite());
			from.alpha.set__(0);
		}
		return this._movie.get_position() >= this._movie.symbol.duration;
	}
	,complete: function() {
		this._movie.set_paused(false);
		this._movie.set_position(this._movie.symbol.duration);
		this._movie.set_paused(true);
		((function($this) {
			var $r;
			var component = $this._to.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.set__(1);
		this._holder.dispose();
	}
	,__class__: s2_scene_MovieTransition
});
var s2_scene_Position = $hxClasses["s2.scene.Position"] = { __ename__ : ["s2","scene","Position"], __constructs__ : ["topRight","topLeft","topCenter","bottomRight","bottomCenter","bottomLeft","centerRight","centerCenter","centerLeft"] };
s2_scene_Position.topRight = function(vertical,horizontal,units) { var $x = ["topRight",0,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.topLeft = function(vertical,horizontal,units) { var $x = ["topLeft",1,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.topCenter = function(vertical,horizontal,units) { var $x = ["topCenter",2,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.bottomRight = function(vertical,horizontal,units) { var $x = ["bottomRight",3,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.bottomCenter = function(vertical,horizontal,units) { var $x = ["bottomCenter",4,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.bottomLeft = function(vertical,horizontal,units) { var $x = ["bottomLeft",5,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.centerRight = function(vertical,horizontal,units) { var $x = ["centerRight",6,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.centerCenter = function(vertical,horizontal,units) { var $x = ["centerCenter",7,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.centerLeft = function(vertical,horizontal,units) { var $x = ["centerLeft",8,vertical,horizontal,units]; $x.__enum__ = s2_scene_Position; $x.toString = $estr; return $x; };
s2_scene_Position.__empty_constructs__ = [];
var s2_scene_Popup = function() {
	this._positioned = false;
	this._elapsed = 0;
	this._autoHide = -1;
	this._visible = false;
	s2_scene_AutoFillScene.call(this);
	this.opaque = false;
};
$hxClasses["s2.scene.Popup"] = s2_scene_Popup;
s2_scene_Popup.__name__ = ["s2","scene","Popup"];
s2_scene_Popup.__super__ = s2_scene_AutoFillScene;
s2_scene_Popup.prototype = $extend(s2_scene_AutoFillScene.prototype,{
	highlight: function(items) {
		this._highlights = items;
		this._copies = [];
		var scratch = new flambe_math_Rectangle();
		var xy = new flambe_math_Point();
		var _g1 = 0;
		var _g = items.length;
		while(_g1 < _g) {
			var i = _g1++;
			scratch = flambe_display_Sprite.getBounds(items[i],scratch);
			xy = s2_util_Positioning.localToGlobal(items[i].parent,scratch.x,scratch.y,xy);
			xy = s2_util_Positioning.globalToLocal(this._container,xy.x,xy.y,xy);
			var wm = ((function($this) {
				var $r;
				var component = items[i].getComponent("Sprite_3");
				$r = component;
				return $r;
			}(this))).getViewMatrix();
			var scaleX = Math.sqrt(wm.m00 * wm.m00 + wm.m01 * wm.m01);
			var scaleY = Math.sqrt(wm.m10 * wm.m10 + wm.m11 * wm.m11);
			var texture = flambe_System.get_renderer().createTexture(Math.ceil(scratch.width * scaleX),Math.ceil(scratch.height * scaleY));
			texture.get_graphics().scale(scaleX,scaleY);
			texture.get_graphics().translate(-scratch.x,-scratch.y);
			flambe_display_Sprite.render(items[i],texture.get_graphics());
			var itemCopy = new flambe_Entity().add(new flambe_display_ImageSprite(texture).setXY(xy.x,xy.y));
			this._copies.push(itemCopy);
			this._container.addChild(itemCopy);
		}
		return this;
	}
	,setAutoHide: function(seconds) {
		this._autoHide = seconds;
		return this;
	}
	,clickToDismiss: function() {
		var _g = this;
		((function($this) {
			var $r;
			var component = $this.owner.getComponent("Disposer_9");
			$r = component;
			return $r;
		}(this))).connect1(((function($this) {
			var $r;
			var component1 = $this._container.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).get_pointerUp(),function(e) {
			if(_g._visible) _g.hide();
		});
		return this;
	}
	,onUpdate: function(dt) {
		if(this._visible) {
			this._elapsed += dt;
			if(this._autoHide > 0 && this._elapsed >= this._autoHide) this.hide();
		}
	}
	,addDialog: function(localizationID,position) {
		if(this._dialog != null) this._dialog.dispose();
		this._dialog = new flambe_Entity().add(s2_localization_Locale.getField(localizationID).centerAnchor());
		this._container.addChild(this._dialog);
		switch(Type.enumIndex(position)) {
		case 0:
			var units = position[4];
			var horizontal = position[3];
			var vertical = position[2];
			s2_display_LayoutUtil.right(s2_display_LayoutUtil.top(this._dialog,vertical,units),horizontal,units);
			break;
		case 1:
			var units1 = position[4];
			var horizontal1 = position[3];
			var vertical1 = position[2];
			s2_display_LayoutUtil.left(s2_display_LayoutUtil.top(this._dialog,vertical1,units1),horizontal1,units1);
			break;
		case 2:
			var units2 = position[4];
			var horizontal2 = position[3];
			var vertical2 = position[2];
			s2_display_LayoutUtil.centerX(s2_display_LayoutUtil.top(this._dialog,vertical2,units2),horizontal2,units2);
			break;
		case 3:
			var units3 = position[4];
			var horizontal3 = position[3];
			var vertical3 = position[2];
			s2_display_LayoutUtil.left(s2_display_LayoutUtil.bottom(this._dialog,vertical3,units3),horizontal3,units3);
			break;
		case 4:
			var units4 = position[4];
			var horizontal4 = position[3];
			var vertical4 = position[2];
			s2_display_LayoutUtil.centerX(s2_display_LayoutUtil.bottom(this._dialog,vertical4,units4),horizontal4,units4);
			break;
		case 5:
			var units5 = position[4];
			var horizontal5 = position[3];
			var vertical5 = position[2];
			s2_display_LayoutUtil.left(s2_display_LayoutUtil.bottom(this._dialog,vertical5,units5),horizontal5,units5);
			break;
		case 6:
			var units6 = position[4];
			var horizontal6 = position[3];
			var vertical6 = position[2];
			s2_display_LayoutUtil.right(s2_display_LayoutUtil.centerY(this._dialog,vertical6,units6),horizontal6,units6);
			break;
		case 7:
			var units7 = position[4];
			var horizontal7 = position[3];
			var vertical7 = position[2];
			s2_display_LayoutUtil.centerX(s2_display_LayoutUtil.centerY(this._dialog,vertical7,units7),horizontal7,units7);
			break;
		case 8:
			var units8 = position[4];
			var horizontal8 = position[3];
			var vertical8 = position[2];
			s2_display_LayoutUtil.left(s2_display_LayoutUtil.centerY(this._dialog,vertical8,units8),horizontal8,units8);
			break;
		}
		var prevScale = ((function($this) {
			var $r;
			var component = $this._dialog.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).scaleX.get__();
		((function($this) {
			var $r;
			var component1 = $this._dialog.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).setScale(0.2);
		((function($this) {
			var $r;
			var component2 = $this._dialog.getComponent("Sprite_3");
			$r = component2;
			return $r;
		}(this))).setAlpha(0);
		((function($this) {
			var $r;
			var _this = $this._dialog.add(new flambe_script_Script());
			var component3 = $this._dialog.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component3;
			return $r;
		}(this))).run(new flambe_script_Sequence([new flambe_script_Delay(0.1),new flambe_script_Parallel([new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component4 = $this._dialog.getComponent("Sprite_3");
			$r = component4;
			return $r;
		}(this))).alpha,1,0.2),new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component5 = $this._dialog.getComponent("Sprite_3");
			$r = component5;
			return $r;
		}(this))).scaleX,prevScale,0.8,flambe_animation_Ease.backOut),new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component6 = $this._dialog.getComponent("Sprite_3");
			$r = component6;
			return $r;
		}(this))).scaleY,prevScale,0.8,flambe_animation_Ease.backOut)])]));
		return this;
	}
	,hide: function() {
		var _g = this;
		this._visible = false;
		((function($this) {
			var $r;
			var _this = $this.owner.add(new flambe_script_Script());
			var component = $this.owner.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(new flambe_script_Sequence([new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component1 = $this._backing.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).alpha,0,0.2,flambe_animation_Ease.quadOut),new flambe_script_CallFunction(function() {
			if(_g._copies != null) {
				var ii = _g._copies.length;
				while(ii-- > 0) {
					var tex = Std.instance(_g._copies[ii].getComponent("Sprite_3"),flambe_display_ImageSprite).texture;
					_g._copies[ii].dispose();
					tex.dispose();
				}
			}
			s2_scene_Scenes.director.popScene();
		})]));
		if(this._dialog != null) ((function($this) {
			var $r;
			var _this1 = $this._dialog.add(new flambe_script_Script());
			var component2 = $this._dialog.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component2;
			return $r;
		}(this))).run(new flambe_script_Parallel([new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component3 = $this._dialog.getComponent("Sprite_3");
			$r = component3;
			return $r;
		}(this))).scaleX,0.01,0.3,flambe_animation_Ease.quadIn),new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component4 = $this._dialog.getComponent("Sprite_3");
			$r = component4;
			return $r;
		}(this))).scaleY,0.01,0.3,flambe_animation_Ease.quadIn)]));
	}
	,assetsReady: function() {
		s2_scene_AutoFillScene.prototype.assetsReady.call(this);
		this.setBackground(new flambe_display_FillSprite(0,this.__.standardWidth,this.__.standardHeight).setAlpha(0));
		this._frame = new flambe_Entity().add(new flambe_display_Sprite());
	}
	,onShown: function() {
		var _g = this;
		((function($this) {
			var $r;
			var _this = $this.owner.add(new flambe_script_Script());
			var component = $this.owner.add(new flambe_script_Script()).getComponent("Script_5");
			$r = component;
			return $r;
		}(this))).run(new flambe_script_Sequence([new flambe_script_AnimateTo(((function($this) {
			var $r;
			var component1 = $this._backing.getComponent("Sprite_3");
			$r = component1;
			return $r;
		}(this))).alpha,0.8,0.2,flambe_animation_Ease.quadOut),new flambe_script_CallFunction(function() {
			_g._visible = true;
		})]));
	}
	,__class__: s2_scene_Popup
});
var s2_scene_PreloadScene = function(pack) {
	this._loadingBar = new flambe_Entity();
	s2_scene_SceneLoader.call(this);
	this._pack = pack;
	this._width = new flambe_animation_AnimatedFloat(0);
};
$hxClasses["s2.scene.PreloadScene"] = s2_scene_PreloadScene;
s2_scene_PreloadScene.__name__ = ["s2","scene","PreloadScene"];
s2_scene_PreloadScene.__super__ = s2_scene_SceneLoader;
s2_scene_PreloadScene.prototype = $extend(s2_scene_SceneLoader.prototype,{
	assetsReady: function() {
		s2_scene_SceneLoader.prototype.assetsReady.call(this);
		var cProgress = new flambe_display_ImageSprite(this._pack.getTexture("loader_bar/progress")).centerAnchor();
		this._progress = new flambe_Entity().add(cProgress);
		this._total = new flambe_Entity().add(new flambe_display_ImageSprite(this._pack.getTexture("loader_bar/total")).centerAnchor());
		this._loadingBar.add(new flambe_display_Sprite().setXY(683,384)).addChild(this._total).addChild(this._progress);
		((function($this) {
			var $r;
			var component = $this._loadingBar.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this))).alpha.set_behavior(new flambe_animation_Sine(1,0.6,1));
		this._container.addChild(this._loadingBar);
		this._width.set__(0);
		var cWidth = cProgress.getNaturalWidth();
		cProgress.scissor = new flambe_math_Rectangle(-cWidth,0,cWidth,cProgress.getNaturalHeight());
		this._widthHandle = this._width.get_changed().connect(function(v,_) {
			cProgress.scissor.x = v - cWidth;
		});
		this.onResize();
	}
	,onResize: function() {
		s2_scene_SceneLoader.prototype.onResize.call(this);
		s2_display_LayoutUtil.centerY(s2_display_LayoutUtil.centerX(this._loadingBar));
	}
	,onProgress: function(bytesLoaded,bytesTotal) {
		var nPercent = flambe_math_FMath.clamp(bytesLoaded / bytesTotal,0,1);
		var progressSprite;
		var component = this._progress.getComponent("Sprite_3");
		progressSprite = component;
		var w = progressSprite.getNaturalWidth() * nPercent;
		this._width.animateTo(w,.2);
	}
	,onRemoved: function() {
		s2_scene_SceneLoader.prototype.onRemoved.call(this);
		this._widthHandle.dispose();
	}
	,onUpdate: function(dt) {
		s2_scene_SceneLoader.prototype.onUpdate.call(this,dt);
		this._width.update(dt);
	}
	,__class__: s2_scene_PreloadScene
});
var s2_scene_Scenes = function() { };
$hxClasses["s2.scene.Scenes"] = s2_scene_Scenes;
s2_scene_Scenes.__name__ = ["s2","scene","Scenes"];
s2_scene_Scenes.init = function(preloadScene) {
	s2_scene_Scenes.director = new flambe_scene_Director();
	s2_scene_Scenes.shown = new flambe_util_Signal0();
	flambe_System.root.addChild(new flambe_Entity().add(s2_scene_Scenes.director),false);
	s2_scene_Scenes.setPreloadScene(preloadScene != null?preloadScene:new s2_scene_SceneLoader());
};
s2_scene_Scenes.setPreloadScene = function(preloadScene) {
	s2_scene_Scenes.preloadScene = preloadScene;
};
s2_scene_Scenes["goto"] = function(SceneClass,transition,force) {
	if(transition == null) transition = s2_scene_Scenes.getTransition();
	var className = Type.getClassName(SceneClass);
	if(!force) {
		var _g = 0;
		var _g1 = s2_scene_Scenes.director.scenes;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var c = item.firstComponent;
			while(c != null) {
				if(Std["is"](c,SceneClass) && Type.getClassName(Type.getClass(c)) == className) {
					s2_scene_Scenes.director.unwindToScene(item,transition);
					return;
				}
				c = c.next;
			}
		}
	}
	var scene = s2_scene_Scenes.checkForPreload(Type.createInstance(SceneClass,[]),true,transition);
	s2_scene_Scenes.director.unwindToScene(scene,transition);
};
s2_scene_Scenes.checkForPreload = function(scene,unwind,transition) {
	if(unwind == null) unwind = true;
	if(s2_scene_Scenes._shownBind != null) s2_scene_Scenes._shownBind.dispose();
	s2_scene_Scenes._shownBind = scene.shown.connect(function() {
		s2_scene_Scenes.shown.emit();
	});
	s2_scene_Scenes._shownBind.once();
	if(Std["is"](scene,s2_scene_BaseScene)) {
		var packs;
		packs = (js_Boot.__cast(scene , s2_scene_BaseScene)).requiredPacks;
		var _g = 0;
		while(_g < packs.length) {
			var pack = packs[_g];
			++_g;
			if(s2_loading_Assets.getCached(pack) == null) {
				s2_scene_Scenes.preloadScene.setNextScene(js_Boot.__cast(scene , s2_scene_BaseScene),unwind,transition);
				s2_scene_Scenes.preloadScene.load();
				return new flambe_Entity().add(s2_scene_Scenes.preloadScene);
			}
		}
		var manifests;
		manifests = (js_Boot.__cast(scene , s2_scene_BaseScene)).dynamicManifests;
		var $it0 = manifests.keys();
		while( $it0.hasNext() ) {
			var manifestId = $it0.next();
			if(s2_loading_Assets.getCached(manifestId) == null) {
				s2_scene_Scenes.preloadScene.setNextScene(js_Boot.__cast(scene , s2_scene_BaseScene),unwind,transition);
				s2_scene_Scenes.preloadScene.load();
				return new flambe_Entity().add(s2_scene_Scenes.preloadScene);
			}
		}
		var assets = new s2_loading_Assets(packs,manifests);
		assets.load();
		(js_Boot.__cast(scene , s2_scene_BaseScene)).injectAssets(assets);
	}
	return new flambe_Entity().add(scene);
};
s2_scene_Scenes.push = function(SceneClass,transition) {
	if(transition != null) transition = transition; else transition = s2_scene_Scenes.getTransition();
	var scene = s2_scene_Scenes.checkForPreload(Type.createInstance(SceneClass,[]),false,transition);
	s2_scene_Scenes.director.pushScene(scene,transition);
};
s2_scene_Scenes.defaultTransition = function(newDefault) {
	s2_scene_Scenes._defaultTransition = newDefault;
};
s2_scene_Scenes.getTransition = function() {
	return s2_scene_Scenes._defaultTransition;
};
var s2_scene_SwapPreloadScene = function(pack,onName,offName,direction) {
	if(offName == null) offName = "loading_off";
	if(onName == null) onName = "loading_on";
	s2_scene_SceneLoader.call(this,false);
	this._pack = pack;
	this._onName = onName;
	this._offName = offName;
	if(direction == null) this._dir = s2_display_SwapDirection.Left; else this._dir = direction;
};
$hxClasses["s2.scene.SwapPreloadScene"] = s2_scene_SwapPreloadScene;
s2_scene_SwapPreloadScene.__name__ = ["s2","scene","SwapPreloadScene"];
s2_scene_SwapPreloadScene.__super__ = s2_scene_SceneLoader;
s2_scene_SwapPreloadScene.prototype = $extend(s2_scene_SceneLoader.prototype,{
	assetsReady: function() {
		s2_scene_SceneLoader.prototype.assetsReady.call(this);
		var ps = new s2_display_SwapSprite(this._pack.getTexture(this._onName),this._pack.getTexture(this._offName),this._dir);
		this._progress = new flambe_Entity().add(ps.setXY(47,42));
		ps.alpha.set_behavior(new flambe_animation_Sine(1,0.8,0.4));
		this._text = new flambe_Entity().add(s2_localization_Locale.getField("loading.loading").centerAnchor());
		this._container.addChild(this._text).addChild(this._progress);
	}
	,onResize: function() {
		s2_scene_SceneLoader.prototype.onResize.call(this);
		s2_display_LayoutUtil.centerY(s2_display_LayoutUtil.centerX(this._progress));
		s2_display_LayoutUtil.centerY(s2_display_LayoutUtil.centerX(this._text),-50);
	}
	,onProgress: function(bytesLoaded,bytesTotal) {
		(js_Boot.__cast((function($this) {
			var $r;
			var component = $this._progress.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this)) , s2_display_SwapSprite)).progress.animateTo(bytesLoaded / bytesTotal,0.1);
	}
	,onLoadSuccess: function() {
		(js_Boot.__cast((function($this) {
			var $r;
			var component = $this._progress.getComponent("Sprite_3");
			$r = component;
			return $r;
		}(this)) , s2_display_SwapSprite)).progress.set__(1);
		s2_scene_SceneLoader.prototype.onLoadSuccess.call(this);
	}
	,onRemoved: function() {
		s2_scene_SceneLoader.prototype.onRemoved.call(this);
	}
	,dispose: function() {
		s2_scene_SceneLoader.prototype.dispose.call(this);
	}
	,__class__: s2_scene_SwapPreloadScene
});
var s2_sound_MusicManager = function() { };
$hxClasses["s2.sound.MusicManager"] = s2_sound_MusicManager;
s2_sound_MusicManager.__name__ = ["s2","sound","MusicManager"];
s2_sound_MusicManager.__properties__ = {get_muted:"get_muted",set_volume:"set_volume"}
s2_sound_MusicManager.stop = function() {
	if(s2_sound_MusicManager.bgLoop != null) {
		s2_sound_MusicManager.bgLoop.dispose();
		s2_sound_MusicManager.bgLoop = null;
	}
	if(s2_sound_MusicManager._audioTag != null) s2_sound_MusicManager._audioTag.pause();
};
s2_sound_MusicManager.loopSoundStandard = function(pack,path,volume) {
	s2_sound_MusicManager._volume = volume;
	if(s2_sound_MusicManager.bgLoop == null || s2_sound_MusicManager.bgLoop.get_sound() != pack.getSound(path)) {
		if(s2_sound_MusicManager.bgLoop != null) s2_sound_MusicManager.bgLoop.dispose();
		s2_sound_MusicManager.bgLoop = pack.getSound(path).loop(s2_sound_MusicManager.get_muted().get__()?0:s2_sound_MusicManager._volume);
	} else if(s2_sound_MusicManager.bgLoop != null) s2_sound_MusicManager.bgLoop.volume.animateTo(s2_sound_MusicManager.get_muted().get__()?0:s2_sound_MusicManager._volume,0.2);
};
s2_sound_MusicManager.set_volume = function(value) {
	s2_sound_MusicManager._volume = value;
	if(s2_sound_MusicManager._audioTag != null && !s2_sound_MusicManager.get_muted().get__()) s2_sound_MusicManager._audioTag.volume = s2_sound_MusicManager._volume * flambe_System.volume.get__(); else if(s2_sound_MusicManager.bgLoop != null && !s2_sound_MusicManager.get_muted().get__()) s2_sound_MusicManager.bgLoop.volume.animateTo(s2_sound_MusicManager._volume,0.2);
	return s2_sound_MusicManager._volume;
};
s2_sound_MusicManager.get_muted = function() {
	if(s2_sound_MusicManager._muted == null) s2_sound_MusicManager._muted = new flambe_util_Value(false,s2_sound_MusicManager.onMuteChange);
	return s2_sound_MusicManager._muted;
};
s2_sound_MusicManager.onMuteChange = function(isMuted,_) {
	console.log("Mute change " + Std.string(isMuted));
	if(s2_sound_MusicManager._audioTag != null) {
		s2_sound_MusicManager._audioTag.muted = isMuted;
		if(isMuted) s2_sound_MusicManager._audioTag.volume = 0; else s2_sound_MusicManager._audioTag.volume = s2_sound_MusicManager._volume * flambe_System.volume.get__();
	} else if(s2_sound_MusicManager.bgLoop != null) s2_sound_MusicManager.bgLoop.volume.set__(isMuted?0:s2_sound_MusicManager._volume);
};
var s2_util_Coords = function(standardWidth,standardHeight,newWidth,newHeight) {
	this.standardWidth = standardWidth;
	this.standardHeight = standardHeight;
	this.newWidth = newWidth;
	this.newHeight = newHeight;
	this.scaleX = newWidth / standardWidth;
	this.scaleY = newHeight / standardHeight;
	this.minScale = Math.min(this.scaleX,this.scaleY);
	this.maxScale = Math.max(this.scaleX,this.scaleY);
};
$hxClasses["s2.util.Coords"] = s2_util_Coords;
s2_util_Coords.__name__ = ["s2","util","Coords"];
s2_util_Coords.prototype = {
	x: function(value) {
		return value * this.scaleX;
	}
	,y: function(value) {
		return value * this.scaleY;
	}
	,__class__: s2_util_Coords
};
var s2_util_PathUtil = function() { };
$hxClasses["s2.util.PathUtil"] = s2_util_PathUtil;
s2_util_PathUtil.__name__ = ["s2","util","PathUtil"];
s2_util_PathUtil.absoluteToRelative = function(startPath,otherPath) {
	console.log("Start Path: " + startPath + " - end path: " + otherPath);
	if(s2_util_PathUtil.sameDomain(startPath,otherPath)) {
		var path1 = StringTools.replace(StringTools.replace(startPath,"http://",""),"https://","").split("/");
		var path2 = StringTools.replace(StringTools.replace(otherPath,"http://",""),"https://","").split("/");
		var host1 = path1.shift();
		var host2 = path2.shift();
		if(path1[path1.length - 1] == "") path1.pop();
		var i = 0;
		var end = Math.floor(Math.min(path1.length,path2.length));
		while(i++ < end) if(path1[0] == path2[0]) {
			path1.splice(0,1);
			path2.splice(0,1);
		} else i = end + 1;
		var sRelative = "";
		i = path1.length;
		console.log("Path1 length: " + i);
		while(i-- > 0) sRelative += "../";
		console.log("Relative path: " + sRelative + path2.join("/"));
		return sRelative + path2.join("/");
	}
	return null;
};
s2_util_PathUtil.sameDomain = function(path1,path2) {
	var host1 = s2_util_PathUtil.getHost(path1);
	var host2 = s2_util_PathUtil.getHost(path2);
	if(host1 != null && host2 != null && host1 == host2) return true;
	return false;
};
s2_util_PathUtil.getHost = function(path) {
	if(StringTools.startsWith(path,"http://") || StringTools.startsWith(path,"https://")) return StringTools.replace(StringTools.replace(path,"http://",""),"https://","").split("/")[0];
	return null;
};
var s2_util_Positioning = function() { };
$hxClasses["s2.util.Positioning"] = s2_util_Positioning;
s2_util_Positioning.__name__ = ["s2","util","Positioning"];
s2_util_Positioning.localToGlobal = function(entity,x,y,reuse) {
	var s;
	var component = entity.getComponent("Sprite_3");
	s = component;
	if(s != null) return s.getViewMatrix().transform(x + s.anchorX.get__(),y + s.anchorY.get__(),reuse);
	return null;
};
s2_util_Positioning.globalToLocal = function(entity,x,y,reuse) {
	var s;
	var component = entity.getComponent("Sprite_3");
	s = component;
	if(reuse == null) reuse = new flambe_math_Point(x,y); else reuse = reuse;
	if(s != null) {
		s.getViewMatrix().inverseTransform(x,y,reuse);
		reuse.x -= s.anchorX.get__();
		reuse.y -= s.anchorY.get__();
	}
	return reuse;
};
var s2_util_Sniffer = function() { };
$hxClasses["s2.util.Sniffer"] = s2_util_Sniffer;
s2_util_Sniffer.__name__ = ["s2","util","Sniffer"];
s2_util_Sniffer.__properties__ = {get_lowMemory:"get_lowMemory",get_mobile:"get_mobile"}
s2_util_Sniffer.init = function() {
	s2_util_Sniffer._userAgent = js_Browser.get_window().navigator.userAgent;
	s2_util_Sniffer._devicePixelRatio = js_Browser.get_window().devicePixelRatio;
	var ua = s2_util_Sniffer._userAgent;
	s2_util_Sniffer._uaLower = ua.toLowerCase();
	var query = s2_util_URLParser.fromBrowser().query;
	s2_util_Sniffer._nickApp = query.exists("apiKey");
	s2_util_Sniffer._iOSTablet = s2_util_Sniffer.test("iPad");
	s2_util_Sniffer._iOSPocket = s2_util_Sniffer.test("iPod") || s2_util_Sniffer.test("iPhone");
	s2_util_Sniffer._iOSChrome = s2_util_Sniffer.test("CriOS");
	s2_util_Sniffer._iOS = s2_util_Sniffer._iOSPocket || s2_util_Sniffer._iOSTablet;
	s2_util_Sniffer._silk = s2_util_Sniffer.test("Silk");
	s2_util_Sniffer._kindle = s2_util_Sniffer.test("Silk") || query.get("partner") == "amazon";
	var caseInsensitive = ["Mini","Mobile","Phone","Tablet"];
	caseInsensitive.concat(["Android","iOS"]);
	var _g = 0;
	while(_g < caseInsensitive.length) {
		var match = caseInsensitive[_g];
		++_g;
		if(s2_util_Sniffer.test(match.toLowerCase(),false)) {
			s2_util_Sniffer._mobile = true;
			break;
		}
	}
	var caseSensitive = ["ARM","BlackBerry","Palm","webOS"];
	var _g1 = 0;
	while(_g1 < caseSensitive.length) {
		var match1 = caseSensitive[_g1];
		++_g1;
		if(s2_util_Sniffer.test(match1)) {
			s2_util_Sniffer._mobile = true;
			break;
		}
	}
	s2_util_Sniffer._android = s2_util_Sniffer.test("Android",false);
	s2_util_Sniffer._androidTablet = s2_util_Sniffer._android && !s2_util_Sniffer.test("Mobile",false);
	s2_util_Sniffer._androidPocket = s2_util_Sniffer._android && s2_util_Sniffer.test("Mobile",false);
	s2_util_Sniffer._tablet = s2_util_Sniffer._androidTablet || s2_util_Sniffer._iOSTablet || s2_util_Sniffer._kindle || s2_util_Sniffer.test("ARM");
	var totalPixels = flambe_System.get_stage().get_width() * flambe_System.get_stage().get_height();
	s2_util_Sniffer._lowMemory = (totalPixels <= 706560 || (s2_util_Sniffer._iOSTablet || s2_util_Sniffer._iOSPocket) && s2_util_Sniffer._devicePixelRatio < 2) && s2_util_Sniffer._mobile;
	s2_util_Sniffer._desktop = s2_util_Sniffer.test("Macintosh") || s2_util_Sniffer.test("Linux") || s2_util_Sniffer.test("Windows") && !s2_util_Sniffer._mobile;
	s2_util_Sniffer._inited = true;
};
s2_util_Sniffer.get_mobile = function() {
	s2_util_Sniffer.assureInited();
	return s2_util_Sniffer._mobile;
};
s2_util_Sniffer.get_lowMemory = function() {
	s2_util_Sniffer.assureInited();
	return s2_util_Sniffer._lowMemory;
};
s2_util_Sniffer.assureInited = function() {
	if(!s2_util_Sniffer._inited) s2_util_Sniffer.init();
};
s2_util_Sniffer.test = function(str,caseSensitive) {
	if(caseSensitive == null) caseSensitive = true;
	if(caseSensitive) return s2_util_Sniffer._userAgent.indexOf(str) >= 0; else return s2_util_Sniffer._uaLower.indexOf(str.toLowerCase()) >= 0;
};
var s2_util_StringUtil = function() { };
$hxClasses["s2.util.StringUtil"] = s2_util_StringUtil;
s2_util_StringUtil.__name__ = ["s2","util","StringUtil"];
s2_util_StringUtil.zeroPad = function(num,size) {
	var s = num + "";
	while(s.length < size) s = "0" + s;
	return s;
};
var s2_util_TimeUtil = function() {
	this._curr = 0;
	flambe_Component.call(this);
	this._seqs = [];
};
$hxClasses["s2.util.TimeUtil"] = s2_util_TimeUtil;
s2_util_TimeUtil.__name__ = ["s2","util","TimeUtil"];
s2_util_TimeUtil.__super__ = flambe_Component;
s2_util_TimeUtil.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "TimeUtil_2";
	}
	,timeout: function(fn,seconds,params) {
		this._curr++;
		var script;
		var component = this.owner.getComponent("Script_5");
		script = component;
		if(script == null) {
			script = new flambe_script_Script();
			this.owner.add(script);
		}
		var call = function() {
			Reflect.callMethod(null,fn,params);
		};
		var seq = new flambe_script_Sequence();
		seq.add(new flambe_script_Delay(seconds));
		seq.add(new flambe_script_CallFunction(call));
		this._seqs[this._curr] = seq;
		script.run(seq);
		return this._curr;
	}
	,clear: function(id,bark) {
		if(bark == null) bark = true;
		var seq = this._seqs[id];
		if(seq == null) {
			if(bark) throw new js__$Boot_HaxeError("No timer or interval by id: " + id);
		} else {
			seq.removeAll();
			this._seqs[id] = null;
		}
	}
	,clearAll: function() {
		var _g1 = 0;
		var _g = this._seqs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._seqs[i] != null) {
				this._seqs[i].removeAll();
				this._seqs[i] = null;
			}
		}
	}
	,dispose: function() {
		flambe_Component.prototype.dispose.call(this);
		var _g1 = 0;
		var _g = this._seqs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._seqs[i] != null) this.clear(i);
		}
		this._seqs = [];
	}
	,__class__: s2_util_TimeUtil
});
var s2_util_URLParser = function(url) {
	s2_util_URLParser.init();
	this.url = url;
	this.query = new haxe_ds_StringMap();
	var r = new EReg("^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?)(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))(?:\\?([^#]*))?(?:#(.*))?)","");
	r.match(url);
	var _g1 = 0;
	var _g = s2_util_URLParser._parts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var val = r.matched(i);
		if(val != null) {
			if(s2_util_URLParser._parts[i] != "query") Reflect.setField(this,s2_util_URLParser._parts[i],val); else {
				var keyVal = val.split("&");
				var _g3 = 0;
				var _g2 = keyVal.length;
				while(_g3 < _g2) {
					var i1 = _g3++;
					var kv = keyVal[i1].split("=");
					this.query.set(kv[0],kv[1]);
				}
			}
		}
	}
};
$hxClasses["s2.util.URLParser"] = s2_util_URLParser;
s2_util_URLParser.__name__ = ["s2","util","URLParser"];
s2_util_URLParser.init = function() {
	if(s2_util_URLParser._parts == null) s2_util_URLParser._parts = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];
	return s2_util_URLParser._parts;
};
s2_util_URLParser.parse = function(url) {
	s2_util_URLParser.init();
	return new s2_util_URLParser(url);
};
s2_util_URLParser.fromBrowser = function() {
	return s2_util_URLParser.parse(Std.string(js_Browser.get_location()));
	return new s2_util_URLParser("");
};
s2_util_URLParser.prototype = {
	toString: function() {
		s2_util_URLParser.init();
		var s = "For Url -> " + this.url + "\n";
		var _g1 = 0;
		var _g = s2_util_URLParser._parts.length;
		while(_g1 < _g) {
			var i = _g1++;
			s += s2_util_URLParser._parts[i] + ": " + Std.string(Reflect.field(this,s2_util_URLParser._parts[i])) + (i == s2_util_URLParser._parts.length - 1?"":"\n");
		}
		return s;
	}
	,__class__: s2_util_URLParser
};
var s2_util_Utils = function() { };
$hxClasses["s2.util.Utils"] = s2_util_Utils;
s2_util_Utils.__name__ = ["s2","util","Utils"];
s2_util_Utils.sortArrayRandom = function(a,b) {
	if(Math.random() < .5) return 1; else return -1;
};
s2_util_Utils.runJSStatement = function(statement) {
	return flambe_System.get_external().call("eval",["(function () {return " + statement + ";})()"]);
};
s2_util_Utils.randomInt = function(max) {
	return Math.floor(Math.random() * max);
};
s2_util_Utils.setupManifest = function(manifest) {
	var nickDomains = ["nick-q.mtvi.com","nick.com"];
	var sUrl = s2_util_URLParser.fromBrowser().url;
	var bIsNickelodeon = false;
	var _g = 0;
	while(_g < nickDomains.length) {
		var domain = nickDomains[_g];
		++_g;
		if(sUrl.indexOf(domain) != -1) {
			bIsNickelodeon = false;
			break;
		}
	}
	if(bIsNickelodeon) flambesdk_BaseUtils.setupManifest(manifest); else manifest.set_localBase("assets/");
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
s2_animation_Draggable2.staticDrag = new flambe_util_Signal1();
s2_animation_Draggable2.staticPick = new flambe_util_Signal1();
s2_animation_Draggable2.staticDrop = new flambe_util_Signal1();
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
com_nick_ultimatetrivia_Option.texts = [];
com_nick_ultimatetrivia_Question.texts = [];
com_nick_ultimatetrivia_components_Brain._brainXY = new flambe_math_Point(606,141);
com_nick_ultimatetrivia_components_Brain._sizeOrder = [[5,3,4,1,2,0,6],[5,0,6,3,2,4,1],[6,2,3,4,0,5,1]];
com_nick_ultimatetrivia_components_Brain.assetIds = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.set("lines",null);
	_g.set("fills",null);
	_g.set("empty",null);
	$r = _g;
	return $r;
}(this));
s2_ui_BasicButton.staticOffsetX = 1;
s2_ui_BasicButton.staticOffsetY = 1;
s2_ui_BasicButton.staticMinScale = 1.0;
s2_ui_BasicButton.staticMaxScale = 1.1;
s2_ui_TextButton.OFFSET_XY = new flambe_math_Point(-2,0);
s2_scene_AutoFillScene.NAME = "Scene_4";
s2_scene_AutoFillScene.STANDARD_WIDTH = 1366;
s2_scene_AutoFillScene.STANDARD_HEIGHT = 768;
com_nick_ultimatetrivia_scenes_BrainHubScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_InGameScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_PauseScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_QuestionScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_QuizSelectScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_QuizSelectScene.H_SPACING = 310;
com_nick_ultimatetrivia_scenes_QuizSelectScene.GROUP_SIZE = 5;
com_nick_ultimatetrivia_scenes_ResultsScene.NAME = "Scene_4";
com_nick_ultimatetrivia_scenes_TitleScene.NAME = "Scene_4";
flambe_platform_html_HtmlPlatform.instance = new flambe_platform_html_HtmlPlatform();
flambe_util_SignalBase.DISPATCHING_SENTINEL = new flambe_util_SignalConnection(null,null);
flambe_System.root = new flambe_Entity();
flambe_System.uncaughtError = new flambe_util_Signal1();
flambe_System.hidden = new flambe_util_Value(false);
flambe_System.volume = new flambe_animation_AnimatedFloat(1);
flambe_System._platform = flambe_platform_html_HtmlPlatform.instance;
flambe_System._calledInit = false;
flambe_Log.logger = flambe_System.createLogger("flambe");
flambe_asset_Manifest.__meta__ = { obj : { assets : [{ quiz_select_scene : [{ bytes : 37051, md5 : "85e175d3ef5b4e408adf739563398ff0", name : "ui/btn0.png"},{ bytes : 36670, md5 : "39add88da5c3a8df41d97f0cf4e4d423", name : "ui/btn1.png"},{ bytes : 33185, md5 : "6e9adce4989b81889ef90d74a1ef247e", name : "ui/btn2.png"},{ bytes : 33298, md5 : "3f7b3ab50ba356ea10ff796b45e72066", name : "ui/btn3.png"},{ bytes : 36218, md5 : "fa1a7a85f552de724c3c0432924896ec", name : "ui/btn4.png"},{ bytes : 1725, md5 : "74f3af841bd3ab057a30502ad0c292fe", name : "ui/btn_lt.png"},{ bytes : 1811, md5 : "88ef4409621c2e83dfa0cdd434f86e7b", name : "ui/btn_rt.png"},{ bytes : 3228, md5 : "53e2792b3ad61dd94824cb7f275b23b5", name : "ui/coin.png"}], assets_t_jokes : [{ bytes : 19839, md5 : "67394bf6d6045220ef8c6dd82f56d7ee", name : "dr_colosso_laugh.mp3"},{ bytes : 33024, md5 : "5a6213a4f0181ea2b4eb5e61e17990cc", name : "dr_colosso_laugh.ogg"},{ bytes : 52719, md5 : "8cce2a18248fe23a958025642ecca625", name : "sanjay_laugh_2.mp3"},{ bytes : 107694, md5 : "bd1d743976a472283a4666fa8196e1bf", name : "sanjay_laugh_2.ogg"},{ bytes : 58482, md5 : "0b1c80b533d9d0f9d8fbabdbcd631435", name : "squidward_snarky_laugh_2.mp3"},{ bytes : 142459, md5 : "c6217d4476f7dd405ae822b0ad79dc8c", name : "squidward_snarky_laugh_2.ogg"}], assets_t_transportation : [{ bytes : 23074, md5 : "feec3ac9ce2322b0b7208e8f90c06669", name : "cats_pink_bike.png"}], assets_t_shows_within_shows : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_color : [{ bytes : 9015, md5 : "6a770986efa19b7a5f433c71439b5345", name : "cosmo.png"},{ bytes : 13123, md5 : "9b2abd42595f7d44996b87d0c032e760", name : "girls1.png"},{ bytes : 11434, md5 : "67f574d8a5266e9b88fd795a76afd5c2", name : "girls2.png"},{ bytes : 6233, md5 : "73874b290f4aade1e935a9b427888d0d", name : "girls3.png"},{ bytes : 10263, md5 : "7312e82b561ba0018d50452d8d8f6b39", name : "girls4.png"},{ bytes : 9220, md5 : "7d2c7411bc3a475cc85e19c520c44fec", name : "katara.png"},{ bytes : 12761, md5 : "0a227f56af303450b8c3233a8c57f452", name : "leonardo.png"},{ bytes : 18154, md5 : "d9334c7535abceaf801b90e7997b8451", name : "noah_carver.png"}], assets_p_tmnt : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], pause_scene : [{ bytes : 12131, md5 : "3bcb6377afc9cada3aaf2e48f208a5ad", name : "btn.png"},{ bytes : 10174, md5 : "1c193bf94d076902ea6f0b7d0dc3e94c", name : "btn_home.png"},{ bytes : 10675, md5 : "a551f3d7c8478955c114bf949c0cabe0", name : "btn_resume.png"},{ bytes : 5172, md5 : "44931618cd7fc64cc1b0c256649beeb9", name : "panel.png"},{ bytes : 59389, md5 : "a66715e8805c90fb33bce997c4e8446d", name : "sfx/pause.mp3"},{ bytes : 96205, md5 : "def14cd30f9361a7aafb0a91a95569cd", name : "sfx/pause.ogg"},{ bytes : 1359, md5 : "4daa0c4ed92510be7b37c8bf033f2ba9", name : "sound_off.png"},{ bytes : 1391, md5 : "d46b28313251fb9a9133888f44f64928", name : "sound_on.png"}], assets_p_henry_danger : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_animals : [{ bytes : 29196, md5 : "999150d2e1d0084d11c332fb4856bc03", name : "craig_burp.mp3"},{ bytes : 34396, md5 : "18f8eeb5fa8df56a2069df85980948db", name : "craig_burp.ogg"},{ bytes : 16169, md5 : "8c96919a610a1f4d182e6717fb3a3227", name : "iroh1.png"},{ bytes : 6813, md5 : "4ca707960136225692d869021636be38", name : "iroh2.png"},{ bytes : 9006, md5 : "31c4bd7ba47a1d260a70f639bf1b722d", name : "iroh3.png"},{ bytes : 5924, md5 : "69c6d636a57a11a3e896bb83e9b3c1f4", name : "iroh4.png"},{ bytes : 58974, md5 : "71da3078b0e0d026abacbb0d2754688e", name : "pabu_squeek.mp3"},{ bytes : 86190, md5 : "23295cc8c50d3a80a49c201690679e31", name : "pabu_squeek.ogg"},{ bytes : 5047, md5 : "7bb788d76d8357d23193346cfcc508e0", name : "spike.png"},{ bytes : 8679, md5 : "e9385494e352efe61672efb60e336de8", name : "spunky.png"}], assets_p_nrdd : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_p_sam_and_cat : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_letter_r : [{ bytes : 12267, md5 : "9a8661fe4fd0a0c41644af09bdd5a14d", name : "baby_richard.png"},{ bytes : 6082, md5 : "2c05e5e04ee04e3935270d0aef348e8b", name : "samurai_red_ranger.png"}], assets_t_events : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_big_things : [{ bytes : 19386, md5 : "5b970c230c7cd7f5b7e69adaed63bb06", name : "fogbark_monster.png"},{ bytes : 38745, md5 : "3711d43ee71e5afd55c7304bd6e1fbe9", name : "goomer.png"},{ bytes : 42681, md5 : "a8054459cd13c1a95a4f02b47d604eb5", name : "mtbikinibottom.png"},{ bytes : 19859, md5 : "dce980dcd89491e7363e59606b0636f3", name : "naga.png"}], global : [{ bytes : 269, md5 : "9c8f953f80d1a1c1c2e4bfd868b6d2ae", name : "confetti/confetti_0.png"},{ bytes : 291, md5 : "588e651aaae7a52496ca6234be6824f3", name : "confetti/confetti_1.png"},{ bytes : 329, md5 : "71128885144156a8070ff01faeca45a1", name : "confetti/confetti_2.png"},{ bytes : 305, md5 : "7ac1cf555fafe44a6a084d0eea7e0807", name : "confetti/confetti_3.png"},{ bytes : 325, md5 : "da3d980bc14b861d569dcdaafa8c5c17", name : "confetti/confetti_4.png"},{ bytes : 25422, md5 : "9844e988db2369daa4747d77bf824437", name : "fill_bg.png"},{ bytes : 39181, md5 : "29982cf3da49496a85f56d812c0db5a1", name : "head_banner.png"},{ bytes : 18496, md5 : "fadce220a68713c3940321ceb6981b00", name : "icons/bella_bulldogs.png"},{ bytes : 6527, md5 : "177228ff63a3b08cd2b5444be75728a3", name : "icons/brain_coin.png"},{ bytes : 17777, md5 : "4908ac46ea9eabdba72c21694f477c24", name : "icons/every_witch_way.png"},{ bytes : 19395, md5 : "2280a11bd690b66310023088211215fd", name : "icons/game_shakers.png"},{ bytes : 16013, md5 : "0bc3e26c343704e8c239ba452ecd6995", name : "icons/harvey_beaks.png"},{ bytes : 20025, md5 : "17ecb47f7dbbf5862e8b6c322b78b182", name : "icons/henry_danger.png"},{ bytes : 20334, md5 : "8fa83e2a2593cb96bf664843a6ba962b", name : "icons/icarly.png"},{ bytes : 15143, md5 : "ed98728462c9d8e764988b0025314e13", name : "icons/lok_atla.png"},{ bytes : 19303, md5 : "1c562217cfada4f924598a82b7723acc", name : "icons/n100_things.png"},{ bytes : 19365, md5 : "3802c9563f4cc340a27847d13cdae84d", name : "icons/nrdd.png"},{ bytes : 19617, md5 : "9793f6922088f192882d4e05fa8699de", name : "icons/pr_dino_charge.png"},{ bytes : 19643, md5 : "fb99840cb987a306d8c8243b949af4a6", name : "icons/pr_megaforce.png"},{ bytes : 18742, md5 : "800f93c8cbd2ea55a6353a40bfbfcafd", name : "icons/sam_and_cat.png"},{ bytes : 14310, md5 : "a9aded731a9391a32e90f8da95b75b92", name : "icons/spongebob.png"},{ bytes : 19737, md5 : "07cc20cf3bee60a7b8402aeef2befda3", name : "icons/tmnt.png"},{ bytes : 20291, md5 : "8caec729fb1a39ce8c540d258b18af4a", name : "icons/victorious.png"},{ bytes : 18725, md5 : "733d367d363eb502172b2ce5fc79f57c", name : "icons/wits_academy.png"},{ bytes : 7984, md5 : "c901d0fa7112d48a6491ab7a4770c3de", name : "icons_50_quizzes/icon0.png"},{ bytes : 8115, md5 : "49e2d14b42b832f657f1ac5acd80a6de", name : "icons_50_quizzes/icon1.png"},{ bytes : 8024, md5 : "ea30b9e52e5d3889d8c507c2354cd953", name : "icons_50_quizzes/icon2.png"},{ bytes : 7987, md5 : "7145adbe98c34bb5993e457f7e0f510b", name : "icons_50_quizzes/icon3.png"},{ bytes : 8060, md5 : "52ed4ad2586318743f7a42dafc857bbc", name : "icons_50_quizzes/icon4.png"},{ bytes : 16429, md5 : "e8dd0bd1d67c4d2639435b98720041a0", name : "sfx/answer_button_click.mp3"},{ bytes : 23538, md5 : "8cd0415b942e0a075d57d28594a7a3b8", name : "sfx/answer_button_click.ogg"},{ bytes : 30514, md5 : "02804aa3f69aa2cf143ef478fb337003", name : "sfx/select_quiz_button.mp3"},{ bytes : 53828, md5 : "c21fec6327c4b737efee52e72ac61ae3", name : "sfx/select_quiz_button.ogg"},{ bytes : 82672, md5 : "a09d91fb9f61a2e6180c251283f89634", name : "sfx/utg_gameplay_quiz_music_endstingerv1.mp3"},{ bytes : 101888, md5 : "972fd588a7a7ec9910bc46baac2620b0", name : "sfx/utg_gameplay_quiz_music_endstingerv1.ogg"},{ bytes : 327490, md5 : "496e699cc274f103c2a04f9c80046b87", name : "sfx/utg_gameplay_quiz_musicloopv1.mp3"},{ bytes : 448588, md5 : "b6897332335c1c694f3268e89c5c7767", name : "sfx/utg_gameplay_quiz_musicloopv1.ogg"},{ bytes : 11117, md5 : "e91aa08817b858367767bd9859ece13d", name : "ui/btn_blue.png"},{ bytes : 7118, md5 : "ddbfe5e73fa4d377f3da104381a0680b", name : "ui/btn_orange.png"},{ bytes : 12571, md5 : "da43d22867b9c8a82a8018dea82b82e9", name : "ui/btn_pink.png"},{ bytes : 8598, md5 : "5fdbfcd7e6c232b9996d729880da721f", name : "ui/confirm_button.png"},{ bytes : 3088, md5 : "67625fe488f571ec1ca425f8670c83b6", name : "ui/mute_btn.png"},{ bytes : 2701, md5 : "19a7ffb7c626a79444d93cbe8cf3e106", name : "ui/pause_btn.png"},{ bytes : 749, md5 : "3864629f52801f039198d736462d27c1", name : "ui/sound_off.png"},{ bytes : 820, md5 : "0c580c9faf249b328168429669c9acba", name : "ui/sound_on.png"},{ bytes : 55643, md5 : "ac82d1cb1cb7d91025179ea925d34b1f", name : "vignette_01.png"},{ bytes : 23245, md5 : "c69bde96e3a8b26f5f7ed9f3ba8297cb", name : "vignette_02.png"}], assets_t_first_meetings : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_anatomy : [{ bytes : 44715, md5 : "45769c23270b5bd173721e79ca0b7490", name : "ick_paw.png"},{ bytes : 15062, md5 : "4dadfbae7201ff63c72e0abbe85fe361", name : "spongebobs_leg.png"}], assets_p_spongebob : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_p_lok_atla : [{ bytes : 4839, md5 : "b50269a71d6f0cb9511a1a90b262af58", name : "bolin.png"},{ bytes : 4071, md5 : "752cfc35e42de4a21a2bf90764fa5fe8", name : "korra.png"},{ bytes : 8759, md5 : "604c85295421e024464e9be32c79d239", name : "mako.png"},{ bytes : 3700, md5 : "c1d834eed59b6510a902e5b6cb8800a3", name : "sokka.png"}], assets_t_talent : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_friends : [{ bytes : 4839, md5 : "b50269a71d6f0cb9511a1a90b262af58", name : "bolin.png"},{ bytes : 4071, md5 : "752cfc35e42de4a21a2bf90764fa5fe8", name : "korra.png"},{ bytes : 8759, md5 : "604c85295421e024464e9be32c79d239", name : "mako.png"},{ bytes : 6482, md5 : "2eaff01b8e145dfa3507fc63340cfaa0", name : "micky_ick.png"},{ bytes : 4454, md5 : "766b34a4c2428204275998d9e823322d", name : "sanjay_friends1.png"},{ bytes : 6276, md5 : "0a8071e3678bb877dc32542ef018865d", name : "sanjay_friends2.png"},{ bytes : 6424, md5 : "e9c76caa6c998f7b9b1811272ee67d56", name : "sanjay_friends3.png"},{ bytes : 4440, md5 : "6055a5b7dc302dbbb7d1843d14808181", name : "sanjay_friends4.png"},{ bytes : 3700, md5 : "c1d834eed59b6510a902e5b6cb8800a3", name : "sokka.png"}], assets_t_technology : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_smells : [{ bytes : 54061, md5 : "5937e839eb9ffac7b396ae6411468219", name : "splinters_nose.png"},{ bytes : 29252, md5 : "050ec4a8561fee5afc2c33b948c31624", name : "squidwards_nose.png"}], assets_t_secrets : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_vacations : [{ bytes : 3296, md5 : "c4333917d62cd617251dda19006a3ee2", name : "squidward_lagoon.jpg"}], assets_t_gadgets : [{ bytes : 7273, md5 : "bbb3b4e5f38a44da51325be6dad139eb", name : "aangs_staff.png"},{ bytes : 36233, md5 : "b3afacae590808d143eb316fa7b61cc2", name : "varricks_mecha_suit.png"}], assets_t_arts_crafts : [{ bytes : 37345, md5 : "540dad0b00620bd8b17b7c2973130e2b", name : "harveys_valentine.png"},{ bytes : 38405, md5 : "41afeaad43d4dbb454a690cc8a1aa9ed", name : "pheobes_sculpture.png"},{ bytes : 37968, md5 : "d2b3ea172daa1aab300196c9869de26d", name : "sams_finger_painting.png"}], brain_hub_scene : [{ bytes : 2830, md5 : "bb4eaeb527b9602806586c138155f47a", name : "arrow.png"},{ bytes : 14347, md5 : "ec0cc737ab9d42e0a048c155dcf18394", name : "btn_know_the_show.png"},{ bytes : 13721, md5 : "e183205953619df0079dc44bdb80a36f", name : "btn_nick_iq.png"},{ bytes : 13944, md5 : "498d3337d576c0a7792904b63a8ba98a", name : "btn_random.png"},{ bytes : 5882, md5 : "8e31403a6f3f2c75fa5cf1537a298902", name : "chunk_callout.png"},{ bytes : 2600, md5 : "8724aa7685aa062a4236d717d90a0076", name : "confetti.png"},{ bytes : 68861, md5 : "51506ea730967ea2b4e4616f9a13efd6", name : "lib/atlas0.png"},{ bytes : 39649, md5 : "ec4986f3a632a7ac6f1814b23c8da889", name : "lib/atlas1.png"},{ bytes : 9051, md5 : "227b729360bdbdb946d085dbcbab09db", name : "lib/atlas2.png"},{ bytes : 177172, md5 : "13f4f7dded17ae74d1519ab9b6bde632", name : "lib/library.json"},{ bytes : 86742, md5 : "9edc5b695e91897b66e8967300d99c9f", name : "sfx/animations/animation_atom.mp3"},{ bytes : 213904, md5 : "77f6ade504b923416a5e6e244d109a18", name : "sfx/animations/animation_atom.ogg"},{ bytes : 99688, md5 : "a5231c6c14ed1aa88b9c378bd37e4f75", name : "sfx/animations/animation_broken_hearts.mp3"},{ bytes : 167995, md5 : "dcf33b5a4c2d5e9689f3d8e96f598fb7", name : "sfx/animations/animation_broken_hearts.ogg"},{ bytes : 150399, md5 : "a2bd12c098f82e416110b8d8bfafaa7a", name : "sfx/animations/animation_computer_chip.mp3"},{ bytes : 159451, md5 : "cc205e974c0856259ea3c37d52ecc628", name : "sfx/animations/animation_computer_chip.ogg"},{ bytes : 122695, md5 : "e966fa24ed92610624c5d89c0a6a6e63", name : "sfx/animations/animation_earring.mp3"},{ bytes : 181517, md5 : "da7e71ad1928bbde96e6564faec14c5b", name : "sfx/animations/animation_earring.ogg"},{ bytes : 133025, md5 : "6c15b532a5dbd446ddf4a9270fcdcd33", name : "sfx/animations/animation_eye_look.mp3"},{ bytes : 143733, md5 : "7c5f4023047e63c1255031bacb52e00e", name : "sfx/animations/animation_eye_look.ogg"},{ bytes : 132606, md5 : "d3b3d4c4e87353834e8ee825d5ff2b4e", name : "sfx/animations/animation_eye_projector.mp3"},{ bytes : 349148, md5 : "45bce87fe48cd2d03fbd8b40a3cd890a", name : "sfx/animations/animation_eye_projector.ogg"},{ bytes : 106933, md5 : "3cc03ce269876675885c36b948189ad1", name : "sfx/animations/animation_flex_arm.mp3"},{ bytes : 219485, md5 : "e857a2aa16c4b10e30d77ec5b179b647", name : "sfx/animations/animation_flex_arm.ogg"},{ bytes : 98644, md5 : "7d86c8feaf6b9f764f5b5b13e9a7c978", name : "sfx/animations/animation_head_hotdog.mp3"},{ bytes : 184758, md5 : "f6563466a1286a03622190bef253c1f8", name : "sfx/animations/animation_head_hotdog.ogg"},{ bytes : 141503, md5 : "4c3f75f307246df2eaca5c84aa3c6117", name : "sfx/animations/animation_head_pizza.mp3"},{ bytes : 332561, md5 : "94af897ac66157f15c3e2fe768541360", name : "sfx/animations/animation_head_pizza.ogg"},{ bytes : 99613, md5 : "a3621c5861dea373cd3eb3804fe19ee0", name : "sfx/animations/animation_head_soda.mp3"},{ bytes : 194969, md5 : "06ed9a99fabaf73e7f8b79c9c684ce61", name : "sfx/animations/animation_head_soda.ogg"},{ bytes : 86173, md5 : "c8c74b46afd8f3049a347916cd96ceb0", name : "sfx/animations/animation_hearts.mp3"},{ bytes : 218656, md5 : "e8fc92440d23c6b751849b9cc3a9641c", name : "sfx/animations/animation_hearts.ogg"},{ bytes : 104991, md5 : "dd2593aa03155ab8ebb8d3a30fc55b95", name : "sfx/animations/animation_mohawk.mp3"},{ bytes : 181011, md5 : "2e58ae8739f7a95710e05c17f41d3cf8", name : "sfx/animations/animation_mohawk.ogg"},{ bytes : 87752, md5 : "0e1b7176d65f2fae5d18e2c0ef0846a7", name : "sfx/animations/animation_monocle.mp3"},{ bytes : 155812, md5 : "48bc2faa2c0025b0e00f0a159170b848", name : "sfx/animations/animation_monocle.ogg"},{ bytes : 124707, md5 : "485f5bcffc1ee8fc2c556d7a13d93394", name : "sfx/animations/animation_music_notes.mp3"},{ bytes : 115722, md5 : "cd5d9c6f042501260cc4f2f3841c562b", name : "sfx/animations/animation_music_notes.ogg"},{ bytes : 85204, md5 : "42a6ef317d2d2dcdf0d606bcfe11b2c0", name : "sfx/animations/animation_mustache_blue.mp3"},{ bytes : 94342, md5 : "d60bb95738625c931f7ba291ebfbbbbe", name : "sfx/animations/animation_mustache_blue.ogg"},{ bytes : 85204, md5 : "42a6ef317d2d2dcdf0d606bcfe11b2c0", name : "sfx/animations/animation_mustache_brown.mp3"},{ bytes : 94342, md5 : "d60bb95738625c931f7ba291ebfbbbbe", name : "sfx/animations/animation_mustache_brown.ogg"},{ bytes : 85204, md5 : "42a6ef317d2d2dcdf0d606bcfe11b2c0", name : "sfx/animations/animation_mustache_purple.mp3"},{ bytes : 94342, md5 : "d60bb95738625c931f7ba291ebfbbbbe", name : "sfx/animations/animation_mustache_purple.ogg"},{ bytes : 101328, md5 : "d9de9f5e1943f75de997438bcabc21b8", name : "sfx/animations/animation_nose_stud.mp3"},{ bytes : 148006, md5 : "a9f963525cdab375b79f1f88a02d961b", name : "sfx/animations/animation_nose_stud.ogg"},{ bytes : 156095, md5 : "20bde0ce7d67c5bc6a6bcb03dc599e27", name : "sfx/animations/animation_skull_crossbones.mp3"},{ bytes : 218263, md5 : "e5d1aea02d1629076bb7a5a76768a8c8", name : "sfx/animations/animation_skull_crossbones.ogg"},{ bytes : 136283, md5 : "0fbf40b824e49cc1a97989a8ddba5b8a", name : "sfx/animations/animation_speech_balloon_exclaim.mp3"},{ bytes : 98045, md5 : "4ba42b5ee9b0aa40c03a258448face5f", name : "sfx/animations/animation_speech_balloon_exclaim.ogg"},{ bytes : 139409, md5 : "8c02a72b8a845b9a02472f7b470761c6", name : "sfx/animations/animation_speech_balloon_question.mp3"},{ bytes : 136337, md5 : "f28ec128ab5b0e57ef1424b8703155a4", name : "sfx/animations/animation_speech_balloon_question.ogg"},{ bytes : 85584, md5 : "1d5be72db7951c2a5d8ff5a1e1a4ccd2", name : "sfx/animations/animation_stink_lines.mp3"},{ bytes : 157762, md5 : "c25df53fd0d8a0dc8eb55742ba25136b", name : "sfx/animations/animation_stink_lines.ogg"},{ bytes : 12931, md5 : "dd5363173c5431453e51b5d90fcfaf2a", name : "sfx/brain_pop_up.mp3"},{ bytes : 14445, md5 : "00ae44d1e0ba2e48428731a359f65779", name : "sfx/brain_pop_up.ogg"}], assets_t_number_4 : [{ bytes : 6298, md5 : "59ce5c6416a8b458668301902a669d80", name : "nicky_ricky_dicky_dawn.png"},{ bytes : 14607, md5 : "19e854d1f6731c225cfc674f49b4038f", name : "PRDC_Bible_Battery_Green.png"},{ bytes : 8821, md5 : "0d15b5b47fd769b144d5a0cbebd966d1", name : "spongebobs_arm.png"}], assets_t_education : [{ bytes : 5619, md5 : "78a435486530eb1227aa943401c96557", name : "mrs_puff.png"}], assets_t_enemies : [{ bytes : 5274, md5 : "9657a042913b1e17c8a9badc53b07d32", name : "shredder.png"},{ bytes : 2029, md5 : "e3c7d08653f0bec8c087a609e0fa31d9", name : "squilliam.png"}], assets_t_eyebrows : [{ bytes : 20807, md5 : "0eed26aaf9890631a1a2e98a7e3641b1", name : "carly_brows.png"},{ bytes : 19346, md5 : "600f47db941ca4ac86ff6f2a8fdcafc0", name : "keepers_eyebrows.png"},{ bytes : 34467, md5 : "29147555a59f0a4f9be81466918b39ee", name : "makos_eyebrows.png"},{ bytes : 5098, md5 : "170ad3ff0139ebc03d7b01c83196386f", name : "skeeters_eyebrows.png"}], assets_t_gross : [{ bytes : 24504, md5 : "2661fb4cbbe315453d8a9af7ccb6d8ef", name : "fart_2.mp3"},{ bytes : 51018, md5 : "129713fbad6bb44536603a414da78e25", name : "fart_2.ogg"},{ bytes : 35955, md5 : "521832be318f8b5b9348e970ab141fde", name : "harveys_butt.png"},{ bytes : 51147, md5 : "a2490bdaeaa64af302a25ab437d18d09", name : "patrick_burp.mp3"},{ bytes : 134214, md5 : "a4035803ca351502a9a1e4191f2f9ff3", name : "patrick_burp.ogg"}], assets_t_green : [{ bytes : 28394, md5 : "7ff6bd5946f8a6e3195160a6473a5c63", name : "dougs_sweater.png"},{ bytes : 9471, md5 : "18c08743a635afff8dccdf173526a92f", name : "gir_dogsuit.png"},{ bytes : 6395, md5 : "eafd55da4c4ad5d27ea98eefe1859339", name : "krabs1.png"},{ bytes : 4351, md5 : "b06216cdf18ecfb8267f56cc951f712a", name : "krabs2.png"},{ bytes : 8351, md5 : "91405e84b02b98980cd4d39c9879bd00", name : "krabs3.png"},{ bytes : 9127, md5 : "5f57e676e5a237b3b0afd0fed9d07c48", name : "krabs4.png"},{ bytes : 19488, md5 : "c52505dbde8104b5e9cee0f2805d3f76", name : "raphael.png"},{ bytes : 3500, md5 : "f990c4a109f568bd7b39c290e70a3055", name : "reptar.png"},{ bytes : 31056, md5 : "1c6af0fba348f3450cae4b09374923ea", name : "super_megaforce_green_ranger.png"}], fonts : [{ bytes : 24557, md5 : "28fb2794019f837f1fb0e8a4eca4b956", name : "burbank_sm_blk_100_black.fnt"},{ bytes : 53250, md5 : "997a10b137c422d4b12459f68669eb8e", name : "burbank_sm_blk_100_black.png"},{ bytes : 24049, md5 : "f1e3c1d0b86f3da291ca40a52e6e9d68", name : "burbank_sm_blk_72_white.fnt"},{ bytes : 35641, md5 : "ae083b33e2983ce82766cc7a4c6ffd9d", name : "burbank_sm_blk_72_white.png"}], assets_t_names : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_p_game_shakers : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_family : [{ bytes : 5616, md5 : "0508c95c6a4cb901fe06f4a73bf26962", name : "angelica.png"},{ bytes : 7733, md5 : "b6ce6f8e4ea3573ae6feedd601810ac4", name : "angelicas_parents.png"},{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"},{ bytes : 7406, md5 : "8e3a7a893830f4d936a0f82327e8a066", name : "carly.png"},{ bytes : 6324, md5 : "4d4026b1fa64212c906135e1198ec1d8", name : "diego.png"},{ bytes : 3803, md5 : "9930409fd6d17767828ad6452f301294", name : "doug.png"},{ bytes : 8268, md5 : "46ce8e6a28ac5cc4c15b31a45025bfaf", name : "dougs_parents.png"},{ bytes : 8252, md5 : "39b46a2d936cf27c4d4023c02dd22937", name : "gigi.png"},{ bytes : 4519, md5 : "d2609f49658050321c46884b27d050ac", name : "harvey.png"},{ bytes : 7520, md5 : "581c26b963489e1b83d591c197ba9715", name : "harveys_parents.png"},{ bytes : 8810, md5 : "4f0fde2d853efa31e783fe780441a9a2", name : "melanie.png"},{ bytes : 7766, md5 : "8561c27f7afac50dd6d86b86bcf211ce", name : "sam.png"},{ bytes : 3687, md5 : "a0191118f5dd7f56ad91d460234c7f33", name : "sanjay.png"},{ bytes : 4633, md5 : "70279ce9b799510edd93d460f4bd95ce", name : "sanjays_parents.png"},{ bytes : 34267, md5 : "c3d527e5b2f44eba08a725140c7e4203", name : "spencer.png"},{ bytes : 7173, md5 : "6053f9205adca99902bea290633c99e8", name : "spencer2.png"},{ bytes : 7622, md5 : "1a9e1b6dd5884c9cfb2d4e050c5f4b61", name : "tori.png"},{ bytes : 8606, md5 : "15be5943e73142d06a23a37088426766", name : "trina.png"}], assets_p_wits_academy : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_music : [{ bytes : 7579, md5 : "cbfcfa31ce958f6d2ebfed7bf428d053", name : "squidwards_clarinet.png"}], assets_p_every_witch_way : [{ bytes : 610215, md5 : "fad1b144640a9045135141d82d91d96b", name : "eww_theme_song.mp3"},{ bytes : 1465081, md5 : "139b3fe37bea11c227a50cbd2a5a59e4", name : "eww_theme_song.ogg"}], bootstrap : [{ bytes : 2174, md5 : "312c018d4b3b9228f6f009a3089fd600", name : "arrows.png"},{ bytes : 1017, md5 : "1824aba7a7dbfbb277f6bb554039d2cd", name : "bubble.png"},{ bytes : 3818, md5 : "b932d8f968d7f8856d6ddb0e94f50ecc", name : "empty.m4a"},{ bytes : 288, md5 : "5b2de37068d39d45771e6ce7cf247958", name : "empty.mp3"},{ bytes : 3200, md5 : "1f63ab7ec4e9296244bd8d2cee482a47", name : "empty.ogg"},{ bytes : 25422, md5 : "9844e988db2369daa4747d77bf824437", name : "fill_bg.png"},{ bytes : 10852, md5 : "89fb36a0e6a5cca2ae25f0775edf2aff", name : "head.png"},{ bytes : 201, md5 : "11fe282a09da7d193e7dafe88ba1cc90", name : "lib/atlas0.png"},{ bytes : 650, md5 : "a58dda256b59a57e86fdd348d3f4649f", name : "lib/library.json"},{ bytes : 6685, md5 : "1e26c9417904f7f0d800ee54e965a760", name : "orientation_ipad.png"},{ bytes : 8205, md5 : "d6d14c67e7288384881634cfcbcb8970", name : "orientation_iphone.png"},{ bytes : 55643, md5 : "ac82d1cb1cb7d91025179ea925d34b1f", name : "vignette_01.png"},{ bytes : 23245, md5 : "c69bde96e3a8b26f5f7ed9f3ba8297cb", name : "vignette_02.png"},{ bytes : 442, md5 : "2cc75b4dbebcb02dcb7025fc6e8d2532", name : "wave.png"}], assets_p_pr_dino_charge : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_test1 : [{ bytes : 5822, md5 : "141a41e6d24fb3c90b00394af11b095f", name : "april1.jpg"},{ bytes : 6371, md5 : "d915d9b2167860daa4b48d591fe076a3", name : "april2.jpg"},{ bytes : 6018, md5 : "77c2f78bfbf6f3be9a848ac84480c02f", name : "april3.jpg"},{ bytes : 6307, md5 : "9015ccec29c6b460a3c7ef4aa3dc4686", name : "april4.jpg"},{ bytes : 1707302, md5 : "bb2afaca74b0da737bbeb4cfb8636374", name : "test_audio1.mp3"},{ bytes : 2323485, md5 : "20a21861761da41651a4bcd91134b2e4", name : "test_audio1.ogg"},{ bytes : 1930, md5 : "f9e73b53ae6fc857db85b0dd0b1babf2", name : "test_image1.png"},{ bytes : 20102, md5 : "1087d075e2d4d1b0caa5f3bcbb16e95b", name : "test_image_option1.png"},{ bytes : 18651, md5 : "a6f99801e7a3b1858f92f577559b06a3", name : "test_image_option2.png"},{ bytes : 17708, md5 : "ebf3a9711eda265b07dfdef828fc9495", name : "test_image_option3.png"},{ bytes : 18291, md5 : "28c71044ce8ecf902c2382028551a953", name : "test_image_option4.png"},{ bytes : 3678, md5 : "460fbf56796d9e1c9ddcae87d9bcbf5f", name : "test_option1.png"},{ bytes : 4781, md5 : "746545fd270bbdcd43af520104d36ac1", name : "test_option2.png"},{ bytes : 6343, md5 : "a874637217b60e59be2d63b97fcdabf8", name : "test_option3.png"},{ bytes : 7131, md5 : "3e80292c06515af8fc2c18c007fa1538", name : "test_option4.png"},{ bytes : 12768, md5 : "4eecf59a78d382acd462cf2bd5867d4e", name : "test_query1.png"},{ bytes : 10483, md5 : "8ea62b3a432bdc31886fdf58ca912192", name : "test_query2.png"},{ bytes : 14032, md5 : "9e27e3f778ceb266ef9d7a269c41a81b", name : "test_query3.png"},{ bytes : 11093, md5 : "3ffe02e3b0f40dfb1d404d9150ec8810", name : "test_query4.png"}], assets_t_personality : [{ bytes : 12990, md5 : "938b7bf95a60fcd2718a38ccc117aeea", name : "broccoli.png"}], brain_parts : [{ bytes : 13810, md5 : "1fbebb22c5bf35b6f0dd6f9b0b34bf52", name : "brain/1/empty0.png"},{ bytes : 13742, md5 : "cc56a348a9f74d81ce7796574ba1d8f2", name : "brain/1/empty1.png"},{ bytes : 11777, md5 : "b7d4009d44c22abb5c921fcb9b92a473", name : "brain/1/empty2.png"},{ bytes : 24695, md5 : "05fddb31533fa4a082f3e77372aede5d", name : "brain/1/empty3.png"},{ bytes : 17178, md5 : "dba1fd1e59a7cbec2f63b42c8c4379f8", name : "brain/1/empty4.png"},{ bytes : 20105, md5 : "77392c41a5aa184efe33fb548c65b607", name : "brain/1/empty5.png"},{ bytes : 9238, md5 : "880ba9a00ba7864f43dff0f85440eafc", name : "brain/1/empty6.png"},{ bytes : 135, md5 : "2621b0ff8fa4dad1c0e573791deafb51", name : "brain/1/lines0.png"},{ bytes : 941, md5 : "a802a10dbe022b38387a9f6b3701e8b4", name : "brain/1/lines1.png"},{ bytes : 744, md5 : "6cf46887a19ea33048a650beb23b79ea", name : "brain/1/lines2.png"},{ bytes : 1449, md5 : "74366a99cbf3c6efc74547e43fb9e724", name : "brain/1/lines3.png"},{ bytes : 975, md5 : "d47c2c42f27f00ea708e92cc1604fd03", name : "brain/1/lines4.png"},{ bytes : 1605, md5 : "b687aed585102323f24991197e0dbe71", name : "brain/1/lines5.png"},{ bytes : 978, md5 : "9f0e63148caac21f0427f37dac9d19f7", name : "brain/1/lines6.png"},{ bytes : 10180, md5 : "c2d09b8eb587ce7e2757206432418d2c", name : "brain/2/empty0.png"},{ bytes : 28635, md5 : "42977bf84c803e4e3cc01286c26fa01e", name : "brain/2/empty1.png"},{ bytes : 7434, md5 : "d906b228547467815e60040a928e5f67", name : "brain/2/empty2.png"},{ bytes : 10380, md5 : "0af5fee75d9c9c78e738368b7ad610ae", name : "brain/2/empty3.png"},{ bytes : 14189, md5 : "1973c9f0a12b3790158c1292a4ede444", name : "brain/2/empty4.png"},{ bytes : 12252, md5 : "522435e502b5f14fb1ce865cfd9c2c67", name : "brain/2/empty5.png"},{ bytes : 19031, md5 : "bb44e2fcdee1aa4bd86b5dbacc7f6a18", name : "brain/2/empty6.png"},{ bytes : 135, md5 : "2621b0ff8fa4dad1c0e573791deafb51", name : "brain/2/lines0.png"},{ bytes : 1367, md5 : "276c09c8b1ff8e64f201b29b1b9f8d44", name : "brain/2/lines1.png"},{ bytes : 665, md5 : "0b4ad536912bd489aa411a062138ba7d", name : "brain/2/lines2.png"},{ bytes : 832, md5 : "0d1e287ca8608bd911caea3f6efe2aa9", name : "brain/2/lines3.png"},{ bytes : 1083, md5 : "f45c09dca043ee7678c5e33bb49d75ea", name : "brain/2/lines4.png"},{ bytes : 821, md5 : "b1a0de83c3f92140b025a42d4fda5698", name : "brain/2/lines5.png"},{ bytes : 1660, md5 : "a925953f1241e33c9b3d7c297f324495", name : "brain/2/lines6.png"},{ bytes : 10489, md5 : "b27467cfabfae8aa9985eee0ca951077", name : "brain/3/empty0.png"},{ bytes : 15089, md5 : "c0435045d6b3e0c36c6d8744efb71665", name : "brain/3/empty1.png"},{ bytes : 12381, md5 : "6c85262b8c262d1584ea72395b00084b", name : "brain/3/empty2.png"},{ bytes : 10271, md5 : "33ffae873891c4444b4d4817f4d10e05", name : "brain/3/empty3.png"},{ bytes : 31395, md5 : "5651287067284027540d8f080de5c04d", name : "brain/3/empty4.png"},{ bytes : 9278, md5 : "4b98b5f922ad59e660823d36cd06ed43", name : "brain/3/empty5.png"},{ bytes : 17123, md5 : "4271b8513af612fd05a1da3f9c71ddf8", name : "brain/3/empty6.png"},{ bytes : 135, md5 : "2621b0ff8fa4dad1c0e573791deafb51", name : "brain/3/lines0.png"},{ bytes : 1043, md5 : "88812bf5ec3fcc788aead8b6c102f28e", name : "brain/3/lines1.png"},{ bytes : 685, md5 : "1dcceace3cd36686f904731df15f408c", name : "brain/3/lines2.png"},{ bytes : 135, md5 : "2621b0ff8fa4dad1c0e573791deafb51", name : "brain/3/lines3.png"},{ bytes : 1879, md5 : "1403cf1ca06b14e0906479a0f76a67b3", name : "brain/3/lines4.png"},{ bytes : 831, md5 : "04332eb6fdee6bc9ef96274c9599e506", name : "brain/3/lines5.png"},{ bytes : 1495, md5 : "736bf4c39c87856734b57899f43fd320", name : "brain/3/lines6.png"},{ bytes : 47064, md5 : "c41b508d36a1353ed23cac08d28a9e76", name : "fills/ANATOMY.jpg"},{ bytes : 43943, md5 : "4b00cb3dbd794d956666888c8cc77f9a", name : "fills/ANIMALS.jpg"},{ bytes : 48840, md5 : "a7450deb9177b54f801a82b2eadac2e5", name : "fills/ARTS_CRAFTS.jpg"},{ bytes : 44554, md5 : "4190f01aad3044008c4acccb7bed70ad", name : "fills/BABIES.jpg"},{ bytes : 79696, md5 : "06516b806a763803d8f56bc727b2a15e", name : "fills/BELLA_BULLDOGS.jpg"},{ bytes : 49497, md5 : "631d696c95155b5737e74a1628fb00a8", name : "fills/BIG_THINGS.jpg"},{ bytes : 28491, md5 : "836474cd718d65cfac28d0b4cd946ef0", name : "fills/CATCHPHRASES.jpg"},{ bytes : 61268, md5 : "a164a6ae109391c620a41ca0dbebac2f", name : "fills/CHRONOLOGY.jpg"},{ bytes : 52375, md5 : "656e356841c7b1f6b7965eb5b40c1c46", name : "fills/CLOSE_UPS.jpg"},{ bytes : 61527, md5 : "95c48da17312b1d721fdadd6a890abb9", name : "fills/CLOTHING.jpg"},{ bytes : 36822, md5 : "3bd0b67020613122048e8f0252cc043e", name : "fills/COLOR.jpg"},{ bytes : 37793, md5 : "dda3fcb88951379b54634be7a7c0b7c4", name : "fills/DANCING.jpg"},{ bytes : 53873, md5 : "d4303e94bf76dd9721a51782516be614", name : "fills/DWELLINGS.jpg"},{ bytes : 32472, md5 : "e66c4235081f45dc24963f2080853729", name : "fills/EDUCATION.jpg"},{ bytes : 59169, md5 : "af1cedf0390087bcb06de5b70e5062da", name : "fills/ENEMIES.jpg"},{ bytes : 51704, md5 : "e541b35dc31f51c8b8fe0a49243446f2", name : "fills/EVENTS.jpg"},{ bytes : 30899, md5 : "2cf6fd12e7fd7dbc33a5b60ce7cd5330", name : "fills/EVERY_WITCH_WAY.jpg"},{ bytes : 55350, md5 : "6f92a016fedda0ece60fd6b169fd48f3", name : "fills/EYEBROWS.jpg"},{ bytes : 31240, md5 : "2e2d4282bc09d43ff04998b14bac0767", name : "fills/FAMILY.jpg"},{ bytes : 21656, md5 : "d1543986cb74267a39b35935aac47852", name : "fills/FEARS.jpg"},{ bytes : 56727, md5 : "554d89cbc249c5ef4d78b1931cfc5753", name : "fills/FIGHTING.jpg"},{ bytes : 60815, md5 : "14211a6689a2e312063160f3d3409291", name : "fills/FIRST_MEETINGS.jpg"},{ bytes : 71020, md5 : "a3c9821912297fe5c6886202c5681899", name : "fills/FOOD.jpg"},{ bytes : 54294, md5 : "be5a503e9aff852f87b7d4e23d22eccf", name : "fills/FRIENDS.jpg"},{ bytes : 29495, md5 : "adf9c9687aeabee8d78d07c68000540e", name : "fills/GADGETS.jpg"},{ bytes : 38556, md5 : "1bb6df558e3f57dfa2dfb5abffde8c3f", name : "fills/GAME_SHAKERS.jpg"},{ bytes : 33773, md5 : "6243512515dc6dfb4525ca018f78d94c", name : "fills/GREEN.jpg"},{ bytes : 36981, md5 : "1de31aa7ed7c4dc357770a36adb9b918", name : "fills/GROSS.jpg"},{ bytes : 57886, md5 : "e1be720f8f22ce970993ca99d9a3351a", name : "fills/HAIR.jpg"},{ bytes : 71227, md5 : "fa6622941434969180eb142ac055ce84", name : "fills/HARVEY_BEAKS.jpg"},{ bytes : 56492, md5 : "083ea377b4f73d42b4687f0bd9138333", name : "fills/HENRY_DANGER.jpg"},{ bytes : 33718, md5 : "3431eee5c9c2d3bbe4aa42492694089a", name : "fills/ICARLY.jpg"},{ bytes : 56358, md5 : "4958dd152e7bff085b4075b486255d46", name : "fills/IMPOSSIBLE.jpg"},{ bytes : 53423, md5 : "9d54c37fb7501df50ceff3608662d877", name : "fills/JOBS.jpg"},{ bytes : 55331, md5 : "48606c06adb897a4da4f5b000b6214d1", name : "fills/JOKES.jpg"},{ bytes : 46809, md5 : "a67678f9d898ffb2fd830d96b75dcba9", name : "fills/LETTER_R.jpg"},{ bytes : 38304, md5 : "99c0c76cb8fa0b29a5f15073c116715a", name : "fills/LOK_ATLA.jpg"},{ bytes : 33860, md5 : "25149a2233654e254bace0c637f4bb3d", name : "fills/LOVE.jpg"},{ bytes : 75571, md5 : "fae96bbc15b2308d95e38b72d0c5f2f6", name : "fills/MUSIC.jpg"},{ bytes : 74184, md5 : "b70b4db8571881b258a4edfa827904bf", name : "fills/N100_THINGS.jpg"},{ bytes : 52688, md5 : "acb57112d471591ab6f78f937307a9be", name : "fills/NAMES.jpg"},{ bytes : 57291, md5 : "62c20071aabce495cc9b5dd3de40028e", name : "fills/NEIGHBORS.jpg"},{ bytes : 44296, md5 : "ab91b2fadc193932e88b6211448ebd02", name : "fills/NRDD.jpg"},{ bytes : 32964, md5 : "9b7dc4c3e1c5832b2bc7dbe017ac4374", name : "fills/NUMBER_4.jpg"},{ bytes : 35475, md5 : "98ecbd49863cd1205e15dd76ec8d9e02", name : "fills/NUMBERS.jpg"},{ bytes : 61822, md5 : "139c7238a76301a72a120a746ec770bc", name : "fills/PERSONALITY.jpg"},{ bytes : 22439, md5 : "b748869c9525079ba3b57ad16deed5d5", name : "fills/PLACES.jpg"},{ bytes : 63311, md5 : "ae4e26bf59a29cd94664861a118bcffe", name : "fills/PR_DINO_CHARGE.jpg"},{ bytes : 60048, md5 : "9df60c1130a7cae2974e3f7d817ee2d3", name : "fills/PR_MEGAFORCE.jpg"},{ bytes : 36592, md5 : "d3113f62ee31cba81fbe025028f0a183", name : "fills/QUOTES.jpg"},{ bytes : 49418, md5 : "b08480ca9e7570aa159a63f3e97bec91", name : "fills/RATHER.jpg"},{ bytes : 48776, md5 : "5f18f8fadb1f3656087540698b23c889", name : "fills/RESTAURANTS.jpg"},{ bytes : 34057, md5 : "614d9c1459599b9092d821f3bd917698", name : "fills/ROUND_STUFF.jpg"},{ bytes : 41336, md5 : "c672136c0130f637d80c4446cb050eb9", name : "fills/SAM_AND_CAT.jpg"},{ bytes : 63680, md5 : "c8fe3b0ec725eae3d5178b2cd586bc79", name : "fills/SECRETS.jpg"},{ bytes : 45200, md5 : "3dac703b6f2644d9e92f72f941830ace", name : "fills/SHOWS_WITHIN_SHOWS.jpg"},{ bytes : 50052, md5 : "be09ddf6f2b986ed2badf21852b54df6", name : "fills/SMELLS.jpg"},{ bytes : 21107, md5 : "40907c353949e2eae90af33fc956dd31", name : "fills/SPACE.jpg"},{ bytes : 52748, md5 : "df238ef4d1ebb6649398e2f1bf7a85b0", name : "fills/SPONGEBOB.jpg"},{ bytes : 47423, md5 : "010f404f85c8053308ceb2f59633ce07", name : "fills/SPORTS.jpg"},{ bytes : 51727, md5 : "e2be67e21a58cc56376f110e2f728fe5", name : "fills/TALENT.jpg"},{ bytes : 60598, md5 : "b77924e10792209f60ca0a4261d418e3", name : "fills/TECHNOLOGY.jpg"},{ bytes : 18562, md5 : "f2ad17d9dadd482a2044320e8a63dbf7", name : "fills/TEST1.jpg"},{ bytes : 42138, md5 : "9d35f48b08a9a5a5bc0ffb46aa6b4a5d", name : "fills/THEME_SONGS.jpg"},{ bytes : 37653, md5 : "06dd4d317629a38b5e73797f63a47886", name : "fills/TMNT.jpg"},{ bytes : 49916, md5 : "2e4c8328a3e7bf63396d5a56c740bad2", name : "fills/TRANSPORTATION.jpg"},{ bytes : 44367, md5 : "4f02fb6471dedec2d06003ae67762e23", name : "fills/VACATIONS.jpg"},{ bytes : 39186, md5 : "25b531d33f1feea3283636d994e0e7c4", name : "fills/VICTORIOUS.jpg"},{ bytes : 35802, md5 : "11e4613ed54736617fa960a2f75c346f", name : "fills/WITS_ACADEMY.jpg"}], assets_p_victorious : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_space : [{ bytes : 4331, md5 : "53afe1da52cf76772ca467f9101697a3", name : "kraang.png"},{ bytes : 37910, md5 : "d2020d6dc0b332006a4abecbb3b3338a", name : "mrs_wong_costume.png"},{ bytes : 36772, md5 : "e0fa71f537252619c562164f5b39f6d2", name : "prince_vekar.png"},{ bytes : 12039, md5 : "b528d962c140fad68ba5da3bb63c48c9", name : "zims_ship.png"}], assets_p_pr_megaforce : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_p_icarly : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], question_scene : [{ bytes : 6531, md5 : "991f1210df5111d6d14a00697bfc66ad", name : "audio.png"},{ bytes : 8801, md5 : "f63fad736e6a42365896359ffe02bee8", name : "frame_0.png"},{ bytes : 8212, md5 : "9863b3e89352ef029910f47b0c24406f", name : "frame_1.png"},{ bytes : 8349, md5 : "94a70089725cd6ad80da471b12c1ecb1", name : "frame_2.png"},{ bytes : 8264, md5 : "c3d89784f9b79a4b17f26b00c7ee09e3", name : "frame_3.png"},{ bytes : 128, md5 : "784af799fd25b05bbefea725c1d498d2", name : "image_option_out.png"},{ bytes : 25644, md5 : "5b5a8bedf6a10e84386c95d4f39c9a33", name : "light_burst.png"},{ bytes : 2045, md5 : "e230dfda071576935b7dd6995da05c08", name : "mark_correct.png"},{ bytes : 2249, md5 : "d577653dbeb95b71b745c4f86ef67e3d", name : "mark_incorrect.png"},{ bytes : 1146, md5 : "bb84a951f5e7b84b5cd270f9b47bdfd2", name : "matching_option.png"},{ bytes : 2835, md5 : "4a0f9e6f3aca8abcec07d7937ff63db5", name : "matching_query1.png"},{ bytes : 2829, md5 : "8d9a5096f9da45f3935fd8d1a22a46b1", name : "matching_query2.png"},{ bytes : 2790, md5 : "23f560600aa89cbbf7cff990275a9eac", name : "matching_query3.png"},{ bytes : 2872, md5 : "3ab5cd82002180d36a649b66964b3e4c", name : "matching_query4.png"},{ bytes : 2156, md5 : "c902b7f06ae03174e0b396af3839a496", name : "missing_image.png"},{ bytes : 4341, md5 : "fa071957631d2054d8456cc381366658", name : "missing_image_option.jpg"},{ bytes : 2748, md5 : "b91980b09b6f37b83dee0806585f270a", name : "missing_match_image_option.png"},{ bytes : 2748, md5 : "b91980b09b6f37b83dee0806585f270a", name : "missing_match_image_query.png"},{ bytes : 2366, md5 : "ec2e5dae3cb886496bd2c397958c6649", name : "missing_sound.png"},{ bytes : 51913, md5 : "18540acf1de0ae04b510666e3402de0e", name : "sfx/answer_alternate.mp3"},{ bytes : 135978, md5 : "e25441f462169442536ddc159c6517bd", name : "sfx/answer_alternate.ogg"},{ bytes : 73748, md5 : "07bf26abb01f364f6b6bdfe5d53ccba2", name : "sfx/answer_correct.mp3"},{ bytes : 170106, md5 : "381ae106da0bc93aedf4f312bf2dd8b6", name : "sfx/answer_correct.ogg"},{ bytes : 59588, md5 : "4fc95be3859a0b5ceb347b1a55da29e1", name : "sfx/answer_wrong.mp3"},{ bytes : 125170, md5 : "2d08a9817b88a177bb93545ce88bdf60", name : "sfx/answer_wrong.ogg"},{ bytes : 23266, md5 : "224a6956f0886081462f4a87b24e4005", name : "sfx/drag_drop_into_place.mp3"},{ bytes : 51130, md5 : "7f4c72f79c41aa44def1c4ff56ff8549", name : "sfx/drag_drop_into_place.ogg"},{ bytes : 21174, md5 : "6f61ad9e3d17bf9065c913c58976e608", name : "sfx/drag_drop_pick_up_piece.mp3"},{ bytes : 44893, md5 : "e40454280121647e452ea9dd71ab1e47", name : "sfx/drag_drop_pick_up_piece.ogg"},{ bytes : 10475, md5 : "078e1ecca3248ae839b6877bb0f33a78", name : "stat_box.png"},{ bytes : 23903, md5 : "1e2776ebcf4b7445e833baf12fba95bf", name : "ui/btns_bool/0.png"},{ bytes : 20018, md5 : "59384e3c49561516fc4e24ebbbf85457", name : "ui/btns_bool/1.png"},{ bytes : 28427, md5 : "aaa8ec088e0515890fb865d906e12c5b", name : "ui/btns_choice/0.png"},{ bytes : 26656, md5 : "5abcc037ccb01cb2dd16978c0c50c6b8", name : "ui/btns_choice/1.png"},{ bytes : 26101, md5 : "94e99b3f1918ca8bd2c20664e0827d68", name : "ui/btns_choice/2.png"},{ bytes : 24145, md5 : "87db9bed9e31c8d1414378e58ff4e882", name : "ui/btns_choice/3.png"},{ bytes : 18302, md5 : "40e998cfcc130e63b1af89134292ae68", name : "ui/btns_short/0.png"},{ bytes : 22010, md5 : "d24713dabb13c573b4900cdc470744a5", name : "ui/btns_short/1.png"},{ bytes : 21937, md5 : "d600db5458a47415ca3ad6792cc0270b", name : "ui/btns_short/2.png"},{ bytes : 18278, md5 : "995a5bb842b7676734edcdc731b6e601", name : "ui/btns_short/3.png"},{ bytes : 5460, md5 : "2625377df4f426c7f8985f503d8f020e", name : "ui/play_btn.png"}], assets_t_fighting : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_round_stuff : [{ bytes : 4835, md5 : "508df0154196a7df8ed924074161e162", name : "aang.png"},{ bytes : 3424, md5 : "f954268759b60f2d6fcb16998b918ef3", name : "harveys_head.png"},{ bytes : 5286, md5 : "b46612dc4939424cca90bff35728956a", name : "poof.png"},{ bytes : 21336, md5 : "c0e0d303d0e7b51097da6031248963a9", name : "spongebobs_eye.jpg"},{ bytes : 4117, md5 : "39f17272b899f1327dc8e0321f32df89", name : "tommy_pickles.png"}], assets_t_quotes : [{ bytes : 23505, md5 : "8b126058ac9f5a4319b8374f4d2071cc", name : "red_ranger_energize.mp3"},{ bytes : 40647, md5 : "2cc816ea1ee187aec89217aff0fae0f9", name : "red_ranger_energize.ogg"},{ bytes : 41280, md5 : "0f3142a466b68eec90e57dbe1ed60296", name : "spongebob_im_ready_im_ready.mp3"},{ bytes : 77613, md5 : "184ea3a2aae3ece2d784aee75dd3afc3", name : "spongebob_im_ready_im_ready.ogg"},{ bytes : 73131, md5 : "19f17d4adcb2c2af8996fa1b1e88d528", name : "squidward_oh_my_aching_tentacles.mp3"},{ bytes : 176794, md5 : "f413e37b55a849244de14b378fe55cb9", name : "squidward_oh_my_aching_tentacles.ogg"}], assets_t_fears : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_catchphrases : [{ bytes : 37578, md5 : "26fea3328ad4063a3fef42633ed5557e", name : "bella_shabuya.mp3"},{ bytes : 66606, md5 : "d942ceca01eb99984386b10ca594d332", name : "bella_shabuya.ogg"},{ bytes : 20865, md5 : "369a935b0fa996d7ee466821fca74f62", name : "craig_dude.mp3"},{ bytes : 34231, md5 : "dbc7c1fb5b13e6aa0e9fcddc82618583", name : "craig_dude.ogg"},{ bytes : 19833, md5 : "9c4aa27827622ecfaca3e9d106da9cdb", name : "ding_dong.mp3"},{ bytes : 21475, md5 : "a9260b7201f67cd13d5992bbfd7d383f", name : "ding_dong.ogg"},{ bytes : 24537, md5 : "441d04c7b3065b6db58b7ca929b66ee2", name : "henry_feels_good.mp3"},{ bytes : 43275, md5 : "25e26ca4f9bd6df937ff025c7b93861c", name : "henry_feels_good.ogg"},{ bytes : 35493, md5 : "075be0ca1a21e481db29195065608852", name : "mikey_boyakasha.mp3"},{ bytes : 66342, md5 : "f9c82fdf14059066e8d13fc384743322", name : "mikey_boyakasha.ogg"},{ bytes : 43208, md5 : "a35d1f21520ea7b6669b5637c7d41c70", name : "mr_turner_dinkleberg_01.mp3"},{ bytes : 56320, md5 : "28da0c02a207ae79e65189655590675b", name : "mr_turner_dinkleberg_01.ogg"},{ bytes : 58473, md5 : "81d3efadc664a627456d2acbea5a8053", name : "newt_who_said_that.mp3"},{ bytes : 122421, md5 : "acf61b567ef09357010d1dfd8460b051", name : "newt_who_said_that.ogg"},{ bytes : 31202, md5 : "1125e998e4a5f92075d3ec41ad09e21a", name : "pheobe_sweet_cheese_01.mp3"},{ bytes : 37228, md5 : "f410519b65060a3eede643acc9d69249", name : "pheobe_sweet_cheese_01.ogg"},{ bytes : 27138, md5 : "b829926dc0899bfdd27c5718f38f308c", name : "rabbids-bwah.mp3"},{ bytes : 57026, md5 : "1944fb06ed0f9327a27550888775232f", name : "rabbids-bwah.ogg"},{ bytes : 41280, md5 : "0f3142a466b68eec90e57dbe1ed60296", name : "spongebob_im_ready_im_ready.mp3"},{ bytes : 77613, md5 : "184ea3a2aae3ece2d784aee75dd3afc3", name : "spongebob_im_ready_im_ready.ogg"}], assets_t_theme_songs : [{ bytes : 92382, md5 : "138c01b0bdfc8d2ac58f6497165edb1b", name : "avatar_showtheme_stingerv1.mp3"},{ bytes : 115362, md5 : "96c186cab231e44d043466276a025206", name : "avatar_showtheme_stingerv1.ogg"},{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"},{ bytes : 308698, md5 : "feb50b78f1ebba36ee44207ffc88e50b", name : "eww_theme_song_loopv1.mp3"},{ bytes : 460866, md5 : "e46842b6aa95e2b87bb01fa0bd5cc6b0", name : "eww_theme_song_loopv1.ogg"}], assets_t_numbers : [{ bytes : 6892, md5 : "a7e82294b06e8e26b5d35548b0a5b514", name : "sandy_flower3.png"},{ bytes : 6627, md5 : "03c7238584f653749bf6efd9632fb87d", name : "sandy_flower4.png"},{ bytes : 5262, md5 : "19975534747d89e378d8c30620398d07", name : "sandy_flower5.png"},{ bytes : 4328, md5 : "7092b111c4431fecae1da799b4ac825f", name : "sandy_flowerPatrick.png"}], assets_t_babies : [{ bytes : 5921, md5 : "d1a639e958626ca642021461640a3791", name : "babies1.png"},{ bytes : 8092, md5 : "798801ab2bda34e1be374b3bd5dd7166", name : "babies2.png"},{ bytes : 6605, md5 : "3849e8f211546ee86a13e18428163888", name : "babies3.png"},{ bytes : 5541, md5 : "55a5efea3bc0464bd6f3aacc27f43883", name : "babies4.png"},{ bytes : 5002, md5 : "29194c596c2f16527d27a13b6206e5d7", name : "dill_pickles.png"}], assets_t_close_ups : [{ bytes : 6187, md5 : "695b88074023a451005bd0bfe8f35a17", name : "arnolds_hat.png"},{ bytes : 37822, md5 : "8f36ad044b135a77c56e922182b54b1a", name : "casey_hockey_stick.png"},{ bytes : 43946, md5 : "eafca659721f2d1cd657b193a96d7e67", name : "cats_hair.png"},{ bytes : 34151, md5 : "9c9c7d461c8f46a45e4f11fbf4280a3b", name : "cheese_pop.png"},{ bytes : 41178, md5 : "09022ec185a1198737e89c587c2fed04", name : "chicken_wings.png"},{ bytes : 7567, md5 : "5dceb02072a45bd01b49047b0145246c", name : "hectors_ear.png"},{ bytes : 24835, md5 : "f3d1ddd00d144794af2a8272231120d8", name : "krabby_patty.png"},{ bytes : 19109, md5 : "f35b0b6c1a8c5b190167aad79c97354f", name : "patrick.png"},{ bytes : 33560, md5 : "0f5d3446ab4133befd39d8492e3be176", name : "pink_energem.png"},{ bytes : 6454, md5 : "d2329f2d69c7d25ca93cd39389c502f6", name : "sandys_flower.png"}], assets_p_bella_bulldogs : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_dancing : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"},{ bytes : 31160, md5 : "9b01a7ac9465e43c9a1a96327461607b", name : "vijays_dancing_shoes.png"}], title_scene : [{ bytes : 26327, md5 : "9e010ed9c4aeb820a76f8addbe917ecd", name : "head.png"},{ bytes : 5921, md5 : "849c6a258608c743dd4459fb0b22c708", name : "logo.png"},{ bytes : 8918, md5 : "073ca958ecf052309838e02ba5f2cd79", name : "shards.png"},{ bytes : 18336, md5 : "2ab9bae973d96e2aaa299a914fd2a67d", name : "start_btn.png"},{ bytes : 75403, md5 : "dd99c476375e2e907001e7c7b7282838", name : "title.png"}], assets_t_sports : [{ bytes : 21039, md5 : "9beb0251e957100bb2822f030e0f7ca5", name : "casey_hockey_stick.png"}], assets_t_neighbors : [{ bytes : 12283, md5 : "59f1f63456a8f3bef044356d8b6e11fc", name : "spongebobs1.png"},{ bytes : 4401, md5 : "8e4c8c0bd159694707a0d34949a34d6c", name : "spongebobs2.png"},{ bytes : 8420, md5 : "6e579e58a179b4c1e3fdc958f42f7513", name : "spongebobs3.png"},{ bytes : 7171, md5 : "465c96c2800e1c31ed321424f07cb147", name : "spongebobs4.png"}], results_scene : [{ bytes : 1570, md5 : "05eecbaeab7accd7dfd8a249ac6fcb84", name : "number_blocks.png"},{ bytes : 130411, md5 : "4a214cb6c35c66dc8d0b77cbb9dc9329", name : "results_banner.png"},{ bytes : 646954, md5 : "e3d38961cbc21e5b1af4724d4d36fbf2", name : "snd/utg_splash_menuscreens__endscreen_musicloopv1.mp3"},{ bytes : 7830, md5 : "9e6b839f0e6e66a8f02cce5a2b1b0b8c", name : "wedge_wings.png"}], assets_t_rather : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_clothing : [{ bytes : 38680, md5 : "f95193822e369627b7e16fa3ba2fe832", name : "maddies_shoes.png"},{ bytes : 5598, md5 : "dfbc4bfa71acc5ab14ec02fa07e911db", name : "patrick_clothes.png"},{ bytes : 3753, md5 : "68e15ca08cf1ab82675d4bae2c282b53", name : "patrick_shorts.png"},{ bytes : 7007, md5 : "b699dfa11e2906ecfb4f47a09712cdb4", name : "sandy_clothes.png"},{ bytes : 2854, md5 : "6dcf406423c8a194d01618ba9b743fbf", name : "sandy_helmet.png"},{ bytes : 5728, md5 : "77bb6d1a53f1aaa5bcb233b561eeeb62", name : "squidward_clothes.png"},{ bytes : 2848, md5 : "8e94befb94ed0813255e2f5d021a7a45", name : "squidward_shirt.png"}], assets_t_places : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_p_harvey_beaks : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_love : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_jobs : [{ bytes : 5959, md5 : "d1407108837636a47289f45054ac3e55", name : "mr_krabs.png"}], assets_t_dwellings : [{ bytes : 27865, md5 : "05aa3c1408a4909d7433f332804c062b", name : "harveys_bedroom.jpg"},{ bytes : 34834, md5 : "634b2bd770f639fd723f0039e216cdc7", name : "squidwards_house.png"}], assets_t_restaurants : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"},{ bytes : 777, md5 : "9fd1b272601e038c1002be52780e20c2", name : "bots.png"},{ bytes : 19625, md5 : "3f373f3fb32a6e5e002f84dfddf7328c", name : "insideout_burger.png"},{ bytes : 18490, md5 : "6924295dfcc1b42d6eff3e6294ad9fc1", name : "splatburger.png"},{ bytes : 17865, md5 : "9079947a1c0bb207f8c35be2ce1ea1c2", name : "tubba_chicken.png"}], assets_t_chronology : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_hair : [{ bytes : 11876, md5 : "8c3d712345d4e66a1872aa6fb7866daf", name : "geralds_hair.png"}], assets_t_food : [{ bytes : 4937, md5 : "4d0ea2e9714bea805db6aca23956c5d0", name : "bibble.png"},{ bytes : 7131, md5 : "3e80292c06515af8fc2c18c007fa1538", name : "bronto_burger.png"},{ bytes : 14032, md5 : "9e27e3f778ceb266ef9d7a269c41a81b", name : "dino_bite_cafe.png"},{ bytes : 11093, md5 : "3ffe02e3b0f40dfb1d404d9150ec8810", name : "ernies_brainfreeze.png"},{ bytes : 4781, md5 : "746545fd270bbdcd43af520104d36ac1", name : "froyo.png"},{ bytes : 10483, md5 : "8ea62b3a432bdc31886fdf58ca912192", name : "frycade.png"},{ bytes : 6343, md5 : "a874637217b60e59be2d63b97fcdabf8", name : "krabby_patty.png"},{ bytes : 12768, md5 : "4eecf59a78d382acd462cf2bd5867d4e", name : "krusty_krab.png"},{ bytes : 7920, md5 : "1d70e8cc966f5f15a7b639310f3ae348", name : "wings.png"}], data : [{ bytes : 336381, md5 : "9638dcc570c9e75a1e2a94f4382cf82a", name : "questions.xml"}], assets_p_n100_things : [{ bytes : 111, md5 : "0b194f499b21ddf85d015194bb998ee9", name : "blank.png"}], assets_t_impossible : [{ bytes : 5865, md5 : "8a48bd0237c1c1d45b39260a62d88d0b", name : "april1.jpg"},{ bytes : 6385, md5 : "2b946af4b442ef09e010d099142b1c05", name : "april2.jpg"},{ bytes : 6084, md5 : "704925d5c8b026e7201beb9656111678", name : "april3.jpg"},{ bytes : 6345, md5 : "13a60a31e85294f899ac1c0706094eba", name : "april4.jpg"},{ bytes : 4486, md5 : "b00e94f0ef5def2d955627b1a957e084", name : "ick1.jpg"},{ bytes : 3794, md5 : "12a70deaa900fd4bbd8896faa274ce6f", name : "ick2.jpg"},{ bytes : 4750, md5 : "d163e8edc5a8df9c130454fe128cf327", name : "ick3.jpg"},{ bytes : 5061, md5 : "d24c2ecc83e5e591c4568db912d91d46", name : "ick4.jpg"},{ bytes : 17593, md5 : "58ce4720be6332cb5467ff8a0bdb1385", name : "mr_krabs_closeup.png"}]}]}};
flambe_asset_Manifest._supportsCrossOrigin = (function() {
	var detected = (function() {
		if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android") >= 0) return false;
		var xhr = new XMLHttpRequest();
		return xhr.withCredentials != null;
	})();
	if(!detected) flambe_Log.warn("This browser does not support cross-domain asset loading, any Manifest.remoteBase setting will be ignored.");
	return detected;
})();
flambe_display_Sprite._scratchPoint = new flambe_math_Point();
flambe_display_Font.NEWLINE = new flambe_display_Glyph(10);
flambe_platform_BasicKeyboard._sharedEvent = new flambe_input_KeyboardEvent();
flambe_platform_BasicMouse._sharedEvent = new flambe_input_MouseEvent();
flambe_platform_BasicPointer._sharedEvent = new flambe_input_PointerEvent();
flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js_Browser.get_window().navigator.userAgent);
})();
flambe_platform_html_HtmlAssetPackLoader._mediaRefCount = 0;
flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = true;
flambe_platform_html_HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js_Browser.get_window().top == js_Browser.get_window() && new EReg("Mobile(/.*)? Safari","").match(js_Browser.get_navigator().userAgent);
flambe_platform_html_WebAudioSound._detectSupport = true;
flambe_platform_html_WebGLGraphics._scratchMatrix = new flambe_math_Matrix();
flambesdk_BaseUtils.BASE_URL = "";
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0 >> 31,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	$r = h;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
s2_display_ButtonMode.inited = false;
s2_localization_Locale.loading = true;
s2_scene_SceneLoader.NAME = "Scene_4";
s2_scene_CustomPreloadScene.NAME = "Scene_4";
s2_scene_CustomPreloadScene.WAVES_START_Y = 144;
s2_scene_Popup.NAME = "Scene_4";
s2_scene_PreloadScene.NAME = "Scene_4";
s2_scene_SwapPreloadScene.NAME = "Scene_4";
s2_sound_MusicManager._volume = 0;
s2_util_Sniffer._mobile = false;
s2_util_Sniffer._devicePixelRatio = 1;
s2_util_Sniffer._inited = false;
Main.main();
})();

//# sourceMappingURL=main-html.js.map
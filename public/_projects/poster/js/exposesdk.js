
/*
*	Nick SDK Expose function. 
*	Exposes state of Game on web page and acquires information regarding 
*/

var nsdk_expose = function(){
	var INITIALIZE_CMD = "init";
	var LOG_CMD = "log";
	var ERR_CMD = "error";
	var initialized = false;
	var exec_buffer = [];
	var handlers={
		gameevent:function(){},
		error:function(){console.log.apply(console,arguments)},
		log: function(evt){console.log(evt.id+"("+evt.timestamp+"):"+evt.msg);}
	};
	var SDK = {
		BridgeInitialized : function(){	return initialized;	},
		execute : function(){ 
				if(exec_buffer.length>100){
					throw "Game is not initialized yet please wait...";
				}
				exec_buffer.push(arguments);
			},
		setGameEventHandler:function(handler){
			handlers["gameevent"]=handler;
		},
		setErrorHandler:function(handler){
			handlers["error"]=handler;
		},
		setLogHandler:function(handler){
			handlers["log"]=handler;
		},
	};
	
	function empty_exec_buffer(sdk){
		//lets pass buffered commands to sdk.
			if(exec_buffer.length>0){
				for( var args in exec_buffer ){
					try{
						sdk.execute.apply(sdk,args);
					}
					catch(err) {
						console.log("NickSDK: Error executing buffered command {"+args+"} occurred : {"+err+"}");
					}
				}
				exec_buffer = [];
			}
	}
	
	function initialize_bridge(initops){
		if(!initops){
			console.log("Nick SDK did not pass parameters expected to initialize bridge.");
		}else{
			if(initops.js){
				//Directly calls static function
				SDK.execute = initops.js;
			}
			else if(initops.flash && initops.flashid){
				var flash_name = initops.flash;
				var flash_id = initops.flashid;
				SDK.execute = function(){
					var swf = document.getElementById(flash_id);
					swf[flash_name].apply(swf,arguments);
				};
			}
			else{
				console.log("Nick SDK did not pass parameters expected to initialize bridge.");
			}
		}
	}
	
	function maybePassToHandler(handler,evt){
		if(handlers[handler]){
			handlers[handler](evt);
		}
	}
	
	function handleEvent(evt, sdk){
		if(evt && evt.eventName){
			if(evt.eventName == INITIALIZE_CMD){
				initialize_bridge(evt);
			}
			else if(evt.eventName == LOG_CMD){
				maybePassToHandler("log",evt);
			}
			else if(evt.eventName == ERR_CMD){
				maybePassToHandler("error",evt);
			}
			else{
				maybePassToHandler("gameevent",evt);
			}
		}
	}
	
	function handleEvents(events, sdk){
		if(events && events.length){
			for( var i =0; i<events.length; i++){
				handleEvent(events[i], sdk);
			}
		}
	}
	
	
	return function (sdk, events){
		//Version 1
		if(sdk && sdk.hasOwnProperty("majorversion") && sdk.hasOwnProperty("minorversion") && sdk.hasOwnProperty("apiversion")){
			if(!initialized){
				initialized=true;
				console.log("Nick SDK reporting(sdk-version:"+sdk.majorversion +"."+ sdk.minorversion +" api-version:"+sdk.apiversion +")");
			}
			window.nick_sdk = sdk;
			sdk.__proto__ = SDK;
			//fallback for browsers that dont support __proto__
			if(!sdk.BridgeInitialized){
				var allFunctions = Object.getOwnPropertyNames(SDK);
				for (i = 0; i < allFunctions.length; i++) {
					sdk[allFunctions[i]] = SDK[allFunctions[i]];
				}
			}
			empty_exec_buffer(sdk);
			handleEvents(events,sdk);
		}
	};
}();
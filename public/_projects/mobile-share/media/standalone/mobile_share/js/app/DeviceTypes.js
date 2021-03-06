define([

"../lib/utils/trace"
,
"app/usage_data/BasicPhone"
,
"app/usage_data/GamingDevice"
,
"app/usage_data/Hotspot"
,
"app/usage_data/Laptop"
,
"app/usage_data/None"
,
"app/usage_data/Smartphone"
,
"app/usage_data/Tablet"
,
"app/usage_data/ATTHomeBase"

],

function(

trace
,
BasicPhone
,
GamingDevice
,
Hotspot
,
Laptop
,
None
,
Smartphone
,
Tablet
,
ATTHomeBase

)
{
	var d
	var DeviceTypes = d = {};
	
	d.NONE = "Select your device";

	d.SMARTPHONE = "Smartphone";
	
	d.BASIC_PHONE = "Basic Phone";
	
	d.LAPTOP_NETBOOK = "Laptop";
	
	d.MOBILE_HOTSPOT_DEVICE = "Mobile Hotspot Device";
	
	d.TABLET = "Tablet";
	
	d.GAMING_DEVICE = "Gaming Device";
	
	d.ATT_HOME_BASE = "Wireless Home Phone & Internet Device";
	
	d.types =
	[
		d.NONE
		,
		d.SMARTPHONE
		,
		d.TABLET
		,
		d.BASIC_PHONE
		,
		d.LAPTOP_NETBOOK
		,
		d.MOBILE_HOTSPOT_DEVICE
		,
		d.GAMING_DEVICE
		,
		d.ATT_HOME_BASE
	]
	
	//Typical usage for each device type in GB
	d.usage = [0, 3, 3, .1, 5, 5, 3, 10];
	
	d.rates = {};
	d.rates[.25] = 14.99;
	d.rates[.3] = 20;
	d.rates[3] = 30;
	d.rates[5] = 50;
	d.rates["unlimited"] = 10;
	
	d.plans = {};
	d.plans[d.SMARTPHONE]				= [.3, 3, 5];
	d.plans[d.BASIC_PHONE]				= ["unlimited"];
	d.plans[d.LAPTOP_NETBOOK]			= [5];
	d.plans[d.MOBILE_HOTSPOT_DEVICE]	= [5];
	d.plans[d.TABLET]					= [.25, 3, 5];
	d.plans[d.GAMING_DEVICE]			= [.25, 3, 5];
	d.plans[d.ATT_HOME_BASE]			= [10, 15, 20, 30, 40, 50];
	
	d.usageData = {};
	d.usageData[d.NONE]						= None;
	d.usageData[d.SMARTPHONE]				= Smartphone;
	d.usageData[d.BASIC_PHONE]				= BasicPhone;
	d.usageData[d.LAPTOP_NETBOOK]			= Laptop;
	d.usageData[d.MOBILE_HOTSPOT_DEVICE]	= Hotspot;
	d.usageData[d.TABLET]					= Tablet;
	d.usageData[d.GAMING_DEVICE]			= GamingDevice;
	d.usageData[d.ATT_HOME_BASE]			= ATTHomeBase;
		
	return DeviceTypes
});

























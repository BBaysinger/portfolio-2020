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
"app/usage_data/GoPhoneSmartphone"
,
"app/usage_data/GoPhoneBasicPhone"
,
"app/usage_data/GoPhoneMobileHotspot"
,
"app/usage_data/ATTHomeBase"
,
"app/usage_data/GoPhoneTablet"
,
"app/usage_data/ConnectedCar"

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
GoPhoneSmartphone
,
GoPhoneBasicPhone
,
GoPhoneMobileHotspot
,
ATTHomeBase
,
GoPhoneTablet
,
ConnectedCar
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
	
	d.GOPHONE_SMARTPHONE = "GoPhone Smartphone";
	
	d.GOPHONE_BASIC_PHONE = "GoPhone Basic Phone"; 
	
	d.GOPHONE_MOBILE_HOTSPOT = "GoPhone Mobile Hotspot";
	
	d.ATT_HOME_BASE = "Wireless Home Phone & Internet Device";
	
	d.GOPHONE_TABLET = "GoPhone Tablet";

	d.CONNECTED_CAR = "Connected Car Wi-Fi Hotspot";
	
	d.types =
	[
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
		,
		d.GOPHONE_SMARTPHONE
		,
		d.GOPHONE_BASIC_PHONE
		,
		d.GOPHONE_MOBILE_HOTSPOT
		,
		d.GOPHONE_TABLET
		,
		d.CONNECTED_CAR
	]
	
	d.rates = {};
	d.rates[.25] = 14.99;
	d.rates[.3] = 20;
	d.rates[3] = 30;
	d.rates[5] = 50;
	
	d.plans = {};
	d.plans[d.SMARTPHONE]				= [.3, 3, 5, 10];
	d.plans[d.BASIC_PHONE]				= [];
	d.plans[d.LAPTOP_NETBOOK]			= [5, 10];
	d.plans[d.MOBILE_HOTSPOT_DEVICE]	= [5, 10];
	d.plans[d.TABLET]					= [.25, 3, 5, 10];
	d.plans[d.GAMING_DEVICE]			= [.25, 3, 5, 10];
	d.plans[d.GOPHONE_SMARTPHONE]		= [.5, 1, 2, 3, 4, 5, 10];
	d.plans[d.GOPHONE_BASIC_PHONE]		= [];
	d.plans[d.GOPHONE_MOBILE_HOTSPOT]	= [.5, 1, 2, 3, 4, 5, 10];
	d.plans[d.ATT_HOME_BASE]			= [10, 20, 30];
	d.plans[d.GOPHONE_TABLET]			= [.5, 1, 2, 3, 4, 5, 10];
	d.plans[d.CONNECTED_CAR]			= [.2, 1, 3, 5, 10];
	
	d.notes = {};
	d.notes[d.SMARTPHONE]				= ["", "", "1", ""];
	d.notes[d.BASIC_PHONE]				= ["4"];
	d.notes[d.LAPTOP_NETBOOK]			= ["3", ""];
	d.notes[d.MOBILE_HOTSPOT_DEVICE]	= ["3", ""];
	d.notes[d.TABLET]					= ["3", "2,3", "3", ""];
	d.notes[d.GAMING_DEVICE]			= ["3", "3", "3", ""];
	d.notes[d.GOPHONE_SMARTPHONE]		= ["", "", "1", ""];
	d.notes[d.GOPHONE_BASIC_PHONE]		= ["4"];
	d.notes[d.GOPHONE_MOBILE_HOTSPOT]	= ["3", ""];
	d.notes[d.ATT_HOME_BASE]			= ["", "", "", "", "", ""];
	d.notes[d.GOPHONE_TABLET]			= [];
	d.notes[d.CONNECTED_CAR]			= ["3", ""];
	
	d.usageData = {};
	d.usageData[d.NONE]						= None;
	d.usageData[d.SMARTPHONE]				= Smartphone;
	d.usageData[d.BASIC_PHONE]				= BasicPhone;
	d.usageData[d.LAPTOP_NETBOOK]			= Laptop;
	d.usageData[d.MOBILE_HOTSPOT_DEVICE]	= Hotspot;
	d.usageData[d.TABLET]					= Tablet;
	d.usageData[d.GAMING_DEVICE]			= GamingDevice;
	d.usageData[d.GOPHONE_SMARTPHONE]		= GoPhoneSmartphone;
	d.usageData[d.GOPHONE_BASIC_PHONE]		= GoPhoneBasicPhone;
	d.usageData[d.GOPHONE_MOBILE_HOTSPOT]	= GoPhoneMobileHotspot;
	d.usageData[d.GOPHONE_TABLET]			= GoPhoneTablet;
	d.usageData[d.ATT_HOME_BASE]			= ATTHomeBase;
	d.usageData[d.CONNECTED_CAR]			= ConnectedCar;
	
	return DeviceTypes
	
});

























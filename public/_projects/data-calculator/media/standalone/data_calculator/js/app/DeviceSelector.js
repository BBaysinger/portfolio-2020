define([

"../lib/utils/trace"
,
"../lib/utils/utils"
,
"../lib/utils/signals"
,
"app/DeviceTypes"
,
"app/Slider"
],

function(

trace
,
utils
,
signals
,
DeviceTypes
,
Slider

)
{
	var DeviceSelector = function()
	{
		var _this = this;
				
		this.element = document.createElement("div");
		this.element.className = "dcalc_device_selector";
		
		this.typeSelect = document.createElement("select");
		this.typeSelect.className = "dcalc_device_type_select";
		
		this.deviceImage = document.createElement("div");
		this.deviceImage.className = "dcalc_device_selector_image";
		
		this.heading = document.createElement("div");
		this.heading.className = "dcalc_device_selector_heading";
		this.heading.innerHTML = "Select Your Device";
		
		this.notes = document.createElement("div");
		this.notes.className = "dcalc_device_selector_note";
		
		this.p1 = document.createElement("p");
		this.p1.innerHTML = "Use the sliders below to estimate your monthly usage.";
		
		this.p2 = document.createElement("p");
		this.p2.className = "dcalc_plans_see_modal"; 
		this.p2.innerHTML = "See <a class='dcalc_plans_modal_btn' href='#'>" +
			"Individual Data plans</a>.";
		
		this.change = new signals.Signal();
		
		this.cheat = "Wireless Home Phone...";
		
		this.plansModalSelected = new signals.Signal();
		
		this.setType = function($sType)
		{
			this.type = $sType;
			
			this.deviceImage.className = "dcalc_device_selector_image " + 
				"dcalc_device_selector_image_" + utils.cleanString($sType);
			
			this.change.dispatch($sType);
		}
		
		this.addDeviceTypeOptions = function()
		{   
			
			var includeHomeBase = utils.getParameterByName("blender");
			
			for(var i = 0; i < DeviceTypes.types.length; i++)
			{
				var option = document.createElement("option");
				option.className = "dcalc_device_type_option";
				option.value = i;
				
				option.innerHTML = DeviceTypes.types[i];

				this.typeSelect.appendChild( option );
			}
		}
		
		//Add Elements 
		this.notes.appendChild(this.p1);
		this.notes.appendChild(this.p2);
		
		this.element.appendChild(this.typeSelect);
		this.element.appendChild(this.deviceImage);
		this.element.appendChild(this.heading);
		this.element.appendChild(this.notes);
		
		jQuery(this.typeSelect).bind( "change", function(e)
		{
			_this.setType(DeviceTypes.types[ e.target.value ]);
		});
		            
	
		// jQuery(this.typeSelect).bind( "mousedown", function(e)
		// {
		// 	console.log('mousedown');
		// 	for(i in DeviceTypes.types)
		// 	{
		// 		var option = jQuery(this).children()[i];
		// 		var sOptionLabel = DeviceTypes.types[i];
				
		// 		// option.innerHTML = sOptionLabel;
		// 	}
		// });

		// jQuery(this.typeSelect).bind( "mouseup", function(e)
		// {
		// 	console.log('mouseup');
		// 	for(i in DeviceTypes.types)
		// 	{
		// 		var option = jQuery(this).children()[i];
		// 		var sOptionLabel = DeviceTypes.types[i];
				
		// 		if(sOptionLabel.length > 21)
		// 		{
		// 			var sStringToRemove = sOptionLabel.slice(18);
		// 			sOptionLabel = sOptionLabel.replace(sStringToRemove, '');
		// 			sOptionLabel += "...";
		// 			option.innerHTML = sOptionLabel;
		// 		}
		// 		else
		// 		{
		// 			option.innerHTML = sOptionLabel;					
		// 		}
		// 	}
		// });
		
		jQuery(jQuery(this.notes).find(".dcalc_plans_modal_btn")).bind( "click", function(e){ 
			e.preventDefault();
			_this.plansModalSelected.dispatch();
		});
		
		this.addDeviceTypeOptions();
	}
	
	/* ---------------------------------------------------------------------------------------- */
	
	return DeviceSelector;
	
});































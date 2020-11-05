define([

"../lib/utils/trace",
"app/DeviceTypes"

],

function(

trace,
DeviceTypes

)
{
	var Recommendation = function($aIncrementSets, $nBlockSize)
	{
		var _this = this;
		
		/** Copy which displays total gb. */
		this.totalGb = jQuery('#msr_recommendation_total_gb');
		/** Displays the total shared data cost. */
		this.sharedDataCost = jQuery('#msr_recommendation_shared_data_cost');
		/** Displays pricing for line charges. */
		this.lineCharges = jQuery('#msr_recommendation_line_charges');
		/** Displays the total costs which is shared data cost and line charges combined. */
		this.totalEstimate = jQuery('#msr_recommendation_total_estimate');
		
		this.subhead = jQuery('#msr_recommendation_subhead');
		
		this.element = document.getElementById("msr_recommendation_pricing");
		
		var _aIncrements = [0.3, 1, 2, 4, 6, 10, 15, 20, 30, 40, 50];
		
		/** Dataplan dictionary will contain costs gb's and smartphones.
		Array index 0 contains gb's, index 1 contains gb cost and index 2 contains smartphone cost.*/
		this.dataPlan = {};
		this.dataPlan[0.3] = [.3, 20, 50];
		this.dataPlan[1] = [1, 40, 45];
		this.dataPlan[2] = [2, 50, 45];
		this.dataPlan[4] = [4, 70, 40];
		this.dataPlan[6] = [6, 90, 35];
		this.dataPlan[10] = [10, 120, 30];
		this.dataPlan[15] = [15, 160, 30];
		this.dataPlan[20] = [20, 200, 30];
		this.dataPlan[30] = [30, 300, 30];
		this.dataPlan[40] = [40, 400, 30];
		this.dataPlan[50] = [50, 500, 30];
		
		/** Cost for additional basic and qmps. */
		this.BASIC_COST = 30;
		/** Cost for standalone, laptops, notebooks, mobile hotspots. */
		this.STANDALONE_COST = 20;
		/** Additional costs for tablet and gaming devices. */
		this.TABLET_GAMING_COST = 10;
		/** Additional costs for home base device. */
		this.HOME_BASE_COST = 30;
		
		this.update = function($nTotalUsage, $aDevices)
		{
			var totalGb = $nTotalUsage;
			var dataPlanCosts = this.dataPlan[_aIncrements[_aIncrements.length-1]];
			
			for (var i = 0; i < _aIncrements.length ;i++)
			{   
				if (_aIncrements[i] >= totalGb)
				{
					if (i < _aIncrements.length)
					{   
						dataPlanCosts = this.dataPlan[_aIncrements[i]];
					}
					else
					{
						dataPlanCosts = this.dataPlan[_aIncrements[i-1]];
					}
					
					break;
				}
			}
			
			totalGb = dataPlanCosts[0]; 
			
			if (totalGb >= 1)
			{
				this.totalGb[0].innerHTML = totalGb + 'GB';
			}
			else
			{
				this.totalGb[0].innerHTML = totalGb * 1000 + 'MB';
			}
			
			var count = $aDevices.length;
			var deviceControl;
			var type;
			
			var gbCost = dataPlanCosts[1];
			var smartPhoneCost = dataPlanCosts[2];
			
			var sharedDataCost = gbCost;
			var addLineCost = 0;
			var totalEstimate = 0;
			
			var containsNonBlenderDevice = false; 
			
			for (var i = 0; i < count; i++)
			{
				deviceControl = $aDevices[i];
				
				type = deviceControl.getType();
				
				if (type != DeviceTypes.ATT_HOME_BASE && type != DeviceTypes.NONE)
				{
					containsNonBlenderDevice = true;
				}
				
				if (type == DeviceTypes.SMARTPHONE)
				{
					addLineCost += smartPhoneCost;
				}
				else if (type == DeviceTypes.BASIC_PHONE)
				{
					addLineCost += this.BASIC_COST;
				}
				else if (type == DeviceTypes.LAPTOP_NETBOOK ||
						 type == DeviceTypes.MOBILE_HOTSPOT_DEVICE)
				{
					addLineCost += this.STANDALONE_COST;
				}
				else if (type == DeviceTypes.TABLET || type == DeviceTypes.GAMING_DEVICE)
				{
					addLineCost += this.TABLET_GAMING_COST;
				}
				else if (type == DeviceTypes.ATT_HOME_BASE)
				{
					addLineCost += this.HOME_BASE_COST;
				}
				
				
			}//end loop through devices
			
			if (!$aDevices.length || containsNonBlenderDevice)
			{
				this.subhead[0].innerHTML = "with Unlimited Talk &amp; Text";
			}
			else
			{
				this.subhead[0].innerHTML = "with Unlimited Talk";
			}
			
			
			totalEstimate = sharedDataCost + addLineCost;
			
			this.sharedDataCost[0].innerHTML = '$' + sharedDataCost + '/mo';
			this.lineCharges[0].innerHTML = '$' + addLineCost + '/mo';
			this.totalEstimate[0].innerHTML = '$' + totalEstimate + '/mo';
			
		}//end update
		
	}
	
	return Recommendation;
	
});

























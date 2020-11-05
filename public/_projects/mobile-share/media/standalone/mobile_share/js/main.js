require([

"app/App"
,
"lib/utils/trace"

],
function(

App
,
trace

)

{
	function check()
	{
		if (document.getElementById("msr_recommendation_total_gb"))
		{
			clearInterval(checkInterval);
			
			app = new App();
			app.start();
		}
	}
	
	var app;
	
	var checkInterval = setInterval(check, 250);
	check();
	
});



























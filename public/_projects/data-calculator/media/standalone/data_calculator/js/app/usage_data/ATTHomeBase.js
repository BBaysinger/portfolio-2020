define([
	
"app/UsageTypes"

], function(
	
UsageTypes
	
) {

	var ATTHomeBase = function(){

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.EMAILS] = {
			"title" : UsageTypes.titles[UsageTypes.EMAILS],
			"max_units" : 48000,
			"num_units" : 0,
			"base_unit_amount" : 8000,
			"unit_size" : 0.00010125// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		// this[UsageTypes.STREAMING_MUSIC] = {
		// 	"title" : UsageTypes.titles[UsageTypes.STREAMING_MUSIC],
		// 	"max_units" : 250,
		// 	"num_units" : 0,
		// 	"base_unit_amount" : 10000,
		// 	"unit_size" : 0.00048828125// in GB
		// }

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.WEB_BROWSING] = {
			"title" : UsageTypes.titles[UsageTypes.WEB_BROWSING],
			"max_units" : 600,
			"num_units" : 0,
			"base_unit_amount" : 100,
			"unit_size" : 0.015// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.SOCIAL_MEDIA] = {
			"title" : UsageTypes.titles[UsageTypes.SOCIAL_MEDIA],
			"max_units" : 5400,
			"num_units" : 0,
			"base_unit_amount" : 900,
			"unit_size" : 0.0005// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.STREAMING_VIDEO] = {
			"title" : UsageTypes.titles[UsageTypes.STREAMING_VIDEO],
			"option_val" : "Standard",
			"max_units" : 72,
			"num_units" : 0,
			"base_unit_amount" : 12,
			"unit_size" : 0.6// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.STREAMING_VIDEO_HD] = {
			"title" : UsageTypes.titles[UsageTypes.STREAMING_VIDEO_HD],
			"option_val" : "High Definition",
			"max_units" : 72,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 1.5// in GB 
		}

		/* ---------------------------------------------------------------------------------------- */

		// this[UsageTypes.APP_AND_GAMES] = {  
		// 	"title" : UsageTypes.titles[UsageTypes.APP_AND_GAMES],
		// 	"max_units" : 200,
		// 	"num_units" : 0,
		// 	"base_unit_amount" : 0,
		// 	"unit_size" : 0.00390625// in GB
		// }

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.SONG_DOWNLOADS] = {  
			"title" : UsageTypes.titles[UsageTypes.SONG_DOWNLOADS],
			"max_units" : 1200,
			"num_units" : 0,
			"base_unit_amount" : 200,
			"unit_size" : 0.004// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.INTERACTIVE_GAMING] = {  
			"title" : UsageTypes.titles[UsageTypes.INTERACTIVE_GAMING],
			"max_units" : 1200,
			"num_units" : 0,
			"base_unit_amount" : 200,
			"unit_size" : 0.003// in GB
		}
		
	}

	/* ---------------------------------------------------------------------------------------- */
	
	ATTHomeBase.prototype.types = [
		[UsageTypes.EMAILS]
		,
		// [UsageTypes.STREAMING_MUSIC]
		// ,
		[UsageTypes.WEB_BROWSING]
		,
		[UsageTypes.SOCIAL_MEDIA]
		,
		[UsageTypes.STREAMING_VIDEO, UsageTypes.STREAMING_VIDEO_HD]
		// ,
		// UsageTypes.APP_AND_GAMES
		,
		[UsageTypes.SONG_DOWNLOADS]
		,
		[UsageTypes.INTERACTIVE_GAMING]
	];

	return ATTHomeBase;

});
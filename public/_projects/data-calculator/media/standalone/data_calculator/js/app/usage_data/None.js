define([
	
"app/UsageTypes"

], function(
	
UsageTypes
	
) {

	var None = function(){

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.EMAILS] = {
			"title" : UsageTypes.titles[UsageTypes.EMAILS],
			"max_units" : 20000,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.000286102294922// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.STREAMING_MUSIC] = {
			"title" : UsageTypes.titles[UsageTypes.STREAMING_MUSIC],
			"max_units" : 250,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.00048828125// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.WEB_BROWSING] = {
			"title" : UsageTypes.titles[UsageTypes.WEB_BROWSING],
			"max_units" : 400.00,
			"num_units" : 0,
			"base_unit_amount" : 200,
			"unit_size" : .0150// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.SOCIAL_MEDIA] = {
			"title" : UsageTypes.titles[UsageTypes.SOCIAL_MEDIA],
			"max_units" : 1500,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.1171875// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.STREAMING_VIDEO] = {
			"title" : UsageTypes.titles[UsageTypes.STREAMING_VIDEO],
			"option_val" : "Standard",
			"max_units" : 50,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.12// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.STREAMING_VIDEO_HD] = {
			"title" : UsageTypes.titles[UsageTypes.STREAMING_VIDEO_HD],
			"option_val" : "High Definition",
			"max_units" : 50,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.00498046875// in GB 
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.APP_AND_GAMES] = {  
			"title" : UsageTypes.titles[UsageTypes.APP_AND_GAMES],
			"max_units" : 200,
			"num_units" : 0,
			"base_unit_amount" : 0,
			"unit_size" : 0.00390625// in GB
		}

		/* ---------------------------------------------------------------------------------------- */

		this[UsageTypes.SONG_DOWNLOADS] = {  
			"title" : UsageTypes.titles[UsageTypes.SONG_DOWNLOADS],
			"max_units" : 1200,
			"num_units" : 0,
			"base_unit_amount" : 200,
			"base_unit_amount" : 0,
			"unit_size" : 0.00390625// in GB
		}

		/* ---------------------------------------------------------------------------------------- */
		
		this.types = [
			[UsageTypes.EMAILS]
			,
			[UsageTypes.STREAMING_MUSIC]
			,
			[UsageTypes.WEB_BROWSING]
			,
			[UsageTypes.SOCIAL_MEDIA]
			,
			[UsageTypes.STREAMING_VIDEO, UsageTypes.STREAMING_VIDEO_HD]
			,
			[UsageTypes.APP_AND_GAMES]
		];
	}

	/* ---------------------------------------------------------------------------------------- */

	return None;

});
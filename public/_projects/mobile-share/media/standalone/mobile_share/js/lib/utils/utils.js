define([

"../../lib/utils/trace"

],
function(

trace

)
 {

    /**
	 *
	 */
    var utils = function()
    {
        //singleton
        /*  */
        this.loop = function(obj)
        {
            for (var prop in obj)
            {
                trace.log(prop + " " + obj[prop]);
            }

        }

		/*  */
		this.getParameterByName = function(name) {
		    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

        /* ---------------------------------------------------------------------------------------- */

        /**
		 * Converts strings to Booleans based on their contents.
		 *
		 */
        this.stringToBool = function(str)
        //:Boolean
        {
            if (typeof str != "string")
            {
                var err = "Value " + str + ", type " + typeof str + ", must be of type string. Called from ";
                err += (this.stringToBool.caller) ? this.stringToBool.caller: " top level.";
                throw new Error(err);
            }

            if (!str)
            {
                return false;
            }

            switch (str.toLowerCase())
            {
            case "false":
            case "0":
            case "n":
            case "no":
            case "":

                return false;

            case "true":
            case "1":
            case "y":
            case "yes":

                return true;

            default:

                var err = "String value '" + str + "' can not be converted to type Boolean. Called from "
                err += (this.stringToBool.caller) ? this.stringToBool.caller: " top level.";

                throw new Error(err);
            }

        }
        ,

        /* ---------------------------------------------------------------------------------------- */

        /**
		* Duplicates an object. This help if you want to return an object but keep the original private.
		* (obj:Object):Object
		*/
        this.duplicateObject = function(obj)
        {
            if (!obj)
            {
                return null;
            }
            var newObj = {};
            for (var prop in obj)
            {
                newObj[prop] = obj[prop];
            }
            return newObj;
        }

        /* ---------------------------------------------------------------------------------------- */

        /**
		* A way to convert a string so it can be used in a url and still be human-readable and user friendly.
		* This means making them case insensitive, and 
		* removing any caracters that will be converted when escaped, or ones where users don't normally know HOW to type.
		* characters should not be added to the list until they actually become a problem.
		*
		* This concept was concieved to facilitate deep linking (SWF-Address) url variable values that may be
		* derived from product names, filter names, or page names pulled from a source of data, so that IDs
		* (the derived/converted value BECOMES the ID) aren't needed, and
		* human readable filter criteria can be used in a url.
		*
		* Strings become case insensitive because that is more end-user friendly.
		*
		* Some characters are ommitted, spaces and other characters are replaced with underscores, as indicated by the two regular expressions.
		* This distinction is meant to be as intuitive as possible.
		*
		* 
		*(str:String):String
		*/
        this.normalizeString = function(str)
        {
            /* removes certain characters */
            var CHARS;
            /* replaces with underscores */
            var SPACES = / |\//g;;
            /* makes mDashes and hyphens equal */
            var HYPHENS = /—/g;

            if (jQuery.browser.msie && jQuery.browser.version < 7)
            {
                //IE6 chokes on ISO-8859-1 characters in UTF-8 file, so use this set instead.
                CHARS = /®|:|™|\?|/g;
            }
            else
            {
                //Make sure to replace ISO-8859-1 and UTF-8 version of entities that may differ.
                CHARS = /�|:|®|™|�|\?|/g;
            }

            if (typeof str != "string") throw new Error('Type ' + typeof str + ' passed. Must be type string.');

            if (!str) return null;

            str = str.replace(CHARS, "");

            str = str.replace(SPACES, "_");

            str = str.replace(HYPHENS, "-");

            return str.toLowerCase();
        }

        /* ---------------------------------------------------------------------------------------- */

        /**
		* This is the same as normalize string, only it is for deriving names that are legal as ActionScript and 
		* JavaScript instance names and variables.
		*/
        this.cleanString = function(str)
        {
            /*  */
            var CHARS;
            /*  */
            var SPACES;

            if (jQuery.browser.msie && jQuery.browser.version < 7)
            {
                //IE6 chokes on ISO-8859-1 characters in UTF-8 file, so use this set instead.
                CHARS = /\$|:|\(|\)|®|™|&|!|\?|,/g;
                SPACES = / |—|\.|-|\//g;
            }
            else
            {
                //Make sure to replace ISO-8859-1 and UTF-8 version of entities that may differ.
                CHARS = /\$|:|\(|\)|�|®|™|&|�|!|\?|,/g;
                SPACES = / |—|�|\.|-|\//g;
            }

            if (typeof str != "string") throw new Error('Type ' + typeof str + ' passed. Must be type string.');

            if (!str) return null;

            str = str.replace(CHARS, "");

            str = str.replace(SPACES, "_");

            return str.toLowerCase();
        }

        /* ---------------------------------------------------------------------------------------- */

        /**
		 * 
		 *(a:String, b:String):int
		 */
        this.alphabeticalCompare = function(a, b)
        //:int
        {
            if (a < b)
            {
                return - 1;
            }
            else if (a > b)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        /* ---------------------------------------------------------------------------------------- */

        /**
		 * 
		 *(a:String, b:String):int
		 */
        this.compareLists = function(a, b)
        {
            return this.compareArrays(a.split("|"), b.split("|"));
        }

        /* ---------------------------------------------------------------------------------------- */

        /**
		 * 
		 *(a:String, b:String):int
		 */
        this.compareArrays = function(a, b)
        {
            a.sort(this.alphabeticalCompare);
            b.sort(this.alphabeticalCompare);

            return (a.toString() == b.toString());
        }

    }

    return new utils();

});


























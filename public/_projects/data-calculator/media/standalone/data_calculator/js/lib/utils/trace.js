define(function()
 {
    var _count = 0;

    /**
	* Avoid using the term 't-r-a-c-e' in the code and in coments except for where it is invoked, for the sake of global searching.
	* This makes it easier to clean up non-permanant t-r-a-c-e-s statements.
	*
	*/
    var func = function()
    {
        var sPageOutput = "";
        var sConsoleOutput = "";

        for (var i = 0; i < arguments.length; i++)
        {
            if (i)
            {
                sPageOutput += "&nbsp;";
                sConsoleOutput += " ";
            }
            if (arguments[i] === "")
            {
                arguments[i] = "[empty string]";
            }
            else if (arguments[i] == "" && arguments[i] != 0 && arguments[i] != false)
            {
                arguments[i] = "[" + typeof arguments[i] + " converted to empty string]";
            }
            sPageOutput += arguments[i];
            sConsoleOutput += arguments[i];
        }

        if (typeof console != "undefined") console.log(sConsoleOutput);

        var div;

        if (func.inPageLogging)
        {
            if (!document.getElementById('log_div'))
            {
                div = document.createElement("div");

                div.id = 'log_div';
                div.style.height = "450px";
                div.style.width = "450px";
                div.style.overflow = "auto";
                div.style.color = '#ffffff';
                div.style.border = "1px solid #666666";
                div.style.fontFamily = "Arial, sans";
                div.style.fontSize = "12px";
                div.style.marginLeft = "auto";
                div.style.marginRight = "auto";
                div.style.marginTop = "10px";

                var puppies = document.createElement("div");
                puppies.style.width = div.style.width;
                puppies.style.height = div.style.height;
                //puppies.style.backgroundImage = "url(http://)";
                puppies.style.position = "absolute";
                puppies.style.opacity = ".5";
                puppies.style.zIndex = "-1000";

                var bg = document.createElement("div");
                bg.style.width = div.style.width;
                bg.style.height = div.style.height;
                bg.style.backgroundColor = "#000000";
                bg.style.position = "absolute";
                bg.style.zIndex = "-1001";

                div.appendChild(bg);
                div.appendChild(puppies);

                document.body.appendChild(div);
            }

        }

        div = div || document.getElementById('log_div');

        if (div)
        {
            div.innerHTML += '<span style="color:#000000;background-color:#999999;padding-left:4px;padding-right:4px;">' + _count + '</span>' + "\t" + sPageOutput + "<br />";
        }

        _count++;

    };

    func.inPageLogging = false;
    //for non-temporary logging, use t-r-a-c-e.log() in order to distingush and make t-r-a-c-e clean up much easier with a global search. Booyah!
    func.log = func;

    return func;

});


























define([

"../lib/utils/trace"
,
"../lib/utils/signals"
],

function(

trace
,
signals
)
{
	var MaximumDataModal = function()
	{
		var _this = this;

		this.bAlreadyOpened = false;

		this.opened = new signals.Signal();

		this.overlay = document.getElementById("msr_modal_overlay");

		this.element = document.createElement("div");
		this.element.className = "msr_maximum_data_modal";

		this.header = document.createElement("span");
		this.header.className = "msr_maximum_data_modal_header";
		this.header.innerHTML = "50GB Maximum Data Plan";

		this.copy = document.createElement("p");
		this.copy.className = "msr_maximum_data_modal_copy";
		this.copy.innerHTML = "Data in excess of your package plan will be automatically billed to your account at $15/GB.";

		this.btnClose = document.createElement("a");
		this.btnClose.className =  "msr_btn_close";
		this.btnClose.href =  "#";
		this.btnClose.innerHTML = "Close";

		this.element.appendChild(this.header);
		this.element.appendChild(this.btnClose);
		this.element.appendChild(this.copy);

		jQuery(this.btnClose).bind("click", function(e){
			e.preventDefault();
			_this.close();
		});

	}
	var p = MaximumDataModal.prototype;

	/* ---------------------------------------------------------------------------------------- */

	p.open = function()
	{
		if(!this.bOpen)
		{
			this.element.style.display = "block";
			this.overlay.style.display = "block";
			this.bOpen = true;
			this.opened.dispatch();	
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.close = function()
	{
		if(this.bOpen)
		{
			this.element.style.display = "none";
			this.overlay.style.display = "none";
			this.bOpen = false;
		}
	}

	/* ---------------------------------------------------------------------------------------- */

	p.update = function($nUsage, $nMaxUsage)
	{
		if(!this.bAlreadyOpened)
		{
			var nUsage = Number($nUsage.toFixed(2));

			if(nUsage > $nMaxUsage && !this.bOpen)
			{ 
				this.open(); 
				this.bAlreadyOpened = true;
			}

			else if(nUsage <= $nMaxUsage && this.bOpen) this.close();
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	return MaximumDataModal;
	
});























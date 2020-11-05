define([

"../lib/utils/trace"
,


], function(

trace

){

	var UsageCalculatorView = function()
	{
		this.overlay = document.getElementById("msr_modal_overlay");

		this.element = document.createElement("div");
		this.element.className = "msr_usage_calculator";

		this.header = document.createElement("div");
		this.header.className = "msr_usage_calculator_header";

		this.title = document.createElement("div");
		this.title.className = "msr_usage_calculator_title";

		this.description = document.createElement("div");
		this.description.className = "msr_usage_calculator_description";
		//this.description.innerHTML = "Use the sliders below to estimate your data usage per month. <br>Wi-Fi does not count against data plan usage. "

		this.tallyWrapper = document.createElement("div");
		this.tallyWrapper.className = "msr_usage_calculator_tally_wrapper";

		this.tally = document.createElement("div");
		this.tally.className = "msr_usage_calculator_tally";

		this.tallyAsterisk = document.createElement("p");
		this.tallyAsterisk.className = "msr_usage_calculator_tally_asterisk";
		//this.tallyAsterisk.innerHTML = "Estimated monthly usage* <br />is approximately equal to:";

		this.midsection = document.createElement("div");
		this.midsection.className = "msr_usage_calculator_midsection";

		this.btnReset = document.createElement("a");
		this.btnReset.className = "msr_usage_calculator_reset_btn";
		this.btnReset.innerHTML = "<img src='media/standalone/mobile_share/images/usage_calculator/reset_btn.png' />";
		this.btnReset.href = "#";

		this.btnDone = document.createElement("a");
		this.btnDone.className = "msr_usage_calculator_done_btn";
		this.btnDone.innerHTML = "<img src='media/standalone/mobile_share/images/usage_calculator/done_btn.png' />";
		this.btnDone.href = "#";

		this.asterisk = document.createElement("div");
		this.asterisk.className = "msr_usage_calculator_asterisk";

		this.btnClose = document.createElement("a");
		this.btnClose.className = "msr_btn_close";
		this.btnClose.href = "#";
		this.btnClose.innerHTML = "Close";

		this.body = document.createElement("div");
		this.body.className = "msr_usage_calculator_body";
		this.populateBody();

		this.footer = document.createElement("div");
		this.footer.className = "msr_usage_calculator_footer";

		/* ---------------------------------------------------------------------------------------- */
		/* ------------------------------ Maximum Data Modal -------------------------------------- */
		/* ---------------------------------------------------------------------------------------- */

		this.maxModal = document.createElement("div");
		this.maxModal.className = "msr_maximum_data_modal";

		this.maxModalOverlay = document.createElement("div");
		this.maxModalOverlay.className = "msr_usage_calculator_overlay";

		this.maxModalHeader = document.createElement("span");
		this.maxModalHeader.className = "msr_maximum_data_modal_header";

		this.maxModalCopy = document.createElement("p");
		this.maxModalCopy.className = "msr_maximum_data_modal_copy";

		this.maxModalCloseBtn = document.createElement("a");
		this.maxModalCloseBtn.className = "msr_btn_close";
		this.maxModalCloseBtn.href = "#";
		this.maxModalCloseBtn.innerHTML = "Close";

		this.maxModal.appendChild(this.maxModalHeader);
		this.maxModal.appendChild(this.maxModalCopy);
		this.maxModal.appendChild(this.maxModalCloseBtn);



		// Grab children of this.header
		this.header.appendChild(this.title);
		this.header.appendChild(this.description);

		// Grab children of this.tallyWrapper
		this.tallyWrapper.appendChild(this.tally);
		this.tallyWrapper.appendChild(this.tallyAsterisk);

		// Grab children of this.midsection
		this.midsection.appendChild(this.asterisk);
		this.midsection.appendChild(this.btnReset);
		this.midsection.appendChild(this.btnDone);

		// Grab children of this.element
		this.element.appendChild(this.header);
		this.element.appendChild(this.tallyWrapper);
		this.element.appendChild(this.body);
		this.element.appendChild(this.footer);
		this.element.appendChild(this.btnClose);
		this.element.appendChild(this.maxModalOverlay);
		this.element.appendChild(this.maxModal);
	}

	/* ---------------------------------------------------------------------------------------- */

	var p = UsageCalculatorView.prototype;

	/* ---------------------------------------------------------------------------------------- */
	
	p.populateBody = function()
	{
		this.usageTypeWrapper = document.createElement("div");
		this.usageTypeWrapper.className = "msr_usage_type_wrapper";

		this.body.appendChild(this.usageTypeWrapper);

		this.body.appendChild(this.midsection);

		this.dataLegend = document.createElement("iframe");
		this.dataLegend.className = "msr_data_legend_frame";
		this.dataLegend.scrolling = "no";
		this.dataLegend.frameBorder = "0";
		this.body.appendChild(this.dataLegend);
	}

	/* ---------------------------------------------------------------------------------------- */

	return UsageCalculatorView;


});
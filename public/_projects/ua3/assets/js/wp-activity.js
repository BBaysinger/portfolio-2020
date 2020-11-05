/**
 * @file Wallpaper activity. Quick and dirty.
 *
 * @author Bradley Baysinger
 */

var wpActivity = (function () {
	/**
	 * The namespace for all this so as to not pollute the global namespace.
	 */
	var namespace = {};

	var ids = [null, null, null, null];
	var formats = ["desk1920x1200", "lap1920x1080", "mob1080x1920", "tab1024x1366", "fb820x360", "ig1080x1080"];
	var characterScales = {
		// desk1920x1200: 1, lap1920x1080: 1, mob1080x1920: 1, tab1024x1366: .8, fb820x360: .4, ig1080x1080: .7
		desk1920x1200: 1, lap1920x1080: 1, mob1080x1920: 1, tab1024x1366: 1, fb820x360: 1, ig1080x1080: 1
	}

	/**
	 * Wraps and controls a CreateJS animation exported from Adobe Animate.
	 */
	var WallpaperActivity = function (settings) {
		this.settings = settings;

		this.$elem = $("#wp-activity");
		this.$sandbox = this.$elem.find("#wp-sandbox");
		var self = this;

		$('.modal .dogear-btn.close').click(function (e) {
			$("#wp-sandbox").removeClass("taking-snapshot");
		});

		this.$elem.find(".format-select").click(
			function (event) {
				for (var i = 0; i < formats.length; i++) {
					var className = formats[i];
					this.$elem.removeClass(className);
				}

				namespace.format = $(event.currentTarget).attr("id");

				var  path = _assetPath + "img/ultimate-team/wallpaper/_bot_rt-";
				path += _lang + '_';

				switch (namespace.format) {

					case 'desk1920x1200':
						path += '151x80';
						break;

					case 'lap1920x1080':
						path += '151x80';
						break;

					case 'mob1080x1920':
						path += '246x130';
						break;

					case 'tab1024x1366':
						path += '227x120';
						break;

					case 'fb820x360':
						path += '151x80';
						break;

					case 'ig1080x1080':
						path += '246x130';
						break;

				}

				path += '.png';

				console.log(path);

				$('.bot.rt').attr('src', path);

				this.$elem.addClass(namespace.format);
				this.$elem.removeClass("first");
				this.$elem.addClass("second");

				$("#btn-choose-background")
					.data("animation")
					.resizeCanvas();

				this.removeAll();
				this.resizeSandbox();
			}.bind(this)
		);

		$(".char-select-btn-container").click(function (e) {
			this.charSlot = $(e.currentTarget).parent().index();
		}.bind(this));

		$(".format-select").click(function (event) {
			$("#second #btn-finish-wallpaper").attr("tabIndex", "-1");
		});

		$(".subNavList .profile-btn").click(
			function (event) {
				event.preventDefault();
				var $li = $(event.currentTarget).parent();

				if (!$li.hasClass("active")) {

					// if (ids[this.charSlot]) {
					this.removeItem(ids[this.charSlot]);
					// }

					ids[this.charSlot] = event.currentTarget.id;

					this.checkIfFinished();

					var $li = $(event.currentTarget).parent();
					$li.addClass("active");

					var $anim = $(event.currentTarget).find(".cjs-anim")[0].cjsAnimation;

					var mc = $anim.stage.getChildAt(0).getChildAt(0);
					mc.gotoAndStop("over_idle");
					$anim.setIdleFrame("over_idle");
					$anim.forceStageUpdate();

					mc.mouseEnabled = false;

					this.spawnCharacter(event.currentTarget.id);

					_modal.close();

				} else {

					var char = $("#wp-sandbox").find("#" + event.currentTarget.id);

					this.removeItem(ids[char.parent().index()]);
					this.checkIfFinished();
				}

				return false;
			}.bind(this)
		);

		$("#btn-finish-wallpaper").click(
			function () {
				$("#wp-activity").css("pointer-events", "none");

				$("#wp-sandbox-container").css("transform", "translateX(-10000px)");

				$("#wp-sandbox").css("transform", "scale(1)"); // The default value.
				$("#wp-sandbox").css("transform-origin", "50% 50%"); // The default value.
				$("#wp-sandbox").css("border", "medium none");

				// CLEAR BTN HREF TO MAKE SURE DOWNLOAD HAPPENS ONCE
				var btn = $("a#download-button")[0];
				btn.removeAttribute("href");

				$("#wp-sandbox").addClass("taking-snapshot");

				setTimeout(function () {
					var cScale = (_isMobile) ? window.devicePixelRatio : 1;
					html2canvas(document.querySelector("#wp-sandbox"), { scale: cScale }).then(canvas => {
						if (!HTMLCanvasElement.prototype.toBlob) {
							Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
								value: function (callback, type, quality) {
									var dataURL = this.toDataURL(type, quality).split(",")[1];
									setTimeout(function () {
										var binStr = atob(dataURL),
											len = binStr.length,
											arr = new Uint8Array(len);

										for (var i = 0; i < len; i++) {
											arr[i] = binStr.charCodeAt(i);
										}

										callback(new Blob([arr], { type: type || "image/png" }));
									});
								}
							});
						}

						canvas.toBlob(
							blob => {
								var btn = $("a#download-button")[0];
								var safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
								var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStre;
								var iOSChrome = !!navigator.userAgent.match("CriOS");
								if (iOS && safari) {
									$(btn).one("click", function (e) {
										window.open(URL.createObjectURL(blob), "_blank");
										window.URL.revokeObjectURL(blob);
									});
								} else if (safari) {
									btn.download = "MyUltimateTeam-" + namespace.format + ".png";
									btn.href = URL.createObjectURL(blob);
								} else if (iOSChrome) {
									$(btn).one("click", function (e) {
										window.open(URL.createObjectURL(blob), "_blank");
										window.URL.revokeObjectURL(blob);
									});
								} else {
									btn.target = "_blank";
									btn.download = "MyUltimateTeam-" + namespace.format + ".png";
									btn.href = URL.createObjectURL(blob);
								}

								setTimeout(function () {
									_modal.open("modal-save-wallpaper");

									$("#wp-activity").css("pointer-events", "");

									setTimeout(function () {
										$("#wp-sandbox-container").css("transform", "");

										$("#wp-sandbox").css("transform-origin", "");
										$("#wp-sandbox").css("transform", namespace.sandboxTransform);
										$("#wp-sandbox").css("border", "");

										// KEEP: This helps us see what the export looks like before html2canvas exports it.
										// $("#wp-sandbox").css("transform", "scale(1) translate(-100%, -100%)");

									}, 100);
								});
							},
							"image/png",
							1.0
						);
					});
				}, 0);
			}.bind(this)
		);

		$(".background-choose-button").click(
			function (e) {
				_modal.close();

				var $targ = $(e.currentTarget);

				namespace.sceneId = $targ.data().bgId.substr(2);

				this.setBG();

			}.bind(this)
		);

		window.addEventListener("resize", this.resizeSandbox.bind(this));

		this.sheet = (function () {
			// Create the <style> tag
			var style = document.createElement("style");

			// WebKit hack :(
			style.appendChild(document.createTextNode(""));

			// Add the <style> element to the page
			document.head.appendChild(style);

			return style.sheet;
		})();

	};

	namespace.sceneId = -1;
	namespace.sandboxScale = -1;
	namespace.sandboxTransform = "";

	WallpaperActivity.prototype.setBG = function () {
		var bgURL;

		if (namespace.sceneId !== -1) {
			bgURL = _assetPath + "img/ultimate-team/wallpaper/bg" + "_" + namespace.sceneId + ".jpg";
			var styleVal = "url(" + bgURL + ")";

			$("#wp-sandbox")
				.css("background-image", styleVal)
				.attr("data-bg-id", namespace.sceneId);

			this.checkIfFinished();
		}
	};

	WallpaperActivity.prototype.resizeSandbox = function () {

		function clearCSSRules(sheet) {
			var i = sheet.cssRules.length - 1;

			// Remove all the rules from the end inwards.
			while (i >= 0) {
				if ("deleteRule" in sheet) {
					sheet.deleteRule(i);
				} else if ("removeRule" in sheet) {
					sheet.removeRule(i);
				}

				i--;
			}
		}

		clearCSSRules(this.sheet);

		var $container = $("#wp-sandbox").parent();
		var $sandbox = $("#wp-sandbox");

		var sanboxHeight = $sandbox.height();
		var sanboxWidth = $sandbox.width();

		var wRatio = parseInt($container.css("width")) / sanboxWidth;
		var hRatio = ($(window).height() - 200) / sanboxHeight;

		namespace.sandboxScale = Math.min(wRatio, hRatio);

		var baseScale = 0.75;
		var scaler = (1 / namespace.sandboxScale) * baseScale;

		this.sheet.insertRule("#wp-sandbox .character-select-btns .btn-wrapper { transform: translateY(-50%) scale(" + scaler + ");", 0);

		namespace.sandboxTransform = "scale(" + namespace.sandboxScale + ") translateX(-50%)";

		$sandbox.css("transform", namespace.sandboxTransform);
		$container.height(namespace.sandboxScale * parseInt($sandbox.css("height")));

		$("#wp-sandbox-loader").css("transform", namespace.sandboxTransform);
		$("#wp-sandbox-loader").css("width", $sandbox.width());
		$("#wp-sandbox-loader").css("height", $sandbox.height());
	};

	WallpaperActivity.prototype.removeAll = function (id) {
		var $elems = $("#wp-sandbox").find(".char-select-btn-container");
		for (var i = 0; i < $elems.length; i++) {
			$elems.parent().removeClass('occupied-slot');
			this.removeItem(ids[i]);
		}
	};

	WallpaperActivity.prototype.removeItem = function (id) {

		if (id) {
			ids[ids.indexOf(id)] = null;

			this.$sandbox.find("#" + id).remove();

			$('#btn-container-' + this.charSlot).removeClass('occupied-slot');

			// var $li = $(event.currentTarget).parent();
			// $li.addClass("active");

			var $btn = $(".subNavList").find(".profile-btn#" + id);
			$btn.parent().removeClass("active");

			var $anim = $($btn).find(".cjs-anim")[0].cjsAnimation;

			var mc = $anim.stage.getChildAt(0).getChildAt(0);
			mc.gotoAndStop("idle");
			$anim.forceStageUpdate();
			mc.mouseEnabled = true;
		}
	};

	WallpaperActivity.prototype.reset = function () {
		this.$elem.removeClass("second");
		this.$elem.addClass("first");
		$("#wp-sandbox")[0].removeAttribute("data-bg-id");
		$("#wp-sandbox").css({ "background-image": "none" });
		$(".finished-btn-wrap").removeClass("enabled");
		$("#wp-sandbox").removeClass("taking-snapshot");

		this.removeAll();
		_modal.close(true);
	};

	WallpaperActivity.prototype.spawnCharacter = function (id) {

		var $btnContainer = $('#btn-container-' + this.charSlot);
		var $charContainer = $('#char-container-' + this.charSlot);

		$btnContainer.addClass('occupied-slot');

		var character = document.createElement("img");
		character.classname = 'character-img';
		character.id = id;
		character.alt = id;

		// Vertical characters correspond to horizontal format, and vice versa.
		var dir = (namespace.format.indexOf('mob') !== -1 || namespace.format.indexOf('tab') !== -1) ? 'horiz' :
			(namespace.format.indexOf('ig') !== -1) ? 'ig' : 'vert';
		var src = _assetPath + "img/ultimate-team/characters-" + dir + "/" + id + ".png";

		character.onload = function (e) {

			var img = e.currentTarget;

			img.height = Math.round(img.naturalHeight * characterScales[namespace.format]);
			img.width = Math.round(img.naturalWidth * characterScales[namespace.format]);

		};

		// // TODO: Figure out base path and asset path.
		character.src = src;

		$charContainer.append(character);

	};

	WallpaperActivity.prototype.checkIfFinished = function () {
		if ($("#wp-sandbox").attr("data-bg-id") && ids.indexOf(null) === -1) {
			$("#second .finished-btn-wrap").addClass("enabled");
			$("#second #btn-finish-wallpaper").attr("tabIndex", "");
		} else {
			$("#second .finished-btn-wrap").removeClass("enabled");
		}
	};

	/**
	 * Loop through all '.cjs-anim' elements to instantiate CJSAnimation for each of them.
	 */
	document.addEventListener("DOMContentLoaded", function (event) {
		activity = new WallpaperActivity();
	});

	namespace.WallpaperActivity = WallpaperActivity;
	return namespace;
})();

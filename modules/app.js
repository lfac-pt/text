(function () {
    "use strict";
    
    /*globals Mousetrap, markdown, $, _*/

    /*
	- When in preview mode, if any key is pressed go to edit mode
	- Change the page title to the first words of the text
	- Make de favicon change color?
	- Support ES6 sintax!
	- Arranjar um parser markdown github flavor
    */

    var canvas, context, width, height, $text, $textPreview, way, start;

	width = $("body").width();
	height = $("body").height();
	$("canvas").prop("width", width);
	$("canvas").prop("height", height);

	$text = $(".text");
	$textPreview = $(".textPreview");

	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	window.requestAnimationFrame(render);

	start = window.performance.now();

	function rgb(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
	}

	way = true;

	function render(timestamp) {
        var delta;
        
        delta = Math.floor((Math.sin((timestamp - start) / 1000) + 1) / 2 * 255);
        
        context.fillStyle = rgb(133, 200, delta);
        context.fillRect(0, 0, width, height);
        
        window.requestAnimationFrame(render);
	}

	function adjustTextPosition(ev) {
		var textWidth, textHeight;

		if ($text.is(":visible") !== true) {
			return;
		}

		$text.height($text.val().split("\n").length * 53); //53 is the line height

		textWidth = $text.width();
		textHeight = $text.height();

		if (textHeight > height || textWidth > width) {
			if (ev instanceof $.Event) {
				ev.preventDefault();
			}
		}

		$text.css({
			"margin-left" : -(textWidth / 2) - 3, //The -3 is to compensate of the textarea border
			"margin-top" : -(textHeight / 2) - 3
		});
	}
	function adjustTextPreviewPosition(ev) {
		var textWidth, textHeight;

		textWidth = $textPreview.width();
		textHeight = $textPreview.height();

		if (textHeight > height || textWidth > width) {
			if (ev instanceof $.Event) {
				ev.preventDefault();
			}
		}

		$textPreview.css({
			"margin-left" : -(textWidth / 2),
			"margin-top" : -(textHeight / 2)
		});
	}

	function changeTextTo(text, doFocus) {
		if (typeof text === "string") {
			$text.val(text);
			if (doFocus) {
				$text.focus();
			}
		}
		adjustTextPosition();
		localStorage.setItem("text-pad", $text.val());
	}

	changeTextTo(localStorage.getItem("text-pad"), true);
	showPreview();

	$text.on("input", changeTextTo);
	$("canvas").on("click", function () {
		if ($text.val().length === 0) {
			changeTextTo("Here!", true);
		}
		showPreview();
	});

	Mousetrap.bind('command+enter', function () {
        tryToRun();
        return false;
	});
	Mousetrap.bind('ctrl+enter', function () {
        tryToRun();
        return false;
	});
	Mousetrap.bind('esc', function () {
		showPreview();
        return false;
	});

	function tryToRun() {
		var code, result;

		code = $text.val();

		try {
			result = eval(code);
		} catch (e) {
			console.error(e.stack);
			result = "Opps :(";
		}

		changeTextTo($text.val() + _.escape(" == " + result));
	}

	function showPreview() {
		$text.hide();
		$textPreview.html(markdown.toHTML($text.val())).show();
		adjustTextPreviewPosition();
	}

	$text.on("focusout", showPreview);

	$text.on("focusin", function () {
		$textPreview.hide();
		$text.show();
	});

	function showEditor() {
		$textPreview.hide();
		$text.show().focus();
		adjustTextPosition();
	}

	$textPreview.click(showEditor);
})();
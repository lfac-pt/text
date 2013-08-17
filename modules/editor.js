define([
    "jQuery",
    "underscore",
    "Mousetrap",
    "markdown",
    "ds"
], function ($, _, Mousetrap, markdown, ds) {
    "use strict";

    return {
        initialize : function (width, height) {
            var $text, $textPreview;

            $text = $(".text");
            $textPreview = $(".textPreview");

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
                ds.save($text.val());
            }

            changeTextTo(ds.load(), true);
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
        }
    };
});
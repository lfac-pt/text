define([
    "jQuery",
    "underscore",
    "background/backgroundManager",
    "aceEditor",
    "marked"
], function ($, _, backgroundManager, aceEditor, marked) {
    "use strict";

    /*
	- When in preview mode, if any key is pressed go to edit mode
	- Change the page title to the first words of the text
	- Make de favicon change color?
    */

    var width, height, editor, $editor, $textPreview;

	width = $("body").width();
	height = $("body").height();

    backgroundManager.initialize(document.querySelector("canvas"), width, height);
    editor = aceEditor.initialize(width, height);

    $editor = $("#editor");
    $textPreview = $(".textPreview");
    editor.on('blur', function () {
        $editor.hide();
        $textPreview.show().html(marked(editor.getValue()));
    });
    $textPreview.click(function () {
        $editor.show();
        $textPreview.hide();
    });
});
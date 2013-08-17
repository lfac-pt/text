define([
    "jQuery",
    "underscore",
    "ace",
    "background/backgroundManager",
    "editor",
], function ($, _, ace, backgroundManager, editor) {
    "use strict";

    /*
	- When in preview mode, if any key is pressed go to edit mode
	- Change the page title to the first words of the text
	- Make de favicon change color?
	- Support ES6 sintax!
	- Arranjar um parser markdown github flavor
    */

    var width, height, aceEditor;

	width = $("body").width();
	height = $("body").height();

    backgroundManager.initialize(document.querySelector("canvas"), width, height);
    //editor.initialize();

    window.aceEditor = aceEditor = ace.edit("editor");
    aceEditor.renderer.setShowGutter(false);
    aceEditor.setHighlightActiveLine(false);
    aceEditor.renderer.setHScrollBarAlwaysVisible(false);
    aceEditor.getSession().setMode("ace/mode/markdown");

    $("#editor").css("left", (width / 2 - 400) + "px");
});
define([
    "jQuery",
    "underscore",
    "background/backgroundManager",
    "editor",
], function ($, _, backgroundManager, editor) {
    "use strict";

    /*
	- When in preview mode, if any key is pressed go to edit mode
	- Change the page title to the first words of the text
	- Make de favicon change color?
	- Support ES6 sintax!
	- Arranjar um parser markdown github flavor
    */

    var width, height;

	width = $("body").width();
	height = $("body").height();

    backgroundManager.initialize(document.querySelector("canvas"), width, height);
    editor.initialize();
});
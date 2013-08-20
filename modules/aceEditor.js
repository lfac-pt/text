define([
    "jQuery",
    "underscore",
    "ace",
    "ds"
], function ($, _, ace, ds) {
    "use strict";

    return {
        initialize : function (width) {
            var aceEditor;

            aceEditor = ace.edit("editor");
            aceEditor.renderer.setShowGutter(false);
            aceEditor.setHighlightActiveLine(false);
            aceEditor.renderer.setHScrollBarAlwaysVisible(false);
            aceEditor.getSession().setMode("ace/mode/markdown");

            $(".pleaseCenterMe").css("left", (width / 2 - 400) + "px");

            aceEditor.setValue(ds.load());

            aceEditor.getSession().on('change', function () {
                ds.save(aceEditor.getValue());
            });

            aceEditor.focus();

            return aceEditor;
        }
    };
});
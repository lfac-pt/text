(function (_) {
    "use strict";

    //Set up the requirejs configuration
    require.config({
        baseUrl: "modules"
    });

    //Set up the underscore mixins
    _.mixin({
        const : function (value) {
            return function () {
                return value;
            };
        }
    });

    //Do the shims manually
    _.each(["jQuery", "underscore", "Mousetrap", "marked", "ace"], function (libraryName) {
        define(libraryName, [], _.const(window[libraryName]));
    });
}(window._));

require([
    "app",
    "marked"
], function (app, marked) {
    "use strict";

    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
});
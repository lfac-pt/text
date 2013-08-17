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
    _.each(["jQuery", "underscore", "Mousetrap", "markdown", "ace"], function (libraryName) {
        define(libraryName, [], _.const(window[libraryName]));
    });
}(window._));

require([
    "app"
], function (app) {

});
define([
], function () {
    "use strict";

    return {
        load : function () {
            return localStorage.getItem("text-pad");
        },
        save : function (text) {
            localStorage.setItem("text-pad", text);
        }
    };
});
define([
    "background/renderer",
    "jQuery"
], function (renderer, $) {
    "use strict";
    
    return {
        initialize : function (canvas, width, height) {
            var context, start, $canvas, renderTick;
            
            $canvas = $(canvas);
            $canvas.prop("width", width);
            $canvas.prop("height", height);
            canvas = document.querySelector("canvas");
            context = canvas.getContext("2d");
            start = window.performance.now();
        
            renderTick = function renderTick(timestamp) {
                renderer(context, width, height, start, timestamp);
                
                window.requestAnimationFrame(renderTick);
            };
            
            window.requestAnimationFrame(renderTick);
        }
    };
});
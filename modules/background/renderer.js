define([
], function () {
    "use strict";
    
    function rgb(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
	}
    
    return function (canvasContext, width, height, start, timestamp) {
        var delta;
        
        delta = Math.floor((Math.sin((timestamp - start) / 1000) + 1) / 2 * 255);
        
        canvasContext.fillStyle = rgb(133, 200, delta);
        canvasContext.fillRect(0, 0, width, height);
    };
});
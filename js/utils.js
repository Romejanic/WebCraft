Math.clamp = function(x, a, b) {
    return x < a ? a : x > b ? b : x;
};

Math.rad = glMatrix.toRadian;

if(!window.assert) {
    window.assert = function(condition, message) {
        if(!condition) {
            throw "Assertion error" + (message ? ": " + message : "");
        }
    };
}
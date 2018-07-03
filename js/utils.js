const SIN_TABLE = Array(360 * 15); {
    for(var i = 0; i < SIN_TABLE.length; i++) {
        SIN_TABLE[i] = Math.sin((i/SIN_TABLE.length) * 2 * Math.PI);
    }
}
Math.fsin = function(x) {
    return SIN_TABLE[Math.floor(((x/(2*Math.PI)) * SIN_TABLE.length) % SIN_TABLE.length)];
};
Math.fcos = function(x) {
    return Math.fsin(x + (Math.PI / 2));
}

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
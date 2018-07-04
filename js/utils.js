const SIN_TABLE = Array(360 * 15); {
    for(var i = 0; i < SIN_TABLE.length; i++) {
        SIN_TABLE[i] = Math.sin((i/SIN_TABLE.length) * 2 * Math.PI);
    }
}
Math.fsin = function(x) {
    return SIN_TABLE[Math.floor(Math.mod(((x/(2*Math.PI)) * SIN_TABLE.length), SIN_TABLE.length))];
};
Math.fcos = function(x) {
    return Math.fsin(x + (Math.PI / 2));
}

Math.clamp = function(x, a, b) {
    return x < a ? a : x > b ? b : x;
};

Math.rad = glMatrix.toRadian;

Math.mod = function(x, n) {
    return ((x % n) + n) % n;
};

if(!window.assert) {
    window.assert = function(condition, message) {
        if(!condition) {
            throw "Assertion error" + (message ? ": " + message : "");
        }
    };
}

function Face(x, y, z) {
    this.direction = vec3.fromValues(x, y, z);
}
const FACING = [
    new Face(1, 0, 0),  // 0 +X
    new Face(-1, 0, 0), // 1 -X
    new Face(0, 1, 0),  // 2 +Y
    new Face(0, -1, 0), // 3 -Y
    new Face(0, 0, 1),  // 4 +Z
    new Face(0, 0, -1)  // 5 -Z
];
const RENDER_QUEUES = [
    "opaque",
    "two-sided",
    "transparent"
];
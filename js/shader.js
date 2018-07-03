function Shader(gl, name) {
    this.gl = gl;
    this.name = name;

    var vsSrc = document.getElementById("test_vs").innerText;
    var fsSrc = document.getElementById("test_fs").innerText;

    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, vsSrc);
    gl.shaderSource(fs, fsSrc);
    gl.compileShader(vs);
    gl.compileShader(fs);

    if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        var log = gl.getShaderInfoLog(vs);
        console.error("Failed to compile " + name + "_vs!\n", log);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return;
    }
    if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        var log = gl.getShaderInfoLog(vs);
        console.error("Failed to compile " + name + "_fs!\n", log);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return;
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);
    gl.detachShader(this.program, vs);
    gl.detachShader(this.program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        var log = gl.getProgramInfoLog(this.program);
        console.error("Failed to link program " + name + "!\n", log);
        gl.deleteProgram(this.program);
        this.program = null;
        return;
    }
}

Shader.prototype.bind = function() {
    if(this.program) {
        this.gl.useProgram(this.program);
    }
};

Shader.prototype.unbind = function() {
    this.gl.useProgram(null);
};

Shader.prototype.delete = function() {
    if(this.program) {
        this.gl.deleteProgram(this.program);
    }
};
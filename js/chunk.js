function Chunk(gl, x, z) {
    this.x = x;
    this.z = z;
    this.gl = gl;

    var offA = (Math.random() * 2 - 1) * 0.25;
    var offB = (Math.random() * 2 - 1) * 0.25;
    var offC = (Math.random() * 2 - 1) * 5.0;

    var vertices = [
        -0.5 + offA, -0.5 + offB, offC,
         0.5 + offB, -0.5 + offA, offC,
        -0.5 + offA,  0.5 + offB, offC,

        -0.5 + offB,  0.5 + offA, -offC,
         0.5 + offA, -0.5 + offB, -offC,
         0.5 + offB,  0.5 + offA, -offC
    ];

    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.elementCount = vertices.length / 3;
}

Chunk.prototype.draw = function(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    gl.drawArrays(gl.TRIANGLES, 0, this.elementCount);

    gl.disableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

Chunk.prototype.delete = function() {
    this.gl.deleteBuffer(this.vbo);
};
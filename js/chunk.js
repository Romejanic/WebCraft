function Chunk(gl, world, x, z) {
    this.x = x;
    this.z = z;
    this.gl = gl;
    this.world = world;

    this.vbo = gl.createBuffer();
    this.generateMesh(gl);
}

Chunk.prototype.generateMesh = function(gl) {
    var promise = new Promise((resolve) => {
        var vertices = Array(RENDER_QUEUES.length);
        for(var i = 0; i < vertices.length; i++) {
            vertices[i] = Array();
        }
        for(var ox = 0; ox < CHUNK_WIDTH; ox++) {
            for(var oz = 0; oz < CHUNK_DEPTH; oz++) {
                for(var y = 0; y < this.world.height; y++) {
                    var x = (this.x * CHUNK_WIDTH) + ox;
                    var z = (this.z * CHUNK_DEPTH) + oz;
                    var block = this.world.getBlock(x, y, z);
                    if(block) {
                        block.render(vertices[block.getRenderQueue()], this.world, x, y, z);
                    }
                }
            }
        }
        var finalList = [];
        var vertexOffsets = Array(RENDER_QUEUES.length);
        var currentOffset = 0;
        vertices.forEach((arr, i) => {
            finalList = finalList.concat(arr);
            var count = arr.length / 8;
            vertexOffsets[i] = {
                offset: currentOffset,
                length: count
            };
            currentOffset += count;
        });

        resolve({ vertices: finalList, offsets: vertexOffsets });
    }).then((data) =>  {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.offsets = data.offsets;
    });
};

Chunk.prototype.draw = function(gl, queue) {
    if(!this.vbo || !this.offsets) {
        return;
    }
    var offset = this.offsets[queue];
    if(!offset || offset.length <= 0) {
        return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8 * 4, 0);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 8 * 4, 3 * 4);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 8 * 4, 5 * 4);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);

    var offset = this.offsets[queue];
    gl.drawArrays(gl.TRIANGLES, offset.offset, offset.length);

    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

Chunk.prototype.delete = function() {
    this.gl.deleteBuffer(this.vbo);
};
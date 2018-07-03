const CHUNK_WIDTH = 16;
const CHUNK_DEPTH = 16;

function WorldRenderer(gl, world) {
    this.gl = gl;
    this.world = world;

    assert(world.width % CHUNK_WIDTH === 0, "World width must be divisible by " + CHUNK_WIDTH + "!");
    assert(world.depth % CHUNK_DEPTH === 0, "World depth must be divisible by " + CHUNK_DEPTH + "!");

    this.xChunks = world.width / CHUNK_WIDTH;
    this.zChunks = world.depth / CHUNK_DEPTH;
    this.chunks  = Array(this.xChunks * this.zChunks);

    for(var x = 0; x < this.xChunks; x++) {
        for(var z = 0; z < this.zChunks; z++) {
            this.chunks[(z*this.xChunks)+x] = new Chunk(gl, world, x, z);
        }
    }

    this.shader = new Shader(gl, "terrain");
    this.shader.bind();
    for(var f = 0; f < FACING.length; f++) {
        gl.uniform3fv(this.shader.getUniformLocation("normals[" + f + "]"), FACING[f].direction);
    }
    this.shader.unbind();
}

WorldRenderer.prototype.preRender = function(camera) {
    this.shader.bind();
    this.gl.uniformMatrix4fv(this.shader.getUniformLocation("projMat"), false, camera.projMat);
    this.gl.uniformMatrix4fv(this.shader.getUniformLocation("viewMat"), false, camera.viewMat);
};

WorldRenderer.prototype.render = function(gl) {
    this.chunks.forEach((chunk) => {
        chunk.draw(gl);
    });
    this.shader.unbind();
};

WorldRenderer.prototype.delete = function(gl) {
    this.chunks.forEach((chunk) => {
        chunk.delete();
    });
    this.shader.delete();
};
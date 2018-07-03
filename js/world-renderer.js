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

    this.shader = new Shader(gl, "terrain", {
        "vertex": 0,
        "texCoords": 1,
        "data": 2
    });
    this.shader.bind();
    for(var f = 0; f < FACING.length; f++) {
        gl.uniform3fv(this.shader.getUniformLocation("normals[" + f + "]"), FACING[f].direction);
    }
    this.shader.unbind();

    this.textureAtlas = gl.createTexture();
    var atlasImage = assets["terrain_atlas"];
    gl.bindTexture(gl.TEXTURE_2D, this.textureAtlas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasImage);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

WorldRenderer.prototype.preRender = function(camera, shadows, isShadowPass) {
    if(!isShadowPass) {
        this.shader.bind();
        this.gl.uniformMatrix4fv(this.shader.getUniformLocation("projMat"), false, camera.projMat);
        this.gl.uniformMatrix4fv(this.shader.getUniformLocation("viewMat"), false, camera.viewMat);
        this.gl.uniform1i(this.shader.getUniformLocation("atlas"), 0);
        shadows.setUniforms(this.shader);
    }
};

WorldRenderer.prototype.render = function(gl, isShadowPass) {
    if(!isShadowPass) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(gl.TEXTURE_2D, this.textureAtlas);
    }
    this.chunks.forEach((chunk) => {
        chunk.draw(gl);
    });
    this.shader.unbind();
    this.gl.bindTexture(gl.TEXTURE_2D, null);
};

WorldRenderer.prototype.delete = function(gl) {
    this.chunks.forEach((chunk) => {
        chunk.delete();
    });
    this.shader.delete();
    this.gl.deleteTexture(this.textureAtlas);
};
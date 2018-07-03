function ShadowRenderer(gl, resolution) {
    this.gl = gl;
    this.enabled = true;
    this.resolution = resolution || 1024;

    var ext = gl.getExtension("WEBGL_depth_texture");
    if(!ext) {
        console.error("Shadow mapping is not supported! (no depth texture support)");
        this.enabled = false;
        return;
    }

    this.framebuffer = gl.createFramebuffer();
    this.shadowMap   = gl.createTexture();

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, this.shadowMap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.resolution, this.resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_BYTE, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.shadowMap, 0);
    gl.drawBuffers([gl.NONE]);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

ShadowRenderer.prototype.beginDrawing = function() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
    this.gl.viewport(0, 0, this.resolution, this.resolution);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
};

ShadowRenderer.prototype.endDrawing = function() {
    this.gl.bindFramebuffer(this.gl.framebuffer, null);
};
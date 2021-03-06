function ShadowRenderer(gl, resolution, distance) {
    this.gl = gl;
    this.enabled = true;
    this.resolution = resolution || 1024;
    this.distance = distance || 40;
    
    this.lightDir = vec3.fromValues(45, 30, -45);
    vec3.normalize(this.lightDir, this.lightDir);

    var ext = gl.getExtension("WEBGL_depth_texture");
    if(!ext) {
        console.error("Shadow mapping is not supported! (no depth texture support)");
        this.enabled = false;
        return;
    }

    this.framebuffer = gl.createFramebuffer();
    this.shadowMap   = gl.createTexture();
    this.shader      = new Shader(gl, "shadow", {
        "vertex": 0,
        "texCoords": 1,
        "data": 2
    });

    this.projMat = mat4.create();
    this.viewMat = mat4.create();

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, this.shadowMap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.resolution, this.resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.shadowMap, 0);
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    if(status != gl.FRAMEBUFFER_COMPLETE) {
        console.error("Err: framebuffer status is not complete!", status);
    }
}

ShadowRenderer.prototype.beginDrawing = function(camera, time) {
    mat4.identity(this.projMat);
    mat4.identity(this.viewMat);
    mat4.ortho(this.projMat, -this.distance, this.distance, -this.distance, this.distance, -this.distance * 4, this.distance);
    mat4.lookAt(this.viewMat, vec3.add(vec3.create(), camera.position, this.lightDir), camera.position, [0, -1, 0]);

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
    this.gl.viewport(0, 0, this.resolution, this.resolution);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);

    this.shader.bind();
    this.setUniforms(this.shader, true, time);
};

ShadowRenderer.prototype.endDrawing = function() {
    this.shader.unbind();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
};

ShadowRenderer.prototype.setUniforms = function(shader, isDrawing, time) {
    this.gl.uniformMatrix4fv(shader.getUniformLocation("shadowProj"), false, this.projMat);
    this.gl.uniformMatrix4fv(shader.getUniformLocation("shadowView"), false, this.viewMat);
    if(!isDrawing) {
        this.gl.uniform1f(shader.getUniformLocation("shadowDist"), this.distance);
        this.gl.uniform1i(shader.getUniformLocation("shadowmap"), 1);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.shadowMap);
    } else {
        this.gl.uniform1f(shader.getUniformLocation("time"), time);
    }
};

ShadowRenderer.prototype.getShadowUniform = function(name) {
    return this.shader.getUniformLocation(name);
};

ShadowRenderer.prototype.delete = function() {
    this.gl.deleteFramebuffer(this.framebuffer);
    this.gl.deleteTexture(this.shadowMap);
};
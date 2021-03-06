function Camera(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.rotation = vec3.create();
    this.fov  = 70.0;
    this.near = 0.1;
    this.far  = 1000.0;

    this.moveSpeed = 10.0;
    this.rotSpeed  = 45.0;
    this.speedMul  = 5.0;

    this.projMat = mat4.create();
    this.viewMat = mat4.create();
    this.forward = vec3.create();
}

Camera.prototype.update = function(delta) {
    var rotSpeed = this.rotSpeed * delta;
    this.rotation[0] += input.mouseDY * rotSpeed;
    this.rotation[1] += input.mouseDX * rotSpeed;
    this.rotation[0]  = Math.clamp(this.rotation[0], -89.0, 89.0);

    var sinX   = Math.fsin(Math.rad(this.rotation[0]));
    var cosX   = Math.fcos(Math.rad(this.rotation[0]));
    var sinY   = Math.fsin(Math.rad(this.rotation[1]));
    var cosY   = Math.fcos(Math.rad(this.rotation[1]));
    var sinY90 = Math.fsin(Math.rad(this.rotation[1] + 90.0));
    var cosY90 = Math.fcos(Math.rad(this.rotation[1] + 90.0));
    vec3.set(this.forward, sinY * cosX, -sinX, -cosY * cosX);
    vec3.normalize(this.forward, this.forward);

    var moveSpeed = this.moveSpeed * delta;
    if(input.isKeyDown(KEY_SHIFT)) {
        moveSpeed *= this.speedMul;
    }

    var forward = vec3.scale(vec3.create(), this.forward, moveSpeed);
    if(input.isKeyDown(KEY_W)) {
        vec3.add(this.position, this.position, forward);
    }
    if(input.isKeyDown(KEY_S)) {
        vec3.sub(this.position, this.position, forward);
    }
    if(input.isKeyDown(KEY_A)) {
        this.position[0] -= sinY90 * moveSpeed;
        this.position[2] += cosY90 * moveSpeed;
    }
    if(input.isKeyDown(KEY_D)) {
        this.position[0] += sinY90 * moveSpeed;
        this.position[2] -= cosY90 * moveSpeed;
    }
};

Camera.prototype.updateMatrices = function(w, h) {
    mat4.identity(this.projMat);
    mat4.identity(this.viewMat);
    mat4.perspective(this.projMat, glMatrix.toRadian(this.fov), w/h, this.near, this.far);
    mat4.rotateX(this.viewMat, this.viewMat, glMatrix.toRadian(this.rotation[0]));
    mat4.rotateY(this.viewMat, this.viewMat, glMatrix.toRadian(this.rotation[1]));
    mat4.rotateZ(this.viewMat, this.viewMat, glMatrix.toRadian(this.rotation[2]));
    mat4.translate(this.viewMat, this.viewMat, vec3.negate(vec3.create(), this.position));
};
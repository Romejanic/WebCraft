function Camera(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.rotation = vec3.create();
    this.fov  = 70.0;
    this.near = 0.1;
    this.far  = 1000.0;

    this.projMat = mat4.create();
    this.viewMat = mat4.create();
}

Camera.prototype.update = function() {
    // update camera position/rotation
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
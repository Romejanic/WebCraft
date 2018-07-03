const gameUpdateRate = 50;

const game = {
    canvas: undefined,
    gl: undefined,
    renderScale: 1.0,

    camera: new Camera(0, 0, 3),

    chunk: undefined,
    shader: undefined,

    init: function() {
        this.canvas = document.getElementById("main");
        if(!this.canvas) {
            error("Canvas could not be found!");
            return;
        }
        this.gl = this.canvas.getContext("webgl");
        if(!this.gl) {
            console.warn("Falling back on experimental WebGL context...");
            this.gl = this.canvas.getContext("experimental-webgl");
        }
        if(!this.gl) {
            error("Your browser does not support WebGL! Please enable it in your settings.");
            return;
        }
        this.startGame(this.gl);
    },

    startGame: function(gl) {
        gl.clearColor(0.4, 0.6, 0.9, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.depthFunc(gl.LEQUAL);
        gl.cullFace(gl.BACK);

        this.chunk = new Chunk(gl, 0, 0);
        this.shader = new Shader(gl, "test");

        window.addEventListener("unload", this.destroy);
        input.init(this.canvas);
        this.updateLoop = setInterval(this.update, 1000/gameUpdateRate);
        this.requestRenderFrame();
    },

    update: function() {
        let delta = 1 / gameUpdateRate;
        game.camera.update(delta);
    },

    renderFrame: function(gl, w, h) {
        this.camera.updateMatrices(w, h);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.shader.bind();
        gl.uniformMatrix4fv(this.shader.getUniformLocation("projMat"), false, this.camera.projMat);
        gl.uniformMatrix4fv(this.shader.getUniformLocation("viewMat"), false, this.camera.viewMat);
        this.chunk.draw(gl);
        this.shader.unbind();
    },

    destroy: function() {
        this.chunk.delete();
        this.shader.delete();
        
        if(game.updateLoop) {
            clearInterval(game.updateLoop);
        }
        if(game.renderLoop) {
            cancelAnimationFrame(game.renderLoop);
        }
    },

    requestRenderFrame: function() {
        var w = game.canvas.clientWidth * game.renderScale;
        var h = game.canvas.clientHeight * game.renderScale;
        game.canvas.width = w, game.canvas.height = h;

        game.renderFrame(game.gl, w, h);
        game.renderLoop = requestAnimationFrame(game.requestRenderFrame);
    }
};

function error(err) {
    assert(err, "Error cannot be null!");
    console.error("Err:", err);
    alert("An error occoured!\n\n" + err);
}

window.addEventListener("load", () => {
    game.init();
});
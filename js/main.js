const gameUpdateRate = 50;

const game = {
    canvas: undefined,
    gl: undefined,
    renderScale: 1.0,

    world: undefined,
    camera: new Camera(0, 0, 3),

    worldRenderer: undefined,

    init: function() {
        this.canvas = document.getElementById("main");
        if(!this.canvas) {
            error("Canvas could not be found!");
            return;
        }
        var options = {
            antialias: false
        };
        this.gl = this.canvas.getContext("webgl", options);
        if(!this.gl) {
            console.warn("Falling back on experimental WebGL context...");
            this.gl = this.canvas.getContext("experimental-webgl", options);
        }
        if(!this.gl) {
            error("Your browser does not support WebGL! Please enable it in your settings.");
            return;
        }
        this.startGame(this.gl);
    },

    startGame: function(gl) {
        this.world = new World(256, 256, 256);

        gl.clearColor(0.4, 0.6, 0.9, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.depthFunc(gl.LEQUAL);
        gl.cullFace(gl.BACK);

        this.worldRenderer = new WorldRenderer(gl, this.world);

        input.init(this.canvas);
        window.addEventListener("unload", this.destroy);
        this.updateLoop = setInterval(this.update, 1000/gameUpdateRate);
        this.requestRenderFrame();
    },

    update: function() {
        let delta = 1 / gameUpdateRate;
        game.camera.update(delta);

        input.mouseDX = 0, input.mouseDY = 0;
    },

    renderFrame: function(gl, w, h) {
        this.camera.updateMatrices(w, h);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.worldRenderer.preRender(this.camera);
        this.worldRenderer.render(gl);
    },

    destroy: function() {
        this.worldRenderer.delete();
        
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
    assetLoader.loadAssets(() => {
        game.init();
    });
});
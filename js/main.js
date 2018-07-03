const gameUpdateRate = 50;

const game = {
    canvas: undefined,
    gl: undefined,

    chunk: undefined,

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
        this.startGame();
    },

    startGame: function() {
        this.chunk = new Chunk(this.gl, 0, 0);

        window.addEventListener("unload", this.destroy);
        this.updateLoop = setInterval(this.update, 1000/gameUpdateRate);
        this.requestRenderFrame();
    },

    update: function() {
        // game update code goes here
    },

    renderFrame: function(gl) {
        gl.clearColor(0.4, 0.6, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        game.chunk.draw(gl);
    },

    destroy: function() {
        this.chunk.destroy();
        
        if(game.updateLoop) {
            clearInterval(game.updateLoop);
        }
        if(game.renderLoop) {
            cancelAnimationFrame(game.renderLoop);
        }
    },

    requestRenderFrame: function() {
        game.renderFrame(game.gl);
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
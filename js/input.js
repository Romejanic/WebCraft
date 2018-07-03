const input = {
    keys: {},
    mouseX: 0,
    mouseY: 0,
    mouseDX: 0,
    mouseDY: 0,

    init: function() {
        document.addEventListener("keydown", (e) => {
            input.keys[e.keyCode] = true;
        });
        document.addEventListener("keyup", (e) => {
            delete input.keys[e.keyCode];
        });
        document.addEventListener("mousemove", (e) => {
            input.mouseDX = e.pageX - input.mouseX;
            input.mouseDY = e.pageY - input.mouseY;
            input.mouseX  = e.pageX;
            input.mouseY  = e.pageY;
        }, false);
    },
    
    isKeyDown: function(keyCode) {
        return input.keys[keyCode];
    },
    isKeyUp: function(keyCode) {
        return !input.keys[keyCode];
    }
};

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
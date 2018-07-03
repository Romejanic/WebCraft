const input = {
    keys: {},
    mouseX: 0,
    mouseY: 0,
    mouseDX: 0,
    mouseDY: 0,

    init: function(canvas) {
        document.addEventListener("keydown", (e) => {
            input.keys[e.keyCode] = true;
        });
        document.addEventListener("keyup", (e) => {
            delete input.keys[e.keyCode];
        });
        canvas.addEventListener("mousemove", (e) => {
            if(document.pointerLockElement !== canvas && document.mozPointerLockElement !== canvas && document.webkitPointerLockElement !== canvas) {
                return;
            }
            input.mouseDX = e.movementX;
            input.mouseDY = e.movementY;
            input.mouseX  = e.pageX;
            input.mouseY  = e.pageY;
        }, false);
        canvas.addEventListener("click", () => {
            canvas.requestPointerLock = canvas.requestPointerLock ||
                                    canvas.mozRequestPointerLock ||
                                    canvas.webkitRequestPointerLock;
            canvas.requestPointerLock();
        });
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
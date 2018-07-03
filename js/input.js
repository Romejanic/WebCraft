const input = {
    keys: {},
    init: function(canvas) {
        document.addEventListener("keydown", (e) => {
            input.keys[e.keyCode] = true;
        });
        document.addEventListener("keyup", (e) => {
            delete input.keys[e.keyCode];
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
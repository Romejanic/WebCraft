function World(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    this.blocks = new Uint8Array(width * height * depth);
    this.generate();
}

World.prototype.getBlockIndex = function(x, y, z) {
    if(x < 0 || y < 0 || z < 0 || x >= this.width || y >= this.height || z >= this.depth) {
        return undefined;
    }
    var idx = (z * this.height + (y * this.width)) + x;
    if(idx < 0 || idx >= this.blocks.length) {
        return undefined;
    }
    return idx;
}

World.prototype.getBlock = function(x, y, z) {
    x = Math.floor(x), y = Math.floor(y), z = Math.floor(z);
    var idx = this.getBlockIndex(x, y, z);
    if(idx < 0) {
        return -1;
    }
    return blocks[this.blocks[idx]];
}

World.prototype.setBlock = function(x, y, z, block) {
    var idx = this.getBlockIndex(x, y, z);
    if(idx < 0) {
        return;
    }
    this.blocks[idx] = block.id;
}

World.prototype.isBlockAir = function(x, y, z) {
    return typeof this.getBlock(x, y, z) !== "undefined";
}

World.prototype.generate = function() {
    var seaLevel  = this.height / 2;
    var deviation = this.height / 8;
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
            for(var z = 0; z < this.depth; z++) {
                var idx  = (z * this.height + (y * this.width)) + x;
                var yLvl = seaLevel + deviation * Math.random();
                this.blocks[idx] = y <= yLvl ? 1 : 0;
            }
        }
    }
};
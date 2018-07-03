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
    var idx = x + this.width * (y + this.depth * z);
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
    this.blocks[idx] = !block ? 0 : block.id;
}

World.prototype.isBlockAir = function(x, y, z) {
    return typeof this.getBlock(x, y, z) !== "undefined";
}

World.prototype.getHeight = function(x, z) {
    var y = this.height;
    while(y > 0 && !this.isBlockAir(x, y, z)) {
        y--;
    }
    return y;
};

World.prototype.generate = function() {
    var noiseGen = new SimplexNoise();

    const BLOCK_DIRT  = blocks[1];
    const BLOCK_STONE = blocks[2];
    const BLOCK_GRASS = blocks[3];
    const BLOCK_WATER = blocks[4];

    var seaLevel = this.height / 2;
    var heightDiff = 3;
    for(var x = 0; x < this.width; x++) {
        for(var z = 0; z < this.depth; z++) {
            var sl  = seaLevel + (10 * noiseGen.noise2D(x / 50, z / 50));
            var top = Math.floor(sl + heightDiff * noiseGen.noise2D(x / 25, z / 25));
            var dg  = 2 + 3 * (0.5 * noiseGen.noise2D(x / 15, z / 15) + 0.5);
            for(var y = 0; y < this.height; y++) {
                if(y > top) {
                    break;
                } else if(y == top) {
                    this.setBlock(x, y, z, BLOCK_GRASS);
                } else if(y > top - dg) {
                    this.setBlock(x, y, z, BLOCK_DIRT);
                } else {
                    this.setBlock(x, y, z, BLOCK_STONE);
                }
            }
        }
    }

    // for(var x = 0; x < this.width; x++) {
    //     for(var z = 0; z < this.depth; z++) {
    //         var y = this.getHeight(x, z);
    //         if(y < seaLevel) {
    //             this.setBlock(x, y, z, BLOCK_DIRT);
    //             for(y++; y <= seaLevel; y++) {
    //                 this.setBlock(x, y, z, BLOCK_WATER);
    //             }
    //         }
    //     }
    // }
};
const blocks = Array(255); {
    new Block(1, "stone");
}

function Block(id, name) {
    this.id = id;
    this.name = name;

    assert(id !== 0, "Block cannot have the ID 0!");
    assert(!blocks[id], "A block with ID " + id + " is already registered!");
    blocks[id] = this;
}

Block.prototype.isOpaque = function() {
    return !this.transparent;
};

Block.prototype.isFaceCulled = function(x, y, z, world, face) {
    var cx = x + face.direction[0];
    var cy = y + face.direction[1];
    var cz = z + face.direction[2];
    var cb = world.getBlock(cx, cy, cz);
    return cb && cb.isOpaque();
};

Block.prototype.render = function(vertices, world, x, y, z) {
    for(var f = 0; f < FACING.length; f++) {
        if(this.isFaceCulled(x, y, z, world, FACING[f])) {
            continue;
        }
        switch(f) {
        case 5:
            vertices.push(x - 0.5);
            vertices.push(y - 0.5);
            vertices.push(z - 0.5);
    
            vertices.push(x + 0.5);
            vertices.push(y - 0.5);
            vertices.push(z - 0.5);
    
            vertices.push(x - 0.5);
            vertices.push(y + 0.5);
            vertices.push(z - 0.5);
            break;
        default:
            break;;
        }
    }
};
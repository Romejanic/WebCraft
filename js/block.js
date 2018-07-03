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

Block.prototype.isAir = function() {
    return this.id === 0;
};

Block.prototype.isOpaque = function() {
    return !this.isAir() && !this.transparent;
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
			case 2:				
				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));
				break;
			case 3:
				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));
				break;
			case 1:
				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));
				break;
			case 0:
				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));
				break;
			case 4:
				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));
				break;
			case 5:
				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMax);
				//vertices.push(vMin);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push((block.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMax);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				//vertices.push(uMin);
				//vertices.push(vMax);
				//vertices.push(block.id);
				//vertices.push(face.id);
				//vertices.push(block.getWaveAmount(uMin, vMax));
            break;
        default:
            break;;
        }
    }
};
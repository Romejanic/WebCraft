const blocks = Array(255); {
    new Block(1, "dirt");
    new Block(2, "stone", 3);
    new Block(3, "grass");
    new Block(4, "water", 8);
    new Block(5, "tall_grass", 7);

    blocks[5].transparent = true;
    blocks[5].render = function(vertices, world, x, y, z) {
        var surrounded = true;
		for(var i = 0; i < FACING.length; i++) {
			if(!this.isFaceCulled(x, y, z, world, FACING[i])) {
				surrounded = false;
				break;
			}
		}
		if(surrounded) {
			return false;
		}
		
		var icon = this.getIcon(2);
		var uMin = (icon % 16) / 16;
        var uMax = uMin + (1 / 16);
        var vMin = Math.floor(icon / 16) / 16;
        var vMax = vMin + (1 / 16);
		
		vertices.push(x - 0.5);
		vertices.push(y + 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMin);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 0));
		
		vertices.push(x + 0.5);
		vertices.push(y - 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMax);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 1));
		
		vertices.push(x + 0.5);
		vertices.push(y + 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMax);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 0));
		
		//
		
		vertices.push(x - 0.5);
		vertices.push(y + 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMin);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 0));
		
		vertices.push(x - 0.5);
		vertices.push(y - 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMin);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 1));
		
		vertices.push(x + 0.5);
		vertices.push(y - 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMax);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 1));
		
		//
		
		vertices.push(x - 0.5);
		vertices.push(y + 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMin);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 0));
		
		vertices.push(x + 0.5);
		vertices.push(y - 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMax);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 1));
		
		vertices.push(x + 0.5);
		vertices.push(y + 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMax);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 0));
		
		//
		
		vertices.push(x - 0.5);
		vertices.push(y + 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMin);
		vertices.push(vMin);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 0));
		
		vertices.push(x - 0.5);
		vertices.push(y - 0.5);
		vertices.push(z + 0.5);
		vertices.push(uMin);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(0, 1));
		
		vertices.push(x + 0.5);
		vertices.push(y - 0.5);
		vertices.push(z - 0.5);
		vertices.push(uMax);
		vertices.push(vMax);
		vertices.push(this.id);
		vertices.push(2);
		vertices.push(this.getWaveAmount(1, 1));
    };

    blocks[3].getIcon = function(face) {
        if(face == 2) {
            return 2;
        } else if(face == 3) {
            return 0;
        } else {
            return 1;
        }
    };
    blocks[4].isFaceCulled = function(x, y, z, world, face) {
        var adjacentFaces = [0, 1, 4, 5];
        if(face == FACING[2]) {
            if(world.getBlock(x, y + 1, z) == this) {
                return true;
            } else {
                for(var f = 0; f < adjacentFaces.length; f++) {
                    var cx = x + FACING[adjacentFaces[f]].direction[0];
                    var cy = y + 1;
                    var cz = z + FACING[adjacentFaces[f]].direction[2];
                    if(world.getBlock(cx, cy, cz) == this) {
                        return true;
                    }
                }
                return false;
            }
        }
        var cx = x + face.direction[0];
        var cy = y + face.direction[1];
        var cz = z + face.direction[2];
        var cb = world.getBlock(cx, cy, cz);
        return world.getBlock(x, y + 1, z) == this || (cb && cb.isOpaque());
    };
}

function Block(id, name, icon) {
    this.id = id;
    this.name = name;
    this.icon = icon || 0;

    assert(id !== 0, "Block cannot have the ID 0!");
    assert(!blocks[id], "A block with ID " + id + " is already registered!");
    blocks[id] = this;
}

Block.prototype.setIcon = function(icon) {
    this.icon = icon;
    return this;
};

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

Block.prototype.getIcon = function(face) {
    return this.icon;
};

Block.prototype.getWaveAmount = function(u, v) {
    return 0; // for now
};

Block.prototype.render = function(vertices, world, x, y, z) {
    for(var f = 0; f < FACING.length; f++) {
        if(this.isFaceCulled(x, y, z, world, FACING[f])) {
            continue;
        }
        var icon = this.getIcon(f);
        var uMin = (icon % 16) / 16;
        var uMax = uMin + (1 / 16);
        var vMin = Math.floor(icon / 16) / 16;
        var vMax = vMin + (1 / 16);
        switch(f) {
			case 2:				
				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));
				break;
			case 3:
				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));
				break;
			case 1:
				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));
				break;
			case 0:
				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));
				break;
			case 4:
				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z + 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));
				break;
			case 5:
				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));

				vertices.push(x - 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMin));

				vertices.push(x + 0.5);
				vertices.push(y + 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMax);
				vertices.push(vMin);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMin));

				vertices.push(x + 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMax);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMax, vMax));

				vertices.push(x - 0.5);
				vertices.push(y - 0.5);
				vertices.push(z - 0.5);
				vertices.push(uMin);
				vertices.push(vMax);
				vertices.push(this.id);
				vertices.push(f);
				vertices.push(this.getWaveAmount(uMin, vMax));
            break;
        default:
            break;;
        }
    }
};
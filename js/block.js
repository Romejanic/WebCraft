const blocks = Array(255); {
    new Block(1, "stone");
}

function Block(id, name) {
    this.id = id;
    this.name = name;

    assert(!blocks[id], "A block with ID " + id + " is already registered!");
    blocks[id] = this;
}
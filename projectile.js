function Projectile(x, y, dir, velocity, range, owner) {

    this.x = x
    this.y = y
    this.dir = dir
    this.velocity = velocity
    this.range = range
    this.owner = owner
    this.disable = false
    this.projInterval = null
    this.projIndex = 0;
    this.move()

}

Projectile.prototype.move = function () {

    this.projInterval = setInterval(function () {

        this.projIndex = playingField.projectiles.findIndex(function (proj) {
            return (proj.x === this.x && proj.y === this.y && proj.owner === this.owner);
        }.bind(this));

        if (this.checkLimits()) {
            this.disable = true;
            // playingField.projectiles.splice(this.projIndex, 1);
            clearInterval(this.projInterval);
        }

        if (!this.disable) {
            if (this.detectHit()) {
                this.disable = true;
                console.log("impact " + this.disable);
                // playingField.projectiles.splice(this.projIndex, 1);
                clearInterval(this.projInterval);
            }
        }

        switch (this.dir) {
            case "N":
                this.y -= 1;
                break;
            case "E":
                this.x += 1;
                break;
            case "S":
                this.y += 1;
                break;
            case "W":
                this.x -= 1;
                break;
        }
        playingField.updateAll();
        console.log(playingField.projectiles)
    }.bind(this), 1000 / this.velocity);


    setTimeout(function () {
        clearInterval(this.projInterval);
        playingField.projectiles.splice(this.projIndex, 1);
    }.bind(this), 10000);
}

Projectile.prototype.detectHit = function () {
    //here the projectile will be removed from the collection.
    var adjSquare
    var adjPos
    // debugger
    switch (this.dir) {
        case "N":
            adjSquare = playingField.field[this.x][this.y - 1];
            adjPos = [this.x, this.y - 1];
            break;
        case "E":
            adjSquare = playingField.field[this.x + 1][this.y];
            adjPos = [this.x + 1, this.y];
            break;
        case "S":
            adjSquare = playingField.field[this.x][this.y + 1];
            adjPos = [this.x, this.y + 1];
            break;
        case "W":
            adjSquare = playingField.field[this.x - 1][this.y];
            adjPos = [this.x - 1, this.y];
            break;
    }

    console.log(adjSquare);
    console.log(adjPos[0] + " " + adjPos[1]);

    switch (adjSquare) {
        case "_":
            return false;
        case ".":
            var sampIndex = playingField.samples.findIndex(function (sample) {
                return (sample.x === adjPos[0] && sample.y === adjPos[1]);
            });
            playingField.samples.splice(sampIndex, 1);
            return false;
        case "N":
        case "E":
        case "S":
        case "W":
        case "N2":
        case "E2":
        case "S2":
        case "W2":
        case "X":
        case undefined:
            // default:
            return true;
    }

}


Projectile.prototype.checkLimits = function () {

    var adjPos

    switch (this.dir) {
        case "N":
            adjPos = [this.x, this.y - 1];
            break;
        case "E":
            adjPos = [this.x + 1, this.y];
            break;
        case "S":
            adjPos = [this.x, this.y + 1];
            break;
        case "W":
            adjPos = [this.x - 1, this.y];
            break;
    }
    // debugger
    if (adjPos[0] > playingField.fieldSize[0] || adjPos[0] < 0 || adjPos[1] === playingField.fieldSize[1] || adjPos[1] < 0) {
        return true;
    }

    return false;
}
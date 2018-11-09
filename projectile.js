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
    this.hitScore = 5;
    this.move()

    this.ownerIndex = null
    this.targetIndex = null
    this.xplIndex = null

    this.obstIndex = null

    this.xplAudio = new Audio()
    this.xplAudio.src ="./Audio/explosion2.mp3"

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
            this.ownerIndex = playingField.rovers.findIndex(function (rover) {
                return rover.name === this.owner
            }.bind(this));
            this.targetIndex = playingField.rovers.findIndex(function (rover) {
                return (rover.x === adjPos[0] && rover.y === adjPos[1])
            }.bind(this));
            playingField.rovers[this.ownerIndex].score += this.hitScore;
            playingField.rovers[this.targetIndex].score -= this.hitScore;
            document.querySelector(`#${playingField.rovers[this.ownerIndex].name}-points`).innerHTML = playingField.rovers[this.ownerIndex].score;
            document.querySelector(`#${playingField.rovers[this.targetIndex].name}-points`).innerHTML = playingField.rovers[this.targetIndex].score;

            playingField.rovers[this.targetIndex].disabled = true;

            game.renderer.explosions.push({ x: playingField.rovers[this.targetIndex].x, y: playingField.rovers[this.targetIndex].y });

            this.xplIndex = game.renderer.explosions.findIndex((explosion) =>
                explosion.x === playingField.rovers[this.targetIndex].x && explosion.y === playingField.rovers[this.targetIndex].y);

            // console.table(game.renderer.explosions);

            setTimeout(function () { game.renderer.explosions.splice(this.xplIndex, 1); }.bind(this), 1250);

            // console.table(game.renderer.explosions);
            // debugger
            var StartingPositions = [[0, 0], [playingField.fieldSize[0], playingField.fieldSize[1]]];
            var newPos = StartingPositions[Math.floor(Math.random() * 2)];

            playingField.field[playingField.rovers[this.targetIndex].x][playingField.rovers[this.targetIndex].y] = "_";
            playingField.rovers[this.targetIndex].x = newPos[0];
            playingField.rovers[this.targetIndex].y = newPos[1];
            this.xplAudio.play()

            setTimeout(function () { playingField.rovers[this.targetIndex].disabled = false }.bind(this), 3000);



        case "X":

            this.obstIndex = playingField.obstacles.findIndex(function (obstacle) {
                return (obstacle.x === adjPos[0] && obstacle.y === adjPos[1])
            }.bind(this));

            game.renderer.explosions.push({ x: playingField.obstacles[this.obstIndex].x, y: playingField.obstacles[this.obstIndex].y });

            this.xplIndex = game.renderer.explosions.findIndex((explosion) =>
                explosion.x === playingField.obstacles[this.obstIndex].x && explosion.y === playingField.obstacles[this.obstIndex].y);

            setTimeout(function () { game.renderer.explosions.splice(this.xplIndex, 1); }.bind(this), 1250);

            playingField.field[playingField.obstacles[this.obstIndex].x][playingField.obstacles[this.obstIndex].y] = "_";

            playingField.obstacles.splice(this.obstIndex, 1);

            setTimeout(function () { game.renderer.explosions.pop();
                game.renderer.explosions.pop(); }.bind(this), 2000);
            this.xplAudio.play()
            

            // case undefined:
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
    if (adjPos[0] > playingField.fieldSize[0] || adjPos[0] < 0 || adjPos[1] > playingField.fieldSize[1] || adjPos[1] < 0) {
        return true;
    }

    return false;
}
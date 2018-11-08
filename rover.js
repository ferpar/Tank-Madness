function Rover(x, y, dir, name) {

    this.x = x
    this.y = y
    this.dir = dir
    this.score = 0
    this.name = name
    this.disabled = false

    this.mine = null
    this.mineScore = 5
    this.mineCost = 2
    this.mineDelay = 500
    this.mineIndex = 0
    this.xplIndex = 0


    this.projectile = null
    this.projX = 0
    this.projY = 0
    this.projRange = 10
    this.projVelocity = 10 //squares per second
    this.projCost = 1

}

Rover.prototype.turnRight = function () {

    switch (this.dir) {
        case "N":
            this.dir = "E";
            playingField.updateAll();
            break;
        case "E":
            this.dir = "S";
            playingField.updateAll();
            break;
        case "S":
            this.dir = "W";
            playingField.updateAll();
            break;
        case "W":
            this.dir = "N";
            playingField.updateAll();
            break;
    }

    // console.log("New Rover Direction: " + this.dir);

}

Rover.prototype.turnLeft = function () {

    switch (this.dir) {
        case "N":
            this.dir = "W";
            playingField.updateAll();
            break;
        case "E":
            this.dir = "N";
            playingField.updateAll();
            break;
        case "S":
            this.dir = "E";
            playingField.updateAll();
            break;
        case "W":
            this.dir = "S";
            playingField.updateAll();
            break;
    }

    // console.log("New Rover Direction: " + this.dir);

}

Rover.prototype.moveAhead = function () {

    if (this.disabled === true) return

    switch (this.dir) {
        case "N":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.y -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "E":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.x += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "S":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.y += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "W":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.x -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
    }

    // console.log("Rover's new position>: [ " + this.x + ", " + this.y + "]");



}

Rover.prototype.moveBack = function () {

    if (this.disabled === true) return

    switch (this.dir) {
        case "N":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.y += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "E":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.x -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "S":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.y -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "W":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.x += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
    }

    console.log("Rover's new position>: [ " + this.x + ", " + this.y + "]");



}

Rover.prototype.shoot = function () {

    switch (this.dir) {
        case "N":
            this.projX = this.x;
            this.projY = this.y - 1;
            break;
        case "E":
            this.projX = this.x + 1;
            this.projY = this.y;
            break;
        case "S":
            this.projX = this.x;
            this.projY = this.y + 1;
            break;
        case "W":
            this.projX = this.x - 1;
            this.projY = this.y;
            break;
    }

    
    this.projectile = new Projectile(this.projX, this.projY, this.dir, this.projVelocity, this.projRange, this.name);
    playingField.projectiles.push(this.projectile);
    playingField.updateAll();
    this.score-=this.projCost;
    document.querySelector(`#${this.name}-points`).value = this.score;
    // console.log(this.dir);
    // console.table(playingField.rovers);
    console.table(playingField.projectiles);

}

Rover.prototype.plantMine = function () {
    this.mine = new Mine(this.x, this.y, 1, this.name);

    setTimeout(function () {
        playingField.mines.push(this.mine);
        // console.log(`planted mine @ [${this.x},${this.y}]`);
        this.score -= this.mineCost;
        document.querySelector(`#${this.name}-points`).value = this.score;
        playingField.updateAll();
    }.bind(this), this.mineDelay)
}

Rover.prototype.checkObstacles = function (sense) {

    // parameters: --sense: boolean true --> forward sense.

    var that = this;

    function obstacleLogic(adjSquare, obstPos) {
        switch (adjSquare) {
            case "X":
                return true;
            case ".":
                that.score++;
                document.querySelector(`#${that.name}-points`).value = that.score;

                //code to remove sample from collection

                var sampIndex = playingField.samples.findIndex(function (sample) {
                    return (sample.x === obstPos[0] && sample.y === obstPos[1])
                });
                playingField.samples.splice(sampIndex, 1);
                // console.log(playingField.samples.length);
                return false;
            case "_":
                return false;
            case undefined:
                return true;
            case "m":

                this.mineIndex = playingField.mines.findIndex(function (mine) {
                    return (mine.x === obstPos[0] && mine.y === obstPos[1])
                });

                that.disabled = true;

                that.score -= that.mineScore;
                document.querySelector(`#${that.name}-points`).value = that.score;

                var ownerName = playingField.mines[this.mineIndex].owner;
                var ownerIndex = playingField.rovers.findIndex((owner) => owner.name === ownerName);
                var mineOwner = playingField.rovers[ownerIndex];
                // debugger
                mineOwner.score += that.mineScore;
                document.querySelector(`#${ownerName}-points`).value = mineOwner.score;

                // game.renderer.xplTrigger = true;
                // game.renderer.xplXCoord = playingField.mines[this.mineIndex].x;
                // game.renderer.xplYCoord = playingField.mines[this.mineIndex].y;

                game.renderer.explosions.push({ x: playingField.mines[this.mineIndex].x, y: playingField.mines[this.mineIndex].y });
                // debugger
                this.xplIndex = game.renderer.explosions.findIndex((explosion) =>
                    explosion.x === playingField.mines[this.mineIndex].x && explosion.y === playingField.mines[this.mineIndex].y);

                // console.table(game.renderer.explosions);

                playingField.mines.splice(this.mineIndex, 1);

                setTimeout(() => { game.renderer.explosions.splice(that.xplIndex, 1); }, 1250);

                // console.table(game.renderer.explosions);

                setTimeout(() => { that.disabled = false }, 3000);

                return false;

            default:
                return true;
        }
    }

    if (sense) {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y - 1], [this.x, this.y - 1]);
            case "E":
                try { return obstacleLogic(playingField.field[this.x + 1][this.y], [this.x + 1, this.y]); }
                catch (error) {
                    // console.log('field limit reached');
                    return "undefined"
                }

            case "S":
                return obstacleLogic(playingField.field[this.x][this.y + 1], [this.x, this.y + 1]);
            case "W":
                try { return obstacleLogic(playingField.field[this.x - 1][this.y], [this.x - 1, this.y]); }
                catch (error) {
                    // console.log('field limit reached');
                    return "undefined"
                }
        }
    } else {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y + 1], [this.x, this.y + 1]);
            case "E":
                try { return obstacleLogic(playingField.field[this.x - 1][this.y], [this.x - 1, this.y]); }
                catch (error) {
                    // console.log('field limit reached');
                    return "undefined"
                }
            case "S":
                return obstacleLogic(playingField.field[this.x][this.y - 1], [this.x, this.y - 1]);
            case "W":
                try { return obstacleLogic(playingField.field[this.x + 1][this.y], [this.x + 1, this.y]); }
                catch (error) {
                    // console.log('field limit reached');
                    return "undefined"
                }
        }
    }

}
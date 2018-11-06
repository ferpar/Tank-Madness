function Rover(x, y, dir, name) {

    this.x = x
    this.y = y
    this.dir = dir
    this.score = 0
    this.name = name

}

Rover.prototype.turnRight = function () { // !!!! change rover to this  !!!! change "direction" to "dir" !!!!

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

    console.log("New Rover Direction: " + this.dir);
    // rover["travelLog"].push([this.dir, this.x, this.y]);

}

Rover.prototype.turnLeft = function () { // !!!! change rover to this  !!!! change "direction" to "dir" !!!!

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

    console.log("New Rover Direction: " + this.dir);
    // rover["travelLog"].push([this.dir, this.x, this.y]);

}

Rover.prototype.moveAhead = function () { // !!!! Adapt to new model !!!!


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

    console.log("Rover's new position>: [ " + this.x + ", " + this.y + "]");
    // rover["travelLog"].push([this.dir, this.x, this.y]);


}

Rover.prototype.moveBack = function () { // !!!! Adapt to new model !!!!


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
    // rover["travelLog"].push([this.dir, this.x, this.y]);


}

Rover.prototype.shoot = function () {

}

Rover.prototype.plantMine = function () {

}

Rover.prototype.checkObstacles = function (sense) {

    // parameters: --dir: string containing "N","E","S" or "W". --sense: boolean true --> forward sense.
    var that = this;

    function obstacleLogic(adjSquare) {
        switch (adjSquare) {
            case "X":
                return true;
            case ".":
                that.score++;
                document.querySelector(`#${that.name}-points`).value = that.score;
                return false;
            case "_":
                return false;
            case undefined:
                return true;
            default:
                return true;
        }
    }

    if (sense) {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y - 1]);
            case "E":
                try { return obstacleLogic(playingField.field[this.x + 1][this.y]); }
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }

            case "S":
                return obstacleLogic(playingField.field[this.x][this.y + 1]);
            case "W":
                try{return obstacleLogic(playingField.field[this.x - 1][this.y]);}
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
        }
    } else {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y + 1]);
            case "E":
                try{return obstacleLogic(playingField.field[this.x - 1][this.y]);}
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
            case "S":
                return obstacleLogic(playingField.field[this.x][this.y - 1]);
            case "W":
                try{return obstacleLogic(playingField.field[this.x + 1][this.y]);}
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
        }
    }

}
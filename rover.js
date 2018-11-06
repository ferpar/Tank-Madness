function Rover(x, y, dir,name) {

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


    // if (this.dir === "W" || this.dir === "E") {
    //     if (checkLimits(rover, "x", true, 0, fieldSize[0])) {
    //         return;
    //     };
    // } else {
    //     if (checkLimits(rover, "y", true, 0, fieldSize[1])) {
    //         return;
    //     };
    // }

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
    // rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);


}

Rover.prototype.moveBack = function () { // !!!! Adapt to new model !!!!

    function moveBackward(rover) {

        if (rover["direction"] == "W" || rover["direction"] == "E") {
            if (checkLimits(rover, "x", false, 0, fieldSize[0])) {
                return;
            };
        } else {
            if (checkLimits(rover, "y", false, 0, fieldSize[1])) {
                return;
            };
        }

        switch (rover["direction"]) {
            case "N":
                if (!checkObstacles(rover, false)) {
                    playingField.field[rover.x][rover.y] = "_";
                    rover["y"] += 1;
                    renderField(fieldSize);
                } else if (checkObstacles(rover, false) == "rover") {
                    console.log("cannot move backwards: rover behind")
                } else {
                    console.log("cannot move rearwards: obstacle behind");
                }
                break;
            case "E":
                if (!checkObstacles(rover, false)) {
                    playingField.field[rover.x][rover.y] = "_";
                    rover["x"] -= 1;
                    renderField(fieldSize);
                } else if (checkObstacles(rover, false) == "rover") {
                    console.log("cannot move backwards: rover behind")
                } else {
                    console.log("cannot move rearwards: obstacle behind");
                }
                break;
            case "S":
                if (!checkObstacles(rover, false)) {
                    playingField.field[rover.x][rover.y] = "_";
                    rover["y"] -= 1;
                    renderField(fieldSize);
                } else if (checkObstacles(rover, false) == "rover") {
                    console.log("cannot move backwards: rover behind")
                } else {
                    console.log("cannot move rearwards: obstacle behind");
                }
                break;
            case "W":
                if (!checkObstacles(rover, false)) {
                    playingField.field[rover.x][rover.y] = "_";
                    rover["x"] += 1;
                    renderField(fieldSize);
                } else if (checkObstacles(rover, false) == "rover") {
                    console.log("cannot move backwards: rover behind")
                } else {
                    console.log("cannot move rearwards: obstacle behind");
                }
                break;
        }

        console.log("Rover's new position>: [ " + rover["x"] + ", " + rover["y"] + "]");
        rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);
    }

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
            default:
                return true;
        }
    }

    if (sense) {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y - 1]);
            case "E":
                // debugger
                return obstacleLogic(playingField.field[this.x + 1][this.y]);
            case "S":
                return obstacleLogic(playingField.field[this.x][this.y + 1]);
            case "W":
                return obstacleLogic(playingField.field[this.x - 1][this.y]);
        }
    } else {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y + 1]);
            case "E":
                return obstacleLogic(playingField.field[this.x - 1][this.y]);
            case "S":
                return obstacleLogic(playingField.field[this.x][this.y - 1]);
            case "W":
                return obstacleLogic(playingField.field[this.x + 1][this.y]);
        }
    }

}

Rover.prototype.checkLimits = function () { // !!!! Adapt to this object !!!!

    function checkLimits(rover, axis, sense, lowerLimit, upperLimit) {
        /* This functions takes the movement axis and a boolean parameter for the sense of movement: True = forward or False = backward.
           Then, both the upper and lower limits of the grid must be given (i.e.: 0 and 9).
           It returns true if a limit has been reached.*/

        if (sense == true) {
            switch (rover[axis]) {
                case lowerLimit:
                    if (rover["direction"] == "W" || (rover["direction"] == "N")) {
                        console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length - 1])
                        return true
                    }
                    break;
                case upperLimit:
                    if (rover["direction"] == "E" || (rover["direction"] == "S")) {
                        console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length - 1])
                        return true
                    }
                    break;
            }
        } else {
            switch (rover[axis]) {
                case upperLimit:
                    if (rover["direction"] == "W" || (rover["direction"] == "N")) {
                        console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length - 1])
                        return true
                    }
                    break;
                case lowerLimit:
                    if (rover["direction"] == "E" || (rover["direction"] == "S")) {
                        console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length - 1])
                        return true
                    }
                    break;
            }
        }
    }

}
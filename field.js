let playingField = {

    fieldSize: [],   // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
    field: [],
    obstacleQty: 0,
    obstacles: [],
    sampleQty: 0,
    samples: [],
    rovers: [],
    mines: [],
    projectiles: [],

    createField: function () {

        //CREATE FIELD

        this.fieldSize[0] = document.getElementById("x-input").value - 1;
        this.fieldSize[1] = document.getElementById("y-input").value - 1;


        //First, we create the standard columns (second parameter of the array = coordinate y).
        var col = [];
        for (i = 0; i <= this.fieldSize[1]; i++) {
            col.push("_");
        }
        //Then the columns are added up to compose a matrix with our desired field size. (.slice() method use to avoid passing columns by reference)
        // this.field = []
        for (j = 0; j <= this.fieldSize[0]; j++) {
            this.field.push(col.slice(0));
        }

        //CREATE ROVERS

        if (this.rovers.length === 0) {
            //Instantiating Rovers in case there are none:

            //Rover1
            // ===========================
            var rover1 = new Rover(0, 0, "W", "Rover");
            this.rovers.push(rover1);

            //Rover2
            // ===========================
            var rover2 = new Rover(this.fieldSize[0], this.fieldSize[1], "N", "Rover2");
            // var rover2 = new Rover(1, 0, "N", "Rover2");
            this.rovers.push(rover2);

        }

        // Here the position of the Rovers is rendered on the field.
        this.field[this.rovers[0].x][this.rovers[0].y] = this.rovers[0].dir;
        this.field[this.rovers[1].x][this.rovers[1].y] = this.rovers[1].dir + "2";
        // ===========================

        //CREATE OBSTACLES AND SAMPLES
        this.genObstacles(document.getElementById("obst-num").value);
        this.genSamples(document.getElementById("sample-num").value);

    },

    genObstacles: function (obstacleNum) {

        this.obstacleQty = obstacleNum;
        var obstX;
        var obstY;

        for (i = 0; i < this.obstacleQty; i++) {
            do {
                obstX = Math.floor(Math.random() * (this.fieldSize[0] + 1));
                obstY = Math.floor(Math.random() * (this.fieldSize[1] + 1));
            } while (obstX === this.rovers[0].x && obstY === this.rovers[0].y 
                || obstX === this.rovers[1].x && obstY === this.rovers[1].y 
                || this.field[obstX][obstY] === "X" 
                || this.field[obstX][obstY] === "."
                || this.field[obstX][obstY] === "m")
            this.field[obstX][obstY] = "X";
            // var obst = {x:obstX,y:obstY};
            var obst = new Obstacle(obstX, obstY);
            this.obstacles.push(obst);
        }



    },

    genSamples: function (sampleNum) {

        this.sampleQty = sampleNum;
        var sampleX;
        var sampleY;

        for (i = 0; i < this.sampleQty; i++) {
            do {
                sampleX = Math.floor(Math.random() * (this.fieldSize[0] + 1));
                sampleY = Math.floor(Math.random() * (this.fieldSize[1] + 1));
            } while (sampleX === this.rovers[0].x && sampleY === this.rovers[0].y 
                || sampleX === this.rovers[1].x && sampleY === this.rovers[1].y 
                || this.field[sampleX][sampleY] === "X" 
                || this.field[sampleX][sampleY] === "."
                || this.field[sampleX][sampleY] === "m")
            this.field[sampleX][sampleY] = ".";
            var samp = new Sample(sampleX, sampleY);
            this.samples.push(samp);
        }
    },

    updateAll: function () {

        this.field[playingField.rovers[0].x][playingField.rovers[0].y] = playingField.rovers[0].dir;
        this.field[playingField.rovers[1].x][playingField.rovers[1].y] = playingField.rovers[1].dir + "2";

        this.mines.forEach(function (mine) {
            this.field[mine.x][mine.y] = "m";
        }.bind(this));

        this.projectiles.forEach(function (projectile) {

            if (!projectile.disable) this.field[projectile.x][projectile.y] = "-";
            try{
            switch (projectile.dir) {
                case "N":
                    if (this.field[projectile.x][projectile.y + 1] === "-" && this.field[projectile.x][projectile.y + 1] !== "N"
                        && this.field[projectile.x][projectile.y + 1] !== "E" && this.field[projectile.x][projectile.y + 1] !== "S"
                        && this.field[projectile.x][projectile.y + 1] !== "W" && this.field[projectile.x][projectile.y + 1] !== "N2"
                        && this.field[projectile.x][projectile.y + 1] !== "E2" && this.field[projectile.x][projectile.y + 1] !== "S2"
                        && this.field[projectile.x][projectile.y + 1] !== "W2") {
                        this.field[projectile.x][projectile.y + 1] = "_";
                    }
                case "E":
                    if (this.field[projectile.x - 1][projectile.y] === "-" && this.field[projectile.x - 1][projectile.y] !== "N"
                        && this.field[projectile.x - 1][projectile.y] !== "E" && this.field[projectile.x - 1][projectile.y] !== "S"
                        && this.field[projectile.x - 1][projectile.y] !== "W" && this.field[projectile.x - 1][projectile.y] !== "N2"
                        && this.field[projectile.x - 1][projectile.y] !== "E2" && this.field[projectile.x - 1][projectile.y] !== "S2"
                        && this.field[projectile.x - 1][projectile.y] !== "W2") {
                        this.field[projectile.x - 1][projectile.y] = "_";
                    }
                case "S":
                    if (this.field[projectile.x][projectile.y - 1] === "-" && this.field[projectile.x][projectile.y - 1] !== "N"
                        && this.field[projectile.x][projectile.y - 1] !== "E" && this.field[projectile.x][projectile.y - 1] !== "S"
                        && this.field[projectile.x][projectile.y - 1] !== "W" && this.field[projectile.x][projectile.y - 1] !== "N2"
                        && this.field[projectile.x][projectile.y - 1] !== "E2" && this.field[projectile.x][projectile.y - 1] !== "S2"
                        && this.field[projectile.x][projectile.y - 1] !== "W2") {
                        this.field[projectile.x][projectile.y - 1] = "_";
                    }
                case "W":
                    if (this.field[projectile.x + 1][projectile.y] === "-" && this.field[projectile.x + 1][projectile.y] !== "N"
                        && this.field[projectile.x + 1][projectile.y] !== "E" && this.field[projectile.x + 1][projectile.y] !== "S"
                        && this.field[projectile.x + 1][projectile.y] !== "W" && this.field[projectile.x + 1][projectile.y] !== "N2"
                        && this.field[projectile.x + 1][projectile.y] !== "E2" && this.field[projectile.x + 1][projectile.y] !== "S2"
                        && this.field[projectile.x + 1][projectile.y] !== "W2") {
                        this.field[projectile.x + 1][projectile.y] = "_";
                    }
            }
        }catch (error) { return }

        }.bind(this))

        game.renderer.renderHTML();

    }
}
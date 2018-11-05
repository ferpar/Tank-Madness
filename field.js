let playingField = {

    fieldSize: [],   // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
    field: [],
    obstacleQty: 0,
    obstacles: [],
    sampleQty: 0,
    samples: [],
    rovers: [],

    createField: function () {


        this.fieldSize[0] = document.getElementById("x-input").value - 1;
        this.fieldSize[1] = document.getElementById("y-input").value - 1;


        //First, we create the standard columns (second parameter of the array = coordinate y).
        var col = [];
        for (i = 0; i <= this.fieldSize[1]; i++) {
            col.push("_");
        }
        //Then the columns are added up to compose a matrix with our desired field size. (.slice() method use to avoid passing columns by reference)
        field = []
        for (j = 0; j <= this.fieldSize[0]; j++) {
            field.push(col.slice(0));
        }

        // Here the position of the Rover will be rendered on the field.
        // ===========================
        var rover1 = new Rover(0, 0, "N");
        this.rovers.push(rover1);
        field[rover1.x][rover1.y] = rover1.dir;
        // Here the position of the second Rover will be rendered on the field.
        // ===========================
        var rover2 = new Rover(1, 0, "N");
        this.rovers.push(rover2);
        field[rover2.x][rover2.y] = rover2.dir + "2";
        // ===========================

        // debugger
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
            } while (obstX == this.rovers[0].x && obstY == this.rovers[0].y || obstX == this.rovers[1].x && obstY == this.rovers[1].y || field[obstX][obstY] == "X" || field[obstX][obstY] == ".")
            field[obstX][obstY] = "X";
            console.log("Obstacle " + (i + 1) + " coordinates: " + obstX + ", " + obstY + "\n")
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
            } while (sampleX == this.rovers[0].x && sampleY == this.rovers[0].y || sampleX == this.rovers[1].x && sampleY == this.rovers[1].y || field[sampleX][sampleY] == "X" || field[sampleX][sampleY] == ".")
            field[sampleX][sampleY] = ".";
            console.log("sample " + (i + 1) + " coordinates: " + sampleX + ", " + sampleY + "\n")
        }

    },

    updateAll: function () {

    }
}
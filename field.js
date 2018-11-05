let field = {

    fieldSize =[],   // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
    field=[],
    obstacleQty: 0,
    obstacles =[],
    sampleQty: 0,
    samples =[],

    createField: function () {

        //First, we create the standard columns (second parameter of the array = coordinate y).
        var col = [];
        for (i = 0; i <= fSize[1]; i++) {
            col.push("_");
        }
        //Then the columns are added up to compose a matrix with our desired field size. (.slice() method use to avoid passing columns by reference)
        field = []
        for (j = 0; j <= fSize[0]; j++) {
            field.push(col.slice(0));
        }

        // Here the position of the Rover will be rendered on the field.
        // ===========================
        field[Rover.x][Rover.y] = Rover.direction;
        // Here the position of the second Rover will be rendered on the field.
        // ===========================
        field[Rover2.x][Rover2.y] = Rover2.direction + "2";
        // ===========================


        this.genObstacles(document.getElementById("obst-num").value);
        this.genSamples(document.getElementById("point-num").value);

    },

    genObstacles: function () {

        var obstX;
        var obstY;

        for (i = 0; i < obstacleNum; i++) {
            do {
                obstX = Math.floor(Math.random() * (fieldSize[0] + 1));
                obstY = Math.floor(Math.random() * (fieldSize[1] + 1));
            } while (obstX == Rover.x && obstY == Rover.y || obstX == Rover2.x && obstY == Rover2.y || field[obstX][obstY] == "X" || field[obstX][obstY] == ".")
            field[obstX][obstY] = "X";
            console.log("Obstacle " + (i + 1) + " coordinates: " + obstX + ", " + obstY + "\n")
        }



    },

    genSamples: function () {

        var sampleX;
        var sampleY;

        for (i = 0; i < sampleNum; i++) {
            do {
                sampleX = Math.floor(Math.random() * (fieldSize[0] + 1));
                sampleY = Math.floor(Math.random() * (fieldSize[1] + 1));
            } while (sampleX == Rover.x && sampleY == Rover.y || sampleX == Rover2.x && sampleY == Rover2.y || field[sampleX][sampleY] == "X" || field[sampleX][sampleY] == ".")
            field[sampleX][sampleY] = ".";
            console.log("sample " + (i + 1) + " coordinates: " + sampleX + ", " + sampleY + "\n")
        }

    },

    updateAll: function () {

    }
}
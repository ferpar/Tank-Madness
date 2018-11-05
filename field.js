let field = {

    fieldSize =[],   // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
    field=[],
    obstacleQty: 0,
    sampleQty: 0,

    createField: function () {

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
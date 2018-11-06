function Renderer(dataModel) {

    this.dataModel = dataModel
    this.canvas = null
    this.ctx = null

    this.tileW = null
    this.tileH = null

    this.bgImg = new Image();
    this.bgImg.src = './images/MarsGround.jpg';

    this.obstImg = new Image()
    this.obstImg.src = "./images/obstacle.svg"

    this.sampleImg = new Image()
    this.sampleImg.src = "./images/sample.svg"

    this.tank1NImg = new Image()
    this.tank1NImg.src = "./images/tank1N.svg"

    this.tank1WImg = new Image()
    this.tank1WImg.src = "./images/tank1W.svg"

    this.tank1SImg = new Image()
    this.tank1SImg.src = "./images/tank1S.svg"

    this.tank1EImg = new Image()
    this.tank1EImg.src = "./images/tank1E.svg"

    this.tank2NImg = new Image()
    this.tank2NImg.src = "./images/tank2N.svg"

    this.tank2WImg = new Image()
    this.tank2WImg.src = "./images/tank2W.svg"

    this.tank2SImg = new Image()
    this.tank2SImg.src = "./images/tank2S.svg"

    this.tank2EImg = new Image()
    this.tank2EImg.src = "./images/tank2E.svg"


}

Renderer.prototype.createCanvas = function () {

    //Dynamic creation of the canvas
    let canvasElem = document.createElement("canvas");
    document.querySelector('#game-board').appendChild(canvasElem);
    document.querySelector('body canvas').setAttribute("width", "888px");
    document.querySelector('body canvas').setAttribute("height", "497px");
    document.querySelector('body canvas').setAttribute("id", "canvas");
    this.canvas = document.querySelector('body canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tileW = this.canvas.width / playingField.fieldSize[0]  //TileWidth
    this.tileH = this.canvas.height / playingField.fieldSize[1] //TileHeight

}


Renderer.prototype.renderHTML = function () { // !!!! Adapt this renderer to the new model !!!!

    if (game.HTMLRenderer === false) return;

    function renderer(str) {
        switch (str) {
            case "_":
                return "<div class=\"square\"></div>";
            case ".":
                return "<div class=\"square point\">.</div>";
            case "X":
                return "<div class=\"square obstacle\">X</div>";
            case "N":
                return "<div class=\"square p1\" style=\"transform:rotate(-90deg)\">=></div>";
            case "E":
                return "<div class=\"square p1\">=></div>";
            case "S":
                return "<div class=\"square p1\" style=\"transform:rotate(-90deg)\"><=</div>";
            case "W":
                return "<div class=\"square p1\"><=</div>";
            case "N2":
                return "<div class=\"square p2\" style=\"transform:rotate(-90deg)\">=></div>";
            case "E2":
                return "<div class=\"square p2\">=></div>";
            case "S2":
                return "<div class=\"square p2\" style=\"transform:rotate(-90deg)\"><=</div>";
            case "W2":
                return "<div class=\"square p2\"><=</div>";

        }

    }

    var outputMat = "";
    for (t = 0; t <= playingField.fieldSize[1]; t++) {
        outputMat += "";
        for (s = 0; s <= playingField.fieldSize[0]; s++) {
            outputMat += " " + renderer(playingField.field[s][t]);
        }
        outputMat += "<br class=\"defloat\">";
    }


    console.log("field created and rendered");


    document.getElementById("playing-field").innerHTML = outputMat;
}

Renderer.prototype.renderCanvas = function () {
    var counter = 0;


    var intervalID = setInterval(function () {

        this.renderBackground();
        this.renderData();

        counter++;
        if (counter > 5000) clearInterval(intervalID);

    }.bind(this), 1000 / 60)

}

Renderer.prototype.renderBackground = function () {

    this.x = 0;
    this.y = 0;
    this.ctx.drawImage(this.bgImg, this.x, this.y, this.canvas.clientWidth, this.canvas.height);
    // console.log("here");
}

Renderer.prototype.renderData = function () {

    var that = this;

    function rendererC(str) {
        switch (str) {
            case "_":
                // return "<div class=\"square\"></div>";
                return false;
            case ".":
                return that.sampleImg;
            // return "<div class=\"square point\">.</div>";
            case "X":
                return that.obstImg;
            // return "<div class=\"square obstacle\">X</div>";
            case "N":
                return that.tank1NImg;
            // return "<div class=\"square p1\" style=\"transform:rotate(-90deg)\">=></div>";
            case "E":
                return that.tank1EImg;
            // return "<div class=\"square p1\">=></div>";
            case "S":
                return that.tank1SImg;
            // return "<div class=\"square p1\" style=\"transform:rotate(-90deg)\"><=</div>";
            case "W":
                return that.tank1WImg;
            // return "<div class=\"square p1\"><=</div>";
            case "N2":
                return that.tank2NImg;
            // return "<div class=\"square p2\" style=\"transform:rotate(-90deg)\">=></div>";
            case "E2":
                return that.tank2EImg;
            // return "<div class=\"square p2\">=></div>";
            case "S2":
                return that.tank2SImg;
            // return "<div class=\"square p2\" style=\"transform:rotate(-90deg)\"><=</div>";
            case "W2":
                return that.tank2WImg;
            // return "<div class=\"square p2\"><=</div>";
            default:
                return false;

        }

    }
    // debugger
    // this.ctx.drawImage(this.obstImg,100,100,100,100);

    for (i = 0; i < playingField.fieldSize[0]; i++) {
        for (j = 0; j < playingField.fieldSize[1]; j++) {
            if (rendererC(this.dataModel[i][j]) !== false) {
                this.ctx.drawImage(rendererC(this.dataModel[i][j]), i * this.tileW, j * this.tileH, this.tileW, this.tileH);
            }
        }
    }


}

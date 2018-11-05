function Renderer(dataModel) {

    this.dataModel = dataModel

}

Renderer.prototype.createCanvas = function () {

    //Dynamic creation of the canvas
    let canvasElem = document.createElement("canvas");
    document.querySelector('#game-board').appendChild(canvasElem);
    document.querySelector('body canvas').setAttribute("width", "888px");
    document.querySelector('body canvas').setAttribute("height", "497px");
    document.querySelector('body canvas').setAttribute("id", "canvas");

}

Renderer.prototype.renderHTML = function* () { // !!!! Adapt this renderer to the new model !!!!

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
}
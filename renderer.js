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

Renderer.prototype.renderHTML = function *() {
    
}
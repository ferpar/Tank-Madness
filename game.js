let game = {

  time: 0,
  intervalID: 0,
  fps: 60,
  dataModel: [],
  renderer: null,
  HTMLRenderer: true,
  CanvasRenderer: false,


  init: function () {
    playingField.createField();
    this.dataModel = playingField.field;
    this.renderer = new Renderer(this.dataModel);

    this.renderer.renderHTML();
    if (this.CanvasRenderer) this.renderer.createCanvas();
    if (this.CanvasRenderer) this.renderer.renderCanvas();
    this.keyListener();
  },

  keyListener: function () {

    console.log('entra');

    document.onkeydown = function (event) {

      console.log('entra tb');

      switch (event.key) {
        case "w":
          playingField.rovers[0].moveAhead();
          console.log('R1 moved forward');
          break;
        case "ArrowUp":
          playingField.rovers[1].moveAhead();
          console.log('R2 moved forward');
          break;
        case "s":
          // moveBackward(rover[0]);
          break;
        case "ArrowDown":
          // moveBackward(rover[1]);
          break;
        case "a":
          playingField.rovers[0].turnLeft();
          console.log('pressed a');
          break;
        case "ArrowLeft":
          playingField.rovers[1].turnLeft();
          console.log('pressed left arrow');
          break;
        case "d":
          playingField.rovers[0].turnRight();
          console.log('pressed d');
          break;
        case "ArrowRight":
          playingField.rovers[1].turnRight();
          console.log('pressed right arrow');
          break;
        case "Enter":
          // createFieldButton();
          break;
      }
    }.bind(this)
  }
}
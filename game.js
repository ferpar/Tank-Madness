let game = {

  time: 0,
  intervalID: 0,
  fps: 60,
  dataModel: [],
  renderer: null,


  init: function () {
    playingField.createField();
    this.dataModel = field;
    debugger
    this.renderer = new Renderer(this.dataModel);
    this.renderer.renderHTML();
  },

  keyListener: function () {

    var key = event.key;

    switch (key) {
      case "w":
        // moveForward(Rover);
        break;
      case "ArrowUp":
        // moveForward(Rover2);
        break;
      case "s":
        // moveBackward(Rover);
        break;
      case "ArrowDown":
        // moveBackward(Rover2);
        break;
      case "a":
        // turnLeft(Rover);
        break;
      case "ArrowLeft":
        // turnLeft(Rover2);
        break;
      case "d":
        // turnRight(Rover);
        break;
      case "ArrowRight":
        // turnRight(Rover2);
        break;
      case "Enter":
        // createFieldButton();
        break;
    }

  }
}
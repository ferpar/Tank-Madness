let game = {

  time: 0,
  intervalID: 0,
  fps: 60,
  dataModel: [],
  renderer: null,


  init: function () {
    playingField.createField();
    this.dataModel = field;
    // debugger
    this.renderer = new Renderer(this.dataModel);
    this.renderer.renderHTML();
    this.keyListener();
  },

  keyListener: function () {

    console.log('entra');

    document.onkeydown = function (event) {

      console.log('entra tb');

      switch (event.key) {
        case "w":
          // moveForward(rover[0]);
          break;
        case "ArrowUp":
          // moveForward(rover[1]);
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
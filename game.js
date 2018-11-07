let game = {

  time: 0,
  intervalID: 0,
  fps: 60,
  dataModel: [],
  renderer: null,
  CanvasRenderer: true,


  init: function () {

    this.CanvasRenderer=document.querySelector('#canvas-renderer').checked;

    playingField.createField();
    this.dataModel = playingField.field;
    this.renderer = new Renderer(this.dataModel);

    if(!this.CanvasRenderer) this.renderer.renderHTML();
    if (this.CanvasRenderer) this.renderer.createCanvas();
    if (this.CanvasRenderer) this.renderer.renderCanvas();
    this.keyListener();
  },

  reset: function() {
    //stop the renderer
    if (this.CanvasRenderer) this.renderer.stopCanvasRender();
    //manage all collections: rovers remain, samples and obstacles are
    playingField.field=[];
    playingField.obstacles=[];
    playingField.samples=[];
    //reinitialize
    this.init();
  },

  totalReset: function() {
    playingField.rovers=[];
    this.reset()
    document.querySelector('#Rover-points').value="0";
    document.querySelector('#Rover2-points').value="0";
  },

  keyListener: function () {

    console.log('entra');

    document.onkeydown = function (event) {

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
          playingField.rovers[0].moveBack();
          console.log('R1 moved backward');
          break;
        case "ArrowDown":
          playingField.rovers[1].moveBack();
          console.log('R2 moved backward');
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
        case "1":
          // debugger
          playingField.rovers[0].plantMine();
          break;
        case "m":
          playingField.rovers[1].plantMine();
      }
    }.bind(this)
  }
}
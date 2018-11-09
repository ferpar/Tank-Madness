let game = {

  time: 0,
  intervalID: 0,
  fps: 60,
  dataModel: [],
  renderer: null,
  CanvasRenderer: true,

  theme : new Audio(),
  

  init: function () {

    this.CanvasRenderer = document.querySelector('#canvas-renderer').checked;

    playingField.createField();
    this.dataModel = playingField.field;
    this.renderer = new Renderer(this.dataModel);

    if (!this.CanvasRenderer) this.renderer.renderHTML();
    if (this.CanvasRenderer) this.renderer.createCanvas();
    if (this.CanvasRenderer) this.renderer.renderCanvas();
    this.keyListener();

    this.theme.src = "./Audio/Theme.mp3";
    this.theme.play()

  },

  reset: function () {
    //stop the renderer
    if (this.CanvasRenderer) this.renderer.stopCanvasRender();
    //manage all collections: rovers remain, samples and obstacles are
    playingField.field = [];
    playingField.obstacles = [];
    playingField.samples = [];
    playingField.mines = [];
    playingField.projectiles = [];
    
    document.querySelector('#game-board').innerHTML = "";
    //reinitialize
    this.init();
  },

  totalReset: function () {
    playingField.rovers = [];
    this.reset()
    document.querySelector('#Rover-points').innerHTML = "0";
    document.querySelector('#Rover2-points').innerHTML = "0";
  },

  keyListener: function () {

    

    document.onkeydown = function (event) {

      switch (event.key) {
        case "w":
          playingField.rovers[0].moveAhead();
          
          break;
        case "ArrowUp":
          playingField.rovers[1].moveAhead();
          
          break;
        case "s":
          playingField.rovers[0].moveBack();
          
          break;
        case "ArrowDown":
          playingField.rovers[1].moveBack();
          
          break;
        case "a":
          playingField.rovers[0].turnLeft();
          
          break;
        case "ArrowLeft":
          playingField.rovers[1].turnLeft();
          
          break;
        case "d":
          playingField.rovers[0].turnRight();
          
          break;
        case "ArrowRight":
          playingField.rovers[1].turnRight();
          
          break;
        case "Enter":
          game.init();
          break;
        case "1":
          playingField.rovers[0].plantMine();
          break;
        case "m":
          playingField.rovers[1].plantMine();
          break;
        case "2":
          playingField.rovers[0].shoot();
          break;
        case ",":
          playingField.rovers[1].shoot();
          break;

      }
    }.bind(this)
  }
}
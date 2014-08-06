BoilerGame.Instructions = function(game) {};

BoilerGame.Instructions.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#000';
    start_x = this.game.width - 100;
    start_y = 50;
    backButton = this.add.button(start_x, start_y,
                                 'btnExit', this.returnToMenu, this, 0, 1, 2);

    this.drawInstructions();
  },

  returnToMenu: function() {
    // start the menu state
    this.game.state.start('MainMenu');
  },

  // draw a pretty shitty Instructions
  drawInstructions: function() {
    text = 'instructions go here'

    style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    t = this.game.add.text(this.game.world.centerX-200, 0, text, style);
  }
};

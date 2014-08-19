BoilerGame.Instructions = function(game) {};

BoilerGame.Instructions.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#444';

    x = 270, y = 390;
    backButton = this.game.add.button(x, y, 'box', this.returnToMenu, this);
    backButton.scale.setTo(1.5, 0.5);

    backString = "Back"
    backText = this.game.add.bitmapText(x + 45, y + 15, 'kenpixelblocks', backString, 20);

    this.drawInstructions();
  },

  returnToMenu: function() {
    // start the menu state
    this.game.state.start('MainMenu');
  },

  // draw our Instructions
  drawInstructions: function() {
    text = 'Instructions'
    style = {
      font: "65px Arial",
      fill: "#CCC",
      align: "center"
    };
    t = this.game.add.text(this.game.world.centerX - 200, 50, text, style);

    text = 'This is you.\n\nYour goal in life is to jump as much as you can. \n\nYou can accomplish this marvelous feat by pressing \nthe spacebar or tapping the screen.'
    style = {
      font: "25px Arial",
      fill: "#CCC",
      align: "left"
    };
    t = this.game.add.text(this.game.world.centerX - 200, 200, text, style);
    this.game.add.sprite(180, 160, 'hero', 1);
  }
};

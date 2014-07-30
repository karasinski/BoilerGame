BoilerGame.MainMenu = function(game) {};

BoilerGame.MainMenu.prototype = {
  create: function() {
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(BoilerGame.GAME_WIDTH / 2 + 150, 50, 'title');
    // add the button that will start the game

    start_x = BoilerGame.GAME_WIDTH / 2 + 250;
    start_y = BoilerGame.GAME_HEIGHT / 2 - 50;
    start_button = this.add.button(start_x, start_y, 
                                   'start', this.startGame, this, 0, 1, 2);
    // start_button.scale.setTo(2,2);
  },

  startGame: function() {
    // start the Game state
    this.state.start('Game');
  }
};

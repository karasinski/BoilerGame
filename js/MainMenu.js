BoilerGame.MainMenu = function(game) {};

BoilerGame.MainMenu.prototype = {
  create: function() {
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(60, -60, 'title');
    // add the button that will start the game
    this.add.button(BoilerGame.GAME_WIDTH / 2, BoilerGame.GAME_HEIGHT / 2, 'button-start', this.startGame, this, 1, 0, 2);
  },

  startGame: function() {
    // start the Game state
    this.state.start('Game');
  }
};

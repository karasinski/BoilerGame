BoilerGame.MainMenu = function(game) {};

BoilerGame.MainMenu.prototype = {
  create: function() {
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(BoilerGame.GAME_WIDTH / 2 + 150, 50, 'title');
    // add the button that will start the game
    this.add.button(BoilerGame.GAME_WIDTH / 2 + 85, BoilerGame.GAME_HEIGHT / 2, 'button-start', this.startGame, this, 1, 2, 0);
  },

  startGame: function() {
    // start the Game state
    this.state.start('Game');
  }
};

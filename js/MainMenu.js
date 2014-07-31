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
                                   'btnStart', this.startGame, this, 0, 1, 2);

    start_button = this.add.button(start_x, start_y + 75,
                                   'btnStart', this.showLeaderboard, this, 0, 1, 2);
  },

  startGame: function() {
    // start the Game state
    BoilerGame.NAME = "BoilerGame-" + Date.now();
    this.state.start('Game');
  },

  showLeaderboard: function() {
    this.state.start('Leaderboard');
  }
};

BoilerGame.MainMenu = function(game) {};

BoilerGame.MainMenu.prototype = {
  create: function() {
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(BoilerGame.GAME_WIDTH / 2 + 150, 50, 'title');

    // add buttons to start game, view instructions, view leaderboard
    btn_x = BoilerGame.GAME_WIDTH / 2 + 250;
    btn_y = BoilerGame.GAME_HEIGHT / 2 - 50;
    start_button = this.add.button(btn_x, btn_y, 
                                   'btnStart', this.startGame, this, 0, 1, 2);

    start_button = this.add.button(btn_x, btn_y + 75,
                                   'btnInstructions', this.showInstructions, this, 0, 1, 2);

    start_button = this.add.button(btn_x, btn_y + 150,
                                   'btnLeaderboard', this.showLeaderboard, this, 0, 1, 2);
  },

  startGame: function() {
    // start the Game state
    BoilerGame.NAME = "BoilerGame-" + Date.now();
    this.state.start('Game');
  },

  showLeaderboard: function() {
    this.state.start('Leaderboard');
  },

  showInstructions: function() {
    this.state.start('Instructions');
  }
};

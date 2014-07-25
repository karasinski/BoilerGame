Game.MainMenu = function(game){};
Game.MainMenu.prototype = {
  create: function(){
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(60, -60, 'title');
    // add the button that will start the game
    this.add.button(Game.GAME_WIDTH/2, Game.GAME_HEIGHT/2, 'button-start', this.startGame, this, 1, 0, 2);
  },
  startGame: function() {
    // start the Game state
    this.state.start('Game');
  }
};
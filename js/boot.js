var Game = {};
Game.Boot = function(game){};
Game.Boot.prototype = {
  preload: function(){
    // preload the loading indicator first before anything else
    this.load.image('preloaderBar', 'assets/loading-bar.png');
  },
  create: function(){
    // Reponsive and centered canvas
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.minWidth = 320;
    this.scale.minHeight = 200;
    this.scale.maxWidth = 720;
    this.scale.maxHeight = 480;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.scale.setScreenSize(true);

    // Change stage background color
    this.game.stage.backgroundColor = '#d0f4f7';
    
    // start the Preloader state
    this.state.start('Preloader');
  }
};
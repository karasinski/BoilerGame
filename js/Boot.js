// Create our BoilerGame object to hold our important variables
var BoilerGame = {};

// Create a Boot function in our main game object to hold everything to do with
// the boot state
BoilerGame.Boot = function(game) {};

// Prototype this function to add phaser actions preload and create
BoilerGame.Boot.prototype = {
  preload: function() {
    // preload the loading indicator first before anything else
    this.load.image('preloaderBar', 'assets/UI/loading-bar.png');
  },

  create: function() {
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
    this.game.stage.backgroundColor = '#333';

    // start the Preloader state
    this.state.start('Preloader');
  }
};

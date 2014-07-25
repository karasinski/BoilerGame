Game.Preloader = function(game){
  // define width and height of the game
  Game.GAME_WIDTH = 480;
  Game.GAME_HEIGHT = 320;
};
Game.Preloader.prototype = {
  preload: function(){
    // set background color and preload image
    this.stage.backgroundColor = '#B4D9E7';
    this.preloadBar = this.add.sprite((Game.GAME_WIDTH)/2, (Game.GAME_HEIGHT)/2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    // load images
    this.load.image('ground', 'assets/ground.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('btnPause', 'assets/btn-pause.png');
    this.load.image('btnPlay', 'assets/btn-play.png');
    this.load.image('panel', 'assets/panel.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('title', 'assets/title.png');
    // load spritesheets
    this.load.spritesheet('hero', 'assets/hero.png', 70, 94, 11);
    // load fonts
    this.load.bitmapFont('kenpixelblocks', 'assets/fonts/kenpixelblocks/kenpixelblocks.png', 'assets/fonts/kenpixelblocks/kenpixelblocks.fnt');

  },
  create: function(){
    // start the MainMenu state
    this.state.start('MainMenu');
  }
};
BoilerGame.Preloader = function(game) {
  // define width and height of the game
  BoilerGame.GAME_WIDTH = 720;
  BoilerGame.GAME_HEIGHT = 480;
};

BoilerGame.Preloader.prototype = {
  preload: function() {
    // set background color and preload image
    this.stage.backgroundColor = '#B4D9E7';
    this.preloadBar = this.add.sprite(BoilerGame.GAME_WIDTH / 2,
      BoilerGame.GAME_HEIGHT / 2,
      'preloaderBar');
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
    this.load.spritesheet('button-start', 'assets/button-start.png', 504, 135);
    // load fonts
    this.load.bitmapFont('kenpixelblocks',
                         'assets/fonts/kenpixelblocks/kenpixelblocks.png',
                         'assets/fonts/kenpixelblocks/kenpixelblocks.fnt');
  },

  create: function() {
    // start the MainMenu state
    this.state.start('MainMenu');
  }
};

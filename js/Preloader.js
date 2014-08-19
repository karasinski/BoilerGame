BoilerGame.Preloader = function(game) {
  // define width and height of the game
  BoilerGame.GAME_WIDTH = 720;
  BoilerGame.GAME_HEIGHT = 480;

  // This 'NAME' is used as a unique ID for saved games
  BoilerGame.NAME = "";
};

BoilerGame.Preloader.prototype = {
  preload: function() {
    // set background color and preload image
    this.stage.backgroundColor = '#333';

    // add a preloader sprite (Phaser just 'does this' for you)
    this.preloadBar = this.add.sprite(BoilerGame.GAME_WIDTH / 2,
                                      BoilerGame.GAME_HEIGHT / 2,
                                      'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    // load images
    this.load.image('ground',     'assets/ground.png');
    this.load.image('cloud',      'assets/cloud.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('btnPause',   'assets/UI/btn-pause.png');
    this.load.image('btnPlay',    'assets/UI/btn-play.png');
    this.load.image('btnExit',    'assets/UI/btn-exit.png');
    this.load.image('panel',      'assets/UI/panel.png');
    this.load.image('box',        'assets/UI/box.png');
    this.load.image('title',      'assets/UI/title.png');

    // load spritesheets
    this.load.spritesheet('hero',  'assets/hero.png', 70, 94, 11);
    this.load.spritesheet('btnStart', 'assets/UI/btn-start.png', 190, 49, 3);
    this.load.spritesheet('btnLeaderboard', 'assets/UI/btn-leaderboard.png', 190, 49, 3);
    this.load.spritesheet('btnInstructions', 'assets/UI/btn-instructions.png', 190, 49, 3);

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

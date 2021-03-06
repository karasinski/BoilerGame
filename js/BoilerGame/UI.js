BoilerGame.UI = {
  create: function(that) {
    // Add a pause button
    that.btnPause = that.game.add.button(20, 20, 'btnPause', that.pauseGame, that);

    // Let's build a pause panel
    that.pausePanel = new PausePanel(that.game);
    that.game.add.existing(that.pausePanel);
  }
};

// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent) {
  // Super call to Phaser.Group
  Phaser.Group.call(this, game, parent);

  // Add the panel
  this.panel = this.create(this.game.width / 4, 10, 'panel');
  this.panel.anchor.setTo(0.5, 0);

  // Add text
  this.pauseText = this.game.add.bitmapText(100, 20, 'kenpixelblocks', 'Game paused', 24);
  this.add(this.pauseText);
  this.cloudsText = this.game.add.bitmapText(100, 50, 'kenpixelblocks', 'Clouds are still moving :)', 16);
  this.add(this.cloudsText);

  returnToMenu = function() {
    // start the menu state
    this.game.state.start('MainMenu');
  }

  this.backButton = this.game.add.button(410, 20, 'btnExit', returnToMenu, this, 0, 1, 2);
  this.add(this.backButton)

  // Add play button
  this.btnPlay = this.game.add.button(20, 20, 'btnPlay', function() {
    this.game.state.getCurrentState().playGame()
  }, this);
  this.add(this.btnPlay);

  // Place it out of bounds
  this.x = 0;
  this.y = -100;
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.show = function() {
  this.game.add.tween(this).to({
    y: 0
  }, 500, Phaser.Easing.Bounce.Out, true);
};
PausePanel.prototype.hide = function() {
  this.game.add.tween(this).to({
    y: -100
  }, 200, Phaser.Easing.Linear.NONE, true);
};

// Create our game over panel extending Phaser.Group
var GameOverPanel = function(game, parent) {
  // Super call to Phaser.Group
  Phaser.Group.call(this, game, parent);

  // Add the panel
  this.panel = this.create(this.game.width / 2, 10, 'box');
  this.panel.anchor.setTo(0.5, 0.5);
  this.panel.scale.setTo(4, 4);

  // Add text
  this.gameOverText = this.game.add.bitmapText(315, -170, 'kenpixelblocks', 'Game Over', 50);
  this.add(this.gameOverText);

  yourScoreString = "You got a \ngrand total of \n\n\npoints! Bravo!"
  this.yourScoreText = this.game.add.bitmapText(330, -90, 'kenpixelblocks', yourScoreString, 30);
  this.yourScoreText.align = 'center';
  this.add(this.yourScoreText);

  this.yourPointsText = this.game.add.text(460, 0, BoilerGame.stats.score.toString(), {font: "65px Arial"});
  this.add(this.yourPointsText);

  tryAgain = function() {
    this.game.state.start('Game');
  }

  returnToLeaderboard = function() {
    this.game.state.start('Leaderboard');
  }

  this.tryAgainButton = this.game.add.button(310, 135, 'box', tryAgain, this);
  this.tryAgainButton.scale.setTo(1.5, 0.5);
  this.add(this.tryAgainButton)

  tryAgainString = "Try Again"
  this.tryAgainText = this.game.add.bitmapText(320, 150, 'kenpixelblocks', tryAgainString, 20);
  this.add(this.tryAgainText);

  this.leaderboardButton = this.game.add.button(500, 135, 'box', returnToLeaderboard, this);
  this.leaderboardButton.scale.setTo(1.5, 0.5);
  this.add(this.leaderboardButton)

  leaderboardString = "Leader\n         board"
  this.leaderboardText = this.game.add.bitmapText(520, 137, 'kenpixelblocks', leaderboardString, 18);
  this.add(this.leaderboardText);

  // Place it out of bounds
  this.x = 0;
  this.y = -500;
};

GameOverPanel.prototype = Object.create(Phaser.Group.prototype);
GameOverPanel.constructor = GameOverPanel;

GameOverPanel.prototype.show = function() {
  this.game.add.tween(this).to({
    y: this.game.height/2
  }, 500, Phaser.Easing.Bounce.Out, true);
};
GameOverPanel.prototype.hide = function() {
  this.game.add.tween(this).to({
    y: -100
  }, 200, Phaser.Easing.Linear.NONE, true);
};

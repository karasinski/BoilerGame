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

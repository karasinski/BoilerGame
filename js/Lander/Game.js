// Pause flag
var paused = true;

// Create our game unique game state
BoilerGame.Game = function(game) {};

BoilerGame.Game.prototype = {
  create: function() {
    // Enable arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    // Create ground, clouds, and hero
    BoilerGame.ground.create(this);
    BoilerGame.clouds.create(this);
    BoilerGame.hero.create(this);

    // Create touchArea, UI
    BoilerGame.touchArea.create(this);
    BoilerGame.UI.create(this);

    // Enter play mode
    this.playGame();
  },

  update: function() {
    // Revive dead clouds
    this.clouds.forEachDead(function(cloud) {
      cloud.revive();
      cloud.x = this.game.width + cloud.width / 2;
    }, this);

    // Collisions between hero and ground
    this.game.physics.arcade.collide(this.hero, this.ground);
  },

  heroJump: function() {
    if (!paused) {
      // Change hero velocity if touching the ground
      if (this.body.touching.down) {
        this.body.velocity.y -= 500;
      }
    }
  },

  pauseGame: function() {
    if (!paused) {
      // Enter pause
      paused = true;
      this.pausePanel.show();

      // Stop auto scrolling
      this.ground.autoScroll(0, 0);

      // Stop the hero
      this.hero.animations.currentAnim.paused = true;

      // Save the velocity of the hero before killing the body
      this.heroVelocityY = this.hero.body.velocity.y;

      // Kill the body
      this.hero.body = null;

      // Launch the tween
      this.heroTween.pause();
    }
  },

  playGame: function() {
    if (paused) {
      // Leaving pause
      paused = false;
      this.pausePanel.hide();

      // Anim ground
      this.ground.autoScroll(-100, 0);

      // play the runing animation of the hero
      this.hero.animations.currentAnim.paused = false;

      // Activate hero gravity
      this.game.physics.arcade.enableBody(this.hero);
      this.hero.body.allowGravity = true;
      this.hero.body.velocity.y = this.heroVelocityY;

      // Resume the tween
      this.heroTween.resume();
    }
  }
};

BoilerGame.ground = {
  create: function(BoilerGame) {
    // Add a scrolling ground
    BoilerGame.ground = BoilerGame.game.add.tileSprite(0, 640-50, 960, 70, 'ground');
    BoilerGame.game.physics.arcade.enableBody(BoilerGame.ground);
    BoilerGame.ground.body.immovable = true;
    BoilerGame.ground.body.allowGravity = false;
  }
};

BoilerGame.clouds = {
  create: function(BoilerGame) {

    // Add some moving clouds
    BoilerGame.clouds = BoilerGame.game.add.group();
    for (var i = 0; i < 3; i++) {
      var cloud = BoilerGame.game.add.sprite(
        BoilerGame.game.rnd.integerInRange(0, BoilerGame.game.width), 
        BoilerGame.game.rnd.integerInRange(0, 50), 
        'cloud');

      cloud.anchor.setTo(0.5, 0);
      BoilerGame.clouds.add(cloud);

      // Kill the cloud when out of bounds
      cloud.checkWorldBounds = true;
      cloud.outOfBoundsKill = true;

      // Move clouds
      BoilerGame.game.physics.arcade.enableBody(cloud);
      cloud.body.allowGravity = false;
      cloud.body.velocity.x = -BoilerGame.game.rnd.integerInRange(15, 30);
    }
  }
};

BoilerGame.hero = {
  create: function(BoilerGame) {

    // Add hero
    BoilerGame.hero = BoilerGame.game.add.sprite(180, 160, 'hero');
    BoilerGame.hero.anchor.setTo(0.5, 0.5);
    BoilerGame.hero.animations.add('run');
    BoilerGame.hero.animations.play('run', 20, true);
    BoilerGame.heroVelocityY = 0;

    // Animation loop on the hero
    BoilerGame.heroTween = BoilerGame.game.add.tween(BoilerGame.hero).to({
      x: 360
    }, 2500, Phaser.Easing.Linear.NONE, true, 0, Number.POSITIVE_INFINITY, true);
    BoilerGame.heroTween.pause();

    // Allow hero to jump (Spacebar and mouse/touch)
    BoilerGame.jumpKey = BoilerGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    BoilerGame.jumpKey.onDown.add(BoilerGame.heroJump, BoilerGame.hero);
  }
};

BoilerGame.touchArea = {
  create: function(BoilerGame) {
    // Create touch area
    BoilerGame.touchArea = BoilerGame.game.add.sprite(0, 0);
    BoilerGame.touchArea.width = BoilerGame.game.width;
    BoilerGame.touchArea.height = BoilerGame.game.height;
    BoilerGame.touchArea.inputEnabled = true;
    BoilerGame.touchArea.events.onInputDown.add(BoilerGame.heroJump, BoilerGame.hero);
  }
};

BoilerGame.UI = {
  create: function(BoilerGame) {
    // Add a pause button
    BoilerGame.btnPause = BoilerGame.game.add.button(20, 20, 'btnPause', BoilerGame.pauseGame, BoilerGame);

    // Let's build a pause panel
    BoilerGame.pausePanel = new PausePanel(BoilerGame.game);
    BoilerGame.game.add.existing(BoilerGame.pausePanel);
  }
};

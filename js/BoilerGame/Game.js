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

    // Reset the stats.
    BoilerGame.stats.create(this);

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
  create: function(that) {
    // Add a scrolling ground
    that.ground = that.game.add.tileSprite(0, 640 - 50, 960, 70, 'ground');
    that.game.physics.arcade.enableBody(that.ground);
    that.ground.body.immovable = true;
    that.ground.body.allowGravity = false;
  }
};

BoilerGame.clouds = {
  create: function(that) {
    // Add some moving clouds
    that.clouds = that.game.add.group();
    for (var i = 0; i < 6; i++) {
      var cloud = that.game.add.sprite(
        that.game.rnd.integerInRange(0, that.game.width),
        that.game.rnd.integerInRange(0, 50),
        'cloud');

      cloud.anchor.setTo(0.5, 0);
      that.clouds.add(cloud);

      // Kill the cloud when out of bounds
      cloud.checkWorldBounds = true;
      cloud.outOfBoundsKill = true;

      // Move clouds
      that.game.physics.arcade.enableBody(cloud);
      cloud.body.allowGravity = false;
      cloud.body.velocity.x = -that.game.rnd.integerInRange(15, 30);
    }
  }
};

BoilerGame.hero = {
  create: function(that) {
    // Add hero
    that.hero = that.game.add.sprite(180, 160, 'hero');
    that.hero.anchor.setTo(0.5, 0.5);
    that.hero.animations.add('run');
    that.hero.animations.play('run', 20, true);
    that.heroVelocityY = 0;

    // Animation loop on the hero
    that.heroTween = that.game.add.tween(that.hero).to({
      x: 360
    }, 2500, Phaser.Easing.Linear.NONE, true, 0, Number.POSITIVE_INFINITY, true);
    that.heroTween.pause();

    // Allow hero to jump (Spacebar and mouse/touch)
    that.jumpKey = that.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    that.jumpKey.onDown.add(this.jump, that.hero);

    // Temporarily use the UP key to save
    that.saveKey = that.input.keyboard.addKey(Phaser.Keyboard.UP)
    that.saveKey.onDown.add(BoilerGame.stats.save, BoilerGame.stats)
  },

  jump: function() {
    if (!paused) {
      // Change hero velocity if touching the ground
      if (this.body.touching.down) {
        this.body.velocity.y -= 500;

        // Increase score (they worked very hard)
        BoilerGame.stats.score += 1;
        BoilerGame.stats.update();
      }
    }
  }
};

BoilerGame.touchArea = {
  create: function(that) {
    // Create touch area
    that.touchArea = that.game.add.sprite(0, 0);
    that.touchArea.width = that.game.width;
    that.touchArea.height = that.game.height;
    that.touchArea.inputEnabled = true;
    that.touchArea.events.onInputDown.add(BoilerGame.hero.jump, that.hero);
  }
};

BoilerGame.UI = {
  create: function(that) {
    // Add a pause button
    that.btnPause = that.game.add.button(20, 20, 'btnPause', that.pauseGame, that);

    // Let's build a pause panel
    that.pausePanel = new PausePanel(that.game);
    that.game.add.existing(that.pausePanel);
  }
};

BoilerGame.stats = {
  score: 0,

  create: function(that) {
    this.score = 0;

    this.scoreText = that.game.add.text(
      that.game.width - 125, 25,
      "", {
        size: "32px",
        fill: "#333",
        align: "center"
      })

    this.update();
  },

  update: function() {
    this.scoreText.setText("SCORE\n" + this.score);
  },

  save: function() {
    if (typeof(Storage) !== 'undefined') {
      // Save the score
      try {
        localStorage.setItem(BoilerGame.NAME, this.score);
      } catch (e) {
        console.log('error', e)
      }
    }

    this.review();
  },

  review: function() {
    // Check saves in local storage
    saves = [];
    for (var i = 0; i < localStorage.length; i++) {
      keyName = localStorage.key(i)
      if (keyName.split('-')[0] == 'BoilerGame') {
        date = keyName.split('-')[1];
        score = localStorage.getItem(keyName);
        save = {
          date: date,
          score: score
        }
        saves.push(save);
      }
    }

    // Sort the saves so that the highest score comes first
    saves = saves.sort(function(a, b) {
      return b.score - a.score
    });
    console.log(saves)
  }

};

// Pause flag
var paused = true;

// Create our game unique game state
BoilerGame.Game = function(game) {};

BoilerGame.Game.prototype = {
  create: function() {
    // Set background color
    this.game.stage.backgroundColor = '#B4D9E7';

    // Add pause function
    this.game.onPause.add(function() {
      this.pauseGame();
    }, this);
    // and resume, which is nothing for now.
    // this.game.onResume.add(function(){}, this);

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

    // Reset the stats, start countdown.
    BoilerGame.stats.create(this);
    BoilerGame.timer.create(this, 10);

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

    // Check for end game (would prefer to do this differently)
    if (this.timer.done()) this.endGame();
  },

  pause: function() {
    // Enter pause
    paused = true;
    BoilerGame.timer.pause();

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
  },

  endGame: function() {
    // Let's build a game over panel
    this.gameOverPanel = new GameOverPanel(this.game);
    this.game.add.existing(this.gameOverPanel);

    this.gameOverPanel.show();
    this.pause();
  },

  pauseGame: function() {
    if (!paused) {
      this.pausePanel.show();
      this.pause();
    }
  },

  playGame: function() {
    if (paused) {
      // Leaving pause
      paused = false;
      this.pausePanel.hide();
      BoilerGame.timer.pause();

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
  },

  jump: function() {
    if (!paused) {
      // Change hero velocity if touching the ground
      if (this.body.touching.down) {
        this.body.velocity.y -= 500;

        // Increase score (they worked very hard)
        BoilerGame.stats.score += 1;
        BoilerGame.stats.update();

        // Save your score
        BoilerGame.stats.save();
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

BoilerGame.timer = {
  secs: 0,
  counter: 0,
  once: false,

  done: function() {
    // You can only be done once.
    done = false;

    if (this.secs == 0 && this.once == false) {
      this.once = true;
      done = true;
    }

    return done
  },

  create: function(that, time) {
    that.timer = BoilerGame.timer;
    that.timer.once = false;
    that.timer.set(time);
    that.timer.countdown();
  },

  set: function(secs) {
    this.secs = secs;
  },

  countdown: function() {
    // If the timer hasn't expired already...
    if (this.secs > 0) {
      // Create a new timeout
      this.counter = setTimeout(function() {
        BoilerGame.timer.decrement();
      }, 1000);
    }
  },

  decrement: function() {
    // Remove one off of seconds, end or continue countdown.
    this.secs--;
    // console.log(this.secs);
    if (this.secs != 0) {
      this.countdown();
    }
  },

  pause: function() {
    clearTimeout(this.counter);

    if (paused) {
      this.counter = 0;
    } else {
      this.countdown();
    }
  }
};

// Pause flag
var paused = true;

// Create our game unique game state
Game.Game = function(game){};

Game.Game.prototype = {
	preload: function(){},

	create: function(){
		// Enable arcade physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1200;

		// Add a scrolling ground
		this.ground = this.game.add.tileSprite(0, 250, 480, 70, 'ground');
		this.game.physics.arcade.enableBody(this.ground);
		this.ground.body.immovable = true;
		this.ground.body.allowGravity = false;

		// Add some moving clouds
		this.clouds = this.game.add.group();
		for(var i=0; i<3; i++){
			var cloud = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, 50), 'cloud');
			cloud.anchor.setTo(0.5, 0);
			this.clouds.add(cloud);

			// Kill the cloud when out of bounds
			cloud.checkWorldBounds = true;
 				cloud.outOfBoundsKill = true;

 				// Move clouds
 				this.game.physics.arcade.enableBody(cloud);
 				cloud.body.allowGravity = false;
			cloud.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
		}

		// Add hero
		this.hero = this.game.add.sprite(180, 160, 'hero');
		this.hero.anchor.setTo(0.5, 0.5);
		this.hero.animations.add('run');
		this.hero.animations.play('run', 20, true);
		this.heroVelocityY = 0;

		// Animation loop on the hero
		this.heroTween = this.game.add.tween(this.hero).to({x: 360}, 2500, Phaser.Easing.Linear.NONE, true, 0, Number.POSITIVE_INFINITY, true);
		this.heroTween.pause();

		// Allow hero to jump (Spacebar and mouse/touch)
		this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpKey.onDown.add(this.heroJump, this.hero);
		
		// Create touch area
		this.touchArea = this.game.add.sprite(0, 0);
		this.touchArea.width = this.game.width;
		this.touchArea.height = this.game.height;
		this.touchArea.inputEnabled  = true;
		this.touchArea.events.onInputDown.add(this.heroJump, this.hero);

		// Add a pause button
		this.btnPause = this.game.add.button(20, 20, 'btnPause', this.pauseGame, this);

		// Let's build a pause panel
		this.pausePanel = new PausePanel(this.game);
		this.game.add.existing(this.pausePanel);

		// Enter play mode
		this.playGame();
	},

	update: function(){
		// Revive dead clouds
		this.clouds.forEachDead(function(cloud){
			cloud.revive();
			cloud.x = this.game.width + cloud.width/2;
		}, this);

		// Collisions between hero and ground
		this.game.physics.arcade.collide(this.hero, this.ground);
	},

	heroJump: function(){
		if(!paused){
			// Change hero velocity if touching the ground
			if(this.body.touching.down){
				this.body.velocity.y -= 500;
			}
		}
	},

	pauseGame: function(){
		if(!paused){
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

	playGame: function(){
		if(paused){
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

// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	this.panel = this.create(this.game.width/2, 10, 'panel');
	this.panel.anchor.setTo(0.5, 0);

	// Add text
	this.pauseText = this.game.add.bitmapText(100, 20, 'kenpixelblocks', 'Game paused', 24);
	this.add(this.pauseText);
	this.cloudsText = this.game.add.bitmapText(100, 50, 'kenpixelblocks', 'Clouds are still moving :)', 16);
	this.add(this.cloudsText);

	// Add play button
	this.btnPlay = this.game.add.button(20, 20, 'btnPlay', function(){
		this.game.state.getCurrentState().playGame()}
	, this);
	this.add(this.btnPlay);

	// Place it out of bounds
	this.x = 0;
	this.y = -100;
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.show = function(){
	this.game.add.tween(this).to({y:0}, 500, Phaser.Easing.Bounce.Out, true);
};
PausePanel.prototype.hide = function(){
	this.game.add.tween(this).to({y:-100}, 200, Phaser.Easing.Linear.NONE, true);
};

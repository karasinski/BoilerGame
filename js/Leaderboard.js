BoilerGame.Leaderboard = function(game) {};

BoilerGame.Leaderboard.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#000';
    start_x = this.game.width - 100;
    start_y = 50;
    backButton = this.add.button(start_x, start_y,
                                 'btnExit', this.returnToMenu, this, 0, 1, 2);

    this.drawLeaderboard();
  },

  returnToMenu: function() {
    // start the menu state
    this.game.state.start('MainMenu');
  },

  // draw a pretty shitty leaderboard
  drawLeaderboard: function() {
    data = BoilerGame.stats.review();
    scores = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);

    for (i = 0; i < data.length; i++) {
      scores[i] = data[i].score;
    }

    text = "- Leaderboard -\n\n";
    for (i = 0; i < 5; i++) {
      text += (i + 1).toString() + '.      ' + scores[i] + '\n';
    }

    style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    t = this.game.add.text(this.game.world.centerX-200, 0, text, style);
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
    
    // Should probably remove low scoring games after a while rather than just ignoring them.
    return saves
  }
};

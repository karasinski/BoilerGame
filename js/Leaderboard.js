BoilerGame.Leaderboard = function(game) {};

BoilerGame.Leaderboard.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#444';

    x = 325, y = 550;
    backButton = this.game.add.button(x, y, 'box', this.returnToMenu, this);
    backButton.scale.setTo(1.5, 0.5);

    backString = "Back"
    backText = this.game.add.bitmapText(x + 45, y + 15, 'kenpixelblocks', backString, 20);

    this.drawLeaderboard();
  },

  returnToMenu: function() {
    // start the menu state
    this.game.state.start('MainMenu');
  },

  // draw a pretty shitty leaderboard
  drawLeaderboard: function() {
    data = BoilerGame.stats.review();
    scores = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);

    for (i = 0; i < data.length; i++) {
      scores[i] = data[i].score;
    }

    title = "Leaderboard\n\n";
    text = "", scoresText = "";
    for (i = 0; i < 5; i++) {
      text += (i + 1).toString() + '.\n';
      scoresText += scores[i] + '\n';
    }

    style = {
      font: "65px Arial",
      fill: "#CCC",
      align: "right"
    };

    this.game.add.text(this.game.world.centerX -200, 0, title, style);
    this.game.add.text(325, 150, text, style);
    this.game.add.text(525, 150, scoresText, style);
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

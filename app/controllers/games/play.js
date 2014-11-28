import Ember from 'ember';

export default Ember.ObjectController.extend({

  correctGuess: false,
  hasGuessed: false, // dont show feedback until the player has guessed
  showChoices: false,
  currentlyTasting: null, // this is the unknown drink the player is tasting and will guess
  guess: null,
  randomMaterials: [],

  correctGuesses: [],
  wrongGuesses: [],

  actions: {
    // player has tasted a drink and they click the number of the drink they tasted,
    // so they should see the possible names of the drink they just tasted
    toggleChoices: function(unknown_material_id) {
      var game = this.get('model');
      this.set('currentlyTasting', unknown_material_id);
      this.set('randomMaterials', this.shuffle(game.get('materials').toArray()) );
      this.set('showChoices', true );

      $(".unknown-material-list li").each(function(index){
        $(this).removeClass("active");
      });

      var item = $("li#" + unknown_material_id);
      item.addClass("active");

    },

    // player is guessing that the drink they just tasted is this material
    guessMaterial: function(material_id) {
      this.set('guess', material_id);

      var game = this.get("model");
      var tastingId = this.get('currentlyTasting');
      var guessId = material_id;
      var btn = $("li#" + tastingId + " > button");

      // create the answer in the db
      this.add_answer(game, tastingId, material_id);

      // cleanup controller
      this.set("hasGuessed", true);
      this.set('currentlyTasting', null);
      this.set('showChoices', false);


      this.respondToChoice(guessId, tastingId)
    }
  },

  // we want to shuffle the materials so the player really has to guess
  shuffle: function(array) {

    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  // save every answer to the db
  add_answer: function(game, tastingId, guessId) {
    var answer = this.store.createRecord('answer', {
      guessed_material_id: tastingId,
      actual_material_id: guessId,
      game: game,
      user_id: this.get('session.user.id')
    });

    answer.save();

    game.get("answers").then(function(answers){
      answers.pushObject(answer);
      game.save();
    });
  },
  respondToChoice: function(guessId, tastingId) {
    if( guessId === tastingId ) {
        this.set("correctGuess", true);
      } else {
        this.set("correctGuess", false);
      }
  }
});

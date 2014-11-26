import Ember from 'ember';

export default Ember.ObjectController.extend({

  correctGuess: false,
  hasGuessed: false, // dont show feedback until the player has guessed
  showChoices: false,
  currentlyTasting: null, // this is the unknown drink the player is tasting and will guess
  guess: null,
  randomMaterials: [],


  actions: {
    // player has tasted a drink and they click the number of the drink they tasted,
    // so they should see the possible names of the drink they just tasted
    toggleChoices: function(unknown_material_id) {
      this.set('currentlyTasting', unknown_material_id);
      this.set('randomMaterials', this.shuffle(this.get('model.materials').toArray()) );
      this.set('showChoices', true );
    },

    // player is guessing that the drink they just tasted is this material
    guessMaterial: function(material_id) {
      this.set('guess', material_id)
      if( this.get('guess') == this.get('currentlyTasting') ) {
        this.set("correctGuess", true)
        this.set("hasGuessed", true)
        this.set('currentlyTasting', null);
        this.set('showChoices', false);

        // add answer
        var answer = this.store.createRecord('answer',{
          guessed_material_id: material_id,
          actual_material_id: material_id,
          user_id: null
        });
        answer.save();
        this.get("model.answers").pushObject(answer);

      } else {
        this.set("correctGuess", false)
        this.set("hasGuessed", true)
        this.set('currentlyTasting', null);
        this.set('showChoices', false);

        // TODO: refactor this, and the same 'add answer' code from above
        // into a method within this controller
        // add answer
        var answer = this.store.createRecord('answer',{
          guessed_material_id: this.get('currentlyTasting'),
          actual_material_id: material_id,
          user_id: null
        });
        answer.save();
        this.get("model.answers").pushObject(answer);
      }
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
    }

});

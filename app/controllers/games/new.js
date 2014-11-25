import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createGame: function(params) {
      // use name to create new game
      var name = this.get('gameName');
      var game = this.store.createRecord('game',{
          name: name
      });
      game.save();

      this.transitionToRoute('games.show', game)
    }
  }
});

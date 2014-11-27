import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    addMaterial: function() {
      var game = this.get('model');
      var name = this.get('materialName');
      var position = game.get('materials').toArray().length + 1
      var material = this.store.createRecord('material',{
          name: name,
          position: position,
          // TODO: add game_id???
          game: game
      });

      material.save();

      this.set('materialName', "")

      game.get("materials").then(function(materials) {
        materials.pushObject(material);
        game.save();
      });
    },

    setPrepared: function() {
      var game = this.get('model');
      game.set("prepared", true);
      game.save();
    }
  }
});

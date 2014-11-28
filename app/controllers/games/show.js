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

    removeMaterial: function(material_id) {
      this.store.find('material', material_id).then(function (material) {
        this.get('model').removeObject(); // remove from game
        material.deleteRecord(); // delete from here
        material.get('isDeleted'); // => true
        material.save(); // => DELETE to /material/:material_id
      });
    },

    setPrepared: function() {
      var game = this.get('model');
      game.set("prepared", true);
      game.save();
    },

    deleteGame: function() {
      var game = this.get('model');
      game.deleteRecord();
      // TODO: delete all the answers and materials...
      game.save();

      this.transitionTo('/');
    }
  }
});

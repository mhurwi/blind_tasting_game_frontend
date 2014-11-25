import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    addMaterial: function() {
      var name = this.get('materialName');
      var material = this.store.createRecord('material',{
          name: name,
      });

      material.save();

      this.set('materialName', "")

      this.get("model.materials").pushObject(material);
    },

    setPrepared: function() {
      this.set("model.prepared", true)
    }
  }
});

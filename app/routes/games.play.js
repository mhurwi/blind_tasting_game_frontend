import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('game', params.game_id);
  },
  setupController: function(controller, model) {
    controller.set('randomlySortedMaterials', [1,2,3])
  }
});

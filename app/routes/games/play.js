import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition: function(transition) {
      this.controller.set('hasGuessed', false);
    }
  }
});

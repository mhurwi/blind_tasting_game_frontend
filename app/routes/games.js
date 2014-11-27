import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('game');
  },
  actions: {
    logout: function() {
      this.get('session.auth').logout();
    }
  }
});

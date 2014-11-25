import Ember from 'ember';

export default Ember.ObjectController.extend({
  showChoices: false,
  currentlyTasting: null,
  guess: null,
  actions: {
    guessMaterial: function(material_id) {
      this.set('guess', material_id)
      if( this.get('guess') == this.get('currentlyTasting') ) {
        alert('You got it right!');
        this.set('currentlyTasting', null);
        this.set('showChoices', false);
        alert(params.material_id)
      } else {
        alert('wrong');
        this.set('currentlyTasting', null);
        this.set('showChoices', false);
      }
    },
    toggleChoices: function(unknown_material_id) {
      this.set('currentlyTasting', unknown_material_id);
      this.set('showChoices', !this.get('showChoices') );
    }
  }
});

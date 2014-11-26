import DS from 'ember-data';

var Answer = DS.Model.extend({
  // correct: DS.attr('boolean'),
  guessed_material_id: DS.attr(),
  actual_material_id: DS.attr(),
  user_id: DS.attr('string'),
  game: DS.belongsTo('game'),

  actions: {
    isCorrect: function() {
      return this.get('guessed_material_id') == this.get('actual_material_id')
    }
  }
});

export default Answer;
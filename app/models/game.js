import DS from 'ember-data';

var Game = DS.Model.extend({
  name:  DS.attr(),

  // state of 'preparing' means the game
  // needs to be setup.  need to add materials
  // that are being tasted.
  prepared: DS.attr('boolean'),

  // stuff that will be tasted in this game
  materials: DS.hasMany('material', {async: true}),

  // to track points
  answers: DS.hasMany('answer', {async: true})
});

// Need to add /app/adapters/game.js and specificy the FixturesAdapter to use these:
Game.reopenClass({
  FIXTURES: [
    {
      id: 1,
      prepared: true,
      name: "Whiskey",
      materials: [1,2,3,4] // various whiskeys that will be tasted
    },
    {
      id: 2,
      prepared: false,
      name: "Beer"
    }
  ]
});

export default Game;
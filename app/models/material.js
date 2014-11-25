import DS from 'ember-data';

var Material = DS.Model.extend({
  name: DS.attr(),
  game: DS.belongsTo('game', {async: true})
});

Material.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: "Jim Beam",
      game: 1
    },
    {
      id: 2,
      name: "Eagle Rare",
      game: 1
    },
    {
      id: 3,
      name: "Maker's Mark",
      game: 1
    },
    {
      id: 4,
      name: "Pappy Van Winkle",
      game: 1
    },

  ]
})


export default Material;
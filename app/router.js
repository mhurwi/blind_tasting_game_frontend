import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('games', { path: "/"}, function(){
  });
  this.route('games.new', { path: "/new"})
  this.route('games.show', { path: '/:game_id' }, function() { });
  this.route('games.play', { path: '/:game_id/play' }, function() { });
});

export default Router;

/* globals Firebase */

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://blindtasting.firebaseio.com/")
})
Template.userProfile.helpers({
  memberOf: function() {
    var myQuery = Teams.find({members: this._id},{name:1});
    if (myQuery.fetch().length) return myQuery;
  },
  roleIn: function(myRole) {
	var query = {};
	query[myRole] = this._id;
	var myQuery = Teams.find( query,{name:1});
	if (myQuery.fetch().length) return myQuery;
	}
});

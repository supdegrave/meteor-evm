Session.set('userInScope', this);

Template.userProfile.helpers({
	userInScope: function() {
		return Session.get('userInScope');
	},
  memberOf: function() {
    var myQuery = Teams.find({"members._id": this._id},{name:1});
    if (myQuery.fetch().length) return myQuery;
  },
  roleIn: function(myRole) {
	var query = {};
	query[myRole] = this._id;
	var myQuery = Teams.find( query,{name:1});
	if (myQuery.fetch().length) return myQuery;
	}
});

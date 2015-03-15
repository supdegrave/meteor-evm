Template.myTeams.helpers({
	memberOf: function() {
	    var myQuery = Teams.find({members: Meteor.userId()},{fields:{name:1}});
	    if (myQuery.fetch().length) return myQuery;
	  },
	roleIn: function(myRole) {
	    var query = {};
	    query[myRole] = Meteor.userId();
	    var myQuery = Teams.find( query,{name:1});
	    return myQuery.fetch().length && myQuery;
	}
});
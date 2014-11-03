Meteor.startup(function() {
	Meteor.subscribe('roles');
	Meteor.subscribe('userdatarestrictions');
	
	Tracker.autorun(function(e) {
		Meteor.subscribe('filteredUsers', Session.get('userFilter'));
	});
});
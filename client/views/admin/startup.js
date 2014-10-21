Meteor.startup(function() {
	Meteor.subscribe('roles');
	Meteor.subscribe('userdatarestrictions');
	
	Deps.autorun(function(e) {
		Meteor.subscribe('filteredUsers', Session.get('userFilter'));
	});
});
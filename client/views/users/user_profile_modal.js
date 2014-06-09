Template.userProfileModal.helpers({
	userInScope: function() {
		return Session.get('userInScope');
	},
});

Template.userProfileModal.rendered = function() { 
  $('.modal').modal('setting', 'transition', 'vertical flip');
};
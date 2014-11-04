Template.userProfileModal.helpers({
	userInScope: function() {
    $('.modal').modal('refresh');
		return Session.get('userInScope');
	},
});

Template.userProfileModal.rendered = function() { 
  $('.modal').modal('setting', 'transition', 'vertical flip');
};
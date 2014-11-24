Template.userProfileModal.helpers({
	userInScope: function() {
//     console.log("userProfileModal.helpers : " + "userInScope");
		return Session.get('userInScope');
	},
});

Template.userProfileModal.rendered = function() { 
  $('#userprofile.modal').modal().modal('setting', 'transition', 'vertical flip');
};

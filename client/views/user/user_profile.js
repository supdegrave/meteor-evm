var modalContent;

Template.userProfile.helpers({
  memberOf: function() {
    var myQuery = Teams.find({members: this._id},{fields:{name:1}});
    if (myQuery.fetch().length) return myQuery;
  },
  
  roleIn: function(myRole) {
    var query = {};
    query[myRole] = this._id;
    var myQuery = Teams.find( query,{name:1});
    return myQuery.fetch().length && myQuery;
  }
});

Template.userProfile.events({
  'click .modalCallButton': function(event, template) {
      Session.set('userInScope', this);
      var modalTarget = $(event.currentTarget).data("target");
      $(modalTarget).modal('show');
    },
});

Template.userProfile.rendered = function() {
  modalContent = document.getElementById('modalContent');
};


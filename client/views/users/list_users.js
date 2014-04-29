Template.listUsers.helpers({
  users: function() {
    var filter        = Session.get("userFilter"), 
        filterOptions = {$regex: filter, $options: 'i'},
        queryLimit    = 25;
    
    if(!!filter) {      
  		users = Meteor.users.find({
  			$or: [
  				{'profile.name': filterOptions},
  				{'emails.address': filterOptions},
  				{'username': filterOptions},
  			]
  		}, {sort: {emails: 1}, limit: queryLimit});
  	} else {
  		users = Meteor.users.find({}, {sort: {emails: 1}, limit: queryLimit});
  	}
  	return users;
  },

  myself: function(userId) {
    return Meteor.userId() === this._id;
  },

  isOrganizer: function() {
    return this.organizer;
  }, 

  memberOfTeams: function(userId) {
    return Teams.find({members:{$in: [this._id]}},{name:1});
  }
});

Template.listUsers.events({
  'click .glyphicon-info-sign': function(event, template) {
    Session.set('userInScope', this);
  }   
});

// Template.listUsers.rendered = function() { 
// };
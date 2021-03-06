Template.accountsAdmin.helpers({
  users: function() {
    return filteredUserQuery(Meteor.userId(), Session.get("userFilter"));
  },

  email: function () {
    if (this.emails && this.emails.length)
    return this.emails[0].address;

    if (this.services) {
      //Iterate through services
      for (var serviceName in this.services) {
        var serviceObject = this.services[serviceName];
        //If an 'id' isset then assume valid service
        if (serviceObject.id) {
          if (serviceObject.email) {
            return serviceObject.email;
          }
        }
      }
    }
    return "";
  },

  searchFilter: function() {
    return Session.get("userFilter");
  },

  myself: function(userId) {
    return Meteor.userId() === userId;
  },
  
  isOrganizer: function() {
    return Roles.userIsInRole(this._id, "organizer");
  }, 
});

// search no more than 2 times per second
var setUserFilter = _.throttle(function(template) {
  var search = template.find(".search-input-filter").value;
  Session.set("userFilter", search);
  }, 500);

  Template.accountsAdmin.events({
    'keyup .search-input-filter': function(event, template) {
      setUserFilter(template);
      return false;
    },

    'click .modalCallButton': function(event, template) {
      Session.set('userInScope', this);
      var modalTarget = $(event.currentTarget).data("target");
      console.log("$(event.currentTarget).data('target') : "+ modalTarget);
      $(modalTarget).modal('show');
    },
    
    'click .check-organizer': function(evt, tmpl) {
      var method = evt.currentTarget.checked 
        ? 'addUsersToRoles' 
          : 'removeUsersFromRoles';
          
      if (this) {
        Roles[method](this, "organizer");
      }
    }
  });

  Template.accountsAdmin.rendered = function() {
    var searchElement = document.getElementsByClassName('search-input-filter');
    if(!searchElement)
    return;
    var filterValue = Session.get("userFilter");

    var pos = 0;
    if (filterValue)
    pos = filterValue.length;

    searchElement[0].focus();
    searchElement[0].setSelectionRange(pos, pos);

    $('.modal').modal('setting', 'transition', 'vertical flip');
    $('.ui.checkbox').checkbox();
  };
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

  // initialize calendar view
  $('#myAgenda').fullCalendar({
    defaultView: 'basicWeek',
    
    // populate events 
    events: function(start, end, timezone, callback) {
      callback(Events.find({volunteers: Meteor.userId()}).fetch()); 
    },
    
    // when event is rendered, rewrite its default contents
    eventRender: function(event, element) {
      var node = element.context;
      node.removeChild(node.childNodes[0]);
      Blaze.renderWithData(Template.calendarEvent, event, node);
    },
    
    // // when event is clicked, show edit modal and load event template
    // eventClick: function(calEvent, jsEvent, calView) {
    //   selectedShift = calEvent;
    //   Session.set('selectedShift', selectedShift);
    // 
    //   $('#editShiftModal').modal('show');
    //   Blaze.renderWithData(
    //     Template.editShiftModalContent, // template to use for rendering event data
    //     calEvent,                       // event data
    //     modalContent,                   // node to render within
    //     modalContent.firstChild         // node to render before
    //   );
    // }
  });
};


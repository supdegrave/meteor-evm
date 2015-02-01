var modalContent,  // used for manipulating modal content per event 
    selectedShift; // holds current event 
    
Template.dashboard.rendered = function() {
  modalContent = document.getElementById('modalContent');
  
  // initialize calendar view
  $('#calendar').fullCalendar({
    // populate events 
    events: function(start, end, timezone, callback) {
      callback(Events.find().fetch()); 
    },
    // when event is rendered, rewrite its default contents
    eventRender: function(event, element) {
      var node = element.context;
      node.removeChild(node.childNodes[0]);
      Blaze.renderWithData(Template.calendarEvent, event, node);
    },
    // when event is clicked, show edit modal and load event template
    eventClick: function(calEvent, jsEvent, calView) {
      selectedShift = calEvent;
      Session.set('selectedShift', selectedShift);

      $('#editShiftModal').modal('show');
      Blaze.renderWithData(
        Template.editShiftModalContent, // template to use for rendering event data
        calEvent,                       // event data
        modalContent,                   // node to render within
        modalContent.firstChild         // node to render before
      );
    }
  });


  // initialize modal dialog
  $('#editShiftModal')
    .modal('setting', 'transition', 'vertical flip')
    .modal({
      // initialization on display of modal 
      onShow: function() {
        // clear HTML content before resetting in calendar.eventClick() 
        // convert childNodes to a JavaScript array
        var nodeArray = Array.prototype.slice.call(modalContent.childNodes);
        // iterate array, removing all nodes other than #editActions
        nodeArray.forEach(function(node) { 
          if ('editActions' !== node.id) {
            modalContent.removeChild(node);
          }; 
        });
      },
      // cancel button functionality
      onDeny: function() {
        Session.set(selectedShift, null); 
        selectedShift = null;
      },
      // create button functionality 
      onApprove: function() {
        var serverMethod = selectedShift.requiresApproval ? 'addVolunteerRequest' : 'addVolunteer';

        Meteor.call(serverMethod, selectedShift._id, Meteor.userId(), function(error, response) {
          if (error) {
            // TODO: properly handle error
            console.error('%s failed: %o', serverMethod, error); 
          }
        });
        
        Session.set(selectedShift, null); 
        selectedShift = null;
      }
    });
};

Template.dashboard.helpers({
  firstlogin: function(){
    var user = Meteor.users.findOne({_id: Meteor.userId()});
    return user
      && user.services 
      && user.services.resume 
      && user.services.resume.loginTokens 
      && user.services.resume.loginTokens.length<1;
  }
})
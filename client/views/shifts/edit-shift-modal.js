// Template.editShiftModalContent.events({
// });

Template.editShiftModalContent.helpers({
  hasSpaces: function() {
    return this.spacesAvailable - this.volunteers.length;
  }
});

Template.editShiftModalContent.rendered = function() {
  var shift = this.data,
      button = $('div.positive.button');
      
  if (shift.volunteers.length === parseInt(shift.spacesAvailable)) {
    button.addClass('disabled');
  }
  else {
    button.removeClass('disabled');
  }
};

Template.editShiftModal.helpers({
  selectedShift: function() {
    return Session.get('selectedShift');
  }
});

// Template.editShiftModal.rendered = function() {
// };

/*
{
  "_id": "2LRqMMkJzkC8jkMZj",
  "title": "Limited Rota Test",
  "teamId": "aj2apwTQN3A5dRr49",
  "id": "aj2apwTQN3A5dRr49_Limited_Rota Test",
  "start": "2015-01-13T07:00:00.000Z",
  "end": "2015-01-13T11:00:00.000Z",
  "requiresApproval": false,
  "spacesAvailable": "8",
  "volunteers": [],
  "requests": [],
  "source": {
    "className": []
  },
  "className": [],
  "allDay": false,
  "_allDay": false,
  "_start": "2015-01-13T07:00:00.000Z",
  "_end": "2015-01-13T11:00:00.000Z"
}
*/
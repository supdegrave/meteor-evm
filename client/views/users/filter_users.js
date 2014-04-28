Template.filterUsers.helpers({

  teams: function() {
    return Teams.find({},{name:1, members:1});
  },
  teamMemberCount: function() {
      /*var bodyCount = 0;
      if (!this.members) {
          return;
      }
      for (member in this.members) {
          bodyCount++;
      }
      return bodyCount;*/
      return this.members.length;
  },
  searchFilter: function() {
    return Session.get("userFilter");
  }
});

/*Search Magic*/

// search no more than 2 times per second
var setUserFilter = _.throttle(function(template) {
    var search = template.find(".search-input-filter").value;
    Session.set("userFilter", search);
  }, 500);

Template.filterUsers.events({
  'keyup .search-input-filter': function(event, template) {
    setUserFilter(template);
    return false;
  },
});

Template.filterUsers.rendered = function(){
  
  $('.input-daterange.input-group.date').datepicker({
    autoclose: true
  });

  $('select.selectpicker').selectpicker();

  var searchElement = document.getElementsByClassName('search-input-filter');
  if(!searchElement)  return;

  var filterValue = Session.get("userFilter");

  var pos = 0;
  if (filterValue)
  pos = filterValue.length;

  searchElement[0].focus();
  searchElement[0].setSelectionRange(pos, pos);


};


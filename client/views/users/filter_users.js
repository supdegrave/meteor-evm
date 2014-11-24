Template.filterUsers.helpers({
  teams: function() {
    var query = Teams.find({},{name:1, members:1});
    return query;
  },

  teamMemberCount: function() {
    return this.members.length;
  },

  searchFilter: function() {
    return Session.get("userFilter");
  },
});

/*Search Magic*/
// search no more than 2 times per second
var setUserFilter = _.throttle(function(template) {
  var search = template.find(".search-input-filter").value;
  Session.set("userFilter", search);
}, 500);
var teamFilterArray=[];

Template.filterUsers.events({
  'keyup .search-input-filter': function(event, template) {
    setUserFilter(template);
    return false;
  }, 
  
  'change #filterByTeam .teamSelectMenu input[type="checkbox"]': function(evt, tmpl) {
    $(evt.currentTarget).prop("checked")
      ? teamFilterArray.push($(evt.currentTarget).attr("id"))
      : teamFilterArray.splice( $.inArray($(evt.currentTarget).attr("id"),teamFilterArray) ,1 );
    Session.set("teamFilter", teamFilterArray);
  }
});

Template.filterUsers.rendered = function(){
  
  /*$('.input-daterange.input-group.date').datepicker({
    autoclose: true
  });*/ /*Disabled for now*/

  $('#filterByTeam .ui.dropdown').dropdown();

  var searchElement = document.getElementsByClassName('search-input-filter');
  if(!searchElement)  return;

  var filterValue = Session.get("userFilter");

  var pos = 0;
  if (filterValue)
  pos = filterValue.length;

  searchElement[0].focus();
  searchElement[0].setSelectionRange(pos, pos);
};

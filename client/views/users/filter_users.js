var updateSelect = function() {
  var sel = $('select.selectpicker');
  if (sel) { 
    // Hacky fix to bug: change event trigerred before original select to read from is re-populated
    setTimeout(function() {
      sel.selectpicker('refresh');
    }, 0);
  }
  else console.log("$('select.selectpicker') cannot be found!");
};

Template.filterUsers.helpers({
  teams: function() {
    var query = Teams.find({},{name:1, members:1});
    query.observeChanges({
      added:   updateSelect,
      removed: updateSelect,
      changed: updateSelect,
    });
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

Template.filterUsers.events({
  'keyup .search-input-filter': function(event, template) {
    setUserFilter(template);
    return false;
  }, 
  
  'change select.selectpicker': function(evt, tmpl) {
    Session.set("teamFilter", $(evt.currentTarget).val());
  }
});


Template.filterUsers.rendered = function(){
  $('.input-daterange.input-group.date').datepicker({
    autoclose: true
  });
  
  setTimeout(function(){$('select.selectpicker').selectpicker();},0);

  var searchElement = document.getElementsByClassName('search-input-filter');
  if(!searchElement)  return;

  var filterValue = Session.get("userFilter");

  var pos = 0;
  if (filterValue)
  pos = filterValue.length;

  searchElement[0].focus();
  searchElement[0].setSelectionRange(pos, pos);
};

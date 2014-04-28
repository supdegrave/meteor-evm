
var updateSelect= function(){
  //myDep.depend();
  // Making sure we don't target a non existing input
  if ($('select.selectpicker')){ 
    // Hacky fix to bug: change event trigerred before original select to read from is re-populated
    setTimeout(function(){$('select.selectpicker').selectpicker('refresh');},0);
  }
  else console.log("$('select.selectpicker') cannot be found!");
};

Template.filterUsers.helpers({
  teams: function() {
    var query =  Teams.find({},{name:1, members:1});
    query.observeChanges({
      added:function(){ updateSelect(); },
      removed:function(){ updateSelect(); },
      changed:function(){ updateSelect(); },
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
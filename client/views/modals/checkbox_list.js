Template.checkboxListWrapper.events = {
  'click .checkbox': function(event,template) {
    var checkedListItems =[];
    template.$(".checked").each(
      function(index){
        var itemId = $(this).data("id");
        checkedListItems.push(itemId)
    });
    Session.set("checkedList",checkedListItems);
  },
};                                     
Template.checkboxListWrapper.rendered = function() { 
  this.autorun(function() {
    if (Session.get("flushDataCallback")) {
     $('.ui.checkbox').checkbox("uncheck");
     Session.set("flushDataCallback",false);
    }
  });
};

Template.teamCheckboxListItem.rendered = function() { 
  this.$('.ui.checkbox').checkbox();
};

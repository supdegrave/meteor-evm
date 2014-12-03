Template.checkboxListWrapper.rendered=function() {
  var self = this;
  this.autorun(function(){
    if (Session.get("checkedList")===null) {
      self.$('.ui.checkbox').checkbox("uncheck");
  }});
};

Template.teamCheckboxListItem.rendered = function() { 
  this.$('.ui.checkbox').checkbox();
};
Template.teamCheckboxListItem.events = {
  'click .checkbox': function(event,template) {
    var checkList = [];
    if(!!Session.get("checkedList")) checkList = _.clone(Session.get("checkedList"));
    if(_.contains(checkList, this.id)) {
      var withoutMe =_.without(checkList, this.id);
      Session.set("checkedList",withoutMe);
    }
    else {
      checkList.push(this.id);
      Session.set("checkedList",checkList);
    }
      
      
  },
}
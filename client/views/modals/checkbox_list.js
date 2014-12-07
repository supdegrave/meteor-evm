Template.checkboxListWrapper.rendered=function() {
  var self = this;
  this.autorun(function(){
    if (Session.get("checkedList")===null) {
      self.$('.ui.checkbox').checkbox("uncheck");
  }});
};

Template.checkboxListItem.rendered = function() { 
  this.$('.ui.checkbox').checkbox();
};
Template.checkboxListItem.events = {
  'click .checkbox': function(event,template) {
    var checkList = [];
    if(!!Session.get("checkedList")) checkList = _.clone(Session.get("checkedList"));
    if(_.contains(checkList, this)) {
      var withoutMe =_.without(checkList, this);
      Session.set("checkedList",withoutMe);
    }
    else {
      checkList.push(this);
      Session.set("checkedList",checkList);
    }
  },
}
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
  'click .ui.checkbox': function(event,template) {
    var checkList = [];
    if(!!Session.get("checkedList")) checkList = _.clone(Session.get("checkedList"));
    // Underscore magic: checks if object is already in checkList, and removes it if it is
    if(_.any(checkList, function(item){ return _.isEqual(item, template.data); })) {
      console.dir("need to remove this:" + template.data)
      checkList =_.without(checkList, _.findWhere(checkList, template.data));
    }
    else {
      checkList.push(template.data);
    }
      Session.set("checkedList",checkList);
  },
}
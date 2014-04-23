## admin tasks
  
  * ~~merge team-centric back to master and notify Nico~~
  * figure out meteor developer account info and send to Nico
  * ~~move each template into its own file~~
  * ?? refactor data from routes into template helpers ?? 

## site features 

* TEAM: 
  - assign to parent team 
  - add child team to existing
    sub-team owner is same as parent team
      - FUTURE: sub-team owner is same as lead of parent team
        - and then, edit hierarchy gets really fun!
  - edit team name, change to filter by _id (new route: /:name/:id, filter .findOne({_id: id}))
    - ?? what happens if you go to /team/:name without /:id ?? 
  - save email address changes! 
  - implement add member
  - contentEditable on mouseOver (if canEdit) : https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable
    - how to handle mobile? 
      - edit button? (based on userAgent?)
  - disable cancel / save unless dirty 
  - FUTURE: ?? show team hierarchy

  
* ADMIN: 
  - viewable by anyone with canEdit, not just admin 
  - ~~remove 'add team' functionality~~
  - FUTURE: if lead/co-lead, see 'add to team' button next to user
  

* USERS: 
  - Nico is going to figure out what should be here! 


* USER (INDIVIDUAL): 
  - profile edit (from initial TODO.md) if user._id === Meteor.userId() 
  - 'My Teams' links to any team where you have a role 


* ORG CHART: 
  - ~~link team name to team, organizer to user page~~
  - ~~'add team' functionality moved here, inline with board member view, below current teams~~
    - ~~if board member, see 'add team' below your current teams~~
    - ~~if admin, see 'add team' below each board member's team list~~
  - think about how to do sub-teams 
    - tree control
      - https://github.com/mbraak/jqTree
      
## other / future 

* find Rails resource-based permissions package (cancan, devise?), and whether there is a Meteor / Node / JS equivalent
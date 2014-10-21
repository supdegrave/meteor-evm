## admin tasks
  
  * ~~merge team-centric back to master and notify Nico~~
  * figure out meteor developer account info and send to Nico
  * ~~move each template into its own file~~
  * ?? refactor data from routes into template helpers ?? 
  * stuart: determine why emails are not being sent as users are added in admin ui

## site features 

* TEAM: 
  - assign to parent team 
  - add child team to existing
    sub-team owner is same as parent team
      - FUTURE: sub-team owner is same as lead of parent team
        - and then, edit hierarchy gets really fun!
  - edit team name, change to filter by _id (new route: /:name/:id, filter .findOne({_id: id}))
    - ?? what happens if you go to /team/:name without /:id ?? 
      - 404 style page 
  - save email address changes! 
  - ~~implement add member~~
  - contentEditable on mouseOver (if canEdit) : https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable
    - how to handle mobile? 
      - edit button? (based on userAgent?)
  - disable cancel / save unless dirty 
  - FUTURE: ?? show team hierarchy

  
* ADMIN: 
  - ~~viewable by admin and organizers~~
  - ~~remove 'add team' functionality~~
  

* USERS: 
  - ~~Nico is going to figure out what should be here!~~ 
  - Alphabetical list of all users with relevant info
    - ~~team(s) each user is in~~
    - ~~filter by team, name,~~
    - FUTURE: filter by dates available
  - Limit number of results per page and add pagination
    - This might be a good clue: https://github.com/TimHeckel/meteor-paginator
    

* USER (INDIVIDUAL): 
  - profile edit (from initial TODO.md) if user._id === Meteor.userId() 
  - ~~'My Teams' links to any team where you have a role~~


* ORG CHART: 
  - ~~link team name to team, organizer to user page~~
  - ~~'add team' functionality moved here, inline with board member view, below current teams~~
    - ~~if board member, see 'add team' below your current teams~~
    - ~~if admin, see 'add team' below each board member's team list~~
  - think about how to do sub-teams 
    - tree control
      - https://github.com/mbraak/jqTree
      

* GENERAL DATA ISSUES - Stuart 
  - count / skip for pagination
  - granular control over fields (this should derive from the various visibility roles discussed with Aqua)
  - field hash must be assembled in advance and passed, specifically either all 0 or all 1
    - from docs: "it is not possible to mix inclusion and exclusion styles: the keys must either be all 1 or all 0"
  - in admin: array of fields with roles that can see them? (Need To Know screen)


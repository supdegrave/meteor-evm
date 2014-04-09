# TODO / Requirements 

## PRIORITY 0

* ~~add readme~~
* ~~convert .TODO to Markdown~~

**~~Log in as admin~~**

**Actions: (A: Admin, O: Organizer, L: Lead)**

* ~~Add users by email address (A,O,L)~~
  * ~~(pri1) this should send an invitation to edit profile~~
* Mark users as organizer (A) (for Nowhere: "board member")
* Add Roles (A,O,L)
* Add Teams (~~A~~,O,L)
  * Admin done, still need to allow organizers / leads
  * Leads should only be able to add sub-teams (meaning that they have a parent: Build -> Gate Build). 
* Add team ownership to board members (A,O)
* Add team-role combinations to users (Transport Lead, Gate Co-Lead, Build Mentor) (A,O)

**Org chart (Pri0 according to Aqua!)**

**User profile:**

* editable by user only! (??) 
* basic info
* notes
  * note types (general, medical / allergies, team-level, etc) 
  * should be secure to user and team leads (volunteer lead? admin? organizers?)
* arrival, departure, unavailable (blocked) dates 
* ??? 

**Role-based Security (only editable by admins, owners, leads, individual user)**


## PRIORITY 1

* Messaging
* Import email addresses 
* Allow lead / co-lead roles to create schedules 
* Lead roles can create teams (list of volunteers)
* Leads can contact all team members from one place 
* Import roles from list
* Import teams from list



*Everything below here turns the app from a volunteer management system into an event production system.*

## PRIORITY 2

* Gantt charts
* User profile - event-specific customizable fields (has ticket?, etc)
* Copy / clone project (see notes below)
* Links (better: API integration) to Trello, Dropbox, GDrive, Threadable, etc



## PROJECTS (all Pri2)

**Parent-child relationship between projects**

Example: Nowhere 2014 -> Build -> MON 

**Lead roles can create specific sub-teams on a per-project basis**

**Deadlines: Time-based actions / responsibilities**

**Each project has one or more owners**

* project owner(s) (or parent project owner(s)) can manage (CRUD) or message projects & sub-projects 
* users can subscribe (personally) or be added (by owner) to a project 
  * projects should be able to set a limit on user subscription count 

**Volunteer Lead has ability to add users to other projects? (Nowhere-specific?)**

* this could be done (abstractly, non-Nowhere-specific) if vol lead is added as owner of projects they'll need to manage
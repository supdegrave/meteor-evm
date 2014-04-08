// Router.configure({
//   layoutTemplate: 'layout'
// });

// function beforeActionRedirect(condition, path) {
//   if (Meteor.loggingIn()) {
//     this.render(this.loadingTemplate);
//   } else if (condition) {
//     console.log('Redirecting to ' + path || home);
//     this.redirect(path);
//   }  
// };

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('users', {
    // onBeforeAction: beforeActionRedirect(!this.userId)
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if (!Meteor.user()) {
        console.log('Redirecting');
        this.redirect('home');
      }
    }
  });

  this.route('admin', {
    template: 'accountsAdmin',
    // onBeforeAction: beforeActionRedirect(!Roles.userIsInRole(this.userId, ['admin']))
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('home');
      }
    }
  });
});

// /Volumes/working/Users/stuart/.meteor/tools/c2a0453c51/lib/node_modules/fibers/future.js:173
//            throw(ex);
//                  ^
// Error: Meteor.userId can only be invoked in method calls. Use this.userId in publish functions.
//     at Object.Meteor.userId (packages/accounts-base/accounts_server.js:19)
//     at Object.Meteor.user (packages/accounts-base/accounts_server.js:24)
//     at null.<anonymous> (app/shared/router.js:22:50)
//     at IronRouter.map (packages/iron-router/lib/router.js:224)
//     at app/shared/router.js:18:8
//     at app/shared/router.js:47:3
//     at /Library/WebServer/Documents/projects/meteor-evm/.meteor/local/build/programs/server/boot.js:155:10
//     at Array.forEach (native)
//     at Function._.each._.forEach (/Volumes/working/Users/stuart/.meteor/tools/c2a0453c51/lib/node_modules/underscore/underscore.js:79:11)
//     at /Library/WebServer/Documents/projects/meteor-evm/.meteor/local/build/programs/server/boot.js:82:5
// => Exited with code: 8
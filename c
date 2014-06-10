[1mdiff --git a/.meteor/packages b/.meteor/packages[m
[1mindex 1d3862e..4612d82 100644[m
[1m--- a/.meteor/packages[m
[1m+++ b/.meteor/packages[m
[36m@@ -18,7 +18,6 @@[m [mless[m
 accounts-ui-bootstrap-3[m
 typeahead[m
 moment[m
[31m-font-awesome[m
 bootstrap3-datepicker[m
 collection2[m
 semantic-ui[m
[1mdiff --git a/client/views/users/users.html b/client/views/users/users.html[m
[1mindex 07ae086..da66c0c 100644[m
[1m--- a/client/views/users/users.html[m
[1m+++ b/client/views/users/users.html[m
[36m@@ -1,5 +1,5 @@[m
 <template name="users"> [m
[31m-  <div class="users container">[m
[32m+[m[32m  <div class="main container">[m
   	<h1>Users</h1>[m
   	{{> filterUsers}}[m
     {{> listUsers}}[m
[1mdiff --git a/smart.json b/smart.json[m
[1mindex f62815e..8f8028f 100644[m
[1m--- a/smart.json[m
[1m+++ b/smart.json[m
[36m@@ -4,11 +4,10 @@[m
     "roles": {},[m
     "typeahead": {},[m
     "moment": {},[m
[31m-    "font-awesome": {},[m
     "collection2": {},[m
     "semantic-ui": {},[m
     "normalize.css": {[m
[31m-        "git": "https://github.com/rithis-archive/meteor-normalize.css.git"[m
[32m+[m[32m      "git": "https://github.com/rithis-archive/meteor-normalize.css.git"[m
     }[m
   }[m
 }[m
[1mdiff --git a/smart.lock b/smart.lock[m
[1mindex 7f200d6..b8b9d58 100644[m
[1m--- a/smart.lock[m
[1m+++ b/smart.lock[m
[36m@@ -6,7 +6,6 @@[m
       "roles": {},[m
       "typeahead": {},[m
       "moment": {},[m
[31m-      "font-awesome": {},[m
       "collection2": {},[m
       "semantic-ui": {},[m
       "normalize.css": {[m
[36m@@ -35,11 +34,6 @@[m
         "tag": "v2.6.0",[m
         "commit": "26156df681750fd6e6ed77043eef32b6653ebbdf"[m
       },[m
[31m-      "font-awesome": {[m
[31m-        "git": "https://github.com/nate-strauser/meteor-font-awesome.git",[m
[31m-        "tag": "v4.1.0",[m
[31m-        "commit": "ce6b1e92715d1938babc5d69c655c17e387f5926"[m
[31m-      },[m
       "collection2": {[m
         "git": "https://github.com/aldeed/meteor-collection2.git",[m
         "tag": "v0.4.1",[m
warning: LF will be replaced by CRLF in .meteor/packages.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in smart.json.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in smart.lock.
The file will have its original line endings in your working directory.

Service Worker Precache
===

Why?
---

We at [@gdnmobilelab](http://www.twitter.com/gdnmobilelab) are experimenting
a lot with Service Workers. One interesting area is dynamically generating
our pages inside the worker - effectively treating it as if it were a fully
fledged server, with routing, templating etc.

Unfortunately it doesn't work on first load, because the user hasn't
downloaded the service worker yet. So this is a little script to prebake
templates that live inside a Service Worker. 

Usage
-----

It is (for now) a CLI tool - after running npm install just execute
`service-worker-precache` to see a list of arguments.
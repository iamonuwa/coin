const EventEmitter = require('events');
const fetch = require('node-fetch');
const FetchEvent = require('./fetch-event');
const sander = require('sander');
const url = require('url');
const path = require('path');
const PromiseTools = require('promise-tools');
const argv = require('yargs')
    .describe("js", "The path to your Service Worker file")
    .describe("urls", "List of URLs you want to fetch via this worker")
    .describe("disk", "Where to output the files. To come: S3, other options")
    .describe("fullPaths", "Output files with full paths, including domain name directories.")
    .demand(["js","urls","disk"])
    .array("urls")
    .boolean("fullPaths")
    .argv;

global.fetch = fetch;
global.Response = fetch.Response;
global.Request = fetch.Request;
global.Headers = fetch.Headers;

var self = new EventEmitter();
self.addEventListener = self.addListener.bind(self);

global.self = self;

try {
    require(argv.js);
} catch (err) {
    console.error("Loading of service worker JS failed:")
    console.error(err)
}

let baseDir = path.resolve(process.cwd(), argv.disk);
       

PromiseTools.map(argv.urls, (urlToFetch) => {
    let req = new Request(urlToFetch);
    let fetchEvent = new FetchEvent(req);

    self.emit("fetch", fetchEvent);

    return fetchEvent.resolve()
    .then((resp) => {        
        let parsedURL = url.parse(urlToFetch);

        let targetPath = "";
        
        if (argv.fullPaths === false) {
            let pathSplit = parsedURL.path.split("/");
            if (pathSplit[pathSplit.length - 1] == "") {
                pathSplit[pathSplit.length - 1] = "index.html";
            }
            targetPath = pathSplit[pathSplit.length - 1];
        } else {
            targetPath = path.join(parsedURL.hostname, parsedURL.path);
            if (targetPath[targetPath.length - 1]) {
                targetPath += "index.html";
            }
        }

        return sander.writeFile(baseDir, targetPath, resp.body);
    })
    .then(() => {
        console.info("Successfully wrote file for: " + urlToFetch)
    })
    .catch((err) => {
        console.error("Fetch failed for: " + urlToFetch + " with error: " + err)
    })
})
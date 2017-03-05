
module.exports = class FetchEvent {

    constructor(request) {
        this.request = request;
    }

    respondWith(val) {
        this.promiseResponse = Promise.resolve(val);
    }

    resolve() {
        if (!this.promiseResponse) {
            return Promise.resolve();
        }
        return this.promiseResponse;
    }
}
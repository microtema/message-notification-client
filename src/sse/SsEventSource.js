var SsEventSource = function (url, dispatcher) {

    this.init = function () {

        var sse = null;
        if (!!window.EventSource) {
            sse = new EventSource(url);
            console.log('EventSource is supported');
        } else {
            console.log('EventSource is not supported');
            return;
        }

        sse.addEventListener('open', function (e) {
            console.log('open', e);
        }, false);

        sse.addEventListener('error', function (e) {
            if (e.readyState == EventSource.CLOSED) {
            } else {
            }
            console.log('error', e);
        }, false);

        sse.addEventListener('message', function (e) {

            //we got multiple events from server
            clearTimeout(this.timerId);

            this.timerId = setTimeout(dispatcher, 1000);

        }, false);

    };

    this.init();
};
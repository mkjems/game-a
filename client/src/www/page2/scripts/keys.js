var stateOfKeys = {
    a: 'up',
    s: 'up',
    d: 'up',
    w: 'up',
    space: 'up',
    l: 'up'
};

function getStateOfKeys() {
    return _.clone(stateOfKeys);
}

exports.listen = function(socket) {

    var memory;

    function before() {
        memory = getStateOfKeys();
    }

    function sendState(state) {
        var k = state || getStateOfKeys();
        socket.emit('keys', {
            a: k.a,
            s: k.s,
            d: k.d,
            w: k.w,
            space: k.space,
            l: k.l
        });
    }

    function after() {
        var afterState = getStateOfKeys();
        if (!_.isEqual(afterState, memory)) {
            sendState(afterState);
        }
    }

    $(document).keydown(function(evt) {
        before();
        if (evt.which === 65) { // a
            stateOfKeys.a = 'down';
        } else if (evt.which === 83) { //s
            stateOfKeys.s = 'down';
        } else if (evt.which === 87) { //w
            stateOfKeys.w = 'down';
        } else if (evt.which === 68) { // d
            stateOfKeys.d = 'down';
        } else if (evt.which === 32) { // space
            stateOfKeys.space = 'down';
        } else if (evt.which === 76) { // l
            stateOfKeys.l = 'down';
        }
        after();
    });

    $(document).keyup(function(evt) {
        if (evt.which === 65) { // a
            stateOfKeys.a = 'up';
        } else if (evt.which === 83) { //s
            stateOfKeys.s = 'up';
        } else if (evt.which === 87) { //w
            stateOfKeys.w = 'up';
        } else if (evt.which === 68) { // d
            stateOfKeys.d = 'up';
        } else if (evt.which === 32) { // space
            stateOfKeys.space = 'up';
        } else if (evt.which === 76) { // l
            stateOfKeys.l = 'up';
        }
        sendState();
    });

};
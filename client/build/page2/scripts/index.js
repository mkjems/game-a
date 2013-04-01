;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){

var myId;

var bulletView = require('./bulletView');
var sounds = require('./sounds');

$(document).ready(function(){

    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');

    var armlength = 10;

    function drawPlayer(x,y,faceOrientation, armRadian){
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (x-4 , y-4, 9, 9);
        var rads, ax, ay;
        if(faceOrientation === 'right'){
            rads = Math.PI * (10/6) + armRadian;
            ax = Math.cos(rads) * armlength;
            ay = Math.sin(rads) * armlength;
        } else{
            rads = Math.PI * (8/6) - armRadian;
            ax = Math.cos(rads) * armlength;
            ay = Math.sin(rads) * armlength;
        }
        ctx.fillRect (x+ax , y+ay, 3, 3);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect (x, y, 1, 1);
    }

    function drawBullet(bullet){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect (bullet.x, bullet.y, 5, 5);
    }

    function clearCanvas(){
        ctx.clearRect(0,0,600,400); // clear canvas
    }

     var socket = io.connect('10.4.7.71');
    //var socket = io.connect('gunfight.ca');

    var keys = require('./keys');
    keys.listen(socket);

    socket.on('first briefing', function(data) {
        console.log('first briefing', data);
        myId = data.myId;
    });

    socket.on('new world', function(data) {
        clearCanvas();

        _.forEach(data.players, function(player){
            drawPlayer(player.position.x,player.position.y, player.faceOrientation, player.armRadian);
            if(myId == player.id){
                bulletView.setBulletCount(player.bulletCount);
            }
        });
        _.forEach(data.bullets, function(bullet){
            if(bullet.sound === 'bang'){
                sounds.playShotSound();
            }
            drawBullet(bullet);
        });

    });

    socket.on('user connected', function(data){
        console.log('user connected', data.id);
    });

    socket.on('user disconnected', function(data){
        console.log('user disconnected', data.id);
    });
});

},{"./bulletView":2,"./sounds":3,"./keys":4}],2:[function(require,module,exports){

var bulletCount;

function drawBullets(num){
    bulletCount = num;
    var bulletsToDraw = [];
    while(num >=1){
        bulletsToDraw.push('O');
        num--;
    }
    $('.bullets').html(bulletsToDraw.join(' '));
    // console.log('drawBullets bulletCount:', bulletCount, bulletsToDraw.join(' ') );
}

exports.setBulletCount = function(num){
    if(bulletCount === num){
        return;
    }
    drawBullets(num);
};

},{}],3:[function(require,module,exports){
var dogBarkingBuffer = null;
var context = new webkitAudioContext();

var url = '/sounds/GUNSHOT.WAV';

function onError(){

}

function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            dogBarkingBuffer = buffer;
        }, onError);
    };
    request.send();
}

loadDogSound(url);


function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);                          // play the source now
}

exports.playShotSound = function(){
    playSound(dogBarkingBuffer);
};

},{}],4:[function(require,module,exports){
var stateOfKeys = {
    a: 'up',
    s: 'up',
    d: 'up',
    w: 'up',
    space: 'up',
    l: 'up',
    k: 'up',
    m: 'up'
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
            l: k.l,
            k: k.k,
            m: k.m
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
        } else if (evt.which === 75) { // k
            stateOfKeys.k = 'down';
        } else if (evt.which === 77) { // m
            stateOfKeys.m = 'down';
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
        }else if (evt.which === 75) { // k
            stateOfKeys.k = 'up';
        } else if (evt.which === 77) { // m
            stateOfKeys.m = 'up';
        }
        sendState();
    });

};
},{}]},{},[1])
;
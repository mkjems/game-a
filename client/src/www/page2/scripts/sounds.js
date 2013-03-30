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

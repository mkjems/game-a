
var myId;

var bulletView = require('./bulletView');
var sounds = require('./sounds');

$(document).ready(function(){

    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');

    function drawPlayer(x,y){
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (x, y, 10, 10);
    }

    function drawBullet(bullet){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect (bullet.x, bullet.y, 5, 5);
    }

    function clearCanvas(){
        ctx.clearRect(0,0,300,300); // clear canvas
    }

    // var socket = io.connect('10.4.7.71');
    var socket = io.connect('gunfight.ca');

    var keys = require('./keys');
    keys.listen(socket);

    socket.on('first briefing', function(data) {
        console.log('first briefing', data);
        myId = data.myId;
    });

    socket.on('new world', function(data) {
        clearCanvas();

        _.forEach(data.players, function(player){
            drawPlayer(player.position.x,player.position.y);
            if(myId == player.id){
                console.log('bulletCount',player.bulletCount);
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

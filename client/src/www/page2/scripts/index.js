
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

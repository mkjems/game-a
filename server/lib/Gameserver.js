var io,
    Connection = require('./Connection.js'),
    connections = [],
    bullets = [],
    cacti = [],
    rocks = [],
    counter = 0,
    _ = require('../node_modules/lodash'),
    mainLoop;

function getConnectionId(){
    counter++;
    return counter;
}

function removePlayer(player) {
    connections = _.without(connections, player);
}

exports.getNumPlayers = function() {
    return connections.length;
};

var collisions = require('./collisions').create([ connections, bullets, cacti, rocks]);

function getWorld() {

    var world = {
        players: [],
        bullets: [],
        sounds: []
    };
    _.forEach(connections, function(player) {
        world.players.push({
            id: player.id,
            position: player.getPosition(),
            bulletCount : player.getBulletCount(),
            armRadian: player.getArmRadian(),
            faceOrientation: player.getFaceOrientation()
        });
    });
    _.forEach(bullets, function(bullet) {
        world.bullets.push(bullet.getPosition());
    });

    return world;
}

function deleteOldBullets(){
        var deleteTheese = [];
        var i;
        for(i= bullets.length-1; bullets.length && i>=0; i-- ){
            if(bullets[i].getMoves() <= 0){
                bullets.splice(i,1);
            }
        }
}

/*
 *  Main loop
 *
 *  1. update position of everything bassed on keys etc.
 *      by calling moveOneTick() on all.
 *  2. broadcast positions and other events to all players
 */

function startMainLoop() {
    mainLoop = setInterval(function() {

        _.forEach(connections, function(player) {
            player.moveOneTick();
        });

        if (bullets.length) {
            deleteOldBullets();
        }

        bullets.forEach(function(bullet, index) {
            bullet.moveOneTick();
        });

        var world = getWorld();

        io.sockets.emit('new world', world);

    }, 30);
}

exports.create = function(server) {

    startMainLoop();

    io = require('socket.io').listen(server);
    io.set('log level', 2);

    io.sockets.on('connection', function(socket) {
        var id = 'player_' + getConnectionId();
        var player = Connection.create(socket, id, bullets, collisions);
        connections.push(player);

        io.sockets.emit('user connected', {
            id: id
        });

        var world = {
            yourId : id,
            numplayers: connections.length
        };
        player.setWorld(world);

        socket.on('disconnect', function() {
            removePlayer(player);
            io.sockets.emit('user disconnected', {
                id: id
            });
        });

    });
};

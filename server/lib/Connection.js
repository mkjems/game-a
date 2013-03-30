/*
 *  This code is the connection to one computer viewing /page2
 *
 *
 */

exports.create = function(socket, playerId, bullets) {

    var gun = require('./Gun').create(playerId, socket);

    var cowboy = require('./Cowboy').create(playerId);

    var keys = {
        a: 'up',
        d: 'up',
        w: 'up',
        s: 'up',
        space: 'up',
        l: 'up'
    };

    function setWorld(world) {
        socket.emit('first briefing', {
            world: JSON.stringify(world),
            myId: playerId
        });
    }

    socket.on('keys', function(data) {
        keys.a = data.a;
        keys.d = data.d;
        keys.w = data.w;
        keys.s = data.s;
        keys.space = data.space;
        keys.l = data.l;
    });

    function moveOneTick() {

        if (!gun.getIsReloading()) {
            if (keys.a === 'down') {
                cowboy.moveLeft();
            }
            if (keys.d === 'down') {
                cowboy.moveRight();
            }
            if (keys.w === 'down') {
                cowboy.moveUp();
            }
            if (keys.s === 'down') {
                cowboy.moveDown();
            }

            if (keys.space === 'down') { // fire a bullet!
                var pos = cowboy.getPosition();
                var bullet = gun.fireBullet(pos.x, pos.y);
                if (bullet) {
                    bullets.push(bullet);
                }
            }

            if (keys.l === 'down') { // Reload!
                console.log('Reload!');
                gun.reloadGun();
            }
        }


    }

    var that = {
        setWorld: setWorld,
        id: playerId,
        getPosition: cowboy.getPosition,
        moveOneTick: moveOneTick,
        getBulletCount: gun.getBulletCount
    };

    return that;
};
/*
 *  This code is the connection to one computer viewing /page2
 *
 *
 */

exports.create = function(socket, playerId, bullets, collisions) {

    var cowboy = require('./Cowboy').create(playerId, collisions);
    var gun = require('./Gun').create(playerId, socket, cowboy.getFaceOrientation, collisions);

    var keys = {
        a: 'up',
        d: 'up',
        w: 'up',
        s: 'up',
        space: 'up',
        l: 'up',
        k: 'up',
        m: 'up'
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
        keys.k = data.k;
        keys.m = data.m;
    });


    function moveOneTick() {

        var aStep = gun.getIsReloading() ? 0.5 : 4;

        if (keys.a === 'down') {
            cowboy.moveLeft(aStep);
        }
        if (keys.d === 'down') {
            cowboy.moveRight(aStep);
        }
        if (keys.w === 'down') {
            cowboy.moveUp(aStep);
        }
        if (keys.s === 'down') {
            cowboy.moveDown(aStep);
        }

        if (!gun.getIsReloading()) {
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

            if (keys.k === 'down') { // Lift arm
                gun.liftArm();
            }

            if (keys.m === 'down') { // Lower arm
                gun.lowerArm();
            }
        }


    }

    var that = {
        setWorld: setWorld,
        id: playerId,
        getPosition: cowboy.getPosition,
        getCollisionBody: cowboy.getCollisionBody,
        moveOneTick: moveOneTick,
        getBulletCount: gun.getBulletCount,
        getArmRadian: gun.getArmRadian,
        getFaceOrientation: cowboy.getFaceOrientation

    };

    return that;
};
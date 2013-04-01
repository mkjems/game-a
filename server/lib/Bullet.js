
exports.create = function(playerId, x, y, radian, collisions ){

    var speed = 10;
    var moves = 100;

    function moveOneTick(){
        if(moves>0){
            dx = Math.cos(radian) * speed;
            dy = Math.sin(radian) * speed;
            x+=dx;
            y+=dy;
            var hits = collisions.testForCollisions(getCollisionBody());
            moves--;
        }
    }

    function getPosition (){
        var res = {
            x:x,
            y:y,
            playerId: playerId,
            sound: (moves === 99)? 'bang' : ''
        };
        return res;
    }

    var collisionBody = require('./Collision-body').create( getPosition, [{
            x:0,
            y:0,
            radius:5
        }
    ]);

    function getCollisionBody(){
        return collisionBody;
    }

    that = {
        moveOneTick: moveOneTick,
        getPosition: getPosition,
        getMoves: function(){
            return moves;
        },
        getCollisionBody: getCollisionBody
    };

    return that;
};
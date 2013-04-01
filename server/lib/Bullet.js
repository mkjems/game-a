
var counter = 0;

function getNumber(){
    counter++;
    return counter;
}

exports.create = function(playerId, x, y, radian, collisions ){

    var speed = 10,
        moves = 100,
        vector = require('./Vector').create(x,y),
        id = 'bullet_'+ getNumber(),
        dx,
        dy;

    function moveOneTick(){
        if(moves>0){
            dx = Math.cos(radian) * speed;
            dy = Math.sin(radian) * speed;
            vector.x+=dx;
            vector.y+=dy;
            var hits = collisions.testForCollisions(getCollisionBody());
            if(hits.length > 0){
                hits.forEach( function(hit){
                    console.log('collides with:', hit.id);
                });
            }
            moves--;
        }
    }

    function getPosition (){
        var res = {
            x:vector.x,
            y:vector.y,
            playerId: playerId,
            sound: (moves === 99)? 'bang' : ''
        };
        return res;
    }

    var collisionBody = require('./Collision-body').create({
        getPosition : vector.getPosition,
        primitives: [{
            x:0,
            y:0,
            radius:5
        }],
        id: id
    });

    function getCollisionBody(){
        return collisionBody;
    }

    that = {
        id: id,
        moveOneTick: moveOneTick,
        getPosition: getPosition,
        getMoves: function(){
            return moves;
        },
        getCollisionBody: getCollisionBody
    };

    return that;
};
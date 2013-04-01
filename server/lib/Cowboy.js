
exports.create = function(playerId, collisions){

    var minX = 5,
        minY = 5,
        maxX = 595,
        maxY = 395,
        id = 'cowboy_' + playerId,
        faceOrientation = 'left';

    var vector = require('./Vector').create( Math.round(300 * Math.random()), Math.round(300 * Math.random() ) );

    function moveLeft(aStep){
        vector.x -= aStep;
        if (vector.x < minX){
            vector.x = minX;
        }
        faceOrientation = 'left';
    }

    function moveRight(aStep){
        vector.x += aStep;
        if (vector.x > maxX){
            vector.x = maxX;
        }
        faceOrientation = 'right';
    }

    function moveUp(aStep){
        vector.y -= aStep;
        if (vector.y < minY){
            vector.y = minY;
        }
    }

    function moveDown(aStep){
        vector.y += aStep;
        if (vector.y > maxY){
            vector.y = maxY;
        }
    }

    function getFaceOrientation(){
        return faceOrientation;
    }

    var collisionBody = require('./Collision-body').create({
            getPosition: vector.getPosition,
            primitives:[{
                x:0,
                y:0,
                radius: 10
            }],
            id: id
        });

    function getCollisionBody(){
        return collisionBody;
    }

    var that = {
        id: id,
        moveUp : moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        getPosition: vector.getPosition,
        getFaceOrientation: getFaceOrientation,
        getCollisionBody : getCollisionBody
    };

    return that;

};
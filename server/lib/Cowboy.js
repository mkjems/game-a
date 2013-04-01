
exports.create = function(playerId, collisions){

    var minX = 5;
    var minY = 5;
    var maxX = 595;
    var maxY = 395;

    var faceOrientation = 'left';

    var position = {
        x: Math.round(300 * Math.random()),
        y: Math.round(300 * Math.random())
    };

    function moveLeft(aStep){
        position.x -= aStep;
        if (position.x < minX){
            position.x = minX;
        }
        faceOrientation = 'left';
    }

    function moveRight(aStep){
        position.x += aStep;
        if (position.x > maxX){
            position.x = maxX;
        }
        faceOrientation = 'right';
    }

    function moveUp(aStep){
        position.y -= aStep;
        if (position.y < minY){
            position.y = minY;
        }
    }

    function moveDown(aStep){
        position.y += aStep;
        if (position.y > maxY){
            position.y = maxY;
        }
    }

    function getFaceOrientation(){
        return faceOrientation;
    }

    function getPosition(){
        return position;
    }

    var collisionBody = require('./Collision-body').create(getPosition, [
            {
                x:0,
                y:0,
                radius: 10
            }
    ]);

    function getCollisionBody(){
        return collisionBody;
    }

    return {
        moveUp : moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        getPosition: getPosition,
        getFaceOrientation: getFaceOrientation,
        getCollisionBody : getCollisionBody
    };

};
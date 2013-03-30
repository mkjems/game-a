
exports.create = function(playerId){

    var aStep = 5;

    var minX = 0;
    var minY = 0;
    var maxX = 290;
    var maxY = 290;

    var position = {
        x: Math.round(300 * Math.random()),
        y: Math.round(300 * Math.random())
    };

    function moveLeft(){
        position.x -= aStep;
        if (position.x < minX){
            position.x = minX;
        }
    }

    function moveRight(){
        position.x += aStep;
        if (position.x > maxX){
            position.x = maxX;
        }
    }

    function moveUp(){
        position.y -= aStep;
        if (position.y < minY){
            position.y = minY;
        }
    }

    function moveDown(){
        position.y += aStep;
        if (position.y > maxY){
            position.y = maxY;
        }
    }

    function getPosition(){
        return position;
    }

    return {
        moveUp : moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        getPosition: getPosition
    }

}
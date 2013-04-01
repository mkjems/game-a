
exports.create = function(collidable){

    function testForCollisionsAgainstAnything(collisionBody){
        var res = [];
        collidable.forEach(function(arrOfObjects){
            arrOfObjects.forEach(function(anObject){
                var collisionBody2 = anObject.getCollisionBody();
                if ( collisionBody.id != collisionBody2.id && collisionBody.collidesWith(collisionBody2).length ) {
                    res.push(anObject);
                }
            });
        });
        return res;
    }

    return {
        testForCollisions: testForCollisionsAgainstAnything
    };

};
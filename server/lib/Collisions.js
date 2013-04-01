
exports.create = function(collidable){

    function testForCollisions(collisionBody){

        var res = [];

        collidable.forEach(function(arrOfObjects){
            arrOfObjects.forEach(function(anObject){
                var collisionBody2 = anObject.getCollisionBody();
                if ( collisionBody.collidesWith(collisionBody2) ) {
                    res.push(anObject);
                }
            });
            return res;
        });

    }

    return {
        testForCollisions: testForCollisions
    };

};
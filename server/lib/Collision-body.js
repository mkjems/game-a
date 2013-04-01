
/*
 *  collisionBody
 *
 *  primitives is an array of objects,
 *  For now only the circle primitive exists
 *      x:0,y:0,radius:5
 *  getPosition is a function that returns the objects main position: {x:23,y:50}

    conf = {
        getPosition,
        primitives,
        id
    }
 */

exports.create = function(conf){

    primitives = conf.primitives || [];

    function testMeAgainstACirclePrimitive(position, circPrimi, hisId){
        var res = [];
        var myPosition = conf.getPosition();
        var myCircX, myCircY, hisCircX, hisCircY
        primitives.forEach(function(myCircPrimi){

            myCircX = myPosition.x + myCircPrimi.x;
            myCircY = myPosition.y + myCircPrimi.y;

            hisCircX = position.x + circPrimi.x;
            hisCircY = position.y + circPrimi.y;

            var x = Math.abs(myCircX - hisCircX);
            var y = Math.abs(myCircY - hisCircY);

            var dist = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );

            //console.log('x', myCircX, hisCircX, hisId );
            //console.log('his', dist, hisId );

            if(dist < myCircPrimi.radius + circPrimi.radius){
                //console.log('bang');
                res.push('collision');
            }
        });
        return res;
    }

    /*
     *  Test all my primitives against all primitives from another collisionBody.
     */
    function collidesWith(collisionBody){
        var res = [],
            aRes;
        collisionBody.getPrimitives().forEach(function(circPrimi){
            aRes = testMeAgainstACirclePrimitive( collisionBody.getPosition(), circPrimi, collisionBody.id);
            if(aRes.length){
                res.push(aRes);
            }
        });
        return res;
    }

    function getPrimitives(){
        return primitives;
    }

    return {
        id: conf.id,
        collidesWith: collidesWith,
        getPrimitives: getPrimitives,
        getPosition: conf.getPosition
    };
};

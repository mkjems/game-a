
/*  The GUN
 *
 */

var Bullet = require('./Bullet');

exports.create = function(playerId, socket, getFaceOrientation, collisions){

    var numShotsLeft = 6;

    var armRadian = Math.PI * (2/6);
    var armRadianStep = Math.PI /60;
    var maxArmRadian = Math.PI * (4/6);
    var minArmRadian = 0;

    var isReloading = false;
    var locked = false;

    function computeBulletRadian(){
        var res;
        if(getFaceOrientation() === 'right'){
            res = Math.PI * (10/6) + armRadian;
        } else {
            res = Math.PI * (8/6) - armRadian;
        }
        return res;
    }
    function fireBullet(x,y){
        var res = false;
        if(!isReloading && !locked && numShotsLeft > 0){
            res = Bullet.create(playerId, x, y, computeBulletRadian(), collisions );

            numShotsLeft--;
            locked = true;
            setTimeout(function(){
                locked = false;
            },100);
        }
        return res;
    }

    function reloadGun(){
        if (isReloading){
            return;
        }
        isReloading = true;
        setTimeout(function(){
            numShotsLeft = 6;
            isReloading = false;
        },4000);
    }

    function getBulletCount(){
        return numShotsLeft;
    }

    function lowerArm(){
        armRadian += armRadianStep;
        if(armRadian > maxArmRadian){
            armRadian = maxArmRadian;
        }
    }

    function liftArm(){
        armRadian -= armRadianStep;
        if(armRadian < minArmRadian){
            armRadian = minArmRadian;
        }
    }

    return {
        fireBullet: fireBullet,
        reloadGun: reloadGun,
        getIsReloading : function(){
            return isReloading;
        },
        getBulletCount: getBulletCount,
        liftArm: liftArm,
        lowerArm: lowerArm,
        getArmRadian: function(){
            return armRadian;
        }
    };

};

/*  The GUN
 *
 */

var Bullet = require('./Bullet');

exports.create = function(playerId, socket){

    var numShotsLeft = 6;
    var radian = Math.PI/3;

    var isReloading = false;
    var locked = false;

    function sendPlayGunsoundEvent(){
        playShotSound
    }

    function fireBullet(x,y){
        var res = false;
        if(!isReloading && !locked && numShotsLeft > 0){
            res = Bullet.create(playerId, x, y, radian);

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
    return {
        fireBullet: fireBullet,
        reloadGun: reloadGun,
        getIsReloading : function(){
            return isReloading;
        },
        getBulletCount: getBulletCount
    };

};
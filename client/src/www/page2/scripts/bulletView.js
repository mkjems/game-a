
var bulletCount;

function drawBullets(num){
    bulletCount = num;
    var bulletsToDraw = [];
    while(num >=1){
        bulletsToDraw.push('O');
        num--;
    }
    $('.bullets').html(bulletsToDraw.join(' '));
    // console.log('drawBullets bulletCount:', bulletCount, bulletsToDraw.join(' ') );
}

exports.setBulletCount = function(num){
    if(bulletCount === num){
        return;
    }
    drawBullets(num);
};

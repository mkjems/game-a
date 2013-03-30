
exports.create = function(playerId, x, y, radian ){

    var speed = 10;
    var moves = 20;
    function moveOneTick(){
        if(moves>0){
            dx = Math.cos(radian) * speed;
            dy = Math.sin(radian) * speed;
            x+=dx;
            y+=dy;
            moves--;
        }
    }

    function getPosition (){
        var res = {
            x:x,
            y:y,
            playerId: playerId,
            sound: (moves === 19)? 'bang' : ''
        };
        return res;
    }

    that = {
        moveOneTick: moveOneTick,
        getPosition: getPosition,
        getMoves: function(){
            return moves;
        }
    };

    return that;
};
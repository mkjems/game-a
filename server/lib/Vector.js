
exports.create = function(xval,yval){

    function getPosition(){
        return {
            x: that.x,
            y: that.y
        };
    }

    function addVector(vector){
        that.x = that.x + vector.x;
        that.y = that.y + vector.y;
        return that;
    }

    function subtractVector(vector){
        that.x = that.x - vector.x;
        that.y = that.y - vector.y;
        return that;
    }

    function multiplyBy(val){
        that.x = that.x * val;
        that.y = that.y * val;
    }

    var that = {
        x:xval,
        y:yval,
        addVector: addVector,
        getPosition: getPosition
    };

    return that;
};
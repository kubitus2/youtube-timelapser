var MINIMAL_SPEED = 1;
var MAXIMAL_SPEED = 15;
export var changeSpeed = function (newSpeed) {
    newSpeed = Math.round(newSpeed);
    if (newSpeed < MINIMAL_SPEED)
        return MINIMAL_SPEED;
    else if (newSpeed > MAXIMAL_SPEED)
        return MAXIMAL_SPEED;
    return newSpeed;
};
export var incrementRate = function (rate) {
    return changeSpeed(rate + 1);
};
export var decrementRate = function (rate) {
    return changeSpeed(rate - 1);
};

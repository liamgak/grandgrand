var zoomInValue = 0.4;
var moveValue = 0.2;
var delay = 200;
var zoomInMouseDownTimer = null;
var zoomOutMouseDownTimer = null;
var moveLeftMouseDownTimer = null;
var moveRightMouseDownTimer = null;

$(".btn-zoom-in").click(function(e){
  zoom(zoomInValue);
});

$(".btn-zoom-in").mousedown(function(e){
    zoomInMouseDownTimer = setInterval(function () {
        zoom(zoomInValue);
    }, delay);

    return false;
});

$(".btn-zoom-in").mouseup(function(e){
    clearInterval(zoomInMouseDownTimer);
    return false;
});

$(".btn-zoom-out").click(function(e){
  zoom(-1*zoomInValue);
});
$(".btn-zoom-out").mousedown(function(e){
    zoomOutMouseDownTimer = setInterval(function () {
        zoom(-1*zoomInValue);
    }, delay);

    return false;
});

$(".btn-zoom-out").mouseup(function(e){
    clearInterval(zoomOutMouseDownTimer);
    return false;
});


$(".btn-move-left").click(function(e){
  move(-1*moveValue);
});

$(".btn-move-left").mousedown(function(e){
    moveLeftMouseDownTimer = setInterval(function () {
        move(-1*moveValue);
    }, delay);

    return false;
});

$(".btn-move-left").mouseup(function(e){
    clearInterval(moveLeftMouseDownTimer);
    return false;
});

$(".btn-move-right").click(function(e){
  move(moveValue);
});
$(".btn-move-right").mousedown(function(e){
    moveRightMouseDownTimer = setInterval(function () {
        move(moveValue);
    }, delay);

    return false;
});

$(".btn-move-right").mouseup(function(e){
    clearInterval(moveRightMouseDownTimer);
    return false;
});
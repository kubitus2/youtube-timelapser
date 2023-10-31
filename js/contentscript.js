import { getButton } from './htmlUtils';
import { incrementRate, decrementRate } from './playbackRate';
import { obtainRate } from './rateManager';
var YT_CONTROL_DIV_CLASS = '.ytp-left-controls';
var LABEL = 'timelapser-label';
var controls;
var label;
var rate = 1;
window.addEventListener('yt-navigate-finish', function () {
    console.log('New page loaded');
    if (fetchElements() < 0)
        return;
    setupControlElements();
});
var fetchElements = function () {
    controls = document.querySelector(YT_CONTROL_DIV_CLASS);
    if (!controls) {
        console.error('Control elements not found!');
        return -1;
    }
    return 0;
};
var setupControlElements = function () {
    rate = obtainRate();
    var btnLeft = getButton('<b><</b>', clickDecrement);
    var btnRight = getButton('<b>></b>', clickIncrement);
    var resetBtn = getButton('<b>RESET</b>', clickReset);
    label = document.createElement('div');
    label.innerHTML = rate.toString();
    label.id = LABEL;
    console.log(label.id);
    controls === null || controls === void 0 ? void 0 : controls.appendChild(btnLeft);
    controls === null || controls === void 0 ? void 0 : controls.appendChild(label);
    controls === null || controls === void 0 ? void 0 : controls.appendChild(btnRight);
    controls === null || controls === void 0 ? void 0 : controls.appendChild(resetBtn);
};
var clickDecrement = function () {
    var newRate = decrementRate(rate);
    rate = newRate;
    updateRate(newRate);
};
var clickIncrement = function () {
    var newRate = incrementRate(rate);
    rate = newRate;
    updateRate(newRate);
};
var clickReset = function () {
    rate = 1;
    updateRate(1);
};
var updateRate = function (newRate) {
    var video = document.querySelector('video');
    if (!video) {
        console.error('No video element found');
        return;
    }
    video.playbackRate = newRate;
    if (!label) {
        console.error('Label not found');
        return;
    }
    label.innerHTML = newRate.toString();
};

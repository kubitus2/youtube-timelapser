var STORAGE_KEY = 'timelapser.rate';
export var obtainRate = function () {
    var video = document.querySelector('video');
    if (!video) {
        console.error('No video element found');
        return 1;
    }
    return video.playbackRate | 1;
};
export var saveRateToStorage = function (rate) {
    sessionStorage.setItem(STORAGE_KEY, rate.toString());
};
export var loadRateFromStorage = function () {
    try {
        var storageValue = sessionStorage.getItem(STORAGE_KEY);
        if (!storageValue) {
            console.log('No previous rate value stored. Putting default.');
            return 1;
        }
        var rate = Number.parseInt(storageValue);
        return rate;
    }
    catch (error) {
        console.error(error);
        return 1;
    }
};

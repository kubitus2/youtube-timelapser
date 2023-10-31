export var getButton = function (label, func) {
    var btn = document.createElement('button');
    btn.innerHTML = label;
    btn.onclick = func;
    btn.classList.add('button');
    return btn;
};

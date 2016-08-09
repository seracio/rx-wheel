'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rxWheel;

var _Rx = require('rxjs/Rx');

function rxWheel() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$treshold = _ref.treshold;
    var treshold = _ref$treshold === undefined ? 10 : _ref$treshold;
    var _ref$throttleTime = _ref.throttleTime;
    var throttleTime = _ref$throttleTime === undefined ? 150 : _ref$throttleTime;


    // Return deltaY (speed)
    var wheel$ = _Rx.Observable.fromEvent(document, 'onwheel' in document ? 'wheel' : 'mousewheel').map(function (e) {
        return {
            y: e.deltaY
        };
    }).filter(function (val) {
        return val !== 0;
    }).share();

    // We compute energy diff between each
    // wheel event
    var energyDiff$ = wheel$.map(function (val) {
        return Math.abs(val.y, 2);
    }).scan(function (seed, val) {
        return {
            prec: val,
            e: val - seed.prec
        };
    }, { prec: 0 }).map(function (val) {
        return val.e;
    });

    // Try to catch energy pick
    // then throttle
    // to avoid too many picks
    var energyPick$ = energyDiff$.filter(function (val) {
        return val > treshold;
    }).throttleTime(throttleTime);

    // compute direction changes
    var direction$ = wheel$.map(function (val) {
        return val.y > 0 ? 'down' : 'up';
    }).distinctUntilChanged();

    return energyPick$.withLatestFrom(direction$, function (energy, direction) {
        return {
            energy: energy, direction: direction
        };
    });
}

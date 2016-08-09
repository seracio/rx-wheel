import {Observable} from 'rxjs/Rx';

// Return deltaY (speed)
const wheel$ = Observable
    .fromEvent(document, 'onwheel' in document ? 'wheel' : 'mousewheel')
    .map(e => ({
        y: e.deltaY,
    }))
    .filter(val => val !== 0)
    .share();

// We compute energy diff between each
// wheel event
const energyDiff$ = wheel$
    .map(val => Math.abs(val.y, 2))
    .scan((seed, val) => {
        return {
            prec: val,
            e: val - seed.prec
        }
    }, {prec: 0})
    .map(val => val.e)
    .share();

// Try to catch energy pick
// then throttle
// to avoid too many picks
const energyPick$ = energyDiff$
    .filter(val => val > 10)
    .throttleTime(150)
    .share();

// compute direction changes
const direction$ = wheel$
    .map(val => val.y > 0 ? 'down' : 'up')
    .distinctUntilChanged()
    .share();

const final$ = energyPick$.withLatestFrom(
    direction$,
    (energy, direction) => ({
        energy, direction
    })
)
    .share();

final$.subscribe(val => {
    $('body')
        .animate(
            {
                scrollTop: (val.direction === 'up' ? '-=' : '+=') + $(window).height()
            }, {
                duration: 500,
                easing: 'easeOutQuart'
            }
        );
});



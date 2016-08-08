import $ from 'jquery';
import {Observable, Subject} from 'rxjs/Rx';

// All wheel events
// We do a prevent default on each one
const wheel$ = Observable
    .fromEvent(document.querySelector('body'), 'wheel')
    .do(e => e.preventDefault())
    .share();

// A Subject to catch the end of an animation
//  Don't know if this is necessary
const endAnimation$ = new Subject();

// Catch last wheel event
const lastWheel$ = wheel$
    .debounceTime(50)
    .share();

// Down
const down$ = wheel$
    .filter(e => e.deltaY > 0)
    .throttle(e => lastWheel$.race(endAnimation$))
    .share();

// Up
const up$ = wheel$
    .filter(e => e.deltaY < 0)
    .throttle(e => lastWheel$.race(endAnimation$))
    .share();

down$.subscribe(() => {
    $('body').stop().animate({
        scrollTop: `+=${$(window).height()}`
    }, {
        duration: 750,
        easing: 'easeOutExpo'
    }, () => endAnimation$.next());
});


up$.subscribe(() => {
    $('body').stop().animate({
        scrollTop: `-=${$(window).height()}`
    }, {
        duration: 750,
        easing: 'easeOutExpo'
    }, () => endAnimation$.next());
});




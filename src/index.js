const {Observable} = Rx;

const wheelEvent$ = Observable
    .fromEvent(document, 'onwheel' in document ? 'wheel' : 'mousewheel')
    .map(e => e.deltaY)
    .filter(val => val !== 0)
    .share();

const direction$ = wheelEvent$
    .map(dy => dy > 0 ? 'down' : 'up')
    .share();

const directionChange$ = direction$
    .distinctUntilChanged()
    .share();

const wheelEventEnd$ = wheelEvent$
    .debounceTime(50)
    .share();

const sameDirectionBuffer$ = wheelEvent$
    .buffer(directionChange$.merge(wheelEventEnd$))
    .filter(val => val.length > 0)
    .share();

directionChange$.subscribe(val => console.log(val));

wheelEventEnd$.subscribe(val => console.log('end'));
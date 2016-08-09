# rx-wheel

A small higher-order function returning an RxJS Observable that emits at the start of a `wheel` event and try to deal with OSX inertia
  
[demo]  

## Usage

```
npm i rxjs rx-wheel --save
```

```javascript
import rxWheel from 'rx-wheel';

rxWheel({ treshold, throttleTime }).subscribe(val => {    
    console.log(val.direction); // "down" or "up" 
    $('body')
        .animate({
            scrollTop: (val.direction === 'up' ? '-=' : '+=') + $(window).height()
        }, {
            duration: 500,
            easing: 'easeOutQuart'
        });
});
```
## Parameters

* treshold: energy treshold to emit (default to 10)
* throttleTime: throttle time (default to 150 ms)

## Development

```
npm run build:local
```

## Build

```
npm run build:prod
```

[demo]: https://seracio.github.io/rx-wheel/
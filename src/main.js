import 'babel-polyfill';
import rxWheel from './index';

rxWheel().subscribe(val => {
    $('body')
        .animate({
            scrollTop: (val.direction === 'up' ? '-=' : '+=') + $(window).height()
        }, {
            duration: 500,
            easing: 'easeOutQuart'
        });
});

require(['jquery', 'Vue', 'ScrollReveal', 'BootStrap'],  function ($, Vue, ScrollReveal) {

    new Vue({
        el:         '#app',
        data:       {
            activeIndex: '1',
            activeIndex2: '1'
        },
        methods:    {
            handleSelect:    function (key, keyPath) {
                console.log(key, keyPath);
            }
        }
    });

    var sr = ScrollReveal();

    sr.reveal('#about', {
        duration: 2000,
        origin: 'bottom'
    }).reveal('.event', {
        duration: 2000,
        origin: 'left',
        distance: '100px',
        viewFactor: 0.2
    }).reveal('.product', {
        duration: 2000,
        origin: 'right',
        distance: '100px',
        viewFactor: 0.2
    });
});
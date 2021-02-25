jQuery(function() {

    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            var e = $.Event('documentcompleted.ld.dom');
            clearInterval(readyStateCheckInterval);
            $(document).trigger(e);
        }
    }, 10);

    var setViewportSafeDims = function() {
        document.documentElement.style.setProperty('--viewport-safe-height', window.innerHeight + 'px');
        document.documentElement.style.setProperty('--viewport-safe-width', window.innerWidth + 'px');
    }

    setViewportSafeDims();

    $(window).on('resize', _.throttle(setViewportSafeDims, 60));

    Modernizr.addTest('ie11', function() {
        return !(window.ActiveXObject) && "ActiveXObject" in window;
    });

    Modernizr.addTest('edge', function() {
        return window.navigator.userAgent.indexOf("Edge") > -1;
    });

    Modernizr.addTest('body-veritcal-scrollbar', function() {
        return (window.innerWidth > document.documentElement.clientWidth);
    });


});

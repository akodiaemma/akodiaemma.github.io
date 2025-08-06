(function () {
    'use strict';

    function bytesToMegabytes(bytes) {
        return bytes / 1048576;
    }

    function forEach(array, callback) {
        var i;
         
        for (i = 0; i < array.length; i++) {
            callback(array[i], i);
        }
    }
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
    function getHeaderOffset() {
        var headerHeight = document.querySelector('.js-site-header').getBoundingClientRect().height;
        var breadcrumbs = document.querySelector('.breadcrumb-list');
        var offset = breadcrumbs != null ? headerHeight + breadcrumbs.getBoundingClientRect().height : headerHeight;
        return offset;
    }

    function preventDefault(evt) {
        evt.preventDefault();
    }

    function scrollTo(scrollPos, scrollDur, callback) {
        window.addEventListener('wheel', preventDefault);

        $('html, body').stop().animate({
            scrollTop: scrollPos
        }, {
            duration: scrollDur || 1000,
            always: function () {
                window.removeEventListener('wheel', preventDefault);

            },
            complete: function () {
                if (callback) {
                    callback();
                }
            }
        });
    }

    return {
        forEach: forEach,
        bytesToMegabytes: bytesToMegabytes,
        getHeaderOffset: getHeaderOffset,
        preventDefault: preventDefault,
        scrollTo: scrollTo,
        detectIE: detectIE

    };
}());

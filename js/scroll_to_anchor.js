/**
 * Created by FoxyGirl on 04.01.2018.
 */
; (function() {
    console.log('Scroll');

    var elNav = document.querySelectorAll('#mainNav a');

    for (var i = 0; i < elNav.length; i++) {
        elNav[i].addEventListener('click', scrollToAnchor);
    }


    function scrollToAnchor(e) {
        e.preventDefault();
        var w = window.pageYOffset,  // current scrolling
            hash = this.href,
            V = 1, // speed
            start = null;
            hash = hash.slice(hash.search(/#/i));  // id of element for scrolling
        var t = document.querySelector(hash).getBoundingClientRect().top;  // indent from browser window to id
        var distanceFactor = t/500;

        requestAnimationFrame(step);  // more details [developer.mozilla.org]

        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - distanceFactor * progress/V, w + t) : Math.min(w + distanceFactor * progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL with hash
            }
        }
    }
})();
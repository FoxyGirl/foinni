/**
 * Created by FoxyGirl on 22.10.2017.
 */
/**** Adaptive Menu ****/
;(function() {
    'use strict';

    var navToggler = document.getElementById('navToggler');

    if (!navToggler) { return };

    var mainNav = document.getElementById('mainNav');

    mainNav.classList.add('main-nav__list--hidden');

    navToggler.addEventListener('click', function() {
        this.classList.toggle('main-nav__toggler--close');
        mainNav.classList.toggle('main-nav__list--hidden');
    });
})();
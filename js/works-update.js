/**
 * Created by FoxyGirl on 26.12.2017.
 */
;(function() {
    'use strict';

    var btnMore = document.getElementById('btn-works-more');
    var worksItemTemplate = document.querySelector('.works__item');
    var worksFilterList = document.getElementById('works-filters');
    var worksList = document.querySelector('.works__list');

    btnMore.addEventListener('click', addMoreWorks);
    btnMore.addEventListener('keydown', addMoreWorks);

    worksFilterList.addEventListener('click', updateWorksList);
    worksFilterList.addEventListener('keydown', updateWorksList);

    /**
     * Add more works items.
     * @param {Event} - e - The Event.
     */
    function addMoreWorks(e) {
        if (isActivationEvent(e)) {
            e.preventDefault();

            var activeFilter = document.querySelector('.works__filter--active > a').textContent.toLowerCase();
            var currentAmount = document.querySelectorAll('.works__item').length;
            var fragment = createNewItems(activeFilter, currentAmount, worksItemTemplate);

            document.querySelector('.works__list').appendChild(fragment);
        }
    }

    /**
     * Update works list according filter in target.
     * @param {Event} - e - The Event.
     */
    function updateWorksList(e) {
        if (isActivationEvent(e)) {
            e.preventDefault();     // Prevent window scrolling if SPACE_KEY_CODE
            //e.stopPropagation();    // Prevent bubbling to window
            var target = event.target;
            while (target !== worksFilterList) {
                console.log('target.tagName ' + target.tagName);
                if (target.tagName === 'A') {
                    var activeFilter = target.textContent.toLowerCase();
                    var worksFilters = worksFilterList.querySelectorAll('.works__filter');

                    [].forEach.call(worksFilters, function(filter) {
                        var filterName = filter.querySelector('a').textContent.toLowerCase();
                        if (filterName === activeFilter) {
                            filter.classList.add('works__filter--active');
                        } else {
                            filter.classList.remove('works__filter--active');
                        }
                    });
                    var fragment = createNewItems(activeFilter, 0, worksItemTemplate);
                    worksList.innerHTML = '';
                    worksList.appendChild(fragment);
                    return;
                }
                target = target.parentNode;
            }
        }
    }

    /**
     * Control activation event from keyboard or click.
     * @param {Event} - e - The Event.
     * @returns {boolean} If is activation event from keyboard or click - true, else - false.
     */
    function isActivationEvent(e) {
        var ENTER_KEY_CODE = 13;
        var SPACE_KEY_CODE  = 32;

        return e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE || e.type === 'click';
    }

    /**
     * Create document fragment of new items from template.
     * @param {string} - filter - Active Filter for creating of image source.
     * @param {number} - startNum  - Amount of existing items.
     * @returns {DocumentFragment}
     */
    function createNewItems(filter, startNum, template) {
        var amountNewWorks = 6;
        var fragment = document.createDocumentFragment();
        var i = startNum,
            amountFinish = startNum + amountNewWorks;

        for (i; i < amountFinish; i++ ) {
            var newItem = template.cloneNode(true);
            // newItem.querySelector('.works__img').setAttribute('src', 'http://placeimg.com/391/391/' + filter + i);
            // newItem.querySelector('.works__img').setAttribute('src', 'https://loremflickr.com/green/391/391/' + filter + '?random=' + i);
            newItem.querySelector('.works__img').setAttribute('src', 'https://loremflickr.com/391/391/' + filter + '?random=' + i);

            fragment.appendChild(newItem);
        }

        return fragment;
    }
})();
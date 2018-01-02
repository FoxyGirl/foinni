/**
 * Created by FoxyGirl on 26.12.2017.
 */
;(function() {
    'use strict';

    var btnMore = document.getElementById('btn-portfolio-more');
    var portfolioItemTemplate = document.querySelector('.portfolio__item');
    var portfolioFilterList = document.getElementById('portfolio-filters');
    var portfolioList = document.querySelector('.portfolio__list');

    btnMore.addEventListener('click', addMoreWorks);
    btnMore.addEventListener('keydown', addMoreWorks);

    portfolioFilterList.addEventListener('click', updateWorksList);
    portfolioFilterList.addEventListener('keydown', updateWorksList);

    /**
     * Add more portfolio items.
     * @param {Event} - e - The Event.
     */
    function addMoreWorks(e) {
        if (isActivationEvent(e)) {
            e.preventDefault();

            var activeFilter = document.querySelector('.portfolio__filter--active > a').textContent.toLowerCase();
            var currentAmount = document.querySelectorAll('.portfolio__item').length;
            var fragment = createNewItems(activeFilter, currentAmount, portfolioItemTemplate);

            document.querySelector('.portfolio__list').appendChild(fragment);
        }
    }

    /**
     * Update portfolio list according filter in target.
     * @param {Event} - e - The Event.
     */
    function updateWorksList(e) {
        if (isActivationEvent(e)) {
            e.preventDefault();     // Prevent window scrolling if SPACE_KEY_CODE
            //e.stopPropagation();    // Prevent bubbling to window
            var target = event.target;
            while (target !== portfolioFilterList) {
                
                if (target.tagName === 'A') {
                    var activeFilter = target.textContent.toLowerCase();
                    var portfolioFilters = portfolioFilterList.querySelectorAll('.portfolio__filter');

                    [].forEach.call(portfolioFilters, function(filter) {
                        var filterName = filter.querySelector('a').textContent.toLowerCase();
                        if (filterName === activeFilter) {
                            filter.classList.add('portfolio__filter--active');
                        } else {
                            filter.classList.remove('portfolio__filter--active');
                        }
                    });
                    var fragment = createNewItems(activeFilter, 0, portfolioItemTemplate);
                    portfolioList.innerHTML = '';
                    portfolioList.appendChild(fragment);
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
            // newItem.querySelector('.portfolio__img').setAttribute('src', 'http://placeimg.com/391/391/' + filter + i);
            // newItem.querySelector('.portfolio__img').setAttribute('src', 'https://loremflickr.com/green/391/391/' + filter + '?random=' + i);
            newItem.querySelector('.portfolio__img').setAttribute('src', 'https://loremflickr.com/391/391/' + filter + '?random=' + i);

            fragment.appendChild(newItem);
        }

        return fragment;
    }
})();
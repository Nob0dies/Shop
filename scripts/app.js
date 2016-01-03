/**
 * Created by evgonchar on 31.12.2015.
 */

var accardion = (function () {
    var obj = $(".accordion");

    var item = {};
    var target = {};
    var event = {};

    var select = {
        item: "accordion__item",
        title: "accordion__item__title",
        body: "accordion__body",
        opened: "accordion__item_opened",
    };

    var init = function () {
        _setListeners();
    };

    var _toggle = function () {
        .
        animate({left: "100px"}, 500);
    };

    var _setListeners = function () {
        obj.click(function (e) {
            target = $(e.target);
            event = e;
            item = target.closest(select.item);
            $(item).toggleClass(select.opened);
        });
        /*
        $('.accordion__item__title').click(function (e) {
            console.log(e);
            $(this).closest('.filters__item').toggleClass('accordion__item_opened');
        })*/
    };

    return {
        init: init
    }
})();
accardion.init();
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
        $(select.body, item).animate({top: "100px"}, 500);
    };

    var _setListeners = function () {
        $('.accordion__item__title').click(function(e){
            target = $(e.target);
            event = e;
            item = target.closest('.'+select.item);
            body = target.next('.'+select.body);
            item.toggleClass(select.opened);
        });

        $('.brends__reset').click(function(e){
            $('.filters__brends input[type=checkbox]').removeAttr('checked');
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
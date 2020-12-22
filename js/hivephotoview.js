// 최신 제이쿼리에서 live()함수 실행
jQuery.fn.extend({
    live: function (event, callback) {
        if (this.selector) {
            jQuery(document).on(event, this.selector, callback);
        }
        return this;
    }
});

// href="#" 동작 제거
$(function () {
    $('.pview_close a[href="#"]').click(function (e) {
        e.preventDefault();
    });
});

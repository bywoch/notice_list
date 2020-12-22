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

(function ($) {

    this.azDataTitle = null;
    this.azDataImage = null;
    this.azDataIdx = null;
    this.azDataBool = null;
    this.htInfo = null;
    this.azDataImageDesc = null;

    var self = this;

    $.fn.hivegallery = function (options) {
        return this.each(function () {
            $.hivegallery(this, options);
        });
    };

    $.hivegallery = function (container, options) {
        var settings = {
            wrapbox: $(container),
            type: 'slide', // 배너타입 : default(기본) / fade(페이드인아웃) / slide(슬라이드)
            target: 'left', // 슬라이드 방향 : left(왼쪽) / right(오른쪽) / top(위쪽) / bottom(아래쪽)
            play_time: 5000, // 시간
            speed: 250, // 스피드
            shift: false,
            current: -1, // 시작하는 값
            view_num: 5, // 보여지는 갯수
            prev_current: null, // 이전 current 값
            autoTimerId: null, // 자동롤링되는 변수
            select_class: 'selected', // 활성화 클래스
            gallery_view: $(container).children().eq(0), // 배너부모노드
            gallery_list: $(container).children().eq(1), // 배너리스트노드
            obj: $(container).find('ul'), // 배너부모노드
            total_num: $(container).find('ul').children().size(), // 배너전체 개수
            thumb_width: $(container).find('li').outerWidth(true), // 배너이미지 넓이
            banner_dots: $(container).find('li').find('a:first'), // 배너 넘버링
            target_first: 'a:first',
            target_last: 'a:last',
            data_type: 'list',
            total_cnt: 0,
            first_idx: 0,
            end_idx: 0,
            curr_idx: 0,
            min_idx: 0,
            max_idx: 0,
            category: 0,
            prev_cnt: 0
        };
        self.azDataTitle = null;
        self.azDataImage = null;
        self.azDataImageDesc = null;
        self.azDataIdx = null;
        self.azDataBool = null;
        self.htInfo = null;
        self.azDataTitle = {};
        self.azDataImage = {};
        self.azDataImageDesc = {};
        self.azDataIdx = {};
        self.azDataBool = {};
        self.htInfo = {
            nContentRightIndex: 0,
            nContentLeftIndex: 0,
            nContentIndex: 0,
            nTotal: 0,
            nCurrent: 0,
            bLoad: true
        };

        settings.obj.html("");

        if (options) { $.extend(settings, options); };
        $.hivegallery.ajaxData(settings, "now");

        var viewprevbtn = settings.gallery_view.find('.prev'); // 이전배너 보기버튼
        var viewnextbtn = settings.gallery_view.find('.next'); // 다음배너 보기버튼
        var prevbtn = settings.gallery_list.find('.prev'); // 이전배너 보기버튼
        var nextbtn = settings.gallery_list.find('.next'); // 다음배너 보기버튼

        $('.pview_close').find('a:first').bind('click', function () {
            $('.photoview_abs').hide();
            settings.obj.html('');
            $('#wrap').removeClass('dimmed_on');
            $('.view_img,.mphoto_list,.pa_list').children().eq(settings.closefocus).find('a:first').focus();
            viewprevbtn.unbind("click");
            viewnextbtn.unbind("click");
            prevbtn.unbind("click");
            nextbtn.unbind("click");
            return false;
        });

        $('body').bind('keydown', function (e) {
            if (e.which == 16) {
                settings.shift = true;
            };
        });
        $('body').bind('keyup', function (e) {
            if (e.which == 16) {
                settings.shift = false;
            };
        });
        $('.photoview_abs').find(settings.target_last).bind('keydown', function (e) {
            if (e.which == 16) {
                settings.shift = true;
            };
            if (!settings.shift) {
                if (e.which == 9) {
                    $('#wrap').removeClass('dimmed_on');
                    $('.view_img,.mphoto_list,.pa_list').children().eq(settings.closefocus).find('a:first').focus();
                    $('.photoview_abs').css({
                        opacity: 0
                    }).delay(1).queue(function () {
                        $(this).css({
                            opacity: 1,
                            display: 'none'
                        });
                        $(this).dequeue();
                    });
                };
            };
        });
        $('.photoview_abs').find(settings.target_last).bind('keyup', function (e) {
            settings.shift = false;
        });
        $('.photoview_abs').find('*').bind('keydown', function (e) {
            if (e.which == 16) {
                settings.shift = true;
            };
        });
        $('.photoview_abs').find('*').bind('keyup', function (e) {
            if (e.which == 16) {
                settings.shift = false;
            };
        });
        $('.photoview_abs').find(settings.target_first).bind('focusout keydown', function () {
            if (settings.shift) {
                $('#wrap').removeClass('dimmed_on');
                $('.view_img,.mphoto_list,.pa_list').children().eq(settings.closefocus).find('a:first').focus();
                $('.photoview_abs').css({
                    opacity: 0
                }).delay(1).queue(function () {
                    $(this).css({
                        opacity: 1,
                        display: 'none'
                    });
                    $(this).dequeue();
                });
            };
        });

        // 이전배너 보이기 호출
        viewprevbtn.bind("click", function () {
            current = settings.prev_current - 1;
            if (current < 1) {
                current = 0;
            };
            settings.prev_current = current;
            $.hivegallery.prev(settings.obj, settings, current, 1);

            return false;
        });

        // 다음배너 보이기 호출
        viewnextbtn.bind("click", function () {
            current = settings.prev_current + 1;
            if (current > settings.total_num) {
                current = settings.total_num - 1;
            };
            settings.prev_current = current;
            $.hivegallery.next(settings.obj, settings, current, 1);
            return false;
        });

        // 이전배너 보이기 호출
        prevbtn.bind("click", function (e) {
            $.hivegallery.prev(settings.obj, settings, settings.current, settings.view_num);
            return false;
        });

        // 다음배너 보이기 호출
        nextbtn.bind("click", function (e) {
            $.hivegallery.next(settings.obj, settings, settings.current, settings.view_num);
            return false;
        });

        //이벤트 바인드
        settings.obj.find('a').live('click', function () {
            var r = $(this).find('.blind').text();
            settings.gallery_view.find('img').attr('src', $(this).find('img').attr('src').replace("?w=200", ""));

            settings.gallery_view.find('img').attr('alt', $(this).find('img').attr('alt'));

            settings.gallery_view.find('a').attr('href', "https://zzzzinfo.com/api/download?file=" + $(this).find('img').attr('src').replace("https://zzzzinfo.com/data/", "").replace("/data/", ""));
            settings.gallery_view.parent().parent().find('strong').html($(this).find('img').attr('alt'));
            settings.gallery_view.find('strong').html($(this).find('img').attr('alt'));

            settings.obj.children().eq(settings.prev_current).removeClass(settings.select_class);
            $(this).parent().addClass(settings.select_class);
            var prev = $(this).parent().index();
            settings.wrapbox.find('.current').text(r);
            settings.prev_current = prev;

            nLoggerFn($(this).find('img').attr('src').replace("https://zzzzinfo.com/data/", "").replace("/data/", ""));

            return false;
        });

    };

})(jQuery);


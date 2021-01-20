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

    //데이터 가져오기
    $.hivegallery.ajaxData = function (settings, o) {
        var p = (o == "now" ? settings.curr_idx : (o == "prev" ? settings.first_idx : settings.end_idx))
        var azHtml = [];
        $.getJSON("https://zzzzinfo.com/api/photo/viewer?viewtype=" + settings.data_type + "&viewoption=" + o + "&category=" + settings.category + "&ppcode=" + p + "&keyword=" + encodeURIComponent(infoUtil.Keyword) + "&callback=?", function (d) {
            for (var i = 0; i < d.list.length; i++) {
                self.azDataTitle[d.list[i].rownum] = d.list[i].title;
                self.azDataImage[d.list[i].rownum] = d.list[i].photo_fullpath;
                self.azDataImageDesc[d.list[i].rownum] = ($.trim(d.list[i].contents).length > 0 ? d.list[i].contents : d.list[i].title);
                self.azDataIdx[d.list[i].rownum] = d.list[i].pp_code;

                if (i == 0) {
                    settings.min_idx = d.min_code;
                    settings.max_idx = d.max_code;
                    settings.total_cnt = d.total_cnt;
                    settings.total_num = d.total_cnt;
                    if (o == "now") { self.htInfo.nContentIndex = d.list[i].rownum; }
                    if (o != "next") { self.htInfo.nContentLeftIndex = d.list[i].rownum; settings.first_idx = d.list[i].pp_code; }
                }
                if (o != "prev") {
                    settings.end_idx = d.list[i].pp_code;
                    self.htInfo.nContentRightIndex = d.list[i].rownum;
                }
                if (o == "now") {
                    if (settings.data_type == "list") {
                        if (d.list[i].pp_code == p) {
                            self.htInfo.nCurrent = i;
                        }

                    }
                    else {
                        self.htInfo.nCurrent = parseInt(settings.closefocus, 10);
                        settings.current = self.htInfo.nCurrent;
                        settings.prev_current = self.htInfo.nCurrent;
                        settings.prev = settings.prev_current;
                    }
                }
                if (settings.data_type == "list") {
                    azHtml.push('<li><a href="https://zzzzinfo.com/data/' + d.list[i].photo_fullpath + '" class="box"><span class="img_a"><img src="https://zzzzinfo.com/data/' + d.list[i].photo_fullpath + '" alt="' + ($.trim(d.list[i].contents).length > 0 ? d.list[i].contents : d.list[i].title) + '"></span><span class="tit">' + d.list[i].title + '</span><span class="blind">' + d.list[i].rownum + '</span></a></li>');
                }
                else {
                    azHtml.push('<li><a href="https://zzzzinfo.com/data/' + d.list[i].photo_fullpath + '" class="box"><span class="img_a"><img src="https://zzzzinfo.com/data/' + d.list[i].photo_fullpath + '" alt="' + ($.trim(d.list[i].contents).length > 0 ? d.list[i].contents : d.list[i].title) + '"></span><span class="tit">&nbsp;</span><span class="blind">' + d.list[i].rownum + '</span></a></li>');
                }
                self.htInfo.nTotal++;
                if (o == "prev") { settings.prev_cnt++; settings.current++; settings.prev_current++; htInfo.nCurrent++; }
            }
            if (o == "prev") {
                settings.obj.prepend(azHtml.join(''));
            }
            else {
                settings.obj.append(azHtml.join(''));
            }
            $.hivegallery.htmlData(settings, o);

        });
    }

    // 데이터 그리기 함수
    $.hivegallery.htmlData = function (settings, o) {
        var numwidth = null;

        // settings 객체의 자식 요소들의 가로 폭을 모두 더하여 numwidth 변수에 할당
        settings.obj.children().each(function () {
            numwidth += $(this).outerWidth(true);
        });

        // settings 객체의 너비를 numwidth 값으로 설정하여 요소들이 모두 수평으로 나열되도록
        settings.obj.css({
            width: numwidth
        });

        // 만약 o 값이 "now"인 경우, 현재 상태의 효과를 설정하고, 메뉴의 처음 보이는 위치를 결정
        if (o == "now") {
            // 효과 세팅하기
            settings.wrapbox.find('.total').text(settings.total_num); // 총 개수를 표시하는 요소에 총 개수를 설정

            // 현재 상태의 효과를 적용
            $.hivegallery.effect(settings.obj, settings, self.htInfo.nCurrent);

            // 메뉴의 처음 보이는 위치를 설정
            $.hivegallery.htmlPos(settings, self.htInfo.nCurrent);
        }

        // 만약 o 값이 "next"인 경우, 이전 상태의 위치로 이동
        if (o == "next") {
            // 이전 상태의 위치로 이동
            $.hivegallery.htmlPos(settings, settings.prev_current);
        }
    }

    $.hivegallery.htmlPos = function (settings, pos) {
        $(".photoloading").hide();

        var r = settings.obj.children().eq(pos).find('.blind').text();
        settings.obj.children().removeClass(settings.select_class);
        settings.obj.children().eq(pos).addClass(settings.select_class);
        settings.gallery_view.find('img').attr('src', settings.obj.children().eq(pos).find('a').attr('href'));

        settings.gallery_view.find('img').attr('alt', settings.obj.children().eq(pos).find('a').find('img').attr('alt'));
        settings.gallery_view.find('a').attr('href', "https://zzzzinfo.com/api/download?file=" + settings.obj.children().eq(pos).find('a').attr('href').replace("https://zzzzinfo.com/data/", "").replace("/data/", ""));
        settings.gallery_view.parent().parent().find('strong').html(settings.obj.children().eq(pos).find('img').attr('alt'));
        settings.gallery_view.find('strong').html(settings.obj.children().eq(pos).find('a').find('img').attr('alt'));
        settings.wrapbox.find('.current').text(r);

        nLoggerFn(settings.gallery_view.find('a').attr('href'));
    }

    // 이전배너 보이기 함수
    $.hivegallery.prev = function (elements, settings, current, cnt) {
        current = settings.current - cnt; // 이동할 다음 배너 인덱스 값 구하기.
        // 다음 내용이 없는 경우, 첫 번째 배너 인덱스 값으로 설정하기.
        if (current < 0) {
            current = 0;
        };
        $.hivegallery.effect(elements, settings, current); // n번째 배너 보이기.
        if (settings.max_idx != settings.first_idx) {
            if (current < settings.view_num) {
                $.hivegallery.ajaxData(settings, "prev");
                return;
            }
        }
        $.hivegallery.htmlPos(settings, current);
    };

    // 다음배너 보이기 함수
    $.hivegallery.next = function (elements, settings, current, cnt) {
        current = settings.current + cnt; // 이동할 다음 배너 인덱스 값 구하기.
        // 다음 내용이 없는 경우, 첫 번째 배너 인덱스 값으로 설정하기.
        if (current > htInfo.nTotal || current >= settings.total_cnt) {
            return;
        };

        $.hivegallery.effect(elements, settings, current); // n번째 배너 보이기.
        if (settings.min_idx != settings.end_idx && htInfo.nTotal < settings.total_cnt) {
            if (htInfo.nTotal - current < settings.view_num) {
                $.hivegallery.ajaxData(settings, "next");
                return;
            }
        }
        $.hivegallery.htmlPos(settings, current);
    };

    // current에 해당하는 배너 보이기.
    $.hivegallery.effect = function (elements, settings, current) {
        if (settings.total_num < settings.view_num) {
            settings.current = current;
            settings.prev_current = current;
            return;
        }
        if (current != settings.current) {
            if (settings.type == 'default') {
                elements.eq(settings.prev_current).hide();
                elements.eq(current).show();
                // 배너 메뉴의 위치 값을 업데이트 시킴.
                $.hivegallery.dots(settings, current, settings.prev_current);
                settings.prev_current = current;
            } else if (settings.type == 'fade') {
                elements.eq(settings.prev_current).fadeOut(settings.speed);
                elements.eq(current).fadeIn(settings.speed, function () {
                    removeFilter($(this)[0]);
                });
                // 배너 메뉴의 위치 값을 업데이트 시킴.
                $.hivegallery.dots(settings, current, settings.prev_current);
                settings.prev_current = current;
            } else if (settings.type == 'slide') {
                elements.animate({
                    marginLeft: -(current * settings.thumb_width)
                });
                settings.prev_current = current;
            };
            //현재 배너 인덱스 업데이트 시키기.
            settings.current = current;
        };
    };

})(jQuery);

// **** IE에서 Opacity-Filter 제거 ****
function removeFilter(element) {
    // element의 style에 'removeAttribute' 메서드가 존재 확인
    if (element.style.removeAttribute) {
        // 사용 가능한 경우, 'filter' 속성을 제거하여 IE에서 Opacity-Filter를 비활성화
        element.style.removeAttribute('filter');
    };
}

function nLoggerFn(src) {
    // 이 함수는 특정 로깅 시스템('nLogger')과 사용 컨텍스트에 특화된 사용자 정의 로깅 함수
    // 'nLogger' 객체를 사용하여 'click' 이벤트를 로그로 기록하며, '_u_depth1' 속성을 "https:" + src로 설정
    // 이 함수의 목적은 특정 로깅 또는 분석 라이브러리와 관련되어 있으며, 더 큰 로깅 프레임워크의 일부일 수 있음
    nLogger.event('click', { _u_depth1: "https:" + src });
}
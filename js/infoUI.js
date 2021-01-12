var infoUI = {
    NoticeList: function (o) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        if (o.length > 0) {
            for (var i = 0; i < o.length; i++) {
                azHtml.push('<tr>');
                azHtml.push('<td>' + (_that.Num--) + '</td>');
                azHtml.push('<td class="td_tit">');
                azHtml.push('<div class="in">');
                azHtml.push('<div class="t_tit"><a href="' + _that.PageNoticeView + o[i].code + '&page=' + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword) + '"><strong>' + o[i].title + '</strong></a>');
                if (o[i].is_new) {
                    azHtml.push('<span class="sp_tinfo ico_new">new</span>');
                }
                azHtml.push('</div>');
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="date">');
                azHtml.push('<div class="in">' + o[i].reg_dt_short);
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('</tr>');
            }
        } else {
            azHtml.push('<tr><td colspan="3"><div class="in"><div class="t_tit"><strong>검색된 결과가 없습니다.</strong></div></div></td></tr>');
        }
        $(".sct_tblarea").find("tbody").html(azHtml.join(''));
        _this.SetPager();

    },
    NoticeInfo: function (o) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;

        $(".vtl_tit").html('<strong>' + o.info.title + '</strong>');
        $(".view_txt").html(o.info.contents);
        $(".vtl_date").html(o.info.reg_dt_full);
        if (o.prev.code === null) {
            $(".cc_ellip_in").first().html('이전 공지사항이 없습니다');
        } else {
            $(".page_prev").attr("href", _that.PageNoticeView + o.prev.code);
            $(".cc_ellip_in").first().html('<a href="' + _that.PageNoticeView + o.prev.code + '&page=' + _that.Page + '">' + o.prev.title + '</a>');
        }
        if (o.next.code === null) {
            $(".cc_ellip_in").last().html('다음 공지사항이 없습니다');
        } else {
            $(".page_next").attr("href", _that.PageNoticeView + o.next.code);
            $(".cc_ellip_in").last().html('<a href="' + _that.PageNoticeView + o.next.code + '&page=' + _that.Page + '">' + o.next.title + '</a>');
        }
        $(".v_btn").attr("href", _that.PageNotice + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword));
    },
    PressList: function (o) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        if (o.length > 0) {
            for (var i = 0; i < o.length; i++) {
                azHtml.push('<tr>');
                azHtml.push('<td>' + (_that.Num--) + '</td>');
                azHtml.push('<td class="pic">');
                azHtml.push('<div class="in">');
                if (o[i].photo_fullpath == "") {
                    azHtml.push('<span class="img_type"><span class="bor">&nbsp;</span></span>');
                } else {
                    azHtml.push('<span class="img_type"><img src="' + _that.ImageServer + o[i].photo_fullpath + '" alt="' + o[i].title.cut(30) + ' 이미지"><span class="bor">&nbsp;</span></span>');
                }
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="td_tit">');
                azHtml.push('<div class="in">');
                azHtml.push('<div class="t_tit"><a id="" href="' + _that.PagePressView + o[i].code + '&page=' + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword) + '"><strong>' + o[i].title + '</strong></a>');
                if (o[i].is_new) {
                    azHtml.push('<span class="sp_tinfo ico_new">new</span>');
                }
                azHtml.push(' </div>');
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="date">');
                azHtml.push('<div class="in">' + o[i].reg_dt_short);
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('</tr>');
            }
        } else {
            azHtml.push('<tr><td colspan="4"><div class="in"><div class="t_tit"><strong>검색된 결과가 없습니다.</strong></div></div></td></tr>');
        }
        $(".sct_tblarea").find("tbody").html(azHtml.join(''));
        _this.SetPager();

    },
    PressInfo: function (p) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        o = p.info;
        f = p.file;

        $(".vtl_tit").html('<strong>' + o.info.title + '</strong>');
        $(".view_txt").html(o.info.contents);
        $(".vtl_date").html(o.info.reg_dt_full);
        if (o.prev.code === null) {
            $(".cc_ellip_in").first().html('이전 보도 자료가 없습니다');
        } else {
            $(".page_prev").attr("href", _that.PagePressView + o.prev.code);
            $(".cc_ellip_in").first().html('<a href="' + _that.PagePressView + o.prev.code + '&page=' + _that.Page + '">' + o.prev.title + '</a>');
        }
        if (o.next.code === null) {
            $(".cc_ellip_in").last().html('다음 보도 자료가 없습니다');
        } else {
            $(".page_next").attr("href", _that.PagePressView + o.next.code);
            $(".cc_ellip_in").last().html('<a href="' + _that.PagePressView + o.next.code + '&page=' + _that.Page + '">' + o.next.title + '</a>');
        }
        $(".v_btn").attr("href", _that.PagePress + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword));

        var azHtml = [];
        for (var i = 0; i < f.length; i++) {
            if (f[i].iskind != "D") {
                azHtml.push('<li><a href="#" class="img_w"><img alt="" src="' + _that.ImageServer + f[i].file_fullpath + '"><span class="blind">' + o.info.title + "-" + (i + 1) + '</span></a>');
            }
        }
        $(".view_img").html(azHtml.join(''));
        _this.SetViewer();
    },
    PhotoList: function (o) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        var k = 4;
        var title = "";
        var _idxCnt = -1;
        for (var i = 0; i < o.length; i++) {
            if (_that.Idx == o[i].code) {
                _idxCnt = i;
            }

            if (i % k == 0) {
                azHtml.push('<div class="photo_article">');
                azHtml.push('<ul class="pa_list">');
            }
            azHtml.push('<li class="new">');
            if (o[i].photo_fullpath == "") {
                azHtml.push('<a class="pic" href="#"></a>');
            } else {
                azHtml.push('<a class="pic" href="#"><img alt="' + o[i].title + '" src="' + _that.ImageServer + o[i].photo_fullpath + '"><span class="blind">' + i + '|' + o[i].code + '</span></a>');
            }
            azHtml.push('<span class="txt"><span class="cc_ellip" style="min-height: 38px;">' + o[i].title.cut(60) + '</span></span>')
            azHtml.push('<span style="text-align: right; font-size:11px; margin-top: -18px; margin-right: 7px; display: block; position: relative;">' + o[i].reg_dt_short.substring(2, 10) + '</span>')
            if (o[i].is_new) {
                azHtml.push('<span class="sp_tinfo ico_new">new</span>');
            }
            azHtml.push('</span></span>');
            azHtml.push('	</li>');

            if (i % k == k - 1) {
                azHtml.push('</ul>');
                azHtml.push('</div>');
            }

        }
        $(".photo_wrap").html(azHtml.join(''));
        _this.SetPager();
        _this.SetViewer();

        if (_idxCnt >= 0) {
            $(".photo_wrap").find("li").eq(_idxCnt).find("a").click();
        }
    },
    NewsLetterInfo: function (p) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        o = p.info;
        f = p.file;

        $(".vtl_tit").html('<strong>' + o.info.title + '</strong>');
        $(".view_txt").html(o.info.contents);
        $(".vtl_date").html(o.info.reg_dt_full);
        if (o.prev.code === null) {
            $(".cc_ellip_in").first().html('이전 뉴스레터가 없습니다');
        } else {
            $(".page_prev").attr("href", _that.PageNewsLetterView + o.prev.code);
            $(".cc_ellip_in").first().html('<a href="' + _that.PageNewsLetterView + o.prev.code + '&page=' + _that.Page + '">' + o.prev.title + '</a>');
        }
        if (o.next.code === null) {
            $(".cc_ellip_in").last().html('다음 뉴스레터가 없습니다');
        } else {
            $(".page_next").attr("href", _that.PageNewsLetterView + o.next.code);
            $(".cc_ellip_in").last().html('<a href="' + _that.PageNewsLetterView + o.next.code + '&page=' + _that.Page + '">' + o.next.title + '</a>');
        }
        $(".v_btn").attr("href", _that.PageNewsLetter + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword));
        /*
        var azHtml = [];
        for(var i=0; i<f.length; i++){
            if (f[i].iskind != "D"){
                azHtml.push('<li><a href="#" class="img_w"><img alt="" src="'+_that.ImageServer+ f[i].file_fullpath+'"><span class="blind">'+i+'|'+o.info.code+'</span></a>');
            }	
        }			
        $(".view_img").html(azHtml.join(''));		
        _this.SetViewer();
        */
    },
    NewsLetterList: function (o) {
        var azHtml = [];
        var _this = this;
        var _that = infoUtil;
        if (o.length > 0) {
            for (var i = 0; i < o.length; i++) {
                azHtml.push('<tr>');
                azHtml.push('<td>' + (_that.Num--) + '</td>');
                azHtml.push('<td class="pic">');
                azHtml.push('<div class="in">');
                if (o[i].photo_fullpath == "") {
                    azHtml.push('<span class="img_type"><span class="bor">&nbsp;</span></span>');
                } else {
                    azHtml.push('<span class="img_type"><img src="' + _that.ImageServer + o[i].photo_fullpath + '" alt="' + o[i].title.cut(30) + ' 이미지"><span class="bor">&nbsp;</span></span>');
                }
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="td_tit">');
                azHtml.push('<div class="in">');
                azHtml.push('<div class="t_tit"><a id="" href="' + _that.PageNewsLetterView + o[i].code + '&page=' + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword) + '"><strong>' + o[i].title + '</strong></a>');
                if (o[i].is_new) {
                    azHtml.push('<span class="sp_tinfo ico_new">new</span>');
                }
                azHtml.push('</div>');
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="date">');
                azHtml.push('<div class="in">' + o[i].reg_dt_short);
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('</tr>');
            }
        } else {
            azHtml.push('<tr><td colspan="4"><div class="in"><div class="t_tit"><strong>검색된 결과가 없습니다.</strong></div></div></td></tr>');
        }
        $(".sct_tblarea").find("tbody").html(azHtml.join(''));
        _this.SetPager();
    },
    SetViewer: function () {
        $('.view_img,.mphoto_list,.pa_list').children().find('a:first').bind('click', function () {
            $('html, body').stop().animate({
                scrollTop: 480
            });
            $('.photoview_abs').show();
            $('.photoview_abs').attr('tabIndex', -1);
            $('.photoview_abs').focus();
            $('#wrap').addClass('dimmed_on');
            var a = $(this).find('span').first().text().split('|');
            var n = a[0];
            var c = a[1];
            var d = ($("#hdnDataType").val() != "" ? $("#hdnDataType").val() : "view");

            $('.gallery_wrap').hivegallery({
                view_num: 10,
                closefocus: n,
                curr_idx: c,
                category: $("#hdnCategory").val(),
                data_type: d,
                thumb_width: 85
            });

            return false;
        });
    },
    SetPager: function () {
        var _this = this;
        var _that = infoUtil;
        var azHtml = [];

        if (_that.TotalPage == 1) {
            azHtml.push('<a href="#none" data-page-num="1" class="current">1</a>');
            $(".page").html(azHtml.join(''));
            return;
        }

        if (_that.Page > _that.Size) {
            azHtml.push('<a href="#none" data-page-num="1" class="btn_page btn_first"><span class="sp_tinfo">맨처음 페이지</span></a>');
        }

        if (_that.BlockPage > 1) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.BlockPage - 1) + '" class="btn_page btn_prev"><span class="sp_tinfo">이전 페이지</span></a>');
        }
        for (var i = _that.BlockPage; i < _that.BlockPage + _that.PageSize; i++) {
            if (i != _that.Page) {
                azHtml.push('<a href="#none" data-page-num="' + i + '">' + i + '</a>');
            } else {
                azHtml.push('<a href="#none" data-page-num="' + i + '" class="current">' + i + '</a>');
            }
            if (i >= _that.TotalPage) {
                break;
            }
        }

        if ((_that.BlockPage + _that.PageSize) <= _that.TotalPage) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.BlockPage + _that.PageSize) + '" class="btn_page btn_next"><span class="sp_tinfo">다음 페이지</span></a>');
        }
        if (_that.Page < _that.TotalPage) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.TotalPage) + '" class="btn_page btn_last"><span class="sp_tinfo">맨마지막 페이지</span></a>');
        }


        $(".page").html(azHtml.join(''));
        $(".page a").bind("click", function () {
            _this.ChangePage($(this).attr("data-page-num"));
        });
        $('.page a[href="#none"]').click(function (w) {
            w.preventDefault();
            $('html, body').stop().animate({
                scrollTop: 0
            });
        });
    },
    ChangePage: function (p) {
        var _this = this;
        var _that = infoUtil;
        _that.Page = p;
        switch (_that.Location) {
            case "Notice":
                _that.NoticeList();
                break;
            case "Press":
                _that.PressList();
                break;
            case "Photo":
                _that.PhotoList();
                break;
            case "NewsLetter":
                _that.NewsLetterList();
                break;
        }
    }
}

// 문자열을 지정된 길이(len)로 자르는 메서드
String.prototype.cut = function (len) {
    var str = this; // 메서드를 호출한 문자열을 변수 str에 저장
    var l = 0; // 문자열의 길이를 저장하는 변수 l을 초기화
    for (var i = 0; i < str.length; i++) {
        // 문자열의 각 문자에 대해 유니코드 값을 확인하여 길이를 계산
        // 한글 및 기타 다국어 문자는 2바이트로 계산되며, 영문 및 숫자는 1바이트로 계산
        l += (str.charCodeAt(i) > 128) ? 2 : 1;

        // 누적된 길이가 지정된 길이(len)를 초과하는 경우, 현재까지의 문자열을 반환하고 "..."을 추가하여 줄인 문자열로 표시
        if (l > len) return str.substring(0, i) + "...";
    }

    // 누적된 길이가 지정된 길이(len)를 초과하지 않는 경우, 원본 문자열을 그대로 반환
    return str;
}


// 문자열의 바이트 수를 계산하는 메서드입니다.
String.prototype.bytes = function () {
    var str = this; // 메서드를 호출한 문자열을 변수 str에 저장
    var l = 0; // 문자열의 길이를 저장하는 변수 l을 초기화
    for (var i = 0; i < str.length; i++) {
        // 문자열의 각 문자에 대해 유니코드 값을 확인하여 길이를 계산
        // 한글 및 기타 다국어 문자는 2바이트로 계산되며, 영문 및 숫자는 1바이트로 계산
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
    }

    // 계산된 길이를 반환
    return l;
}

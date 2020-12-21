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
                azHtml.push('<li><a href="#" class="img_w"><img alt="" src="' + _that.ImageServer + f[i].file_fullpath + '"><span class="blind">' + o.info.title + "-" + (i+1) +  '</span></a>');
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
}
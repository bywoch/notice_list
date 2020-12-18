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
}
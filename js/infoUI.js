var infoUI = {
    NoticeList: function (o) {
        // 빈 배열 azHtml을 선언 테이블의 내용을 이 배열에 저장
        var azHtml = [];

        // _this 변수에 현재 객체(this)를 할당 (현재 객체는 이 함수를 포함한 infoUtil 객체)
        var _this = this;

        // _that 변수에 infoUtil 객체를 할당
        var _that = infoUtil;

        // 공지사항 정보가 담긴 배열 o의 길이가 0보다 큰 경우
        if (o.length > 0) {
            // 배열 o를 순회하며 테이블의 각 행을 생성하여 azHtml 배열에 추가
            for (var i = 0; i < o.length; i++) {
                azHtml.push('<tr>');
                azHtml.push('<td>' + (_that.Num--) + '</td>'); // 번호를 표시하는 열을 추가
                azHtml.push('<td class="td_tit">');
                azHtml.push('<div class="in">');
                // 제목과 해당 공지사항의 링크를 추가
                azHtml.push('<div class="t_tit"><a href="' + _that.PageNoticeView + o[i].code + '&page=' + _that.Page + '&opt=' + _that.Opt + '&keyword=' + encodeURIComponent(_that.Keyword) + '"><strong>' + o[i].title + '</strong></a>');

                // 공지사항이 새로운 항목인 경우, "new" 아이콘을 추가
                if (o[i].is_new) {
                    azHtml.push('<span class="sp_tinfo ico_new">new</span>');
                }

                azHtml.push('</div>');
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('<td class="date">');
                azHtml.push('<div class="in">' + o[i].reg_dt_short); // 등록 날짜를 표시하는 열을 추가
                azHtml.push('</div>');
                azHtml.push('</td>');
                azHtml.push('</tr>');
            }
        } else {
            // 검색된 결과가 없는 경우, "검색된 결과가 없습니다."라는 행을 생성하여 azHtml 배열에 추가
            azHtml.push('<tr><td colspan="3"><div class="in"><div class="t_tit"><strong>검색된 결과가 없습니다.</strong></div></div></td></tr>');
        }

        // 생성한 테이블 내용을 웹 페이지의 특정 요소에 삽입
        $(".sct_tblarea").find("tbody").html(azHtml.join(''));

        // _this 객체의 SetPager 메서드를 호출하여 페이징 처리를 수행
        _this.SetPager();

        /*  이 함수는 공지사항 정보가 담긴 배열(o)을 받아와서 NoticeList 함수를 정의하고, 배열 o에 담긴 공지사항 정보를 HTML 테이블로 변환하여 웹 페이지에 표시하는 역할을 함. 생성한 테이블 내용은 jQuery를 사용하여 웹 페이지의 특정 요소에 삽입되고, 마지막으로 _this.SetPager() 메서드를 호출하여 페이징 처리를 수행함*/

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

        // 배열 'o'를 순회하며 사진 목록을 생성
        for (var i = 0; i < o.length; i++) {
            // _that 객체의 Idx 값과 현재 사진의 코드가 일치하는 경우, 해당 사진의 인덱스를 _idxCnt에 저장
            if (_that.Idx == o[i].code) {
                _idxCnt = i;
            }

            // 한 행에 k개의 사진이 표시되는 경우, 사진 묶음을 시작하는 HTML 코드를 배열 'azHtml'에 추가
            if (i % k == 0) {
                azHtml.push('<div class="photo_article">');
                azHtml.push('<ul class="pa_list">');
            }

            azHtml.push('<li class="new">');

            // 사진의 경로가 없는 경우, 빈 사진 링크를 추가
            if (o[i].photo_fullpath == "") {
                azHtml.push('<a class="pic" href="#"></a>');
            } else {
                // 사진의 경로가 있는 경우, 해당 사진과 타이틀을 추가
                azHtml.push('<a class="pic" href="#"><img alt="' + o[i].title + '" src="' + _that.ImageServer + o[i].photo_fullpath + '"><span class="blind">' + i + '|' + o[i].code + '</span></a>');
            }

            azHtml.push('<span class="txt"><span class="cc_ellip" style="min-height: 38px;">' + o[i].title.cut(60) + '</span></span>');

            // 사진의 등록 날짜를 오른쪽 아래에 표시
            azHtml.push('<span style="text-align: right; font-size:11px; margin-top: -18px; margin-right: 7px; display: block; position: relative;">' + o[i].reg_dt_short.substring(2, 10) + '</span>');

            // 사진이 새로운 항목인 경우, "new" 아이콘 추가
            if (o[i].is_new) {
                azHtml.push('<span class="sp_tinfo ico_new">new</span>');
            }

            azHtml.push('</span></span>');
            azHtml.push('	</li>');

            // 한 행에 k개의 사진이 표시되는 경우, 사진 묶음을 닫는 HTML 코드를 배열 'azHtml'에 추가
            if (i % k == k - 1) {
                azHtml.push('</ul>');
                azHtml.push('</div>');
            }
        }

        // 생성한 사진 목록을 사진 갤러리 요소에 표시
        $(".photo_wrap").html(azHtml.join(''));

        // 페이저 설정 함수를 호출하여 사진 갤러리의 페이저를 설정
        _this.SetPager();

        // 뷰어 설정 함수를 호출하여 사진 뷰어를 설정
        _this.SetViewer();

        // _idxCnt가 0 이상인 경우, 해당 인덱스의 사진을 클릭
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
        // 이미지 뷰어를 활성화할 요소들에 클릭 이벤트를 바인딩
        $('.view_img, .mphoto_list, .pa_list').children().find('a:first').bind('click', function () {
            // 이미지 뷰어 표시를 위해 페이지를 480px 아래로 스크롤
            $('html, body').stop().animate({
                scrollTop: 480
            });
    
            // 이미지 뷰어 요소를 보여줍니다.
            $('.photoview_abs').show();
    
            // 이미지 뷰어에 포커스를 주어 키보드 이벤트를 사용할 수 있게함 
            $('.photoview_abs').attr('tabIndex', -1);
            $('.photoview_abs').focus();
    
            // 페이지를 불투명하게 만들어 모달 효과를 적용
            $('#wrap').addClass('dimmed_on');
    
            // 클릭한 이미지의 인덱스와 코드를 가져옴
            var a = $(this).find('span').first().text().split('|');
            var n = a[0]; // 인덱스
            var c = a[1]; // 코드
            var d = ($("#hdnDataType").val() != "" ? $("#hdnDataType").val() : "view"); // 데이터 타입 설정
    
            // 이미지 갤러리 뷰어를 초기화하고 설정
            $('.gallery_wrap').hivegallery({
                view_num: 10, // 한 번에 보여줄 이미지 개수
                closefocus: n, // 뷰어를 닫았을 때 포커스를 이동시킬 이미지의 인덱스
                curr_idx: c, // 현재 이미지의 인덱스
                category: $("#hdnCategory").val(), // 카테고리 설정
                data_type: d, // 데이터 타입 설정
                thumb_width: 85 // 썸네일 이미지 너비 설정
            });
    
            // 기본 링크 동작을 중단
            return false;
        });
    },    
    SetPager: function () {
        var _this = this;
        var _that = infoUtil;
        var azHtml = [];
    
        // 전체 페이지 개수가 1개인 경우, 현재 페이지를 보여주는 링크를 생성하고 반환
        if (_that.TotalPage == 1) {
            azHtml.push('<a href="#none" data-page-num="1" class="current">1</a>');
            $(".page").html(azHtml.join(''));
            return;
        }
    
        // 현재 페이지가 _that.Size보다 큰 경우, 맨처음 페이지로 이동하는 링크를 생성
        if (_that.Page > _that.Size) {
            azHtml.push('<a href="#none" data-page-num="1" class="btn_page btn_first"><span class="sp_tinfo">맨처음 페이지</span></a>');
        }
    
        // 현재 블록의 첫 페이지가 1보다 큰 경우, 이전 블록으로 이동하는 링크를 생성
        if (_that.BlockPage > 1) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.BlockPage - 1) + '" class="btn_page btn_prev"><span class="sp_tinfo">이전 페이지</span></a>');
        }
    
        // 현재 블록의 첫 페이지부터 PageSize 만큼의 페이지 번호를 생성
        for (var i = _that.BlockPage; i < _that.BlockPage + _that.PageSize; i++) {
            // 현재 페이지가 아닌 경우, 일반 페이지 번호 링크를 생성
            if (i != _that.Page) {
                azHtml.push('<a href="#none" data-page-num="' + i + '">' + i + '</a>');
            } else {
                // 현재 페이지인 경우, 현재 페이지를 나타내는 표시와 함께 페이지 번호 링크를 생성
                azHtml.push('<a href="#none" data-page-num="' + i + '" class="current">' + i + '</a>');
            }
    
            // 전체 페이지 개수를 넘어간 경우, 반복문을 종료
            if (i >= _that.TotalPage) {
                break;
            }
        }
    
        // 다음 블록으로 이동하는 링크를 생성
        if ((_that.BlockPage + _that.PageSize) <= _that.TotalPage) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.BlockPage + _that.PageSize) + '" class="btn_page btn_next"><span class="sp_tinfo">다음 페이지</span></a>');
        }
    
        // 마지막 페이지로 이동하는 링크를 생성
        if (_that.Page < _that.TotalPage) {
            azHtml.push('<a href="#none" data-page-num="' + (_that.TotalPage) + '" class="btn_page btn_last"><span class="sp_tinfo">맨마지막 페이지</span></a>');
        }
    
        // 생성한 페이지 번호 링크들을 .page 요소에 추가
        $(".page").html(azHtml.join(''));
    
        // 페이지 번호 링크를 클릭하면 ChangePage 함수를 호출하여 해당 페이지로 이동
        $(".page a").bind("click", function () {
            _this.ChangePage($(this).attr("data-page-num"));
        });
    
        // 링크의 href 속성이 "#none"인 경우, 클릭 이벤트를 중단하고 페이지 맨 위로 스크롤
        $('.page a[href="#none"]').click(function (w) {
            w.preventDefault();
            $('html, body').stop().animate({
                scrollTop: 0
            });
        });
    },    
    // 페이지 전환 함수 페이지 번호(p)를 인자로 받아옴
    ChangePage: function (p) {
        // _this 변수에 현재 객체(this)를 할당 (현재 객체는 이 함수를 포함한 infoUtil 객체)
        var _this = this;

        // _that 변수에 infoUtil 객체를 할당
        var _that = infoUtil;

        // 전달받은 페이지 번호(p)를 _that 객체의 Page에 저장
        _that.Page = p;

        // _that 객체의 Location 값에 따라 다른 목록을 가져와 페이지를 변경
        switch (_that.Location) {
            case "Notice":
                // 공지사항 목록을 가져와 페이지를 변경
                _that.NoticeList();
                break;
            case "Press":
                // 보도자료 목록을 가져와 페이지를 변경
                _that.PressList();
                break;
            case "Photo":
                // 사진 목록을 가져와 페이지를 변경
                _that.PhotoList();
                break;
            case "NewsLetter":
                // 뉴스레터 목록을 가져와 페이지를 변경
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


// 문자열의 바이트 수를 계산하는 메서드
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

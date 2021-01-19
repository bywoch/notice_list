var infoUtil = {
	Location: "Notice", // 현재 위치
    Page: 1, // 페이지 번호
    Size: 10, // 한 페이지에 표시할 데이터 개수
    PageSize: 10, // 페이지 그룹 크기
    TotalPage: 1, // 총 페이지 수
    BlockPage: 1, // 현재 페이지 그룹의 시작 페이지 번호
    Opt: 0, // 옵션
    Keyword: "", // 검색 키워드
    Num: 0, // 데이터 번호
    Idx: 0, // 인덱스
    ImageServer: 'https://zzzzinfo.com/data/', // 이미지 서버 주소
    PageNoticeView: '/pr/notice/view.html?idx=', // 공지사항 페이지 뷰 URL
    PageNotice: '/pr/notice/index.html?page=', // 공지사항 페이지 URL
    PagePressView: '/pr/press/view.html?idx=', // 언론보도 페이지 뷰 URL
    PagePress: '/pr/press/index.html?page=', // 언론보도 페이지 URL
    PageNewsLetterView: '/pr/newsletter/view.html?idx=', // 뉴스레터 페이지 뷰 URL
    PageNewsLetter: '/pr/newsletter/index.html?page=', // 뉴스레터 페이지 URL
	UrlParameter: function (str) {

		// URL의 쿼리 파라미터 추출을 위해 특수 문자 [와 ]를 이스케이프 처리하여 정규식 패턴 생성
		str = str.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

		// 정규식 패턴을 사용하여 쿼리 파라미터에 해당하는 값을 추출
		var regex = new RegExp('[\\?&]' + str + '=([^&#]*)');

		var results = regex.exec(location.search); // location.search는 현재 URL의 쿼리 문자열

		// 추출한 결과가 null이면 해당 쿼리 파라미터가 존재하지 않으므로 빈 문자열을 반환, 그렇지 않으면 결과를 디코딩하여 반환
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	},
	InitPageInfo: function (o) {
		//InitPageInfo 함수를 정의하고, 함수 내부에서 다양한 계산을 수행하여 페이지 정보를 초기화
		// 함수 내에서 this를 사용하기 위해 _this 변수에 현재 객체(this)를 할당
		var _this = this;
    
		// 총 페이지 수를 계산하여 TotalPage 속성에 저장
		// parseInt() 함수를 사용하여 소수점을 버리고 정수로 변환
		_this.TotalPage = parseInt(o.total_cnt / _this.Size, 10);
		
		// 총 페이지 수가 나누어 떨어지지 않는 경우 (남은 데이터가 있는 경우)
		// 총 페이지 수를 1 증가
		if (_this.TotalPage * _this.Size != o.total_cnt) {
			_this.TotalPage++;
		}
		
		// 현재 페이지 그룹의 시작 페이지 번호를 계산하여 BlockPage 속성에 저장
		// 현재 페이지에서 PageSize를 나눈 뒤 다시 PageSize를 곱하여 현재 페이지 그룹의 시작 페이지 번호를 구함
		// parseInt() 함수를 사용하여 소수점을 버리고 정수로 변환
		_this.BlockPage = parseInt(parseInt(_this.Page - 1) / _this.PageSize) * _this.PageSize + 1;
		
		// 현재 페이지에서 보여지는 데이터의 번호를 계산하여 Num 속성에 저장
		// 현재 페이지에서 첫 번째 데이터의 번호를 구한 뒤, 총 데이터 개수에서 빼서 현재 페이지의 마지막 데이터 번호를 구함
		_this.Num = o.total_cnt - (_this.Size * (_this.Page - 1));

		//InitPageInfo 함수를 정의하고, 함수 내부에서 다양한 계산을 수행하여 페이지 정보를 초기화
	},
	InitPageInfo: function (o) {

		// 함수 내에서 this를 사용하기 위해 _this 변수에 현재 객체(this)를 할당
		var _this = this;
		
		// 총 페이지 수를 계산하여 TotalPage 속성에 저장
		// parseInt() 함수를 사용하여 소수점을 버리고 정수로 변환
		_this.TotalPage = parseInt(o.total_cnt / _this.Size, 10);
		
		// 총 페이지 수가 나누어 떨어지지 않는 경우 (남은 데이터가 있는 경우)
		// 총 페이지 수를 1 증가
		if (_this.TotalPage * _this.Size != o.total_cnt) {
			_this.TotalPage++;
		}
		
		// 현재 페이지 그룹의 시작 페이지 번호를 계산하여 BlockPage 속성에 저장
		// 현재 페이지에서 PageSize를 나눈 뒤 다시 PageSize를 곱하여 현재 페이지 그룹의 시작 페이지 번호를 구함
		// parseInt() 함수를 사용하여 소수점을 버리고 정수로 변환
		_this.BlockPage = parseInt(parseInt(_this.Page - 1) / _this.PageSize) * _this.PageSize + 1;
		
		// 현재 페이지에서 보여지는 데이터의 번호를 계산하여 Num 속성에 저장
		// 현재 페이지에서 첫 번째 데이터의 번호를 구한 뒤, 총 데이터 개수에서 빼서 현재 페이지의 마지막 데이터 번호를 구함
		_this.Num = o.total_cnt - (_this.Size * (_this.Page - 1));

		// 페이지 초기화를 담당하는 함수로, 페이지 로딩 시 URL의 쿼리 파라미터를 읽어와서 해당 정보를 이용하여 페이지를 초기화
		// 또한, 검색 버튼이나 엔터 키가 눌렸을 때도 검색 기능을 수행하도록 구현
		// 이렇게 함으로써 웹 페이지에서 페이지 정보를 초기화하고 검색 기능을 구현

	},
	NoticeList: function () {
		var _this = this; // 함수 내에서 this를 사용하기 위해 _this 변수에 현재 객체(this)를 할당
		var _that = infoUI; // infoUI 객체를 _that 변수에 할당
	
		_this.Location = "Notice"; // 현재 위치(Location)을 "Notice"로 설정
	
		// 공지사항 리스트를 가져오기 위해 AJAX 요청
		$.ajax({
			// 주석 처리된 type: "get"은 생략해도 기본 값이 get으로 설정
	
			// 공지사항 리스트를 가져올 URL을 설정
			url: "https://zzzzinfo.com/api/notice/list",
	
			// 서버에서 반환하는 데이터 타입을 설정
			// JSONP 방식으로 데이터를 받아오기 위해 "jsonp"로 설정
			dataType: "jsonp",
	
			// 요청을 비동기적으로 처리하도록 설정
			async: true,
	
			// 요청 결과를 캐시할 수 있도록 설정
			cache: true,
	
			// 요청 시 서버에 전달할 데이터를 설정
			// _this 객체의 Opt, Keyword, Page, Size 속성 값을 사용하여 데이터를 설정
			data: {
				opt: _this.Opt,
				keyword: _this.Keyword,
				page: _this.Page,
				size: _this.Size
			},
	
			// 요청이 성공적으로 완료되었을 때 실행되는 콜백 함수
			success: function (o) {
				// InitPageInfo 함수를 호출하여 페이지 정보를 초기화
				// 가져온 공지사항 리스트를 infoUI 객체의 NoticeList 함수에 전달하여 페이지에 표시
				_this.InitPageInfo(o);
				_that.NoticeList(o.list);
			},
	
			// 요청이 실패했을 때 실행되는 콜백 함수
			error: function (request, status, error) {
				// 에러가 발생한 경우, 필요한 처리를 수행하거나 에러 메시지를 출력하는 등의 작업을 수행할 수 있음
				// 현재 코드에서는 에러 메시지를 주석 처리하여 아무 동작도 수행하지 않음
			}
		});
	},
	NoticeInfo: function () {
		var _this = this;
		var _that = infoUI;
		var n = _this.UrlParameter("idx");
		var _keyword = infoUtil.UrlParameter("keyword");
		var _opt = infoUtil.UrlParameter("opt");
		if (_opt != "") { infoUtil.Opt = _opt; }
		if (_keyword != "") { infoUtil.Keyword = _keyword; }
		_this.Location = "Notice";
		_this.Page = _this.UrlParameter("page");
		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/notice/info",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				intIdx: n
			},
			success: function (o) {
				_that.NoticeInfo(o);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
	PressList: function () {
		var _this = this;
		var _that = infoUI;
		_this.Location = "Press";

		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/press/list",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				opt: _this.Opt,
				keyword: _this.Keyword,
				page: _this.Page,
				size: _this.Size
			},
			success: function (o) {
				_this.InitPageInfo(o);
				_that.PressList(o.list);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
	PressInfo: function () {
		var _this = this;
		var _that = infoUI;
		var n = _this.UrlParameter("idx");
		var _keyword = infoUtil.UrlParameter("keyword");
		var _opt = infoUtil.UrlParameter("opt");
		if (_opt != "") { infoUtil.Opt = _opt; }
		if (_keyword != "") { infoUtil.Keyword = _keyword; }
		_this.Location = "Notice";
		_this.Page = _this.UrlParameter("page");

		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/press/info",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				intIdx: n
			},
			success: function (o) {
				_that.PressInfo(o);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
	PhotoList: function () {
		var _this = this;
		var _that = infoUI;
		_this.Location = "Photo";
		_this.Size = 12;

		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/photo/list",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				opt: _this.Opt,
				keyword: _this.Keyword,
				page: _this.Page,
				size: _this.Size
			},
			success: function (o) {
				_this.InitPageInfo(o);
				_that.PhotoList(o.list);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
	NewsLetterList: function () {
		var _this = this;
		var _that = infoUI;
		_this.Location = "NewsLetter";

		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/newsletter/list",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				opt: _this.Opt,
				keyword: _this.Keyword,
				page: _this.Page,
				size: _this.Size
			},
			success: function (o) {
				_this.InitPageInfo(o);
				_that.NewsLetterList(o.list);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
	NewsLetterInfo: function () {
		var _this = this;
		var _that = infoUI;
		// URL에서 "idx" 파라미터를 가져와서 n 변수에 할당 만약 값이 없으면 0으로 설정
		var n = (_this.UrlParameter("idx") == "" ? 0 : _this.UrlParameter("idx"));

		// URL에서 "keyword"와 "opt" 파라미터를 가져와서 _keyword와 _opt 변수에 할당
		var _keyword = infoUtil.UrlParameter("keyword");
		var _opt = infoUtil.UrlParameter("opt");
		
		// 만약 _opt 값이 비어있지 않다면, infoUtil 객체의 Opt에 할당
		if (_opt != "") { infoUtil.Opt = _opt; }
	
		// 만약 _keyword 값이 비어있지 않다면, infoUtil 객체의 Keyword에 할당
		if (_keyword != "") { infoUtil.Keyword = _keyword; }
	
		// 뉴스레터 위치를 "NewsLetter"로 설정
		_this.Location = "NewsLetter";
	
		// URL에서 "page" 파라미터를 가져와서 _this.Page에 할당
		_this.Page = _this.UrlParameter("page");
	
		$.ajax({
			//type: "get",
			url: "https://zzzzinfo.com/api/newsletter/info",
			dataType: "jsonp",
			async: true,
			cache: true,
			data: {
				// API 요청 시, intIdx 파라미터에 n 값을 전달 만약 n 값이 비어있다면 0을 전달
				intIdx: n = "" ? 0 : n
			},
			success: function (o) {
				// API 요청이 성공하면 _that 객체의 NewsLetterInfo 함수를 호출하여 데이터를 처리
				_that.NewsLetterInfo(o);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	},
}


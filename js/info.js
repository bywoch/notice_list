var infoUtil = {
	Location: "Notice",
	Page: 1,
	Size: 10,
	PageSize: 10,
	TotalPage: 1,
	BlockPage: 1,
	Opt: 0,
	Keyword: "",
	Num: 0,
	Idx: 0,
	ImageServer: 'https://zzzzinfo.com/data/',
	PageNoticeView: '/pr/notice/view.html?idx=',
	PageNotice: '/pr/notice/index.html?page=',
	PagePressView: '/pr/press/view.html?idx=',
	PagePress: '/pr/press/index.html?page=',
	PageNewsLetterView: '/pr/newsletter/view.html?idx=',
	PageNewsLetter: '/pr/newsletter/index.html?page=',
	UrlParameter: function (str) {
		str = str.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + str + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	},
	InitPageInfo: function (o) {
		var _this = this;
		_this.TotalPage = parseInt(o.total_cnt / _this.Size, 10);
		if (_this.TotalPage * _this.Size != o.total_cnt) {
			_this.TotalPage++;
		}
		_this.BlockPage = parseInt(parseInt(_this.Page - 1) / _this.PageSize) * _this.PageSize + 1;
		_this.Num = o.total_cnt - (_this.Size * (_this.Page - 1));
	},
	InitPage: function () {
		var _this = this;
		var _keyword = infoUtil.UrlParameter("keyword");
		if (_keyword != "") {
			infoUtil.Keyword = _keyword;
			$("#keyword").val(_keyword);
		}
		var _opt = infoUtil.UrlParameter("opt");
		if (_opt != "") {
			infoUtil.Opt = _opt;
			$("#opt").val(_opt);
		}

		$("#keyword").keydown(function (key) {
			if (key.keyCode == 13) {
				$("#btnSearch").click();
			}
		});
		$("#btnSearch").click(function () {
			_this.Page = 1;
			_this.Opt = $("#opt").val();
			_this.Keyword = $.trim($("#keyword").val());
			if (_this.Keyword.length == 0) {
				alert("검색어를 입력해 주세요");
				return false;
			}
			switch (_this.Location) {
				case "Notice": _this.NoticeList(); break;
				case "Press": _this.PressList(); break;
				case "Photo": _this.PhotoList(); break;
				case "NewsLetter": _this.NewsLetterList(); break;
			}
		});
	},
	NoticeList: function () {
		var _this = this;
		var _that = infoUI;
		_this.Location = "Notice";
		$.ajax({
			//type: "get",
			url: "//zzzzinfo.com/api/notice/list",
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
				_that.NoticeList(o.list);
			},
			error: function (request, status, error) {
				//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
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
			url: "//zzzzinfo.com/api/notice/info",
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
			url: "//zzzzinfo.com/api/press/list",
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
			url: "//zzzzinfo.com/api/press/info",
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
			url: "//zzzzinfo.com/api/photo/list",
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
}


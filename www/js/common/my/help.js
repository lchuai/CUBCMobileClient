var help = {
	GetHelpList: function() {
		if($("#InptSearchText").val() != "") {
			textSearch = $("#InptSearchText").val();
		}
		var DATA = new Object();
		DATA.SerachText = textSearch;
		//获取帮助信息列表
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetHelpList", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					$("#helpContent").empty();
					var helpList = '';
					for(var i = 0; i < data.returnData.length; i++) {
						helpList += '<div class="help-content-list">';
						helpList += '<h3>' + data.returnData[i].NewsTitle + '</h3>';
						helpList += '<p>' + data.returnData[i].NewsContent + '</p>';
						helpList += '</div>';
					}
					$("#helpContent").append(helpList);
				}
			});
		}, 400)
	},

	SubmitQuestion: function() {
		$("#helpEditConfirm").on('click', function() {
			var txtContent = $("#txtContent").val().trim();
			var contactName = $("#contactName").val().trim();
			var numPhone = $("#NumPhone").val().trim();

			if(txtContent == '') {
				sysUtil.commonUtil.alertMsg("问题内容不能为空，请输入问题内容！");
				return;
			}
			if(contactName == '') {
				sysUtil.commonUtil.alertMsg("手机联系人不能为空，请输入手机联系人！");
				return;
			}
			if(numPhone == '') {
				sysUtil.commonUtil.alertMsg("手机号不能为空，请输入手机号！");
				return;
			}
			//提交问题内容到后台
			var DATA = new Object();
			DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
			DATA.TxtContent = txtContent;
			DATA.ContactName = contactName;
			DATA.NumPhone = numPhone;

			sysUtil.ajaxTool.requestGetData("WebApiIndex", "SubmitQuestion", METHOD_POST, DATA, function(data) {

				if(data.boolResult) {
					//问题上传成功跳转到问题列表页
					layer.open({
						content: data.returnMsg,
						skin: 'msg',
						time: 1, //2秒后自动关闭
						end: function() {
							mainView.router.refreshPreviousPage()
							setTimeout(function() {
								mainView.router.back({

									pageName: 'myQuestionList', //页面的data-page值
									//									force: true //注意此参数back方法专用
								});
							}, 1000)

							//							mainView.router.refreshPreviousPage();
						}
					});

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					return;
				}
			});
		});
	},
	SubmitQuestionmodify: function() { //提交页面冲突重写
		$("#helpEditConfirm_aaa").on('click', function() {
			var txtContent = $("#txtContent_aaa").val().trim();
			var contactName = $("#contactName_aaa").val().trim();
			var numPhone = $("#NumPhone_aaa").val().trim();

			if(txtContent == '') {
				sysUtil.commonUtil.alertMsg("问题内容不能为空，请输入问题内容！");
				return;
			}
			if(contactName == '') {
				sysUtil.commonUtil.alertMsg("手机联系人不能为空，请输入手机联系人！");
				return;
			}
			if(numPhone == '') {
				sysUtil.commonUtil.alertMsg("手机号不能为空，请输入手机号！");
				return;
			}
			//提交问题内容到后台
			var DATA = new Object();
			DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
			DATA.TxtContent = txtContent;
			DATA.ContactName = contactName;
			DATA.NumPhone = numPhone;

			sysUtil.ajaxTool.requestGetData("WebApiIndex", "SubmitQuestion", METHOD_POST, DATA, function(data) {

				if(data.boolResult) {
					//问题上传成功跳转到问题列表页
					layer.open({
						content: data.returnMsg,
						skin: 'msg',
						time: 1, //2秒后自动关闭
						end: function() {
							mainView.router.refreshPreviousPage()
							setTimeout(function() {
								myApp.getCurrentView().router.load({
									url: "pages/my/myQuestionList.html"
								});
								//								mainView.router.load({
								//									pageName: 'myQuestionList', //页面的data-page值
								//								});
							}, 300)
						}
					});
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					return;
				}
			});
		});
	},
	//下拉刷新页面代码

	PrtContents: function() {
		var ptrContent = $$('#myQuestionPageId');

		ptrContent.on('refresh', function() {
			// 模拟2s的加载过程
			setTimeout(function() {
				//ptrContent.find('#myQuestionListContent').prepend("ddddd");
				$("#myQuestionListContent").empty();
				help.QuestionList(0); //加载第一页的数据

				thisPageIndex = 0;
				//刷新完毕，则开启无限加载事件
				myApp.attachInfiniteScroll($$('.infinite-scroll'));
				if(!document.getElementById("lodingScroll")) {
					$("#myQuestionPageId").append('<div class="infinite-scroll-preloader"><div class="preloader" id="lodingScroll"></div></div>');
				}
				// 加载完毕需要重置
				myApp.pullToRefreshDone();
			}, 1000);
		});
	},

	//上拉加载页面代码
	pullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#myQuestionPageId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				thisPageIndex = parseInt(thisPageIndex) + 1;
				if(thisPageIndex >= thisPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$('.infinite-scroll-preloader').remove();
					return;
				}

				// 获取下一页的内容
				help.QuestionList(parseInt(thisPageIndex));

			}, 1000);
		});
	},

	QuestionList: function(pageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = pageIndex;
		DATA.PageSize = 10;
		setTimeout(function() {

			sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetQuestionList", METHOD_GET, DATA, function(data) {

				if(data.boolResult) {

					thisPageCount = data.returnData.pageCount;
					var myQuestionList = '';
					var item = data.returnData.rows;

					for(var i = 0; i < item.length; i++) {
						myQuestionList += '<div class="myQuestionList">';
						myQuestionList += '<div class="questionTitle">';
						myQuestionList += '<p>' + item[i].QContent + '</p>';
						myQuestionList += '</div>';
						if(data.returnData.AuditStatusName = "待审核") {
							myQuestionList += '<div class="require-time">';
							myQuestionList += '<span id="requireState" class="require">待回复</span>';
							myQuestionList += '<span class="question-time">' + item[i].CreateTime + '</span>';
							myQuestionList += '</div>';
							myQuestionList += '<div class="require-content">';
							myQuestionList += '<p>回复:</p>';
							myQuestionList += '</div>';
						} else {
							myQuestionList += '<div class="require-time">';
							myQuestionList += '<span class="require have-requred">已回复</span>';
							myQuestionList += '<span class="question-time">' + item[i].CreateTime + '</span>';
							myQuestionList += '</div>';
							myQuestionList += '<div class="require-title">回复：</div>';
							myQuestionList += '<div class="require-content">';
							myQuestionList += '<div class="require-title">回复：</div>';
							myQuestionList += '<p>' + item[i].AnswerContent + '</p>';
							myQuestionList += '</div>';
						}
						myQuestionList += '</div>';
					}
					if(item.length < 10) {
						$("#lodingScroll").hide();
					}
					$("#myQuestionListContent").append(myQuestionList);
				} else {
					$("#lodingScroll").hide();
					sysUtil.commonUtil.alertMsg("暂无问题列表！");
				}
			});

		}, 400);
	}
}
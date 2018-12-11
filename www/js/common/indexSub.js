var indexSub = {
	JumpHomeCarouselDetails: function(BusinessWalletID) { //跳转到商家详情页面
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/HomeCarouselDetails.html?BusinessWalletID=" + BusinessWalletID
		});
	},
	HomeCarouselDetails: function(BusinessWalletID) { //商家详情页面数据渲染
		var DATA = new Object();
		DATA.BusinessWalletID = BusinessWalletID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "GetBusiness", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					
					console.log(data);
					var liHtml = '';
					var content = data.returnData;
					if(content!=null)
					{	
						$("#businessTitle").text(content.NameOfShop);
						$("#HomeCarouselDetails_images").attr('src', BASIC_HOST_URL + content.ShopImg);
						$("#BusinessName").text(content.NameOfShop);
						$("#BusinessAdress").text(content.BusinessAddress);
						$("#divBusinessRemark").html(content.BusinessRemark);  					
					}
					
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	//下拉刷新页面代码
	NewsSubPullRefresh: function() {
		var ptrContent = $$('#newsContentListPageID');

		ptrContent.on('refresh', function() {
			// 模拟2s的加载过程
			setTimeout(function() {
				//ptrContent.find('#myQuestionListContent').prepend("ddddd");
				$("#newsContentList").empty();
				PageIndex = 0;
				indexSub.GetNewsContentList(0);
				//刷新完毕，则开启无限加载事件
				myApp.attachInfiniteScroll($$('.infinite-scroll'));
				if(!document.getElementById("newsContentListScroll")) {
					$("#newsContentListPageID").append('<div class="infinite-scroll-preloader"><div class="preloader" id="newsContentListScroll"></div></div>');
				}
				// 加载完毕需要重置
				myApp.pullToRefreshDone();
			}, 1000);
		});
	},

	//上拉加载新闻列表页面代码
	NewsContentPullDown: function() {
		var loading = false;
		// 加载flag
		$$('#newsContentListPageID').on('infinite', function() {
			// 注册'infinite'事件处理函数

			//			alert("已进入加载方法！"+thisPageCount);
			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				PageIndex = parseInt(PageIndex) + 1;
				if(PageIndex >= PageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$('.infinite-scroll-preloader').remove();
					return;
				}
				// 获取下一页的内容
				indexSub.GetNewsContentList(parseInt(PageIndex));
			}, 1000);
		});
	},
	//上拉加载用户信息页面代码
	UserContentPullDown: function() {
		var loading = false;
		// 加载flag
		$$('.infinite-scroll').on('infinite', function() {
			// 注册'infinite'事件处理函数

			//			alert("已进入加载方法！"+thisPageCount);
			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				UserPageIndex = parseInt(UserPageIndex) + 1;
				if(UserPageIndex >= UserPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$('.infinite-scroll-preloader').remove();
					return;
				}
				// 获取下一页的内容
				indexSub.GetRegistUsersInfo(parseInt(UserPageIndex));
			}, 1000);
		});
	},
	GetNewsContentList: function(NewsPageIndex) {
		var DATA = new Object();
		DATA.PageIndex = NewsPageIndex;
		DATA.PageSize = 10;
		DATA.languageID = 1;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNewsInformation", METHOD_GET, DATA, function(data) {
				//sysUtil.commonUtil.alertMsg(data.returnMsg);
				if(data.boolResult) {
					var NewsContentList = data.returnData.rows;
					if(NewsContentList.length > 0) {
						PageCount = data.returnData.PageCont;
						var liHtml = '';

						for(var i = 0; i < NewsContentList.length; i++) {
							liHtml += '<div class="index-content-news-fist-list same-style" onclick="sysIndex.showNewsContent(' + NewsContentList[i].NewsID + ',2)">';
							liHtml += '<div class="index-news-left">';
							liHtml += '<div class="index-news-left-top">';
							liHtml += '<a href="javascript:void(0);"><p>' + NewsContentList[i].NewsTitle + '</p></a>';
							liHtml += '</div>';
							liHtml += '<div class="index-news-left-bottom">';
							liHtml += NewsContentList[i].CreateDate;
							liHtml += '<span>';
							liHtml += '<span>' + NewsContentList[i].Frequency + '</span>浏览';
							liHtml += '</span>';
							liHtml += '</div>';
							liHtml += '</div>';
							liHtml += '<div class="index-news-right">';
							liHtml += '<img src="' + NewsContentList[i].ImageUrl + '"/>';
							liHtml += '</div>';
							liHtml += '</div>';
						}
						$("#newsContentList").append(liHtml);
					}
				}
			});
		}, 400);
	},
	GetRegistUsersInfo: function(UserPageIndex) {
		var DATA = new Object();
		DATA.PageIndex = UserPageIndex;
		DATA.PageSize = 10;
		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNewUsersList", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				UserPageCount = data.returnData.PageCount;
				var UserContent = data.returnData.rows;
				var UserInfo = '';

				$.each(UserContent, function(index, item) {
					var isUserDPI = item.IsUserDPI;
					var userName = item.UserName;
					userName = userName.substring(0, userName.length - 8) + "********";
					UserInfo += '<div class="index-content-fist-list same-style">';
					UserInfo += '<div class="index-content-fist-list-img">';
					UserInfo += '<img src="' + item.Gravatar + '"></div>';
					UserInfo += '<div class="index-content-fist-list-word">';
					UserInfo += '<div class="index-content-fist-list-name">' + userName + '';
					UserInfo += '<span class="index-content-fist-list-time">' + item.CreateTime + '</span>';
					UserInfo += '</div>';
					if(isUserDPI == true) {
						UserInfo += '<div class="index-content-fist-list-vertify">';
						UserInfo += '<img src="img/index/nameLogo.png"/>';
						UserInfo += '<span>已实名认证</span>';
						UserInfo += '</div>';
					} else {
						UserInfo += '<div class="index-content-fist-list-vertify noVerify">';
						UserInfo += '<img src="img/index/nameLogoNO.png" />';
						UserInfo += '<span>未实名认证</span>';
						UserInfo += '</div>';
					}
					UserInfo += '</div>';
					UserInfo += '</div>';
				});
				$("#registUserInfo").append(UserInfo);
			}
		});
	}
}
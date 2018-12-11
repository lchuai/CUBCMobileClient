$(function() {
	var swiper = new Swiper('#index_swiper', {
		direction: 'horizontal',
		loop: true,
		autoplay: 3500,
		autoplayDisableOnInteraction: false,
		observer: true,
		observeParents: true,
		speed: 600,
		touchRatio: 0.1,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});
	setTimeout(function() {
		var swiper2 = new Swiper('#index_swiper2', {
			slidesPerView: 3,
			slidesPerGroup: 1,
		});
	}, 700);
})

var countdown = 60; //发送短信全局变量
//首页导航切换事件

$(".tab-link").click(function() {
	$(this).addClass('activetoolbar').siblings().removeClass("activetoolbar");
	var thisId = $(this).attr('id');
	var srcUrl = "";

	SetToobarSelectStyle(thisId);
});
$('.myOrder_div span').click(function() {
	var i = $(this).index(); //下标第一种写法
	$(this).addClass('myselect').siblings().removeClass('myselect');
	$('.myOrder_ul li').eq(i).show().siblings().hide();
	SetToobarSelectStyle(thisId);
});
$('#OrderBuy-index').on('click', function() {
	$(".buy_ios").css({
		"color": "#d2b772",
		"border-bottom": "1px solid #d2b772"
	});
	$(".sell_ios").css({
		"color": "#333",
		"border-bottom": "0"
	});
	mainView.router.load({
		pageName: 'Switch_Order',
		animatePages: false
	});
});
$('#OrderSell-index').on('click', function() {
	$(".sell_ios").css({
		"color": "#d2b772",
		"border-bottom": "1px solid #d2b772"
	});
	$(".buy_ios").css({
		"color": "#333",
		"border-bottom": "0"
	});
	mainView.router.load({
		pageName: 'Switch_Order_sell',
		animatePages: false
	});
});

//$('#Order').on('click', function() {
//	Orderset.orderClick();
//	//	Orderset.buy(0);
//	//	Orderset.buyRefresh();
//	//	Orderset.buyLoad();
//
//});
//设置选择底部导航样式
function SetToobarSelectStyle(selectToobarId) {
	switch(selectToobarId) {
		case "indexlink":
			$("#Switch_transaction_orders").css('display', 'none');
			$("#indexlink").addClass('activetoolbar');
			$("#indexlink").siblings('a').removeClass('activetoolbar');
			$("#indexlink img").attr('src', 'img/index/home-activ.png');
			$("#walletlink img").attr('src', 'img/index/wallet.png');
			$("#shoplink img").attr('src', 'img/index/shop.png');
			$("#mylink img").attr('src', 'img/index/my.png');
			$("#Orderlink img").attr('src', 'img/index/Order.png');

			$("#walletlink").removeClass('active');
			$("#shoplink").removeClass('active');
			$("#mylink").removeClass('active');
			$("#Orderlink").removeClass('active');
			$("#divTitle").text("首页");
			$("#OrderRight").hide();
			mainView.router.load({
				pageName: 'index',
				animatePages: false
			});
			//sysIndex.GetIndexData();
			break;
		case "Orderlink":
			$("#Switch_transaction_orders").css('display', 'block');
			$("#Orderlink").addClass('activetoolbar');
			$("#Orderlink").siblings('a').removeClass('activetoolbar');
			$("#Orderlink img").attr('src', 'img/index/Order-activ.png');
			$("#indexlink img").attr('src', 'img/index/home.png');
			$("#walletlink img").attr('src', 'img/index/wallet.png');
			$("#mylink img").attr('src', 'img/index/my.png');
			$("#shoplink img").attr('src', 'img/index/shop.png');

			$("#indexlink").removeClass('active');
			$("#walletlink").removeClass('active');
			$("#mylink").removeClass('active');
			$("#shoplink").removeClass('active');
			$("#divTitle").text("交易");
			$("#OrderRight").css('display', 'block');
			$(".buy_ios").css({
				"color": "#d2b772",
				"border-bottom": "1px solid #d2b772"
			});
			$(".sell_ios").css({
				"color": "#333",
				"border-bottom": "0"
			});
			mainView.router.load({
				pageName: 'Switch_Order',
				animatePages: false
			});
			break;
		case "walletlink":
			//如果登录了进入页面
			if(sysUtil.storageUtil.hasLogin()) {
				$("#Switch_transaction_orders").css('display', 'none');
				$("#walletlink").addClass('activetoolbar');
				$("#walletlink").siblings('a').removeClass('activetoolbar');

				$("#walletlink img").attr('src', 'img/index/wallet-activ.png');
				$("#indexlink img").attr('src', 'img/index/home.png');
				$("#shoplink img").attr('src', 'img/index/shop.png');
				$("#mylink img").attr('src', 'img/index/my.png');
				$("#Orderlink img").attr('src', 'img/index/Order.png');

				$("#indexlink").removeClass('active');
				$("#shoplink").removeClass('active');
				$("#mylink").removeClass('active');
				$("#Orderlink").removeClass('active');
				$("#divTitle").text("钱包");
				$("#OrderRight").hide();
				mainView.router.load({
					pageName: 'Modify_wallet',
					animatePages: false
				});
				//sysIndex.GetAppUCBCWallets();
			} else //否则进入登录页面
			{
				$("#Switch_transaction_orders").css('display', 'none');
				$$("#sys-toolbar").hide('slow');

				myApp.getCurrentView().router.load({
					url: "pages/my/login.html"
				});
			}

			break;
		case "shoplink":
			$("#Switch_transaction_orders").css('display', 'none');
			$("#shoplink").addClass('activetoolbar');
			$("#shoplink").siblings('a').removeClass('activetoolbar');
			$("#shoplink img").attr('src', 'img/index/shop-activ.png');
			$("#indexlink img").attr('src', 'img/index/home.png');
			$("#walletlink img").attr('src', 'img/index/wallet.png');
			$("#mylink img").attr('src', 'img/index/my.png');
			$("#Orderlink img").attr('src', 'img/index/Order.png');

			$("#indexlink").removeClass('active');
			$("#walletlink").removeClass('active');
			$("#mylink").removeClass('active');
			$("#Orderlink").removeClass('active');
			$("#divTitle").text("商城");
			$("#OrderRight").hide();
			mainView.router.load({
				pageName: 'Modify_Mall',
				animatePages: false
			});
			break;
		case "mylink":
			//如果登录了进入页面
			if(sysUtil.storageUtil.hasLogin()) {
				$("#Switch_transaction_orders").css('display', 'none');
				$("#mylink").addClass('activetoolbar');
				$("#mylink").siblings('a').removeClass('activetoolbar');
				$("#mylink img").attr('src', 'img/index/my-activ.png');
				$("#indexlink img").attr('src', 'img/index/home.png');
				$("#walletlink img").attr('src', 'img/index/wallet.png');
				$("#shoplink img").attr('src', 'img/index/shop.png');
				$("#Orderlink img").attr('src', 'img/index/Order.png');

				$("#indexlink").removeClass('active');
				$("#walletlink").removeClass('active');
				$("#shoplink").removeClass('active');
				$("#Orderlink").removeClass('active');
				$("#divTitle").text("我的");
				$("#OrderRight").hide();
				mainView.router.load({
					pageName: 'Modify_mine',
					animatePages: false
				});
				//sysIndex.GetUserInfoSetStatus();
			} else //否则进入登录页面
			{
				$("#Switch_transaction_orders").css('display', 'none');
				$$("#sys-toolbar").hide('slow');

				mainView.router.load({
					url: "pages/my/login.html"
				});
			}
			break;
	}

}

//获取首页图片，代码暂时没有用
function GetIndexPicture() {
	var DATA = new Object();
	sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetIndexPicture", METHOD_GET, DATA, function(data) {

		//sysUtil.commonUtil.alertMsg(data.returnMsg);
		if(data.boolResult) {
			var pictures = data.returnData;

			if(pictures.length > 0) {
				$("#bannerPicture").html("");
				var liHtml = '';
				for(var i = 0; i < data.returnData.length; i++) {
					liHtml += '<div class="swiper-slide">';
					liHtml += '<div class="top-banner-img">';
					liHtml += '<img src="' + data.returnData[i].ImgUrl + '" />';
					liHtml += '</div>';
					liHtml += '</div>';
				}
				$("#bannerPicture").append(liHtml);
			}

			console.log($("#bannerPicture").html());
		}
	});
}

//首页的方法
var sysIndex = {
	backMy1: function() { //返回到我的页面,我的里面的二级页面使用
		mainView.router.back(); //这里改了
		$$("#sys-toolbar").show('slow');
		myApp.showTab("#tabOrder");
		SetToobarSelectStyle("Orderlink");
	},
	backMy2: function() { //后退，2级3级返回页面使用
		mainView.router.back(); //这里改了
		$$("#sys-toolbar").hide('slow');
	},
	backMy: function() { //返回到我的页面,我的里面的二级页面使用
		mainView.router.load({
			url: "index.html"
		});
		//mainView.router.back();//这里改了
		$$("#sys-toolbar").show('slow');
		myApp.showTab("#tabmy");
		SetToobarSelectStyle("mylink");
	},
	OrderMy: function() { //返回到我的页面,我的里面的二级页面使用
		mainView.router.back(); //这里改了
		$$("#sys-toolbar").show('slow');
		myApp.showTab("#tabOrder");
		SetToobarSelectStyle("Orderlink");
		$("#divTitle").text("交易");
		$("#OrderRight").css('display', 'block');
	},
	Myreturn: function() {

		mainView.router.back({
			pageName: 'Modify_mine', //页面的data-page值
			force: true //注意此参数back方法专用
		});
		myApp.showTab('#tabmy');
		SetToobarSelectStyle("mylink");
		$$('#sys-toolbar').show('slow');
	},
	Indexreturn: function() {
		mainView.router.back({
			pageName: 'index', //页面的data-page值
			force: true //注意此参数back方法专用
		});
		myApp.showTab('#tabhome');
		SetToobarSelectStyle("indexlink");
		$$('#sys-toolbar').show('slow');
	},
	OrderReturn: function() { //订单返回按钮方法
		mainView.router.back({
			pageName: 'Switch_Order', //页面的data-page值
			force: true //注意此参数back方法专用
		});
		$(".buy_ios").css({
			"color": "#d2b772",
			"border-bottom": "1px solid #d2b772"
		});
		$(".sell_ios").css({
			"color": "#333",
			"border-bottom": "0"
		});
		myApp.showTab('#Order');
		$$('#sys-toolbar').show('slow');
		SetToobarSelectStyle('Orderlink')
		//Orderset.orderClick();
		$("#BuytodaySprice_buy").html("");
		Orderset.buy(0);
		PurchaseIndex = 0;
		myApp.attachInfiniteScroll($$('.infinite-scroll'));
		if(!document.getElementById("order_preloader")) {
			$("#buyListOrders").append('<div class="infinite-scroll-preloader"><div class="preloader" style="margin-top: 0.32rem;" id="order_preloader"></div></div>');
		}
		Orderset.buyLoad();
	},
	tabsWitch: function() { //order生命周期结束重新启动
		$('.buy_ios').click(function() {
			$(".buy_ios").css({
				"color": "#d2b772",
				"border-bottom": "1px solid #d2b772"
			});
			$(".sell_ios").css({
				"color": "#333",
				"border-bottom": "0"
			});
		});
		$('.sell_ios').click(function() {
			$(".sell_ios").css({
				"color": "#d2b772",
				"border-bottom": "1px solid #d2b772"
			});
			$(".buy_ios").css({
				"color": "#333",
				"border-bottom": "0"
			});;
		});
	},
	GetAppUCBCWallets: function() { //获取钱包里的数据
		//如果登录了进入页面
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "UserWallet", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				//填充钱包数据
				//var totalAmount = data.returnData.RootAssets.toFixed(8);

				var walletData = data.returnData;
				console.log(data.returnData);
				$("#WalletSumAssets").text(walletData.SumAssets);
				$("#WalletRootAssets").text(walletData.RootAssets); //母币钱包总资产
				$('#EnergyValue').text(walletData.EnergyValue); //能量值
				$('#SugarAssets').text(walletData.SugarAssets); //糖果派送
				$('#LinerRewordAssets').text(walletData.LinerRewordAssets); //线性奖励
				$('#IReleaseDetails').text(walletData.ReleaseAssets); //释放钱包
				$('#ShopingAsstes').text(walletData.ShopingAsstes); //消费钱包
				$('#TransAssets').text(walletData.TransAssets); //交易钱包
				$("#User2count").text(walletData.UnitPrice);
				PublicIndexUnitPrice = walletData.UnitPrice; //全局变量：单价
				sysUtil.storageUtil.saveUserData(walletData);
				
				var userType=sysUtil.storageUtil.getUserData('UserType').trim();
//				console.log('ddddddddddd'+userType);
				if(userType!=null&&parseInt(userType)==3) {
//					console.log('aaa');
					$("#BusinessPurse").css('display','block') ;
					$("#BusinessAssets").text(walletData.BusinessWalletAssets);
				}
			}
		});
	},

	WalletsRefresh: function() { //钱包下拉刷新
		var ptrContent = $$('#Modify_wallet_refresh_S');
		ptrContent.on('refresh', function(e) {
			setTimeout(function() {
				sysIndex.GetAppUCBCWallets();
				myApp.pullToRefreshDone();
			}, 1000);
		});
	},
	GetUserInfoSetStatus: function() { //获取用户信息设置状态
		//alert("获取用户信息");

		//校验原登录密码
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetUserInfo", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {
				var returnData = data.returnData;
				sysUtil.storageUtil.saveUserData(returnData);
			}

			//显示头像
			$("#img_btl_head").attr("src", sysUtil.storageUtil.getUserData("Gravatar"));

			//显示用户昵称
			$("#divIndexUserNick").text(sysUtil.storageUtil.getUserData("NickName"));

			//实名认证设置样式
			if(sysUtil.storageUtil.getUserData('IsUserDPI') == "true") {
				$("#divIndexDPIStatus").text("已认证");
				$("#divIndexDPIStatus").removeClass("personel-list-item-clear").addClass("personel-list-item-after");
			} else {
				$("#divIndexDPIStatus").text("未认证");
				$("#divIndexDPIStatus").removeClass("personel-list-item-after").addClass("personel-list-item-clear");
			}

			//绑定手机号设置样式
			if(sysUtil.storageUtil.getUserData('IsBangdingPhone') == "true") {
				$("#divIndexIsBaindPhone").text("已绑定");
				$("#divIndexIsBaindPhone").removeClass("personel-list-item-clear").addClass("personel-list-item-after");
			} else {
				$("#divIndexIsBaindPhone").text("未绑定");
				$("#divIndexIsBaindPhone").removeClass("personel-list-item-after").addClass("personel-list-item-clear");
			}

			//判断是否设置过资金密码
			if(sysUtil.storageUtil.getUserData('IsSetDealPwd') == "true") {
				$("#MysetfundPassword").html("修改资金密码");
			} else {
				$("#MysetfundPassword").html("设置资金密码");
			}

		});
	},
	linkNewsContent: function() { //行业资讯详细页	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/newsContentList.html"
		});
	},
	linkRegistUsers: function() { //行业资讯详细页	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/registUsers.html"
		});
	},
	linkPowerDetail: function() { //能量值详细页
		$$("#sys-toolbar").hide('slow');

		//		myApp.getCurrentView().router.load({
		//			url: "pages/wallet/powerWalletDetail.html"
		//		});
		mainView.router.load({
			url: "pages/wallet/powerWalletDetail.html"
		});
	},
	LinkPowerWalletDetailed: function(energyValDetailID) { //每条能量值能量值详细页
		$$("#sys-toolbar").hide('slow');

		mainView.router.load({
			url: "pages/wallet/powerWalletDetailed.html?EnergyValDetailID=" + energyValDetailID
		});
		var DATA = new Object();
		DATA.EnergyValDetailID = energyValDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelPowerWalletDetails", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var powerPublic = data.returnData;
					$("#power").empty();
					$("#powerType").empty();
					$("#powerCreateTime").empty();
					$("#powerDescribe").empty();
					$("#power").html(powerPublic.EnergyValue);
					$("#powerType").html(powerPublic.AssetsType);
					$("#powerCreateTime").html(powerPublic.CreateTime);
					$("#powerDescribe").html(powerPublic.Description);
				}
			});
		}, 400)
	},

	linkAssetsDetail: function() { //母币钱包资产明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/rootAssetsDetail.html"
		});
	},

	linkrootAssetsDetailed: function(walletDetailID) { //每条母币钱包明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/rootAssetsDetailed.html?WalletDetailID=" + walletDetailID
		});
		var DATA = new Object();
		DATA.WalletDetailID = walletDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelUserWalletDetail", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var rootPublic = data.returnData;
					$("#rootAssetCUBC").empty();
					$("#rootUnitPrice").empty();
					$("#rootAppendPrice").empty();
					$("#rootType").empty();
					$("#rootCreateTime").empty();
					$("#rootDescribe").empty();
					$("#rootAssetCUBC").html(rootPublic.DetailAssets);
					$("#rootUnitPrice").html(rootPublic.UnitPrice);
					$("#rootAppendPrice").html(rootPublic.Amount);
					$("#rootType").html(rootPublic.AssetsType);
					$("#rootCreateTime").html(rootPublic.CreateTime);
					$("#rootDescribe").html(rootPublic.Description);
				}
			});
		}, 400)
	},

	linkRease: function() { //释放钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/release.html"
		});
	},
	linkreleaseDetailed: function(releaseDetailID) { //每条释放钱包明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/releaseDetailed.html?ReleaseDetailID=" + releaseDetailID
		});
		var DATA = new Object();
		DATA.ReleaseDetailID = releaseDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelPowerReleaseAssets", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var releasePublic = data.returnData;
					$("#releaseCUBC").empty();
					$("#releaseCreateTime").empty();
					$("#releaseDescribe").empty();
					$("#releaseCUBC").html(releasePublic.DetailAssets);
					$("#releaseCreateTime").html(releasePublic.CreateTime);
					$("#releaseDescribe").html(releasePublic.Description);
				}
			});
		}, 400)
	},
	linkIntelligence: function() { //智能钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/Intelligence.html"
		});
	},
	linkIntelligenceDetailed: function(sugarDetailID) { //智能钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/IntelligenceDetailed.html?SugarDetailID=" + sugarDetailID
		});
		var DATA = new Object();
		DATA.SugarDetailID = sugarDetailID;

		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelSugarDetails", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var SugarPublic = data.returnData;
					$("#SugarCUBC").empty();
					$("#SugarCreateTime").empty();
					$("#SugarDescribe").empty();
					$("#SugarCUBC").html(SugarPublic.DetailAssets);
					$("#SugarCreateTime").html(SugarPublic.CreateTime);
					$("#SugarDescribe").html(SugarPublic.Description);
				}
			});
		}, 400)
	},
	linklink: function() { //链接钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/link.html"
		});
	},
	linkDetailed: function(linerRewordID) { //每条线性奖励钱包明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/linkDetailed.html?LinerRewordID=" + linerRewordID
		});
		var DATA = new Object();
		DATA.LinerRewordID = linerRewordID;

		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelLinerMultiple", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var LinerRewordPublic = data.returnData;
					$("#LinerRewordCUBC").empty();
					$("#LinerRewordCreateTime").empty();
					$("#LinerRewordDescribe").empty();
					$("#LinerRewordCUBC").html(LinerRewordPublic.LinerRewordValue);
					$("#LinerRewordCreateTime").html(LinerRewordPublic.CreateTime);
					$("#LinerRewordDescribe").html(LinerRewordPublic.Description);
				}
			});
		}, 400)
	},
	linkShopping: function() { //购物钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/shopping.html"
		});
	},
	LinkshoppingDetailed: function(shopingDetailID) { //每条购物钱包明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/shoppingDetailed.html?ShopingDetailID=" + shopingDetailID
		});
		var DATA = new Object();
		DATA.ShopingDetailID = shopingDetailID;

		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelShopingDetails", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var ShopingPublic = data.returnData;
					$("#ShopingCUBC").empty();
					$("#ShopingCreateTime").empty();
					$("#ShopingDescribe").empty();
					$("#ShopingCUBC").html(ShopingPublic.DetailAssets);
					$("#ShopingCreateTime").html(ShopingPublic.CreateTime);
					$("#ShopingDescribe").html(ShopingPublic.Description);
				}
			});
		}, 400)
	},
	linkTransaction: function() { //交易钱包资产明细
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/transaction.html"
		});
	},
	linktranscationDetailed: function(transDetailID) { //每条交易钱包明细	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/wallet/transcationDetailed.html?TransDetailID=" + transDetailID
		});
		var DATA = new Object();
		DATA.TransDetailID = transDetailID;

		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelTransDetails", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var TransPublic = data.returnData;
					$("#TransCUBC").empty();
					$("#TransType").empty();
					$("#TransCreateTime").empty();
					$("#TransDescribe").empty();
					$("#TransCUBC").html(TransPublic.DetailAssets);
					$("#TransType").html(TransPublic.AssetsType);
					$("#TransCreateTime").html(TransPublic.CreateTime);
					$("#TransDescribe").html(TransPublic.Description);
				}
			});
		}, 400)
	},
	linkLivingPayment: function() { //跳转水电费
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/Utility/LivingPayment.html"
		});
	},
	linkTransactionDetail: function() { //交易钱包资产转入资产明细

		var DATA = new Object();
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetRechargeStatus", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				$$("#sys-toolbar").hide('slow');

				myApp.getCurrentView().router.load({
					url: "pages/wallet/transcationDetail.html"
				});
			} else {
				layer.open({
					content: data.returnMsg,
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		});
	},

	linkUpdatePersonelInfo: function() { //修改个人信息页面	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/updatePersonelInformation.html?nickName=" + sysUtil.storageUtil.getUserData("NickName")
		});
	},
	linkUpdateNickName: function() { //修改昵称页面	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/updateNickName.html?nickName=" + sysUtil.storageUtil.getUserData("NickName")
		});
	},
	linkRealname: function() { //实名认证
		if(sysUtil.storageUtil.getUserData('IsUserDPI') == "true") {
			sysUtil.commonUtil.alertMsg("已经实名认证，不能重复认证");
			return;
		} else {
			$$("#sys-toolbar").hide('slow');

			myApp.getCurrentView().router.load({
				url: "pages/my/VerifyRealname.html"
			});
		}
	},

	linkInvite: function() { //邀请好友
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/InviteFriends.html"
		});
	},

	linkBindMobile: function() { //绑定手机号	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/binding.html"
		});
	},
	linkResetPassword: function() { //重置登录密码	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/ResetPassword.html"
		});
	},
	linkAbout: function() { //关于我们	
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/about.html"
		});
	},
	linkHelp: function() { //帮助信息
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/help.html"
		});
	},
	linkMyQuestionList: function() { //我的问题列表信息
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/myQuestionList.html"
		});
	},
	linkEditQuestion: function() { //添加问题信息
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/editQuestion.html"
		});
	},
	linkEditQuestion4s: function() { //添加问题信息
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/my/myeditQuestion.html"
		});
	},
	//交易我的广告页面js
	linkAd: function() { //交易钱包资产明细

		if(sysUtil.storageUtil.hasLogin()) {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/myAd.html"
			});
		} else {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			mainView.router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkpublishAd: function(AdID) { //发布广告页面

		if(sysUtil.storageUtil.hasLogin()) {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			var thisPage = 1; //当前页面
			if(myApp.getCurrentView().activePage.name == 'myAd') {
				thisPage = 2; //我的广告页面
			}

			myApp.getCurrentView().router.load({
				url: "pages/Order/publishAd.html?sourcePage=" + thisPage
			});
			Ad.GetMyUpdataAd(AdID);
		} else {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkospublishAd: function(AdID, PageType) { //发布广告页面

		if(sysUtil.storageUtil.hasLogin()) {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');

			myApp.getCurrentView().router.load({
				url: "pages/Order/ospublishAd.html?PageType=" + PageType + "&AdID=" + AdID
			});

		} else {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkOrder: function() { //订单页面
		if(sysUtil.storageUtil.hasLogin()) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/Order.html"
			});
		} else {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			mainView.router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkpayment: function() { //收付款设置
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/my/payment.html"
		});
	},
	linkmodify: function() { //修改资金密码
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/my/modify.html"
		});
	},
	linkAlipaySettings: function() { //设置支付宝支付

		if(sysUtil.storageUtil.getUserData("IsUserDPI") == 'true') //判断是否做了实名认证
		{
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/my/AlipaySettings.html"
			});
		} else {
			sysUtil.commonUtil.alertMsg('还没有做实名认证，请先做实名认证!');
			return;
		}

	},
	linkWeChatPayment: function() { //设置微信支付
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/my/WeChatPayment.html"
		});
	},
	linkbankCard: function() { //设置银行卡
		if(sysUtil.storageUtil.getUserData("IsUserDPI") == 'true') //判断是否做了实名认证
		{
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/my/bankCard.html"
			});
		} else {
			sysUtil.commonUtil.alertMsg('还没有做实名认证，请先做实名认证!');
			return;
		}
	},
	linkSaleDetails: function(ADId, CreateUserID, TradingStatus) { //出售详情

		if(sysUtil.storageUtil.hasLogin()) {
			if(TradingStatus) {
				if(CreateUserID == sysUtil.storageUtil.getUserData("UserID")) {
					sysUtil.commonUtil.alertMsg("自己不能对自己发布的广告发起交易！");

				} else {

					$$("#sys-toolbar").hide('slow');
					myApp.getCurrentView().router.load({
						url: "pages/Order/SaleDetails.html?ADId=" + ADId
					});

				}

			} else {
				sysUtil.commonUtil.alertMsg("交易关闭，目前不能进行交易！");

			}

		} else {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			mainView.router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkSaleDetails2: function() { //出售详情2
		$$("#sys-toolbar").hide('slow');
	},
	linkSaleDetails3: function() { //出售详情3
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/SaleDetails3.html"
		});
	},
	linkPurchaseDetails: function(ADId, CreateUserID, TradingStatus) { //购买详情
		if(sysUtil.storageUtil.hasLogin()) {
			if(TradingStatus) {
				if(CreateUserID == sysUtil.storageUtil.getUserData("UserID")) {
					sysUtil.commonUtil.alertMsg("自己不能对自己发布的广告发起交易！");

				} else {
					$$("#sys-toolbar").hide('slow');
					myApp.getCurrentView().router.load({
						url: "pages/Order/PurchaseDetails.html?ADId=" + ADId
					});
				}
			} else {
				sysUtil.commonUtil.alertMsg("交易关闭，目前不能进行交易！");
			}
		} else {
			$("#Switch_transaction_orders").css('display', 'none');
			$$("#sys-toolbar").hide('slow');
			mainView.router.load({
				url: "pages/my/login.html"
			});
		}
	},
	linkPurchaseDetails2: function() { //购买详情2
		$$("#sys-toolbar").hide('slow');
	},
	linkPurchaseDetails3: function() { //购买详情3
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/PurchaseDetails3.html"
		});
	},
	linkcomments: function() { //提交评论
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/submitComments.html"
		});
	},
	//	linkWalletDetail: function() {
	//		$$("#sys-toolbar").hide('slow');
	//		myApp.getCurrentView().router.load({
	//			url: "pages/wallet/walletDetail.html"
	//		});
	//	},
	sendemail: function() { //修改资金密码发送短信
		var obj = $("#modifyverificationCode");
		sysIndex.settime(obj);
		var myveriflyTypeID = BASE_VERIFLYTYPEBDealPwd;
		var verificationCode = sysUtil.storageUtil.getUserData('Phone');
		var DATACHECK = new Object();
		DATACHECK.veriflyTypeID = myveriflyTypeID;
		DATACHECK.smsPhone = verificationCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATACHECK, function(data) {
			if(data.boolResult) {
				//校验成功跳转到下一个页
				sysUtil.commonUtil.alertMsg('发送成功');
				return;
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});
	},
	sendemailBankcard: function() { //修改银行卡发送短信
		var obj = $("#banCard_input");
		sysIndex.settime(obj);
		var myveriflyTypeID = BASE_VERIFLYTYPEBBankcard;
		var verificationCode = sysUtil.storageUtil.getUserData('Phone');
		var DATACHECK = new Object();
		DATACHECK.veriflyTypeID = myveriflyTypeID;
		DATACHECK.smsPhone = verificationCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATACHECK, function(data) {
			if(data.boolResult) {
				//校验成功跳转到下一个页
				sysUtil.commonUtil.alertMsg('发送成功');
				return;
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});

	},
	settime: function(obj) { //发送验证码倒计时
		if(countdown == 0) {
			obj.attr('disabled', false);
			//obj.removeattr("disabled"); 
			obj.val("发送验证码");
			countdown = 60;
			return;
		} else {
			obj.attr('disabled', true);
			obj.val("发送验证码(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			sysIndex.settime(obj)
		}, 1000)
	},

	GetIndexData: function() { //获取首页加载数据

		//获取通知公告
		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNotice", METHOD_GET, '', function(data) {
			if(data.boolResult) {
				var NoticeInfo = data.returnData;

				$("#spNotice").text(NoticeInfo.NewsTitle);
				$("#spNotice").attr("onclick", "sysIndex.showNewsContent(" + NoticeInfo.NewsID + ",1);");
			}
		});

		//获取首页最新交易

		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetOrderTopTen", METHOD_GET, '', function(data) {
			//sysUtil.commonUtil.alertMsg(data.returnMsg);
			if(data.boolResult) {
				$("#Marquee").html("");
				var liHtml = '';
				if(data.returnData.length == 1) {
					$("#Marquee").css('height', '30px');
				} else if(data.returnData.length == 2) {
					$("#Marquee").css('height', '60px');
				}

				for(var i = 0; i < data.returnData.length; i++) {
					userName = data.returnData[i].UserName;
					UserName = userName.substring(0, 8);

					liHtml += '<div class="marqueeClass row">'
					liHtml += '<div class="fist-width col-7">' + UserName + '</div>';
					if(data.returnData[i].TransactionType == "购买了") {
						liHtml += '<div class="second-width col-70">' + data.returnData[i].TransactionType + data.returnData[i].TransAssets + "  CUBC" + '</div>';
					} else {
						liHtml += '<div class="second-width-Exp col-70" style="text-align:left;">' + data.returnData[i].TransactionType + data.returnData[i].TransAssets + "  CUBC" + '</div>';
					}
					liHtml += '<div class="third-width col-23">' + data.returnData[i].CreateTime + '</div>';
					liHtml += '</div>';
				}
				$("#Marquee").append(liHtml);
			} else {
				$("#marqueeAll").css('display', 'none');
			}
		});
		//获取首页最新商家
		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetBusinessTopThree", METHOD_GET, "", function(data) {
			if(data.boolResult) {
				console.log(data);
				var NewsList = data.returnData;
				if(NewsList.length > 0) {
					$('#Index_NewBusiness').css('display','block');
					$("#index_swiper_2_set").html("");
					var liHtml = '';
					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div class="swiper-slide index_slide_2" onclick="indexSub.JumpHomeCarouselDetails(' + NewsList[i].BusinessWalletID + ')">';
						liHtml += '<dl class="index_slide_2_dl">';
						liHtml += '<dt><img src="' + BASIC_HOST_URL + '' + NewsList[i].ShopImg + '" /></dt>';
						liHtml += '<dd>' + NewsList[i].NameOfShop + '</dd>';
						liHtml += '</dl>';
						liHtml += '</div>';
					}
					$("#index_swiper_2_set").append(liHtml);
				
				}
				
			} 
		});
		//获取首页行业资讯
		var DATA = new Object();
		DATA.PageIndex = 0;
		DATA.PageSize = 3;
		DATA.languageID = 1;

		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNewsInformation", METHOD_GET, DATA, function(data) {
			//sysUtil.commonUtil.alertMsg(data.returnMsg);
			if(data.boolResult) {
				var NewsList = data.returnData.rows;
				if(NewsList.length > 0) {
					$("#Information").html("");
					var liHtml = '';

					for(var i = 0; i < NewsList.length; i++) {
						//console.log(data.returnData[i].ImageUrl);
						liHtml += '<div class="index-content-news-fist-list same-style" onclick="sysIndex.showNewsContent(' + NewsList[i].NewsID + ',1)">';
						liHtml += '<div class="index-news-left">';
						liHtml += '<div class="index-news-left-top">';
						//liHtml += '<a href="javascript:void(0);" onclick="sysIndex.showNewsContent("'+JSON.stringify(data.returnData[i])+'")"><p>'+data.returnData[i].NewsTitle+'</p></a>';
						liHtml += '<a href="javascript:void(0);"><p>' + NewsList[i].NewsTitle + '</p></a>';
						liHtml += '</div>';
						liHtml += '<div class="index-news-left-bottom">';
						liHtml += NewsList[i].CreateDate;
						liHtml += '<span>';
						liHtml += '<span>' + NewsList[i].Frequency + '</span>浏览';
						liHtml += '</span>';
						liHtml += '</div>';
						liHtml += '</div>';
						liHtml += '<div class="index-news-right">';
						liHtml += '<img src="' + NewsList[i].ImageUrl + '"/>';
						liHtml += '</div>';
						liHtml += '</div>';
					}
					$("#Information").append(liHtml);
				}
			}
		});

		//获取用户列表数据
		var DATA = new Object();
		DATA.PageIndex = 0;
		DATA.PageSize = 3;
		sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNewUsersList", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				var UserList = data.returnData.rows;
				$("#divUserInfoLis").empty();

				var UserInfo = '';

				$.each(UserList, function(index, item) {
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
				$("#divUserInfoLis").append(UserInfo);
			}
		});
	},
	showNewsContent: function(newsID, parentPage) { //跳转到公告内容页

		//alert(newsID);
		//		alert(parentPage);
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/newsContent.html?NewsID=" + newsID
		});

		//获取资讯详细信息

		var DATA = new Object();
		DATA.NewsID = newsID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiIndex", "GetNewsInformationData", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var newsInfo = data.returnData;
					$("#ParentPage").val(parentPage);
					$("#divNewsTitle").html(newsInfo.NewsTitle);
					$("#divNewsContent").html(newsInfo.NewsContent);
				}
			});
		}, 400)
	}
}
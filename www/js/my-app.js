// Initialize app
var myApp = new Framework7({
	modalButtonOk: "确定",
	modalButtonCancel: "取消",
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true,
	//	stackPages: true,
	domCache: true,
});

// Handle Cordova Device Ready Event
//$$(document).on('deviceready', function() {
//  console.log("初始化完成");
//});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
$$("#Switch_transaction_orders").hide();
myApp.onPageBeforeInit('index', function(page) { //进入页面时，执行轮播
	$(function() {
		var swiper = new Swiper('.swiper-container', {
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
	});
});
myApp.onPageInit('login', function(page) {
	//	$$(document).trigger('pageInit');
	// Do something here for "about" page

})
// Option 2. Using one 'pageInit' event handler for all pages:

$$(document).on('pageInit', function(e) {
	var page = e.detail.page;
	if(page.name == 'index') { //如果首页触发
		$$("#Switch_transaction_orders").hide();
		//sysIndex.tabsWitch();
		sysIndex.GetIndexData();
	}
	if(page.name == 'HomeCarouselDetails') { //首页轮播详情页
		var BusinessWalletID = page.query.BusinessWalletID;
		indexSub.HomeCarouselDetails(BusinessWalletID);
		$("#HomeCarouselDetails-index").on("click", function() {
			sysIndex.Indexreturn();
		});
	}
	if(page.name == 'Switch_Order') { //新购买页面
		$$("#Switch_transaction_orders").show();
		Orderset.buy(0);
		Orderset.buyRefresh();
		Orderset.buyLoad();
		Ad.GetSetUnitPrice();
	}
	if(page.name == 'Switch_Order_sell') { //新出售页面
		$$("#Switch_transaction_orders").show();
		Orderset.Sell();
		Orderset.SellRefresh();
	}
	if(page.name == 'Modify_wallet') { //新钱包页面
		$$("#Switch_transaction_orders").hide();
		sysIndex.GetAppUCBCWallets();
		sysIndex.WalletsRefresh();
	}
	if(page.name == 'Modify_mine') { //新我的页面
		$$("#Switch_transaction_orders").hide();
		sysIndex.GetUserInfoSetStatus();
	}
	if(page.name == 'about') { //关于我们页面
		sysUtil.downloadUtil.checkUpdate(1);
		$("#aboutBack").on("click", function() {
			sysIndex.Myreturn();
		});
	}
	if(page.name == 'updatePersonelInfo') { //修改昵称页面
		$("#updatePersonelInfoBack").on("click", function() {
			sysIndex.GetUserInfoSetStatus();
			sysIndex.Myreturn();
		});
		//设置头像
		$("#imgGravatarImg").attr("src", sysUtil.storageUtil.getUserData("Gravatar"));

		//初始化界面上的用户昵称
		if(page.query.nickName != '') {
			$("#divPersonelUserNick").text(page.query.nickName);
		}
	}
	if(page.name == 'login') { //登录页面
		mainView.router.refreshPage()
		$("#loginBack").on("click", function() { //返回按钮
			mainView.router.back({
				pageName: 'index',
				force: true
			});
			$$("#sys-toolbar").show('slow');
			myApp.showTab("#tabhome");
			SetToobarSelectStyle("indexlink");
		});

		$("#login-a-register").on("click", function() { //注册按钮事件
			myApp.getCurrentView().router.load({
				url: "pages/my/register.html"
			});
		});

		$("#forget-password").on("click", function() { //忘记密码按钮
			mainView.router.load({
				url: "pages/my/ForgetPassword.html"
			});
		});

		//登录按钮事件
		$("#login-btn-sign").on("click", function() {
			InviteFriend.login();
		});
	}
	
	if(page.name == 'LoginVerification') { //登录页面
		$("#LoginVerificationBack").on("click", function() { //返回按钮
			mainView.router.back({
				pageName: 'index',
				force: true
			});
			$$("#sys-toolbar").show('slow');
			myApp.showTab("#tabhome");
			SetToobarSelectStyle("indexlink");
		});

		$("#btnloginVerificationCode").on("click", function() { //获取验证码按钮事件
			InviteFriend.LoginVerificationCode();
		});

		//登录按钮事件
		$("#loginVerification-btn-sign").on("click", function() {
			InviteFriend.VerificationSubmitLogin();
		});
	}
	if(page.name == 'register') { //注册功能
		$("#register-a-login").on("click", function() { //跳到登录

			mainView.router.back({
				pageName: 'login',
				force: true
			});
			mainView.router.refreshPreviousPage();
		});

		$("#btnRegistGetSmsCode").on("click", function() { //获取验证码按钮事件
			InviteFriend.registerCode();
		});

		$("#btnRegistSubmit").on("click", function() { //注册按钮事件
			InviteFriend.registerSubmit();
		});
		$("#registerBack").on('click', function() { //注册返回按钮
			mainView.router.back({
				pageName: 'login',
				force: true
			});
		});
	}

	if(page.name == 'VerifyRealname') //实名认证
	{
		$("#verifyRealNameBack").on("click", function() {
			sysIndex.Myreturn();
		});

		$("#Verify_submit").on("click", function() {
			InviteFriend.VerifyRealname();
		});
	}

	if(page.name == 'binding') //绑定手机号
	{
		$("#btnBindingBack").on("click", function() { //返回按钮事件
			sysIndex.Myreturn();
		});

		$("#btnBindNext").on("click", function() {
			InviteFriend.binding();
		});
	}

	if(page.name == 'bindingNext') //绑定手机号下一步确定功能
	{
		$("#btnGetSmsCode").on("click", function() { //获取验证码按钮事件
			InviteFriend.bindingiphone();
		});

		$("#btnBindNextSubmit").on("click", function() { //绑定手机号确定按钮事件
			InviteFriend.btnBindNextSubmit();
		});
	}

	if(page.name == 'ResetPassword') //重置登录密码页面
	{
		$("#btnResetPasswordBack").on("click", function() { //返回按钮事件
			sysIndex.Myreturn();
		});

		$("#btnResetPwdNext").on("click", function() {
			InviteFriend.btnResetPwdNext();
		});
	}

	if(page.name == 'ResetPasswordNext') //重置登录密码设置页面
	{
		$("#btnConfirmPwd").on("click", function() {
			InviteFriend.btnConfirmPwd();
		});
	}

	if(page.name == 'ForgetPassword') //忘记密码页面
	{

		$("#btnForgetSmsCode").on("click", function() { //忘记密码验证码按钮事件
			InviteFriend.btnForgetSmsCode();
		});

		$("#btnForgetPwdNext").on("click", function() { //下一步按钮
			InviteFriend.btnForgetPwdNext();
		});
		$("#ForgetPasswordBacks").on("click", function() {
			mainView.router.back({
				pageName: 'login',
				force: true
			});
			$$("#sys-toolbar").hide('slow');
		})
	}

	if(page.name == 'ForgetPasswordNext') //忘记登录密码设置页面
	{
		var userForgetPhone = page.query.userPhone; //获取传过来的参数

		$("#btnForgetPwdNextSubmit").on("click", function() {
			InviteFriend.ForgetPasswordNext(userForgetPhone);
		});
		$("#ForgetPasswordNextBacks").on("click", function() {
			mainView.router.back({
				pageName: 'ForgetPassword',
				force: true
			});
			$$("#sys-toolbar").hide('slow');
		})
	}

	if(page.name == "InviteFriends") { //邀请好友
		InviteFriend.GetUserInvite(1);
		$("#hid").hide()
		$("#copy1").show();
		$("#copy2").hide();
		$("#nvite1").show();
		$("#nvite2").hide();

		$("#Invite01").click(function() { //区块一选中事件
			InviteFriend.GetUserInvite(1);
			$("#nvite1").show();
			$("#nvite2").hide();
			$("#copy1").show();
			$("#copy2").hide();
		});

		$("#Invite02").click(function() { //区块二选中事件
			InviteFriend.GetUserInvite(2);
			$("#nvite2").show();
			$("#nvite1").hide();
			$("#copy2").show();
			$("#copy1").hide();
		});

		$("#ccopy1").click(function() { //复制邀请码1
			InviteFriend.Getnvitecopy($(this), 1);
		})

		$("#ccopy2").click(function() { //复制邀请码2
			InviteFriend.Getnvitecopy($(this), 2);
		})

		$("#btnInviteFriendBack").on("click", function() { //返回按钮事件
			sysIndex.Myreturn();
		});
	}

	if(page.name == "newsContent") { //新闻内容页

		$("#newsContentBack").on("click", function() { //返回按钮事件
			if($("#ParentPage").val() == 1) {
				sysIndex.Indexreturn();
				//				sysIndex.GetIndexData(); //初始化首页数据
			} else {
				mainView.router.back();

			}
		});
	}
	if(page.name == "newsContentList") { //行业资讯详细列表

		$("#newsContentListBack").on("click", function() { //返回按钮事件
			sysIndex.Indexreturn();
		});
		indexSub.GetNewsContentList(0);
		indexSub.NewsContentPullDown();
		indexSub.NewsSubPullRefresh();
	}
	if(page.name == "registUsers") { //用户详细列表

		$("#registUsersBack").on("click", function() { //返回按钮事件
			mainView.router.load({
				url: "index.html"
			});
			$$("#sys-toolbar").show('slow');
			myApp.showTab("#tabhome");

			sysIndex.GetIndexData(); //初始化首页数据
		});
		indexSub.GetRegistUsersInfo(0);
		indexSub.UserPullRefresh();
		indexSub.UserContentPullDown();
	}
	if(page.name == "powerWalletDetail") { //钱包能量值明细页

		$("#powerWalletBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetPowerWalletDetails(0);
		sysWallet.powerWalletPullRefresh();
	}
	if(page.name == "powerWalletDetailed") { //每条钱包能量值明细页

		$("#powerWalletDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'powerWalletDetail', //页面的data-page值
			});
		});
	}
	if(page.name == "rootAssetsDetail") { //母币钱包明细页

		$("#rootAssetsBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});

		sysWallet.GetUserWalletsList(0);
		sysWallet.rootAssetsPullRefresh();
	}

	if(page.name == "rootAssetsDetailed") { //每条钱包母币明细页

		$("#rootAssetsDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'rootAssetsDetail', //页面的data-page值
			});
		});
	}
	if(page.name == "release") { //释放钱包资产明细

		$("#releaseBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetPowerReleaseAssets(0);
		sysWallet.releaseAssetsPullRefresh();
	}
	if(page.name == "releaseDetailed") { //每条钱包释放明细页

		$("#releaseDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'release', //页面的data-page值
			});
		});
	}
	if(page.name == "Intelligence") { //糖果派送资产明细

		$("#IntelligenceBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetSugarAssets(0);
		sysWallet.sugarAssetsPullRefresh();
	}
	if(page.name == "IntelligenceDetailed") { //每条钱包糖果派送明细页

		$("#IntelligenceDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'Intelligence', //页面的data-page值
			});
		});
	}
	if(page.name == "link") { //线性奖励资产明细

		$("#linkBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetLinerMultiple(0);
		sysWallet.linerMultiplePullRefresh();
	}
	if(page.name == "linkDetailed") { //每条钱包线性奖励明细页

		$("#linkDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'link', //页面的data-page值
			});
		});
	}
	if(page.name == "shopping") { //购物钱包资产明细

		$("#shoppingBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetShopingDetails(0);
		sysWallet.shopingDetailsPullRefresh();
	}
	if(page.name == "shoppingDetailed") { //每条钱包购物钱包明细页

		$("#shoppingDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'shopping', //页面的data-page值
			});
		});
	}
	if(page.name == "transaction") { //交易钱包资产明细
		$("#myTranscationAssets").html(sysUtil.storageUtil.getUserData("TransAssets"));
		$("#transactionBack").on("click", function() { //返回按钮事件
			sysWallet.backWallet();
		});
		sysWallet.GetTransDetails(0);
		sysWallet.transDetailsPullRefresh();
	}
	if(page.name == "transcationDetailed") { //每条钱包交易钱包明细页

		$("#transcationDetailedBack").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'transcationDetail', //页面的data-page值
			});
		});
	}
	if(page.name == "transcationDetail") { //交易钱包充值

		$("#transactionDetailBack").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$("#TotalAssets").on("click", function() {
			sysWallet.GetTotalAssets()
		})
		$("#TranscationDetail_submit").on("click", function() {
			sysWallet.AddTransDetails()
		})
	}

	if(page.name == "updateNickName") { //修改用户昵称页面
		$("#updateNickName_backs").on('click', function() {
			mainView.router.back({
				pageName: 'updatePersonelInfo', //页面的data-page值
			});
		});
		if(page.query.nickName != '') {
			$("#txtNick").val(page.query.nickName);
		}

		$("#btnSaveUserNick").on("click", function() {
			sysMy.SaveUserNickName();
		});
	}
	if(page.name == "help") { //帮助信息页面
		help.GetHelpList();
		//		$("#helpBack").on("click", function() { //返回按钮事件
		//			sysIndex.newbackMy();
		//		});

		$("#helpBack").on("click", function() { //返回按钮事件
			sysIndex.Myreturn();
		});

		$("#helpList").click(function() {
			help.GetHelpList();
		});

	}
	if(page.name == 'editQuestion') { //帮助编辑问题页面
		help.SubmitQuestion();
		$("#editQuestion_d_back").on('click', function() {
			mainView.router.refreshPreviousPage();
			setTimeout(function() {
				mainView.router.back({
					pageName: 'myQuestionList', //页面的data-page值
					force: true //注意此参数back方法专用
				});
			}, 400);
		});
	}
	if(page.name == 'myeditQuestion') { //帮助编辑问题页面
		help.SubmitQuestionmodify();
		$("#editQuestion_cd_back").on('click', function() {
			mainView.router.refreshPreviousPage()
			setTimeout(function() {
				mainView.router.back({
					pageName: 'help', //页面的data-page值
					force: true //注意此参数back方法专用
				});
			}, 400)
		})
	}
	if(page.name == 'myQuestionList') { //我的问题列表页	
		help.QuestionList(0); //获取数据
		help.pullRefresh(); //刷新
		help.PrtContents(); //加载
		$("#myQuestionListsBack").on('click', function() {
			mainView.router.refreshPreviousPage()
			setTimeout(function() {
				mainView.router.back({
					//				preloadPreviousPage:true,
					pageName: 'help', //页面的data-page值
					force: true //注意此参数back方法专用
				});
			}, 1000)
		})
	}
	if(page.name == 'Order') { //订单页面	
		$$("#Switch_transaction_orders").hide();
		Orderset.TransactionNotPurchased();
		$('.myOrder_div span').click(function() {
			var i = $(this).index(); //下标第一种写法
			$(this).addClass('myselect').siblings().removeClass('myselect');
			$('.myOrder_ul li').eq(i).show().siblings().hide();
		});
		$("#OrderReturn-S").on("click", function() { //返回按钮事件
			sysIndex.OrderReturn();

		});
	}
	if(page.name == 'payment') { //收付款设置	
		$("#paymentSetting-s").on("click", function() { //返回按钮事件
			sysIndex.GetUserInfoSetStatus();
			sysIndex.Myreturn();
		});
		InviteFriend.payment();
	}
	if(page.name == 'modify') { //修改资金密码	
		InviteFriend.mymodify();
		$("#modifyReturn").on("click", function() { //返回按钮事件
			sysIndex.GetUserInfoSetStatus();
			sysIndex.Myreturn();
		});

		$("#funds").on("click", function() {
			InviteFriend.modify();
		});
	}
	if(page.name == 'AlipaySettings') { //设置支付宝
		//初始化设置实名认证的姓名
		$("#NickName").val(sysUtil.storageUtil.getUserData("TrueName"));

		$("#AlipayReturn").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		//判断是否绑定支付宝
		if(sysUtil.storageUtil.getUserData('IsSetAlipay') == "true") {
			Alipay.GetAlipayData();
		}
	}
	if(page.name == 'WeChatPayment') { //设置微信	
		$("#WeChatReturn").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		//判断是否绑定微信
		if(sysUtil.storageUtil.getUserData('IsSetWeChart') == "true") {
			Alipay.GetWeChatData();
		}
	}
	if(page.name == 'bankCard') { //设置银行卡

		//初始化设置实名认证的姓名
		$("#banCard_names").val(sysUtil.storageUtil.getUserData("TrueName"));

		$("#bankCardReturn").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		InviteFriend.bankCard();
		$("#banCard_confirm").on("click", function() { //确定按钮事件
			InviteFriend.bankCardClick();
		});
	}
	if(page.name == 'SaleDetails') { //出售详情	
		$$("#Switch_transaction_orders").hide();
		var adId = page.query.ADId;
		$("#SaleDetails-1s").on("click", function() { //返回按钮事件
			sysIndex.OrderReturn();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.SaleDetails(adId);
		Orderset.SaleDetailsAvatarall();
		$("#SaleDetailsAvatar-u-btn-t").on("click", function() { //提交按钮事件
			if(BuyOrSellClicked) {
				Orderset.SaleDetailsAvatarsubmit();
				
			} else {
				sysUtil.commonUtil.alertMsg('请勿频繁操作！');
				setTimeout(function() {
					BuyOrSellClicked = true;
				}, 3000);
			}

		});
	}
	if(page.name == 'SaleDetails2') { //出售详情2	
		var OrderID = page.query.OrderID;
		$("#SaleDetails-2s").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.ForestSaleDetails2(OrderID);
	}
	if(page.name == 'SaleDetails3') { //出售详情3	
		var OrderID = page.query.OrderID;
		$("#SaleDetails-3s").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.SellingCoins(OrderID);
	}
	if(page.name == 'PurchaseDetails') { //购买详情
		$$("#Switch_transaction_orders").hide();
		var adId = page.query.ADId;
		$("#purchaseDetailsBack").on("click", function() { //返回按钮事件
			sysIndex.OrderReturn();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.PurchaseDetails(adId);
		Orderset.PurchaseAvatarall();
		$("#PurchaseAvatar-u-btn-t").on("click", function() { //提交按钮事件
			//sysIndex.OrderMy();
			if(BuyOrSellClicked) {
				Orderset.PurchaseAvatarsubmit();
				
			} else {
				sysUtil.commonUtil.alertMsg('您的操作过于频繁，请稍后再次点击！');
				setTimeout(function() {
					BuyOrSellClicked = true;
				}, 3000);
			}

		});
	}
	if(page.name == 'PurchaseDetails2') { //购买详情2
		var OrderID = page.query.OrderID;
		$("#purchaseDetailsBack-2s").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.OrderPurchaseDetails2(OrderID);
	}
	if(page.name == 'PurchaseDetails3') { //购买详情3
		var OrderID = page.query.OrderID;
		$("#purchaseDetailsBack-3s").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.TransactionCompletionPage(OrderID);
	}
	if(page.name == 'PurchaseDetails4') { //购买详情3
		var OrderID = page.query.OrderID;
		$("#purchaseDetailsBack-5s-plus").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.PurchaseSaleDetailsbaz(OrderID);
	}
	if(page.name == 'submitComments') { //待评论
		var OrderID = page.query.OrderID;
		$("#PendingCommentBack-3s_S").on("click", function() { //返回按钮事件
			sysIndex.backMy2();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.myPendingComments(OrderID);
	}
	if(page.name == 'arbitration') { //仲裁中
		var OrderID = page.query.OrderID;
		$("#arbitrationdx-3s").on("click", function() { //返回按钮事件
			mainView.router.back({
				pageName: 'arbitration2', //页面的data-page值
			});
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.arbitrationRender(OrderID);
	}
	if(page.name == 'arbitration2') { //仲裁中2
		var OrderID = page.query.OrderID;
		$("#arbitrationdx-4s").on("click", function() { //返回按钮事件
			mainView.router.back();
		});
		$$("#sys-toolbar").hide('slow');
		Orderset.arbitrationRender2(OrderID);
	}
	if(page.name == 'myAd') { //我的广告列表页
		//		$("#AdTopNavTogger").show();
		$("#myAdBack").on('click', function() { //返回按钮事件
			sysIndex.OrderReturn();
		});
		$$("#sys-toolbar").hide('slow');
		//		Ad.AdIsLoding();
		//		Ad.MyAdPullDown();       
		Ad.tabs();
		//Ad.GetSetUnitPrice();
	}
	if(page.name == 'publishAd') { //发布广告详情页
		//alert(page.query);
		//var sourcePage=page.query.sourcePage;//页面来源

		$("#AdTopNavTogger").show();
		$("#publishAdBack").on('click', function() { //返回按钮事件

			$("#Switch_transaction_orders").css('display', 'block');
			$$("#sys-toolbar").show('slow');
			mainView.router.back({
				pageName: 'Switch_Order', //页面的data-page值
			});

		});
		//Ad.GetUnitPrice(1);
		Ad.publishAdBuy(1);
		Ad.publishBuyAd(1);

	}
	if(page.name == 'ospublishAd') { //发布广告详情页
		//alert(page.query);
		var PageType = page.query.PageType; //页面来源
		var AdID = page.query.AdID; //页面来源
		$("#AdTopNavTogger").hide();
		$("#publishAdBack_os").on('click', function() { //返回按钮事件			
			$("#AdTopNavTogger").hide();
			mainView.router.back({
				pageName: 'myAd', //页面的data-page值
			});

		});

		if(PageType == 1) //编辑页面
		{
			Ad.GetMyUpdataAd(AdID);
		}
		Ad.publishBuyAd(2);
		Ad.publishAdBuy(2);

	}
	if(page.name == 'LivingPayment') { //生活缴费
		LivingPayment.LivingPaymentIndex();
		LivingPayment.GetAreaVersion();
		var MySelectAreaName = "";
		var MySelectAreaID = 0;
		var MySelectArea = window.localStorage.getItem("MySelectArea");
		if(MySelectArea == 'undefined' || MySelectArea == null || MySelectArea.length < 1) {
			MySelectAreaName = "昆明市";
			MySelectAreaID = 2671;
		} else {
			MySelectAreaName = MySelectArea.split('||')[0].toString();
			MySelectAreaID = MySelectArea.split('||')[1];
		}
		$("#MyAreaID").val(MySelectAreaID);
		$("#JumpCitySelectionxs").html(MySelectAreaName);
		$("#LivingPayment-index").on('click', function() { //返回按钮事件							
			sysWallet.backWallet();
		});

		$("#JumpCitySelectionxs").on('click', function() {
			myApp.getCurrentView().router.load({
				url: "pages/Utility/CityChoice.html"
			});
		});
	}
	if(page.name == 'NewUserElectricity') { //新增电费缴费账户
		var MySelectAreaName = "";
		var MySelectAreaID = 0;
		var MySelectArea = window.localStorage.getItem("MySelectArea");
		if(MySelectArea == 'undefined' || MySelectArea == null || MySelectArea.length < 1) {
			MySelectAreaName = "昆明市";
			MySelectAreaID = 2671;
		} else {
			MySelectAreaName = MySelectArea.split('||')[0].toString();
			MySelectAreaID = MySelectArea.split('||')[1];
		}
		$("#NewUserElectricity_MyAreaID").val(MySelectAreaID);
		$("#NewUserElectricity_MySelAreaName").html(MySelectAreaName);
		$("#LivingPayment-Electricity").on('click', function() { //返回按钮事件							
			LivingPayment.BackLivingPayment();
		});
	}
	if(page.name == 'ElectricityFee') { //电费缴费
		var CostOfLifeID = page.query.CostOfLifeID;
		$("#LivingPayment-ElectricityFee").on('click', function() { //返回按钮事件		
			myApp.closeModal('.picker-modal');
			LivingPayment.BackLivingPayment();
		});
		//		$("#ElectricityFeeRight").on('click', function() { //跳转到电费缴费列表					
		//			myApp.getCurrentView().router.load({
		//				url: "pages/Utility/RechargeElectricity.html"
		//			});
		//		});
		LivingPayment.ElectricityPaymentContens(CostOfLifeID);
		$("#ElectricityFee_Account_inputs_java").on("input propertychange", function(event) { //电费缴费自动计算
			var t = $("#ElectricityFee_Account_inputs_java").val();
			var plus = t / PublicIndexUnitPrice;
			$("#ElectricityFee_Account_TransAssets_avas").html(plus.toFixed(8));
			if(t.length == 0) {
				$("#ElectricityFee_Account_TransAssets_avas").html(0);
			}
		});
	}
	if(page.name == 'RechargeElectricity') { //电费缴费列表
		var PaymentAccounts = page.query.PaymentAccounts;
		LivingPayment.ElectricityMylist(PaymentAccounts);
		$("#LivingPayment-RechargeElectricity").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'ElectricityFee', //页面的data-page值
			});
		});
	}
	if(page.name == 'ElectricityDetails') { //电费缴费详情
		var CostOfLifeDetailID = page.query.CostOfLifeDetailID;
		$("#LivingPayment-ElectricityDetails").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'RechargeElectricity', //页面的data-page值
			});
		});
		LivingPayment.ElectricMycontent(CostOfLifeDetailID);
	}
	if(page.name == 'WaterNewAccount') { //新增水费缴费账户
		var MySelectAreaName = "";
		var MySelectAreaID = 0;
		var MySelectArea = window.localStorage.getItem("MySelectArea");
		if(MySelectArea == 'undefined' || MySelectArea == null || MySelectArea.length < 1) {
			MySelectAreaName = "昆明市";
			MySelectAreaID = 2671;
		} else {
			MySelectAreaName = MySelectArea.split('||')[0].toString();
			MySelectAreaID = MySelectArea.split('||')[1];
		}
		$("#WaterNewAccount_MyAreaID").val(MySelectAreaID);
		$("#WaterNewAccount_MyAreaName").html(MySelectAreaName);

		$("#LivingPayment-WaterNewAccount").on('click', function() { //返回按钮事件							
			LivingPayment.BackLivingPayment();
		});
	}
	if(page.name == 'WaterFeePayment') { //水费缴费
		var CostOfLifeID = page.query.CostOfLifeID;
		$("#LivingPayment-WaterFeePayment").on('click', function() { //返回按钮事件		
			myApp.closeModal('.picker-modal');
			LivingPayment.BackLivingPayment();
		});
		$("#WaterFeePaymentRight").on('click', function() { //跳转到水费缴费列表					
			myApp.getCurrentView().router.load({
				url: "pages/Utility/WaterRechargeBill.html"
			});
		});
		LivingPayment.WaterPaymentDetailspvp(CostOfLifeID);
		$("#WaterFeePayment_Account_inputs_g").on("input propertychange", function(event) { //水费缴费自动计算
			var t = $("#WaterFeePayment_Account_inputs_g").val();
			var plus = t / PublicIndexUnitPrice;
			$("#WaterFeePayment_Account_TransAssets_p").html(plus.toFixed(8));
			if(t.length == 0) {
				$("#WaterFeePayment_Account_TransAssets_p").html(0);
			}
		});

	}
	if(page.name == 'WaterRechargeBill') { //水费账单列表 
		var PaymentAccounts = page.query.PaymentAccounts;

		LivingPayment.WaterFeeMylist(PaymentAccounts);
		$("#LivingPayment-WaterRechargeBill").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'WaterFeePayment', //页面的data-page值
			});
		});
	}
	if(page.name == 'myWaterBill') { //水费账单详情 
		var CostOfLifeDetailID = page.query.CostOfLifeDetailID;
		LivingPayment.WaterRendersp(CostOfLifeDetailID);
		$("#LivingPayment-myWaterBill").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'WaterRechargeBill', //页面的data-page值
			});
		});
	}
	if(page.name == 'TelephonePayment') { //电话费充值 

		LivingPayment.TelephoneSelectCarrier(); //选择运营商
		LivingPayment.SelectRechargeAmountClick();
		$("#LivingPayment-TelephonePayment").on('click', function() { //返回按钮事件		
			myApp.closeModal('.picker-modal');
			LivingPayment.BackLivingPayment();
		});
		$("#TelephonePaymentRight").on('click', function() { //跳转到电话费缴费列表					
			myApp.getCurrentView().router.load({
				url: "pages/Utility/CallFeeDetails.html"
			});
		});
		$("#TelephonePayment_inputs_texts_son div").on("click", function(event) { //电话费缴费自动计算
			var t = $("#TelephonePayment_inputs_son").val();
			var plus = t / PublicIndexUnitPrice;
			$("#TelephonePayment_AmountOfCost_e").html(plus.toFixed(8));
			if(t.length == 0) {
				$("#TelephonePayment_AmountOfCost_e").html(0);
			}
		});
	}
	if(page.name == 'CallFeeDetails') { //电话费充值账单列表 
		LivingPayment.TelephoneBillList();
		$("#LivingPayment-CallFeeDetails").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'TelephonePayment', //页面的data-page值
			});
		});

	}
	if(page.name == 'CallDetailsplus') { //电话费充值账单详情 
		var CostOfLifeDetailID = page.query.CostOfLifeDetailID;
		$("#LivingPayment-CallDetailsplus").on('click', function() { //返回按钮事件							
			mainView.router.back({
				pageName: 'CallFeeDetails', //页面的data-page值
			});
		});
		LivingPayment.TelephoneFeeDetailsRender(CostOfLifeDetailID);
	}
	if(page.name == 'CityChoice') { //选择城市 
		$(".letter").show();

		$("#LivingPayment-CityChoice").on('click', function() { //返回按钮事件	
			$(".letter").hide();
			$("html").height(100 + '%');
			LivingPayment.BackLivingPayment();
		});
		LivingPayment.CityChoicejsp();
		$(".preloader-indicator-overlay").hide();
		$(".preloader-indicator-modal").hide();
		$("#cityinputs_t_inputs_v").on('focus', function() {
			$("html").height(100 + '%');
			$(".CityChoice_search").show();
			$(".city").hide();
			$(".letter").hide();
			$(".cityinputs_t_span_viden").css('display', 'inline-block');
			$(this).css('width', '85%');
		});
		$("#cityinputs_t_inputs_v").on("input propertychange", function(event) { //出售详情输入金额

		});
		$(".cityinputs_t_span_viden").on('click', function() {
			$(".CityChoice_search").hide();
			$(".city").show();
			$(".letter").show();
			$(".cityinputs_t_span_viden").css('display', 'none');
			$("#cityinputs_t_inputs_v").css('width', '100%');
		});
		//var cityList = [
		//{ key: 'A', data: ['AL|阿尔巴尼亚', 'DZ|阿尔及利亚', 'AR|阿根廷', 'AF|阿富汗', 'IE|爱尔兰', 'EG|埃及', 'ET|埃塞俄比亚', 'EE|爱沙尼亚', 'AE|阿联酋', 'AW|阿鲁巴', 'OM|阿曼', 'AD|安道尔', 'AI|安圭拉', 'AO|安哥拉', 'AG|安提瓜和巴布达', 'AU|澳大利亚', 'AT|奥地利', 'AX|奥兰群岛', 'MO|澳门', 'AZ|阿塞拜疆'] },
		//{ key: 'B', data: ['BB|巴巴多斯', 'PG|巴布亚新几内亚', 'BS|巴哈马', 'BY|白俄罗斯', 'BM|百慕大', 'PK|巴基斯坦', 'PY|巴拉圭', 'PS|巴勒斯坦', 'BH|巴林', 'PA|巴拿马', 'BG|保加利亚', 'BR|巴西', 'MP|北马里亚纳群岛', 'BJ|贝宁', 'BE|比利时', 'PE|秘鲁', 'IS|冰岛', 'PR|波多黎各', 'BA|波黑', 'PL|波兰', 'BO|玻利维亚', 'BW|博茨瓦纳', 'BZ|伯利兹', 'BT|不丹', 'BF|布基纳法索', 'BI|布隆迪', 'BV|布韦岛']},
		//{ key: 'C', data: ['GQ|赤道几内亚'] },
		//{ key: 'D', data: ['DK|丹麦', 'DE|德国', 'TL|东帝汶', 'TG|多哥', 'DO|多米尼加', 'DM|多米尼克'] },
		//{ key: 'E', data: ['EC|厄瓜多尔', 'ER|厄立特里亚', 'RU|俄罗斯'] },
		//{ key: 'F', data: ['FR|法国', 'FO|法罗群岛', 'VA|梵蒂冈', 'PF|法属波利尼西亚', 'GF|法属圭亚那', 'TF|法属南部领地', 'MF|法属圣马丁', 'FJ|斐济群岛', 'PH|菲律宾', 'FI|芬兰', 'CV|佛得角'] },
		//{ key: 'G', data: ['GM|冈比亚', 'CG|刚果（布）', 'CD|刚果（金）', 'GL|格陵兰', 'GD|格林纳达', 'GE|格鲁吉亚', 'CO|哥伦比亚', 'GG|根西岛', 'CR|哥斯达黎加', 'GP|瓜德罗普', 'GU|关岛', 'CU|古巴', 'GY|圭亚那'] },
		//{ key: 'H', data: ['HT|海地', 'KR|韩国 南朝鲜', 'KZ|哈萨克斯坦', 'HM|赫德岛和麦克唐纳群岛', 'ME|黑山', 'NL|荷兰', 'BQ|荷兰加勒比区', 'HN|洪都拉斯'] },
		//{ key: 'J', data: ['GH|加纳', 'CA|加拿大', 'KH|柬埔寨', 'GA|加蓬', 'DJ|吉布提', 'CZ|捷克', 'KG|吉尔吉斯斯坦', 'KI|基里巴斯', 'ZW|津巴布韦', 'GN|几内亚', 'GW|几内亚比绍'] },
		//{ key: 'K', data: ['KY|开曼群岛', 'CM|喀麦隆', 'CC|科科斯群岛', 'HR|克罗地亚', 'KM|科摩罗', 'KE|肯尼亚', 'CI|科特迪瓦', 'KW|科威特', 'CK|库克群岛'] },
		//{ key: 'L', data: ['LS|莱索托', 'LA|老挝', 'LV|拉脱维亚', 'LB|黎巴嫩', 'LR|利比里亚', 'LY|利比亚', 'LI|列支敦士登', 'LT|立陶宛', 'RE|留尼汪', 'RO|罗马尼亚', 'LU|卢森堡', 'RW|卢旺达'] },
		//{ key: 'M', data: ['MG|马达加斯加', 'IM|马恩岛', 'MV|马尔代夫', 'MT|马耳他', 'FK|马尔维纳斯群岛（ 福克兰）', 'MY|马来西亚', 'MW|马拉维', 'ML|马里', 'MU|毛里求斯', 'MR|毛里塔尼亚', 'MK|马其顿', 'MH|马绍尔群岛', 'MQ|马提尼克', 'YT|马约特', 'US|美国', 'UM|美国本土外小岛屿', 'AS|美属萨摩亚', 'VI|美属维尔京群岛', 'MN|蒙古国 蒙古', 'BD|孟加拉', 'MS|蒙塞拉特岛', 'MM|缅甸', 'FM|密克罗尼西亚联邦', 'MD|摩尔多瓦', 'MA|摩洛哥', 'MC|摩纳哥', 'MZ|莫桑比克', 'MX|墨西哥'] },
		//{ key: 'N', data: ['NA|纳米比亚', 'ZA|南非', 'AQ|南极洲', 'GS|南乔治亚岛和南桑威奇群岛', 'SS|南苏丹', 'NR|瑙鲁', 'NP|尼泊尔', 'NI|尼加拉瓜', 'NE|尼日尔', 'NG|尼日利亚', 'NU|纽埃', 'NF|诺福克岛', 'NO|挪威'] },
		//{ key: 'P', data: ['PW|帕劳', 'PN|皮特凯恩群岛', 'PT|葡萄牙'] },
		//{ key: 'Q', data: ['QA|卡塔尔'] },
		//{ key: 'R', data: ['JP|日本', 'SE|瑞典', 'CH|瑞士'] },
		//{ key: 'S', data: ['SV|萨尔瓦多', 'RS|塞尔维亚', 'SL|塞拉利昂', 'SN|塞内加尔', 'CY|塞浦路斯', 'SC|塞舌尔', 'WS|萨摩亚', 'SA|沙特阿拉伯', 'BL|圣巴泰勒米岛', 'CX|圣诞岛', 'ST|圣多美和普林西比', 'SH|圣赫勒拿', 'KN|圣基茨和尼维斯', 'LC|圣卢西亚', 'SM|圣马力诺', 'PM|圣皮埃尔和密克隆', 'VC|圣文森特和格林纳丁斯', 'LK|斯里兰卡', 'SK|斯洛伐克', 'SI|斯洛文尼亚', 'SJ|斯瓦尔巴群岛和 扬马延岛', 'SZ|斯威士兰', 'SD|苏丹', 'SR|苏里南', 'SB|所罗门群岛', 'SO|索马里'] },
		//{ key: 'T', data: ['TH|泰国', 'TW|台湾', 'TJ|塔吉克斯坦', 'TO|汤加', 'TZ|坦桑尼亚', 'TC|特克斯和凯科斯群岛', 'TT|特立尼达和多巴哥', 'TM|土库曼斯坦', 'TN|突尼斯', 'TK|托克劳', 'TR|土耳其', 'TV|图瓦卢'] },
		//{ key: 'W', data: ['WF|瓦利斯和富图纳', 'VU|瓦努阿图', 'GT|危地马拉', 'VE|委内瑞拉', 'BN|文莱', 'UG|乌干达', 'UA|乌克兰', 'UY|乌拉圭', 'UZ|乌兹别克斯坦'] },
		//{ key: 'X', data: ['HK|香港', 'ES|西班牙', 'GR|希腊', 'SG|新加坡', 'NC|新喀里多尼亚', 'NZ|新西兰', 'HU|匈牙利', 'EH|西撒哈拉', 'SY|叙利亚'] },
		//{ key: 'Y', data: ['JM|牙买加', 'AM|亚美尼亚', 'YE|也门', 'IT|意大利', 'IQ|伊拉克', 'IR|伊朗', 'IN|印度', 'GB|英国', 'VG|英属维尔京群岛', 'IO|英属印度洋领地', 'ID|印尼', 'IL|以色列', 'JO|约旦', 'VN|越南'] },
		//{ key: 'Z', data: ['ZM|赞比亚', 'JE|泽西岛', 'TD|乍得', 'KP|朝鲜 北朝鲜', 'GI|直布罗陀', 'CL|智利', 'CF|中非', 'CN|中国 内地'] }
		//]  
		//var hotCity = ['CN|中国 内地', 'HK|香港', 'MO|澳门', 'TW|台湾', 'US|美国', 'GB|英国', 'JP|日本', 'CA|加拿大', 'FR|法国', 'KR|韩国 南朝鲜', 'DE|德国', 'AU|澳大利亚']

		$(function() {

			//    init();

			// 选择
			$('body').on('click', '.city-list p', function() {
				var data = $(this).text() + "||" + $(this).data('id');
				window.localStorage.setItem("MySelectArea", data);
				setTimeout(function() {
					$(".letter").hide();
				}, 400);
				$("html").height(100 + '%');
				mainView.router.refreshPreviousPage();
				setTimeout(function() {
					mainView.router.back({
						pageName: 'TelephonePayment', //页面的data-page值

					});
				}, 400);

			});

			//    $('.hot.hotCity').on('click', 'div', function () {
			//        var data = $(this).text() + '|' + $(this).data('id');
			//        alert(data)
			//    });

		})

		//function init() {
		//    $('.city').html('');
		//    var hotHtml = '';
		//    hotHtml += '<div class="tips" id="热门1">热门城市</div>';
		//    hotHtml += '<div class="hot hotCity">';
		//    $.each(hotCity, function (i, item) {
		//        var split = item.split('|');
		//        hotHtml += '<div data-id="'+ split[0] +'">' + split[1] + '</div>'
		//    })
		//    hotHtml += '</div>';
		//    $('.city').append(hotHtml);
		//    
		//    var html = '';
		//    $.each(cityList, function (i, item) {
		//        html += '<div class="city-list"><span class="city-letter" id="' + item.key + '1">' + item.key + '</span>';
		//        $.each(item.data, function (j, data) {
		//          var split = data.split('|');
		//            html += '<p data-id="'+ split[0] +'">' + split[1] + '</p>';
		//        })
		//        html += '</div>';
		//    })
		//    $('.city').append(html);
		//}

		;
		(function($) {

			$('.letter').bind("touchstart touchmove", function(e) {
				$("html").height(17641);
				var top = $(window).scrollTop();
				e.preventDefault(); //阻止默认滚动
				var touch = e.touches[0];
				var ele = document.elementFromPoint(touch.pageX, touch.pageY - top);

				if(ele.tagName == 'A') {
					var s = $(ele).text();
					$(window).scrollTop($('#' + s + '1').offset().top)
					$("#showLetter span").html(s.substring(0, 1));
					$("#showLetter").show().delay(500).hide(0);
				}
			});

			$('.letter').bind("touchend", function(e) {
				$("#showLetter").hide(0);
				//        $("html").height(100 + '%');
			});
			//	$(".container").on('touchstart touchmove',function  () {
			//		$("html").height(100 + '%');
			//	});
		})(Zepto);

	}
	if(page.name == 'MerchantWalletIndex') { //商家钱包首页
		MerchantWallets.MerchantWalletIndexplus();
		MerchantWallets.MerchantWalletIndexlist();
		$("#MerchantWalletIndex-index").on('click', function() { //返回按钮事件			
			sysWallet.backWallet();
		});
	}
	if(page.name == 'MerchantCollection') { //商家收款
		MerchantWallets.MerchantCollection();
		$("#MerchantCollection-index").on('click', function() { //返回按钮事件			
			MerchantWallets.ReturnMerchantWallet();
		});
	}
	if(page.name == 'SettlementRequest') { //结算声请
		MerchantWallets.SettlementRequests();
		$("#SettlementRequest-index").on('click', function() { //返回按钮事件			
			
			MerchantWallets.ReturnMerchantWallet();
		});
	}
	if(page.name == 'WalletPaymentplus') { //钱包付款
		if(otherPurseAdress != null) {
			$("#WalletPaymentplus_address").val(otherPurseAdress);
		} else {
			$("#WalletPaymentplus_address").val("");
		}
		$("#WalletPaymentplus-index").on('click', function() { //返回按钮事件
			myApp.closeModal('.picker-modal');
		
			MerchantWallets.ReturnWalletPayment();
			otherPurseAdress = null;
		});
		$("#WalletPaymentplus_Available").html(sysUtil.storageUtil.getUserData("AvailableAssets"));
		console.log(sysUtil.storageUtil.getUserData("AvailableAssets"));
		$("#WalletPaymentplus_Amount").on("input propertychange", function(event) { //钱包付款自动计算
			var t = $("#WalletPaymentplus_Amount").val();
			var plus = t / PublicIndexUnitPrice;
			$("#WalletPaymentplus_Required").val(plus.toFixed(8));
			if(t.length == 0) {
				$("#WalletPaymentplus_Required").val(0);
			}
		});

	}
	if(page.name == 'WalletCollection') { //钱包收款		
		MerchantWallets.WalletCollections();
		$("#WalletCollection-index").on('click', function() { //返回按钮事件	
			
			MerchantWallets.ReturnWalletPayment();
		});
	}
	if(page.name == 'scan') {
		
		IsScan = true;
		
		scan = new plus.barcode.Barcode('bcid');
		scan.onmarked = newscan.onmarked;
		scan.start();
		$("#scanExit").on('click', function() { //返回按钮事件				
			newscan.exitScan();
		});

	}
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function(e) {
	// Following code will be executed for page with data-page attribute equal to "about"
	//myApp.alert('弹出2');
})
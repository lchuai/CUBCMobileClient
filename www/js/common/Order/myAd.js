var Ad = {
	publishBuyAd: function(PushPage) {
		if(PushPage == 1) {
			$("#publishBuyAd").on('click', function() {
			
				Ad.SubmitpublishBuyAd(1, parseInt($("#FloatRatio").val().trim()), parseInt($("#MinRation").val().trim()), parseInt($("#MaxRation").val().trim()), 1);
			});
			$("#publishSellAd").on('click', function() {
				Ad.SubmitpublishBuyAd(2, parseInt($("#FloatSellRatio").val().trim()), parseInt($("#MinSellRation").val().trim()), parseInt($("#MaxSellRation").val().trim()), 1);
			});
		} else if(PushPage == 2) {
			$("#ospublishBuyAd").on('click', function() {
				Ad.SubmitpublishBuyAd(1, parseInt($("#osFloatRatio").val().trim()), parseInt($("#osMinRation").val().trim()), parseInt($("#osMaxRation").val().trim()), 2);
			});
			$("#ospublishSellAd").on('click', function() {
				Ad.SubmitpublishBuyAd(2, parseInt($("#osFloatSellRatio").val().trim()), parseInt($("#osMinSellRation").val().trim()), parseInt($("#osMaxSellRation").val().trim()), 2);
			});
		}

	},
	publishAdBuy: function(PushPage) { //发布广告页面监听输入
		if(PushPage == 1) {
			        $("#UnitPrice").html(PublicIndexUnitPrice);
			        $("#topUnitPrice").html(PublicIndexUnitPrice);
					$("#sellUnitPrice").html(PublicIndexUnitPrice);
					$("#UnitPrice").html(PublicIndexUnitPrice);
					$("#min-money").html(PublicTransactionMin);
					$("#max-money").html(PublicTransactionMax);
					$("#min-sell-money").html(PublicTransactionMin);
					$("#max-sell-money").html(PublicTransactionMax);
			$("#FloatRatio").on("input propertychange", function(event) {//购买
				var FloatRatio = $(this).val();
				if(FloatRatio==""){
					FloatRatio = 0;
				}
				
				var topUnitPrice = $("#topUnitPrice").html();
				
				var BuyUnitPrice = parseFloat(topUnitPrice) + (parseFloat(FloatRatio) * parseFloat(topUnitPrice) / 100);
				 BuyUnitPrice = BuyUnitPrice.toFixed(4);
				 var MinRation = $("#MinRation").val();
				 if(MinRation=='')
				 {
				 	MinRation=0;
				 }
				 var osMinCUBC = parseFloat(MinRation) / parseFloat(BuyUnitPrice);
				  var MaxRation = $("#MaxRation").val();
				 if(MaxRation=='')
				 {
				 	MaxRation=0;
				 }
				var MaxCUBC = parseFloat(MaxRation) / parseFloat(BuyUnitPrice);
				
				$("#UnitPrice").html(BuyUnitPrice);
				$("#minCUBC").html(osMinCUBC.toFixed(8));
				$("#maxCUBC").html(MaxCUBC.toFixed(8));
			});
			$("#FloatSellRatio").on("input propertychange", function(event) {//出售
				var SellFloatRatio = $(this).val();
				if(SellFloatRatio=='')
				{
					SellFloatRatio=0;
				}
				var topUnitPrice = $("#topUnitPrice").html();
				
				var SellUnitPrice = parseFloat(topUnitPrice) + (parseFloat(SellFloatRatio) * parseFloat(topUnitPrice) / 100);
				var sellUnitPrice;
				sellUnitPrice = SellUnitPrice.toFixed(4);
				var MinRation = $("#MinSellRation").val();
				 if(MinRation=='')
				 {
				 	MinRation=0;
				 }
				 var osMinCUBC = parseFloat(MinRation) / parseFloat(sellUnitPrice);	
				 var MaxRation = $("#MaxSellRation").val();
				 if(MaxRation=='')
				 {
				 	MaxRation=0;
				 }
				var MaxCUBC = parseFloat(MaxRation) / parseFloat(sellUnitPrice);
				
				$("#minSellCUBC").html(osMinCUBC.toFixed(8));
				$("#sellUnitPrice").html(sellUnitPrice);
				$("#maxSellCUBC").html(MaxCUBC.toFixed(8));
				
			});
			$("#MinRation").on("input propertychange",function(){
						var MinRation = $("#MinRation").val();
						var UnitPrice = $("#UnitPrice").html();
						if(MinRation==''){
							MinRation = 0;
						}
						var osMinCUBC = parseFloat(MinRation) / parseFloat(UnitPrice);
						$("#minCUBC").html(osMinCUBC.toFixed(8));
					});
					

					$("#MaxRation").on("input propertychange", function() {
						var MaxRation = $("#MaxRation").val();
						var UnitPrice = $("#UnitPrice").html();
						if(MaxRation == ''){
							MaxRation = 0;
						}
					    var MaxCUBC = parseFloat(MaxRation) / parseFloat(UnitPrice);
						$("#maxCUBC").html(MaxCUBC.toFixed(8));
					});
					
					//我要出售获取最小最大CUBC
					$("#MinSellRation").on("input propertychange",function(){
						var MinSellRation = $("#MinSellRation").val();
						var sellUnitPrice = $("#sellUnitPrice").html();
						if(MinSellRation==''){
							MinSellRation = 0;
						}
						var SellMinCUBC = parseFloat(MinSellRation) / parseFloat(sellUnitPrice);
						$("#minSellCUBC").html(SellMinCUBC.toFixed(8));
					});
					$("#MaxSellRation").on("input propertychange", function() {
						var MaxSellRation = $("#MaxSellRation").val();
						var sellUnitPrice = $("#sellUnitPrice").html();
						if(MaxSellRation == ''){
							MaxSellRation = 0;
						}
					    var SellMaxCUBC = parseFloat(MaxSellRation) / parseFloat(sellUnitPrice);
						$("#maxSellCUBC").html(SellMaxCUBC.toFixed(8));
					});

		} else if(PushPage == 2) {
			        $("#ostopUnitPrice").html(PublicIndexUnitPrice);
			        $("#osUnitPrice").html(PublicIndexUnitPrice);
			       
					$("#ossellUnitPrice").html(PublicIndexUnitPrice);
					$("#osmin-money").html(PublicTransactionMin);
					$("#osmax-money").html(PublicTransactionMax);
					$("#osmin-sell-money").html(PublicTransactionMin);
					$("#osmax-sell-money").html(PublicTransactionMax);
			
			$("#osFloatRatio").on("input propertychange", function(event) {
				var FloatRatio = $(this).val();
				if(FloatRatio==''){
					FloatRatio = 0;
				}
				var topUnitPrice = $("#ostopUnitPrice").html();
				var BuyUnitPrice = parseFloat(topUnitPrice) + (parseFloat(FloatRatio) * parseFloat(topUnitPrice) / 100);
				
				var osMinRation = $("#osMinRation").val();
				 if(osMinRation=='')
				 {
				 	osMinRation=0;
				 }
				 var osMinCUBC = parseFloat(osMinRation) / parseFloat(BuyUnitPrice);
		        var MaxRation = $("#osMaxRation").val();
				 if(MaxRation=='')
				 {
				 	MaxRation=0;
				 }
				var MaxCUBC = parseFloat(MaxRation) / parseFloat(BuyUnitPrice);
				$("#osUnitPrice").html(BuyUnitPrice.toFixed(4));
				$("#osminCUBC").html(osMinCUBC.toFixed(8));
				$("#osmaxCUBC").html(MaxCUBC.toFixed(8));
			});
		
			$("#osFloatSellRatio").on("input propertychange", function(event) {
				var SellFloatRatio = $(this).val();
				if(SellFloatRatio == ''){
					SellFloatRatio = 0;
				}
				var topUnitPrice = $("#ostopUnitPrice").html();
				var SellUnitPrice = parseFloat(topUnitPrice) + (parseFloat(SellFloatRatio) * parseFloat(topUnitPrice) / 100);
		
			
				var osMinRation = $("#osMinSellRation").val();
				 if(osMinRation=='')
				 {
				 	osMinRation=0;
				 }
				 var osMinCUBC = parseFloat(osMinRation) / parseFloat(SellUnitPrice);		
				 var MaxRation = $("#osMaxRation").val();
				 if(MaxRation=='')
				 {
				 	MaxRation=0;
				 }
				var MaxCUBC = parseFloat(MaxRation) / parseFloat(BuyUnitPrice);
				
				$("#ossellUnitPrice").html(SellUnitPrice.toFixed(4));
				$("#osminSellCUBC").html(osMinCUBC.toFixed(8));
				$("#osmaxSellCUBC").html(secondSellMinCUBC.toFixed(8));
				
			});
				$("#osMinRation").on("input propertychange",function(){
						var osMinRation = $("#osMinRation").val();
						var osUnitPrice = $("#osUnitPrice").html();
						if(osMinRation==''){
							osMinRation = 0;
						}
						var secondMinCUBC = parseFloat(osMinRation) / parseFloat(osUnitPrice);
						$("#osminCUBC").html(secondMinCUBC.toFixed(8));
					});
					$("#osMaxRation").on("input propertychange",function(){
						var osUnitPrice = $("#osUnitPrice").html();
						var osMaxRation = $("#osMaxRation").val();
						if(osMaxRation==''){
							osMaxRation = 0;
						}
						var secondMaxCUBC = parseFloat(osMaxRation) / parseFloat(osUnitPrice);
						$("#osmaxCUBC").html(secondMaxCUBC.toFixed(8));
					});
					$("#osMinSellRation").on("input propertychange",function(){
						var osMinSellRation = $("#osMinSellRation").val();
						var ossellUnitPrice = $("#ossellUnitPrice").html();
						if(osMinSellRation==''){
							osMinSellRation = 0;
						}
						var secondSellMinCUBC = parseFloat(osMinSellRation) / parseFloat(ossellUnitPrice);
						$("#osminSellCUBC").html(secondSellMinCUBC.toFixed(8));
					});
					$("#osMaxSellRation").on("input propertychange",function(){
						var osMaxSellRation = $("#osMaxSellRation").val();
						var ossellUnitPrice = $("#ossellUnitPrice").html();
						if(osMaxSellRation==''){
							osMaxSellRation = 0;
						}
						var secondSellMinCUBC = parseFloat(osMaxSellRation) / parseFloat(ossellUnitPrice);
						$("#osmaxSellCUBC").html(secondSellMinCUBC.toFixed(8));
					});
		}

	},
	//提交发布广告js
	SubmitpublishBuyAd: function(type, FloatRatio, MinRation, MaxRation, PushPage) {

		if(isNaN(FloatRatio)) {
				FloatRatio = 0;
			}
		if(PushPage == 1) {
			var adID = $("#AdID").val();
			adID = parseInt(adID);
			if(isNaN(adID)) {
				adID = 0;
			}

			var minMoney = $("#min-money").html();
			if(minMoney != '' && minMoney != undefined) {
				minMoney = parseInt(minMoney);
			}

			var maxMoney = $("#max-money").html();
			if(maxMoney != '' && maxMoney != undefined) {
				maxMoney = parseInt(maxMoney);
			}

			var minSellMoney = $("#min-sell-money").html();
			if(minSellMoney != '' && minSellMoney != undefined) {
				minSellMoney = parseInt(minSellMoney);
			}

			var maxSellMoney = $("#max-sell-money").html();
			if(maxSellMoney != '' && maxSellMoney != undefined) {
				maxSellMoney = parseInt(maxSellMoney);
			}

			var dealPassword = $("#DealPassword").val().trim();
			var DealPassword = '';

			if(type == 2) {
				DealPassword = dealPassword;
				if(dealPassword == '') {
					sysUtil.commonUtil.alertMsg("资金密码不能为空，请输入资金密码！");
					return;
				}
				if(MinRation < minSellMoney) {
					sysUtil.commonUtil.alertMsg("交易金额不能低于最小交易金额！");
					return;
				}
				if(MaxRation > maxSellMoney) {
					sysUtil.commonUtil.alertMsg("交易金额不能超过最大交易金额！");
					return;
				}
			}
			
			if(MinRation == '') {
				sysUtil.commonUtil.alertMsg("最小金额不能为空，请输入最小金额！");
				return;
			} else if(MinRation < minMoney) {
				sysUtil.commonUtil.alertMsg("交易金额不能低于最小交易金额！");
				return;
			}
			if(MaxRation == '') {
				sysUtil.commonUtil.alertMsg("最大金额不能为空，请输入最大金额！");
				return;
			} else if(MaxRation > maxMoney) {
				sysUtil.commonUtil.alertMsg("交易金额不能超过最大交易金额！");
				return;
			}
		} else if(PushPage == 2) {
			var adID = $("#osAdID").val();
			adID = parseInt(adID);
			if(isNaN(adID)) {
				adID = 0;
			}

			var minMoney = $("#osmin-money").html();
			if(minMoney != '' && minMoney != undefined) {
				minMoney = parseInt(minMoney);
			}

			var maxMoney = $("#osmax-money").html();
			if(maxMoney != '' && maxMoney != undefined) {
				maxMoney = parseInt(maxMoney);
			}

			var minSellMoney = $("#osmin-sell-money").html();
			if(minSellMoney != '' && minSellMoney != undefined) {
				minSellMoney = parseInt(minSellMoney);
			}

			var maxSellMoney = $("#osmax-sell-money").html();
			if(maxSellMoney != '' && maxSellMoney != undefined) {
				maxSellMoney = parseInt(maxSellMoney);
			}

			var dealPassword = $("#osDealPassword").val().trim();
			var DealPassword = '';

			if(type == 2) {
				DealPassword = dealPassword;
				if(dealPassword == '') {
					sysUtil.commonUtil.alertMsg("资金密码不能为空，请输入资金密码！");
					return;
				}
				if(MinRation < minSellMoney) {
					sysUtil.commonUtil.alertMsg("交易金额不能低于最小交易金额！");
					return;
				}
				if(MaxRation > maxSellMoney) {
					sysUtil.commonUtil.alertMsg("交易金额不能超过最大交易金额！");
					return;
				}
			}
			
			if(MinRation == '') {
				sysUtil.commonUtil.alertMsg("最小金额不能为空，请输入最小金额！");
				return;
			} else if(MinRation < minMoney) {
				sysUtil.commonUtil.alertMsg("交易金额不能低于最小交易金额！");
				return;
			}
			if(MaxRation == '') {
				sysUtil.commonUtil.alertMsg("最大金额不能为空，请输入最大金额！");
				return;
			} else if(MaxRation > maxMoney) {
				sysUtil.commonUtil.alertMsg("交易金额不能超过最大交易金额！");
				return;
			}

		}

		//提交发布广告
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AdID = adID;
		DATA.AdType = type + "";
		DATA.FloatRatio = FloatRatio;
		DATA.MinRation = MinRation;
		DATA.MaxRation = MaxRation;
		DATA.DealPassword = DealPassword;
		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "ReleaseAdvertising", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				//发布广告成功跳转到我的广告
				layer.open({
					content: data.returnMsg,
					skin: 'msg',
					time: 2, //2秒后自动关闭
					end: function() {
						if(PushPage == 1) //交易跳转
						{
							myApp.getCurrentView().router.load({
									url: "pages/Order/myAd.html"
								});

						} else if(PushPage == 2) {
							mainView.router.refreshPreviousPage();
							setTimeout(function() {
								mainView.router.back({
									pageName: 'myAd', //页面的data-page值
								});

							}, 500);
						}

					}
				});
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});
	},
	
	//获取发布广告交易单价
	GetSetUnitPrice: function() {
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetUnitPriceTransactionlimit", METHOD_GET, '', function(data) {
		
			if(data.boolResult) {
				PublicIndexUnitPrice=data.returnData.IndexUnitPrice;
				PublicTransactionMin=data.returnData.TransactionMin;
				
				PublicTransactionMax=data.returnData.TransactionMax;

			}
		});
	},
	
	
	tabs: function() { //点击进行中
		$("#myAd_content_Switch_first").show();
		$("#myAd_content_Switch_last").hide();
		$("#myAd_content_Switch_processing").css({
			"color": "#fff",
			"background-color": "#d8c577"
		});
		$("#myAd_content_Switch_Obtained").css({
			"color": "#b19d4d",
			"background-color": "#fff"
		});
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AdStatus = 1;
		DATA.pageIndex = 0;
		DATA.pageSize = 2;

		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "GetMyAdvertising", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {
				console.log(data)
				var myAdList = '';
				$("#myAd_content_Switch_first").html("");
				var item = data.returnData.listObj;

				MyAdPageCount = data.returnData.PageCount;

				for(var i = 0; i < item.length; i++) {

					var AdTitle = '';
					var AdStatuTitle = '';
					if(item[i].AdType == 1) {
						AdTitle = "购买广告";
					} else {
						AdTitle = "出售广告";
					}
					myAdList += '<div class="myAdList">';
					myAdList += '<div class="myAdListContentDetail">';
					myAdList += '<div class="buyAdTitle">';
					if(item[i].AdType == 1) {
						myAdList += '<span class="myAdTitle" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'

					} else {
						myAdList += '<span class="myAdTitleSell" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'
					}
					myAdList += '<span class="myAdState">' + AdStatuTitle + '</span>'
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">报价</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].offer;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == false)) {
						myAdList += '';
					} else if((item[i].IsSetWeChart == true) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
					}
					myAdList += '</div>';
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">交易限额</div>'
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].TradingForehead;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					myAdList += '</div>';
					myAdList += '</div>';

					myAdList += '<div class="buyAdSecondContent lastContent">';
					myAdList += '<div class="myAdTitlePrice">创建时间</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].CreateTime + '</span>';
					myAdList += '</div>';
					myAdList += '</div>';
					if(item[i].AdStatus == 1) {
						myAdList += '<div class="buyLastContent">';
						myAdList += '<span><a type="button" class="ad-Lower-frame" onclick="Ad.LowerAd(' + item[i].AdID + ',2)">下架</a></span>';
						myAdList += '</div>';
					}
					//					else {
					//						myAdList += '<div class="buyLastContent">';
					//						myAdList += '<span><a type="button" class="adEditSell"onclick="sysIndex.linkpublishAd(' + item[i].AdID + ')">编辑</a></span>';
					//						myAdList += '<span><a type="button" class="ad-Lower-frameSell" onclick="Ad.LowerAd(' + item[i].AdID + ',1)">上架</a></span>';
					//						myAdList += '</div>';
					//					}
					myAdList += '</div>';
					myAdList += '</div>';
				}
				$("#myAd_content_Switch_first").append(myAdList);
			} else {
				sysUtil.commonUtil.alertMsg("暂无广告列表！");
			}
		});
	},
	tabs2: function() { //点击已下架
		$("#myAd_content_Switch_last").show();
		$("#myAd_content_Switch_first").hide();
		$("#myAd_content_Switch_Obtained").css({
			"color": "#fff",
			"background-color": "#d8c577"
		});
		$("#myAd_content_Switch_processing").css({
			"color": "#b19d4d",
			"background-color": "#fff"
		});
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AdStatus = 2;
		DATA.pageIndex = 0;
		DATA.pageSize = 2;

		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "GetMyAdvertising", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {
				console.log(data)
				var myAdList = '';
				$("#myAd_content_Switch_last").html("");
				var item = data.returnData.listObj;

				MyAdPageCount = data.returnData.PageCount;

				for(var i = 0; i < item.length; i++) {

					var AdTitle = '';
					var AdStatuTitle = '';
					if(item[i].AdType == 1) {
						AdTitle = "购买广告";
					} else {
						AdTitle = "出售广告";
					}
					myAdList += '<div class="myAdList">';
					myAdList += '<div class="myAdListContentDetail">';
					myAdList += '<div class="buyAdTitle">';
					if(item[i].AdType == 1) {
						myAdList += '<span class="myAdTitle" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'

					} else {
						myAdList += '<span class="myAdTitleSell" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'
					}
					myAdList += '<span class="myAdState">' + AdStatuTitle + '</span>'
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">报价</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].offer;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == false)) {
						myAdList += '';
					} else if((item[i].IsSetWeChart == true) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
					}
					myAdList += '</div>';
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">交易限额</div>'
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].TradingForehead;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					myAdList += '</div>';
					myAdList += '</div>';

					myAdList += '<div class="buyAdSecondContent lastContent">';
					myAdList += '<div class="myAdTitlePrice">创建时间</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].CreateTime + '</span>';
					myAdList += '</div>';
					myAdList += '</div>';
					if(item[i].AdStatus == 2) {
						myAdList += '<div class="buyLastContent">';
						myAdList += '<span><a type="button" class="adEditSell"onclick="sysIndex.linkospublishAd(' + item[i].AdID + ',1)">编辑</a></span>';
						myAdList += '<span><a type="button" class="ad-Lower-frameSell" onclick="Ad.LowerAd(' + item[i].AdID + ',1)">上架</a></span>';
						myAdList += '</div>';
					}
					//					else {
					//						myAdList += '<div class="buyLastContent">';
					//						myAdList += '<span><a type="button" class="adEditSell"onclick="sysIndex.linkpublishAd(' + item[i].AdID + ')">编辑</a></span>';
					//						myAdList += '<span><a type="button" class="ad-Lower-frameSell" onclick="Ad.LowerAd(' + item[i].AdID + ',1)">上架</a></span>';
					//						myAdList += '</div>';
					//					}
					myAdList += '</div>';
					myAdList += '</div>';
				}
				$("#myAd_content_Switch_last").append(myAdList);
			} else {
				sysUtil.commonUtil.alertMsg("暂无广告列表！");
			}
		});
	},
	GetMyAd: function(statu, myAdPageIndex) { //我的广告列表
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AdStatus = statu;
		DATA.pageIndex = myAdPageIndex;
		//alert(MyAdIndex)
		DATA.pageSize = 6;
		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "GetMyAdvertising", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {
				var myAdList = '';
				var item = data.returnData.listObj;

				MyAdPageCount = data.returnData.PageCount;

				for(var i = 0; i < item.length; i++) {

					var AdTitle = '';
					var AdStatuTitle = '';
					if(item[i].AdType == 1) {
						AdTitle = "购买广告";
					} else {
						AdTitle = "出售广告";
					}
					if(statu == 1) {
						AdStatuTitle = "进行中";
					} else {
						AdStatuTitle = "已下架";
					}
					myAdList += '<div class="myAdList">';
					myAdList += '<div class="myAdListContentDetail">';
					myAdList += '<div class="buyAdTitle">';
					if(item[i].AdType == 1) {
						myAdList += '<span class="myAdTitle" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'

					} else {
						myAdList += '<span class="myAdTitleSell" id="' + item[i].AdID + '">' + AdTitle + item[i].AdID + '</span>'
					}
					myAdList += '<span class="myAdState">' + AdStatuTitle + '</span>'
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">报价</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].offer;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == true) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetWeChart == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetBankCard == false) && (item[i].IsSetAlipay == false) && (item[i].IsSetWeChart == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
					} else if((item[i].IsSetAlipay == false) && (item[i].IsSetBankCard == false) && (item[i].IsSetWeChart == false)) {
						myAdList += '';
					} else if((item[i].IsSetWeChart == true) && (item[i].IsSetAlipay == true) && (item[i].IsSetBankCard == true)) {
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/WeChat-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/silver-s.png" />';
						myAdList += '</span>';
						myAdList += '<span class="myAdPayType">';
						myAdList += '<img src="img/index/Alipay-s.png" />';
						myAdList += '</span>';
					}
					myAdList += '</div>';
					myAdList += '</div>';
					myAdList += '<div class="buyAdSecondContent">';
					myAdList += '<div class="myAdTitlePrice">交易限额</div>'
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].TradingForehead;
					myAdList += '<span>CNY</span>';
					myAdList += '</span>';
					myAdList += '</div>';
					myAdList += '</div>';

					myAdList += '<div class="buyAdSecondContent lastContent">';
					myAdList += '<div class="myAdTitlePrice">创建时间</div>';
					myAdList += '<div class="myAdlater">';
					myAdList += '<span class="myAdPrice">' + item[i].CreateTime + '</span>';
					myAdList += '</div>';
					myAdList += '</div>';
					if(item[i].AdStatus == 1) {
						myAdList += '<div class="buyLastContent">';
						myAdList += '<span><a type="button" class="ad-Lower-frame" onclick="Ad.LowerAd(' + item[i].AdID + ',2)">下架</a></span>';
						myAdList += '</div>';
					} else {
						myAdList += '<div class="buyLastContent">';
						myAdList += '<span><a type="button" class="adEditSell"onclick="sysIndex.linkpublishAd(' + item[i].AdID + ',1)">编辑</a></span>';
						myAdList += '<span><a type="button" class="ad-Lower-frameSell" onclick="Ad.LowerAd(' + item[i].AdID + ',1)">上架</a></span>';
						myAdList += '</div>';
					}
					myAdList += '</div>';
					myAdList += '</div>';
				}
				if(item.length < 6) {
					$("#MyAdlodingScroll").hide();
				}
				if(statu == 1) {
					$("#adListing").append(myAdList);
				} else {
					$("#AdListed").append(myAdList);
				}
			} else {
				$("#MyAdlodingScroll").hide();
				sysUtil.commonUtil.alertMsg("暂无广告列表！");
			}
		});
	},
	GetMyUpdataAd: function(AdID) { //广告编辑页面js
		var DATA = new Object();
		DATA.AdID = AdID
		if(AdID == null || AdID == "" || AdID == 0) {
			return;
		}
		$('#ostopUnitPrice').html(PublicIndexUnitPrice);
		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "GetUpdeteMyAdvertising", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				var aditem = data.returnData;
				$("#osFloatRatio").val(aditem.FloatRatio);
				$("#osMinRation").val(aditem.MinRation);
				$("#osMaxRation").val(aditem.MaxRation);
//				
	
				var editTranscation = parseFloat(PublicIndexUnitPrice) + (parseFloat(aditem.FloatRatio) * parseFloat(PublicIndexUnitPrice) / 100);
				var osminCUBC = parseFloat(aditem.MinRation) / parseFloat(editTranscation);
				var osmaxCUBC = parseFloat(aditem.MaxRation) / parseFloat(editTranscation);
				$("#osAdID").val(aditem.AdID);
				if(aditem.AdType == 1) {
					$("#osFloatRatio").val(aditem.FloatRatio);
				    $("#osMinRation").val(aditem.MinRation);
				    $("#osMaxRation").val(aditem.MaxRation);				    
					$("#osUnitPrice").html(editTranscation.toFixed(4));										
					$("#osminCUBC").html(osminCUBC.toFixed(8));
					$("#osmaxCUBC").html(osmaxCUBC.toFixed(8));
				} else {
					$("#ossells").trigger("click");
					$("#ossellAdId")[0].click();
					
					$("#ossellUnitPrice").html(editTranscation.toFixed(4));
					$("#osFloatSellRatio").val(aditem.FloatRatio);
					$("#osMinSellRation").val(aditem.MinRation);
					$("#osMaxSellRation").val(aditem.MaxRation);
					$("#osminSellCUBC").html(osminCUBC.toFixed(8));
					$("#osmaxSellCUBC").html(osmaxCUBC.toFixed(8));
				}
				 $('#osbuyAdId').attr('href','javascript:void(0)');
				 $('#ossellAdId').attr('href','javascript:void(0)');
			
			}
		});
	},
	LowerAd: function(AdID, AdStatu) { //广告下架js
		var DATA = new Object();	
	    DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.AdID = AdID;
		DATA.AdStatus = AdStatu;
		sysUtil.ajaxTool.requestGetData("WebApiAdvertising", "AdvertisingShelf", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				if(AdStatu == 1) {
					$("#myAd_content_Switch_processing").trigger("click");

				} else {
					$("#myAd_content_Switch_Obtained").trigger("click");

				}
			}else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});

	}

}
var Orderset = {
	buyRefresh: function() {
		var ptrContent = $$('#buyListOrders');
		ptrContent.on('refresh', function(e) {
			setTimeout(function() {
				$("#BuytodaySprice_buy").empty();
				PurchaseIndex = 0;
				Orderset.buy(0);
				myApp.attachInfiniteScroll($$('.infinite-scroll'));
				if(!document.getElementById("order_preloader")) {
					$("#buyListOrders").append('<div class="infinite-scroll-preloader"><div class="preloader" style="margin-top: 0.32rem;" id="order_preloader"></div></div>');
				}
				myApp.pullToRefreshDone();
			}, 1000);
		});
	},
	buyLoad: function() {
		// 加载flag
		var loading = false;
		$$('#buyListOrders').on('infinite', function() {
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
				PurchaseIndex = parseInt(PurchaseIndex) + 1;
				if(PurchaseIndex >= PurchaseLoading) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$('.infinite-scroll-preloader').remove();
					return;
				}
				// 获取下一页的内容
				Orderset.buy(parseInt(PurchaseIndex));
			}, 1000);
		});
	},
	buy: function(PageIndexp) { //购买详情首页渲染数据
		var DATA = new Object();
		DATA.AdType = 2;
		DATA.PageSize = 10;
		DATA.PageIndex = PageIndexp;

		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetTransactionList", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData.ListObj;
				var TrandingState = data.returnData.TrandingState;
				PurchaseLoading = data.returnData.CountPage;

				$("#TodaySprice_price_o").html(data.returnData.UnitPrice);
				if(NewsList.length < 10) {
					$('#order_preloader').remove();
				}
				if(NewsList.length > 0) {
					var liHtml = '';

					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div class="Today_CUBC_list">';
						liHtml += '<div><img class="Today_CUBC_list_Avatar" src="' + NewsList[i].GravatarImg + '"/></div>';
						liHtml += '<div class="Today_CUBC_list_2s">';
						liHtml += '<div class="Ouyang">';
						liHtml += '<span class="Ouyang_span_1s">' + NewsList[i].UserName + '</span>';
						liHtml += '<span class="Ouyang_span_2s">';
						if((NewsList[i].IsSetAlipay == false) && (NewsList[i].IsSetBankCard == true) && (NewsList[i].IsSetWeChart == true)) {
							liHtml += '<img src="img/index/silver-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else if((NewsList[i].IsSetBankCard == false) && (NewsList[i].IsSetAlipay == true) && (NewsList[i].IsSetWeChart == true)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else if(NewsList[i].IsSetWeChart == false && (NewsList[i].IsSetAlipay == true) && (NewsList[i].IsSetBankCard == true)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/silver-s.png"/>';
						} else if(NewsList[i].IsSetWeChart == false && (NewsList[i].IsSetAlipay == false) && (NewsList[i].IsSetBankCard == false)) {
							liHtml += '';
						} else if((NewsList[i].IsSetWeChart == false) && (NewsList[i].IsSetBankCard == false)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
						} else if((NewsList[i].IsSetWeChart == false) && (NewsList[i].IsSetAlipay == false)) {
							liHtml += '<img src="img/index/silver-s.png"/>';
						} else if((NewsList[i].IsSetBankCard == false) && (NewsList[i].IsSetAlipay == false)) {
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/silver-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						}
						liHtml += '</span>';
						liHtml += '</div>';
						liHtml += '<div class="transaction_o">交易 <span class="cny_style cny_stylemar">' + NewsList[i].Transactioncount + '</span>';
						liHtml += '好评率<span class="cny_style_mars">' + NewsList[i].PraiseRate + '</span>';
						liHtml += '</div>';
						liHtml += '<div>限额 <span class="cny_style">' + NewsList[i].MinRation + '-' + NewsList[i].MaxRation + '</span>';
						liHtml += '</div>';
						liHtml += '</div>';
						liHtml += '<div onclick="sysIndex.linkPurchaseDetails(' + NewsList[i].AdID + ',' + NewsList[i].UserID + ',' + TrandingState + ');">';
						liHtml += '<div class="buy_smeiy">购买</div>';
						liHtml += '<div class="buy_number">' + NewsList[i].UnitPriceRatio + '</div>';
						liHtml += '</div>';
						liHtml += '</div>';
					}

					$("#BuytodaySprice_buy").append(liHtml);
				}
			} else {
				$('#order_preloader').remove();
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}

		});
	},
	SellRefresh: function() {
		var ptrContent = $$('#sellListOrders');
		ptrContent.on('refresh', function(e) {
			setTimeout(function() {
				$("#TransactionForsale-7s").empty();
				Orderset.Sell();
				myApp.pullToRefreshDone();
			}, 1000);
		});
	},
	Sell: function() { //出售首页渲染数据
		var DATA = new Object();
		DATA.AdType = 1;
		DATA.PageSize = 10;
		DATA.PageIndex = 0;

		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetTransactionList", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData.ListObj;
				$("#TodaySprice_price_o").html(data.returnData.UnitPrice);
				var TrandingState = data.returnData.TrandingState;
				if(NewsList.length > 0) {
					$("#TransactionForsale-7s").html("");
					var liHtml = '';

					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div class="Today_CUBC_list">';
						liHtml += '<div><img class="Today_CUBC_list_Avatar" src="' + NewsList[i].GravatarImg + '"/></div>';
						liHtml += '<div class="Today_CUBC_list_2s">';
						liHtml += '<div class="Ouyang">';
						liHtml += '<span class="Ouyang_span_1s">' + NewsList[i].UserName + '</span>';
						liHtml += '<span class="Ouyang_span_2s">';
						if((NewsList[i].IsSetAlipay == false) && (NewsList[i].IsSetBankCard == true) && (NewsList[i].IsSetWeChart == true)) {
							liHtml += '<img src="img/index/silver-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else if((NewsList[i].IsSetBankCard == false) && (NewsList[i].IsSetAlipay == true) && (NewsList[i].IsSetWeChart == true)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else if(NewsList[i].IsSetWeChart == false && (NewsList[i].IsSetAlipay == true) && (NewsList[i].IsSetBankCard == true)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/silver-s.png"/>';
						} else if(NewsList[i].IsSetWeChart == false && (NewsList[i].IsSetAlipay == false) && (NewsList[i].IsSetBankCard == false)) {
							liHtml += '';
						} else if((NewsList[i].IsSetWeChart == false) && (NewsList[i].IsSetBankCard == false)) {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
						} else if((NewsList[i].IsSetWeChart == false) && (NewsList[i].IsSetAlipay == false)) {
							liHtml += '<img src="img/index/silver-s.png"/>';
						} else if((NewsList[i].IsSetBankCard == false) && (NewsList[i].IsSetAlipay == false)) {
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						} else {
							liHtml += '<img src="img/index/Alipay-s.png"/>';
							liHtml += '<img src="img/index/silver-s.png"/>';
							liHtml += '<img src="img/index/WeChat-s.png"/>';
						}
						liHtml += '</span>';
						liHtml += '</div>';
						liHtml += '<div class="transaction_o">交易 <span class="cny_style cny_stylemar">' + NewsList[i].Transactioncount + '</span>';
						liHtml += '好评率<span class="cny_style_mars">' + NewsList[i].PraiseRate + '</span>';
						liHtml += '</div>';
						liHtml += '<div>限额 <span class="cny_style">' + NewsList[i].MinRation + '-' + NewsList[i].MaxRation + '</span>';
						liHtml += '</div>';
						liHtml += '</div>';
						liHtml += '<div style="border: 1px solid #F5593F;" onclick="sysIndex.linkSaleDetails(' + NewsList[i].AdID + ',' + NewsList[i].UserID + ',' + TrandingState + ');">';
						liHtml += '<div class="buy_smeiy" style="background-color: #F5593F;">出售</div>';
						liHtml += '<div class ="buy_number" style="color: #F5593F;"> ' + NewsList[i].UnitPriceRatio + ' </div>';
						liHtml += '</div>';
						liHtml += '</div>';
					}
					$("#TransactionForsale-7s").append(liHtml);
				}
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	PurchaseDetails: function(AdID) { //购买详情渲染数据
		var DATA = new Object();
		DATA.AdID = AdID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetAdvertisingUser", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var liHtml = '';
					var NewsList = data.returnData;
					liHtml += '<img class="Today_CUBC_list_Avatar" src="' + NewsList.GravatarImg + '"/>';
					$("#PurchaseAvatar-MinRation-o-o").val(NewsList.MinRation);
					$("#PurchaseAvatar-MaxRation-o-o").val(NewsList.MaxRation);
					$("#PurchaseAvatar-Amount-o-o").attr('placeholder', ' ' + NewsList.MinRation + '-' + NewsList.MaxRation + '');
					$("#PurchaseAvatar-Currently-o-o").val(NewsList.SurplusAssets);
					$("#PurchaseAvatar-show-t").append(liHtml);
					$("#PurchaseAvatar-hid-max").val(NewsList.MaxRation);
					$("#PurchaseAvatar-userName-t").html(NewsList.UserName);
					$("#PurchaseAvatar-Transaction-order").html(NewsList.Transactioncount);
					$("#PurchaseAvatar-Turnover-rate").html(NewsList.TurnoverRate);
					$("#PurchaseAvatar-price-o-o").html(NewsList.UnitPrice);
					$("#PurchaseAvatar-hid-adid").val(AdID);
					$("#PurchaseAvatar-hid-TargetUserID").val(NewsList.UserID);
					$("#PurchaseAvatar-inputs-puls_er").val(NewsList.AssureBrokerage);
					$("#PurchaseAvatar-spans-puls").text(($("#PurchaseAvatar-Quantity-o-o").val()) * ((NewsList.AssureBrokerage) / 100));
					$("#PurchaseAvatar-Quantity-o-o").on("input propertychange", function(event) { //购买详情输入数量
						var a = $("#PurchaseAvatar-Quantity-o-o").val();
						var Assetes = a * (NewsList.AssureBrokerage / 100);

						$("#PurchaseAvatar-spans-puls").html(Assetes.toFixed(8));

					});
					$("#PurchaseAvatar-Amount-o-o").on("input propertychange", function(event) { //购买详情输入金额
						var a = $("#PurchaseAvatar-Quantity-o-o").val();

						var Assetes = a * (NewsList.AssureBrokerage / 100);

						$("#PurchaseAvatar-spans-puls").html(Assetes.toFixed(8));
					});
					if(NewsList.IsSetAlipay == false) {
						setTimeout(function() {
							$("#Alipay-SaleDetails-o").remove();
						}, 10);
					}
					if(NewsList.IsSetBankCard == false) {
						setTimeout(function() {
							$("#silver-SaleDetails-o").remove();
						}, 10);
					}
					if(NewsList.IsSetWeChart == false) {
						setTimeout(function() {
							$("#WeChat-SaleDetails-o").remove();
						}, 10);
					}

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400)
	},
	PurchaseAvatarall: function() { //购买详情自动计算
		$("#PurchaseAvatar-Quantity-o-o").on("input propertychange", function(event) { //购买详情输入数量

			var a = $("#PurchaseAvatar-Quantity-o-o").val();
			var b = $("#PurchaseAvatar-price-o-o").html();
			var sum = a * b;
			var moneyHtml;

			moneyHtml = Orderset.Calculation(sum);
			$("#PurchaseAvatar-Amount-o-o").val(moneyHtml);
		});
		$("#PurchaseAvatar-Amount-o-o").on("input propertychange", function(event) { //购买详情输入金额
			var a = $("#PurchaseAvatar-Amount-o-o").val();
			var b = $("#PurchaseAvatar-price-o-o").html();
			var sum = a / b;
			var moneyHtml;
			moneyHtml = Orderset.Calculation(sum);
			$("#PurchaseAvatar-Quantity-o-o").val(moneyHtml);
		});
	},
	PurchaseAvatarsubmit: function() { //提交购买详情
		BuyOrSellClicked = false;
		var min = $("#PurchaseAvatar-MinRation-o-o").val();
		var max = $("#PurchaseAvatar-MaxRation-o-o").val();
		var Quantity = $("#PurchaseAvatar-Quantity-o-o").val();
		var Amount = $("#PurchaseAvatar-Amount-o-o").val();
		var FundPassword = $("#PurchaseAvatar-FundPassword-o-o").val();
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AdID = $("#PurchaseAvatar-hid-adid").val();
		DATA.TargetUserID = $("#PurchaseAvatar-hid-TargetUserID").val();
		DATA.TransactionType = 1;
		DATA.TransAssets = Quantity;
		DATA.Amount = Amount;
		DATA.DealPassword = FundPassword;
		if(Quantity == "") {
			sysUtil.commonUtil.alertMsg("请输入金额");
		} else if(Amount == "") {
			sysUtil.commonUtil.alertMsg("请输入数量");
		} else if(parseInt(Amount) < parseInt(min)) {
			sysUtil.commonUtil.alertMsg("金额(CNY)不能小于最小限额");
		} else if(parseInt(Amount) > parseInt(max)) {
			sysUtil.commonUtil.alertMsg("金额(CNY)不能大于最大限额");
		} else if(FundPassword == "") {
			sysUtil.commonUtil.alertMsg("请输入资金密码");
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "AddTransaction", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					myApp.getCurrentView().router.load({
						url: "pages/Order/Order.html"
					});
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	PurchaseAvatarAmount: function() { //购买详情点全部
		var d = $("#PurchaseAvatar-inputs-puls_er").val();
		var a = $("#PurchaseAvatar-hid-max").val();
		var b = $("#PurchaseAvatar-price-o-o").html();
		var sum = a / b;

		$("#PurchaseAvatar-Amount-o-o").val(a);
		$("#PurchaseAvatar-Quantity-o-o").val(Orderset.Calculation(sum));
		$("#PurchaseAvatar-spans-puls").html((sum * d).toFixed(8));
	},
	//计算交易监听计算并截取小数点后8位方法
	Calculation: function(sum) {
		var moneyHtml;
		if(sum.toString().length > 1) {
			if(sum.toString().indexOf('.')) {
				var moneyLast = sum.toString().split('.')[1];
				if(moneyLast == undefined) {
					moneyLast = 0;
				}
				var thismoneyLast = moneyLast.toString();
				thismoneyLast = thismoneyLast.length > 8 ? thismoneyLast.substr(0, 8) : thismoneyLast;
				moneyHtml = sum.toString().split('.')[0] + "." + thismoneyLast;
			} else {
				moneyHtml = sum;
			}
		} else {
			moneyHtml = moneyHtml;
		}
		return moneyHtml;
	},
	SaleDetails: function(AdID) { // 出售详情渲染数据
		var DATA = new Object();
		DATA.AdID = AdID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetAdvertisingUser", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var liHtml = '';
					var NewsList = data.returnData;
					liHtml += '<img class="Today_CUBC_list_Avatar" src="' + NewsList.GravatarImg + '"/>';
					$("#SaleDetailsAvatar-Amount-o-o").attr('placeholder', ' ' + NewsList.MinRation + '-' + NewsList.MaxRation + '');
					$("#SaleDetailsAvatar-show-t").append(liHtml);
					$("#SaleDetailsAvatar-hid-min").val(NewsList.MinRation);
					$("#SaleDetailsAvatar-hid-max").val(NewsList.MaxRation);
					$("#SaleDetailsAvatar-userName-t").html(NewsList.UserName);
					$("#SaleDetailsAvatar-Transaction-order").html(NewsList.Transactioncount);
					$("#SaleDetailsAvatar-Turnover-rate").html(NewsList.TurnoverRate);
					$("#SaleDetailsAvatar-price-o-o").html(NewsList.UnitPrice);
					$("#SaleDetailsAvatar-hid-adid").val(AdID);
					$("#SaleDetailsAvatar-hid-TargetUserID").val(NewsList.UserID);

					if(NewsList.IsSetAlipay == false) {
						setTimeout(function() {
							$("#Alipay-SaleDetails-o-m").remove();
						}, 10);
					}
					if(NewsList.IsSetBankCard == false) {
						setTimeout(function() {
							$("#silver-SaleDetails-o-m").remove();
						}, 10);
					}
					if(NewsList.IsSetWeChart == false) {
						setTimeout(function() {
							$("#WeChat-SaleDetails-o-m").remove();
						}, 10);
					}

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	SaleDetailsAvatarall: function() { //出售详情点全部
		$("#SaleDetailsAvatar-Quantity-o-o").on("input propertychange", function(event) { //出售详情输入数量
			var a = $("#SaleDetailsAvatar-Quantity-o-o").val();
			var b = $("#SaleDetailsAvatar-price-o-o").html();
			var sum = a * b;
			var moneyHtml;
			moneyHtml = Orderset.Calculation(sum);
			$("#SaleDetailsAvatar-Amount-o-o").val(moneyHtml);
		});
		$("#SaleDetailsAvatar-Amount-o-o").on("input propertychange", function(event) { //出售详情输入金额
			var a = $("#SaleDetailsAvatar-Amount-o-o").val();
			var b = $("#SaleDetailsAvatar-price-o-o").html();
			var sum = a / b;
			var moneyHtml;
			moneyHtml = Orderset.Calculation(sum);
			$("#SaleDetailsAvatar-Quantity-o-o").val(moneyHtml);
		});
	},
	SaleDetailsAvatarsubmit: function() { //出售详情点提交
		BuyOrSellClicked = false;
		var Quantity = $("#SaleDetailsAvatar-Quantity-o-o").val();
		var Amount = $("#SaleDetailsAvatar-Amount-o-o").val();
		var FundPassword = $("#SaleDetailsAvatar-FundPassword-o-o").val();
		var min = $("#SaleDetailsAvatar-hid-min").val();
		var max = $("#SaleDetailsAvatar-hid-max").val();
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.AdID = $("#SaleDetailsAvatar-hid-adid").val();
		DATA.TargetUserID = $("#SaleDetailsAvatar-hid-TargetUserID").val();
		DATA.TransactionType = 2;
		DATA.TransAssets = Quantity;
		DATA.Amount = Amount;
		DATA.DealPassword = FundPassword;
		if(Quantity == "") {
			sysUtil.commonUtil.alertMsg("请输入数量");
		} else if(Amount == "") {
			sysUtil.commonUtil.alertMsg("请输入金额");
		} else if(parseInt(Amount) < parseInt(min)) {
			sysUtil.commonUtil.alertMsg("金额(CNY)不能小于最小限额");
		} else if(parseInt(Amount) > parseInt(max)) {
			sysUtil.commonUtil.alertMsg("金额(CNY)不能大于最大限额");
		} else if(FundPassword == "") {
			sysUtil.commonUtil.alertMsg("请输入资金密码");
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "AddTransaction", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					myApp.getCurrentView().router.load({
						url: "pages/Order/Order.html"
					});
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	SaleDetailsAvatarAmount: function() { //出售详情点全部
		var a = $("#SaleDetailsAvatar-hid-max").val();
		var b = $("#SaleDetailsAvatar-price-o-o").html();
		var sum = a / b;

		$("#SaleDetailsAvatar-Amount-o-o").val(a);
		$("#SaleDetailsAvatar-Quantity-o-o").val(Orderset.Calculation(sum));
	},
	TransactionNotPurchased: function() { //订单界面默认选中未完成
		var myUserID = sysUtil.storageUtil.getUserData("UserID");
		var DATA = new Object();
		DATA.UserID = myUserID;
		DATA.OrderStatus = 1;
		DATA.pageIndex = 0;
		DATA.pageSize = 6;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderData", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData.ListObj;

					if(NewsList.length > 0) {
						$("#TransactionNotPurchased_list_1s").html("");
						var liHtml = '';

						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<div class="besides" onclick="Orderset.TransactionNoClick(' + NewsList[i].OrderID + ',' + NewsList[i].TransactionType + ',' + NewsList[i].OrderStatus + ');">';
							liHtml += '<div class="besides_c_1">';
							if(NewsList[i].TransactionType == 1) {
								liHtml += '<div>买</div>';
							} else {
								liHtml += '<div class="red_back_t">卖</div>';
							}
							liHtml += '<div>CUBC</div>';
							liHtml += '<div>单价￥' + NewsList[i].UnitPrice + '</div>';
							if(NewsList[i].OrderStatus == 6) {
								liHtml += '<div class="Go_to_pay_red">' + NewsList[i].OrderStausMsg + '</div>';
							} else if(NewsList[i].OrderStatus == 2) {
								liHtml += '<div class="Go_to_pay_bule">' + NewsList[i].OrderStausMsg + '</div>';
							} else if(NewsList[i].OrderStatus == 3) {
								liHtml += '<div class="Go_to_pay_yellow">' + NewsList[i].OrderStausMsg + '</div>';
							} else if(NewsList[i].TransactionType == 2) {
								liHtml += '<div class="Go_to_pay_purple">' + NewsList[i].OrderStausMsg + '</div>';
							} else {
								liHtml += '<div class="Go_to_pay_green">' + NewsList[i].OrderStausMsg + '</div>';
							}
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2">';
							liHtml += '<div><span>交易金额</span><span class="Amount_style">' + NewsList[i].Amount + '</span><span class="cny_style">CNY</span></div>';
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2 besides_c_padding">';
							liHtml += '<div class="besides_c_height"><span>数字资产</span><span class="Amount_son_style">' + NewsList[i].TransAssets + '</span></div>';
							liHtml += '<div class="besides_c_border cny_style">' + NewsList[i].CreateTime + '</div>';
							liHtml += '</div>';
							liHtml += '</div>';
						}
						$("#TransactionNotPurchased_list_1s").append(liHtml);
					}
				}
			});
		}, 400);
	},
	TransactionNoClick: function(OrderID, TransactionType, OrderStatus) { //判断跳转页面
		var OrderIDs = OrderID;
		var TransactionTypes = TransactionType;
		var OrderStatusm = OrderStatus;
		if(OrderStatusm == 1 && TransactionTypes == 1) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/PurchaseDetails2.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 1 && TransactionTypes == 2) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/SaleDetails2.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 2 && TransactionTypes == 2) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/SaleDetails3.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 2 && TransactionTypes == 1) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/PurchaseDetails4.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 3) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/submitComments.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 4) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/PurchaseDetails3.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 5) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/PurchaseDetails3.html?OrderID=" + OrderID
			});
		} else if(OrderStatusm == 6) {
			$$("#sys-toolbar").hide('slow');
			myApp.getCurrentView().router.load({
				url: "pages/Order/arbitration2.html?OrderID=" + OrderID
			});
		}
	},
	hasbeenCompleted: function() { //订单界面选中已完成
		var myUserID = sysUtil.storageUtil.getUserData("UserID");
		var DATA = new Object();
		DATA.UserID = myUserID;
		DATA.OrderStatus = 2;
		DATA.pageIndex = 0;
		DATA.pageSize = 6;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderData", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData.ListObj;

					if(NewsList.length > 0) {
						$("#TransactionNotPurchased_list_2s").html("");
						var liHtml = '';

						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<div class="besides" onclick="Orderset.TransactionNoClick(' + NewsList[i].OrderID + ',' + NewsList[i].TransactionType + ',' + NewsList[i].OrderStatus + ');">';
							liHtml += '<div class="besides_c_1">';
							if(NewsList[i].TransactionType == 1) {
								liHtml += '<div>买</div>';
							} else {
								liHtml += '<div class="red_back_t">卖</div>';
							}
							liHtml += '<div>CUBC</div>';
							liHtml += '<div>单价￥' + NewsList[i].UnitPrice + '</div>';
							liHtml += '<div>' + NewsList[i].OrderStausMsg + '</div>';
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2">';
							liHtml += '<div><span>交易金额</span><span class="Amount_style">' + NewsList[i].Amount + '</span><span class="cny_style">CNY</span></div>';
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2 besides_c_padding">';
							liHtml += '<div class="besides_c_height"><span>数字资产</span><span class="Amount_son_style">' + NewsList[i].TransAssets + '</span></div>';
							liHtml += '<div class="besides_c_border cny_style">' + NewsList[i].CreateTime + '</div>';
							liHtml += '</div>';
							liHtml += '</div>';
						}
						$("#TransactionNotPurchased_list_2s").append(liHtml);
					}
				}
			});
		}, 400);
	},
	OrderCancelled: function() { //订单界面选中已取消
		var myUserID = sysUtil.storageUtil.getUserData("UserID");
		var DATA = new Object();
		DATA.UserID = myUserID;
		DATA.OrderStatus = 3;
		DATA.pageIndex = 0;
		DATA.pageSize = 6;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderData", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData.ListObj;

					if(NewsList.length > 0) {
						$("#TransactionNotPurchased_list_3s").html("");
						var liHtml = '';

						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<div class="besides" onclick="Orderset.TransactionNoClick(' + NewsList[i].OrderID + ',' + NewsList[i].TransactionType + ',' + NewsList[i].OrderStatus + ');">';
							liHtml += '<div class="besides_c_1">';
							if(NewsList[i].TransactionType == 1) {
								liHtml += '<div>买</div>';
							} else {
								liHtml += '<div class="red_back_t">卖</div>';
							}
							liHtml += '<div>CUBC</div>';
							liHtml += '<div>单价￥' + NewsList[i].UnitPrice + '</div>';
							liHtml += '<div>' + NewsList[i].CloseOrderDesc + '</div>';
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2">';
							liHtml += '<div><span>交易金额</span><span class="Amount_style">' + NewsList[i].Amount + '</span><span class="cny_style">CNY</span></div>';
							liHtml += '</div>';
							liHtml += '<div class="besides_c_2 besides_c_padding">';
							liHtml += '<div class="besides_c_height"><span>数字资产</span><span class="Amount_son_style">' + NewsList[i].TransAssets + '</span></div>';
							liHtml += '<div class="besides_c_border cny_style">' + NewsList[i].CreateTime + '</div>';
							liHtml += '</div>';
							liHtml += '</div>';
						}
						$("#TransactionNotPurchased_list_3s").append(liHtml);
					}
				}
			});
		}, 400);
	},
	UnfinishedPayment: function(OrderID) { //点击去付款跳到购买详情2
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/PurchaseDetails2.html?OrderID=" + OrderID
		});
	},
	OrderPurchaseDetails2: function(OrderID) { //订单点击去付款
		$("#Buy_set_order_id_y").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				var NewsList = data.returnData;
				if(NewsList.TransactionType == 1) {
					$("#SaleDetails2_myuser_nex").html("卖家");
				}
				$("#Purchase_details_order_number_k").html(NewsList.modelOrder.OrderCode);
				$("#t_Purchase_pending_payment").html(NewsList.modelOrder.OrderStatus);
				$("#Real_name_information").html(NewsList.modelOrder.TrueName);
				$("#Purchase_unit_price_4s").html(NewsList.modelOrder.UnitPrice);
				$("#Purchase_details_buyer_m").html(NewsList.modelOrder.UserName);
				$("#Purchase_details_order_time_u").html(NewsList.modelOrder.CreateTime);
				$("#Purchase_details_quantity_e").html(NewsList.modelOrder.TransAssets);
				$("#Purchase_details_amount_h").html(NewsList.modelOrder.Amount);

				$("#Alipay_erweima_ert").val(NewsList.PaymentMethod.AlipayImg); //支付宝二维码
				$("#WeChat_erweima_ert").val(NewsList.PaymentMethod.WeChartImg); //微信二维码

				$("#Buy_set_Alipay_e").val(NewsList.PaymentMethod.IsSetAlipay); //是否绑定支付宝
				$("#Purchase_set_bank_card_e").val(NewsList.PaymentMethod.IsSetBankCard); //是否绑定银行卡
				$("#Buy_Settings_WeChat_e").val(NewsList.PaymentMethod.IsSetWeChart); //是否绑定微信

				$("#Buy_Alipay_account_j").val(NewsList.PaymentMethod.Alipay); //绑定过的支付宝账号
				$("#Purchase_bank_card_account_j").val(NewsList.PaymentMethod.BankCard); //绑定过的银行卡账号
				$("#Buy_WeChat_account_j").val(NewsList.PaymentMethod.WeChart); //绑定过的微信账号
				$("#Bind_real_name_j").val(NewsList.PaymentMethod.TrueName); //绑定支付方式的真实姓名
				var second = NewsList.PaymentMethod.SurplusSeconds;
				var Minute = NewsList.PaymentMethod.SurplusMinutes;
				if(Minute < 10) {
					Minute = "0" + Minute;
				}
				var Timing = setInterval(function() {
					second--;
					if(Minute == 0) {
						Minute = "0" + "0";
					}
					if(second < 10) {
						second = "0" + second;
						if(second == ("0" + 0)) {
							second = 59;
							Minute = "0" + (Minute - 1);
						}
					}
					if(Minute == ("0" + "0") && second == ("0" + 1)) {
						second = ("0" + 0);
						clearInterval(Timing);
						var DATAID = new Object();
						DATAID.OrderID = OrderID;
						sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderClose", METHOD_GET, DATAID, function(data) {
							if(data.boolResult) {
								sysUtil.commonUtil.alertMsg(data.returnMsg);
								$$("#sys-toolbar").hide('slow');
								//								myApp.getCurrentView().router.load({
								//									url: "pages/Order/Order.html"
								//								});
								mainView.router.refreshPreviousPage();
								setTimeout(function() {
									mainView.router.back({
										pageName: 'Order', //页面的data-page值
									});
								}, 400);

							} else {
								sysUtil.commonUtil.alertMsg(data.returnMsg);
							}
						});
					}
					$(".PurchaseDetails2_minutes").html(Minute);
					$(".PurchaseDetails2_seconds").html(second);
				}, 1000);
				myApp.onPageBeforeRemove('PurchaseDetails2', function(page) { //离开页面时，销毁setInterval
					clearInterval(Timing);
				});
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	PurchasePaymentMethod: function() { //购买详情付款方式
		var Alipay = $("#Buy_set_Alipay_e").val();
		var bankCard = $("#Purchase_set_bank_card_e").val();
		var WeChat = $("#Buy_Settings_WeChat_e").val();

		//		if((Alipay == "false") && (bankCard == "false") && (WeChat == "false")) {
		//			sysUtil.commonUtil.alertMsg('请设置付款方式');
		//			myApp.getCurrentView().router.load({
		//				url: "pages/my/payment.html"
		//			});
		//		} else 
		if((Alipay == "false") && (bankCard == "false") && (WeChat == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageWeChat();"><span><img src="img/index/WeChat-s.png"/>微信支付</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else if((WeChat == "false") && (bankCard == "false") && (Alipay == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageAlipay();"><span><img src="img/index/Alipay-s.png"/>支付宝</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else if((WeChat == "false") && (Alipay == "false") && (bankCard == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoveragebankCard();"><span><img src="img/index/silver-s.png"/>银行卡</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else if((WeChat == "false") && (Alipay == "true") && (bankCard == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoveragebankCard();"><span><img src="img/index/silver-s.png"/>银行卡</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageAlipay();"><span><img src="img/index/Alipay-s.png"/>支付宝</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else if((Alipay == "false") && (WeChat == "true") && (bankCard == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoveragebankCard();"><span><img src="img/index/silver-s.png"/>银行卡</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageWeChat();"><span><img src="/mg/index/WeChat-s.png"/>微信支付</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else if((bankCard == "false") && (WeChat == "true") && (Alipay == "true")) {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageAlipay();"><span><img src="img/index/Alipay-s.png"/>支付宝</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageWeChat();"><span><img src="img/index/WeChat-s.png"/>微信支付</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		} else {
			var popupHTML = '<div class="popup">' +
				'<ul class="payment_ul_4s">' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoveragebankCard();"><span><img src="img/index/silver-s.png"/>银行卡</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageAlipay();"><span><img src="img/index/Alipay-s.png"/>支付宝</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'<li class="close-popup" onclick="Orderset.PurchaseCoverageWeChat();"><span><img src="img/index/WeChat-s.png"/>微信支付</span><span><img src="img/my/jiantou.png"/></span></li>' +
				'</ul>' +
				'</div>'
			myApp.popup(popupHTML);
		}
	},
	PurchaseCoverageAlipay: function() { //选择支付宝付款
		var AlipayAccount = $("#Buy_Alipay_account_j").val(); //绑定过的支付宝账号
		var bankCardAccount = $("#Purchase_bank_card_account_j").val(); //绑定过的银行卡账号
		var WeChatAccount = $("#Buy_WeChat_account_j").val(); //绑定过的微信账号
		var BindName = $("#Bind_real_name_j").val(); //绑定支付方式的真实姓名
		$(".paymentFan_3s_s").html("支付宝");
		$(".paymentFan_3s_s").css("color", "#000");
		$("#PurchaseDetails2_footer_j_s").removeClass("none");
		$("#PurchaseDetails2_footer_j_s").html("");
		var liHtml = '';

		liHtml += '<div class="PurchaseDetails2_Alipay_1s">';
		liHtml += '<img src="img/index/Alipay-s.png" />';
		liHtml += '<p>支付宝转账</p>';
		liHtml += '</div>';
		liHtml += '<ul class="PurchaseDetails2_Alipay_2s">';
		liHtml += '<li>支付宝账号<img src="img/my/progress-bar4.png" /> <span onclick="Orderset.OpenAlipayQRCode();" class="Go_to_pay_bule">查看二维码</span></li>';
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + BindName + '">' + BindName + '<img src="img/my/progress-bar4.png" /></li>';	
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + AlipayAccount + '">' + AlipayAccount + '<img src="img/my/progress-bar4.png" /></li>';
			liHtml += '</ul>';
		$("#PurchaseDetails2_footer_j_s").append(liHtml);
	},
	PurchaseCoveragebankCard: function() { //选择银行卡付款
		var bankCardAccount = $("#Purchase_bank_card_account_j").val(); //绑定过的银行卡账号
		var BindName = $("#Bind_real_name_j").val(); //绑定支付方式的真实姓名
		$(".paymentFan_3s_s").html("银行卡");
		$(".paymentFan_3s_s").css("color", "#000");
		$("#PurchaseDetails2_footer_j_s").removeClass("none");
		$("#PurchaseDetails2_footer_j_s").html("");
		var liHtml = '';

		liHtml += '<div class="PurchaseDetails2_Alipay_1s">';
		liHtml += '<img src="img/index/silver-s.png" />';
		liHtml += '<p>银行卡转账</p>';
		liHtml += '</div>';
		liHtml += '<ul class="PurchaseDetails2_Alipay_2s">';
		liHtml += '<li>银行卡账号<img src="img/my/progress-bar4.png" /> </li>';
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + BindName + '">' + BindName + '<img src="img/my/progress-bar4.png" /></li>';
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + bankCardAccount + '">' + bankCardAccount + '<img src="img/my/progress-bar4.png" /></li>';		
		liHtml += '</ul>';
		$("#PurchaseDetails2_footer_j_s").append(liHtml);
	},
	PurchaseCoverageWeChat: function() { //选择微信付款
		var WeChatAccount = $("#Buy_WeChat_account_j").val(); //绑定过的微信账号
		var BindName = $("#Bind_real_name_j").val(); //绑定支付方式的真实姓名
		$(".paymentFan_3s_s").html("微信");
		$(".paymentFan_3s_s").css("color", "#000");
		$("#PurchaseDetails2_footer_j_s").removeClass("none");
		$("#PurchaseDetails2_footer_j_s").html("");
		var liHtml = '';

		liHtml += '<div class="PurchaseDetails2_Alipay_1s">';
		liHtml += '<img src="img/index/WeChat-s.png" />';
		liHtml += '<p>微信支付</p>';
		liHtml += '</div>';
		liHtml += '<ul class="PurchaseDetails2_Alipay_2s">';
		liHtml += '<li>微信账号<img src="img/my/progress-bar4.png" /> <span onclick="Orderset.WeChatViewQRCode();" class="Go_to_pay_bule">查看二维码</span></li>';
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + BindName + '">' + BindName + '<img src="img/my/progress-bar4.png" /></li>';
		liHtml += '<li onclick="Orderset.CopyPayMessege(this)" data-message="' + WeChatAccount + '">' + WeChatAccount + '<img src="img/my/progress-bar4.png" /></li>';
		liHtml += '</ul>';
		$("#PurchaseDetails2_footer_j_s").append(liHtml);
	},
	OpenAlipayQRCode: function() { //支付宝点击查看二维码
		var AlipayImg = $("#Alipay_erweima_ert").val(); //支付宝二维码
		var popupHTML = '<div class="popup">' +
			'<div class="create_imgsp_s justify-content close-popup">' +
			'<img src="' + BASIC_HOST_URL + '' + AlipayImg + '"/>' +
			'</div>' +
			'</div>'
		myApp.popup(popupHTML);
	},
	WeChatViewQRCode:function(){//微信点击查看二维码
		var WeChatImg = $("#WeChat_erweima_ert").val(); //微信二维码
		var popupHTML = '<div class="popup">' +
			'<div class="create_imgsp_s justify-content close-popup">' +
			'<img src="' + BASIC_HOST_URL + '' + WeChatImg + '"/>' +
			'</div>' +
			'</div>'
		myApp.popup(popupHTML);
	},
	PleasePutMoney: function() { //已付款，请放币按钮//买家页面
		var myOrderId = $("#Buy_set_order_id_y").val();
		var PayVocherImgs = $("#arbitration_list_images_amd").val();
		var myalert = $("#purchaseDetailsolpuls_i").text();
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.AdOrderID = myOrderId;
		DATA.PayVocherImg = PayVocherImgs;
		if(PayVocherImgs == '') {
			sysUtil.commonUtil.alertMsg('付款凭证不能为空');
		} else if(myalert == '请选择') {
			sysUtil.commonUtil.alertMsg('请选择付款方式');
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderPay", METHOD_POST, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					$$("#sys-toolbar").hide('slow');
					//					myApp.getCurrentView().router.load({
					//						url: "pages/Order/Order.html"
					//					});
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'Order', //页面的data-page值
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	PleasePutMoneyson: function() { //已付款，请放币按钮//卖家页面按钮
		var myOrderId = $("#Buy_set_order_id_y_as").val();
		var TransactionType = $("#Buy_set_order_types_rt_n").val();
		var DATA = new Object();
		DATA.OrderID = myOrderId;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderPay", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				if(TransactionType == 2) {
					$$("#sys-toolbar").hide('slow');
					myApp.getCurrentView().router.load({
						url: "pages/Order/SaleDetails3.html?OrderID=" + myOrderId
					});
				}
				if(TransactionType == 1) {
					$$("#sys-toolbar").hide('slow');
					myApp.getCurrentView().router.load({
						url: "pages/Order/PurchaseDetails3.html?OrderID=" + myOrderId
					});
				}
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	JumpSaleDetails3: function(OrderID) { //点击去付款跳到出售详情3
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/SaleDetails3.html?OrderID=" + OrderID
		});
	},
	SellingCoins: function(OrderID) { //出售详情3渲染数据
		$("#sell_set_order_id_sell_k").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData;
				myhtml = '';
				if(NewsList.PayVocherImg != '') {
					myhtml += '<div class="SaleDetails2_Tobepaid">';
					myhtml += '<span>付款凭证</span>';
					myhtml += '</div>';
					myhtml += '<div class="SaleDetails2_Tobepaid">';
					myhtml += '<div class="arbitration_list_son_content arbitration_list_son_mar justify-content">';
					myhtml += '<img id="SaleDetails3_kks_listImg" src="' + NewsList.PayVocherImg + '" />';
					myhtml += '</div>';
					myhtml += '</div>';
					$("#SaleDetails3_Tobepaid_div_js").append(myhtml);
				}
				$("#sell_Purchase_details_order_number_k").html(NewsList.modelOrder.OrderCode);
				$("#sell_t_Purchase_pending_payment").html(NewsList.modelOrder.OrderStatus);

				$("#sell_Real_name_information").html(NewsList.modelOrder.TrueName);
				$("#sell_Purchase_unit_price_4s").html(NewsList.modelOrder.UnitPrice);
				$("#sell_Purchase_details_buyer_m").html(NewsList.modelOrder.UserName);
				$("#sell_Purchase_details_order_time_u").html(NewsList.modelOrder.CreateTime);
				$("#sell_Purchase_details_quantity_e").html(NewsList.modelOrder.TransAssets);
				$("#sell_Purchase_details_amount_h").html(NewsList.modelOrder.Amount);
				console.log(data)
				var second = NewsList.SurplusSeconds;
				var Minute = NewsList.SurplusMinutes;
				if(Minute < 10) {
					Minute = "0" + Minute;
				}
				var Timing = setInterval(function() {
					second--;
					if(Minute == 0) {
						Minute = "0" + "0";
					}
					if(second < 10) {
						second = "0" + second;
						if(second == ("0" + 0)) {
							second = 59;
							Minute = "0" + (Minute - 1);
						}
					}
					if(Minute == ("0" + "0") && second == ("0" + 1)) {
						second = ("0" + 0);
						clearInterval(Timing);
						//						var DATAID = new Object();
						//						DATAID.OrderID = OrderID;
						//						sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderClose", METHOD_GET, DATAID, function(data) {
						//							if(data.boolResult) {
						//								sysUtil.commonUtil.alertMsg(data.returnMsg);
						//								$$("#sys-toolbar").hide('slow');
						mainView.router.refreshPreviousPage();
						setTimeout(function() {
							mainView.router.back({
								pageName: 'Order', //页面的data-page值
							});
						}, 400);
						//							} else {
						//								sysUtil.commonUtil.alertMsg(data.returnMsg);
						//							}
						//						});
					}
					$(".PurchaseDetails2_minutes_i").html(Minute);
					$(".PurchaseDetails2_seconds_i").html(second);
				}, 1000);
				myApp.onPageBeforeRemove('SaleDetails3', function(page) { //离开页面时，销毁setInterval
					clearInterval(Timing);
				});
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	SellingCoinsBtn: function() { //点击放币
		if(SellReleaseMoney) {
			var myOrderId = $("#sell_set_order_id_sell_k").val();
			var DATA = new Object();
			DATA.Token = sysUtil.storageUtil.getUserData("Token");
			DATA.OrderID = myOrderId;
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderRelease", METHOD_GET, DATA, function(data) {

				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					$$("#sys-toolbar").hide('slow');
					//				myApp.getCurrentView().router.load({
					//					url: "pages/Order/Order.html"
					//				});
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'Order', //页面的data-page值
						});
						SellReleaseMoney = false;
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});

		} else {
			sysUtil.commonUtil.alertMsg('请勿重复点击，频繁操作！');
			setTimeout(function() {
				SellReleaseMoney = true;
			}, 3000);
		}

	},
	JumptobeCommented: function(OrderID) { //跳转到待评论
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/submitComments.html?OrderID=" + OrderID
		});
	},
	myPendingComments: function(OrderID) { //待评论渲染数据
		$("#With_a_review_seller_hidden_k").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData;
				if(NewsList.TransactionType == 2) {
					$("#PendingCommentBack_user_xen").html("买家");
				}
				$("#With_t_comment_u_order").html(NewsList.modelOrder.OrderCode);
				$("#With_t_comment_jeff_ui").html(NewsList.modelOrder.OrderStatus);

				$("#With_a_real_name_h").html(NewsList.modelOrder.TrueName);
				$("#With_r_comment_unit_price").html(NewsList.modelOrder.UnitPrice);
				$("#With_a_review_seller_h").html(NewsList.modelOrder.UserName);
				$("#With_neo_comment_time").html(NewsList.modelOrder.CreateTime);
				$("#With_Number_of_comments_k").html(NewsList.modelOrder.TransAssets);
				$("#With_review_order_amount_jy").html(NewsList.modelOrder.Amount);

				$("#With_a_review_payee_h").html(NewsList.PaymentInformation.TrueName);
				$("#With_the_payment_amount_of_the_comment").html(NewsList.PaymentInformation.Amount);
				$("#With_comment_payment_time").html(NewsList.PaymentInformation.PayTime);
				$("#With_comment_lock_time_h").html(NewsList.PaymentInformation.LockTime);
				$("#With_comment_time_hj").html(NewsList.PaymentInformation.ReleaseTime);
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});

	},
	submitCommentsBtn: function() { //提交评论按钮
		var fOrderID = $("#With_a_review_seller_hidden_k").val();
		var radio = document.getElementsByName("my-radio");
		var selectvalue = null; //  selectvalue为radio中选中的值

		for(var i = 0; i < radio.length; i++) {
			if(radio[i].checked == true) {
				selectvalue = radio[i].value;
				break;
			}
		}
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = fOrderID;
		DATA.CommentLevel = selectvalue;
		DATA.CommentConent = "";
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "AddCommentOfTransation", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				$$("#sys-toolbar").hide('slow');
				mainView.router.refreshPreviousPage();
				setTimeout(function() {
					mainView.router.back({
						pageName: 'Order', //页面的data-page值
					});
				}, 400);
				//				myApp.getCurrentView().router.load({
				//					url: "pages/Order/Order.html"
				//				});
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	ForestPendingPayment: function(OrderID) { //未完成里点击待付款跳转
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/SaleDetails2.html?OrderID=" + OrderID
		});
	},
	ForestSaleDetails2: function(OrderID) { //出售详情2渲染数据
		//		$("#With_a_review_seller_hidden_k").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		setTimeout(function() {

			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					if(NewsList.TransactionType == 2) {
						$("#Money_display_hide_p").hide();
						$("#Countdown_style_width").css("width", "100%");
					}
					$("#Buy_set_order_id_y_as").val(OrderID);
					$("#Buy_set_order_types_rt_n").val(NewsList.TransactionType);
					$("#Seller_order_u_number").html(NewsList.modelOrder.OrderCode);
					$("#Seller_to_pay_h_f").html(NewsList.modelOrder.OrderStatus);

					$("#Real_name_information_Sell").html(NewsList.modelOrder.TrueName);
					$("#Purchase_unit_price_4s_Sell").html(NewsList.modelOrder.UnitPrice);
					$("#Purchase_details_buyer_m_Sell").html(NewsList.modelOrder.UserName);
					$("#Purchase_details_order_time_u_Sell").html(NewsList.modelOrder.CreateTime);
					$("#Purchase_details_quantity_e_Sell").html(NewsList.modelOrder.TransAssets);
					$("#Purchase_details_amount_h_Sell").html(NewsList.modelOrder.Amount);

					var second = NewsList.SurplusSeconds;
					var Minute = NewsList.SurplusMinutes;
					if(Minute < 10) {
						Minute = "0" + Minute;
					}
					var Timing = setInterval(function() {
						second--;
						if(Minute == 0) {
							Minute = "0" + "0";
						}
						if(second < 10) {
							second = "0" + second;
							if(second == ("0" + 0)) {
								second = 59;
								Minute = "0" + (Minute - 1);
							}
						}
						if(Minute == ("0" + "0") && second == ("0" + 1)) {
							second = ("0" + 0);
							clearInterval(Timing);
							var DATAID = new Object();
							DATAID.OrderID = OrderID;
							sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderClose", METHOD_GET, DATAID, function(data) {
								if(data.boolResult) {
									sysUtil.commonUtil.alertMsg(data.returnMsg);
									$$("#sys-toolbar").hide('slow');
									mainView.router.refreshPreviousPage();
									setTimeout(function() {
										mainView.router.back({
											pageName: 'Order', //页面的data-page值
										});
									}, 400);
								} else {
									sysUtil.commonUtil.alertMsg(data.returnMsg);
								}
							});
						}
						$(".PurchaseDetails2_minutes_vw").html(Minute);
						$(".PurchaseDetails2_seconds_vw").html(second);
					}, 1000);
					myApp.onPageBeforeRemove('SaleDetails2', function(page) { //离开页面时，销毁setInterval
						clearInterval(Timing);
					});
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	TransactionCompletionPage: function(OrderID) { //已完成详情页面 + 超时已取消页面
		$("#With_a_review_seller_hidden_k").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					if(NewsList.OrderStatusId == 4 && NewsList.TransactionType == 2) {
						$("#Transaction_complete_order_findx").html("出售CUBC订单");
						$("#Transaction_complete_order_Seller").html("买家");
						$("#Time_of_money_mytest").hide();
						$("#Transaction_complete_Payment_time_c").hide();

						$("#Transaction_complete_Buyer_name_c").html(NewsList.PaymentInformation.TrueName);
						$("#Transaction_complete_Buyer_amount_c").html(NewsList.PaymentInformation.Amount);
						$("#Transaction_complete_Alipay_collection_c").html(NewsList.PaymentInformation.PayTime);
						$("#Transaction_complete_Payment_time_c").html(NewsList.PaymentInformation.ReleaseTime);
					} else if(NewsList.OrderStatusId == 4 && NewsList.TransactionType == 1) {
						$("#Transaction_complete_order_findx").html("购买CUBC订单");
						$("#Transaction_complete_order_Seller").html("卖家");
						$("#Transaction_complete_Buyer_name_c").html(NewsList.PaymentInformation.TrueName);
						$("#Transaction_complete_Buyer_amount_c").html(NewsList.PaymentInformation.Amount);
						$("#Transaction_complete_Alipay_collection_c").html(NewsList.PaymentInformation.PayTime);
						$("#Transaction_complete_Payment_time_c").html(NewsList.PaymentInformation.ReleaseTime);
					} else if(NewsList.OrderStatusId == 5 && NewsList.TransactionType == 2) {
						$("#Transaction_complete_order_findx").html("出售CUBC订单");
						$("#Transaction_complete_order_Seller").html("买家");
						$("#Transaction_complete_Buyer_ul_c").hide();
						$("#Tobepaid_Tobepaid_ios").show();
					} else if(NewsList.OrderStatusId == 5 && NewsList.TransactionType == 1) {
						$("#Transaction_complete_order_Seller").html("卖家");
						$("#Transaction_complete_Buyer_ul_c").hide();
						$("#Tobepaid_Tobepaid_ios").show();
					}
					$("#Transaction_complete_order_r_d").html(NewsList.modelOrder.OrderCode);
					$("#Transaction_complete_wanc4s").html(NewsList.modelOrder.OrderStatus);

					$("#Transaction_complete_order_c").html(NewsList.modelOrder.TrueName);
					$("#Transaction_complete_price_c").html(NewsList.modelOrder.UnitPrice);
					$("#Transaction_complete_TrueName_c").html(NewsList.modelOrder.UserName);
					$("#Transaction_complete_order_time_c").html(NewsList.modelOrder.CreateTime);
					$("#Transaction_complete_Quantity_c").html(NewsList.modelOrder.TransAssets);
					$("#Transaction_complete_Amount_c").html(NewsList.modelOrder.Amount);

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	PurchaseSaleDetailsbaz: function(OrderID) { //购买详情4
		$("#With_a_review_seller_hidden_k").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData;
				if(NewsList.TransactionType == 1) {
					$("#PurchaseDetails4_user_pxs_u").html("卖家");
				}
				$("#PurchaseDetails4_orders_v").html(NewsList.modelOrder.OrderCode);
				$("#PurchaseDetails4_status_dv").html(NewsList.modelOrder.OrderStatus);

				$("#PurchaseDetails4_name_es").html(NewsList.modelOrder.TrueName);
				$("#PurchaseDetails4_price_l").html(NewsList.modelOrder.UnitPrice);
				$("#PurchaseDetails4_user_e").html(NewsList.modelOrder.UserName);
				$("#PurchaseDetails4_time_t").html(NewsList.modelOrder.CreateTime);
				$("#PurchaseDetails4_Quantity_m").html(NewsList.modelOrder.TransAssets);
				$("#PurchaseDetails4_oAmount").html(NewsList.modelOrder.Amount);

				$("#PurchaseDetails4_Payees_t").html(NewsList.PaymentInformation.TrueName);
				$("#PurchaseDetails4_Payee_amount").html(NewsList.PaymentInformation.Amount);
				$("#PurchaseDetails4_PayeePayments_time").html(NewsList.PaymentInformation.PayTime);
				$("#PurchaseDetails4_Time_of_money").html(NewsList.PaymentInformation.LockTime);
				var second = NewsList.SurplusSeconds;
				var Minute = NewsList.SurplusMinutes;
				var Timing = setInterval(function() {
					second--;
					if(Minute == 0) {
						Minute = "0" + "0";
					}
					if(second < 10) {
						second = "0" + second;
						if(second == ("0" + 0)) {
							second = 59;
							Minute = "0" + (Minute - 1);
						}
					}
					if(Minute == ("0" + "0") && second == ("0" + 1)) {
						second = ("0" + 0);
						clearInterval(Timing);
						//						var DATAID = new Object();
						//						DATAID.OrderID = OrderID;
						//						sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "UpdateOrderClose", METHOD_GET, DATAID, function(data) {
						//							if(data.boolResult) {
						//								sysUtil.commonUtil.alertMsg(data.returnMsg);
						$$("#sys-toolbar").hide('slow');
						mainView.router.refreshPreviousPage();
						setTimeout(function() {
							mainView.router.back({
								pageName: 'Order', //页面的data-page值
							});
						}, 400);
						//							} else {
						//								sysUtil.commonUtil.alertMsg(data.returnMsg);
						//							}
						//						});
					}
					$(".PurchaseDetails2_minutes_p_sell_ert").html(Minute);
					$(".PurchaseDetails2_seconds_p_sell_ert").html(second);
				}, 1000);
				myApp.onPageBeforeRemove('PurchaseDetails4', function(page) { //离开页面时，销毁setInterval
					clearInterval(Timing);
				});
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	arbitrationpush: function() { //跳转仲裁页面
		var OrderID = $("#sell_set_order_id_sell_k").val();
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/arbitration.html?OrderID=" + OrderID
		});
	},
	arbitrationRender: function(OrderID) { //渲染仲裁页面1
		$("#arbitration_list_hidden_sw").val(OrderID);
		var DATAID = new Object();
		DATAID.OrderID = OrderID;
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetAdReasonList", METHOD_GET, DATAID, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData.ReasonList;
				var NewsLists = data.returnData;
				$("#arbitration_order_cc_g").html(NewsLists.OrderCode);
				$("#arbitration_user_y").html(NewsLists.Buyer);
				$("#arbitration_name_y").html(NewsLists.Seller);
				$("#arbitration_Quantity_y").html(NewsLists.Amount);
				$("#arbitration_time_y").html(NewsLists.CreateTime);
				if(NewsList.length > 0) {
					$("#arbitration_ul_jk_render").html("");
					var liHtml = '';

					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div onclick=Orderset.arbitrationClick("' + NewsList[i].AdReasonID + '","' + NewsList[i].AdReasonContent + '");>' + NewsList[i].AdReasonContent + '</div>';
					}
					$("#arbitration_ul_jk_render").append(liHtml);
				}
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			};
		});
	},
	arbitrationClicks: function() { //点击打开下拉框拿数据

		$("#arbitration_ul_jk_UL").css("height", "6rem");
	},
	arbitrationClick: function(id, index) { //点击关闭下拉框		
		$("#arbitration_ul_jk_UL").css("height", "0");
		$("#arbitration_ul_relative_input_esp").val(index);
		$("#arbitration_list_render_ts").val(id);
	},
	arbitrationmyimg: function() { //从相册选择
		var self = this;
		plus.gallery.pick(function(p) {
			self.arbitrationHeadImg(p); /*设置图片*/
		}, function(e) {
			console.log("取消选择图片");
		}, {
			filter: "image",
			multiple: false
		});
	},
	arbitrationHeadImg: function(imgPath) {
		var self = this;
		var image = new Image();
		image.src = imgPath;

		ArbitrationlistImg.src = imgPath;
		ArbitrationlistImg.style.width = "5rem";
		ArbitrationlistImg.style.height = "5rem";
		//装载图片数据
		image.onload = function() {
			$("#arbitration_list_images_amd").val(sysUtil.commonUtil.getBase64Image(image));
		}
	},
	sendQRcode: function() { //从相册选择
		var self = this;
		plus.gallery.pick(function(p) {
			self.SetLoadHeadImg(p); /*设置图片*/
		}, function(e) {
			console.log("取消选择图片");
		}, {
			filter: "image",
			multiple: false
		});
	},
	SetLoadHeadImg: function(imgPath) {
		var self = this;
		var image = new Image();
		image.src = imgPath;

		ArbitrationImg.src = imgPath;
		ArbitrationImg.style.width = "5rem";
		ArbitrationImg.style.height = "5rem";
		//装载图片数据
		image.onload = function() {
			$("#arbitration_list_images_t").val(sysUtil.commonUtil.getBase64Image(image));
		}
	},
	SubmitArbitration: function() {
		var OrderID = $("#arbitration_list_hidden_sw").val();
		var imgs = $("#arbitration_list_images_t").val();
		var textareas = $("#arbitration_list_sv_textarea").val().trim();
		var AdReasonID = $("#arbitration_list_render_ts").val();
		if(AdReasonID == "") {
			sysUtil.commonUtil.alertMsg("请选择仲裁理由");
		} else if(textareas == "") {
			sysUtil.commonUtil.alertMsg("备注信息不能为空");
		} else {
			var DATAID = new Object();
			DATAID.Token = sysUtil.storageUtil.getUserData("Token");
			DATAID.AdOrderID = OrderID;
			DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
			DATAID.ArbitrationImg = imgs;
			DATAID.ArbitrationRemarks = textareas;
			DATAID.AdReasonID = AdReasonID;
			sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "AddArbitration", METHOD_POST, DATAID, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg("提交成功");
					Orderset.TransactionNotPurchased();
					mainView.router.back({
						pageName: 'Order', //页面的data-page值
						force: true //注意此参数back方法专用
					});
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	arbitrationRender2: function(OrderID) {
		$("#arbitration2_hidden_input").val(OrderID);
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.OrderID = OrderID;
		sysUtil.ajaxTool.requestGetData("WebApiUCBCTransaction", "GetOrderUser", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				console.log(data)
				var NewsList = data.returnData;
				var NewsLists = data.returnData.ListAdArbitrationsObj;
				$("#arbitration2_orders_OrderStatus").html(NewsList.arbitration.OrderStatus.OrderStatus)
				$("#arbitration2_orders").html(NewsList.arbitration.OrderCode);
				$("#arbitration2_user").html(NewsList.arbitration.Buyers);
				$("#arbitration2_name").html(NewsList.arbitration.Sellers);
				$("#arbitration2_jine").html(NewsList.arbitration.Amount);
				$("#arbitration2_Quantity").html(NewsList.arbitration.TransAssets);
				$("#arbitration2_price").html(NewsList.arbitration.UnitPrice);
				$("#arbitration2_time").html(NewsList.arbitration.CreateTime);
				if(NewsLists.length > 0) {
					$("#accordion_ul_rtp_list").html("");
					var liHtml = '';

					for(var i = 0; i < NewsLists.length; i++) {
						liHtml += '<li class="accordion-item">';
						liHtml += '<a href="#" class="item-content item-link">';
						liHtml += '<div class="item-inner">';
						if(NewsLists[i].TransactionType == 2) {
							liHtml += '<div class="item-title item-title-rtps">卖家提供信息<span>' + NewsLists[i].ArbitrationCreateTime + '</span></div>';
						} else {
							liHtml += '<div class="item-title item-title-rtps">买家提供信息<span>' + NewsLists[i].ArbitrationCreateTime + '</span></div>';
						}
						liHtml += '</div>';
						liHtml += '</a>';
						liHtml += '<div class="accordion-item-content">';
						liHtml += '<div class="block">';
						if(NewsLists[i].ArbitrationImg == null) {
							liHtml += '';
						} else {
							liHtml += '<div class="accordion-item-content-imgs-ios"><img src="' + BASIC_HOST_URL + NewsLists[i].ArbitrationImg + '"/></div>';
						}
						liHtml += '<p class="accordion-item-content-p-ios">' + NewsLists[i].ArbitrationRemarks + '</p>';
						liHtml += '</div>';
						liHtml += '</div>';
						liHtml += '</li>';
					}
					$("#accordion_ul_rtp_list").append(liHtml);
				}
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	arbitrationRender2Click: function() {
		var OrderID = $("#arbitration2_hidden_input").val();
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Order/arbitration.html?OrderID=" + OrderID
		});
	},
	CopyPayMessege: function(ele) { //linkType为操作类型，1为文字邀请，2为链接邀请
		var code = ele.getAttribute("data-message");
		if(plus.os.name == "Android") {
			var Context = plus.android.importClass("android.content.Context");
			var main = plus.android.runtimeMainActivity();
			var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
			plus.android.invoke(clip, "setText", code);
		} else {
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			//这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改 
			var generalPasteboard = UIPasteboard.generalPasteboard();
			// 设置/获取文本内容: www.bcty365.com
			generalPasteboard.setValueforPasteboardType("testValue", code);
		}

		sysUtil.commonUtil.alertMsg("复制信息成功！" + code);
	},
}
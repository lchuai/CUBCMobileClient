var MerchantWallets = {
	MerchantWalletIndexplus: function() { //首页渲染数据
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "GetBusinessWalletDetailSum", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData.ReasonList;
					var NewsLists = data.returnData;
					$("#MerchantWalletIndex_DetailAssetsSum").text(NewsLists[0].DetailAssetsSum);
					$("#MerchantWalletIndex_DetailAmountSum").text(NewsLists[0].DetailAmountSum);
					$("#MerchantWalletIndex_DetailAssetsCompleteStateTwoSum").text(NewsLists[1].DetailAssetsCompleteStateTwoSum);
					$("#MerchantWalletIndex_DetailAssetsCompleteStateOneSum").text(NewsLists[2].DetailAssetsCompleteStateOneSum);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}, 400);
	},
	MerchantWalletIndexlist: function() { //首页渲染数据2
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "GetBusinessWalletDetail", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					if(NewsList.length > 0) {
						$("#MerchantWalletIndex_ul_node_v_list_render").html("");
						var liHtml = '';

						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<li>';
							liHtml += '<div>';
							liHtml += '<p>' + NewsList[i].DetailAssets + '</p>';
							liHtml += '<p>' + NewsList[i].Amount + '</p>';
							liHtml += '</div>';
							liHtml += '<div>';
							liHtml += '<p>' + NewsList[i].CreateTime + '</p>';
							liHtml += '<p><span>' + NewsList[i].SettlementState + '</span><span>' + NewsList[i].SettlementType + '</span></p>';
							liHtml += '</div>';
							liHtml += '</li>';
						}
						$("#MerchantWalletIndex_ul_node_v_list_render").append(liHtml);
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}, 400);
	},
	MerchantCollection: function() { //二维码页面渲染
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "GetBusinessWalletAdressCode", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					var qwe = BASIC_HOST_URL + NewsList.DownLaodWalletAdressCode;
					console.log(qwe)
					$("#MerchantCollection_list_ertd").html('<p>币通链App扫一扫，向我付款</p><img src="' + BASIC_HOST_URL + '' + NewsList.BusinessWalletAdressCode + '" /><p onclick="MerchantWallets.dowload(\'' + qwe + '\')"><img style="width: 0.66rem;" src="img/MerchantWallets/xiazai.png" /> <a href="javascript:;" class="btl_color_h">保存图片</a></p>')
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}, 400);
	},
	SettlementRequests: function() { //结算声请渲染数据
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "GetBusinessWalletDetailState", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					if(NewsList.length > 0) {
						$("#SettlementRequest_ul_plus_efv_solo").html("");
						var liHtml = '';

						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<li>';
							liHtml += '<label class="label-checkbox item-content displaylines_label">';
							liHtml += '<input class="J_select" type="checkbox" name="checkOne" value="' + NewsList[i].BusinessWalletDetailID + '" />';
							liHtml += '<div class="item-media NewUserElectricity_media">';
							liHtml += '<i class="icon icon-form-checkbox NewUserElectricity_i"></i>';
							liHtml += '</div>';
							liHtml += '</label>';
							liHtml += '<div class="SettlementRequest_div_contens displaylines">';
							liHtml += '<p><span class="btl_color_h">' + NewsList[i].DetailAssets + '</span><span>' + NewsList[i].CreateTime + '</span></p>';
							liHtml += '<p><span class="btl_color_l">' + NewsList[i].Amount + '</span><span>结算比例：' + NewsList[i].Discount + '</span><span>结算金额：' + NewsList[i].SettlementAmount + '</span></p>';
							liHtml += '</div>';
							liHtml += '</li>';
						}
						$("#SettlementRequest_ul_plus_efv_solo").append(liHtml);
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}, 400);
	},
	checkAll: function() { //结算声请全选反选
		var checkAllEle = document.getElementById("J_select_all");
		var checkOnes = document.getElementsByName("checkOne");
		if(checkAllEle.checked == true) {
			for(var i = 0; i < checkOnes.length; i++) {
				checkOnes[i].checked = true;
			}
		} else {
			for(var i = 0; i < checkOnes.length; i++) {
				checkOnes[i].checked = false;
			}
		}
	},
	FullSettlement: function(type) { //结算声请结算选中
		var radio = document.getElementsByName("checkOne");
		var selectvalue = "";
		if(type == 1) //结算选中
		{
			for(var i = 0; i < radio.length; i++) {
				if(radio[i].checked == true) {
					//				selectvalue.push(radio[i].value);
					//				selectvalue.join(",");
					selectvalue += radio[i].value + ','
				}
			}
		} else if(type == 2) //结算全部
		{
			selectvalue = "All,";
		}
		selectvalue = selectvalue.substring(0, selectvalue.length - 1);
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATAID.BusinessWalletDetailID = selectvalue;
		DATAID.settlementType = type;
		console.log(selectvalue)
		if(selectvalue == "") {
			sysUtil.commonUtil.alertMsg("请至少选择一个结算声请");
			return;
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "AddBusinessSettlementDetail", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					MerchantWallets.ReturnMerchantWallet();
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}
	},
	ReturnMerchantWallet: function() { //返回首页按钮
		mainView.showNavbar();
		mainView.router.back({
			pageName: 'MerchantWalletIndex', //页面的data-page值
		});
	},
	JumpMerchantWallet: function() { //跳转商家钱包
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/MerchantWallets/MerchantWalletIndex.html"
		});
	},
	JumpMerchantCollection: function() { //跳转商家收款
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/MerchantWallets/MerchantCollection.html"
		});
	},
	JumpSettlementRequest: function() { //跳转结算声请
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/MerchantWallets/SettlementRequest.html"
		});
	},
	JumpWalletPayment: function() { //跳转钱包付款
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/MerchantWallets/WalletPaymentplus.html"
		});
	},
	JumpWalletcollection: function() { //跳转钱包收款
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/MerchantWallets/WalletCollection.html"
		});
	},
	ReturnWalletPayment: function() { //返回交易钱包
		mainView.router.refreshPreviousPage();
		setTimeout(function() {
			mainView.router.back({
				pageName: 'transaction', //页面的data-page值
				animatePages: false
			});
		}, 400);
	},
	PaymentClickConfirmTransfer: function() { //钱包付款点击确认转出		
		var BusinessWalletAdress = $("#WalletPaymentplus_address").val();
		var Amount = $("#WalletPaymentplus_Amount").val();
		if(BusinessWalletAdress == "") {
			sysUtil.commonUtil.alertMsg("地址不能为空");
			return;
		} else if(Amount == "") {
			sysUtil.commonUtil.alertMsg("转出金额不能为空");
			return;
		} else {
			$("#WalletPaymentplus_Confirm_Transfer").css("margin", "5.5rem 0 1.2rem 0");
			myApp.pickerModal(
				'<div class="picker-modal">' +
				'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left"></div>' +
				'<div class="right close-picker" onclick="MerchantWallets.cancel();">取消</div>' +
				'</div>' +
				'</div>' +
				'<div class="picker-modal-inner">' +
				'<div class="content-block-conts">' +
				'<input type="password" name="SaleDetails4s" id="WalletPaymentplus_Confirm_inputs_mini" class="ElectricityFee_password_style" placeholder="请输入资金密码" id="" />' +
				'<a href="javascript:;" class="ElectricityFee_yes_erts" onclick="MerchantWallets.ConfirmPassword();">确认</a>' +
				'</div>' +
				'</div>' +
				'</div>'
			)
		}
	},
	ConfirmPassword: function() { //资金密码确认按钮
		var BusinessWalletAdress = $("#WalletPaymentplus_address").val();
		var Amount = $("#WalletPaymentplus_Amount").val();
		var DealPassword = $("#WalletPaymentplus_Confirm_inputs_mini").val();
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATAID.BusinessWalletAdress = BusinessWalletAdress;
		DATAID.Amount = Amount;
		DATAID.DealPassword = DealPassword;
		if(DealPassword == "") {
			sysUtil.commonUtil.alertMsg("资金密码不能位空");
			return;
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiBusinessWallet", "AddWalletDetail", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					myApp.closeModal('.picker-modal');
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					MerchantWallets.ReturnMerchantWallet();

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}
	},
	cancel: function() { //弹出资金密码点击取消
		$("#WalletPaymentplus_Confirm_Transfer").css("margin", "1.5rem 0 1.2rem 0");
	},
	WalletCollections: function() { //钱包收款渲染
		var DATAID = new Object();
		DATAID.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetModelTransDetailsWalletAdress", METHOD_GET, DATAID, function(data) {
				if(data.boolResult) {
					console.log(data)
					var NewsList = data.returnData;
					$("#WalletCollection_text_s").prop('outerHTML', '<p class="WalletCollection_div_p_c" id="WalletCollection_text_s">' + NewsList.UCBCWalletAdress + '</p>');
					$("#WalletCollection_click_bents").prop('outerHTML', '<a class="modify_btn" id="WalletCollection_click_bents" href="javascript:;" onclick="MerchantWallets.CopyPayMessege(this);" data-message="' + NewsList.UCBCWalletAdress + '">复制收货地址</a>')
					$("#WalletCollection_img_s_ertd").html('<img src="' + BASIC_HOST_URL + '' + NewsList.UCBCAddressQRCodeImg + '">')
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				};
			});
		}, 400);
	},
	dowload: function(url) { //下载文件
		var options = {
			method: "GET"
		};
		dtask = plus.downloader.createDownload(url, options);
		dtask.addEventListener("statechanged", function(task, status) {
			switch(task.state) {
				case 1: // 开始
					console.log("开始下载...");
					break;
				case 2: // 已连接到服务器
					console.log("链接到服务器...");
					break;
				case 3: // 已接收到数据
					var a = Math.floor(task.downloadedSize / task.totalSize * 100) + '%'
					console.log(a)
					break;
				case 4: // 下载完成
					console.log("下载完成！");
					console.log(task.totalSize);
					plus.gallery.save(task.filename, function() { //保存到相册方法
						layer.open({
							content: '已保存到系统相册！',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					});
					plus.io.resolveLocalFileSystemURL(task.filename, function(entry) {
						console.log(entry.toLocalURL()); //绝对地址                                      
					});
					console.log(task.filename);
					break;
			}
		});
		dtask.start();
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